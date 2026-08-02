import { createHash } from "node:crypto";
import { performance } from "node:perf_hooks";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

import {
  getCompileRegistryParticipants,
  getColdExecutionRegistryParticipants,
  getAdapterFactory,
  getRegisteredAdapter
} from "./adapters/index.js";
import {
  draftIds,
  formatProfiles,
  getParticipants
} from "./matrix.js";
import {
  benchmarkConstants,
  effectiveWorkerExecArgv,
  getBenchmarkMode,
  loadBenchmarkArtifacts,
  sampleContractVersion,
  writeConfinedCacheOutput
} from "./benchmark.js";
import {
  analyzeSchemaCapabilities,
} from "./suite.js";
import { derivePerformanceCorpus } from "./performance-corpus.js";
import { prepareSchemaForFormatProfile } from "./schema-profile.js";
import { parseEligibilityThresholdPercent } from "./eligibility.js";

const benchmarksRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function memorySnapshot(memoryUsage) {
  const usage = memoryUsage();
  return Object.fromEntries(
    ["rss", "heapUsed", "heapTotal", "external"].map((field) => {
      if (!Number.isFinite(usage[field]) || usage[field] < 0) {
        throw new Error(`memory telemetry ${field} must be finite and non-negative`);
      }
      return [field, usage[field]];
    })
  );
}

function createMemoryTelemetry(memoryUsage, budget = null) {
  const start = memorySnapshot(memoryUsage);
  let previous = start;
  let peak = { ...start };
  let sustainedGrowthPasses = 0;
  function observe() {
    const current = memorySnapshot(memoryUsage);
    for (const field of Object.keys(peak)) {
      peak[field] = Math.max(peak[field], current[field]);
    }
    const minimumGrowth = budget?.minimumGrowthBytesPerPass ?? 0;
    const grew =
      current.rss - previous.rss >= minimumGrowth ||
      current.heapUsed - previous.heapUsed >= minimumGrowth;
    sustainedGrowthPasses = grew ? sustainedGrowthPasses + 1 : 0;
    previous = current;
    const rssGrowth = current.rss - start.rss;
    const heapGrowth = current.heapUsed - start.heapUsed;
    const pressureRatio = budget?.sustainedGrowthPressureRatio ?? 1;
    const rssExceeded =
      Object.hasOwn(budget ?? {}, "maxRssGrowthBytes") &&
      rssGrowth > budget.maxRssGrowthBytes;
    const heapExceeded =
      Object.hasOwn(budget ?? {}, "maxHeapGrowthBytes") &&
      heapGrowth > budget.maxHeapGrowthBytes;
    const materialPressure =
      (Object.hasOwn(budget ?? {}, "maxRssGrowthBytes") &&
        rssGrowth >= budget.maxRssGrowthBytes * pressureRatio) ||
      (Object.hasOwn(budget ?? {}, "maxHeapGrowthBytes") &&
        heapGrowth >= budget.maxHeapGrowthBytes * pressureRatio);
    const sustainedExceeded =
      Object.hasOwn(budget ?? {}, "sustainedGrowthPasses") &&
      sustainedGrowthPasses >= budget.sustainedGrowthPasses &&
      materialPressure;
    if (rssExceeded || heapExceeded || sustainedExceeded) {
      const error = new Error("worker crossed its cooperative memory budget");
      error.code = "COOPERATIVE_BUDGET_EXCEEDED";
      error.telemetry = {
        start,
        end: current,
        peak,
        sustainedGrowthPasses,
        growth: { rss: rssGrowth, heapUsed: heapGrowth },
        pressureRatio,
        triggeredBy: [
          ...(rssExceeded ? ["absolute-rss"] : []),
          ...(heapExceeded ? ["absolute-heap"] : []),
          ...(sustainedExceeded ? ["sustained-material-pressure"] : [])
        ],
        observedAt: "complete-pass-boundary"
      };
      throw error;
    }
  }
  return {
    observe,
    finish() {
      const end = memorySnapshot(memoryUsage);
      for (const field of Object.keys(peak)) {
        peak[field] = Math.max(peak[field], end[field]);
      }
      return {
        start,
        end,
        peak,
        sustainedGrowthPasses,
        observedAt: "complete-pass-boundary"
      };
    }
  };
}

function deadlineError(phase) {
  const error = new Error(`${phase} worker exceeded its cooperative deadline`);
  error.code = "COOPERATIVE_DEADLINE_EXCEEDED";
  return error;
}

