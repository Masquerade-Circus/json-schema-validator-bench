import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { EventEmitter } from "node:events";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  symlink,
  writeFile
} from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  getLastCompleteUtcWeek,
  runHarness,
  validateMetadataSnapshot,
  verifySuiteCheckout
} from "../src/cli.js";
import { runChildProcess } from "../src/child-process.js";
import {
  analyzeSchemaCapabilities,
  canonicalJson,
  createResourceRegistry,
  getFormatProfile,
  loadSuite,
  sha256
} from "../src/suite.js";
import {
  adapterRegistry,
  compareCanonicalAdapters,
  getAdapterFactory,
  getRegisteredAdapter,
  rotateRoundOrder
} from "../src/adapters/index.js";
import { defineAdapter } from "../src/adapter-api.js";
import * as Hyperjump2019 from "@hyperjump/json-schema/draft-2019-09";
import * as Hyperjump2020 from "@hyperjump/json-schema/draft-2020-12";
import {
  assertReportCoverage,
  classifySchemaCases,
  runAdapterConformance
} from "../src/conformance.js";
import {
  createErrorDocuments,
  createGlobalErrorDocuments,
  createValidatorProfiles,
  packageInventoryNames,
  renderConformanceMarkdown,
  summarizePhase,
  summarizeThroughputs,
  validateInstalledVersions,
  validateSampleSet
} from "../src/report.js";
import {
  createCompileEntries,
  createIntersection,
  createPhaseEligibility,
  mutationRecordKey,
  performanceEligibilityPolicy,
  performanceIdentitySha256,
  validateIntersectionInputs
} from "../src/intersection.js";
import {
  compileChecksum,
  executeWorkerRequest,
  runCompileSample,
  runExecutionSample,
  validateWorkerRequest
} from "../src/worker.js";
import {
  benchmarkConstants,
  benchmarkModes,
  benchmarkContractSha256,
  createBenchmarkContract,
  createBenchmarkContractHash,
  createSampleCacheContext,
  createSampleCacheIdentity,
  createValidatorRuntimeIdentity,
  effectiveWorkerExecArgv,
  hashAdapterRuntimeSources,
  hashRuntimePackageBytes,
  memoryBudgetFromEnvironment,
  prepareConfinedCacheDirectory,
  prepareConfinedCacheOutput,
  publishSampleCheckpoint,
  readSampleCheckpoint,
  runBenchmarkSample,
  sampleContractVersion,
  sampleCheckpointPath,
  verifyBenchmarkArtifacts,
  writeConfinedCacheOutput
} from "../src/benchmark.js";
import { assertCompatibleDiagnosticBaseline } from "../src/diagnostic.js";
import { derivePerformanceCorpus } from "../src/performance-corpus.js";
import { createIntegrityTracker } from "../src/integrity.js";
import {
  draftIds,
  getColdExecutionParticipants,
  getCompileParticipants,
  getParticipants,
  getRoundOrder
} from "../src/matrix.js";

const benchmarkRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const fixtureSuiteRoot = path.join(
  benchmarkRoot,
  "test",
  "fixtures",
  "suite"
);

test("child process failures preserve actionable TAP, stdout, stderr, and process metadata", async () => {
  const fixture = path.join(
    benchmarkRoot,
    "test",
    "fixtures",
    "child-process-failure.mjs"
  );
  const childEnvironment = { ...process.env };
  delete childEnvironment.NODE_TEST_CONTEXT;
  await assert.rejects(
    () =>
      runChildProcess(process.execPath, [fixture], {
        cwd: benchmarkRoot,
        env: childEnvironment,
        streamOutput: false
      }),
    (error) => {
      assert.deepEqual(error.command, [process.execPath, fixture]);
      assert.equal(error.cwd, benchmarkRoot);
      assert.equal(error.exitCode, 1);
      assert.equal(error.signal, null);
      assert.match(error.stdout, /CONTROLLED_CHILD_STDOUT/);
      assert.match(error.stdout, /CONTROLLED_CHILD_ASSERTION/);
      assert.match(error.stdout, /child-process-failure\.mjs:\d+:/);
      assert.match(error.stderr, /CONTROLLED_CHILD_STDERR/);
      assert.match(error.message, /Command:/);
      assert.match(error.message, /CWD:/);
      assert.match(error.message, /Exit code: 1/);
      assert.match(error.message, /Signal: none/);
      assert.match(error.message, /stdout:[\s\S]*CONTROLLED_CHILD_STDOUT/);
      assert.match(error.message, /stderr:[\s\S]*CONTROLLED_CHILD_STDERR/);
      return true;
    }
  );

  await assert.rejects(
    () =>
      runChildProcess(
        process.execPath,
        ["--test", "--test-reporter=tap", fixture],
        {
        cwd: benchmarkRoot,
        env: childEnvironment,
        streamOutput: false
        }
      ),
    (error) => {
      assert.match(error.stdout, /TAP version 13/);
      assert.match(error.stdout, /CONTROLLED_CHILD_ASSERTION/);
      assert.match(error.stdout, /child-process-failure\.mjs:\d+:/);
      return true;
    }
  );

  const completeOutput = `BEGIN-${"x".repeat(36)}-END`;
  await assert.rejects(
    () =>
      runChildProcess(
        process.execPath,
        ["-e", `process.stdout.write(${JSON.stringify(completeOutput)}); process.exit(1)`],
        {
          cwd: benchmarkRoot,
          env: childEnvironment,
          streamOutput: false,
          maximumCaptureBytes: 64
        }
      ),
    (error) => {
      assert.equal(error.stdout, completeOutput);
      return true;
    }
  );

  await assert.rejects(
    () =>
      runChildProcess(
        process.execPath,
        ["-e", `process.stdout.write("BEGIN-${"x".repeat(100)}-END"); process.exit(1)`],
        {
          cwd: benchmarkRoot,
          env: childEnvironment,
          streamOutput: false,
          maximumCaptureBytes: 64
        }
      ),
    (error) => {
      assert.match(error.stdout, /^BEGIN-/);
      assert.match(error.stdout, /truncated \d+ bytes; preserved beginning and end/);
      assert.match(error.stdout, /-END$/);
      return true;
    }
  );
});

test("child streaming honors independent stdout and stderr backpressure", async () => {
  class SlowSink extends EventEmitter {
    constructor(delay) {
      super();
      this.delay = delay;
      this.blocked = false;
      this.blockedOnce = false;
      this.chunks = [];
      this.writesWhileBlocked = 0;
      this.drainAt = null;
    }

    write(chunk) {
      if (this.blocked) {
        this.writesWhileBlocked += 1;
      }
      this.chunks.push(Buffer.from(chunk));
      if (this.blockedOnce) {
        return true;
      }
      this.blocked = true;
      this.blockedOnce = true;
      setTimeout(() => {
        this.blocked = false;
        this.drainAt = Date.now();
        this.emit("drain");
      }, this.delay);
      return false;
    }

    text() {
      return Buffer.concat(this.chunks).toString("utf8");
    }
  }

  const stdoutSink = new SlowSink(60);
  const stderrSink = new SlowSink(100);
  const count = 30;
  const script = `let index=0; const emit=()=>{ if(index===${count}) return; process.stdout.write("OUT-"+index+"|"); process.stderr.write("ERR-"+index+"|"); index+=1; setTimeout(emit, 3); }; emit();`;
  const result = await runChildProcess(process.execPath, ["-e", script], {
    cwd: benchmarkRoot,
    streamOutput: true,
    stdoutSink,
    stderrSink,
    maximumCaptureBytes: 64
  });
  const resolvedAt = Date.now();
  const expectedStdout = Array.from(
    { length: count },
    (_, index) => `OUT-${index}|`
  ).join("");
  const expectedStderr = Array.from(
    { length: count },
    (_, index) => `ERR-${index}|`
  ).join("");

  assert.equal(stdoutSink.text(), expectedStdout);
  assert.equal(stderrSink.text(), expectedStderr);
  assert.equal(stdoutSink.writesWhileBlocked, 0);
  assert.equal(stderrSink.writesWhileBlocked, 0);
  assert.ok(stdoutSink.chunks.length > 1);
  assert.ok(stderrSink.chunks.length > 1);
  assert.ok(resolvedAt >= stdoutSink.drainAt);
  assert.ok(resolvedAt >= stderrSink.drainAt);
  assert.equal(stdoutSink.listenerCount("drain"), 0);
  assert.equal(stderrSink.listenerCount("drain"), 0);
  assert.match(result.stdout, /^OUT-/);
  assert.match(result.stdout, /truncated \d+ bytes; preserved beginning and end/);
  assert.match(result.stdout, /\|$/);
  assert.match(result.stderr, /^ERR-/);
  assert.match(result.stderr, /truncated \d+ bytes; preserved beginning and end/);
  assert.match(result.stderr, /\|$/);
  assert.ok(Buffer.byteLength(result.stdout) < Buffer.byteLength(expectedStdout));
  assert.ok(Buffer.byteLength(result.stderr) < Buffer.byteLength(expectedStderr));
  assert.equal(result.exitCode, 0);
  assert.equal(result.signal, null);

  const failingStdoutSink = new SlowSink(40);
  const failingStderrSink = new SlowSink(70);
  await assert.rejects(
    () =>
      runChildProcess(
        process.execPath,
        [
          "-e",
          'process.stdout.write("FAIL-OUT"); process.stderr.write("FAIL-ERR"); process.exitCode=1;'
        ],
        {
          cwd: benchmarkRoot,
          streamOutput: true,
          stdoutSink: failingStdoutSink,
          stderrSink: failingStderrSink
        }
      ),
    (error) => {
      const rejectedAt = Date.now();
      assert.ok(rejectedAt >= failingStdoutSink.drainAt);
      assert.ok(rejectedAt >= failingStderrSink.drainAt);
      assert.equal(error.exitCode, 1);
      assert.equal(error.signal, null);
      assert.equal(error.stdout, "FAIL-OUT");
      assert.equal(error.stderr, "FAIL-ERR");
      return true;
    }
  );
  assert.equal(failingStdoutSink.listenerCount("drain"), 0);
  assert.equal(failingStderrSink.listenerCount("drain"), 0);
});

test("public harness runner isolates staging state and accepts an explicit test fixture", async () => {
  const fixture = path.join(
    benchmarkRoot,
    "test",
    "fixtures",
    "child-process-success.mjs"
  );
  const result = await runHarness({
    testFiles: [fixture],
    env: {
      ...process.env,
      BENCHMARK_RESULTS_ROOT: path.join(benchmarkRoot, ".cache", "missing-results"),
      BENCHMARK_PIPELINE_STARTED_AT: "2026-07-29T00:00:00.000Z",
      BENCHMARK_ELIGIBILITY_THRESHOLD_PERCENT: "98.5"
    },
    streamOutput: false
  });

  assert.equal(result.exitCode, 0);
  assert.match(result.stdout, /TAP version 13/);
  assert.match(result.stdout, /controlled harness success/);
});

