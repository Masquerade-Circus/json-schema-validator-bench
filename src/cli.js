import {
  access,
  mkdir,
  readFile,
  readdir,
  rename,
  writeFile
} from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

import { runChildProcess } from "./child-process.js";

import {
  canonicalJson,
  loadSuite,
  sha256
} from "./suite.js";
import {
  draftIds,
  getParticipants,
  validators as validatorMatrix
} from "./matrix.js";
import {
  benchmarkPackageNames,
  getAdapterFactory,
  getBenchmarkAdapterMetadata,
  getRegisteredAdapter
} from "./adapter-registry.js";
import { runAdapterConformance } from "./conformance.js";
import {
  generateFinalReport,
  writeConformanceReports
} from "./report.js";
import { generateIntersection } from "./intersection.js";
import {
  runBenchmarkPhase,
  runBenchmarkSample,
  shouldReuseSampleCheckpoints
} from "./benchmark.js";
import { runExecutionSample } from "./worker.js";
import { eligibilityThresholdFromEnvironment } from "./eligibility.js";
import {
  assertCompatibleIntersections,
  groupIntersectionHashesByScope
} from "./diagnostic.js";
import { getResultsRoot } from "./paths.js";
import { captureImplementationEvidence } from "./implementation-probe.js";
import { captureSourceEvidence } from "./source-evidence.js";

const benchmarksRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const suiteLockPath = path.join(benchmarksRoot, "suite-lock.json");
const suiteCachePath = path.join(
  benchmarksRoot,
  ".cache",
  "json-schema-test-suite"
);
const suiteRepository =
  "https://github.com/json-schema-org/JSON-Schema-Test-Suite.git";

const lockFields = [
  "commit",
  "drafts",
  "lockVersion",
  "remotesRoot",
  "repository",
  "testsRoot",
  "tree"
];
export function validateBenchmarkPackage(packageJson) {
  if (packageJson?.engines?.node !== ">=22") {
    throw new Error("benchmark package Node engine must equal >=22");
  }
  const dependencies = packageJson.dependencies;
  if (
    dependencies === null ||
    typeof dependencies !== "object" ||
    Array.isArray(dependencies)
  ) {
    throw new Error("benchmark package dependencies must be an object");
  }
  const dependencyNames = Object.keys(dependencies).sort();
  if (canonicalJson(dependencyNames) !== canonicalJson(benchmarkPackageNames)) {
    throw new Error(
      "benchmark package dependencies must match declared adapter packages"
    );
  }
  for (const [name, version] of Object.entries(dependencies)) {
    if (
      typeof version !== "string" ||
      !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(
        version
      )
    ) {
      throw new Error(`benchmark dependency ${name} must use an exact version`);
    }
  }
  if (packageJson.private !== true || packageJson.type !== "module") {
    throw new Error("benchmark package must remain private ESM");
  }
  if (packageJson.scripts?.["metadata:sync"] !== "node src/cli.js metadata-sync") {
    throw new Error("benchmark package metadata:sync script is missing");
  }
  if (packageJson.scripts?.benchmark !== "node src/pipeline.js") {
    throw new Error("benchmark package single-command pipeline script is missing");
  }
  return packageJson;
}

function utcDate(date) {
  return date.toISOString().slice(0, 10);
}

export function getLastCompleteUtcWeek(now = new Date()) {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) {
    throw new Error("metadata date must be valid");
  }
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const daysSinceMonday = (today.getUTCDay() + 6) % 7;
  const currentMonday = new Date(today);
  currentMonday.setUTCDate(today.getUTCDate() - daysSinceMonday);
  const start = new Date(currentMonday);
  start.setUTCDate(currentMonday.getUTCDate() - 7);
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  return { start: utcDate(start), end: utcDate(end) };
}