export function validateWorkerRequest(request) {
  if (request === null || typeof request !== "object" || Array.isArray(request)) {
    throw new Error("worker request must be an object");
  }
  const config = getBenchmarkMode(request.benchmarkMode ?? "full");
  const eligibilityThresholdPercent = parseEligibilityThresholdPercent(
    request.eligibilityThresholdPercent
  ).percent;
  if (!["setup", "execution", "cold-execution"].includes(request.phase)) {
    throw new Error(`unsupported worker phase: ${request.phase}`);
  }
  if (!draftIds.includes(request.draft)) {
    throw new Error(`unsupported benchmark draft: ${request.draft}`);
  }
  if (
    (request.phase === "setup" && request.formatProfile !== null) ||
    (request.phase !== "setup" && !formatProfiles.includes(request.formatProfile))
  ) {
    throw new Error(`unsupported benchmark format profile: ${request.formatProfile}`);
  }
  const participants =
    request.phase === "setup"
      ? getCompileRegistryParticipants(request.draft)
      : request.phase === "cold-execution"
        ? getColdExecutionRegistryParticipants(request.draft)
      : getParticipants(request.draft);
  if (
    !participants.some(({ id }) => id === request.validator)
  ) {
    throw new Error(`unknown benchmark adapter: ${request.validator}`);
  }
  getRegisteredAdapter(request.validator);
  if (
    !Number.isInteger(request.round) ||
    request.round < 1 ||
    request.round > config.rounds
  ) {
    throw new Error(
      `benchmark round must be an integer from 1 through ${config.rounds}`
    );
  }
  if (!Number.isFinite(request.deadline) || request.deadline <= 0) {
    throw new Error("benchmark deadline must be a positive finite timestamp");
  }
  for (const field of [
    "benchmarkContractSha256",
    "intersectionSha256",
    "sampleCacheIdentitySha256",
    "validatorRuntimeSha256"
  ]) {
    if (!/^[a-f0-9]{64}$/.test(request[field])) {
      throw new Error(`worker request ${field} must be a SHA-256 hash`);
    }
  }
  if (
    !Array.isArray(request.workerExecArgv) ||
    request.workerExecArgv.some((argument) => typeof argument !== "string") ||
    JSON.stringify(request.workerExecArgv) !==
      JSON.stringify(effectiveWorkerExecArgv())
  ) {
    throw new Error("worker request flags differ from the effective worker runtime");
  }
  return { ...request, eligibilityThresholdPercent };
}

export function compileChecksum(compileEntries) {
  return createHash("sha256")
    .update(compileEntries.map(({ compileKey }) => compileKey).join("\n"))
    .digest("hex");
}