test("public CLI harness streams one actionable TAP failure with process metadata", async () => {
  if (process.env.BENCHMARK_PUBLIC_HARNESS_FAILURE_FIXTURE === "active") {
    throw new Error("CONTROLLED_PUBLIC_HARNESS_FAILURE");
  }
  const temporaryRoot = path.join(
    benchmarkRoot,
    "tmp",
    `public-harness-failure-${process.pid}-${Date.now()}`
  );
  await mkdir(temporaryRoot, { recursive: true });

  try {
    await assert.rejects(
      () =>
        runChildProcess(
          process.execPath,
          [path.join(benchmarkRoot, "src", "cli.js"), "harness"],
          {
            cwd: benchmarkRoot,
            env: {
              ...process.env,
              BENCHMARK_RESULTS_ROOT: path.join(
                temporaryRoot,
                "missing-staging-results"
              ),
              BENCHMARK_PIPELINE_STARTED_AT: "2026-07-29T00:00:00.000Z",
              BENCHMARK_PUBLIC_HARNESS_FAILURE_FIXTURE: "active"
            },
            streamOutput: false,
            maximumCaptureBytes: 4 * 1024 * 1024
          }
        ),
      (error) => {
        assert.equal(error.cwd, benchmarkRoot);
        assert.equal(error.exitCode, 1);
        assert.equal(error.signal, null);
        assert.equal(
          [...error.stdout.matchAll(/TAP version 13/g)].length,
          1
        );
        assert.match(error.stdout, /CONTROLLED_PUBLIC_HARNESS_FAILURE/);
        assert.match(error.stdout, /not ok \d+/);
        assert.match(error.stdout, /harness\.test\.js:\d+:/);
        assert.equal(
          [...error.stderr.matchAll(/Child process failed\./g)].length,
          1
        );
        assert.match(error.stderr, /Command:/);
        assert.match(error.stderr, /--test-reporter=tap/);
        assert.match(error.stderr, /CWD:/);
        assert.match(error.stderr, /Exit code: 1/);
        assert.match(error.stderr, /Signal: none/);
        assert.match(
          error.stderr,
          /stdout and stderr were streamed above without duplication/
        );
        return true;
      }
    );
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("public quick smoke completes without performance mutation metadata", async () => {
  const temporaryRoot = path.join(
    benchmarkRoot,
    "tmp",
    `public-smoke-${process.pid}-${Date.now()}`
  );
  await mkdir(temporaryRoot, { recursive: true });
  try {
    const result = await runChildProcess(
      process.execPath,
      [path.join(benchmarkRoot, "src", "cli.js"), "smoke", "--quick"],
      {
        cwd: benchmarkRoot,
        env: {
          ...process.env,
          BENCHMARK_RESULTS_ROOT: path.join(temporaryRoot, "results"),
          BENCHMARK_PIPELINE_STARTED_AT: "2026-07-29T00:00:00.000Z"
        },
        streamOutput: false
      }
    );
    const output = JSON.parse(result.stdout);
    assert.equal(result.exitCode, 0);
    assert.equal(result.signal, null);
    assert.equal(result.stderr, "");
    assert.ok(output.adapters.length > 0);
    assert.equal(output.adapters.length, output.stressSamples.length);
    assert.equal(
      output.stressSamples.some((sample) => Object.hasOwn(sample, "mutationCount")),
      false
    );
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

const validLock = {
  lockVersion: 1,
  repository:
    "https://github.com/json-schema-org/JSON-Schema-Test-Suite.git",
  commit: "0c7b65dc16dd8eaa7bd83e21099c76610c3b246a",
  tree: "58b582c8c67aae71d27aafba0fb7120037289d4d",
  drafts: ["draft4", "draft6", "draft7", "draft2019-09", "draft2020-12"],
  testsRoot: "tests",
  remotesRoot: "remotes"
};

test("integrity tracker observes arbitrary graph mutations without invoking getters", () => {
  function fixture() {
    let getterCalls = 0;
    const localSymbol = Symbol("fixture");
    const globalSymbol = Symbol.for("benchmark-integrity-fixture");
    const shared = { value: 1 };
    const root = {
      aliasA: shared,
      aliasB: shared,
      functionValue: function fixtureFunction() {},
      map: new Map([[localSymbol, shared]]),
      set: new Set([globalSymbol, shared]),
      symbolValue: localSymbol
    };
    root.self = root;
    Object.defineProperty(root, "hidden", {
      value: { enabled: true },
      enumerable: false,
      configurable: true,
      writable: true
    });
    Object.defineProperty(root, "accessor", {
      get() {
        getterCalls += 1;
        return 1;
      },
      set(_value) {
        getterCalls += 1;
      },
      enumerable: false,
      configurable: true
    });
    root[localSymbol] = globalSymbol;
    return {
      root,
      localSymbol,
      shared,
      getterCalls: () => getterCalls
    };
  }

  const mutations = [
    ({ root }) => Object.setPrototypeOf(root, { changed: true }),
    ({ root }) => Object.defineProperty(root, "hidden", {
      value: { enabled: true },
      enumerable: false,
      configurable: true,
      writable: false
    }),
    ({ root, localSymbol }) => {
      delete root[localSymbol];
      root[Symbol("fixture")] = Symbol.for("benchmark-integrity-fixture");
    },
    ({ root }) => Object.defineProperty(root, "accessor", {
      get() {
        return 1;
      },
      set(_value) {},
      enumerable: false,
      configurable: true
    }),
    ({ root }) => {
      root.self = { self: null };
      root.self.self = root.self;
    },
    ({ root }) => {
      root.aliasB = { value: 1 };
    },
    ({ root, localSymbol }) => {
      root.map.set(localSymbol, { value: 1 });
    },
    ({ root, shared }) => {
      root.set.delete(shared);
      root.set.add({ value: 1 });
    },
    ({ root }) => {
      root.symbolValue = Symbol("fixture");
    },
    ({ root }) => {
      root.functionValue = function fixtureFunction() {};
    },
    ({ root }) => Object.preventExtensions(root)
  ];

  for (const mutate of mutations) {
    const graph = fixture();
    const tracker = createIntegrityTracker(graph.root);
    assert.equal(graph.getterCalls(), 0);
    assert.equal(tracker.verify().unchanged, true);
    mutate(graph);
    const result = tracker.verify();
    assert.equal(result.unchanged, false);
    assert.equal(graph.getterCalls(), 0);
    tracker.release();
  }
});

test("integrity tracker reports the first structural descriptor difference", () => {
  const schema = { type: "integer" };
  const tracker = createIntegrityTracker(schema);
  Object.defineProperty(schema, "__absolute_uri__", {
    value: "https://github.com/cfworker",
    writable: false,
    enumerable: false,
    configurable: false
  });

  const result = tracker.verify();
  tracker.release();
  assert.equal(result.unchanged, false);
  assert.deepEqual(result.difference, {
    path: "$.__absolute_uri__",
    kind: "added",
    before: null,
    after: {
      descriptorType: "data",
      configurable: false,
      enumerable: false,
      writable: false,
      value: { type: "string", value: "https://github.com/cfworker" }
    }
  });
});

test("benchmark rounds use three deterministic antithetic pairs", () => {
  assert.ok(
    compareCanonicalAdapters(
      { displayName: "same", id: "alpha" },
      { displayName: "same", id: "beta" }
    ) < 0
  );

  for (const draft of draftIds) {
    for (const phase of ["setup", "execution", "cold-execution"]) {
      const participants =
        phase === "setup"
          ? getCompileParticipants(draft)
          : phase === "cold-execution"
            ? getColdExecutionParticipants(draft)
            : getParticipants(draft);
      const expected = [...participants]
        .sort((left, right) => {
          if (left.displayName < right.displayName) {
            return -1;
          }
          if (left.displayName > right.displayName) {
            return 1;
          }
          if (left.id < right.id) {
            return -1;
          }
          if (left.id > right.id) {
            return 1;
          }
          return 0;
        })
        .map(({ id }) => id);

      const positionTotals = new Map(expected.map((participant) => [participant, 0]));
      for (let round = 1; round <= benchmarkModes.full.rounds; round += 1) {
        const actual = getRoundOrder({ draft, phase, round });
        assert.deepEqual(
          actual,
          rotateRoundOrder(expected, round),
          `${draft}/${phase}/round-${round}`
        );
        assert.equal(new Set(actual).size, participants.length);
        assert.deepEqual([...actual].sort(), expected.slice().sort());
        actual.forEach((participant, position) => {
          positionTotals.set(
            participant,
            positionTotals.get(participant) + position
          );
        });
      }
      assert.deepEqual(
        new Set(positionTotals.values()),
        new Set([
          (benchmarkModes.full.rounds / 2) * (expected.length - 1)
        ])
      );
    }
  }
});

test("non-metric registry, matrix, contract, and validator profile metadata use canonical name order", () => {
  const canonicalIds = (participants) =>
    [...participants].sort(compareCanonicalAdapters).map(({ id }) => id);

  assert.deepEqual(
    adapterRegistry.map(({ id }) => id),
    canonicalIds(adapterRegistry)
  );

  const contract = createBenchmarkContract("full");
  for (const draft of draftIds) {
    const execution = getParticipants(draft);
    const compile = getCompileParticipants(draft);
    assert.deepEqual(
      execution.map(({ id }) => id),
      canonicalIds(execution),
      `${draft}/execution matrix`
    );
    assert.deepEqual(
      compile.map(({ id }) => id),
      canonicalIds(compile),
      `${draft}/compile matrix`
    );
    assert.deepEqual(
      contract.participantsByDraft[draft].execution,
      canonicalIds(execution),
      `${draft}/execution contract`
    );
    assert.deepEqual(
      contract.participantsByDraft[draft].setup,
      canonicalIds(compile),
      `${draft}/setup contract`
    );
  }

  const draft = "draft6";
  const reports = [...getParticipants(draft)].reverse().map(({ id }) => ({
    draft,
    validator: id,
    version: "1.0.0",
    reportOptions: {},
    reportOptionsSha256: {}
  }));
  assert.deepEqual(
    Object.keys(createValidatorProfiles(reports)).map((key) => key.split("/")[1]),
    canonicalIds(getParticipants(draft))
  );
});

test("published validator summaries and error-document inventories use canonical name order", () => {
  const participants = getParticipants("draft6").slice(0, 3);
  const reversedIds = [...participants].reverse().map(({ id }) => id);
  const summary = summarizePhase(
    {
      phase: "execution",
      draft: "draft6",
      formatProfile: "base",
      intersectionSha256: "a".repeat(64),
      participants: reversedIds,
      samples: reversedIds.map((validator, index) => ({
        validator,
        round: 1,
        throughput: index + 1
      }))
    },
    "quick"
  );
  const expected = participants.map(({ id }) => id);
  assert.deepEqual(Object.keys(summary.validators), expected);

  const reports = participants.map(({ id }) => ({
    draft: "draft6",
    validator: id,
    version: "1.0.0",
    cases: []
  }));
  const documents = createErrorDocuments({
    draft: "draft6",
    reports,
    participants: [...participants].reverse()
  });
  assert.deepEqual(
    documents
      .filter(({ phase, profile }) => phase === "setup" && profile === null)
      .map(({ validator }) => validator),
    expected
  );

  const included = [...participants].reverse().map((participant) => ({
    id: participant.id,
    packageName: participant.packageName,
    version: "1.0.0",
    errors: {
      setup: { records: [] },
      base: { records: [] },
      formats: { records: [] }
    }
  }));
  const globalDocuments = createGlobalErrorDocuments({
    phases: {
      setup: { included },
      "cold-execution": { included },
      execution: { included }
    }
  });
  assert.deepEqual(
    globalDocuments
      .filter(({ phase }) => phase === "setup")
      .map(({ validator }) => validator),
    expected
  );
  for (const document of globalDocuments) {
    assert.equal(document.count, 0);
    assert.match(document.content, /Result: 0 matching/);
    assert.match(document.content, new RegExp(document.status));
  }
});

test("suite checkout rejects mismatched HEAD and tree", async () => {
  const outputs = new Map([
    ["rev-parse HEAD", "f".repeat(40)],
    ["rev-parse HEAD^{tree}", "e".repeat(40)]
  ]);
  const runGit = async (args) => outputs.get(args.slice(-2).join(" "));

  await assert.rejects(
    verifySuiteCheckout(validLock, runGit),
    /suite HEAD mismatch/
  );
});

async function createSuiteFixture(files) {
  const root = path.join(
    benchmarkRoot,
    ".cache",
    "test-fixtures",
    `${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );

  for (const [relativePath, content] of Object.entries(files)) {
    const target = path.join(root, relativePath);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content);
  }

  return root;
}

const validGroup = JSON.stringify([
  {
    description: "group",
    schema: { type: "integer" },
    tests: [{ description: "case", data: 1, valid: true }]
  }
]);

test("suite loader rejects malformed files and groups", async () => {
  const invalidSuites = [
    {
      label: "invalid JSON",
      files: { "tests/draft6/bad.json": "{" },
      pattern: /invalid JSON/
    },
    {
      label: "missing schema",
      files: {
        "tests/draft6/bad.json": JSON.stringify([
          { tests: [{ data: 1, valid: true }] }
        ])
      },
      pattern: /schema/
    },
    {
      label: "non-boolean valid",
      files: {
        "tests/draft6/bad.json": JSON.stringify([
          { schema: {}, tests: [{ data: 1, valid: "true" }] }
        ])
      },
      pattern: /boolean valid/
    }
  ];

  for (const fixture of invalidSuites) {
    const suiteRoot = await createSuiteFixture(fixture.files);
    await assert.rejects(
      loadSuite({
        suiteRoot,
        lock: { ...validLock, drafts: ["draft6"] },
        inventoryPaths: Object.keys(fixture.files),
        writeManifest: false
      }),
      fixture.pattern,
      fixture.label
    );
  }
});

test("suite loader rejects an inventory JSON absent from discovery", async () => {
  const suiteRoot = await createSuiteFixture({
    "tests/draft6/type.json": validGroup
  });

  await assert.rejects(
    loadSuite({
      suiteRoot,
      lock: { ...validLock, drafts: ["draft6"] },
      inventoryPaths: ["tests/draft6/type.json", "tests/draft6/missing.json"],
      writeManifest: false
    }),
    /inventory mismatch/
  );
});

test("suite loader discovers optional files with stable unique IDs", async () => {
  const suiteRoot = await createSuiteFixture({
    "tests/draft6/z.json": validGroup,
    "tests/draft6/optional/format/a.json": validGroup
  });
  const inventoryPaths = [
    "tests/draft6/z.json",
    "tests/draft6/optional/format/a.json"
  ];
  const first = await loadSuite({
    suiteRoot,
    lock: { ...validLock, drafts: ["draft6"] },
    inventoryPaths,
    writeManifest: false
  });
  const second = await loadSuite({
    suiteRoot,
    lock: { ...validLock, drafts: ["draft6"] },
    inventoryPaths: [...inventoryPaths].reverse(),
    writeManifest: false
  });

  assert.deepEqual(first.cases, second.cases);
  assert.equal(new Set(first.cases.map(({ id }) => id)).size, first.cases.length);
  assert.equal(
    first.cases.some(({ formatProfile }) => formatProfile === "format-assertion"),
    true
  );
});

test("suite loader maps remote URLs and absolute $id aliases without network", async () => {
  const loaded = await loadSuite({
    suiteRoot: fixtureSuiteRoot,
    lock: { ...validLock, drafts: ["draft6"] },
    inventoryPaths: ["tests/draft6/type.json"],
    writeManifest: false
  });

  assert.equal(
    loaded.remotes.get("http://localhost:1234/integer.json").type,
    "integer"
  );
  assert.equal(
    loaded.remotes.get("https://example.test/integer.json").type,
    "integer"
  );
});

const adapterFactories = [
  ["SchemaShield", getAdapterFactory("schema-shield")],
  ["AJV", getAdapterFactory("ajv")],
  ["schemasafe", getAdapterFactory("schemasafe")]
];

test("adapters reject unknown drafts", () => {
  for (const [name, createAdapter] of adapterFactories) {
    assert.throws(
      () => createAdapter({ draft: "draft8", resources: [], unknownFormats: [] }),
      /unsupported draft/,
      name
    );
  }
});

test("compiled adapters create independent targets and expose a singular error", async () => {
  for (const [name, createAdapter] of adapterFactories) {
    const adapter = createAdapter({
      draft: "draft7",
      resources: [],
      unknownFormats: []
    });
    const schema = { type: "integer" };
    const first = await adapter.compile(schema);
    const second = await adapter.compile(schema);
    assert.notEqual(first, second, name);
    assert.equal(adapter.validate(first, 1), true, name);
    assert.equal(adapter.validate(first, "1"), false, name);
    assert.equal(
      typeof await adapter.getError({ schema, compiled: first, data: "1" }),
      "string",
      name
    );
  }
});

test("adapters disable defaults, coercion, removal, and input mutation", async () => {
  const contracts = [
    {
      schema: {
        type: "object",
        properties: { value: { type: "integer", default: 1 } },
        required: ["value"]
      },
      data: {},
      expected: false
    },
    { schema: { type: "number" }, data: "1", expected: false },
    {
      schema: {
        type: "object",
        properties: { known: { type: "boolean" } },
        additionalProperties: false
      },
      data: { known: true, extra: true },
      expected: false
    }
  ];

  for (const [name, createAdapter] of adapterFactories) {
    const adapter = createAdapter({
      draft: "draft7",
      resources: [],
      unknownFormats: []
    });
    for (const contract of contracts) {
      const data = structuredClone(contract.data);
      const before = sha256(canonicalJson(data));
      const target = await adapter.compile(contract.schema);
      assert.equal(adapter.validate(target, data), contract.expected, name);
      assert.equal(sha256(canonicalJson(data)), before, name);
    }
  }
});

test("adapters assert common formats and expose first error", async () => {
  for (const [name, createAdapter] of adapterFactories) {
    const adapter = createAdapter({
      draft: "draft7",
      resources: [],
      unknownFormats: ["vendor-format"]
    });
    const email = await adapter.compile({ type: "string", format: "email" });
    assert.equal(
      adapter.validate(email, "not-an-email"),
      false,
      name
    );
    const integer = await adapter.compile({ type: "integer" });
    assert.equal(adapter.validate(integer, "wrong"), false, name);
    assert.equal(
      typeof await adapter.getError({
        schema: { type: "integer" },
        compiled: integer,
        data: "wrong"
      }),
      "string",
      name
    );
  }

  assert.deepEqual(analyzeSchemaCapabilities({ format: "idn-email" }), {
    unsupportedFormats: ["idn-email"],
    unknownFormats: [],
    externalRefs: []
  });
});

test("unknown format handling preserves each adapter conformance behavior", async () => {
  const schema = { type: "string", format: "vendor-format" };
  for (const id of ["schema-shield", "ajv"]) {
    const adapter = getAdapterFactory(id)({
      draft: "draft7",
      formatProfile: "format-assertion",
      resources: [],
      unknownFormats: ["vendor-format"]
    });
    const compiled = await adapter.compile(schema);
    assert.equal(adapter.validate(compiled, "anything"), true, id);
  }
  const schemasafe = getAdapterFactory("schemasafe")({
    draft: "draft7",
    formatProfile: "format-assertion",
    resources: [],
    unknownFormats: ["vendor-format"]
  });
  assert.throws(() => schemasafe.compile(schema), /Unrecognized format used/);
});

test("resource-capable adapters resolve local resources", async () => {
  const remoteUrl = "http://localhost:1234/integer.json";
  const resources = [{
    canonicalUri: remoteUrl,
    uri: remoteUrl,
    aliases: [remoteUrl],
    schema: { $id: remoteUrl, type: "integer" }
  }];
  const schema = { $ref: remoteUrl };

  for (const [name, createAdapter] of [
    ["AJV", getAdapterFactory("ajv")],
    ["schemasafe", getAdapterFactory("schemasafe")]
  ]) {
    const adapter = createAdapter({ draft: "draft7", resources, unknownFormats: [] });
    const target = await adapter.compile(schema);
    assert.equal(adapter.validate(target, 1), true, name);
    assert.equal(adapter.validate(target, "1"), false, name);
  }

  const schemaShield = getRegisteredAdapter("schema-shield");
  assert.deepEqual(schemaShield.unsupported, []);
  const runtime = schemaShield.create({
    draft: "draft7",
    resources,
    unknownFormats: []
  });
  const target = await runtime.compile(schema);
  assert.equal(runtime.validate(target, 1), true);
  assert.equal(runtime.validate(target, "1"), false);
});

function fixtureCases(expectedValues = [false, true]) {
  return expectedValues.map((expected, index) => ({
    id: `draft7:fixture.json#/groups/0/tests/${index}`,
    schemaId: "draft7:fixture.json#/groups/0",
    draft: "draft7",
    file: "fixture.json",
    groupIndex: 0,
    testIndex: index,
    groupDescription: "fixture group",
    description: `fixture case ${index}`,
    expected,
    data: index
  }));
}

test("conformance executes adapter despite globally recognized unsupported formats", async () => {
  const cases = fixtureCases();
  const adapter = {
    name: "fixture",
    version: "1.0.0",
    compile() {
      return (data) => data === 1;
    },
    validate: (compiled, data) => compiled(data)
  };

  const records = await classifySchemaCases({
    adapter,
    schema: { format: "idn-email" },
    schemaMetadata: { id: cases[0].schemaId },
    cases,
    capabilities: {
      unsupportedFormats: ["idn-email"],
      unknownFormats: [],
      externalRefs: []
    }
  });
  assert.deepEqual(records.map(({ status }) => status), ["PASS", "PASS"]);
});

test("conformance rejects data mutation while isolating schemas and resources", async () => {
  const schemaId = "draft7:isolation.json#/groups/0";
  const schema = {
    properties: {
      ["__proto__"]: true,
      constructor: true,
      toString: true
    }
  };
  const resource = {
    canonicalUri: "http://localhost:1234/draft7/isolation-resource.json",
    uri: "http://localhost:1234/draft7/isolation-resource.json",
    aliases: new Set([
      "http://localhost:1234/draft7/isolation-resource.json"
    ]),
    schema: { type: "boolean" }
  };
  const cases = [
    {
      ...fixtureCases([true])[0],
      id: `${schemaId}/tests/0`,
      schemaId,
      formatProfile: "base",
      data: [true]
    },
    {
      ...fixtureCases([false])[0],
      id: `${schemaId}/tests/1`,
      schemaId,
      testIndex: 1,
      formatProfile: "base",
      data: [false]
    }
  ];
  const suite = {
    manifest: {
      commit: validLock.commit,
      tree: validLock.tree,
      manifestSha256: "a".repeat(64)
    },
    schemas: [
      {
        id: schemaId,
        draft: "draft7",
        formatProfile: "base",
        schema
      }
    ],
    cases,
    resourceRegistry: { resourcesFor: () => [resource] }
  };
  const before = canonicalJson({
    schema,
    resource: resource.schema,
    data: cases.map(({ data }) => data)
  });
  const adapter = {
    name: "mutating-fixture",
    displayName: "Mutating fixture",
    packageName: "mutating-fixture",
    version: "1.0.0",
    license: "MIT",
    engines: null,
    supportClaim: "declared",
    unsupported: [],
    compileEligible: true
  };
  let factoryCalls = 0;
  const adapterFactory = ({ resources }) => {
    factoryCalls += 1;
    assert.equal(Object.hasOwn(resources[0].schema, "mutated"), false);
    resources[0].schema.mutated = true;
    return {
      reportOptions: { isolated: true },
      reportOptionsSha256: "b".repeat(64),
      compile(disposableSchema) {
        assert.equal(Object.hasOwn(disposableSchema, "mutated"), false);
        disposableSchema.mutated = true;
        return (data) => data[0];
      },
      validate(compiled, data) {
        const observed = compiled(data);
        delete data[0];
        Object.defineProperties(data, {
          ["__proto__"]: { value: null, enumerable: true },
          constructor: { value: null, enumerable: true },
          toString: { value: undefined, enumerable: true }
        });
        return observed;
      },
      getError({ testCase, data }) {
        assert.strictEqual(data, testCase.data);
        assert.deepEqual(data, [false]);
        testCase.id = "mutated";
        delete data[0];
        Object.defineProperties(data, {
          ["__proto__"]: { value: null, enumerable: true },
          constructor: { value: null, enumerable: true },
          toString: { value: undefined, enumerable: true }
        });
        return "fixture error";
      }
    };
  };

  for (let run = 0; run < 2; run += 1) {
    const report = await runAdapterConformance({
      adapter,
      adapterFactory,
      adapterConfiguration: { draft: "draft7" },
      draft: "draft7",
      suite
    });
    assert.deepEqual(report.cases.map(({ status }) => status), ["PASS", "PASS"]);
    assert.ok(report.mutations.length >= 4);
    assert.ok(report.mutations.every(({ scope, subjectId }) =>
      typeof scope === "string" && typeof subjectId === "string"
    ));
    assert.equal(
      canonicalJson({
        schema,
        resource: resource.schema,
        data: cases.map(({ data }) => data)
      }),
      before
    );
  }
  assert.equal(factoryCalls, 2);
});

test("conformance expands reusable compile failures", async () => {
  const cases = fixtureCases();
  const adapter = {
    name: "fixture",
    version: "1.0.0",
    compile() {
      throw new Error("compile exploded");
    },
    validate: () => true
  };

  const compileErrors = await classifySchemaCases({
    adapter,
    schema: {},
    schemaMetadata: { id: cases[0].schemaId },
    cases,
    capabilities: { unsupportedFormats: [], unknownFormats: [], externalRefs: [] }
  });
  assert.deepEqual(compileErrors.map(({ status }) => status), [
    "COMPILE",
    "COMPILE"
  ]);
});

test("conformance reports schema mutation without changing the source", async () => {
  const cases = fixtureCases();
  const schema = { type: "integer" };
  const before = canonicalJson(schema);
  const mutationEvents = [];
  const records = await classifySchemaCases({
    adapter: {
      name: "schema-mutator",
      version: "1.0.0",
      compile(disposableSchema) {
        Object.defineProperty(disposableSchema, Symbol("mutated"), {
          value: { cycle: disposableSchema },
          enumerable: false,
          configurable: true
        });
        return () => true;
      },
      validate: (compiled, data) => compiled(data)
    },
    schema,
    schemaMetadata: { id: cases[0].schemaId },
    cases,
    mutationEvents
  });
  assert.deepEqual(records.map(({ status }) => status), ["WRONG", "PASS"]);
  assert.deepEqual(records.map(({ errorCode }) => errorCode), [null, null]);
  assert.equal(mutationEvents.length, 1);
  assert.equal(mutationEvents[0].scope, "schema");
  assert.equal(mutationEvents[0].subjectId, cases[0].schemaId);
  assert.equal(mutationEvents[0].mutationTarget, "schema");
  assert.equal(mutationEvents[0].mutationClass, "compile");
  assert.equal(canonicalJson(schema), before);
});

test("conformance keeps correct mutating results as PASS and reports schema-scoped events once", async () => {
  const cases = fixtureCases();
  const schemaId = cases[0].schemaId;
  const report = await runAdapterConformance({
    adapter: {
      name: "schema-mutator",
      displayName: "Schema mutator",
      packageName: "schema-mutator",
      version: "1.0.0",
      license: "MIT",
      engines: null,
      supportClaim: "declared",
      unsupported: [],
      compileEligible: true
    },
    adapterFactory: () => ({
      name: "schema-mutator",
      version: "1.0.0",
      reportOptions: {},
      reportOptionsSha256: "b".repeat(64),
      compile(schema) {
        schema.normalized = true;
        return (data) => data === 1;
      },
      validate: (compiled, data) => compiled(data)
    }),
    adapterConfiguration: { draft: "draft7" },
    draft: "draft7",
    suite: {
      manifest: {
        commit: validLock.commit,
        tree: validLock.tree,
        manifestSha256: "a".repeat(64)
      },
      schemas: [
        {
          id: schemaId,
          draft: "draft7",
          formatProfile: "base",
          schema: { type: "integer" }
        }
      ],
      cases: cases.map((testCase) => ({ ...testCase, formatProfile: "base" })),
      resourceRegistry: { resourcesFor: () => [] }
    }
  });

  assert.deepEqual(report.cases.map(({ status }) => status), ["PASS", "PASS"]);
  assert.deepEqual(report.cases.map(({ errorCode }) => errorCode), [null, null]);
  assert.equal(report.cases.some((record) => Object.hasOwn(record, "mutations")), false);
  assert.equal(report.mutations.length, 1);
  assert.deepEqual(
    {
      scope: report.mutations[0].scope,
      subjectId: report.mutations[0].subjectId,
      schemaId: report.mutations[0].schemaId,
      mutationTarget: report.mutations[0].mutationTarget,
      mutationClass: report.mutations[0].mutationClass
    },
    {
      scope: "schema",
      subjectId: schemaId,
      schemaId,
      mutationTarget: "schema",
      mutationClass: "compile"
    }
  );
});

test("conformance records data mutation with structured origin fields", async () => {
  const cases = fixtureCases([true]);
  cases[0].data = { value: true };
  const mutationEvents = [];
  const records = await classifySchemaCases({
    adapter: {
      name: "data-mutator",
      version: "1.0.0",
      compile: () => () => true,
      validate(compiled, data) {
        data.value = false;
        return compiled(data);
      }
    },
    schema: {},
    schemaMetadata: { id: cases[0].schemaId },
    cases,
    mutationEvents
  });

  assert.equal(records[0].status, "PASS");
  assert.equal(records[0].errorCode, null);
  assert.equal(mutationEvents[0].scope, "case");
  assert.equal(mutationEvents[0].subjectId, cases[0].id);
  assert.equal(mutationEvents[0].mutationTarget, "data");
  assert.equal(mutationEvents[0].mutationClass, "validation");
});

test("conformance tracks the prepared schema instance through adapter-api", async () => {
  const cases = fixtureCases();
  for (const mutationPhase of ["compile", "validate"]) {
    const schema = { type: "integer" };
    const before = canonicalJson(schema);
    const definition = defineAdapter(
      {
        id: `prepared-${mutationPhase}`,
        packageName: "fixture-package",
        displayName: `Prepared ${mutationPhase}`,
        drafts: ["draft7"],
        unsupported: []
      },
      () => ({
        reportOptions: { mutationPhase },
        compile(preparedSchema) {
          if (mutationPhase === "compile") {
            preparedSchema.immediateMutation = true;
          }
          return data => {
            if (mutationPhase === "validate") {
              preparedSchema.deferredMutation = true;
            }
            return data === 1;
          };
        },
        validate: (compiled, data) => compiled(data)
      })
    );
    const adapter = definition.create({
      draft: "draft7",
      formatProfile: "base",
      resources: [],
      unknownFormats: []
    });
    const mutationEvents = [];
    const records = await classifySchemaCases({
      adapter,
      schema,
      schemaMetadata: {
        id: cases[0].schemaId,
        draft: "draft7",
        formatProfile: "base"
      },
      cases,
      mutationEvents
    });
    assert.deepEqual(
      records.map(({ status }) => status),
      ["PASS", "PASS"]
    );
    assert.deepEqual(records.map(({ errorCode }) => errorCode), [null, null]);
    assert.equal(mutationEvents.length, 1);
    assert.equal(
      mutationEvents[0].scope,
      mutationPhase === "compile" ? "schema" : "case"
    );
    assert.equal(canonicalJson(schema), before);
  }
});

test("conformance prioritizes resource mutation when adapter factory throws", async () => {
  const schemaId = "draft7:factory-resource.json#/groups/0";
  const cases = fixtureCases().map((testCase) => ({
    ...testCase,
    id: `${schemaId}/tests/${testCase.testIndex}`,
    schemaId,
    formatProfile: "base"
  }));
  const resource = {
    canonicalUri: "http://localhost:1234/factory-resource.json",
    uri: "http://localhost:1234/factory-resource.json",
    aliases: new Set(["http://localhost:1234/factory-resource.json"]),
    schema: { type: "boolean" }
  };
  const before = canonicalJson(resource.schema);
  const definition = defineAdapter(
    {
      id: "resource-thrower",
      packageName: "fixture-package",
      displayName: "Resource thrower",
      drafts: ["draft7"],
      unsupported: []
    },
    ({ resources }) => {
      resources[0].schema.mutated = true;
      throw new Error("factory failed after mutation");
    }
  );
  const adapter = {
    ...definition,
    name: definition.id,
    version: "1.0.0",
    license: "MIT",
    engines: null,
    supportClaim: "declared",
    compileEligible: true
  };
  const report = await runAdapterConformance({
    adapter,
    adapterFactory: (config) => definition.create(config),
    adapterConfiguration: { draft: "draft7" },
    draft: "draft7",
    suite: {
      manifest: {
        commit: validLock.commit,
        tree: validLock.tree,
        manifestSha256: "a".repeat(64)
      },
      schemas: [
        {
          id: schemaId,
          draft: "draft7",
          formatProfile: "base",
          schema: { type: "integer" }
        }
      ],
      cases,
      resourceRegistry: { resourcesFor: () => [resource] }
    }
  });
  assert.deepEqual(report.cases.map(({ status }) => status), [
    "COMPILE",
    "COMPILE"
  ]);
  assert.deepEqual(report.cases.map(({ errorCode }) => errorCode), [
    "FAST_COMPILE_ERROR",
    "FAST_COMPILE_ERROR"
  ]);
  assert.equal(report.mutations.length, 1);
  assert.equal(report.mutations[0].scope, "adapter");
  assert.equal(report.mutations[0].mutationTarget, "resources");
  assert.equal(report.mutations[0].mutationClass, "adapter-setup");
  assert.equal(canonicalJson(resource.schema), before);
});

async function runConformanceMutationScenario(hooks) {
  const schemaId = "draft7:mutation-phases.json#/groups/0";
  const testCase = {
    ...fixtureCases([false])[0],
    id: `${schemaId}/tests/0`,
    schemaId,
    formatProfile: "base",
    data: { value: true }
  };
  const sourceResource = {
    canonicalUri: "http://localhost:1234/mutation-phases.json",
    uri: "http://localhost:1234/mutation-phases.json",
    aliases: new Set(["http://localhost:1234/mutation-phases.json"]),
    schema: { type: "boolean" }
  };
  const adapter = {
    name: "phase-mutator",
    displayName: "Phase mutator",
    packageName: "phase-mutator",
    version: "1.0.0",
    license: "MIT",
    engines: null,
    supportClaim: "declared",
    unsupported: [],
    compileEligible: true
  };
  const report = await runAdapterConformance({
    adapter,
    adapterFactory({ resources }) {
      hooks.setup?.({ resources });
      return {
        ...adapter,
        reportOptions: { fixture: true },
        reportOptionsSha256: "b".repeat(64),
        compile(schema) {
          hooks.compile?.({ schema, resources });
          return { schema, resources };
        },
        validate(target, data) {
          hooks.validate?.({ ...target, data });
          return false;
        },
        ...(typeof hooks.detailed === "function"
          ? {
              getError({ compiled, data }) {
                hooks.detailed({ ...compiled, data });
                return "fixture error";
              }
            }
          : {})
      };
    },
    adapterConfiguration: { draft: "draft7" },
    draft: "draft7",
    suite: {
      manifest: {
        commit: validLock.commit,
        tree: validLock.tree,
        manifestSha256: "a".repeat(64)
      },
      schemas: [
        {
          id: schemaId,
          draft: "draft7",
          formatProfile: "base",
          schema: { type: "integer" }
        }
      ],
      cases: [testCase],
      resourceRegistry: { resourcesFor: () => [sourceResource] }
    }
  });
  return report;
}

function mutationPairs(report) {
  return report.mutations.map(({ mutationTarget, mutationClass }) =>
    `${mutationTarget}/${mutationClass}`
  );
}

test("conformance checkpoints successful compile resource mutation", async () => {
  const report = await runConformanceMutationScenario({
    compile({ resources }) {
      resources[0].schema.compileMutation = true;
    }
  });

  assert.deepEqual(mutationPairs(report), ["resources/compile"]);
});

test("conformance checkpoints resource mutation when compile throws", async () => {
  const report = await runConformanceMutationScenario({
    compile({ resources }) {
      resources[0].schema.compileMutation = true;
      throw new Error("compile failed after mutation");
    }
  });

  assert.deepEqual(mutationPairs(report), ["resources/compile"]);
  assert.equal(report.cases[0].status, "COMPILE");
  assert.equal(report.cases[0].errorCode, "FAST_COMPILE_ERROR");
});

test("conformance preserves simultaneous schema and resource compile mutations", async () => {
  const report = await runConformanceMutationScenario({
    compile({ schema, resources }) {
      schema.compileMutation = true;
      resources[0].schema.compileMutation = true;
    }
  });

  assert.deepEqual(mutationPairs(report), [
    "resources/compile",
    "schema/compile"
  ]);
});

test("conformance preserves simultaneous data, schema, and resource validation mutations", async () => {
  const report = await runConformanceMutationScenario({
    validate({ data, schema, resources }) {
      data.validationMutation = true;
      schema.validationMutation = true;
      resources[0].schema.validationMutation = true;
      throw new Error("validation failed after mutations");
    }
  });

  assert.deepEqual(mutationPairs(report), [
    "data/validation",
    "resources/validation",
    "schema/validation"
  ]);
});

test("conformance preserves setup, compile, and validation mutations for one case", async () => {
  const report = await runConformanceMutationScenario({
    setup({ resources }) {
      resources[0].schema.setupMutation = true;
    },
    compile({ resources }) {
      resources[0].schema.compileMutation = true;
    },
    validate({ resources }) {
      resources[0].schema.validationMutation = true;
    }
  });

  assert.deepEqual(mutationPairs(report), [
    "resources/adapter-setup",
    "resources/validation",
    "resources/compile"
  ]);
});

test("conformance preserves materially different fast and detailed mutation findings", async () => {
  const report = await runConformanceMutationScenario({
    validate({ resources }) {
      resources[0].schema.fastMutation = true;
    },
    detailed({ resources }) {
      resources[0].schema.detailedMutation = true;
    }
  });

  assert.deepEqual(mutationPairs(report), [
    "resources/validation",
    "resources/validation"
  ]);
});

test("conformance classifier isolates runtime errors and records wrong results", async () => {
  const cases = fixtureCases([false, true, false]);
  const adapter = {
    name: "fixture",
    version: "1.0.0",
    compile() {
      return (data) => {
        if (data === 0) {
          throw new Error("runtime exploded");
        }
        return data === 2;
      };
    },
    validate: (compiled, data) => compiled(data),
    getError: () => "fixture error"
  };
  const records = await classifySchemaCases({
    adapter,
    schema: {},
    schemaMetadata: { id: cases[0].schemaId },
    cases,
    capabilities: { unsupportedFormats: [], unknownFormats: [], externalRefs: [] }
  });

  assert.deepEqual(records.map(({ status }) => status), [
    "RUNTIME",
    "WRONG",
    "WRONG"
  ]);
});

test("conformance preserves fast status on detail failure and detects profile divergence", async () => {
  const cases = fixtureCases([false]);
  const detailCompileFailureAdapter = {
    name: "fixture",
    version: "1.0.0",
    compile: () => () => false,
    validate: (compiled, data) => compiled(data),
    getError() {
      throw new Error("detail compile exploded");
    }
  };
  const detailFailure = await classifySchemaCases({
    adapter: detailCompileFailureAdapter,
    schema: {},
    schemaMetadata: { id: cases[0].schemaId },
    cases,
    capabilities: { unsupportedFormats: [], unknownFormats: [], externalRefs: [] }
  });
  assert.equal(detailFailure[0].status, "PASS");
  assert.equal(detailFailure[0].detailErrorCode, "DETAIL_RUNTIME_ERROR");
  assert.match(detailFailure[0].detailError, /detail compile exploded/);

  const divergenceAdapter = {
    ...detailCompileFailureAdapter,
    getError: () => null
  };
  const divergence = await classifySchemaCases({
    adapter: divergenceAdapter,
    schema: {},
    schemaMetadata: { id: cases[0].schemaId },
    cases,
    capabilities: { unsupportedFormats: [], unknownFormats: [], externalRefs: [] }
  });
  assert.equal(divergence[0].status, "RUNTIME");
  assert.equal(divergence[0].errorCode, "PROFILE_RESULT_DIVERGENCE");
});

test("validate-only conformance never reports COMPILE", async () => {
  const cases = fixtureCases([true, false]);
  const records = await classifySchemaCases({
    adapter: {
      name: "validate-only-fixture",
      version: "1.0.0",
      supportClaim: "declared",
      validate: (_schema, data) => data === 0
    },
    schema: {},
    schemaMetadata: { id: cases[0].schemaId },
    cases,
    capabilities: { unsupportedFormats: [], unknownFormats: [], externalRefs: [] }
  });
  assert.equal(records.some(({ status }) => status === "COMPILE"), false);
});

test("conformance coverage is one-to-one", () => {
  const cases = fixtureCases([false, true]);
  const records = [
    {
      ...cases[0],
      observed: false,
      status: "PASS",
      error: "must be integer"
    },
    { ...cases[1], observed: false, status: "WRONG", error: null }
  ];
  const report = {
    validator: "fixture",
    packageName: "fixture",
    draft: "draft7",
    version: "1.0.0",
    reportOptions: {},
    reportOptionsSha256: {},
    suite: { commit: validLock.commit, tree: validLock.tree, manifestSha256: "a".repeat(64) },
    counts: { PASS: 1, WRONG: 1, COMPILE: 0, RUNTIME: 0, UNSUPPORTED: 0 },
    cases: records
  };

  assert.doesNotThrow(() => assertReportCoverage(report, cases));
  assert.throws(() => assertReportCoverage({ ...report, cases: records.slice(1) }, cases), /coverage/);
});

test("flat conformance errors retain report messages and option metadata once", () => {
  const cases = fixtureCases([false]);
  const report = {
    validator: "fixture",
    packageName: "fixture",
    draft: "draft7",
    version: "1.0.0",
    reportOptions: { base: { profile: "base" } },
    reportOptionsSha256: { base: "a".repeat(64) },
    counts: { PASS: 0, WRONG: 0, COMPILE: 0, RUNTIME: 1, UNSUPPORTED: 0 },
    countsByFormatProfile: {
      base: { PASS: 0, WRONG: 0, COMPILE: 0, RUNTIME: 1, UNSUPPORTED: 0 }
    },
    cases: [{
      ...cases[0],
      formatProfile: "base",
      observed: false,
      status: "RUNTIME",
      errorCode: "FAST_RUNTIME_ERROR",
      error: "fast exploded",
      detailErrorCode: "DETAIL_RUNTIME_ERROR",
      detailError: "detail exploded"
    }]
  };
  const markdown = renderConformanceMarkdown(report);
  for (const value of [
    cases[0].id,
    cases[0].description,
    "RUNTIME",
    "FAST_RUNTIME_ERROR",
    "fast exploded",
    "DETAIL_RUNTIME_ERROR",
    "detail exploded",
    report.reportOptionsSha256.base
  ]) {
    assert.equal(markdown.includes(value), true, value);
  }
  assert.equal(markdown.includes("Mode:"), false);
  assert.equal(markdown.includes("undefined"), false);
  assert.deepEqual(createValidatorProfiles([report]), {
    "draft7/fixture": {
      version: "1.0.0",
      reportOptions: report.reportOptions,
      reportOptionsSha256: report.reportOptionsSha256
    }
  });
});

test("empty conformance sections report positive zero-count facts", () => {
  const report = {
    validator: "fixture",
    packageName: "fixture",
    draft: "draft7",
    version: "1.0.0",
    reportOptions: { base: {} },
    reportOptionsSha256: { base: "a".repeat(64) },
    counts: { PASS: 1, WRONG: 0, COMPILE: 0, RUNTIME: 0, UNSUPPORTED: 0 },
    countsByFormatProfile: {
      base: { PASS: 1, WRONG: 0, COMPILE: 0, RUNTIME: 0, UNSUPPORTED: 0 }
    },
    cases: [{
      id: "case-1",
      description: "valid case",
      formatProfile: "base",
      expected: true,
      observed: true,
      status: "PASS",
      errorCode: null,
      error: null,
      detailErrorCode: null,
      detailError: null
    }]
  };

  const markdown = renderConformanceMarkdown(report);
  assert.match(markdown, /Every reported case has PASS status/);
  assert.match(markdown, /Detailed error records: 0/);
});

function intersectionFixture() {
  const schemas = [
    {
      id: "draft6:a.json#/groups/0",
      draft: "draft6",
      formatProfile: "base",
      schema: { type: "integer" }
    },
    {
      id: "draft6:optional/format/a.json#/groups/0",
      draft: "draft6",
      formatProfile: "format-assertion",
      schema: { type: "string", format: "email" }
    },
    {
      id: "draft7:a.json#/groups/0",
      draft: "draft7",
      formatProfile: "base",
      schema: { type: "integer" }
    }
  ];
  const cases = schemas.flatMap((schema) => [
    {
      id: `${schema.id}/tests/0`,
      schemaId: schema.id,
      draft: schema.draft,
      formatProfile: schema.formatProfile,
      expected: true
    },
    {
      id: `${schema.id}/tests/1`,
      schemaId: schema.id,
      draft: schema.draft,
      formatProfile: schema.formatProfile,
      expected: false
    },
    {
      id: `${schema.id}/tests/2`,
      schemaId: schema.id,
      draft: schema.draft,
      formatProfile: schema.formatProfile,
      expected: true
    }
  ]);
  const manifest = {
    commit: validLock.commit,
    tree: validLock.tree,
    manifestSha256: "a".repeat(64),
    cases: cases.map(({ id, schemaId, draft, expected }) => ({
      id,
      schemaId,
      draft,
      expected
    }))
  };
  const suite = {
    manifest,
    schemas,
    cases,
    remotes: new Map(),
    remoteEntries: []
  };
  const reports = [];
  const expectedAdapters = new Map();
  for (const draft of ["draft6"]) {
    for (const validator of ["schema-shield", "ajv", "schemasafe"]) {
      const reportOptions = { profile: `${validator}-${draft}` };
      const reportOptionsSha256 = {
        base: "a".repeat(64),
        "format-assertion": "b".repeat(64)
      };
      expectedAdapters.set(`${draft}/${validator}`, {
        version: "1.0.0",
        reportOptionsSha256
      });
      reports.push({
        validator,
        draft,
        version: "1.0.0",
        reportOptions,
        reportOptionsSha256,
        suite: {
          commit: manifest.commit,
          tree: manifest.tree,
          manifestSha256: manifest.manifestSha256
        },
        cases: cases
          .filter((testCase) => testCase.draft === draft)
          .map((testCase) => ({ ...testCase, status: "PASS" }))
      });
    }
  }
  return {
    suite,
    reports,
    expectedAdapters,
    draft: "draft6",
    formatProfile: "base",
    participants: ["schema-shield", "ajv", "schemasafe"]
  };
}

test("intersection rejects missing, stale, mismatched, and manual report data", () => {
  const fixture = intersectionFixture();
  assert.throws(
    () =>
      validateIntersectionInputs({
        ...fixture,
        reports: fixture.reports.slice(1),
        reportHashes: new Map()
      }),
    /exactly 3 conformance reports/
  );

  const reportHashes = new Map(
    fixture.reports.map((report) => [
      `${report.draft}/${report.validator}`,
      { expected: "a".repeat(64), actual: "b".repeat(64) }
    ])
  );
  assert.throws(
    () => validateIntersectionInputs({ ...fixture, reportHashes }),
    /stale conformance report hash/
  );

  const versionMismatch = structuredClone(fixture.reports);
  versionMismatch[0].version = "2.0.0";
  assert.throws(
    () =>
      validateIntersectionInputs({
        suite: fixture.suite,
        reports: versionMismatch,
        expectedAdapters: fixture.expectedAdapters,
        reportHashes: null,
        draft: fixture.draft,
        participants: fixture.participants
      }),
    /version mismatch/
  );

  const humanOptionsChanged = structuredClone(fixture.reports);
  humanOptionsChanged[0].reportOptions = { profile: "changed human view" };
  assert.doesNotThrow(() =>
    validateIntersectionInputs({
      ...fixture,
      reports: humanOptionsChanged,
      reportHashes: null
    })
  );
  const optionHashMismatch = structuredClone(fixture.reports);
  optionHashMismatch[0].reportOptionsSha256.base = "b".repeat(64);
  assert.throws(
    () => validateIntersectionInputs({
      ...fixture,
      reports: optionHashMismatch,
      reportHashes: null
    }),
    /option hash mismatch/
  );

  const manualId = structuredClone(fixture.reports);
  manualId[0].cases[0].id = "draft6:manual.json#/groups/0/tests/0";
  assert.throws(
    () =>
      validateIntersectionInputs({
        suite: fixture.suite,
        reports: manualId,
        expectedAdapters: fixture.expectedAdapters,
        reportHashes: null,
        draft: fixture.draft,
        participants: fixture.participants
      }),
    /case IDs/
  );
});

test("intersection ignores a participant that falls below the atomic draft threshold", () => {
  const fixture = intersectionFixture();
  fixture.participants.reverse();
  fixture.reports[0].cases[0].status = "WRONG";
  const intersection = createIntersection({ ...fixture, reportHashes: null });
  assert.equal(intersection.caseIds.includes(fixture.suite.cases[0].id), true);
  assert.equal(intersection.caseIds.length, 3);
  assert.deepEqual(
    intersection.participants.map(({ id }) => id),
    ["ajv", "schemasafe"]
  );
  const relaxed = createIntersection({
    ...fixture,
    reportHashes: null,
    eligibilityThresholdPercent: "0"
  });
  assert.equal(
    relaxed.participants.some(({ id }) => id === "schema-shield"),
    true
  );
  assert.notEqual(
    performanceIdentitySha256(relaxed),
    performanceIdentitySha256(intersection)
  );
});

test("Setup creates one atomic draft scope from Base and Formats", () => {
  const fixture = intersectionFixture();
  const intersection = createIntersection({
    ...fixture,
    formatProfile: null,
    phase: "setup",
    phaseParticipants: fixture.participants,
    reportHashes: null
  });

  assert.equal(intersection.formatProfile, null);
  assert.equal(intersection.phase, "setup");
  assert.equal(intersection.caseIds.length, 6);
  assert.equal(intersection.compileEntries.length, 2);
  assert.deepEqual(
    new Set(
      intersection.compileEntries.flatMap(
        ({ sourceFormatProfiles }) => sourceFormatProfiles
      )
    ),
    new Set(["base", "format-assertion"])
  );
  assert.deepEqual(
    intersection.participants.map(({ id }) => id),
    ["ajv", "schema-shield", "schemasafe"]
  );
});

function eligibilityReport(validator, { basePass = 100, formatsPass = 100 } = {}) {
  return {
    validator,
    draft: "draft6",
    cases: [
      ...Array.from({ length: 100 }, (_, index) => ({
        id: `base-${index}`,
        formatProfile: "base",
        status: index < basePass ? "PASS" : "WRONG"
      })),
      ...Array.from({ length: 100 }, (_, index) => ({
        id: `formats-${index}`,
        formatProfile: "format-assertion",
        status: index < formatsPass ? "PASS" : "COMPILE"
      }))
    ]
  };
}

test("draft eligibility accepts exactly 98 percent and rejects the next exact fraction below it", () => {
  const reports = [
    eligibilityReport("schema-shield", { basePass: 98, formatsPass: 98 }),
    {
      ...eligibilityReport("ajv"),
      cases: [
        ...Array.from({ length: 99 }, (_, index) => ({
          id: `base-${index}`,
          formatProfile: "base",
          status: index < 97 ? "PASS" : "WRONG"
        })),
        ...Array.from({ length: 100 }, (_, index) => ({
          id: `formats-${index}`,
          formatProfile: "format-assertion",
          status: "PASS"
        }))
      ]
    }
  ];

  const eligibility = createPhaseEligibility({
    reports,
    draft: "draft6",
    formatProfile: "base",
    phase: "execution",
    participants: ["schema-shield", "ajv"],
    phaseParticipants: ["schema-shield", "ajv"]
  });

  assert.equal(eligibility.roster.eligible.includes("schema-shield"), true);
  assert.equal(eligibility.roster.eligible.includes("ajv"), false);
  const reason = eligibility.roster.excluded.find(({ id }) => id === "ajv").reasons[0];
  assert.equal(reason.code, "PASS_THRESHOLD_NOT_MET");
  assert.equal(reason.profile, "base");
  assert.equal(reason.pass, 97);
  assert.equal(reason.total, 99);
  assert.equal(reason.thresholdPercent, "98");
  assert.deepEqual(eligibility.policy.thresholdFraction, {
    numerator: 49,
    denominator: 50
  });
  const stricter = createPhaseEligibility({
    reports,
    draft: "draft6",
    formatProfile: "base",
    phase: "execution",
    participants: ["schema-shield", "ajv"],
    phaseParticipants: ["schema-shield", "ajv"],
    eligibilityThresholdPercent: "99"
  });
  assert.deepEqual(stricter.roster.eligible, []);
  assert.notEqual(stricter.roster.sha256, eligibility.roster.sha256);
});

test("draft eligibility compares 98.5 and 99.95 percent as exact fractions", () => {
  function exactReport(validator, total, pass) {
    return {
      validator,
      draft: "draft6",
      cases: ["base", "format-assertion"].flatMap((formatProfile) =>
        Array.from({ length: total }, (_, index) => ({
          id: `${formatProfile}-${index}`,
          formatProfile,
          status: index < pass ? "PASS" : "WRONG"
        }))
      )
    };
  }

  for (const fixture of [
    { threshold: "98.5", total: 200, accepted: 197, rejected: 196 },
    { threshold: "99.95", total: 2000, accepted: 1999, rejected: 1998 }
  ]) {
    const eligibility = createPhaseEligibility({
      reports: [
        exactReport("schema-shield", fixture.total, fixture.accepted),
        exactReport("ajv", fixture.total, fixture.rejected)
      ],
      draft: "draft6",
      formatProfile: "base",
      phase: "execution",
      participants: ["schema-shield", "ajv"],
      phaseParticipants: ["schema-shield", "ajv"],
      eligibilityThresholdPercent: fixture.threshold
    });

    assert.deepEqual(eligibility.roster.eligible, ["schema-shield"]);
    assert.equal(eligibility.policy.thresholdPercent, fixture.threshold);
    assert.equal(
      eligibility.roster.excluded[0].reasons[0].thresholdPercent,
      fixture.threshold
    );
  }
});

test("draft eligibility is atomic across Base and Formats and counts every non-PASS status", () => {
  const reports = [
    eligibilityReport("schema-shield", { basePass: 98, formatsPass: 97 }),
    eligibilityReport("ajv", { basePass: 97, formatsPass: 98 }),
    eligibilityReport("schemasafe", { basePass: 98, formatsPass: 98 })
  ];
  const schemaShieldFormats = reports[0].cases.filter(
    ({ formatProfile }) => formatProfile === "format-assertion"
  );
  schemaShieldFormats[97].status = "COMPILE";
  schemaShieldFormats[98].status = "RUNTIME";
  schemaShieldFormats[99].status = "UNSUPPORTED";

  const eligibility = createPhaseEligibility({
    reports,
    draft: "draft6",
    formatProfile: "base",
    phase: "execution",
    participants: ["schema-shield", "ajv", "schemasafe"],
    phaseParticipants: ["schema-shield", "ajv", "schemasafe"]
  });

  assert.deepEqual(eligibility.roster.eligible, ["schemasafe"]);
  assert.deepEqual(
    eligibility.roster.excluded.map(({ reasons }) => reasons[0].profile),
    ["base", "format-assertion"]
  );
  assert.deepEqual(
    Object.fromEntries(
      ["COMPILE", "RUNTIME", "UNSUPPORTED"].map((status) => [
        status,
        eligibility.roster.excluded
          .find(({ id }) => id === "schema-shield")
          .countsByProfile["format-assertion"][status]
      ])
    ),
    { COMPILE: 1, RUNTIME: 1, UNSUPPORTED: 1 }
  );
});

test("Base and Formats share one draft roster while Setup intersects API capability", () => {
  const reports = [
    eligibilityReport("schema-shield"),
    eligibilityReport("ajv"),
    eligibilityReport("schemasafe")
  ];
  const execution = createPhaseEligibility({
    reports,
    draft: "draft6",
    formatProfile: "base",
    phase: "execution",
    participants: ["schema-shield", "ajv", "schemasafe"],
    phaseParticipants: ["schema-shield", "ajv", "schemasafe"]
  });
  const formatsExecution = createPhaseEligibility({
    reports,
    draft: "draft6",
    formatProfile: "format-assertion",
    phase: "execution",
    participants: ["schema-shield", "ajv", "schemasafe"],
    phaseParticipants: ["schema-shield", "ajv", "schemasafe"]
  });
  const setup = createPhaseEligibility({
    reports,
    draft: "draft6",
    formatProfile: "base",
    phase: "setup",
    participants: ["schema-shield", "ajv", "schemasafe"],
    phaseParticipants: ["ajv", "schemasafe"]
  });

  assert.deepEqual(execution.roster.eligible, ["ajv", "schema-shield", "schemasafe"]);
  assert.deepEqual(formatsExecution.roster.eligible, execution.roster.eligible);
  assert.deepEqual(setup.roster.eligible, ["ajv", "schemasafe"]);
  assert.deepEqual(
    setup.roster.excluded.find(({ id }) => id === "schema-shield").reasons,
    [{ code: "PHASE_UNAVAILABLE" }]
  );
});

test("excluded participants do not reduce the phase performance corpus", () => {
  const fixture = intersectionFixture();
  fixture.reports[0].cases[0].status = "WRONG";
  fixture.reports[0].cases[1].status = "WRONG";

  const intersection = createIntersection({
    ...fixture,
    phase: "execution",
    phaseParticipants: fixture.participants,
    reportHashes: null
  });

  assert.equal(intersection.eligibility.roster.eligible.includes("schema-shield"), false);
  assert.equal(intersection.caseIds.includes(fixture.suite.cases[0].id), true);
  assert.deepEqual(
    intersection.participants.map(({ id }) => id),
    ["ajv", "schemasafe"]
  );
});

test("performance identity ignores excluded diagnostics and tracks eligible roster changes", () => {
  const fixture = intersectionFixture();
  fixture.reports[0].cases[0].status = "WRONG";
  fixture.reports[0].cases[1].status = "WRONG";
  const reportHashes = new Map(
    fixture.reports.map((report) => {
      const hash = sha256(canonicalJson(report));
      return [`${report.draft}/${report.validator}`, { expected: hash, actual: hash }];
    })
  );
  const create = () =>
    createIntersection({
      ...fixture,
      phase: "execution",
      phaseParticipants: fixture.participants,
      reportHashes
    });
  const cacheContext = {
    sharedHarnessSha256: "b".repeat(64),
    suiteLockSha256: "c".repeat(64),
    validatorRuntimeSha256: "d".repeat(64),
    runtimeEnvironmentSha256: "e".repeat(64)
  };
  const request = {
    phase: "execution",
    draft: fixture.draft,
    formatProfile: fixture.formatProfile,
    validator: "ajv",
    round: 1,
    benchmarkMode: "quick"
  };

  const initial = create();
  const initialHash = performanceIdentitySha256(initial);
  const initialCache = createSampleCacheIdentity({
    request,
    intersectionHash: initialHash,
    benchmarkContractHash: "a".repeat(64),
    cacheContext
  });

  fixture.reports[0].diagnosticNote = "excluded diagnostic changed";
  const excludedHash = sha256(canonicalJson(fixture.reports[0]));
  reportHashes.set(`${fixture.draft}/${fixture.reports[0].validator}`, {
    expected: excludedHash,
    actual: excludedHash
  });
  const excludedChanged = create();
  const excludedPerformanceHash = performanceIdentitySha256(excludedChanged);
  const excludedCache = createSampleCacheIdentity({
    request,
    intersectionHash: excludedPerformanceHash,
    benchmarkContractHash: "a".repeat(64),
    cacheContext
  });

  assert.notEqual(canonicalJson(excludedChanged), canonicalJson(initial));
  assert.deepEqual(excludedChanged.caseIds, initial.caseIds);
  assert.equal(excludedPerformanceHash, initialHash);
  assert.equal(excludedCache.hash, initialCache.hash);

  fixture.reports[1].cases[2].status = "WRONG";
  const eligibleHash = sha256(canonicalJson(fixture.reports[1]));
  reportHashes.set(`${fixture.draft}/${fixture.reports[1].validator}`, {
    expected: eligibleHash,
    actual: eligibleHash
  });
  const eligibleChanged = create();
  const eligiblePerformanceHash = performanceIdentitySha256(eligibleChanged);
  const eligibleCache = createSampleCacheIdentity({
    request,
    intersectionHash: eligiblePerformanceHash,
    benchmarkContractHash: "a".repeat(64),
    cacheContext
  });

  assert.deepEqual(eligibleChanged.caseIds, initial.caseIds);
  assert.notEqual(eligiblePerformanceHash, initialHash);
  assert.notEqual(eligibleCache.hash, initialCache.hash);
});

test("intersection keeps PASS cases with scoped mutation events", () => {
  const fixture = intersectionFixture();
  const report = fixture.reports[0];
  const testCase = fixture.suite.cases[0];
  report.mutations = [
    {
      validator: report.validator,
      draft: report.draft,
      formatProfile: testCase.formatProfile,
      phase: "conformance",
      scope: "case",
      subjectId: testCase.id,
      caseId: testCase.id,
      schemaId: testCase.schemaId,
      mutationTarget: "data",
      mutationClass: "validation",
      moment: "fast validation",
      difference: {
        path: "$.visited",
        kind: "added",
        before: null,
        after: { value: true }
      }
    }
  ];

  const intersection = createIntersection({ ...fixture, reportHashes: null });

  assert.equal(intersection.caseIds.includes(testCase.id), true);
  assert.equal(intersection.mutations.validators[report.validator].count, 1);
  assert.equal(
    intersection.mutations.validators[report.validator].records[0].subjectId,
    testCase.id
  );
});

test("performance summaries use only conformance mutation diagnostics", () => {
  function trackedDifference(filler) {
    const root = { filler, value: null };
    const tracker = createIntegrityTracker(root);
    root.value = { enabled: true };
    const difference = tracker.verify().difference;
    tracker.release();
    return difference;
  }
  const conformanceDifference = trackedDifference({});
  const executionDifference = trackedDifference({ nested: { extra: true } });
  assert.notEqual(
    conformanceDifference.after.value.identity,
    executionDifference.after.value.identity
  );
  const conformanceMutation = {
    validator: "schema-shield",
    draft: "draft6",
    formatProfile: "base",
    phase: "conformance",
    scope: "case",
    subjectId: "shared-case",
    caseId: "shared-case",
    mutationTarget: "data",
    mutationClass: "validation",
    moment: "fast validation",
    difference: conformanceDifference
  };
  const executionMutation = {
    ...structuredClone(conformanceMutation),
    formatProfile: "format-assertion",
    phase: "execution",
    round: 1,
    moment: "measured pass 1",
    difference: executionDifference
  };

  assert.equal(
    mutationRecordKey(conformanceMutation),
    mutationRecordKey(executionMutation)
  );
  const summary = summarizePhase(
    {
      phase: "execution",
      draft: "draft6",
      formatProfile: "base",
      intersectionSha256: "a".repeat(64),
      participants: ["schema-shield"],
      samples: [
        {
          validator: "schema-shield",
          round: 1,
          throughput: 1,
          legacyMutations: [executionMutation]
        }
      ]
    },
    "quick",
    {
      mutations: {
        validators: {
          "schema-shield": {
            count: 1,
            records: [conformanceMutation]
          }
        }
      }
    }
  );
  assert.equal(summary.mutations.validators["schema-shield"].count, 1);
  assert.equal(
    summary.mutations.validators["schema-shield"].records[0].difference.after.value.identity,
    conformanceDifference.after.value.identity
  );
});

test("intersection preserves structured data, schema, and resource mutations outside the performance corpus", () => {
  const fixture = intersectionFixture();
  Object.assign(fixture.reports[0].cases[0], {
    status: "RUNTIME",
    errorCode: "INPUT_MUTATION",
    mutations: [
      { mutationTarget: "data", mutationClass: "validation" },
      { mutationTarget: "schema", mutationClass: "validation" },
      { mutationTarget: "data", mutationClass: "validation" }
    ]
  });
  Object.assign(fixture.reports[1].cases[0], {
    status: "RUNTIME",
    errorCode: "INPUT_MUTATION",
    mutationTarget: "schema",
    mutationClass: "compile"
  });
  Object.assign(fixture.reports[2].cases[0], {
    status: "RUNTIME",
    errorCode: "INPUT_MUTATION",
    mutationTarget: "resources",
    mutationClass: "validation"
  });

  const intersection = createIntersection({ ...fixture, reportHashes: null });

  assert.equal(intersection.caseIds.includes(fixture.suite.cases[0].id), false);
  const collectionValidator = fixture.reports[0].validator;
  const collection = intersection.mutations.validators[collectionValidator];
  assert.equal(collection.count, 2);
  assert.deepEqual(
    collection.records.map(({ scope, subjectId, mutationTarget, mutationClass }) => ({
      scope,
      subjectId,
      mutationTarget,
      mutationClass
    })),
    [
      {
        scope: "case",
        subjectId: fixture.suite.cases[0].id,
        mutationTarget: "data",
        mutationClass: "validation"
      },
      {
        scope: "case",
        subjectId: fixture.suite.cases[0].id,
        mutationTarget: "schema",
        mutationClass: "validation"
      }
    ]
  );
  for (const [index, target, mutationClass] of [
    [1, "schema", "compile"],
    [2, "resources", "validation"]
  ]) {
    const validator = fixture.reports[index].validator;
    const mutation = intersection.mutations.validators[validator];
    assert.equal(mutation.count, 1);
    assert.equal(mutation.records[0].scope, "case");
    assert.equal(mutation.records[0].subjectId, fixture.suite.cases[0].id);
    assert.equal(mutation.records[0].mutationTarget, target);
    assert.equal(mutation.records[0].mutationClass, mutationClass);
  }
});

test("intersection rejects mutation records that discard target or class", () => {
  const fixture = intersectionFixture();
  Object.assign(fixture.reports[0].cases[0], {
    status: "RUNTIME",
    errorCode: "INPUT_MUTATION"
  });

  assert.throws(
    () => createIntersection({ ...fixture, reportHashes: null }),
    /structured target and class/
  );
});

test("intersection rejects mutation events attributed outside conformance", () => {
  const fixture = intersectionFixture();
  const report = fixture.reports[0];
  const testCase = fixture.suite.cases[0];
  report.mutations = [{
    validator: report.validator,
    draft: report.draft,
    formatProfile: testCase.formatProfile,
    phase: "execution",
    scope: "case",
    subjectId: testCase.id,
    caseId: testCase.id,
    schemaId: testCase.schemaId,
    mutationTarget: "data",
    mutationClass: "validation",
    moment: "measured pass",
    difference: { path: "$", kind: "changed", before: null, after: true }
  }];

  assert.throws(
    () => createIntersection({ ...fixture, reportHashes: null }),
    /conformance mutation event is invalid/
  );
});

test("performance worker source contains no mutation instrumentation", async () => {
  const source = await readFile(path.join(benchmarkRoot, "src", "worker.js"), "utf8");
  for (const forbidden of [
    "createIntegrityTracker",
    "semanticDifferenceForKey",
    "mutationRecorder",
    "inspectExecutionMutation"
  ]) {
    assert.equal(source.includes(forbidden), false, forbidden);
  }
});

test("conformance reuses schema and resource integrity baselines across unchanged cases", async () => {
  const source = await readFile(
    path.join(benchmarkRoot, "src", "conformance.js"),
    "utf8"
  );
  const loopStart = source.indexOf(
    "for (let index = 0; index < cases.length; index += 1)"
  );
  const loopEnd = source.indexOf(
    "if (schemaMetadata?.id !== cases[0]?.schemaId)",
    loopStart
  );
  const caseLoop = source.slice(loopStart, loopEnd);

  assert.equal(caseLoop.includes("createIntegrityTracker(disposableSchema)"), false);
  assert.equal(caseLoop.includes("createIntegrityTracker(resources)"), false);
});

test("intersection records empty and rejects one-sided draft corpora", () => {
  const empty = intersectionFixture();
  for (const report of empty.reports) {
    for (const record of report.cases) {
      record.status = "WRONG";
    }
  }
  assert.match(
    createIntersection({ ...empty, reportHashes: null }).emptyReason,
    /no eligible participants/
  );

  const oneSided = intersectionFixture();
  for (const record of oneSided.suite.cases) {
    if (record.draft === "draft6" && record.formatProfile === "base") {
      record.expected = true;
    }
  }
  assert.throws(
    () => createIntersection({ ...oneSided, reportHashes: null }),
    /valid and invalid cases/
  );
});

test("compile keys canonicalize effective operations and separate draft or resources", () => {
  const schemas = [
    { id: "d6-a", draft: "draft6", schema: { type: "object", minProperties: 1 } },
    { id: "d6-b", draft: "draft6", schema: { minProperties: 1, type: "object" } },
    { id: "d7-a", draft: "draft7", schema: { type: "object", minProperties: 1 } },
    {
      id: "d6-profile-base",
      draft: "draft6",
      formatProfile: "base",
      schema: { type: "string", format: "email" }
    },
    {
      id: "d6-profile-assertion",
      draft: "draft6",
      formatProfile: "format-assertion",
      schema: { type: "string", format: "email" }
    },
    {
      id: "d6-remote-a",
      draft: "draft6",
      schema: { $ref: "http://localhost:1234/a.json" }
    },
    {
      id: "d6-remote-b",
      draft: "draft6",
      schema: { $ref: "http://localhost:1234/b.json" }
    }
  ];
  const remoteEntries = [
    {
      canonicalUrl: "http://localhost:1234/a.json",
      aliases: ["http://localhost:1234/a.json"],
      schema: { type: "integer" }
    },
    {
      canonicalUrl: "http://localhost:1234/b.json",
      aliases: ["http://localhost:1234/b.json"],
      schema: { type: "string" }
    }
  ];
  const entries = createCompileEntries({
    schemas,
    representedSchemaIds: schemas.map(({ id }) => id),
    remoteEntries
  });

  assert.equal(entries.length, 5);
  const duplicate = entries.find((entry) =>
    entry.memberSchemaIds.includes("d6-a")
  );
  assert.deepEqual(duplicate.memberSchemaIds, ["d6-a", "d6-b"]);
  assert.notEqual(
    entries.find((entry) => entry.representativeSchemaId === "d7-a").compileKey,
    duplicate.compileKey
  );
  const resourceKeys = entries
    .filter((entry) => entry.resources.length === 1)
    .map(({ compileKey }) => compileKey);
  assert.equal(new Set(resourceKeys).size, 2);
  const mergedProfiles = entries.find((entry) =>
    entry.memberSchemaIds.includes("d6-profile-base")
  );
  assert.deepEqual(mergedProfiles.memberSchemaIds, [
    "d6-profile-assertion",
    "d6-profile-base"
  ]);
  assert.deepEqual(mergedProfiles.sourceFormatProfiles, [
    "base",
    "format-assertion"
  ]);
});

test("Setup deduplicates modern Base schemas after removing format", () => {
  const schemas = [
    {
      id: "modern-with-format",
      draft: "draft2019-09",
      formatProfile: "base",
      schema: { type: "string", format: "email" }
    },
    {
      id: "modern-without-format",
      draft: "draft2019-09",
      formatProfile: "base",
      schema: { type: "string" }
    }
  ];
  const baseEntries = createCompileEntries({
    schemas,
    representedSchemaIds: schemas.map(({ id }) => id),
    remoteEntries: [],
    formatProfile: "base"
  });
  assert.equal(baseEntries.length, 1);
  assert.deepEqual(baseEntries[0].memberSchemaIds, [
    "modern-with-format",
    "modern-without-format"
  ]);
});

test("compile entries treat the active draft metaschema as built-in adapter setup", () => {
  const entries = createCompileEntries({
    schemas: [
      {
        id: "draft4:metaschema.json#/groups/0",
        draft: "draft4",
        formatProfile: "base",
        schema: { $ref: "http://json-schema.org/draft-04/schema#" }
      }
    ],
    representedSchemaIds: ["draft4:metaschema.json#/groups/0"],
    remoteEntries: [],
    formatProfile: "base"
  });

  assert.equal(entries.length, 1);
  assert.deepEqual(entries[0].resources, []);
});

test("benchmark worker rejects invalid arguments and an exhausted deadline", async () => {
  const validRequest = {
    phase: "setup",
    validator: "ajv",
    draft: "draft6",
    formatProfile: null,
    round: 1,
    deadline: Date.now() + 60_000,
    benchmarkContractSha256: "a".repeat(64),
    intersectionSha256: "b".repeat(64),
    sampleCacheIdentitySha256: "c".repeat(64),
    validatorRuntimeSha256: "d".repeat(64),
    eligibilityThresholdPercent: "098.500",
    workerExecArgv: effectiveWorkerExecArgv()
  };
  assert.equal(
    validateWorkerRequest(validRequest).eligibilityThresholdPercent,
    "98.5"
  );
  assert.equal(validateWorkerRequest({ ...validRequest, round: 6 }).round, 6);
  const invalidRequests = [
    { ...validRequest, phase: "unknown" },
    { ...validRequest, validator: "unknown" },
    { ...validRequest, draft: "draft8" },
    { ...validRequest, round: 0 },
    { ...validRequest, round: 7 },
    { ...validRequest, round: 10 },
    { ...validRequest, workerExecArgv: ["--definitely-not-effective"] },
    { ...validRequest, validatorRuntimeSha256: "invalid" },
    { ...validRequest, eligibilityThresholdPercent: "NaN" }
  ];
  for (const request of invalidRequests) {
    assert.throws(() => validateWorkerRequest(request), Error);
  }
  const { eligibilityThresholdPercent: _threshold, ...missingThreshold } =
    validRequest;
  assert.throws(
    () => validateWorkerRequest(missingThreshold),
    /eligibility threshold/
  );

  const observedCacheKeys = [];
  for (const eligibilityThresholdPercent of ["98", "98.5"]) {
    await assert.rejects(
      () =>
        executeWorkerRequest(
          { ...validRequest, eligibilityThresholdPercent },
          {
            artifactsCache: {
              get(key) {
                observedCacheKeys.push(key);
                throw new Error("CONTROLLED_CACHE_KEY_CAPTURE");
              }
            }
          }
        ),
      /CONTROLLED_CACHE_KEY_CAPTURE/
    );
  }
  assert.notEqual(observedCacheKeys[0], observedCacheKeys[1]);
  assert.match(observedCacheKeys[1], /98\.5/);

  await assert.rejects(
    () =>
      executeWorkerRequest(
        { ...validRequest, eligibilityThresholdPercent: "98.5" },
        {
          artifactsCache: new Map([
            [
              "98.5/setup/draft6/draft",
              {
                intersection: {
                  eligibility: { policy: { thresholdPercent: "98" } }
                }
              }
            ]
          ])
        }
      ),
    /eligibility threshold.*mismatch/
  );
  await assert.rejects(
    () =>
      runCompileSample({
        request: { ...validRequest, deadline: Date.now() - 1 },
        compileEntries: [],
        schemas: [],
        remotes: new Map(),
        createAdapter: () => ({})
      }),
    (error) => error.code === "COOPERATIVE_DEADLINE_EXCEEDED"
  );
});

test("programmatic benchmark API sends the normalized threshold to its worker", async (context) => {
  const environment = JSON.parse(
    await readFile(path.join(benchmarkRoot, "results", "environment.json"), "utf8")
  );
  const threshold = environment.performanceEligibility.thresholdPercent;
  let intersection;
  try {
    intersection = JSON.parse(await readFile(
      path.join(
        benchmarkRoot,
        "results",
        "draft6",
        "intersections",
        "setup.json"
      ),
      "utf8"
    ));
  } catch (error) {
    if (error?.code === "ENOENT") {
      context.skip("canonical artifacts still use the previous performance contract");
      return;
    }
    throw error;
  }
  const configured = threshold.includes(".")
    ? `0${threshold}00`
    : `0${threshold}.000`;
  const checkpointRoot = path.join(
    benchmarkRoot,
    ".cache",
    `programmatic-threshold-${process.pid}-${Date.now()}`
  );
  let workerRequest = null;

  try {
    await assert.rejects(
      () =>
        runBenchmarkSample({
          phase: "setup",
          draft: "draft6",
          formatProfile: null,
          validator: intersection.participants[0].id,
          round: 1,
          mode: "quick",
          eligibilityThresholdPercent: configured,
          checkpointRoot,
          sampleExecutor(request) {
            workerRequest = request;
            throw new Error("CONTROLLED_WORKER_REQUEST_CAPTURE");
          }
        }),
      /CONTROLLED_WORKER_REQUEST_CAPTURE/
    );
    assert.equal(workerRequest.eligibilityThresholdPercent, threshold);
    assert.match(workerRequest.validatorRuntimeSha256, /^[a-f0-9]{64}$/);
  } finally {
    await rm(checkpointRoot, { recursive: true, force: true });
  }
});

test("benchmark artifact verification rejects stale manifest and intersection hashes", () => {
  const intersection = { performanceIdentity: { policy: "fixture" } };
  const intersectionRaw = `${JSON.stringify(intersection)}\n`;
  const artifactHash = sha256(intersectionRaw);
  const intersectionHash = performanceIdentitySha256(intersection);
  assert.throws(
    () =>
      verifyBenchmarkArtifacts({
        manifest: { manifestSha256: "a".repeat(64) },
        loadedManifest: { manifestSha256: "b".repeat(64) },
        intersectionRaw,
        intersection,
        intersectionHash,
        artifactHash,
        sourceReportHashes: new Map()
      }),
    /manifest hash/
  );
  assert.throws(
    () =>
      verifyBenchmarkArtifacts({
        manifest: { manifestSha256: "a".repeat(64) },
        loadedManifest: { manifestSha256: "a".repeat(64) },
        intersectionRaw,
        intersection,
        intersectionHash,
        artifactHash: "c".repeat(64),
        sourceReportHashes: new Map()
      }),
    /artifact hash/
  );
  assert.throws(
    () =>
      verifyBenchmarkArtifacts({
        manifest: { manifestSha256: "a".repeat(64) },
        loadedManifest: { manifestSha256: "a".repeat(64) },
        intersectionRaw,
        intersection,
        intersectionHash: "c".repeat(64),
        artifactHash,
        sourceReportHashes: new Map()
      }),
    /performance identity hash/
  );
});

test("compile worker times fresh adapter setup but keeps neutral preparation outside", async () => {
  const events = [];
  const calls = [];
  const compileEntries = [
    {
      compileKey: `draft6:${"a".repeat(64)}`,
      draft: "draft6",
      representativeSchemaId: "schema-a"
    },
    {
      compileKey: `draft6:${"b".repeat(64)}`,
      draft: "draft6",
      representativeSchemaId: "schema-b"
    }
  ];
  const schemas = [
    { id: "schema-a", draft: "draft6", schema: { type: "integer" } },
    { id: "schema-b", draft: "draft6", schema: { type: "string" } }
  ];
  let clock = 0;
  const sample = await runCompileSample({
    request: {
      phase: "setup",
      validator: "fixture",
      draft: "draft6",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries,
    schemas,
    remotes: new Map(),
    resourceRegistry: {
      resourcesFor() {
        events.push("prepare");
        return [];
      }
    },
    createAdapter({ remotes }) {
      assert.equal(remotes, undefined);
      events.push("adapter");
      return {
        name: "fixture",
        version: "1.0.0",
        compile(schema) {
          events.push("compile");
          calls.push(schema.type);
          return () => true;
        },
        validate: (compiled, data) => compiled(data)
      };
    },
    now() {
      events.push("clock");
      clock += 1;
      return clock;
    },
    async yieldAfterPass() {
      events.push("yield");
      clock += 1000;
    },
    memoryUsage() {
      events.push("memory");
      return { rss: 1, heapUsed: 1, heapTotal: 1, external: 1 };
    },
    timing: {
      warmupMinimumMilliseconds: 2,
      targetSampleMilliseconds: 2,
      minimumSampleMilliseconds: 1
    }
  });

  assert.ok(events.indexOf("prepare") < events.indexOf("clock"));
  assert.ok(events.indexOf("clock") < events.indexOf("adapter"));
  assert.deepEqual(calls, ["integer", "string", "integer", "string"]);
  assert.equal(sample.operations, 2);
  assert.equal(sample.warmupPasses, 1);
  assert.equal(sample.passes, 1);
  assert.equal(sample.corpusCompileEntries, 2);
  assert.equal(sample.checksum, compileChecksum(compileEntries));
  assert.equal(sample.seconds, 0.002);
  assert.equal(sample.throughput, 1000);
  assert.equal(Object.hasOwn(sample, "detailed"), false);
  const yieldIndexes = events.flatMap((event, index) =>
    event === "yield" ? [index] : []
  );
  assert.equal(yieldIndexes.length, 2);
  for (const index of yieldIndexes) {
    assert.equal(events[index - 1], "clock");
    assert.equal(events[index + 1], "memory");
  }
});

test("compile worker gives every operation disposable schemas and resources", async () => {
  const schemaId = "draft6:mutating-schema";
  const schema = {
    type: "array",
    items: [{ type: "boolean" }],
    properties: { ["__proto__"]: true, constructor: true, toString: true }
  };
  const resource = {
    canonicalUri: "http://localhost:1234/draft6/mutating-resource.json",
    uri: "http://localhost:1234/draft6/mutating-resource.json",
    aliases: new Set([
      "http://localhost:1234/draft6/mutating-resource.json"
    ]),
    schema: { type: "boolean" }
  };
  const before = canonicalJson({ schema, resource: resource.schema });
  let clock = -1;
  let operations = 0;

  const sample = await runCompileSample({
    request: {
      phase: "setup",
      validator: "fixture",
      draft: "draft6",
      formatProfile: "base",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries: [
      {
        compileKey: `${schemaId}:fixture`,
        draft: "draft6",
        representativeSchemaId: schemaId,
        memberSchemaIds: [schemaId]
      }
    ],
    schemas: [{ id: schemaId, draft: "draft6", schema }],
    remotes: new Map(),
    resourceRegistry: { resourcesFor: () => [resource] },
    createAdapter({ resources }) {
      assert.equal(Object.hasOwn(resources[0].schema, "mutated"), false);
      resources[0].schema.mutated = true;
      return {
        name: "fixture",
        version: "1.0.0",
        compile(disposableSchema) {
          assert.equal(Object.hasOwn(disposableSchema, "mutated"), false);
          operations += 1;
          disposableSchema.mutated = true;
          disposableSchema.items[0] = undefined;
          resources[0].schema.compileMutation = true;
          return () => true;
        },
        validate: (compiled, data) => compiled(data)
      };
    },
    timing: {
      warmupMinimumMilliseconds: 1,
      targetSampleMilliseconds: 2,
      minimumSampleMilliseconds: 1
    },
    now: () => {
      clock += 1;
      return clock;
    }
  });

  assert.equal(operations, sample.warmupPasses + sample.passes);
  assert.equal(canonicalJson({ schema, resource: resource.schema }), before);
  assert.equal(Object.hasOwn(sample, "mutations"), false);
});

test("compile worker keeps boolean preparation outside the timed vendor operation", async () => {
  const events = [];
  let clock = 0;
  const compileEntries = [true, false].map((schema, index) => ({
    compileKey: `draft6:boolean-${index}`,
    draft: "draft6",
    representativeSchemaId: `boolean-${index}`
  }));

  const sample = await runCompileSample({
    request: {
      phase: "setup",
      validator: "fixture",
      draft: "draft6",
      formatProfile: "base",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries,
    schemas: [
      { id: "boolean-0", draft: "draft6", schema: true },
      { id: "boolean-1", draft: "draft6", schema: false }
    ],
    remotes: new Map(),
    createAdapter() {
      events.push("factory");
      return {
        version: "1.0.0",
        compile(schema) {
          events.push(`compile:${schema}`);
          return schema;
        },
        validate: (compiled) => compiled
      };
    },
    now() {
      events.push("clock");
      clock += 1;
      return clock;
    },
    timing: {
      warmupMinimumMilliseconds: 0,
      targetSampleMilliseconds: 0,
      minimumSampleMilliseconds: 0
    }
  });

  assert.deepEqual(events, [
    "clock",
    "factory",
    "compile:true",
    "clock",
    "clock",
    "factory",
    "compile:false",
    "clock"
  ]);
  assert.equal(sample.operations, 2);
});

test("compile worker sustains complete fresh-context passes to the temporal target", async () => {
  let clock = -10;
  let adapters = 0;
  let compiles = 0;
  const entries = executionFixtureEntries();
  const sample = await runCompileSample({
    request: {
      phase: "setup",
      validator: "fixture",
      draft: "draft6",
      formatProfile: "base",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries: entries,
    schemas: [
      {
        id: entries[0].representativeSchemaId,
        draft: "draft6",
        schema: { type: "integer" }
      }
    ],
    remotes: new Map(),
    createAdapter: () => {
      adapters += 1;
      return {
        version: "1.0.0",
        compile: () => {
          compiles += 1;
          return () => true;
        },
        validate: (compiled, data) => compiled(data)
      };
    },
    timing: {
      warmupMinimumMilliseconds: 10,
      targetSampleMilliseconds: 2500,
      minimumSampleMilliseconds: 2000
    },
    now: () => {
      clock += 10;
      return clock;
    }
  });
  assert.equal(sample.warmupPasses, 1);
  assert.equal(sample.passes, 250);
  assert.equal(sample.operations, 250);
  assert.equal(sample.actualElapsedMilliseconds, 2500);
  assert.equal(adapters, 251);
  assert.equal(compiles, 251);
});

test("compile telemetry records start, finish, peak, and stops only after a complete pass", async () => {
  const entries = executionFixtureEntries();
  const schemas = [
    {
      id: entries[0].representativeSchemaId,
      draft: "draft6",
      schema: { type: "integer" }
    }
  ];
  let clock = 0;
  let memory = 0;
  let compiles = 0;
  const request = {
    phase: "setup",
    validator: "fixture",
    draft: "draft6",
    formatProfile: "base",
    round: 1,
    deadline: Date.now() + 60_000
  };
  const createAdapter = () => ({
    version: "1.0.0",
    compile: () => {
      compiles += 1;
      return () => true;
    },
    validate: (compiled, data) => compiled(data)
  });
  const sample = await runCompileSample({
    request,
    compileEntries: entries,
    schemas,
    remotes: new Map(),
    createAdapter,
    now: () => {
      clock += 5;
      return clock;
    },
    memoryUsage: () => {
      memory += 10;
      return { rss: memory, heapUsed: memory - 1, heapTotal: memory + 1, external: 1 };
    },
    timing: {
      warmupMinimumMilliseconds: 5,
      targetSampleMilliseconds: 5,
      minimumSampleMilliseconds: 5
    }
  });
  assert.equal(sample.memory.start.rss, 10);
  assert.equal(sample.memory.end.rss, 40);
  assert.equal(sample.memory.peak.rss, 40);

  memory = 0;
  compiles = 0;
  await assert.rejects(
    () =>
      runCompileSample({
        request,
        compileEntries: entries,
        schemas,
        remotes: new Map(),
        createAdapter,
        now: () => {
          clock += 5;
          return clock;
        },
        memoryUsage: () => {
          memory += 10;
          return { rss: memory, heapUsed: memory, heapTotal: memory, external: 0 };
        },
        memoryBudget: {
          maxRssGrowthBytes: 5,
          maxHeapGrowthBytes: 100,
          sustainedGrowthPasses: 100,
          minimumGrowthBytesPerPass: 1
        },
        timing: {
          warmupMinimumMilliseconds: 5,
          targetSampleMilliseconds: 5,
          minimumSampleMilliseconds: 5
        }
      }),
    (error) =>
      error.code === "COOPERATIVE_BUDGET_EXCEEDED" &&
      error.telemetry.observedAt === "complete-pass-boundary"
  );
  assert.equal(compiles, 1);
});

test("sustained growth ignores safe startup expansion and stops under material pressure", async () => {
  const entries = executionFixtureEntries();
  const schemas = [
    {
      id: entries[0].representativeSchemaId,
      draft: "draft6",
      schema: { type: "integer" }
    }
  ];
  const request = {
    phase: "setup",
    validator: "fixture",
    draft: "draft6",
    formatProfile: "base",
    round: 1,
    deadline: Date.now() + 60_000
  };
  const run = (memoryStep) => {
    let clock = 0;
    let memory = -memoryStep;
    return runCompileSample({
      request,
      compileEntries: entries,
      schemas,
      remotes: new Map(),
      createAdapter: () => ({
        version: "1.0.0",
        compile: () => () => true,
        validate: (compiled, data) => compiled(data)
      }),
      now: () => {
        clock += 5;
        return clock;
      },
      memoryUsage: () => {
        memory += memoryStep;
        return { rss: memory, heapUsed: memory, heapTotal: memory, external: 0 };
      },
      memoryBudget: {
        maxRssGrowthBytes: 1000,
        maxHeapGrowthBytes: 1000,
        sustainedGrowthPasses: 2,
        minimumGrowthBytesPerPass: 1,
        sustainedGrowthPressureRatio: 0.5
      },
      timing: {
        warmupMinimumMilliseconds: 5,
        targetSampleMilliseconds: 5,
        minimumSampleMilliseconds: 5
      }
    });
  };

  const startup = await run(100);
  assert.equal(startup.memory.sustainedGrowthPasses, 2);
  await assert.rejects(
    () => run(300),
    (error) =>
      error.code === "COOPERATIVE_BUDGET_EXCEEDED" &&
      error.telemetry.sustainedGrowthPasses === 2 &&
      error.telemetry.end.rss - error.telemetry.start.rss === 600
  );
});

test("granular checkpoints hit, miss stale identities, overwrite atomically, and expose corruption", async () => {
  const checkpointRoot = path.join(
    benchmarkRoot,
    ".cache",
    `checkpoint-test-${process.pid}-${Date.now()}`
  );
  const request = {
    phase: "setup",
    draft: "draft6",
    formatProfile: null,
    validator: "schema-shield",
    round: 1
  };
  const intersectionHash = "a".repeat(64);
  const cacheContext = await createSampleCacheContext({
    sharedHarnessSha256: "1".repeat(64),
    suiteLockSha256: "3".repeat(64),
    validatorRuntimeSha256: "4".repeat(64),
    runtimeEnvironmentSha256: "5".repeat(64)
  });
  const identityFor = ({
    scopedRequest = request,
    scopedIntersectionHash = intersectionHash,
    contractHash = benchmarkContractSha256,
    context = cacheContext
  } = {}) => createSampleCacheIdentity({
    request: scopedRequest,
    intersectionHash: scopedIntersectionHash,
    benchmarkContractHash: contractHash,
    cacheContext: context
  });
  const baseIdentity = identityFor();
  const memoryPoint = { rss: 1, heapUsed: 1, heapTotal: 1, external: 1 };
  const sampleFor = (identity, scopedIntersectionHash = intersectionHash) => ({
    sampleContractVersion,
    benchmarkMode: "full",
    benchmarkContractSha256,
    ...request,
    intersectionSha256: scopedIntersectionHash,
    sampleCacheIdentitySha256: identity.hash,
    validatorRuntimeSha256:
      identity.identity.cacheContext.validatorRuntimeSha256,
    warmupMinimumMilliseconds:
      benchmarkConstants.setupWarmupMinimumMilliseconds,
    warmupMilliseconds: benchmarkConstants.setupWarmupMinimumMilliseconds,
    targetSampleMilliseconds: benchmarkConstants.setupTargetMilliseconds,
    minimumSampleMilliseconds:
      benchmarkConstants.setupMinimumSampleMilliseconds,
    actualElapsedMilliseconds: benchmarkConstants.setupTargetMilliseconds,
    singlePassExceededTarget: false,
    passes: 1,
    corpusCompileEntries: 1,
    operations: 1,
    seconds: 1,
    throughput: 1,
    memory: {
      start: memoryPoint,
      end: memoryPoint,
      peak: memoryPoint
    }
  });
  const sample = sampleFor(baseIdentity);
  const first = await publishSampleCheckpoint({
    request,
    sample,
    intersectionHash,
    checkpointRoot,
    cacheContext
  });
  assert.equal(first.skipped, false);
  const resumed = await publishSampleCheckpoint({
    request,
    sample,
    intersectionHash,
    checkpointRoot,
    cacheContext
  });
  assert.equal(resumed.skipped, true);
  await assert.rejects(
    () =>
      publishSampleCheckpoint({
        request,
        sample: {
          ...sample,
          validatorRuntimeSha256: "f".repeat(64)
        },
        intersectionHash,
        checkpointRoot,
        cacheContext
      }),
    /identity, contract, or intersection hash/
  );
  assert.deepEqual(
    await readSampleCheckpoint({
      request,
      intersectionHash,
      checkpointRoot,
      cacheContext
    }),
    sample
  );
  assert.equal(
    await readSampleCheckpoint({
      request,
      intersectionHash,
      benchmarkContractHash: createBenchmarkContractHash({
        eligibilityThresholdPercent: "98.5"
      }),
      checkpointRoot,
      cacheContext
    }),
    null,
    "a checkpoint from another eligibility threshold must not resume"
  );
  const checkpoint = sampleCheckpointPath(request, {
    checkpointRoot,
    sampleIdentityHash: baseIdentity.hash
  });
  assert.deepEqual(await readdir(path.dirname(checkpoint)), ["round-1.json"]);

  const changedIntersectionHash = "b".repeat(64);
  assert.equal(
    await readSampleCheckpoint({
      request,
      intersectionHash: changedIntersectionHash,
      checkpointRoot,
      cacheContext
    }),
    null
  );
  const changedIntersectionIdentity = identityFor({
    scopedIntersectionHash: changedIntersectionHash
  });
  const changedIntersectionSample = sampleFor(
    changedIntersectionIdentity,
    changedIntersectionHash
  );
  const replaced = await publishSampleCheckpoint({
    request,
    sample: changedIntersectionSample,
    intersectionHash: changedIntersectionHash,
    checkpointRoot,
    cacheContext
  });
  assert.equal(replaced.skipped, false);
  assert.notEqual(baseIdentity.hash, changedIntersectionIdentity.hash);
  assert.deepEqual(
    await readSampleCheckpoint({
      request,
      intersectionHash: changedIntersectionHash,
      checkpointRoot,
      cacheContext
    }),
    changedIntersectionSample
  );

  const contexts = {
    "adapter options": { ...cacheContext, validatorRuntimeSha256: "6".repeat(64) },
    "package upgrade": { ...cacheContext, validatorRuntimeSha256: "7".repeat(64) },
    "harness behavior": { ...cacheContext, sharedHarnessSha256: "8".repeat(64) },
    "suite corpus": { ...cacheContext, suiteLockSha256: "9".repeat(64) },
    "runtime environment": {
      ...cacheContext,
      runtimeEnvironmentSha256: "b".repeat(64)
    }
  };
  for (const [change, context] of Object.entries(contexts)) {
    assert.notEqual(identityFor({ context }).hash, baseIdentity.hash, change);
    assert.equal(
      await readSampleCheckpoint({
        request,
        intersectionHash,
        checkpointRoot,
        cacheContext: context
      }),
      null,
      change
    );
  }
  const runtimeContexts = await Promise.all(["v22-a", "v22-b"].map((node) =>
    createSampleCacheContext({
      sharedHarnessSha256: cacheContext.sharedHarnessSha256,
      suiteLockSha256: cacheContext.suiteLockSha256,
      validatorRuntimeSha256: cacheContext.validatorRuntimeSha256,
      runtimeEnvironment: {
        node,
        platform: "linux",
        architecture: "x64",
        cpuModels: ["fixture CPU"]
      }
    })
  ));
  assert.notEqual(
    runtimeContexts[0].runtimeEnvironmentSha256,
    runtimeContexts[1].runtimeEnvironmentSha256
  );
  assert.notEqual(
    identityFor({ context: runtimeContexts[0] }).hash,
    identityFor({ context: runtimeContexts[1] }).hash
  );
  assert.notEqual(
    identityFor({ contractHash: "c".repeat(64) }).hash,
    baseIdentity.hash,
    "participants and order"
  );
  for (const scopedRequest of [
    { ...request, benchmarkMode: "quick" },
    { ...request, draft: "draft7" },
    { ...request, formatProfile: "format-assertion" },
    { ...request, phase: "execution" },
    { ...request, round: 2 }
  ]) {
    assert.notEqual(identityFor({ scopedRequest }).hash, baseIdentity.hash);
  }
  assert.equal(
    identityFor({ context: { ...cacheContext, reportPresentationSha256: "f".repeat(64) } }).hash,
    baseIdentity.hash
  );

  const malformedContext = {
    ...cacheContext,
    validatorRuntimeSha256: "d".repeat(64)
  };
  const malformedIdentity = identityFor({ context: malformedContext });
  const malformedSample = sampleFor(malformedIdentity);
  await publishSampleCheckpoint({
    request,
    sample: malformedSample,
    intersectionHash,
    checkpointRoot,
    cacheContext: malformedContext
  });
  const malformedCheckpoint = sampleCheckpointPath(request, {
    checkpointRoot,
    sampleIdentityHash: malformedIdentity.hash
  });
  await writeFile(malformedCheckpoint, "{malformed\n");
  await assert.rejects(
    () => readSampleCheckpoint({
      request,
      intersectionHash,
      checkpointRoot,
      cacheContext: malformedContext
    }),
    (error) => error.code === "CHECKPOINT_CORRUPT" && /malformed/.test(error.message)
  );

  const checksumContext = {
    ...cacheContext,
    validatorRuntimeSha256: "e".repeat(64)
  };
  const checksumIdentity = identityFor({ context: checksumContext });
  await publishSampleCheckpoint({
    request,
    sample: sampleFor(checksumIdentity),
    intersectionHash,
    checkpointRoot,
    cacheContext: checksumContext
  });
  const checksumCheckpoint = sampleCheckpointPath(request, {
    checkpointRoot,
    sampleIdentityHash: checksumIdentity.hash
  });
  const corruptEnvelope = JSON.parse(await readFile(checksumCheckpoint, "utf8"));
  corruptEnvelope.sample.operations = 2;
  await writeFile(checksumCheckpoint, `${JSON.stringify(corruptEnvelope)}\n`);
  await assert.rejects(
    () => readSampleCheckpoint({
      request,
      intersectionHash,
      checkpointRoot,
      cacheContext: checksumContext
    }),
    (error) => error.code === "CHECKPOINT_CORRUPT" && /checksum/.test(error.message)
  );

  const linkedCheckpointRoot = path.join(checkpointRoot, "linked-cache-root");
  await symlink(path.join(benchmarkRoot, "test"), linkedCheckpointRoot, "dir");
  await assert.rejects(
    () => readSampleCheckpoint({
      request,
      intersectionHash,
      checkpointRoot: linkedCheckpointRoot,
      cacheContext
    }),
    /symbolic links are forbidden/
  );
  const cyclicCheckpointRoot = path.join(checkpointRoot, "cyclic-cache-root");
  await symlink("cyclic-cache-root", cyclicCheckpointRoot, "dir");
  await assert.rejects(
    () => readSampleCheckpoint({
      request,
      intersectionHash,
      checkpointRoot: cyclicCheckpointRoot,
      cacheContext
    }),
    /symbolic links are forbidden/
  );
  const identityRootEntries = await readdir(checkpointRoot);
  assert.equal(
    identityRootEntries.some((entry) => entry.includes(".staged-")),
    false
  );
  assert.throws(
    () => memoryBudgetFromEnvironment({ BENCHMARK_MAX_RSS_GROWTH_BYTES: "0" }),
    /positive finite number/
  );
  assert.throws(
    () => sampleCheckpointPath(request, {
      checkpointRoot: path.join(benchmarkRoot, "results"),
      sampleIdentityHash: baseIdentity.hash
    }),
    /project \.cache/
  );
});

test("validator runtime fingerprints isolate adapter, package, and resource bytes", async () => {
  const fixtureRoot = path.join(
    benchmarkRoot,
    ".cache",
    `runtime-fingerprint-test-${process.pid}-${Date.now()}`
  );
  const sourceRoot = path.join(fixtureRoot, "src");
  await mkdir(sourceRoot, { recursive: true });
  await writeFile(
    path.join(sourceRoot, "shared.js"),
    "export const shared = true;\n"
  );
  const schemaAdapter = path.join(sourceRoot, "schema-adapter.js");
  const ajvAdapter = path.join(sourceRoot, "ajv-adapter.js");
  await writeFile(
    schemaAdapter,
    'import "./shared.js"; import "schema-package"; export const adapter = true;\n'
  );
  await writeFile(
    ajvAdapter,
    'import "./shared.js"; import "ajv-package"; export const adapter = true;\n'
  );
  const schemaBefore = await hashAdapterRuntimeSources(schemaAdapter, sourceRoot);
  const ajvBefore = await hashAdapterRuntimeSources(ajvAdapter, sourceRoot);
  await writeFile(
    ajvAdapter,
    'import "./shared.js"; import "ajv-package"; export const adapter = false;\n'
  );
  const schemaAfter = await hashAdapterRuntimeSources(schemaAdapter, sourceRoot);
  const ajvAfter = await hashAdapterRuntimeSources(ajvAdapter, sourceRoot);
  assert.equal(schemaAfter.sha256, schemaBefore.sha256);
  assert.notEqual(ajvAfter.sha256, ajvBefore.sha256);

  const packageRoots = [];
  for (const [name, source] of [
    ["package-a", "export const value = 1;\n"],
    ["package-b", "export const value = 2;\n"]
  ]) {
    const packageRoot = path.join(fixtureRoot, name);
    await mkdir(packageRoot, { recursive: true });
    await writeFile(
      path.join(packageRoot, "package.json"),
      `${JSON.stringify({ name: "fixture-package", version: "1.0.0" })}\n`
    );
    await writeFile(path.join(packageRoot, "index.js"), source);
    packageRoots.push(packageRoot);
  }
  const selectedPackageBefore = await hashRuntimePackageBytes(packageRoots[0]);
  const unrelatedPackageBefore = await hashRuntimePackageBytes(packageRoots[1]);
  assert.notEqual(selectedPackageBefore, unrelatedPackageBefore);
  await writeFile(
    path.join(packageRoots[1], "index.js"),
    "export const value = 3;\n"
  );
  assert.equal(
    await hashRuntimePackageBytes(packageRoots[0]),
    selectedPackageBefore
  );
  assert.notEqual(
    await hashRuntimePackageBytes(packageRoots[1]),
    unrelatedPackageBefore
  );

  const metaschemaRoots = [];
  for (const [name, type] of [["meta-a", "integer"], ["meta-b", "string"]]) {
    const root = path.join(fixtureRoot, name);
    await mkdir(root, { recursive: true });
    await writeFile(
      path.join(root, "manifest.json"),
      `${JSON.stringify({ version: 1, files: ["schema.json"] })}\n`
    );
    await writeFile(
      path.join(root, "schema.json"),
      `${JSON.stringify({ type })}\n`
    );
    metaschemaRoots.push(root);
  }
  assert.notEqual(
    await hashRuntimePackageBytes(metaschemaRoots[0]),
    await hashRuntimePackageBytes(metaschemaRoots[1])
  );

  const commonJsRoot = path.join(fixtureRoot, "commonjs-runtime");
  const commonJsSourceRoot = path.join(commonJsRoot, "src");
  const commonJsAdapterRoot = path.join(commonJsSourceRoot, "adapters");
  const commonJsPackageRoot = path.join(commonJsRoot, "node_modules", "djv");
  await mkdir(commonJsAdapterRoot, { recursive: true });
  await mkdir(commonJsPackageRoot, { recursive: true });
  await writeFile(
    path.join(commonJsAdapterRoot, "djv.js"),
    [
      'import "node:util";',
      'const path = require("node:path");',
      "const fs = require('fs');",
      'const validator = require("djv");',
      "export { fs, path, validator };",
      ""
    ].join("\n")
  );
  await writeFile(
    path.join(commonJsPackageRoot, "package.json"),
    `${JSON.stringify({ name: "djv", version: "2.1.4", main: "index.js" })}\n`
  );
  await writeFile(path.join(commonJsPackageRoot, "index.js"), "module.exports = 1;\n");
  await writeFile(
    path.join(commonJsRoot, "package-lock.json"),
    `${JSON.stringify({
      name: "runtime-fixture",
      lockfileVersion: 3,
      packages: {
        "": { dependencies: { djv: "2.1.4" } },
        "node_modules/djv": {
          version: "2.1.4",
          resolved: "https://registry.npmjs.org/djv/-/djv-2.1.4.tgz",
          integrity: "sha512-fixture"
        }
      }
    })}\n`
  );
  const commonJsSources = await hashAdapterRuntimeSources(
    path.join(commonJsAdapterRoot, "djv.js"),
    commonJsSourceRoot
  );
  assert.deepEqual(commonJsSources.packages, ["djv"]);
  const commonJsBefore = await createValidatorRuntimeIdentity({
    validator: "djv",
    draft: "draft6",
    projectRoot: commonJsRoot
  });
  const commonJsLockPath = path.join(commonJsRoot, "package-lock.json");
  const commonJsLock = JSON.parse(await readFile(commonJsLockPath, "utf8"));
  commonJsLock.packages["node_modules/djv"].integrity = "sha512-changed";
  await writeFile(commonJsLockPath, `${JSON.stringify(commonJsLock)}\n`);
  const lockChanged = await createValidatorRuntimeIdentity({
    validator: "djv",
    draft: "draft6",
    projectRoot: commonJsRoot
  });
  assert.notEqual(lockChanged.hash, commonJsBefore.hash);
  commonJsLock.packages["node_modules/djv"].integrity = "sha512-fixture";
  await writeFile(commonJsLockPath, `${JSON.stringify(commonJsLock)}\n`);

  await writeFile(
    path.join(commonJsPackageRoot, "package.json"),
    `${JSON.stringify({ name: "djv", version: "2.1.5", main: "index.js" })}\n`
  );
  await assert.rejects(
    () =>
      createValidatorRuntimeIdentity({
        validator: "djv",
        draft: "draft6",
        projectRoot: commonJsRoot
      }),
    /package lock identity mismatch for djv/
  );
  await writeFile(
    path.join(commonJsPackageRoot, "package.json"),
    `${JSON.stringify({ name: "djv", version: "2.1.4", main: "index.js" })}\n`
  );
  await writeFile(path.join(commonJsPackageRoot, "index.js"), "module.exports = 2;\n");
  const commonJsAfter = await createValidatorRuntimeIdentity({
    validator: "djv",
    draft: "draft6",
    projectRoot: commonJsRoot
  });
  assert.notEqual(commonJsAfter.hash, commonJsBefore.hash);
  assert.throws(
    () =>
      assertCompatibleDiagnosticBaseline({
        mode: "full",
        validator: "ajv",
        validatorIds: ["ajv", "djv"],
        baselineIndex: { benchmarkMode: "full" },
        baselineEnvironment: {
          cohortIdentity: {
            cohortIdentityVersion: 1,
            benchmarkMode: "full",
            rounds: 6,
            benchmarkContractSha256: "contract",
            eligibilityThresholdPercent: "98",
            sharedHarnessSha256: "harness",
            packageLockSha256: "package-lock",
            npmSnapshotLockSha256: "snapshot-lock",
            suiteLockSha256: "suite-lock",
            runtimeEnvironment: {},
            validatorRuntimeSha256: { "draft6/ajv": "ajv", "draft6/djv": commonJsBefore.hash }
          }
        },
        currentCohortIdentity: {
          cohortIdentityVersion: 1,
          benchmarkMode: "full",
          rounds: 6,
          benchmarkContractSha256: "contract",
          eligibilityThresholdPercent: "98",
          sharedHarnessSha256: "harness",
          packageLockSha256: "package-lock",
          npmSnapshotLockSha256: "snapshot-lock",
          suiteLockSha256: "suite-lock",
          runtimeEnvironment: {},
          validatorRuntimeSha256: { "draft6/ajv": "ajv", "draft6/djv": commonJsAfter.hash }
        }
      }),
    /validator runtime mismatch for djv.*full benchmark/i
  );

  const dynamicAdapter = path.join(commonJsAdapterRoot, "dynamic.js");
  await writeFile(dynamicAdapter, "const name = 'djv'; require(name);\n");
  await assert.rejects(
    () => hashAdapterRuntimeSources(dynamicAdapter, commonJsSourceRoot),
    /dynamic require is forbidden/i
  );
  const traversalAdapter = path.join(commonJsAdapterRoot, "traversal.js");
  await writeFile(traversalAdapter, 'require("../../outside.js");\n');
  await assert.rejects(
    () => hashAdapterRuntimeSources(traversalAdapter, commonJsSourceRoot),
    /escapes benchmark source|invalid module specifier/i
  );
});

test("effective worker V8 flags match the child runtime", async () => {
  const effective = effectiveWorkerExecArgv([
    "--inspect=0",
    "--max-old-space-size",
    "64",
    "--jitless"
  ]);
  assert.deepEqual(effective, ["--max-old-space-size=64", "--jitless"]);
  const probe = (flags) => new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        ...flags,
        "-e",
        "const v8=require('node:v8');process.stdout.write(JSON.stringify({execArgv:process.execArgv.filter((arg)=>arg.startsWith('--')),heap:v8.getHeapStatistics().heap_size_limit}))"
      ],
      { cwd: benchmarkRoot, stdio: ["ignore", "pipe", "pipe"] }
    );
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.once("error", reject);
    child.once("close", (code) => {
      if (code !== 0) {
        reject(new Error(`flag probe failed with ${code}: ${stderr}`));
        return;
      }
      resolve(JSON.parse(stdout));
    });
  });
  const [observed, defaultRuntime] = await Promise.all([
    probe(["--max-old-space-size=64"]),
    probe([])
  ]);
  assert.deepEqual(observed.execArgv, ["--max-old-space-size=64"]);
  assert.ok(observed.heap < defaultRuntime.heap);
});

test("pending worker outputs reject symlinks, escapes, and directory substitution", async () => {
  const fixtureRoot = path.join(
    benchmarkRoot,
    ".cache",
    `pending-output-test-${process.pid}-${Date.now()}`
  );
  await mkdir(fixtureRoot, { recursive: true });

  const linkedPendingRoot = path.join(fixtureRoot, "linked-pending");
  await symlink(path.join(benchmarkRoot, "test"), linkedPendingRoot, "dir");
  await assert.rejects(
    () => prepareConfinedCacheDirectory(linkedPendingRoot),
    (error) => error.code === "UNSAFE_CACHE_PATH" && /symbolic links/.test(error.message)
  );

  const pendingRoot = path.join(fixtureRoot, "pending");
  await prepareConfinedCacheDirectory(pendingRoot);
  const linkedOutput = path.join(pendingRoot, "linked-output.json");
  const linkedTarget = path.join(benchmarkRoot, "package.json");
  const linkedTargetBefore = await readFile(linkedTarget, "utf8");
  await symlink(linkedTarget, linkedOutput, "file");
  await assert.rejects(
    () => writeConfinedCacheOutput(linkedOutput, "{}\n"),
    (error) => error.code === "UNSAFE_CACHE_PATH" && /symbolic links/.test(error.message)
  );
  assert.equal(await readFile(linkedTarget, "utf8"), linkedTargetBefore);

  await assert.rejects(
    () => prepareConfinedCacheOutput(
      path.join(benchmarkRoot, "test", "escaped-worker-output.json")
    ),
    (error) => error.code === "UNSAFE_CACHE_PATH" && /escapes/.test(error.message)
  );

  const replaceableRoot = path.join(fixtureRoot, "replaceable");
  const substitutedOutput = path.join(replaceableRoot, "sample.json");
  await prepareConfinedCacheOutput(substitutedOutput);
  await rename(replaceableRoot, path.join(fixtureRoot, "original-replaceable"));
  await symlink(path.join(benchmarkRoot, "test"), replaceableRoot, "dir");
  await assert.rejects(
    () => writeConfinedCacheOutput(substitutedOutput, "{}\n"),
    (error) => error.code === "UNSAFE_CACHE_PATH" && /symbolic links/.test(error.message)
  );

  const validOutput = path.join(pendingRoot, "valid-output.json");
  await prepareConfinedCacheOutput(validOutput);
  await writeConfinedCacheOutput(validOutput, '{"ok":true}\n');
  assert.equal(await readFile(validOutput, "utf8"), '{"ok":true}\n');
  await assert.rejects(
    () => writeConfinedCacheOutput(validOutput, "{}\n"),
    (error) => error.code === "UNSAFE_CACHE_PATH" && /already exists/.test(error.message)
  );
});

function executionFixtureCases(expected = [true, false]) {
  return expected.map((value, index) => ({
    id: `draft6:fixture.json#/groups/0/tests/${index}`,
    schemaId: "draft6:fixture.json#/groups/0",
    draft: "draft6",
    expected: value,
    data: { value }
  }));
}

function executionFixtureEntries() {
  return [
    {
      compileKey: `draft6:${"a".repeat(64)}`,
      draft: "draft6",
      representativeSchemaId: "draft6:fixture.json#/groups/0",
      memberSchemaIds: ["draft6:fixture.json#/groups/0"]
    }
  ];
}

test("execution worker rejects one-sided, missing, and previously incorrect corpora", async () => {
  const request = {
    phase: "execution",
    validator: "fixture",
    draft: "draft6",
    round: 1,
    deadline: Date.now() + 60_000
  };
  const schemas = [
    {
      id: "draft6:fixture.json#/groups/0",
      draft: "draft6",
      schema: {}
    }
  ];
  const createAdapter = (result) => () => ({
    name: "fixture",
    version: "1.0.0",
    compile: () => () => result,
    validate: (compiled, data) => compiled(data)
  });

  for (const expected of [[true], [false]]) {
    await assert.rejects(
      () =>
        runExecutionSample({
          request,
          compileEntries: executionFixtureEntries(),
          cases: executionFixtureCases(expected),
          caseIds: executionFixtureCases(expected).map(({ id }) => id),
          schemas,
          remotes: new Map(),
          createAdapter: createAdapter(expected[0])
        }),
      /valid and invalid cases/
    );
  }

  const cases = executionFixtureCases();
  await assert.rejects(
    () =>
      runExecutionSample({
        request,
        compileEntries: executionFixtureEntries(),
        cases,
        caseIds: [...cases.map(({ id }) => id), "missing-case"],
        schemas,
        remotes: new Map(),
        createAdapter: createAdapter(true)
      }),
    /case is absent/
  );
  await assert.rejects(
    () =>
      runExecutionSample({
        request,
        compileEntries: executionFixtureEntries(),
        cases,
        caseIds: cases.map(({ id }) => id),
        schemas,
        remotes: new Map(),
        createAdapter: createAdapter(true)
      }),
    (error) => error.code === "PREVIOUS_RESULT_MISMATCH"
  );
});

test("execution worker completes timed warmup and sustained full-corpus passes", async () => {
  const events = [];
  let calls = 0;
  const cases = executionFixtureCases();
  let clock = -400;
  const sample = await runExecutionSample({
    request: {
      phase: "execution",
      validator: "fixture",
      draft: "draft6",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries: executionFixtureEntries(),
    cases,
    caseIds: cases.map(({ id }) => id),
    schemas: [
      {
        id: "draft6:fixture.json#/groups/0",
        draft: "draft6",
        schema: {}
      }
    ],
    remotes: new Map(),
    createAdapter() {
      events.push("adapter");
      return {
        name: "fixture",
        version: "1.0.0",
        compile() {
          events.push("compile");
          return (data) => {
            calls += 1;
            return data.value;
          };
        },
        validate: (compiled, data) => compiled(data)
      };
    },
    timing: {
      warmupMinimumMilliseconds: 1000,
      targetSampleMilliseconds: 2500,
      minimumSampleMilliseconds: 2000
    },
    now() {
      events.push("clock");
      clock += 400;
      return clock;
    },
    async yieldAfterPass() {
      events.push("execution-yield");
    }
  });

  assert.deepEqual(events.slice(0, 2), ["adapter", "compile"]);
  assert.equal(sample.warmupPasses, 3);
  assert.equal(sample.warmupMilliseconds, 1200);
  assert.equal(sample.targetSampleMilliseconds, 2500);
  assert.equal(sample.minimumSampleMilliseconds, 2000);
  assert.equal(sample.actualElapsedMilliseconds, 2800);
  assert.equal(sample.passes, 7);
  assert.equal(sample.operations, 14);
  assert.equal(sample.validCases, 1);
  assert.equal(sample.invalidCases, 1);
  assert.equal(Object.hasOwn(sample, "mode"), false);
  assert.equal(sample.memory.observedAt, "complete-pass-boundary");
  assert.equal(events.includes("execution-yield"), false);
  assert.equal(calls, 22);
  assert.equal(typeof sample.checksum, "number");
});

test("execution worker exceeds 100 passes when the temporal target requires it", async () => {
  const cases = executionFixtureCases();
  const dataIdentities = new Set();
  let clock = -10;
  const sustained = await runExecutionSample({
    request: {
      phase: "execution",
      validator: "fixture",
      draft: "draft6",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries: executionFixtureEntries(),
    cases,
    caseIds: cases.map(({ id }) => id),
    schemas: [{ id: cases[0].schemaId, draft: "draft6", schema: {} }],
    remotes: new Map(),
    createAdapter: () => ({
      name: "fixture",
      version: "1.0.0",
      compile: () => (data) => data.value,
      validate(compiled, data) {
        dataIdentities.add(data);
        return compiled(data);
      }
    }),
    timing: {
      warmupMinimumMilliseconds: 10,
      targetSampleMilliseconds: 2500,
      minimumSampleMilliseconds: 2000
    },
    now: () => {
      clock += 10;
      return clock;
    }
  });
  assert.equal(sustained.passes, 250);
  assert.equal(sustained.operations, 500);
  assert.equal(sustained.actualElapsedMilliseconds, 2500);
  assert.equal(dataIdentities.size, cases.length * 2);
});

test("execution worker documents a single complete pass that exceeds target", async () => {
  const cases = executionFixtureCases();
  let clock = -3000;
  const sample = await runExecutionSample({
    request: {
      phase: "execution",
      validator: "fixture",
      draft: "draft6",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries: executionFixtureEntries(),
    cases,
    caseIds: cases.map(({ id }) => id),
    schemas: [{ id: cases[0].schemaId, draft: "draft6", schema: {} }],
    remotes: new Map(),
    createAdapter: () => ({
      name: "fixture",
      version: "1.0.0",
      compile: () => (data) => data.value,
      validate: (compiled, data) => compiled(data)
    }),
    timing: {
      warmupMinimumMilliseconds: 1000,
      targetSampleMilliseconds: 2500,
      minimumSampleMilliseconds: 2000
    },
    now: () => {
      clock += 3000;
      return clock;
    }
  });
  assert.equal(sample.passes, 1);
  assert.equal(sample.actualElapsedMilliseconds, 3000);
  assert.equal(sample.singlePassExceededTarget, true);
});

test("execution worker reuses one isolated mutable measurement set per round", async () => {
  const schemaId = "draft6:fixture.json#/groups/0";
  const cases = [
    {
      id: `${schemaId}/tests/0`,
      schemaId,
      draft: "draft6",
      expected: true,
      data: { value: true }
    },
    {
      id: `${schemaId}/tests/1`,
      schemaId,
      draft: "draft6",
      expected: false,
      data: [false]
    }
  ];
  const schema = {
    properties: { ["__proto__"]: true, constructor: true, toString: true }
  };
  const resource = {
    canonicalUri: "http://localhost:1234/draft6/execution-resource.json",
    uri: "http://localhost:1234/draft6/execution-resource.json",
    aliases: new Set([
      "http://localhost:1234/draft6/execution-resource.json"
    ]),
    schema: { type: "boolean" }
  };
  const before = canonicalJson({
    schema,
    resource: resource.schema,
    data: cases.map(({ data }) => data)
  });
  const identitiesByRound = [];

  for (const round of [1, 2]) {
    const calls = [];
    let clock = -1;
    const sample = await runExecutionSample({
      request: {
        phase: "execution",
        validator: "fixture",
        draft: "draft6",
        formatProfile: "base",
        round,
        deadline: Date.now() + 60_000
      },
      compileEntries: executionFixtureEntries(),
      cases,
      caseIds: cases.map(({ id }) => id),
      schemas: [{ id: schemaId, draft: "draft6", schema }],
      remotes: new Map(),
      resourceRegistry: { resourcesFor: () => [resource] },
      createAdapter({ resources }) {
        assert.equal(Object.hasOwn(resources[0].schema, "mutated"), false);
        return {
          name: "fixture",
          version: "1.0.0",
          compile(disposableSchema) {
            assert.equal(Object.hasOwn(disposableSchema, "mutated"), false);
            return data => {
              calls.push(data);
              assert.equal(Object.isFrozen(data), false);
              return Array.isArray(data) ? data[0] : data.value;
            };
          },
          validate: (compiled, data) => compiled(data)
        };
      },
      timing: {
        warmupMinimumMilliseconds: 1,
        targetSampleMilliseconds: 2,
        minimumSampleMilliseconds: 1
      },
      now: () => {
        clock += 1;
        return clock;
      }
    });

    assert.equal(sample.warmupPasses, 1);
    assert.equal(sample.passes, 2);
    assert.notEqual(calls[0], calls[2]);
    assert.strictEqual(calls[2], calls[4]);
    assert.strictEqual(calls[4], calls[6]);
    assert.strictEqual(calls[3], calls[5]);
    assert.strictEqual(calls[5], calls[7]);
    identitiesByRound.push(calls[4], calls[5]);
    assert.equal(
      canonicalJson({
        schema,
        resource: resource.schema,
        data: cases.map(({ data }) => data)
      }),
      before
    );
  }

  assert.notEqual(identitiesByRound[0], identitiesByRound[2]);
  assert.notEqual(identitiesByRound[1], identitiesByRound[3]);
});

test("cfworker draft4 compile mutation stays confined without performance tracking", async () => {
  const schemaId = "draft4:smoke.json#/groups/0";
  const schema = { type: "integer" };
  const cases = [
    { id: `${schemaId}/tests/0`, schemaId, draft: "draft4", expected: true, data: 1 },
    { id: `${schemaId}/tests/1`, schemaId, draft: "draft4", expected: false, data: "1" }
  ];
  let clock = -1;
  const sample = await runExecutionSample({
    request: {
      phase: "execution",
      validator: "cfworker-json-schema",
      draft: "draft4",
      formatProfile: "base",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries: [
      {
        compileKey: `draft4:${"a".repeat(64)}`,
        draft: "draft4",
        representativeSchemaId: schemaId,
        memberSchemaIds: [schemaId]
      }
    ],
    cases,
    caseIds: cases.map(({ id }) => id),
    schemas: [{ id: schemaId, draft: "draft4", schema }],
    remotes: new Map(),
    createAdapter: getAdapterFactory("cfworker-json-schema"),
    timing: {
      warmupMinimumMilliseconds: 0,
      targetSampleMilliseconds: 1,
      minimumSampleMilliseconds: 1
    },
    now: () => {
      clock += 1;
      return clock;
    }
  });

  assert.equal(sample.checksum, 17);
  assert.equal(Object.hasOwn(schema, "__absolute_uri__"), false);
  assert.equal(Object.hasOwn(sample, "mutations"), false);
});

test("execution confines private mutations without tracking them", async () => {
  const cases = executionFixtureCases();
  const schema = {};
  const resource = {
    canonicalUri: "http://localhost:1234/confined-resource.json",
    uri: "http://localhost:1234/confined-resource.json",
    aliases: new Set(["http://localhost:1234/confined-resource.json"]),
    schema: { type: "boolean" }
  };
  const before = canonicalJson({ schema, resource: resource.schema, cases });
  let clock = -1;
  const sample = await runExecutionSample({
    request: {
      phase: "execution",
      validator: "confined-mutator",
      draft: "draft6",
      formatProfile: "base",
      round: 2,
      deadline: Date.now() + 60_000
    },
    compileEntries: executionFixtureEntries(),
    cases,
    caseIds: cases.map(({ id }) => id),
    schemas: [{ id: cases[0].schemaId, draft: "draft6", schema }],
    remotes: new Map(),
    resourceRegistry: { resourcesFor: () => [resource] },
    createAdapter: ({ resources }) => {
      resources[0].schema.normalizedDuringSetup = true;
      return {
      name: "confined-mutator",
      version: "1.0.0",
      compile(privateSchema) {
        privateSchema.normalized = true;
        return (data) => data.value;
      },
      validate(compiled, data) {
        const observed = compiled(data);
        data.visited = true;
        return observed;
      }
      };
    },
    timing: {
      warmupMinimumMilliseconds: 1,
      targetSampleMilliseconds: 2,
      minimumSampleMilliseconds: 1
    },
    now: () => {
      clock += 1;
      return clock;
    }
  });

  assert.equal(sample.checksum, 17 * sample.passes);
  assert.equal(canonicalJson({ schema, resource: resource.schema, cases }), before);
  assert.equal(Object.hasOwn(sample, "mutations"), false);

  clock = -1;
  const cleanSample = await runExecutionSample({
    request: {
      phase: "execution",
      validator: "clean-adapter",
      draft: "draft6",
      formatProfile: "base",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries: executionFixtureEntries(),
    cases,
    caseIds: cases.map(({ id }) => id),
    schemas: [{ id: cases[0].schemaId, draft: "draft6", schema }],
    remotes: new Map(),
    resourceRegistry: { resourcesFor: () => [resource] },
    createAdapter: ({ resources }) => {
      assert.equal(
        Object.hasOwn(resources[0].schema, "normalizedDuringSetup"),
        false
      );
      return {
        name: "clean-adapter",
        version: "1.0.0",
        compile(privateSchema) {
          assert.equal(Object.hasOwn(privateSchema, "normalized"), false);
          return (data) => data.value;
        },
        validate(compiled, data) {
          assert.equal(Object.hasOwn(data, "visited"), false);
          return compiled(data);
        }
      };
    },
    timing: {
      warmupMinimumMilliseconds: 1,
      targetSampleMilliseconds: 2,
      minimumSampleMilliseconds: 1
    },
    now: () => {
      clock += 1;
      return clock;
    }
  });
  assert.equal(Object.hasOwn(cleanSample, "mutations"), false);
  assert.equal(canonicalJson({ schema, resource: resource.schema, cases }), before);
});

test("execution rejects changed results without mutation tracking", async () => {
  const cases = executionFixtureCases();
  const before = canonicalJson(cases);
  let validations = 0;
  let clock = -1;
  await assert.rejects(
    () =>
      runExecutionSample({
        request: {
          phase: "execution",
          validator: "checksum-mutator",
          draft: "draft6",
          formatProfile: "base",
          round: 1,
          deadline: Date.now() + 60_000
        },
        compileEntries: executionFixtureEntries(),
        cases,
        caseIds: cases.map(({ id }) => id),
        schemas: [{ id: cases[0].schemaId, draft: "draft6", schema: {} }],
        remotes: new Map(),
        createAdapter: () => ({
          name: "checksum-mutator",
          version: "1.0.0",
          compile: () => (data) => data.value,
          validate(compiled, data) {
            validations += 1;
            if (validations > cases.length) {
              data.value = !data.value;
            }
            return compiled(data);
          }
        }),
        timing: {
          warmupMinimumMilliseconds: 1,
          targetSampleMilliseconds: 2,
          minimumSampleMilliseconds: 1
        },
        now: () => {
          clock += 1;
          return clock;
        }
      }),
    (error) => {
      assert.equal(error.code, "EXECUTION_RESULT_MISMATCH");
      assert.equal(error.validator, "checksum-mutator");
      assert.equal(error.draft, "draft6");
      assert.equal(error.formatProfile, "base");
      assert.equal(error.phase, "execution");
      assert.equal(error.round, 1);
      assert.equal(error.moment, "warmup pass 1");
      assert.equal(error.caseId, cases[0].id);
      assert.equal(error.expected, true);
      assert.equal(error.observed, false);
      assert.match(error.message, /checksum-mutator.*draft6.*base.*round=1/);
      assert.match(error.message, /caseId=.*tests\/0.*expected=true.*observed=false/);
      return true;
    }
  );
  assert.equal(canonicalJson(cases), before);
});

test("execution rejects changed results during warmup and measurement", async () => {
  const schemaId = "draft6:fixture.json#/groups/0";
  const expected = [false, false, true];
  const collision = [true, true, false];
  const cases = expected.map((value, index) => ({
    id: `${schemaId}/tests/${index}`,
    schemaId,
    draft: "draft6",
    expected: value,
    data: { index }
  }));

  for (const [label, warmupMinimumMilliseconds, expectedMoment] of [
    ["warmup", 1, "warmup pass 1"],
    ["measurement", 0, "measured pass 1"]
  ]) {
    let calls = 0;
    let clock = -1;
    await assert.rejects(
      () =>
        runExecutionSample({
          request: {
            phase: "execution",
            validator: `collision-${label}`,
            draft: "draft6",
            formatProfile: "base",
            round: 1,
            deadline: Date.now() + 60_000
          },
          compileEntries: executionFixtureEntries(),
          cases,
          caseIds: cases.map(({ id }) => id),
          schemas: [{ id: schemaId, draft: "draft6", schema: {} }],
          remotes: new Map(),
          createAdapter: () => ({
            name: `collision-${label}`,
            version: "1.0.0",
            compile: () => (data) => {
              calls += 1;
              return calls <= cases.length
                ? expected[data.index]
                : collision[data.index];
            },
            validate: (compiled, data) => compiled(data)
          }),
          timing: {
            warmupMinimumMilliseconds,
            targetSampleMilliseconds: 1,
            minimumSampleMilliseconds: 1
          },
          now: () => {
            clock += 1;
            return clock;
          }
        }),
      (error) => {
        assert.equal(error.code, "EXECUTION_RESULT_MISMATCH");
        assert.equal(error.moment, expectedMoment);
        assert.equal(error.caseId, cases[0].id);
        assert.equal(error.expected, false);
        assert.equal(error.observed, true);
        return true;
      }
    );
  }
});

test("execution does not track confined measured-corpus mutations", async () => {
  const cases = executionFixtureCases();
  const before = canonicalJson(cases.map(({ data }) => data));
  let validations = 0;
  let clock = -1;
  const sample = await runExecutionSample({
      request: {
        phase: "execution",
        validator: "mutating-fixture",
        draft: "draft6",
        formatProfile: "base",
        round: 1,
        deadline: Date.now() + 60_000
      },
      compileEntries: executionFixtureEntries(),
      cases,
      caseIds: cases.map(({ id }) => id),
      schemas: [{ id: cases[0].schemaId, draft: "draft6", schema: {} }],
      remotes: new Map(),
      createAdapter: () => ({
        name: "mutating-fixture",
        version: "1.0.0",
        compile: () => data => {
          const observed = data.value;
          validations += 1;
          if (validations > cases.length) {
            data.visited = true;
          }
          return observed;
        },
        validate: (compiled, data) => compiled(data)
      }),
      now: () => {
        clock += 1;
        return clock;
      },
      timing: {
        warmupMinimumMilliseconds: 1,
        targetSampleMilliseconds: 2,
        minimumSampleMilliseconds: 1
      }
    });
  assert.equal(Object.hasOwn(sample, "mutations"), false);
  assert.equal(canonicalJson(cases.map(({ data }) => data)), before);
});

test("execution confines deferred schema and resource mutations without tracking", async () => {
  for (const mutationTarget of ["schema", "resources"]) {
    const cases = executionFixtureCases();
    const schema = { type: "boolean" };
    const resource = {
      canonicalUri: "http://localhost:1234/deferred-resource.json",
      uri: "http://localhost:1234/deferred-resource.json",
      aliases: new Set(["http://localhost:1234/deferred-resource.json"]),
      schema: { type: "boolean" }
    };
    const before = canonicalJson({
      schema,
      resource: resource.schema,
      data: cases.map(({ data }) => data)
    });
    let validations = 0;
    let clock = -1;
    const sample = await runExecutionSample({
        request: {
          phase: "execution",
          validator: `${mutationTarget}-mutator`,
          draft: "draft6",
          formatProfile: "base",
          round: 1,
          deadline: Date.now() + 60_000
        },
        compileEntries: executionFixtureEntries(),
        cases,
        caseIds: cases.map(({ id }) => id),
        schemas: [{ id: cases[0].schemaId, draft: "draft6", schema }],
        remotes: new Map(),
        resourceRegistry: { resourcesFor: () => [resource] },
        createAdapter({ resources }) {
          return {
            name: `${mutationTarget}-mutator`,
            version: "1.0.0",
            compile(disposableSchema) {
              return data => {
                const observed = Array.isArray(data) ? data[0] : data.value;
                validations += 1;
                if (validations > cases.length) {
                  const target = mutationTarget === "schema"
                    ? disposableSchema
                    : resources[0].schema;
                  Object.defineProperty(target, Symbol("deferred"), {
                    value: { cycle: target },
                    enumerable: false,
                    configurable: true
                  });
                }
                return observed;
              };
            },
            validate: (compiled, data) => compiled(data)
          };
        },
        now: () => {
          clock += 1;
          return clock;
        },
        timing: {
          warmupMinimumMilliseconds: 1,
          targetSampleMilliseconds: 2,
          minimumSampleMilliseconds: 1
        }
      });
    assert.equal(Object.hasOwn(sample, "mutations"), false);
    assert.equal(
      canonicalJson({
        schema,
        resource: resource.schema,
        data: cases.map(({ data }) => data)
      }),
      before
    );
  }
});

test("only conformance reports jsonschema mutation of special-name property cases", async () => {
  const schemaId = "draft7:properties.json#/groups/5";
  const schema = {
    properties: {
      ["__proto__"]: { type: "number" },
      toString: { properties: { length: { type: "string" } } },
      constructor: { type: "number" }
    }
  };
  const cases = [
    {
      id: `${schemaId}/tests/2`,
      schemaId,
      draft: "draft7",
      formatProfile: "base",
      expected: true,
      data: {}
    },
    {
      id: `${schemaId}/tests/5`,
      schemaId,
      draft: "draft7",
      formatProfile: "base",
      expected: false,
      data: { constructor: { length: 37 } }
    }
  ];
  const before = canonicalJson(cases.map(({ data }) => data));
  const conformanceAdapter = getAdapterFactory("jsonschema")({
    draft: "draft7",
    formatProfile: "base",
    resources: [],
    unknownFormats: []
  });
  const mutationEvents = [];
  const records = await classifySchemaCases({
    adapter: conformanceAdapter,
    schema,
    schemaMetadata: { id: schemaId },
    cases,
    mutationEvents
  });
  assert.deepEqual(records.map(({ status }) => status), ["PASS", "PASS"]);
  assert.deepEqual(records.map(({ errorCode }) => errorCode), [null, null]);
  assert.deepEqual(
    records.filter(({ status }) => status === "PASS").map(({ id }) => id),
    cases.map(({ id }) => id)
  );
  assert.equal(mutationEvents.length, 2);
  assert.ok(mutationEvents.every(({ scope }) => scope === "case"));
  let clock = -1;

  const sample = await runExecutionSample({
    request: {
      phase: "execution",
      validator: "jsonschema",
      draft: "draft7",
      formatProfile: "base",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries: [
      {
        compileKey: `${schemaId}:fixture`,
        draft: "draft7",
        representativeSchemaId: schemaId,
        memberSchemaIds: [schemaId]
      }
    ],
    cases,
    caseIds: cases.map(({ id }) => id),
    schemas: [{ id: schemaId, draft: "draft7", schema }],
    remotes: new Map(),
    createAdapter: getAdapterFactory("jsonschema"),
    timing: {
      warmupMinimumMilliseconds: 0,
      targetSampleMilliseconds: 1,
      minimumSampleMilliseconds: 1
    },
    now: () => {
      clock += 1;
      return clock;
    }
  });
  assert.equal(Object.hasOwn(sample, "mutations"), false);

  assert.equal(canonicalJson(cases.map(({ data }) => data)), before);
  assert.equal(Object.hasOwn(cases[0].data, "toString"), false);
  assert.equal(Object.hasOwn(cases[1].data, "toString"), false);
});

test("AJV draft2020-12 base runs a large isolated corpus under the real memory budget", async () => {
  const draft = "draft2020-12";
  const formatProfile = "base";
  const schemas = Array.from({ length: 382 }, (_, index) => ({
    id: `${draft}:memory-${index}`,
    draft,
    formatProfile,
    schema: { type: "integer", minimum: index }
  }));
  const compileEntries = schemas.map(({ id }, index) => ({
    compileKey: `${draft}:${formatProfile}:memory-${index}`,
    draft,
    formatProfile,
    representativeSchemaId: id,
    memberSchemaIds: [id],
    resources: []
  }));
  const cases = Array.from({ length: 1339 }, (_, index) => {
    const schemaIndex = index % schemas.length;
    const expected = index % 2 === 0;
    return {
      id: `${draft}:memory-${index}`,
      schemaId: schemas[schemaIndex].id,
      draft,
      formatProfile,
      expected,
      data: expected ? schemaIndex : `invalid-${index}`
    };
  });
  const caseIds = cases.map(({ id }) => id);
  assert.equal(caseIds.length, 1339);
  assert.equal(compileEntries.length, 382);
  const selectedById = new Map(cases.map((testCase) => [testCase.id, testCase]));
  const before = canonicalJson(
    caseIds.map((id) => selectedById.get(id).data)
  );
  let clock = -1;
  const sample = await runExecutionSample({
    request: {
      phase: "execution",
      validator: "ajv",
      draft,
      formatProfile,
      round: 2,
      deadline: Date.now() + 2 * 60_000
    },
    compileEntries,
    cases,
    caseIds,
    schemas,
    remotes: new Map(),
    resourceRegistry: { resourcesFor: () => [] },
    createAdapter: getAdapterFactory("ajv"),
    now: () => {
      clock += 1;
      return clock;
    },
    memoryUsage: () => process.memoryUsage(),
    memoryBudget: benchmarkConstants.memoryBudget,
    timing: {
      warmupMinimumMilliseconds: 20,
      targetSampleMilliseconds: 100,
      minimumSampleMilliseconds: 100
    }
  });

  assert.equal(sample.corpusCases, caseIds.length);
  assert.equal(sample.warmupPasses, 20);
  assert.equal(sample.passes, 100);
  assert.equal(
    canonicalJson(caseIds.map((id) => selectedById.get(id).data)),
    before
  );
  assert.ok(
    sample.memory.peak.rss - sample.memory.start.rss <=
      benchmarkConstants.memoryBudget.maxRssGrowthBytes
  );
});

test("execution worker still stops genuine memory budget growth", async () => {
  const cases = executionFixtureCases();
  let memory = 0;
  let clock = -1;
  await assert.rejects(
    () => runExecutionSample({
      request: {
        phase: "execution",
        validator: "fixture",
        draft: "draft6",
        formatProfile: "base",
        round: 1,
        deadline: Date.now() + 60_000
      },
      compileEntries: executionFixtureEntries(),
      cases,
      caseIds: cases.map(({ id }) => id),
      schemas: [{ id: cases[0].schemaId, draft: "draft6", schema: {} }],
      remotes: new Map(),
      createAdapter: () => ({
        name: "fixture",
        version: "1.0.0",
        compile: () => (data) => data.value,
        validate: (compiled, data) => compiled(data)
      }),
      now: () => {
        clock += 1;
        return clock;
      },
      memoryUsage: () => {
        memory += 20;
        return { rss: memory, heapUsed: memory, heapTotal: memory, external: 0 };
      },
      memoryBudget: {
        maxRssGrowthBytes: 10,
        maxHeapGrowthBytes: 10,
        sustainedGrowthPasses: 100,
        minimumGrowthBytesPerPass: 1,
        sustainedGrowthPressureRatio: 1
      },
      timing: {
        warmupMinimumMilliseconds: 0,
        targetSampleMilliseconds: 2,
        minimumSampleMilliseconds: 1
      }
    }),
    (error) =>
      error.code === "COOPERATIVE_BUDGET_EXCEEDED" &&
      error.telemetry.triggeredBy.includes("absolute-rss") &&
      error.telemetry.observedAt === "complete-pass-boundary"
  );
});

function reportSampleFixture(phase) {
  const draft = "draft6";
  const formatProfile = null;
  const participants = getCompileParticipants(draft);
  const samples = [];
  for (let round = 1; round <= benchmarkConstants.rounds; round += 1) {
    for (const participant of participants) {
        samples.push({
          sampleContractVersion,
          benchmarkMode: "full",
          benchmarkContractSha256,
          phase,
          validator: participant.id,
          validatorVersion: "1.0.0",
          draft,
          formatProfile,
          round,
          warmupMinimumMilliseconds:
            benchmarkConstants.setupWarmupMinimumMilliseconds,
          warmupMilliseconds:
            benchmarkConstants.setupWarmupMinimumMilliseconds,
          targetSampleMilliseconds: benchmarkConstants.setupTargetMilliseconds,
          minimumSampleMilliseconds:
            benchmarkConstants.setupMinimumSampleMilliseconds,
          actualElapsedMilliseconds: benchmarkConstants.setupTargetMilliseconds,
          singlePassExceededTarget: false,
          passes: 1,
          corpusCompileEntries: 10,
          operations: 10,
          seconds: 2.5,
          throughput: 4,
          nanosecondsPerOperation: 250_000_000,
          checksum: "fixture",
          intersectionSha256: "a".repeat(64),
          sampleCacheIdentitySha256: "b".repeat(64),
          validatorRuntimeSha256: "c".repeat(64),
          memory: {
            start: { rss: 1, heapUsed: 1, heapTotal: 1, external: 1 },
            end: { rss: 1, heapUsed: 1, heapTotal: 1, external: 1 },
            peak: { rss: 1, heapUsed: 1, heapTotal: 1, external: 1 }
          }
        });
    }
  }
  return {
    benchmarkVersion: 9,
    benchmarkMode: "full",
    phase,
    draft,
    formatProfile,
    intersectionSha256: "a".repeat(64),
    emptyReason: null,
    performanceEligibility: performanceEligibilityPolicy,
    participants: participants.map(({ id }) => id),
    participantOrderByRound: Array.from(
      { length: benchmarkConstants.rounds },
      (_, index) => ({
      round: index + 1,
      validators: getRoundOrder({ draft, phase, round: index + 1 })
      })
    ),
    samples
  };
}

test("report validation rejects missing, stale, incomplete, bad checksum, and version mismatch inputs", () => {
  const intersection = {
    draft: "draft6",
    formatProfile: null,
    hash: "a".repeat(64),
    emptyReason: null,
    performanceEligibility: performanceEligibilityPolicy,
    compileChecksum: "fixture",
    compileEntries: 10,
    execution: {}
  };
  const participants = getCompileParticipants("draft6");
  const versions = new Map(participants.map(({ id }) => [id, "1.0.0"]));
  assert.throws(
    () => validateSampleSet({ phase: "setup", result: null, intersection, installedVersions: versions, participants }),
    /missing setup result/
  );
  assert.throws(
    () =>
      validateSampleSet({
        phase: "setup",
        result: { ...reportSampleFixture("setup"), intersectionSha256: "b".repeat(64) },
        intersection,
        installedVersions: versions,
        participants
      }),
    /intersection hash/
  );
  const short = reportSampleFixture("setup");
  short.samples.pop();
  assert.throws(
    () => validateSampleSet({ phase: "setup", result: short, intersection, installedVersions: versions, participants }),
    /samples/
  );
  const badChecksum = reportSampleFixture("setup");
  badChecksum.samples[0].checksum = "wrong";
  assert.throws(
    () => validateSampleSet({ phase: "setup", result: badChecksum, intersection, installedVersions: versions, participants }),
    /checksum/
  );
  const badVersion = reportSampleFixture("setup");
  badVersion.samples[0].validatorVersion = "2.0.0";
  assert.throws(
    () => validateSampleSet({ phase: "setup", result: badVersion, intersection, installedVersions: versions, participants }),
    /installed version/
  );
  const compileDataMutation = reportSampleFixture("setup");
  const compileSample = compileDataMutation.samples[0];
  compileSample.mutations = [
    {
      validator: compileSample.validator,
      draft: compileSample.draft,
      formatProfile: compileSample.formatProfile,
      phase: "setup",
      round: compileSample.round,
      mutationTarget: "data",
      mutationClass: "compile",
      moment: "after compile",
      scope: "case",
      subjectId: "case-id",
      caseId: "case-id",
      schemaId: null,
      sampleId: "draft6/setup/round-1",
      difference: {
        path: "$.value",
        kind: "changed",
        before: null,
        after: { value: true }
      }
    }
  ];
  assert.throws(
    () =>
      validateSampleSet({
        phase: "setup",
        result: compileDataMutation,
        intersection,
        installedVersions: versions,
        participants
      }),
    /setup sample must not include mutation metadata/
  );
  assert.throws(
    () => validateInstalledVersions(new Map([["ajv", "1.0.0"]]), new Map([["ajv", "2.0.0"]])),
    /installed package version/
  );
});

test("report statistics calculate six-round center, dispersion and operation time", () => {
  const summary = summarizeThroughputs(
    [10, 20, 30, 40, 50, 60].map((throughput, index) => ({
      round: index + 1,
      throughput
    })),
    6
  );
  assert.deepEqual(summary, {
    roundThroughputs: [10, 20, 30, 40, 50, 60],
    median: 35,
    mean: 35,
    medianAbsoluteDeviation: 15,
    relativeMedianAbsoluteDeviation: 15 / 35,
    sampleStandardDeviation: Math.sqrt(350),
    coefficientOfVariation: Math.sqrt(350) / 35,
    minimum: 10,
    maximum: 60,
    nanosecondsPerOperation: 1e9 / 35
  });
  assert.throws(
    () => summarizeThroughputs([{ round: 1, throughput: 10 }], 6),
    /exactly 6 valid rounds/
  );
});

test("metadata week uses the last complete UTC Monday through Sunday", () => {
  assert.deepEqual(getLastCompleteUtcWeek(new Date("2026-07-26T12:00:00.000Z")), {
    start: "2026-07-13",
    end: "2026-07-19"
  });
  assert.deepEqual(getLastCompleteUtcWeek(new Date("2026-07-27T00:00:00.000Z")), {
    start: "2026-07-20",
    end: "2026-07-26"
  });
});

test("metadata snapshot rejects incomplete fields and package lock mismatches", () => {
  const packageMetadata = new Map([
    [
      "ajv",
      {
        version: "8.20.0",
        license: "MIT",
        engines: { node: ">=16" },
        integrity: "sha512-fixture",
        tarball: "https://registry.npmjs.org/ajv/-/ajv-8.20.0.tgz"
      }
    ]
  ]);
  const snapshot = {
    snapshotVersion: 1,
    start: "2026-07-13",
    end: "2026-07-19",
    retrievedAt: "2026-07-26T12:00:00.000Z",
    packages: {
      ajv: {
        version: "8.20.0",
        weeklyDownloads: 100,
        license: "MIT",
        engines: { node: ">=16" },
        integrity: "sha512-fixture",
        tarball: "https://registry.npmjs.org/ajv/-/ajv-8.20.0.tgz",
        downloadsResponseSha256: "a".repeat(64),
        registryResponseSha256: "b".repeat(64)
      }
    }
  };
  assert.doesNotThrow(() =>
    validateMetadataSnapshot(snapshot, packageMetadata)
  );
  assert.throws(
    () =>
      validateMetadataSnapshot(
        {
          ...snapshot,
          packages: {
            ajv: { ...snapshot.packages.ajv, weeklyDownloads: null }
          }
        },
        packageMetadata
      ),
    /weeklyDownloads/
  );
  assert.throws(
    () =>
      validateMetadataSnapshot(
        {
          ...snapshot,
          packages: {
            ajv: { ...snapshot.packages.ajv, integrity: "sha512-wrong" }
          }
        },
        packageMetadata
      ),
    /metadata mismatch/
  );
});

test("format profiles derive only from draft and official path", () => {
  const cases = [
    ["draft6", "optional/format/email.json", "format-assertion"],
    ["draft6", "format.json", "base"],
    ["draft7", "optional/format/uuid.json", "format-assertion"],
    ["draft2019-09", "format.json", "base"],
    ["draft2019-09", "optional/format/date.json", "format-assertion"],
    ["draft2020-12", "format.json", "base"],
    ["draft2020-12", "optional/format/date.json", "format-assertion"],
    ["draft2020-12", "optional/format-assertion.json", "format-assertion"]
  ];
  for (const [draft, file, expected] of cases) {
    assert.equal(getFormatProfile(draft, file), expected, `${draft}/${file}`);
  }
});

test("suite loader assigns profile metadata across drafts", async () => {
  const files = Object.fromEntries(
    [...validLock.drafts].reverse().map((draft) => [
      `tests/${draft}/${draft === "draft2020-12" ? "optional/format-assertion.json" : "type.json"}`,
      validGroup
    ])
  );
  const suiteRoot = await createSuiteFixture(files);
  const loaded = await loadSuite({
    suiteRoot,
    lock: validLock,
    inventoryPaths: Object.keys(files),
    writeManifest: false
  });
  for (const testCase of loaded.cases) {
    assert.equal(
      testCase.formatProfile,
      getFormatProfile(testCase.draft, testCase.file)
    );
  }
  assert.deepEqual(
    loaded.schemas.map(({ formatProfile }) => formatProfile),
    loaded.cases.map(({ formatProfile }) => formatProfile)
  );
});

test("local resource registry resolves embedded resources and anchors without fallback", () => {
  const root = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://example.test/root.json",
    $dynamicAnchor: "node",
    $defs: {
      child: {
        $id: "child.json",
        $anchor: "value",
        $recursiveAnchor: true,
        $dynamicAnchor: "childNode",
        type: "integer"
      }
    },
    $dynamicRef: "child.json#childNode"
  };
  const remote = {
    $schema: "https://json-schema.org/draft/2019-09/schema",
    $id: "https://example.test/remote.json",
    $recursiveAnchor: true,
    $recursiveRef: "#"
  };
  const registry = createResourceRegistry({
    rootSchemas: [{ id: "root", draft: "draft2020-12", schema: root }],
    remoteEntries: [
      {
        canonicalUrl: "http://localhost:1234/remote.json",
        aliases: [
          "http://localhost:1234/remote.json",
          "https://example.test/remote.json"
        ],
        schema: remote
      }
    ]
  });
  assert.equal(
    registry.resolve("https://example.test/root.json").schema,
    root
  );
  assert.equal(
    registry.resolve("https://example.test/child.json").schema.type,
    "integer"
  );
  assert.equal(
    registry.resolve("https://example.test/child.json#value").anchor,
    "value"
  );
  assert.equal(
    registry.resolve("https://example.test/child.json#childNode").dynamicAnchor,
    "childNode"
  );
  assert.equal(
    registry.resolve("https://example.test/remote.json").recursiveAnchor,
    true
  );
  assert.throws(
    () => registry.resolve("https://example.test/missing.json"),
    (error) => error.code === "LOCAL_RESOURCE_NOT_FOUND"
  );
  assert.equal(registry.misses, 1);
});

test("resource registry gives roots without $id a complete transitive local closure", () => {
  const leaf = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://example.test/leaf.json",
    type: "integer"
  };
  const middle = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://example.test/real-middle.json",
    $defs: {
      value: { $ref: leaf.$id }
    }
  };
  const customDialect = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://example.test/custom-dialect.json",
    $vocabulary: {}
  };
  const root = {
    $schema: customDialect.$id,
    $ref: "https://example.test/middle.json#/$defs/value"
  };
  const registry = createResourceRegistry({
    rootSchemas: [{ id: "owner-without-id", draft: "draft2020-12", schema: root }],
    remoteEntries: [
      {
        canonicalUrl: "https://example.test/middle.json",
        aliases: ["https://example.test/middle.json", middle.$id],
        schema: middle,
        draft: "draft2020-12"
      },
      {
        canonicalUrl: leaf.$id,
        aliases: [leaf.$id],
        schema: leaf,
        draft: "draft2020-12"
      },
      {
        canonicalUrl: customDialect.$id,
        aliases: [customDialect.$id],
        schema: customDialect,
        draft: "draft2020-12"
      }
    ]
  });
  const resources = registry.resourcesFor("owner-without-id");
  assert.deepEqual(
    resources.map(({ canonicalUri }) => canonicalUri).sort(),
    [customDialect.$id, leaf.$id, "https://example.test/middle.json"]
  );
  const middleResource = resources.find(
    ({ canonicalUri }) => canonicalUri === "https://example.test/middle.json"
  );
  assert.equal(middleResource.uri, middle.$id);
  assert.deepEqual([...middleResource.aliases].sort(), [
    "https://example.test/middle.json",
    middle.$id
  ].sort());
});

async function prepareAdapter(id, config, schema) {
  const adapter = getAdapterFactory(id)(config);
  const target = typeof adapter.compile === "function"
    ? await adapter.compile(schema)
    : schema;
  return {
    adapter,
    target,
    validate: (data) => adapter.validate(target, data)
  };
}

test("sync adapters execute every active draft through the runtime contract", async () => {
  for (const draft of draftIds) {
    for (const participant of getParticipants(draft).filter(
      ({ id }) => id !== "hyperjump"
    )) {
      const { adapter, validate } = await prepareAdapter(
        participant.id,
        { draft, formatProfile: "base", resources: [] },
        { type: "integer" }
      );
      assert.equal(adapter.id, participant.id);
      assert.equal(adapter.version.length > 0, true);
      assert.equal(adapter.license.length > 0, true);
      assert.equal(validate(1), true, `${participant.id}/${draft}`);
      assert.equal(validate("1"), false, `${participant.id}/${draft}`);
      assert.equal(
        typeof adapter.compile === "function",
        participant.id !== "jsonschema"
      );
    }
  }
});

test("cfworker executes draft4 boolean exclusivity through its native draft mode", async () => {
  const create = getAdapterFactory("cfworker-json-schema");
  const exclusive = create({ draft: "draft4", formatProfile: "base", resources: [] });
  const exclusiveTarget = await exclusive.compile({
    maximum: 2,
    exclusiveMaximum: true
  });
  assert.equal(exclusive.validate(exclusiveTarget, 2), false);
  assert.equal(exclusive.validate(exclusiveTarget, 1), true);
});

test("AJV adapters execute draft4 exclusivity, id scopes, refs, and formats", async () => {
  for (const id of ["ajv", "redocly-ajv"]) {
    const exclusive = await prepareAdapter(
      id,
      { draft: "draft4", formatProfile: "base", resources: [] },
      { maximum: 2, exclusiveMaximum: true }
    );
    assert.equal(exclusive.validate(2), false, `${id}/exclusive-boundary`);
    assert.equal(exclusive.validate(1), true, `${id}/exclusive-below`);

    const local = await prepareAdapter(
      id,
      { draft: "draft4", formatProfile: "base", resources: [] },
      {
        id: "https://example.test/root/",
        definitions: {
          positive: {
            id: "positive",
            type: "integer",
            minimum: 1
          }
        },
        properties: { value: { $ref: "positive" } },
        required: ["value"]
      }
    );
    assert.equal(local.validate({ value: 1 }), true, `${id}/local-ref-valid`);
    assert.equal(local.validate({ value: 0 }), false, `${id}/local-ref-invalid`);

    const resource = {
      canonicalUri: "https://example.test/retrieval.json",
      uri: "https://example.test/actual.json",
      aliases: new Set([
        "https://example.test/retrieval.json",
        "https://example.test/actual.json"
      ]),
      schema: {
        id: "https://example.test/actual.json",
        type: "integer"
      }
    };
    const remote = await prepareAdapter(
      id,
      { draft: "draft4", formatProfile: "base", resources: [resource] },
      { $ref: resource.canonicalUri }
    );
    assert.equal(remote.validate(1), true, `${id}/remote-ref-valid`);
    assert.equal(remote.validate("1"), false, `${id}/remote-ref-invalid`);

    const format = await prepareAdapter(
      id,
      { draft: "draft4", formatProfile: "format-assertion", resources: [] },
      { type: "string", format: "email" }
    );
    assert.equal(format.validate("user@example.com"), true, `${id}/format-valid`);
    assert.equal(format.validate("not-an-email"), false, `${id}/format-invalid`);
  }
});

test("AJV draft4 constructors preserve package identity and instance separation", async () => {
  const expected = {
    ajv: {
      version: "8.20.0",
      core: { packageName: "ajv", version: "8.20.0" },
      constructor: {
        packageName: "ajv-draft-04",
        version: "1.0.0",
        entrypoint: "ajv-draft-04"
      }
    },
    "redocly-ajv": {
      version: "8.18.3",
      core: { packageName: "@redocly/ajv", version: "8.18.3" },
      constructor: {
        packageName: "@redocly/ajv",
        version: "8.18.3",
        entrypoint: "@redocly/ajv/dist/draft4.js"
      }
    }
  };

  for (const id of Object.keys(expected)) {
    const draft4 = await prepareAdapter(
      id,
      { draft: "draft4", formatProfile: "base", resources: [] },
      { maximum: 2, exclusiveMaximum: true }
    );
    const draft2020 = await prepareAdapter(
      id,
      { draft: "draft2020-12", formatProfile: "base", resources: [] },
      { exclusiveMaximum: 2 }
    );

    assert.equal(draft4.adapter.version, expected[id].version);
    assert.deepEqual(draft4.adapter.reportOptions.implementation, {
      core: expected[id].core,
      constructor: expected[id].constructor
    });
    assert.notEqual(
      draft4.adapter.reportOptions.implementation.constructor.entrypoint,
      draft2020.adapter.reportOptions.implementation.constructor.entrypoint
    );
    assert.equal(draft4.validate(2), false, `${id}/draft4`);
    assert.equal(draft2020.validate(2), false, `${id}/draft2020-12`);
  }
});

test("report inventory includes every adapter implementation package", async () => {
  const packageJson = JSON.parse(
    await readFile(path.join(benchmarkRoot, "package.json"), "utf8")
  );
  const inventory = packageInventoryNames(packageJson);
  assert.deepEqual(inventory, Object.keys(packageJson.dependencies).sort());

  for (const id of ["ajv", "redocly-ajv"]) {
    const runtime = getAdapterFactory(id)({
      draft: "draft4",
      formatProfile: "base",
      resources: []
    });
    for (const implementation of Object.values(
      runtime.reportOptions.implementation
    )) {
      assert.equal(
        inventory.includes(implementation.packageName),
        true,
        `${id}/${implementation.packageName}`
      );
    }
  }
});

test("sync adapters reject drafts outside their matrix cells", () => {
  assert.throws(
    () =>
      getRegisteredAdapter("cfworker-json-schema").create({
        draft: "draft6",
        formatProfile: "base",
        resources: []
      }),
    /unsupported draft/
  );
  assert.throws(
    () =>
      getRegisteredAdapter("djv").create({
        draft: "draft7",
        formatProfile: "base",
        resources: []
      }),
    /unsupported draft/
  );
  assert.throws(
    () =>
      getRegisteredAdapter("jsonschema").create({
        draft: "draft2019-09",
        formatProfile: "base",
        resources: []
      }),
    /unsupported draft/
  );
});

test("modern sync adapters separate base annotation from format assertion", async () => {
  for (const draft of ["draft2019-09", "draft2020-12"]) {
    for (const participant of getParticipants(draft).filter(
      ({ id }) => id !== "hyperjump"
    )) {
      const schema = { type: "string", format: "email" };
      const { validate: base } = await prepareAdapter(
        participant.id,
        { draft, formatProfile: "base", resources: [] },
        schema
      );
      const { validate: assertion } = await prepareAdapter(
        participant.id,
        { draft, formatProfile: "format-assertion", resources: [] },
        schema
      );
      assert.equal(base("not-an-email"), true, `${participant.id}/${draft}/base`);
      assert.equal(
        assertion("not-an-email"),
        false,
        `${participant.id}/${draft}/assertion`
      );
    }
  }
});

test("Hyperjump applies the draft-specific format assertion policy without mutating schemas", async () => {
  for (const draft of draftIds) {
    for (const formatProfile of ["base", "format-assertion"]) {
      const schema = { type: "string", format: "email" };
      const before = structuredClone(schema);
      const { validate } = await prepareAdapter(
        "hyperjump",
        { draft, formatProfile, resources: [] },
        schema
      );
      const shouldAssert =
        formatProfile === "format-assertion" ||
        draft === "draft4" ||
        draft === "draft6" ||
        draft === "draft7";
      assert.equal(validate("not-an-email"), !shouldAssert, `${draft}/${formatProfile}`);
      assert.deepEqual(schema, before, `${draft}/${formatProfile}`);
    }
  }
});

test("AJV adapters validate registered resources through the public addSchema contract", () => {
  const invalidResource = {
    canonicalUri: "https://example.test/invalid-resource.json",
    aliases: new Set(["https://example.test/invalid-resource.json"]),
    schema: {
      $id: "https://example.test/invalid-resource.json",
      type: 1
    }
  };
  for (const id of ["ajv", "redocly-ajv"]) {
    assert.throws(
      () => getAdapterFactory(id)({
        draft: "draft7",
        formatProfile: "base",
        resources: [invalidResource]
      }),
      Error,
      id
    );
  }
});

test("z-schema reuses one compiled public cache with remote resources deterministically", async () => {
  const resourceUri = "https://example.test/z-schema-integer.json";
  const schema = {
    type: "object",
    properties: { value: { $ref: resourceUri } },
    required: ["value"]
  };
  const prepared = await prepareAdapter(
    "z-schema",
    {
      draft: "draft7",
      formatProfile: "base",
      resources: [{
        canonicalUri: resourceUri,
        aliases: new Set([resourceUri]),
        schema: { $id: resourceUri, type: "integer" }
      }]
    },
    schema
  );
  assert.equal(prepared.adapter.reportOptions.reuse, "public-schema-cache");
  for (let pass = 0; pass < 5; pass += 1) {
    assert.equal(prepared.validate({ value: 1 }), true, `valid/${pass}`);
    assert.equal(prepared.validate({ value: "1" }), false, `invalid/${pass}`);
  }

  const unknownFormat = await prepareAdapter(
    "z-schema",
    {
      draft: "draft6",
      formatProfile: "format-assertion",
      resources: [],
      unknownFormats: ["vendor-format"]
    },
    { type: "string", format: "vendor-format" }
  );
  assert.equal(unknownFormat.validate("anything"), true);
});

test("sync adapters preserve input and resolve a local remote resource", async () => {
  const remoteSchema = {
    $id: "https://example.test/integer.json",
    type: "integer"
  };
  const resources = [
    {
      uri: "https://example.test/integer.json",
      aliases: new Set(["https://example.test/integer.json"]),
      schema: remoteSchema
    }
  ];
  const schema = { $ref: "https://example.test/integer.json" };
  for (const participant of getParticipants("draft7").filter(
    ({ id }) => id !== "hyperjump" && id !== "schema-shield"
  )) {
    const { validate } = await prepareAdapter(
      participant.id,
      { draft: "draft7", formatProfile: "base", resources },
      schema
    );
    const input = { value: 1 };
    const before = canonicalJson(input);
    validate(input);
    assert.equal(canonicalJson(input), before, participant.id);
    assert.equal(validate(1), true, participant.id);
    assert.equal(validate("1"), false, participant.id);
  }
});

test("AJV adapters preserve retrieval aliases that differ from resource $id", async () => {
  const retrievalUri = "https://example.test/retrieval-name.json";
  const resource = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://example.test/real-name.json",
    type: "integer"
  };
  for (const id of ["ajv", "redocly-ajv"]) {
    const { validate } = await prepareAdapter(
      id,
      {
        draft: "draft2020-12",
        formatProfile: "base",
        resources: [
        {
          uri: resource.$id,
          aliases: new Set([resource.$id, retrievalUri]),
          schema: resource
        }
        ]
      },
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $ref: retrievalUri
      }
    );
    assert.equal(validate(1), true);
    assert.equal(validate("1"), false);
  }
});

test("Redocly AJV returns a stable recursive-reference result for pristine inputs", async () => {
  const schema = {
    definitions: {
      item: {
        type: "array",
        additionalItems: false,
        items: [
          { $ref: "#/definitions/sub-item" },
          { $ref: "#/definitions/sub-item" }
        ]
      },
      "sub-item": {
        type: "object",
        required: ["foo"]
      }
    },
    type: "array",
    additionalItems: false,
    items: [
      { $ref: "#/definitions/item" },
      { $ref: "#/definitions/item" },
      { $ref: "#/definitions/item" }
    ]
  };
  const data = [
    [{ foo: null }, { foo: null }, { foo: null }],
    [{ foo: null }, { foo: null }],
    [{ foo: null }, { foo: null }]
  ];
  const before = canonicalJson(data);
  const { adapter, validate } = await prepareAdapter(
    "redocly-ajv",
    { draft: "draft4", formatProfile: "base", resources: [] },
    schema
  );

  assert.deepEqual(
    [validate(data), validate(data), validate(data)],
    [false, false, false]
  );
  assert.equal(adapter.reportOptions.fast.allErrors, true);
  assert.equal(canonicalJson(data), before);
});

test("z-schema isolates repeated detached remote references without mutating input", async () => {
  const remoteSchema = {
    $id: "http://localhost:1234/draft6/detached-ref.json",
    $schema: "http://json-schema.org/draft-06/schema#",
    definitions: {
      foo: { $ref: "#detached" },
      detached: {
        $id: "#detached",
        type: "object",
        properties: { value: { type: "integer" } },
        required: ["value"]
      }
    }
  };
  const valid = { value: 1 };
  const invalid = { value: "a" };
  const before = canonicalJson([valid, invalid]);
  const { validate } = await prepareAdapter(
    "z-schema",
    {
      draft: "draft6",
      formatProfile: "base",
      resources: [
        {
          canonicalUri: remoteSchema.$id,
          uri: remoteSchema.$id,
          aliases: new Set([remoteSchema.$id]),
          schema: remoteSchema
        }
      ]
    },
    { $ref: `${remoteSchema.$id}#/definitions/foo` }
  );

  assert.deepEqual(
    [validate(valid), validate(invalid), validate(valid), validate(invalid)],
    [true, false, true, false]
  );
  assert.equal(canonicalJson([valid, invalid]), before);
});

test("sync resource adapters resolve different-id, URN, and cross-draft retrieval aliases", async () => {
  const fixtures = [
    {
      label: "different-id-ref-string",
      draft: "draft2020-12",
      canonicalUri: "http://localhost:1234/draft2020-12/different-id-ref-string.json",
      schema: {
        $id: "http://localhost:1234/draft2020-12/real-id-ref-string.json",
        type: "string"
      },
      valid: "value",
      invalid: 1
    },
    {
      label: "urn-ref-string",
      draft: "draft2020-12",
      canonicalUri: "http://localhost:1234/draft2020-12/urn-ref-string.json",
      schema: {
        $id: "urn:uuid:feebdaed-ffff-0000-2020-1200deadbeef",
        type: "string"
      },
      valid: "value",
      invalid: 1
    },
    {
      label: "cross-draft",
      draft: "draft2019-09",
      canonicalUri: "http://localhost:1234/draft7/ignore-dependentRequired.json",
      schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        $id: "http://localhost:1234/draft7/integer.json",
        type: "integer"
      },
      valid: 1,
      invalid: "1"
    }
  ];
  const adapterIds = [
    "ajv",
    "schemasafe",
    "redocly-ajv",
    "cfworker-json-schema",
    "json-schema-library",
    "z-schema"
  ];
  for (const fixture of fixtures) {
    const resource = {
      canonicalUri: fixture.canonicalUri,
      uri: fixture.schema.$id,
      aliases: new Set([fixture.canonicalUri, fixture.schema.$id]),
      schema: fixture.schema
    };
    for (const id of adapterIds) {
      const { validate } = await prepareAdapter(
        id,
        { draft: fixture.draft, formatProfile: "base", resources: [resource] },
        { $ref: fixture.canonicalUri }
      );
      assert.equal(validate(fixture.valid), true, `${id}/${fixture.label}/valid`);
      assert.equal(validate(fixture.invalid), false, `${id}/${fixture.label}/invalid`);
    }
  }
});

test("Hyperjump resolves different-id, URN, and cross-draft retrieval aliases", async () => {
  const fixtures = [
    {
      label: "different-id-ref-string-2019",
      draft: "draft2019-09",
      canonicalUri: "http://localhost:1234/draft2019-09/different-id-ref-string.json",
      schema: {
        $id: "http://localhost:1234/draft2019-09/real-id-ref-string.json",
        $defs: { bar: { type: "string" } },
        $ref: "#/$defs/bar"
      },
      valid: "value",
      invalid: 1
    },
    {
      label: "urn-ref-string-2019",
      draft: "draft2019-09",
      canonicalUri: "http://localhost:1234/draft2019-09/urn-ref-string.json",
      schema: {
        $id: "urn:uuid:feebdaed-ffff-0000-2019-0900deadbeef",
        $defs: { bar: { type: "string" } },
        $ref: "#/$defs/bar"
      },
      valid: "value",
      invalid: 1
    },
    {
      label: "different-id-ref-string-2020",
      draft: "draft2020-12",
      canonicalUri: "http://localhost:1234/draft2020-12/different-id-ref-string.json",
      schema: {
        $id: "http://localhost:1234/draft2020-12/real-id-ref-string.json",
        $defs: { bar: { type: "string" } },
        $ref: "#/$defs/bar"
      },
      valid: "value",
      invalid: 1
    },
    {
      label: "urn-ref-string-2020",
      draft: "draft2020-12",
      canonicalUri: "http://localhost:1234/draft2020-12/urn-ref-string.json",
      schema: {
        $id: "urn:uuid:feebdaed-ffff-0000-2020-1200deadbeef",
        $defs: { bar: { type: "string" } },
        $ref: "#/$defs/bar"
      },
      valid: "value",
      invalid: 1
    },
    {
      label: "cross-draft",
      draft: "draft2019-09",
      canonicalUri: "http://localhost:1234/draft7/ignore-dependentRequired.json",
      schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        $id: "http://localhost:1234/draft7/integer.json",
        type: "integer"
      },
      valid: 1,
      invalid: "1"
    }
  ];
  for (const fixture of fixtures) {
    const api =
      fixture.draft === "draft2019-09" ? Hyperjump2019 : Hyperjump2020;
    api.unregisterSchema(fixture.canonicalUri);
    api.unregisterSchema(fixture.schema.$id);
    const { validate } = await prepareAdapter(
      "hyperjump",
      {
        draft: fixture.draft,
        formatProfile: "base",
        resources: [
        {
          canonicalUri: fixture.canonicalUri,
          uri: fixture.schema.$id,
          aliases: new Set([fixture.canonicalUri, fixture.schema.$id]),
          schema: fixture.schema,
          dialect: fixture.schema.$schema
        }
        ]
      },
      { $ref: fixture.canonicalUri }
    );
    assert.equal(validate(fixture.valid), true, `${fixture.label}/valid`);
    assert.equal(validate(fixture.invalid), false, `${fixture.label}/invalid`);
    const registered = api.getAllRegisteredSchemaUris();
    assert.equal(registered.includes(fixture.canonicalUri), true, fixture.label);
    assert.equal(registered.includes(fixture.schema.$id), false, fixture.label);
  }
});

test("SchemaShield attempts modern drafts without global rejection", async () => {
  for (const draft of ["draft2019-09", "draft2020-12"]) {
    const { adapter, validate } = await prepareAdapter(
      "schema-shield",
      { draft, formatProfile: "base", resources: [] },
      { type: "integer" }
    );
    assert.equal(adapter.supportClaim, "experimental-observed");
    assert.equal(validate(1), true);
  }
});

test("declared sync adapters resolve recursive references locally and through resources", async () => {
  const recursive = {
    $schema: "https://json-schema.org/draft/2019-09/schema",
    $id: "https://example.test/recursive.json",
    $recursiveAnchor: true,
    type: "object",
    properties: { next: { $recursiveRef: "#" } }
  };
  const resources = [
    {
      uri: recursive.$id,
      aliases: new Set([recursive.$id]),
      schema: recursive
    }
  ];
  const remoteRoot = {
    $schema: "https://json-schema.org/draft/2019-09/schema",
    $ref: recursive.$id
  };
  for (const participant of getParticipants("draft2019-09").filter(
    ({ id }) => id !== "hyperjump" && id !== "schema-shield"
  )) {
    for (const [label, schema, adapterResources] of [
      ["local", recursive, []],
      ["remote", remoteRoot, resources]
    ]) {
      const { validate } = await prepareAdapter(
        participant.id,
        {
          draft: "draft2019-09",
          formatProfile: "base",
          resources: adapterResources
        },
        schema
      );
      assert.equal(validate({ next: {} }), true, `${participant.id}/${label}`);
      assert.equal(validate({ next: 1 }), false, `${participant.id}/${label}`);
    }
  }
});

test("declared sync adapters resolve dynamic references locally and through resources", async () => {
  const dynamic = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://example.test/dynamic.json",
    $dynamicAnchor: "node",
    type: "object",
    properties: { next: { $dynamicRef: "#node" } }
  };
  const resources = [
    {
      uri: dynamic.$id,
      aliases: new Set([dynamic.$id]),
      schema: dynamic
    }
  ];
  const remoteRoot = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $ref: dynamic.$id
  };
  for (const participant of getParticipants("draft2020-12").filter(
    ({ id }) =>
      id !== "hyperjump" &&
      id !== "schema-shield" &&
      id !== "cfworker-json-schema"
  )) {
    for (const [label, schema, adapterResources] of [
      ["local", dynamic, []],
      ["remote", remoteRoot, resources]
    ]) {
      const { validate } = await prepareAdapter(
        participant.id,
        {
          draft: "draft2020-12",
          formatProfile: "base",
          resources: adapterResources
        },
        schema
      );
      assert.equal(validate({ next: {} }), true, `${participant.id}/${label}`);
      assert.equal(validate({ next: 1 }), false, `${participant.id}/${label}`);
    }
  }
});