export function validateMetadataSnapshot(snapshot, packageMetadata) {
  if (snapshot?.snapshotVersion !== 1) {
    throw new Error("metadata snapshotVersion must equal 1");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(snapshot.start ?? "")) {
    throw new Error("metadata snapshot start must be a UTC date");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(snapshot.end ?? "")) {
    throw new Error("metadata snapshot end must be a UTC date");
  }
  if (
    typeof snapshot.retrievedAt !== "string" ||
    Number.isNaN(Date.parse(snapshot.retrievedAt))
  ) {
    throw new Error("metadata snapshot retrievedAt must be ISO-8601");
  }
  const names = Object.keys(snapshot.packages ?? {}).sort();
  const expectedNames = [...packageMetadata.keys()].sort();
  if (
    names.length !== expectedNames.length ||
    names.some((name, index) => name !== expectedNames[index])
  ) {
    throw new Error("metadata snapshot package inventory is incomplete");
  }
  for (const [name, expected] of packageMetadata) {
    const observed = snapshot.packages[name];
    if (!Number.isInteger(observed.weeklyDownloads) || observed.weeklyDownloads < 0) {
      throw new Error(`metadata weeklyDownloads must be a non-negative integer for ${name}`);
    }
    for (const field of ["version", "license", "integrity", "tarball"]) {
      if (observed[field] !== expected[field]) {
        throw new Error(`metadata mismatch for ${name}.${field}`);
      }
    }
    if (canonicalJson(observed.engines) !== canonicalJson(expected.engines)) {
      throw new Error(`metadata mismatch for ${name}.engines`);
    }
    for (const field of [
      "downloadsResponseSha256",
      "registryResponseSha256"
    ]) {
      if (!/^[0-9a-f]{64}$/.test(observed[field] ?? "")) {
        throw new Error(`metadata ${field} is invalid for ${name}`);
      }
    }
  }
  return snapshot;
}

async function installedPackageMetadata(packageJson, packageLock) {
  if (
    canonicalJson(packageLock.packages?.[""]?.dependencies) !==
    canonicalJson(packageJson.dependencies)
  ) {
    throw new Error("package lock root dependencies differ from package.json");
  }
  const metadata = new Map();
  for (const [name, version] of Object.entries(packageJson.dependencies)) {
    const installedPath = path.join(
      benchmarksRoot,
      "node_modules",
      ...name.split("/"),
      "package.json"
    );
    const installed = JSON.parse(await readFile(installedPath, "utf8"));
    const locked = packageLock.packages[`node_modules/${name}`];
    if (
      installed.version !== version ||
      locked?.version !== version ||
      typeof installed.license !== "string" ||
      installed.license.length === 0 ||
      typeof locked.integrity !== "string" ||
      typeof locked.resolved !== "string"
    ) {
      throw new Error(`installed package metadata is incomplete for ${name}`);
    }
    metadata.set(name, {
      version,
      license: installed.license,
      engines: installed.engines ?? null,
      integrity: locked.integrity,
      tarball: locked.resolved
    });
  }
  return metadata;
}

export async function validatePipelinePreflight() {
  const nodeMajor = Number(process.versions.node.split(".")[0]);
  if (!Number.isInteger(nodeMajor) || nodeMajor < 22) {
    throw new Error("benchmark pipeline requires Node 22 or later");
  }
  const packageJson = validateBenchmarkPackage(
    JSON.parse(await readFile(path.join(benchmarksRoot, "package.json"), "utf8"))
  );
  const packageLock = JSON.parse(
    await readFile(path.join(benchmarksRoot, "package-lock.json"), "utf8")
  );
  const packageMetadata = await installedPackageMetadata(packageJson, packageLock);
  const snapshot = JSON.parse(
    await readFile(path.join(benchmarksRoot, "npm-snapshot-lock.json"), "utf8")
  );
  validateMetadataSnapshot(snapshot, packageMetadata);
  validateSuiteLock(JSON.parse(await readFile(suiteLockPath, "utf8")));
  return {
    node: process.version,
    packages: packageMetadata.size,
    snapshotRetrievedAt: snapshot.retrievedAt
  };
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" }
  });
  const raw = await response.text();
  if (!response.ok) {
    throw new Error(`metadata request failed ${response.status} for ${url}`);
  }
  return { raw, json: JSON.parse(raw) };
}