export async function runCompileSample({
  request,
  compileEntries,
  schemas,
  remotes,
  resourceRegistry = null,
  createAdapter,
  now = () => performance.now(),
  yieldAfterPass = () => new Promise((resolve) => setImmediate(resolve)),
  memoryUsage = () => process.memoryUsage(),
  memoryBudget = null,
  timing = {
    warmupMinimumMilliseconds:
      benchmarkConstants.setupWarmupMinimumMilliseconds,
    targetSampleMilliseconds: benchmarkConstants.setupTargetMilliseconds,
    minimumSampleMilliseconds: benchmarkConstants.setupMinimumSampleMilliseconds
  }
}) {
  if (Date.now() > request.deadline) {
    throw deadlineError("setup");
  }
  if (compileEntries.length === 0) {
    throw new Error(`compile corpus is empty for ${request.draft}`);
  }
  const memory = createMemoryTelemetry(memoryUsage, memoryBudget);

  const schemaById = new Map(schemas.map((schema) => [schema.id, schema.schema]));
  const prepared = compileEntries.map((entry) => {
    const schema = schemaById.get(entry.representativeSchemaId);
    if (schema === undefined) {
      throw new Error(`compile schema is absent: ${entry.representativeSchemaId}`);
    }
    const formatProfile =
      typeof entry.setupConfiguration?.formatAssertion === "boolean"
        ? (entry.setupConfiguration.formatAssertion
            ? "format-assertion"
            : "base")
        : (entry.formatProfile ?? request.formatProfile ?? "base");
    if (!formatProfiles.includes(formatProfile)) {
      throw new Error(`compile entry has no effective format profile: ${entry.compileKey}`);
    }
    const effectiveSchema = structuredClone(schema);
    prepareSchemaForFormatProfile(
      effectiveSchema,
      request.draft,
      formatProfile
    );
    return {
      entry,
      schema,
      formatProfile,
      unknownFormats: analyzeSchemaCapabilities(effectiveSchema).unknownFormats
    };
  });
  for (const field of [
    "warmupMinimumMilliseconds",
    "targetSampleMilliseconds",
    "minimumSampleMilliseconds"
  ]) {
    if (!Number.isFinite(timing[field]) || timing[field] < 0) {
      throw new Error(`compile timing ${field} must be finite and non-negative`);
    }
  }
  if (timing.minimumSampleMilliseconds > timing.targetSampleMilliseconds) {
    throw new Error("compile minimum sample duration cannot exceed its target");
  }

  let adapterMetadata = null;
  async function compilePass() {
    let elapsed = 0;
    for (const { entry, schema, formatProfile, unknownFormats } of prepared) {
      const resources = structuredClone(
        resourceRegistry?.resourcesFor(entry.representativeSchemaId) ?? []
      );
      const disposableSchema = structuredClone(schema);
      prepareSchemaForFormatProfile(
        disposableSchema,
        request.draft,
        formatProfile
      );
      const start = now();
      const adapter = createAdapter({
        draft: request.draft,
        formatProfile,
        resources,
        unknownFormats: [...unknownFormats].sort()
      });
      adapterMetadata ??= adapter;
      if (typeof adapter.compile !== "function") {
        throw new Error(`${request.validator} does not expose compile`);
      }
      if (adapter.compileMode === "async") {
        await adapter.compile(disposableSchema);
      } else {
        const target = adapter.compile(disposableSchema);
        if (
          target !== null &&
          (typeof target === "object" || typeof target === "function") &&
          typeof target.then === "function"
        ) {
          throw new Error(
            `${request.validator} returned a Promise from synchronous compile`
          );
        }
      }
      elapsed += now() - start;
    }
    return elapsed;
  }

  let warmupPasses = 0;
  let warmupMilliseconds = 0;
  if (timing.warmupMinimumMilliseconds > 0) {
    do {
      if (Date.now() > request.deadline) {
        throw deadlineError("setup");
      }
      warmupMilliseconds += await compilePass();
      warmupPasses += 1;
      await yieldAfterPass();
      memory.observe();
      if (Date.now() > request.deadline) {
        throw deadlineError("setup");
      }
    } while (warmupMilliseconds < timing.warmupMinimumMilliseconds);
  }

  let passes = 0;
  let measuredMilliseconds = 0;
  do {
    if (Date.now() > request.deadline) {
      throw deadlineError("setup");
    }
    measuredMilliseconds += await compilePass();
    passes += 1;
    await yieldAfterPass();
    memory.observe();
    if (Date.now() > request.deadline) {
      throw deadlineError("setup");
    }
  } while (measuredMilliseconds < timing.targetSampleMilliseconds);
  const singlePassExceededTarget =
    passes === 1 && measuredMilliseconds >= timing.targetSampleMilliseconds;
  if (
    measuredMilliseconds < timing.minimumSampleMilliseconds &&
    !singlePassExceededTarget
  ) {
    throw new Error(
      `compile sample ended before its minimum duration: ${measuredMilliseconds}ms`
    );
  }
  const seconds = measuredMilliseconds / 1000;
  const operations = prepared.length * passes;
  const throughput = operations / seconds;
  return {
    phase: "setup",
    validator: request.validator,
    validatorVersion: adapterMetadata.version,
    draft: request.draft,
    formatProfile: request.formatProfile,
    round: request.round,
    warmupMinimumMilliseconds: timing.warmupMinimumMilliseconds,
    warmupMilliseconds,
    warmupPasses,
    targetSampleMilliseconds: timing.targetSampleMilliseconds,
    minimumSampleMilliseconds: timing.minimumSampleMilliseconds,
    actualElapsedMilliseconds: measuredMilliseconds,
    singlePassExceededTarget,
    passes,
    corpusCompileEntries: prepared.length,
    operations,
    seconds,
    throughput,
    nanosecondsPerOperation: 1e9 / throughput,
    checksum: compileChecksum(compileEntries),
    memory: memory.finish()
  };
}