test("Hyperjump resolves async to reusable callables for every active draft", async () => {
  for (const draft of draftIds) {
    const adapter = getAdapterFactory("hyperjump")({
      draft,
      formatProfile: "base",
      resources: []
    });
    const pending = adapter.compile({ type: "integer" });
    assert.equal(typeof pending.then, "function");
    const target = await pending;
    assert.equal(adapter.validate(target, 1), true, draft);
    assert.equal(adapter.validate(target, "1"), false, draft);
  }
});

test("Hyperjump compiles boolean schemas without mutation in drafts that support them", async () => {
  for (const draft of draftIds.filter((candidate) => candidate !== "draft4")) {
    for (const schema of [true, false]) {
      const { validate } = await prepareAdapter(
        "hyperjump",
        { draft, formatProfile: "base", resources: [] },
        schema
      );
      assert.equal(validate("any value"), schema, `${draft}/${schema}`);
    }
  }
});

test("cfworker draft-2020-12 dynamicRef limitation is a conformance WRONG", async () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://example.test/cfworker-dynamic.json",
    $dynamicAnchor: "node",
    type: "object",
    properties: { next: { $dynamicRef: "#node" } }
  };
  const cases = [
    {
      ...fixtureCases([true])[0],
      data: { next: {} },
      expected: true
    },
    {
      ...fixtureCases([false])[0],
      id: "draft7:fixture.json#/groups/0/tests/1",
      testIndex: 1,
      data: { next: 1 },
      expected: false
    }
  ];
  const records = await classifySchemaCases({
    adapter: getAdapterFactory("cfworker-json-schema")({
      draft: "draft2020-12",
      formatProfile: "base",
      resources: []
    }),
    schema,
    schemaMetadata: { id: cases[0].schemaId },
    cases,
    capabilities: { unsupportedFormats: [], unknownFormats: [], externalRefs: [] }
  });
  assert.deepEqual(records.map(({ status }) => status), ["PASS", "WRONG"]);
});