export async function syncMetadata() {
  const packageJson = validateBenchmarkPackage(
    JSON.parse(await readFile(path.join(benchmarksRoot, "package.json"), "utf8"))
  );
  const packageLock = JSON.parse(
    await readFile(path.join(benchmarksRoot, "package-lock.json"), "utf8")
  );
  const packageMetadata = await installedPackageMetadata(
    packageJson,
    packageLock
  );
  const { start, end } = getLastCompleteUtcWeek();
  const rawResponses = [];
  const packages = {};
  for (const [name, expected] of packageMetadata) {
    const encodedName = encodeURIComponent(name);
    const downloads = await fetchJson(
      `https://api.npmjs.org/downloads/point/${start}:${end}/${encodedName}`
    );
    const registry = await fetchJson(
      `https://registry.npmjs.org/${encodedName}/${expected.version}`
    );
    if (
      downloads.json.start !== start ||
      downloads.json.end !== end ||
      !Number.isInteger(downloads.json.downloads)
    ) {
      throw new Error(`npm downloads response is invalid for ${name}`);
    }
    const registryLicense = registry.json.license;
    const registryEngines = registry.json.engines ?? null;
    if (
      registry.json.version !== expected.version ||
      registryLicense !== expected.license ||
      canonicalJson(registryEngines) !== canonicalJson(expected.engines) ||
      registry.json.dist?.integrity !== expected.integrity ||
      registry.json.dist?.tarball !== expected.tarball
    ) {
      throw new Error(`registry, installation, and lock metadata differ for ${name}`);
    }
    rawResponses.push(
      { name, kind: "downloads", raw: downloads.raw },
      { name, kind: "registry", raw: registry.raw }
    );
    packages[name] = {
      ...expected,
      weeklyDownloads: downloads.json.downloads,
      downloadsResponseSha256: sha256(downloads.raw),
      registryResponseSha256: sha256(registry.raw)
    };
  }
  const retrievedAt = new Date().toISOString();
  const cacheDirectory = path.join(
    benchmarksRoot,
    ".cache",
    "npm-snapshot",
    retrievedAt.replaceAll(":", "-").replaceAll(".", "-")
  );
  await mkdir(cacheDirectory, { recursive: true });
  for (const response of rawResponses) {
    const safeName = response.name.replaceAll("/", "__").replaceAll("@", "");
    await writeFile(
      path.join(cacheDirectory, `${safeName}-${response.kind}.json`),
      response.raw
    );
  }
  const snapshot = {
    snapshotVersion: 1,
    start,
    end,
    retrievedAt,
    packages
  };
  validateMetadataSnapshot(snapshot, packageMetadata);
  const stageDirectory = path.join(
    benchmarksRoot,
    ".cache",
    `run-metadata-${process.pid}`
  );
  await mkdir(stageDirectory, { recursive: true });
  const staged = path.join(stageDirectory, "npm-snapshot-lock.json");
  await writeFile(staged, `${JSON.stringify(snapshot, null, 2)}\n`);
  await rename(staged, path.join(benchmarksRoot, "npm-snapshot-lock.json"));
  return snapshot;
}

export function validateSuiteLock(lock) {
  if (lock === null || typeof lock !== "object" || Array.isArray(lock)) {
    throw new Error("suite lock must be an object");
  }

  const fields = Object.keys(lock).sort();
  if (fields.length !== lockFields.length || fields.some((field, index) => field !== lockFields[index])) {
    throw new Error("suite lock contains an unknown field or misses a required field");
  }

  if (lock.lockVersion !== 1) {
    throw new Error("suite lockVersion must equal 1");
  }
  if (lock.repository !== suiteRepository) {
    throw new Error("suite repository does not match the fixed repository");
  }
  if (!/^[0-9a-f]{40}$/.test(lock.commit)) {
    throw new Error("suite commit must be a 40-character lowercase hexadecimal SHA");
  }
  if (!/^[0-9a-f]{40}$/.test(lock.tree)) {
    throw new Error("suite tree must be a 40-character lowercase hexadecimal SHA");
  }
  if (
    !Array.isArray(lock.drafts) ||
    canonicalJson(lock.drafts) !== canonicalJson(draftIds)
  ) {
    throw new Error("suite drafts must match the canonical matrix order");
  }
  if (lock.testsRoot !== "tests" || lock.remotesRoot !== "remotes") {
    throw new Error("suite roots do not match the fixed layout");
  }

  return lock;
}