export async function runColdExecutionSample({
  request,
  cases,
  caseIds,
  schemas,
  resourceRegistry = null,
  createAdapter,
  now = () => performance.now(),
  yieldAfterPass = () => new Promise((resolve) => setImmediate(resolve)),
  memoryUsage = () => process.memoryUsage(),
  memoryBudget = null,
  timing = {
    warmupMinimumMilliseconds:
      benchmarkConstants.coldExecutionWarmupMinimumMilliseconds,
    targetSampleMilliseconds:
      benchmarkConstants.coldExecutionTargetMilliseconds,
    minimumSampleMilliseconds:
      benchmarkConstants.coldExecutionMinimumSampleMilliseconds
  }
}) {
  if (Date.now() > request.deadline) {
    throw deadlineError("cold-execution");
  }
  const casesById = new Map(cases.map((testCase) => [testCase.id, testCase]));
  const canonicalCases = caseIds.map((id) => {
    const testCase = casesById.get(id);
    if (testCase === undefined) {
      throw new Error(`intersection case is absent from the suite: ${id}`);
    }
    return testCase;
  });
  if (canonicalCases.length === 0) {
    throw new Error(`cold-execution corpus is empty for ${request.draft}`);
  }
  const schemaById = new Map(schemas.map(({ id, schema }) => [id, schema]));
  const memory = createMemoryTelemetry(memoryUsage, memoryBudget);
  for (const field of [
    "warmupMinimumMilliseconds",
    "targetSampleMilliseconds",
    "minimumSampleMilliseconds"
  ]) {
    if (!Number.isFinite(timing[field]) || timing[field] < 0) {
      throw new Error(`cold-execution timing ${field} must be finite and non-negative`);
    }
  }
  if (timing.minimumSampleMilliseconds > timing.targetSampleMilliseconds) {
    throw new Error("cold-execution minimum sample duration cannot exceed its target");
  }
  let adapterMetadata = null;
  async function coldPass() {
    let elapsed = 0;
    let checksum = 0;
    for (let index = 0; index < canonicalCases.length; index += 1) {
      if (Date.now() > request.deadline) {
        throw deadlineError("cold-execution");
      }
      const testCase = canonicalCases[index];
      const sourceSchema = schemaById.get(testCase.schemaId);
      if (sourceSchema === undefined) {
        throw new Error(`cold-execution schema is absent: ${testCase.schemaId}`);
      }
      const schema = structuredClone(sourceSchema);
      const resources = structuredClone(
        resourceRegistry?.resourcesFor(testCase.schemaId) ?? []
      );
      prepareSchemaForFormatProfile(
        schema,
        request.draft,
        request.formatProfile ?? "base"
      );
      const unknownFormats = analyzeSchemaCapabilities(schema).unknownFormats;
      const data = structuredClone(testCase.data);
      const start = now();
      const adapter = createAdapter({
        draft: request.draft,
        formatProfile: request.formatProfile,
        resources,
        unknownFormats
      });
      let target = schema;
      if (typeof adapter.compile === "function") {
        target = adapter.compileMode === "async"
          ? await adapter.compile(schema)
          : adapter.compile(schema);
      }
      const observed = adapter.validate(target, data);
      elapsed += now() - start;
      adapterMetadata ??= adapter;
      if (observed !== testCase.expected) {
        throw executionError(
          "COLD_EXECUTION_RESULT_MISMATCH",
          request,
          mismatchDiagnostic({
            moment: `operation ${index + 1}`,
            caseId: testCase.id,
            schemaId: testCase.schemaId,
            expected: testCase.expected,
            observed
          })
        );
      }
      checksum += (index + 1) * (observed ? 3 : 7);
    }
    return { elapsed, checksum };
  }
  let warmupPasses = 0;
  let warmupMilliseconds = 0;
  if (timing.warmupMinimumMilliseconds > 0) {
    do {
      const pass = await coldPass();
      warmupMilliseconds += pass.elapsed;
      warmupPasses += 1;
      memory.observe();
      await yieldAfterPass();
    } while (warmupMilliseconds < timing.warmupMinimumMilliseconds);
  }
  let passes = 0;
  let measuredMilliseconds = 0;
  let checksum = 0;
  do {
    const pass = await coldPass();
    measuredMilliseconds += pass.elapsed;
    checksum += pass.checksum;
    passes += 1;
    memory.observe();
    await yieldAfterPass();
  } while (measuredMilliseconds < timing.targetSampleMilliseconds);
  const singlePassExceededTarget =
    passes === 1 && measuredMilliseconds >= timing.targetSampleMilliseconds;
  if (
    measuredMilliseconds < timing.minimumSampleMilliseconds &&
    !singlePassExceededTarget
  ) {
    throw new Error(
      `cold-execution sample ended before its minimum duration: ${measuredMilliseconds}ms`
    );
  }
  const seconds = measuredMilliseconds / 1000;
  const operations = canonicalCases.length * passes;
  const throughput = operations / seconds;
  return {
    phase: "cold-execution",
    validator: request.validator,
    validatorVersion: adapterMetadata.version,
    draft: request.draft,
    formatProfile: request.formatProfile,
    round: request.round,
    warmupMinimumMilliseconds: timing.warmupMinimumMilliseconds,
    warmupMilliseconds,
    warmupPasses,
    targetSampleMilliseconds: timing.targetSampleMilliseconds,
    minimumSampleMilliseconds: timing.minimumSampleMilliseconds,
    actualElapsedMilliseconds: measuredMilliseconds,
    singlePassExceededTarget,
    passes,
    corpusCases: canonicalCases.length,
    validCases: canonicalCases.filter(({ expected }) => expected).length,
    invalidCases: canonicalCases.filter(({ expected }) => !expected).length,
    operations,
    seconds,
    throughput,
    nanosecondsPerOperation: 1e9 / throughput,
    checksum,
    memory: memory.finish()
  };
}