test("Hyperjump separates modern format profiles", async () => {
  for (const draft of ["draft2019-09", "draft2020-12"]) {
    const schema = { type: "string", format: "email" };
    const { validate: base } = await prepareAdapter(
      "hyperjump",
      { draft, formatProfile: "base", resources: [] },
      schema
    );
    assert.equal(base("not-an-email"), true, `${draft}/base`);

    const { validate: assertion } = await prepareAdapter(
      "hyperjump",
      { draft, formatProfile: "format-assertion", resources: [] },
      schema
    );
    assert.equal(assertion("not-an-email"), false, `${draft}/assertion`);
  }
});

test("Hyperjump resolves recursive and dynamic resources without network", async () => {
  const fixtures = [
    {
      draft: "draft2019-09",
      schema: {
        $schema: "https://json-schema.org/draft/2019-09/schema",
        $id: "https://example.test/hyperjump-recursive.json",
        $recursiveAnchor: true,
        type: "object",
        properties: { next: { $recursiveRef: "#" } }
      }
    },
    {
      draft: "draft2020-12",
      schema: {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "https://example.test/hyperjump-dynamic.json",
        $dynamicAnchor: "node",
        type: "object",
        properties: { next: { $dynamicRef: "#node" } }
      }
    }
  ];
  for (const fixture of fixtures) {
    const root = {
      $schema: fixture.schema.$schema,
      $ref: fixture.schema.$id
    };
    for (const [label, schema, resources] of [
      ["local", fixture.schema, []],
      [
        "remote",
        root,
        [
          {
            uri: fixture.schema.$id,
            aliases: new Set([fixture.schema.$id]),
            schema: fixture.schema,
            dialect: fixture.schema.$schema
          }
        ]
      ]
    ]) {
      const { validate } = await prepareAdapter(
        "hyperjump",
        { draft: fixture.draft, formatProfile: "base", resources },
        schema
      );
      assert.equal(validate({ next: {} }), true, `${fixture.draft}/${label}`);
      assert.equal(validate({ next: 1 }), false, `${fixture.draft}/${label}`);
    }
  }
});