async function run(command, args, options = {}) {
  const result = await runChildProcess(command, args, {
    ...options,
    cwd: options.cwd ?? benchmarksRoot
  });
  return result.stdout.trim();
}

export async function runHarness({
  testFiles = null,
  cwd = benchmarksRoot,
  env = process.env,
  streamOutput = true
} = {}) {
  const files = testFiles ?? (await readdir(path.join(cwd, "test")))
    .filter((name) => name.endsWith(".test.js"))
    .sort()
    .map((name) => path.join("test", name));
  if (
    !Array.isArray(files) ||
    files.length === 0 ||
    files.some((file) => typeof file !== "string" || file.length === 0)
  ) {
    throw new Error("harness requires at least one explicit test file");
  }
  const harnessEnvironment = { ...env };
  delete harnessEnvironment.BENCHMARK_RESULTS_ROOT;
  delete harnessEnvironment.BENCHMARK_PIPELINE_STARTED_AT;
  delete harnessEnvironment.BENCHMARK_ELIGIBILITY_THRESHOLD_PERCENT;
  delete harnessEnvironment.BENCHMARK_VALIDATOR;
  delete harnessEnvironment.NODE_TEST_CONTEXT;
  return runChildProcess(
    process.execPath,
    ["--test", "--test-reporter=tap", ...files],
    {
      cwd,
      env: harnessEnvironment,
      streamOutput
    }
  );
}

async function runGit(args) {
  return run("git", args, { cwd: benchmarksRoot });
}

export async function verifySuiteCheckout(lock, git = runGit) {
  const head = await git(["-C", suiteCachePath, "rev-parse", "HEAD"]);
  if (head !== lock.commit) {
    throw new Error(`suite HEAD mismatch: expected ${lock.commit}, received ${head}`);
  }

  const tree = await git([
    "-C",
    suiteCachePath,
    "rev-parse",
    "HEAD^{tree}"
  ]);
  if (tree !== lock.tree) {
    throw new Error(`suite tree mismatch: expected ${lock.tree}, received ${tree}`);
  }

  for (const requiredPath of [
    ...draftIds.map((draft) => path.join(suiteCachePath, "tests", draft)),
    path.join(suiteCachePath, "remotes")
  ]) {
    await access(requiredPath);
  }

  return { commit: head, tree };
}

export async function syncSuite() {
  const lock = validateSuiteLock(JSON.parse(await readFile(suiteLockPath, "utf8")));

  try {
    await access(path.join(suiteCachePath, ".git"));
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
    await runGit([
      "clone",
      "--filter=blob:none",
      "--no-checkout",
      lock.repository,
      suiteCachePath
    ]);
  }

  await runGit([
    "-C",
    suiteCachePath,
    "fetch",
    "--depth=1",
    "origin",
    lock.commit
  ]);
  await runGit([
    "-C",
    suiteCachePath,
    "checkout",
    "--detach",
    lock.commit
  ]);

  return verifySuiteCheckout(lock);
}

export async function ensureSuite() {
  const lock = validateSuiteLock(JSON.parse(await readFile(suiteLockPath, "utf8")));
  try {
    const verified = await verifySuiteCheckout(lock);
    return { ...verified, reused: true };
  } catch {
    const verified = await syncSuite();
    return { ...verified, reused: false };
  }
}