function executionPass(preparedCases, validatorsBySchemaId) {
  let checksum = 0;
  let mismatch = null;
  for (let index = 0; index < preparedCases.length; index += 1) {
    const testCase = preparedCases[index];
    const validate = validatorsBySchemaId.get(testCase.schemaId);
    const observed = Boolean(validate(testCase.data));
    checksum += (index + 1) * (observed ? 3 : 7);
    if (mismatch === null && observed !== testCase.expected) {
      mismatch = {
        index,
        caseId: testCase.id,
        schemaId: testCase.schemaId,
        expected: testCase.expected,
        observed
      };
    }
  }
  return { checksum, mismatch };
}

function cloneExecutionCases(cases) {
  return cases.map((testCase) => ({
    ...testCase,
    data: structuredClone(testCase.data)
  }));
}

function executionError(code, request, details) {
  const mismatchContext =
    typeof details.caseId === "string" &&
    typeof details.expected === "boolean" &&
    typeof details.observed === "boolean"
      ? ` caseId=${details.caseId} expected=${details.expected} observed=${details.observed}`
      : "";
  const error = new Error(
    `${code}: validator=${request.validator} draft=${request.draft} profile=${request.formatProfile ?? "base"} phase=${request.phase} round=${request.round}${mismatchContext} moment=${details.moment}`
  );
  error.code = code;
  error.validator = request.validator;
  error.draft = request.draft;
  error.formatProfile = request.formatProfile ?? "base";
  error.phase = request.phase;
  error.round = request.round;
  error.moment = details.moment;
  error.caseId = details.caseId ?? null;
  error.schemaId = details.schemaId ?? null;
  error.expected = details.expected ?? null;
  error.observed = details.observed ?? null;
  return error;
}

function mismatchDiagnostic({ moment, caseId, schemaId, expected, observed }) {
  return {
    moment,
    caseId,
    schemaId,
    expected,
    observed
  };
}

