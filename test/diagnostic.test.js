import assert from "node:assert/strict";
import { mkdir, readFile, rm, symlink, unlink, writeFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  assertCompatibleDiagnosticBaseline,
  assertCompatibleIntersections,
  createDiagnosticPublication,
  reconcileDiagnosticPhaseResult
} from "../src/diagnostic.js";
import * as diagnosticApi from "../src/diagnostic.js";
import {
  assertCompleteDiagnosticBaseline,
  parsePipelineArguments,
  pipelineCommands,
  runPipeline
} from "../src/pipeline.js";
import * as benchmarkApi from "../src/benchmark.js";
import { performanceIdentitySha256 } from "../src/intersection.js";
import { draftIds, formatProfiles, getParticipants } from "../src/matrix.js";
import { sha256 } from "../src/suite.js";
import {
  benchmarkTitle,
  createResultsIndex,
  summarizePhase
} from "../src/report.js";

const validatorIds = ["ajv", "schema-shield"];
const benchmarkRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

function cohortIdentity(overrides = {}) {
  return {
    cohortIdentityVersion: 1,
    benchmarkMode: "full",
    rounds: 6,
    benchmarkContractSha256: "contract",
    eligibilityThresholdPercent: "98",
    sharedHarnessSha256: "harness",
    packageLockSha256: "package-lock",
    npmSnapshotLockSha256: "npm-snapshot-lock",
    suiteLockSha256: "suite-lock",
    runtimeEnvironment: {
      platform: "linux",
      architecture: "x64",
      cpuModels: ["Fixture CPU"],
      versions: { node: "24.0.0", v8: "13.0" },
      execArgv: [],
      operatingSystemType: "Linux",
      operatingSystemRelease: "fixture",
      endianness: "LE",
      totalMemory: 16_000_000_000,
      nodeOptions: null,
      uvThreadpoolSize: null
    },
    validatorRuntimeSha256: {
      "draft6/ajv": "ajv-runtime",
      "draft6/schema-shield": "shield-runtime"
    },
    ...overrides
  };
}