async function main() {
  const command = process.argv[2];
  const commandArguments = process.argv.slice(3);
  const mode = command === "sample"
    ? null
    : commandArguments.length === 0
      ? "full"
      : commandArguments.length === 1 && commandArguments[0] === "--quick"
        ? "quick"
        : null;
  if (command !== "sample" && mode === null) {
    throw new Error("benchmark commands accept only one optional --quick flag");
  }
  const eligibilityThresholdPercent =
    eligibilityThresholdFromEnvironment().percent;
  const diagnosticValidator = process.env.BENCHMARK_VALIDATOR === undefined ||
    process.env.BENCHMARK_VALIDATOR === ""
    ? null
    : getRegisteredAdapter(process.env.BENCHMARK_VALIDATOR).id;
  const selectedBench = process.env.BENCHMARK_SELECTED_BENCH === undefined ||
    process.env.BENCHMARK_SELECTED_BENCH === ""
    ? null
    : process.env.BENCHMARK_SELECTED_BENCH;
  if (
    selectedBench !== null &&
    !["setup", "execution", "cold"].includes(selectedBench)
  ) {
    throw new Error("selected bench must be setup, execution, or cold");
  }
  const selectedPhase = selectedBench === "cold" ? "cold-execution" : selectedBench;
  const reuseCheckpoints = shouldReuseSampleCheckpoints({
    mode,
    validator: diagnosticValidator,
    bench: selectedBench
  });
  const measurementRunStartedAt =
    process.env.BENCHMARK_PIPELINE_STARTED_AT ?? null;
  if (command === "preflight") {
    process.stdout.write(`${JSON.stringify(await validatePipelinePreflight())}\n`);
    return;
  }
  if (command === "implementation-evidence") {
    const result = await captureImplementationEvidence();
    process.stdout.write(
      `${JSON.stringify({
        captured: result.captured,
        reused: result.reused,
        runIdentitySha256: result.artifact.runIdentitySha256
      })}\n`
    );
    return;
  }
  if (command === "source-evidence") {
    const result = await captureSourceEvidence();
    process.stdout.write(
      `${JSON.stringify({
        validators: Object.keys(result.artifact.validators).length,
        packageIdentities: Object.keys(result.artifact.packages).length,
        reusedPackages: result.artifact.cache.reusedPackages
      })}\n`
    );
    return;
  }
  if (command === "metadata-sync") {
    const snapshot = await syncMetadata();
    process.stdout.write(
      `${JSON.stringify({
        start: snapshot.start,
        end: snapshot.end,
        retrievedAt: snapshot.retrievedAt,
        packages: Object.keys(snapshot.packages).length,
        validators: validatorMatrix.length
      })}\n`
    );
    return;
  }
  if (command === "suite-ensure") {
    const verified = await ensureSuite();
    process.stdout.write(`${JSON.stringify(verified)}\n`);
    return;
  }
  if (command === "harness") {
    await runHarness();
    process.stdout.write(`${JSON.stringify({ event: "harness-complete" })}\n`);
    return;
  }

  if (command === "smoke") {
    const lock = validateSuiteLock(JSON.parse(await readFile(suiteLockPath, "utf8")));
    const loaded = await loadSuite({ lock, writeManifest: false });
    const adapters = [];
    const stressSamples = [];
    for (const draft of lock.drafts) {
      for (const participant of getParticipants(draft).filter(
        ({ id }) => diagnosticValidator === null || id === diagnosticValidator
      )) {
        const createAdapter = getAdapterFactory(participant.id);
        const adapter = createAdapter({
          draft,
          formatProfile: "base",
          resources: [],
          unknownFormats: []
        });
        const schema = { type: "integer" };
        const target = typeof adapter.setup === "function"
          ? await adapter.setup(structuredClone(schema))
          : structuredClone(schema);
        const validate = (data) =>
          adapter.validate(target, structuredClone(data));
        if (validate(1) !== true || validate("1") !== false) {
          throw new Error(`${adapter.name} ${draft} failed the adapter smoke`);
        }
        adapters.push({ draft, name: adapter.name, version: adapter.version });
        const smokeSchemaId = `${draft}:smoke.json#/groups/0`;
        let smokeClock = -1;
        const stressSample = await runExecutionSample({
          request: {
            phase: "execution",
            validator: adapter.name,
            draft,
            formatProfile: "base",
            round: 1,
            deadline: Date.now() + 2 * 60 * 1000
          },
          setupEntries: [
            {
              setupKey: `${draft}:${"0".repeat(64)}`,
              draft,
              representativeSchemaId: smokeSchemaId,
              memberSchemaIds: [smokeSchemaId]
            }
          ],
          cases: [
            {
              id: `${smokeSchemaId}/tests/0`,
              schemaId: smokeSchemaId,
              draft,
              expected: true,
              data: 1
            },
            {
              id: `${smokeSchemaId}/tests/1`,
              schemaId: smokeSchemaId,
              draft,
              expected: false,
              data: "1"
            }
          ],
          caseIds: [
            `${smokeSchemaId}/tests/0`,
            `${smokeSchemaId}/tests/1`
          ],
          schemas: [
            {
              id: smokeSchemaId,
              draft,
              schema: { type: "integer" }
            }
          ],
          remotes: new Map(),
          createAdapter,
          timing: {
            warmupMinimumMilliseconds: 1,
            targetSampleMilliseconds: 1,
            minimumSampleMilliseconds: 1
          },
          now: () => {
            smokeClock += 1;
            return smokeClock;
          }
        });
        stressSamples.push({
          draft,
          validator: adapter.name,
          warmupMilliseconds: stressSample.warmupMilliseconds,
          actualElapsedMilliseconds: stressSample.actualElapsedMilliseconds,
          passes: stressSample.passes
        });
      }
    }
    process.stdout.write(
      `${JSON.stringify({
        counts: loaded.manifest.counts,
        adapters,
        stressSamples
      })}\n`
    );
    return;
  }

  if (command === "conformance") {
    const lock = validateSuiteLock(JSON.parse(await readFile(suiteLockPath, "utf8")));
    const suite = await loadSuite({ lock });
    const controllerDeadline = Date.now() + 90 * 60 * 1000;
    const reports = [];
    const expectedAdapters = new Map();
    for (const draft of lock.drafts) {
      for (const participant of getParticipants(draft).filter(
        ({ id }) => diagnosticValidator === null || id === diagnosticValidator
      )) {
        if (Date.now() > controllerDeadline) {
          const error = new Error("conformance exceeded the cooperative controller deadline");
          error.code = "COOPERATIVE_DEADLINE_EXCEEDED";
          throw error;
        }
        const createAdapter = getAdapterFactory(participant.id);
        const adapter = getBenchmarkAdapterMetadata(participant.id, draft);
        const report = await runAdapterConformance({
            adapter,
            adapterFactory: createAdapter,
            adapterConfiguration: {
              draft
            },
            draft,
            suite,
            deadline: Date.now() + 15 * 60 * 1000
          });
        const expectedAdapter = {
          version: report.version,
          reportOptionsSha256: report.reportOptionsSha256
        };
        expectedAdapters.set(`${draft}/${adapter.name}`, expectedAdapter);
        reports.push(report);
      }
    }
    await writeConformanceReports(reports, {
      preserveExisting: diagnosticValidator !== null
    });
    if (diagnosticValidator !== null) {
      expectedAdapters.clear();
      for (const draft of lock.drafts) {
        for (const participant of getParticipants(draft)) {
          const report = JSON.parse(
            await readFile(
              path.join(
                getResultsRoot(),
                draft,
                "conformance",
                `${participant.id}.json`
              ),
              "utf8"
            )
          );
          expectedAdapters.set(`${draft}/${participant.id}`, {
            version: report.version,
            reportOptionsSha256: report.reportOptionsSha256
          });
        }
      }
    }
    const previousIntersections = diagnosticValidator === null && selectedBench === null
      ? null
      : JSON.parse(
          await readFile(path.join(getResultsRoot(), "environment.json"), "utf8")
        ).hashes.performance;
    const { intersections, hashes } = await generateIntersection({
      suite,
      expectedAdapters,
      eligibilityThresholdPercent
    });
    if (previousIntersections !== null) {
      const previousHashes = Object.fromEntries(
        Object.entries(previousIntersections).map(([scope, values]) => [
          scope,
          values.intersections
        ])
      );
      const currentHashes = groupIntersectionHashesByScope(hashes);
      if (diagnosticValidator !== null) {
        assertCompatibleIntersections(previousHashes, currentHashes, mode);
      } else {
        const omitSelected = (inventory) => Object.fromEntries(
          Object.entries(inventory).map(([scope, phases]) => [
            scope,
            Object.fromEntries(
              Object.entries(phases).filter(([phase]) => phase !== selectedPhase)
            )
          ])
        );
        assertCompatibleIntersections(
          omitSelected(previousHashes),
          omitSelected(currentHashes),
          mode
        );
      }
    }
    const summary = reports.map(({ validator, draft, counts }) => ({
      validator,
      draft,
      counts
    }));
    process.stdout.write(
      `${JSON.stringify({
        conformance: summary,
        intersections: Object.fromEntries(
          intersections.map((intersection) => [
            intersection.phase === "setup"
              ? `${intersection.draft}/setup`
              : `${intersection.draft}/${intersection.formatProfile}/${intersection.phase}`,
            intersection.counts
          ])
        ),
        intersectionSha256: hashes
      })}\n`
    );
    if (
      reports.some((report) =>
        report.cases.some(
          (record) => record.errorCode === "PROFILE_RESULT_DIVERGENCE"
        )
      )
    ) {
      throw new Error("fast and detailed adapter profiles diverged");
    }
    return;
  }

  if (command === "setup" || command === "cold-execution") {
    const result = await runBenchmarkPhase(command, {
      mode,
      eligibilityThresholdPercent,
      validator: diagnosticValidator,
      reuseCheckpoints,
      measurementRunStartedAt
    });
    process.stdout.write(
      `${JSON.stringify({
        phase: result.phase,
        scopes: result.scopes.length,
        samples: result.scopes.reduce(
          (total, scope) => total + scope.samples.length,
          0
        ),
        sampleAcquisition: result.sampleAcquisition,
        durationMilliseconds: result.durationMilliseconds
      })}\n`
    );
    return;
  }

  if (command === "sample") {
    const [phase, draft, formatProfile, validator, roundRaw, flag, extra] =
      process.argv.slice(3);
    if (
      typeof phase !== "string" ||
      typeof draft !== "string" ||
      typeof formatProfile !== "string" ||
      typeof validator !== "string" ||
      typeof roundRaw !== "string" ||
      (typeof flag === "string" && flag !== "--quick") ||
      typeof extra === "string"
    ) {
      throw new Error(
        "sample requires exactly: phase draft profile validator round"
      );
    }
    const result = await runBenchmarkSample({
      phase,
      draft,
      formatProfile:
        phase === "setup" && formatProfile === "draft"
          ? null
          : formatProfile,
      validator,
      round: Number(roundRaw),
      mode: flag === "--quick" ? "quick" : "full",
      eligibilityThresholdPercent
    });
    process.stdout.write(
      `${JSON.stringify({
        event: result.skipped ? "sample-resumed" : "sample-published",
        phase,
        draft,
        formatProfile,
        validator,
        round: Number(roundRaw)
      })}\n`
    );
    return;
  }

  if (command === "execution") {
    const result = await runBenchmarkPhase("execution", {
      mode,
      eligibilityThresholdPercent,
      validator: diagnosticValidator,
      reuseCheckpoints,
      measurementRunStartedAt
    });
    process.stdout.write(
      `${JSON.stringify({
        phase: result.phase,
        scopes: result.scopes.length,
        samples: result.scopes.reduce(
          (total, scope) => total + scope.samples.length,
          0
        ),
        sampleAcquisition: result.sampleAcquisition,
        durationMilliseconds: result.durationMilliseconds
      })}\n`
    );
    return;
  }

  if (command === "report") {
    const result = await generateFinalReport({
      mode,
      eligibilityThresholdPercent,
      validator: diagnosticValidator,
      bench: selectedBench
    });
    process.stdout.write(
      `${JSON.stringify({
        durationMilliseconds: result.environment.durationMilliseconds,
        intersectionSha256: result.environment.hashes.intersection
      })}\n`
    );
    return;
  }

  throw new Error(`unknown or unavailable command: ${command ?? "(missing)"}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  });
}