export async function runExecutionSample({
  request,
  compileEntries,
  cases,
  caseIds,
  schemas,
  remotes,
  resourceRegistry = null,
  createAdapter,
  now = () => performance.now(),
  memoryUsage = () => process.memoryUsage(),
  memoryBudget = null,
  timing = {
    warmupMinimumMilliseconds:
      benchmarkConstants.executionWarmupMinimumMilliseconds,
    targetSampleMilliseconds:
      benchmarkConstants.executionTargetMilliseconds,
    minimumSampleMilliseconds:
      benchmarkConstants.executionMinimumSampleMilliseconds
  }
}) {
  if (Date.now() > request.deadline) {
    throw deadlineError("execution");
  }
  const memory = createMemoryTelemetry(memoryUsage, memoryBudget);
  const casesById = new Map(cases.map((testCase) => [testCase.id, testCase]));
  const canonicalCases = caseIds.map((id) => {
    const testCase = casesById.get(id);
    if (testCase === undefined) {
      throw new Error(`intersection case is absent from the suite: ${id}`);
    }
    return testCase;
  });
  casesById.clear();
  cases = null;
  caseIds = null;
  const validCases = canonicalCases.filter(({ expected }) => expected === true).length;
  const invalidCases = canonicalCases.filter(({ expected }) => expected === false).length;
  if (validCases === 0 || invalidCases === 0) {
    throw new Error("execution corpus must contain valid and invalid cases");
  }
  for (const field of [
    "warmupMinimumMilliseconds",
    "targetSampleMilliseconds",
    "minimumSampleMilliseconds"
  ]) {
    if (!Number.isFinite(timing[field]) || timing[field] < 0) {
      throw new Error(`execution timing ${field} must be finite and non-negative`);
    }
  }
  if (timing.minimumSampleMilliseconds > timing.targetSampleMilliseconds) {
    throw new Error("execution minimum sample duration cannot exceed its target");
  }

  const schemaById = new Map(schemas.map((schema) => [schema.id, schema.schema]));
  const unknownFormats = [
    ...new Set(
      compileEntries.flatMap((entry) => {
        const schema = schemaById.get(entry.representativeSchemaId);
        if (schema === undefined) {
          throw new Error(
            `execution schema is absent: ${entry.representativeSchemaId}`
          );
        }
        return analyzeSchemaCapabilities(schema).unknownFormats;
      })
    )
  ].sort();
  const validatorsBySchemaId = new Map();
  let adapterMetadata = null;
  for (const entry of compileEntries) {
    if (Date.now() > request.deadline) {
      throw deadlineError("execution");
    }
    const schema = schemaById.get(entry.representativeSchemaId);
    const resources = structuredClone(
      resourceRegistry?.resourcesFor(entry.representativeSchemaId) ?? []
    );
    let adapter;
    try {
      adapter = createAdapter({
        draft: request.draft,
        formatProfile: request.formatProfile,
        resources,
        unknownFormats
      });
    } catch (error) {
      const setupError = executionError("EXECUTION_ADAPTER_SETUP_FAILED", request, {
        moment: "setup",
        schemaId: entry.representativeSchemaId
      });
      setupError.cause = error;
      throw setupError;
    }
    adapterMetadata ??= adapter;
    const disposableSchema = structuredClone(schema);
    prepareSchemaForFormatProfile(
      disposableSchema,
      request.draft,
      request.formatProfile ?? "base"
    );
    let target;
    try {
      if (typeof adapter.compile !== "function") {
        target = disposableSchema;
      } else if (adapter.compileMode === "async") {
        target = await adapter.compile(disposableSchema);
      } else {
        target = adapter.compile(disposableSchema);
        if (
          target !== null &&
          (typeof target === "object" || typeof target === "function") &&
          typeof target.then === "function"
        ) {
          throw new Error(
            `${request.validator} returned a Promise from synchronous compile`
          );
        }
      }
    } catch (error) {
      const compileError = executionError("EXECUTION_COMPILE_FAILED", request, {
        moment: "compile",
        schemaId: entry.representativeSchemaId
      });
      compileError.cause = error;
      throw compileError;
    }
    const validate = (data) => adapter.validate(target, data);
    for (const schemaId of entry.memberSchemaIds) {
      validatorsBySchemaId.set(schemaId, validate);
    }
  }
  for (const testCase of canonicalCases) {
    if (!validatorsBySchemaId.has(testCase.schemaId)) {
      throw new Error(`execution validator is absent for schema: ${testCase.schemaId}`);
    }
  }
  schemaById.clear();
  schemas = null;
  compileEntries = null;
  remotes = null;
  resourceRegistry = null;
  createAdapter = null;
  const expectedPassChecksum = canonicalCases.reduce(
    (total, testCase, index) =>
      total + (index + 1) * (testCase.expected ? 3 : 7),
    0
  );
  let verificationCases = cloneExecutionCases(canonicalCases);
  for (const testCase of verificationCases) {
    let observed;
    try {
      observed = Boolean(
        validatorsBySchemaId.get(testCase.schemaId)(testCase.data)
      );
    } catch (error) {
      const validationError = executionError("EXECUTION_VALIDATION_FAILED", request, {
        moment: "verification",
        caseId: testCase.id,
        schemaId: testCase.schemaId
      });
      validationError.cause = error;
      throw validationError;
    }
    if (observed !== testCase.expected) {
      throw executionError(
        "PREVIOUS_RESULT_MISMATCH",
        request,
        mismatchDiagnostic({
          moment: "verification",
          caseId: testCase.id,
          schemaId: testCase.schemaId,
          expected: testCase.expected,
          observed
        })
      );
    }
  }
  verificationCases = null;
  const measurementCases = cloneExecutionCases(canonicalCases);

  let warmupPasses = 0;
  let warmupChecksum = 0;
  let warmupMilliseconds = 0;
  if (timing.warmupMinimumMilliseconds > 0) {
    do {
      if (Date.now() > request.deadline) {
        throw deadlineError("execution");
      }
      const warmupStart = now();
      let passChecksum = null;
      let passMismatch = null;
      let passError = null;
      try {
        const passResult = executionPass(measurementCases, validatorsBySchemaId);
        passChecksum = passResult.checksum;
        passMismatch = passResult.mismatch;
      } catch (error) {
        passError = error;
      }
      if (passChecksum !== null) {
        warmupChecksum += passChecksum;
      }
      warmupPasses += 1;
      warmupMilliseconds += now() - warmupStart;
      const moment = `warmup pass ${warmupPasses}`;
      if (passError !== null) {
        const error = executionError("EXECUTION_VALIDATION_FAILED", request, {
          moment
        });
        error.cause = passError;
        throw error;
      }
      if (passMismatch !== null) {
        throw executionError(
          "EXECUTION_RESULT_MISMATCH",
          request,
          mismatchDiagnostic({
            moment,
            ...passMismatch
          })
        );
      }
      if (passChecksum !== expectedPassChecksum) {
        throw executionError("EXECUTION_RESULT_MISMATCH", request, { moment });
      }
      memory.observe();
      if (Date.now() > request.deadline) {
        throw deadlineError("execution");
      }
    } while (warmupMilliseconds < timing.warmupMinimumMilliseconds);
  }
  let passes = 0;
  let checksum = 0;
  let measuredMilliseconds = 0;
  do {
    if (Date.now() > request.deadline) {
      throw deadlineError("execution");
    }
    const measuredStart = now();
    let passChecksum = null;
    let passMismatch = null;
    let passError = null;
    try {
      const passResult = executionPass(measurementCases, validatorsBySchemaId);
      passChecksum = passResult.checksum;
      passMismatch = passResult.mismatch;
    } catch (error) {
      passError = error;
    }
    if (passChecksum !== null) {
      checksum += passChecksum;
    }
    passes += 1;
    measuredMilliseconds += now() - measuredStart;
    const moment = `measured pass ${passes}`;
    if (passError !== null) {
      const error = executionError("EXECUTION_VALIDATION_FAILED", request, {
        moment
      });
      error.cause = passError;
      throw error;
    }
    if (passMismatch !== null) {
      throw executionError(
        "EXECUTION_RESULT_MISMATCH",
        request,
        mismatchDiagnostic({
          moment,
          ...passMismatch
        })
      );
    }
    if (passChecksum !== expectedPassChecksum) {
      throw executionError("EXECUTION_RESULT_MISMATCH", request, { moment });
    }
    memory.observe();
    if (Date.now() > request.deadline) {
      throw deadlineError("execution");
    }
  } while (measuredMilliseconds < timing.targetSampleMilliseconds);
  const singlePassExceededTarget =
    passes === 1 && measuredMilliseconds >= timing.targetSampleMilliseconds;
  if (
    measuredMilliseconds < timing.minimumSampleMilliseconds &&
    !singlePassExceededTarget
  ) {
    throw new Error(
      `execution sample ended before its minimum duration: ${measuredMilliseconds}ms`
    );
  }
  if (checksum !== expectedPassChecksum * passes) {
    throw new Error("execution checksum differs from the expected result");
  }

  const seconds = measuredMilliseconds / 1000;
  const operations = canonicalCases.length * passes;
  const throughput = operations / seconds;
  return {
    phase: "execution",
    validator: request.validator,
    validatorVersion: adapterMetadata.version,
    draft: request.draft,
    formatProfile: request.formatProfile,
    round: request.round,
    warmupMinimumMilliseconds: timing.warmupMinimumMilliseconds,
    warmupMilliseconds,
    warmupPasses,
    warmupChecksum,
    targetSampleMilliseconds: timing.targetSampleMilliseconds,
    minimumSampleMilliseconds: timing.minimumSampleMilliseconds,
    actualElapsedMilliseconds: measuredMilliseconds,
    singlePassExceededTarget,
    passes,
    corpusCases: canonicalCases.length,
    validCases,
    invalidCases,
    validOperations: validCases * passes,
    invalidOperations: invalidCases * passes,
    operations,
    seconds,
    throughput,
    nanosecondsPerOperation: 1e9 / throughput,
    checksum,
    memory: memory.finish()
  };
}