test("Hyperjump resolves embedded and registered anchors", async () => {
  const anchored = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://example.test/hyperjump-anchor.json",
    $defs: {
      value: { $anchor: "value", type: "integer" }
    },
    $ref: "#value"
  };
  const { validate: local } = await prepareAdapter(
    "hyperjump",
    { draft: "draft2020-12", formatProfile: "base", resources: [] },
    anchored
  );
  assert.equal(local(1), true);
  assert.equal(local("1"), false);

  const { validate: remote } = await prepareAdapter(
    "hyperjump",
    {
      draft: "draft2020-12",
      formatProfile: "base",
      resources: [
      {
        uri: anchored.$id,
        schema: anchored,
        dialect: anchored.$schema
      }
      ]
    },
    {
      $schema: anchored.$schema,
      $ref: `${anchored.$id}#value`
    }
  );
  assert.equal(remote(1), true);
  assert.equal(remote("1"), false);
});

test("async compile timing includes resolution and execution excludes setup", async () => {
  const cases = executionFixtureCases();
  const events = [];
  let compileClock = 0;
  const compileSample = await runCompileSample({
    request: {
      phase: "setup",
      validator: "hyperjump",
      draft: "draft6",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries: executionFixtureEntries(),
    schemas: [{ id: cases[0].schemaId, draft: "draft6", schema: {} }],
    remotes: new Map(),
    createAdapter: () => ({
      version: "1.0.0",
      compileMode: "async",
      async compile() {
        events.push("compile-start");
        await Promise.resolve();
        events.push("compile-resolved");
        return () => true;
      },
      validate: (compiled, data) => compiled(data)
    }),
    now: () => {
      events.push("compile-clock");
      compileClock += 5;
      return compileClock;
    },
    timing: {
      warmupMinimumMilliseconds: 5,
      targetSampleMilliseconds: 5,
      minimumSampleMilliseconds: 5
    }
  });
  assert.equal(compileSample.seconds, 0.005);
  assert.deepEqual(events.slice(-4), [
    "compile-clock",
    "compile-start",
    "compile-resolved",
    "compile-clock"
  ]);

  events.length = 0;
  let executionClock = -1;
  await runExecutionSample({
    request: {
      phase: "execution",
      validator: "hyperjump",
      draft: "draft6",
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries: executionFixtureEntries(),
    cases,
    caseIds: cases.map(({ id }) => id),
    schemas: [{ id: cases[0].schemaId, draft: "draft6", schema: {} }],
    remotes: new Map(),
    createAdapter: () => ({
      name: "hyperjump",
      version: "1.0.0",
      compileMode: "async",
      async compile() {
        events.push("setup-start");
        await Promise.resolve();
        events.push("setup-resolved");
        return (data) => data.value;
      },
      validate: (compiled, data) => compiled(data)
    }),
    timing: {
      warmupMinimumMilliseconds: 1,
      targetSampleMilliseconds: 2,
      minimumSampleMilliseconds: 1
    },
    now: () => {
      events.push("execution-clock");
      executionClock += 1;
      return executionClock;
    }
  });
  assert.deepEqual(events.slice(0, 3), [
    "setup-start",
    "setup-resolved",
    "execution-clock"
  ]);
});