async function diagnosticBaselineFixture(label) {
  const root = path.join(
    benchmarkRoot,
    "tmp",
    `diagnostic-baseline-${label}-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
  await mkdir(root, { recursive: true });
  const suiteManifestRaw = '{"fixture":true}\n';
  await writeFile(path.join(root, "suite-manifest.json"), suiteManifestRaw);
  const environment = {
    cohortIdentity: { rounds: 6 },
    sampleRuntimeProvenance: { provenanceVersion: 1, scopes: {} },
    hashes: {
      suiteManifest: sha256(suiteManifestRaw),
      conformance: {},
      performance: {},
      mutationDocuments: null
    }
  };
  const files = { reports: [], intersections: [], samples: [] };
  for (const draft of draftIds) {
    for (const { id } of getParticipants(draft)) {
      const relativePath = `${draft}/conformance/${id}.json`;
      const raw = `${JSON.stringify({ draft, validator: id })}\n`;
      await mkdir(path.dirname(path.join(root, relativePath)), { recursive: true });
      await writeFile(path.join(root, relativePath), raw);
      environment.hashes.conformance[`${draft}/${id}`] = sha256(raw);
      files.reports.push(relativePath);
    }
    for (const [scope, formatProfile, phases, phaseRoot] of [
      [`${draft}/setup`, null, ["setup"], draft],
      ...formatProfiles.map((profile) => [
        `${draft}/${profile}`,
        profile,
        ["execution", "cold-execution"],
        `${draft}/profiles/${profile}`
      ])
    ]) {
      environment.hashes.performance[scope] = {
        intersections: {},
        intersectionArtifacts: {}
      };
      for (const phase of phases) {
        environment.sampleRuntimeProvenance.scopes[
          phase === "setup"
            ? `${draft}/setup`
            : `${draft}/${formatProfile}/${phase}`
        ] = {};
        const intersectionPath = `${phaseRoot}/intersections/${phase}.json`;
        const intersection = {
          intersectionVersion: 12,
          performanceIdentityVersion: 8,
          performanceIdentity: {
            performanceIdentityVersion: 8,
            draft,
            formatProfile,
            phase
          }
        };
        const intersectionRaw = `${JSON.stringify(intersection)}\n`;
        const intersectionIdentity = performanceIdentitySha256(intersection);
        const intersectionArtifact = sha256(intersectionRaw);
        const samplePath = `${phaseRoot}/${phase}/samples.json`;
        const sampleRaw = `${JSON.stringify({
          benchmarkVersion: 11,
          benchmarkMode: "full",
          phase,
          draft,
          formatProfile,
          intersectionSha256: intersectionIdentity,
          emptyReason: null,
          participantOrderByRound: [
            { round: 1, validators: [] },
            { round: 2, validators: [] }
          ],
          samples: []
        })}\n`;
        await mkdir(path.dirname(path.join(root, intersectionPath)), {
          recursive: true
        });
        await mkdir(path.dirname(path.join(root, samplePath)), { recursive: true });
        await writeFile(path.join(root, intersectionPath), intersectionRaw);
        await writeFile(
          path.join(root, `${phaseRoot}/intersections/${phase}.sha256`),
          `${intersectionIdentity}\n`
        );
        await writeFile(
          path.join(root, `${phaseRoot}/intersections/${phase}.artifact.sha256`),
          `${intersectionArtifact}\n`
        );
        await writeFile(path.join(root, samplePath), sampleRaw);
        const sampleHashKey = phase === "cold-execution"
          ? "coldExecutionSamples"
          : `${phase}Samples`;
        environment.hashes.performance[scope][sampleHashKey] = sha256(sampleRaw);
        environment.hashes.performance[scope].intersections[phase] =
          intersectionIdentity;
        environment.hashes.performance[scope].intersectionArtifacts[phase] =
          intersectionArtifact;
        files.intersections.push(intersectionPath);
        files.samples.push(samplePath);
      }
    }
  }
  const mutationDocumentPath = "mutations/fixture.md";
  const mutationDocumentRaw = "fixture mutation inventory\n";
  const mutationManifest = {
    mutationReportVersion: 2,
    documents: [
      {
        relativePath: mutationDocumentPath,
        sha256: sha256(mutationDocumentRaw)
      }
    ]
  };
  const mutationManifestRaw = `${JSON.stringify(mutationManifest, null, 2)}\n`;
  await mkdir(path.join(root, "mutations"), { recursive: true });
  await writeFile(path.join(root, mutationDocumentPath), mutationDocumentRaw);
  await writeFile(path.join(root, "mutations/index.json"), mutationManifestRaw);
  environment.hashes.mutationDocuments = {
    manifest: sha256(mutationManifestRaw),
    documents: {
      [mutationDocumentPath]: sha256(mutationDocumentRaw)
    }
  };
  const index = {
    resultsVersion: 14,
    benchmarkMode: "full",
    mutationDocuments: {
      manifest: "mutations/index.json",
      count: 1,
      mutationReportVersion: 2
    }
  };
  return { root, environment, index, files };
}

test("pipeline validator parsing accepts one canonical ID and rejects ambiguous input", () => {
  assert.deepEqual(parsePipelineArguments(["--validator", "schema-shield"]), {
    mode: "full",
    controllerDeadlineMilliseconds: null,
    eligibilityThresholdPercent: "98",
    validator: "schema-shield",
    bench: null
  });
  assert.deepEqual(
    parsePipelineArguments(["--quick", "--validator", "ajv"]),
    {
      mode: "quick",
      controllerDeadlineMilliseconds: null,
      eligibilityThresholdPercent: "98",
      validator: "ajv",
      bench: null
    }
  );
  for (const args of [
    ["--validator"],
    ["--validator", "AJV"],
    ["--validator", "missing"],
    ["--validator", "ajv", "--validator", "schema-shield"]
  ]) {
    assert.throws(
      () => parsePipelineArguments(args),
      /--validator.*canonical|--validator.*exactly once/
    );
  }
});

test("pipeline accepts a validator and phase selector together", () => {
  assert.deepEqual(
    parsePipelineArguments(["--quick", "--validator", "ajv", "--bench", "execution"]),
    {
      mode: "quick",
      controllerDeadlineMilliseconds: null,
      eligibilityThresholdPercent: "98",
      validator: "ajv",
      bench: "execution"
    }
  );
});

test("diagnostic pipeline validates the baseline before forwarding the selected validator", async () => {
  const events = [];
  await runPipeline({
    mode: "quick",
    validator: "ajv",
    prepareBaseline: async (context) => {
      events.push({ type: "baseline", ...context });
    },
    runCommand: async (command, mode, resultsRoot, _runContext, _deadline, _threshold, validator) => {
      events.push({ type: "command", command, mode, resultsRoot, validator });
    },
    writeProgress() {}
  });
  assert.equal(events[0].type, "baseline");
  assert.equal(events[0].validator, "ajv");
  assert.deepEqual(
    events.slice(1).map(({ command, validator }) => ({ command, validator })),
    pipelineCommands.map((command) => ({ command, validator: "ajv" }))
  );
});

test("diagnostic baseline rejects absent, mismatched, and collectively stale cohorts", () => {
  const current = cohortIdentity();
  assert.throws(
    () => assertCompatibleDiagnosticBaseline({
      mode: "full",
      validator: "schema-shield",
      validatorIds,
      baselineIndex: null,
      baselineEnvironment: null,
      currentCohortIdentity: current
    }),
    /run the full benchmark first/i
  );

  const mismatches = [
    ["mode", cohortIdentity({ benchmarkMode: "quick" })],
    ["environment", cohortIdentity({
      runtimeEnvironment: {
        ...current.runtimeEnvironment,
        cpuModels: ["Different CPU"]
      }
    })],
    ["contract", cohortIdentity({ benchmarkContractSha256: "changed" })],
    ["rounds", cohortIdentity({ rounds: 1 })],
    ["harness", cohortIdentity({ sharedHarnessSha256: "changed" })],
    ["package lock", cohortIdentity({ packageLockSha256: "changed" })],
    ["npm snapshot lock", cohortIdentity({ npmSnapshotLockSha256: "changed" })],
    ["suite lock", cohortIdentity({ suiteLockSha256: "changed" })],
    ["threshold", cohortIdentity({ eligibilityThresholdPercent: "99" })]
  ];
  for (const [label, baselineCohortIdentity] of mismatches) {
    assert.throws(
      () => assertCompatibleDiagnosticBaseline({
        mode: "full",
        validator: "schema-shield",
        validatorIds,
        baselineIndex: { benchmarkMode: "full" },
        baselineEnvironment: { cohortIdentity: baselineCohortIdentity },
        currentCohortIdentity: current
      }),
      new RegExp(`${label}.*full benchmark`, "i")
    );
  }
});

test("phase-only refresh requires a complete compatible baseline before measurement", () => {
  const current = cohortIdentity();
  assert.throws(
    () =>
      assertCompatibleDiagnosticBaseline({
        mode: "quick",
        validator: null,
        validatorIds,
        baselineIndex: null,
        baselineEnvironment: null,
        currentCohortIdentity: current
      }),
    /full Quick benchmark first/i
  );
  assert.doesNotThrow(() =>
    assertCompatibleDiagnosticBaseline({
      mode: "full",
      validator: null,
      validatorIds,
      baselineIndex: { benchmarkMode: "full" },
      baselineEnvironment: { cohortIdentity: current },
      currentCohortIdentity: current
    })
  );
  assert.throws(
    () =>
      assertCompatibleDiagnosticBaseline({
        mode: "full",
        validator: null,
        validatorIds,
        baselineIndex: { benchmarkMode: "full" },
        baselineEnvironment: { cohortIdentity: current },
        currentCohortIdentity: cohortIdentity({
          benchmarkContractSha256: "changed"
        })
      }),
    /contract mismatch.*full benchmark/i
  );
});

test("every methodological source changes the shared identity and requires a full run", async () => {
  const requiredSources = [
    "src/conformance.js",
    "src/formats.js",
    "src/schema-profile.js",
    "src/performance-corpus.js",
    "src/intersection.js",
    "src/eligibility.js"
  ];
  for (const relativePath of requiredSources) {
    assert.ok(
      benchmarkApi.measurementSourcePaths.includes(relativePath),
      `${relativePath} must participate in the shared methodology identity`
    );
  }
  assert.equal(
    benchmarkApi.measurementSourcePaths.some((relativePath) =>
      /(^|\/)(results|tmp|\.cache)(\/|$)|timestamp/i.test(relativePath)
    ),
    false
  );

  const root = path.join(
    benchmarkRoot,
    "tmp",
    `measurement-identity-${process.pid}-${Date.now()}`
  );
  try {
    for (const relativePath of benchmarkApi.measurementSourcePaths) {
      const target = path.join(root, relativePath);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, await readFile(path.join(benchmarkRoot, relativePath)));
    }
    const baselineHash = await benchmarkApi.createMeasurementSourceIdentity(root);
    for (const relativePath of benchmarkApi.measurementSourcePaths) {
      const target = path.join(root, relativePath);
      const original = await readFile(target);
      await writeFile(target, Buffer.concat([original, Buffer.from("\n// changed\n")]));
      const changedHash = await benchmarkApi.createMeasurementSourceIdentity(root);
      assert.notEqual(changedHash, baselineHash, relativePath);
      assert.throws(
        () =>
          assertCompatibleDiagnosticBaseline({
            mode: "full",
            validator: "schema-shield",
            validatorIds,
            baselineIndex: { benchmarkMode: "full" },
            baselineEnvironment: {
              cohortIdentity: cohortIdentity({ sharedHarnessSha256: baselineHash })
            },
            currentCohortIdentity: cohortIdentity({
              sharedHarnessSha256: changedHash
            })
          }),
        /harness mismatch.*full benchmark/i,
        relativePath
      );
      await writeFile(target, original);
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("diagnostic baseline verifies report, intersection, sample, and mutation hashes", async () => {
  const corruptions = [
    {
      label: "conformance report",
      mutate: async ({ root, files }) =>
        writeFile(path.join(root, files.reports[0]), "corrupt report\n")
    },
    {
      label: "intersection artifact",
      mutate: async ({ root, files }) =>
        writeFile(path.join(root, files.intersections[0]), "{}\n")
    },
    {
      label: "samples",
      mutate: async ({ root, files }) =>
        writeFile(path.join(root, files.samples[0]), "{}\n")
    },
    {
      label: "mutation inventory",
      mutate: async ({ root }) =>
        writeFile(path.join(root, "mutations/index.json"), "{}\n")
    }
  ];
  for (const corruption of corruptions) {
    const fixture = await diagnosticBaselineFixture(corruption.label);
    try {
      await corruption.mutate(fixture);
      await assert.rejects(
        () =>
          assertCompleteDiagnosticBaseline({
            mode: "full",
            resultsRoot: fixture.root,
            environment: fixture.environment,
            index: fixture.index
          }),
        /complete compatible publication/i,
        corruption.label
      );
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  }
});

test("diagnostic baseline rejects missing indexed artifacts before measurement", async () => {
  const fixture = await diagnosticBaselineFixture("incomplete");
  try {
    await unlink(path.join(fixture.root, fixture.files.samples[0]));
    await assert.rejects(
      () =>
        assertCompleteDiagnosticBaseline({
          mode: "full",
          resultsRoot: fixture.root,
          environment: fixture.environment,
          index: fixture.index
        }),
      /complete compatible publication/i
    );
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});

test("diagnostic baseline rejects file and directory symlinks before reuse", async () => {
  const cases = [
    { kind: "file", destination: "internal" },
    { kind: "file", destination: "external" },
    { kind: "directory", destination: "internal" },
    { kind: "directory", destination: "external" }
  ];
  for (const fixtureCase of cases) {
    const fixture = await diagnosticBaselineFixture(
      `${fixtureCase.kind}-${fixtureCase.destination}`
    );
    const externalRoot = `${fixture.root}-external`;
    try {
      await mkdir(externalRoot, { recursive: true });
      const internalTarget = fixtureCase.kind === "file"
        ? path.join(fixture.root, "internal-target.txt")
        : path.join(fixture.root, "internal-target");
      const externalTarget = fixtureCase.kind === "file"
        ? path.join(externalRoot, "external-target.txt")
        : path.join(externalRoot, "external-target");
      if (fixtureCase.kind === "file") {
        await writeFile(internalTarget, "internal\n");
        await writeFile(externalTarget, "external\n");
      } else {
        await mkdir(internalTarget, { recursive: true });
        await mkdir(externalTarget, { recursive: true });
      }
      const target = fixtureCase.destination === "internal"
        ? internalTarget
        : externalTarget;
      const linkPath = path.join(
        fixture.root,
        "mutations",
        `${fixtureCase.kind}-${fixtureCase.destination}`
      );
      await symlink(target, linkPath, fixtureCase.kind === "file" ? "file" : "dir");
      await assert.rejects(
        () =>
          assertCompleteDiagnosticBaseline({
            mode: "full",
            resultsRoot: fixture.root,
            environment: fixture.environment,
            index: fixture.index
          }),
        /complete compatible publication.*symbolic links/i,
        `${fixtureCase.kind} symlink to ${fixtureCase.destination} target`
      );
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
      await rm(externalRoot, { recursive: true, force: true });
    }
  }
});

test("diagnostic baseline permits only the selected validator runtime to change", () => {
  const baseline = cohortIdentity();
  const current = cohortIdentity({
    validatorRuntimeSha256: {
      ...baseline.validatorRuntimeSha256,
      "draft6/schema-shield": "new-shield-runtime"
    }
  });
  assert.deepEqual(
    assertCompatibleDiagnosticBaseline({
      mode: "full",
      validator: "schema-shield",
      validatorIds,
      baselineIndex: { benchmarkMode: "full" },
      baselineEnvironment: { cohortIdentity: baseline },
      currentCohortIdentity: current
    }),
    { refreshes: [] }
  );
  assert.throws(
    () => assertCompatibleDiagnosticBaseline({
      mode: "full",
      validator: "ajv",
      validatorIds,
      baselineIndex: { benchmarkMode: "full" },
      baselineEnvironment: { cohortIdentity: baseline },
      currentCohortIdentity: current
    }),
    /validator runtime.*full benchmark/i
  );
});

test("diagnostic intersection guard rejects roster, eligibility, or common corpus changes", () => {
  const previous = {
    "draft6/base": {
      setup: "setup-hash",
      execution: "execution-hash"
    }
  };
  assert.doesNotThrow(() =>
    assertCompatibleIntersections(previous, structuredClone(previous), "full")
  );
  for (const changed of [
    {},
    { "draft6/base": { setup: "changed", execution: "execution-hash" } },
    { "draft6/base": { setup: "setup-hash", execution: "changed" } }
  ]) {
    assert.throws(
      () => assertCompatibleIntersections(previous, changed, "full"),
      /eligibility, roster, or common PASS corpus.*full benchmark/i
    );
  }
});

test("flat intersection hashes retain the draft-scoped Setup inventory", () => {
  assert.deepEqual(
    diagnosticApi.groupIntersectionHashesByScope({
      "draft6/setup": "setup-hash",
      "draft6/base/execution": "execution-hash",
      "draft6/base/cold-execution": "cold-hash"
    }),
    {
      "draft6/setup": { setup: "setup-hash" },
      "draft6/base": {
        execution: "execution-hash",
        "cold-execution": "cold-hash"
      }
    }
  );
});

test("diagnostic phase reconciliation refreshes only the selected validator", () => {
  const previous = {
    benchmarkVersion: 3,
    phase: "execution",
    draft: "draft6",
    formatProfile: "base",
    benchmarkMode: "full",
    participants: ["ajv", "schema-shield"],
    participantOrderByRound: Array.from({ length: 6 }, (_value, index) => ({
      round: index + 1,
      validators:
        index % 2 === 0
          ? ["ajv", "schema-shield"]
          : ["schema-shield", "ajv"]
    })),
    samples: Array.from({ length: 6 }, (_value, index) => [
      { validator: "ajv", round: index + 1, throughput: 10 + index },
      { validator: "schema-shield", round: index + 1, throughput: 20 + index }
    ]).flat()
  };
  const freshSamples = Array.from({ length: 6 }, (_value, index) => ({
    validator: "schema-shield",
    round: index + 1,
    throughput: 30 + index
  }));
  const reconciled = reconcileDiagnosticPhaseResult({
    previousResult: previous,
    validator: "schema-shield",
    freshSamples,
    startedAt: "2026-01-01T00:00:00.000Z",
    endedAt: "2026-01-01T00:00:01.000Z"
  });
  assert.deepEqual(
    reconciled.samples.map(({ validator, round, throughput }) => ({
      validator,
      round,
      throughput
    })),
    Array.from({ length: 6 }, (_value, index) => {
      const samples = {
        ajv: { validator: "ajv", round: index + 1, throughput: 10 + index },
        "schema-shield": {
          validator: "schema-shield",
          round: index + 1,
          throughput: 30 + index
        }
      };
      return (index % 2 === 0
        ? ["ajv", "schema-shield"]
        : ["schema-shield", "ajv"]
      ).map((validator) => samples[validator]);
    }).flat()
  );
  const summary = summarizePhase(reconciled, "full");
  assert.equal(summary.validators["schema-shield"].median, 32.5);
  assert.equal(summary.validators["schema-shield"].scoreRelativeToBest, 100);
  assert.equal(summary.validators.ajv.median, 12.5);
  assert.equal(
    summary.validators.ajv.scoreRelativeToBest,
    (12.5 / 32.5) * 100
  );
});

test("diagnostic metadata traces chained refreshes and a full run clears it", () => {
  assert.deepEqual(
    createDiagnosticPublication({
      previousDiagnostic: null,
      validator: "schema-shield"
    }),
    {
      diagnostic: true,
      refreshes: [{ validator: "schema-shield", bench: null }]
    }
  );
  assert.deepEqual(
    createDiagnosticPublication({
      previousDiagnostic: {
        diagnostic: true,
        refreshes: [{ validator: "schema-shield", bench: "setup" }]
      },
      validator: "ajv",
      bench: "cold"
    }),
    {
      diagnostic: true,
      refreshes: [
        { validator: "ajv", bench: "cold" },
        { validator: "schema-shield", bench: "setup" }
      ]
    }
  );
  assert.deepEqual(
    createDiagnosticPublication({
      previousDiagnostic: {
        diagnostic: true,
        refreshes: [{ validator: "schema-shield", bench: null }]
      },
      validator: "ajv"
    }),
    {
      diagnostic: true,
      refreshes: [
        { validator: "ajv", bench: null },
        { validator: "schema-shield", bench: null }
      ]
    }
  );
  const diagnosticIndex = createResultsIndex("quick", null, "98", {
    validator: "ajv",
    bench: "execution",
    refreshes: [{ validator: "ajv", bench: "execution" }]
  });
  assert.equal(diagnosticIndex.benchmarkMode, "quick");
  assert.deepEqual(diagnosticIndex.diagnostic, {
    diagnostic: true,
    current: { validator: "ajv", bench: "execution" },
    refreshes: [{ validator: "ajv", bench: "execution" }]
  });
  assert.match(diagnosticIndex.publicationWarning, /full Quick benchmark/i);
  assert.equal(createResultsIndex("full").diagnostic, undefined);
});

test("combined validator and bench refresh preserves runtime provenance for omitted phases", () => {
  const baselineRuntime = "a".repeat(64);
  const refreshedRuntime = "b".repeat(64);
  const provenance = diagnosticApi.createSampleRuntimeProvenance([
    {
      phase: "setup",
      draft: "draft6",
      formatProfile: null,
      samples: [
        {
          validator: "ajv",
          validatorRuntimeSha256: refreshedRuntime
        }
      ]
    },
    {
      phase: "execution",
      draft: "draft6",
      formatProfile: "base",
      samples: [
        {
          validator: "ajv",
          validatorRuntimeSha256: baselineRuntime
        }
      ]
    }
  ]);

  assert.deepEqual(provenance, {
    provenanceVersion: 1,
    scopes: {
      "draft6/setup": { ajv: refreshedRuntime },
      "draft6/base/execution": { ajv: baselineRuntime }
    }
  });
  assert.deepEqual(
    createDiagnosticPublication({
      previousDiagnostic: null,
      validator: "ajv",
      bench: "setup"
    }),
    {
      diagnostic: true,
      refreshes: [{ validator: "ajv", bench: "setup" }]
    }
  );
  assert.throws(
    () =>
      diagnosticApi.createSampleRuntimeProvenance([
        {
          phase: "execution",
          draft: "draft6",
          formatProfile: "base",
          samples: [
            { validator: "ajv", validatorRuntimeSha256: baselineRuntime },
            { validator: "ajv", validatorRuntimeSha256: refreshedRuntime }
          ]
        }
      ]),
    /changes across rounds/
  );
});

test("benchmark titles distinguish canonical and diagnostic publications exactly", () => {
  assert.equal(benchmarkTitle("full", null), "# JSON Schema Validator Bench");
  assert.equal(
    benchmarkTitle("quick", null),
    "# JSON Schema Validator Bench (quick)"
  );
  assert.equal(
    benchmarkTitle("full", { validator: "ajv" }),
    "# JSON Schema Validator Bench (diagnostic)"
  );
  assert.equal(
    benchmarkTitle("quick", { validator: "ajv" }),
    "# JSON Schema Validator Bench (quick diagnostic)"
  );
});