function assertWorkerOutputPath(outputPath) {
  if (typeof outputPath !== "string" || outputPath.length === 0) {
    throw new Error("worker output path is required");
  }
  const resolved = path.resolve(outputPath);
  const cacheRoot = path.join(benchmarksRoot, ".cache");
  if (!resolved.startsWith(`${cacheRoot}${path.sep}`)) {
    throw new Error("worker output path must stay inside the project .cache");
  }
  return resolved;
}

export async function executeWorkerRequest(
  request,
  { artifactsCache = null } = {}
) {
  request = validateWorkerRequest(request);
  const cacheKey = `${request.eligibilityThresholdPercent}/${request.phase}/${request.draft}/${request.formatProfile ?? "draft"}`;
  let artifacts = artifactsCache?.get(cacheKey);
  if (artifacts === undefined) {
    artifacts = await loadBenchmarkArtifacts({
      draft: request.draft,
      formatProfile: request.formatProfile,
      phase: request.phase,
      eligibilityThresholdPercent: request.eligibilityThresholdPercent
    });
    artifactsCache?.set(cacheKey, artifacts);
  }
  if (
    artifacts.intersection?.eligibility?.policy?.thresholdPercent !==
    request.eligibilityThresholdPercent
  ) {
    throw new Error("worker artifact eligibility threshold mismatch");
  }
  const corpus = derivePerformanceCorpus({
    mode: request.benchmarkMode,
    intersection: artifacts.intersection,
    cases: artifacts.suite.cases
  });
  const compileEntries = corpus.compileEntries.filter(
    (entry) => entry.draft === request.draft
  );
  const schemas = artifacts.suite.schemas.filter(
    (schema) => schema.draft === request.draft
  );
  const sample =
    request.phase === "setup"
      ? await runCompileSample({
          request,
          compileEntries,
          schemas,
          remotes: artifacts.suite.remotes,
          resourceRegistry: artifacts.suite.resourceRegistry,
          createAdapter: getAdapterFactory(request.validator),
          memoryBudget: request.memoryBudget,
          timing: request.timing
        })
      : request.phase === "cold-execution"
        ? await runColdExecutionSample({
            request,
            cases: artifacts.suite.cases.filter(
              (testCase) => testCase.draft === request.draft
            ),
            caseIds: corpus.caseIds.filter((id) =>
              id.startsWith(`${request.draft}:`)
            ),
            schemas,
            resourceRegistry: artifacts.suite.resourceRegistry,
            createAdapter: getAdapterFactory(request.validator),
            memoryBudget: request.memoryBudget,
            timing: request.timing
          })
        : await runExecutionSample({
          request,
          compileEntries,
          cases: artifacts.suite.cases.filter(
            (testCase) => testCase.draft === request.draft
          ),
          caseIds: corpus.caseIds.filter((id) =>
            id.startsWith(`${request.draft}:`)
          ),
          schemas,
          remotes: artifacts.suite.remotes,
          resourceRegistry: artifacts.suite.resourceRegistry,
          createAdapter: getAdapterFactory(request.validator),
          memoryBudget: request.memoryBudget,
          timing: request.timing
        });
  sample.sampleContractVersion = sampleContractVersion;
  sample.benchmarkMode = request.benchmarkMode;
  sample.benchmarkContractSha256 = request.benchmarkContractSha256;
  sample.intersectionSha256 = request.intersectionSha256;
  sample.sampleCacheIdentitySha256 = request.sampleCacheIdentitySha256;
  sample.validatorRuntimeSha256 = request.validatorRuntimeSha256;
  if (request.benchmarkMode === "quick") {
    sample.performanceCorpus = corpus.metadata;
  }
  return sample;
}

async function main() {
  const request = validateWorkerRequest(JSON.parse(process.argv[2] ?? "null"));
  const outputPath = assertWorkerOutputPath(request.outputPath);
  const sample = await executeWorkerRequest(request);
  await writeConfinedCacheOutput(outputPath, `${JSON.stringify(sample)}\n`);
  process.stdout.write(
    `${JSON.stringify({ event: "sample-complete", phase: request.phase, draft: request.draft, formatProfile: request.formatProfile, validator: request.validator, round: request.round })}\n`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch(async (error) => {
    const code = error.code ?? "WORKER_ERROR";
    let identity = {};
    let diagnosticError = null;
    try {
      const request = JSON.parse(process.argv[2] ?? "null");
      identity = {
        phase: request?.phase,
        draft: request?.draft,
        formatProfile: request?.formatProfile,
        validator: request?.validator,
        round: request?.round
      };
      const outputPath = assertWorkerOutputPath(request?.outputPath);
      await writeConfinedCacheOutput(
        outputPath,
        `${JSON.stringify({
          event: "sample-failed",
          ...identity,
          code,
          message: error.message,
          stack: error.stack,
          telemetry: error.telemetry ?? null
        })}\n`
      );
    } catch (writeError) {
      diagnosticError = writeError.message;
    }
    process.stderr.write(
      `${JSON.stringify({ event: "sample-failed", ...identity, code, message: error.message, diagnosticError })}\n`
    );
    process.exitCode = 1;
  });
}
