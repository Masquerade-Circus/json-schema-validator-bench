import assert from "node:assert/strict";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  coldEvidenceDecision,
  createImplementationRunIdentity,
  createImplementationScopeIdentity,
  implementationProbeContractFiles,
  loadImplementationEvidenceSync,
  validateImplementationEvidence
} from "../src/implementation-evidence.js";
import {
  classifyIsolationControls,
  captureImplementationEvidence,
  runInstrumentedModule,
  summarizeRuntimeObservation
} from "../src/implementation-probe.js";
import {
  adapterRegistry,
  getColdExecutionRegistryParticipants,
  getRegisteredAdapter
} from "../src/adapter-registry.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const temporaryRoot = path.join(projectRoot, "tmp", "implementation-evidence-tests");
const probeProcesses = {
  api: ["adapter-import", "api-setup", "api-validation"],
  aa: ["adapter-import", "isolation-aa"],
  bb: ["adapter-import", "isolation-bb"],
  aba: ["adapter-import", "isolation-aba"],
  bab: ["adapter-import", "isolation-bab"]
};

function processesForPhase(phase, readiness) {
  return Object.fromEntries(
    Object.entries(probeProcesses)
      .filter(([, phases]) => phases.includes(phase))
      .map(([processIdentity]) => [
        processIdentity,
        {
          readiness,
          instrumentationReady: true,
          processIds: [1],
          runner: { attempted: 0, succeeded: 0, failed: 0 },
          dependency: { attempted: 0, succeeded: 0, failed: 0 }
        }
      ])
  );
}

function evidence(overrides = {}) {
  const run = {
    generatedAt: "2026-08-04T00:00:00.000Z",
    packageLockSha256: "a".repeat(64),
    probeContractSha256: "f".repeat(64),
    nodeVersion: "v24.18.0",
    platform: "linux",
    architecture: "x64",
    effectiveExecArgv: [],
    effectiveNodeOptionsSha256: null,
    processId: 1
  };
  const runIdentitySha256 = createImplementationRunIdentity(run);
  const adapterSourceSha256 = "1".repeat(64);
  const validatorRuntimeSha256 = "d".repeat(64);
  return {
    implementationEvidenceVersion: 4,
    instrumentationVersion: 4,
    instrumentationCapabilities: [
      "eval",
      "function",
      "async-function",
      "generator-function",
      "async-generator-function",
      "node:vm",
      "webassembly",
      "worker",
      "node-inline-child",
      "data-import",
      "propagation"
    ],
    packageLockSha256: "a".repeat(64),
    probeContractSha256: "f".repeat(64),
    runIdentitySha256,
    generatedAt: "2026-08-04T00:00:00.000Z",
    captureRuns: { [runIdentitySha256]: run },
    participants: {
      fixture: {
        scopes: {
          draft7: {
            evidenceIdentitySha256: createImplementationScopeIdentity({
              nodeVersion: run.nodeVersion,
              platform: run.platform,
              architecture: run.architecture,
              effectiveExecArgv: run.effectiveExecArgv,
              effectiveNodeOptionsSha256: run.effectiveNodeOptionsSha256,
              validator: "fixture",
              draft: "draft7",
              adapterSourceSha256,
              validatorRuntimeSha256,
              probeContractSha256: run.probeContractSha256
            }),
            adapterSourceSha256,
            validatorRuntimeSha256,
            capturedAt: run.generatedAt,
            captureRunIdentitySha256: runIdentitySha256,
            api: { evidence: "observed", value: "reusable-sync" },
            isolation: {
              evidence: "observed",
              value: "interference-not-observed"
            },
            isolationControls: Object.fromEntries(
              ["aa", "bb", "aba", "bab"].map((control) => [
                control,
                { status: "passed", diagnostic: null }
              ])
            ),
            runtimeObservation: {
              evidence: "observed",
              value: "limited",
              routes: [],
              mechanisms: Object.fromEntries([
              "eval",
              "function",
              "async-function",
              "generator-function",
              "async-generator-function",
              "node:vm",
              "webassembly",
              "worker",
              "node-inline-child",
              "data-import",
              "propagation"
            ].map((mechanism) => [mechanism, {
              capability: mechanism === "eval" ? "limited" : "ready",
              limitation: mechanism === "eval"
                ? "direct and indirect eval cannot be distinguished transparently"
                : null,
              phases: Object.fromEntries([
                "adapter-import",
                "api-setup",
                "api-validation",
                "isolation-aa",
                "isolation-bb",
                "isolation-aba",
                "isolation-bab"
              ].map((phase) => [phase, {
                  readiness: mechanism === "eval" ? "limited" : "ready",
                  processes: processesForPhase(
                    phase,
                    mechanism === "eval" ? "limited" : "ready"
                  ),
                  runner: { attempted: 0, succeeded: 0, failed: 0 },
                  dependency: { attempted: 0, succeeded: 0, failed: 0 }
                }]))
              }]))
            },
            diagnostics: []
          }
        }
      }
    },
    ...overrides
  };
}

test("implementation evidence rejects declared, inferred, stale, and inconclusive authority", () => {
  const valid = validateImplementationEvidence(evidence());
  assert.equal(coldEvidenceDecision(valid, "fixture", "draft7").eligible, true);
  const run = valid.captureRuns[valid.runIdentitySha256];
  assert.equal(
    createImplementationRunIdentity(Object.fromEntries(Object.entries(run).reverse())),
    valid.runIdentitySha256
  );

  for (const invalidEvidence of ["declared", "inferred"]) {
    const artifact = evidence();
    artifact.participants.fixture.scopes.draft7.api.evidence = invalidEvidence;
    assert.throws(
      () => validateImplementationEvidence(artifact),
      /observed evidence/
    );
  }
  for (const field of [
    "dynamicCode",
    "dynamicCodeRoutes",
    "dynamicCodeMechanisms"
  ]) {
    const legacy = evidence();
    legacy.participants.fixture.scopes.draft7[field] = {};
    assert.throws(
      () => validateImplementationEvidence(legacy),
      /legacy dynamic code field/
    );
  }

  const inconclusive = evidence();
  inconclusive.participants.fixture.scopes.draft7.runtimeObservation.value =
    "inconclusive";
  assert.deepEqual(
    coldEvidenceDecision(
      validateImplementationEvidence(inconclusive),
      "fixture",
      "draft7"
    ),
    { eligible: true, reason: null }
  );
  const hiddenUnavailable = evidence();
  hiddenUnavailable.participants.fixture.scopes.draft7.runtimeObservation.mechanisms
    .webassembly.phases["api-validation"].processes.api.readiness = "unavailable";
  assert.throws(
    () => validateImplementationEvidence(hiddenUnavailable),
    /must be inconclusive when readiness fails/
  );
  const inconclusiveIsolation = evidence();
  inconclusiveIsolation.participants.fixture.scopes.draft7.isolation = {
    evidence: "observed",
    value: "inconclusive"
  };
  assert.deepEqual(
    coldEvidenceDecision(
      validateImplementationEvidence(inconclusiveIsolation),
      "fixture",
      "draft7"
    ),
    { eligible: false, reason: "implementation isolation evidence is inconclusive" }
  );
  const unstableIsolation = evidence();
  unstableIsolation.participants.fixture.scopes.draft7.isolation = {
    evidence: "observed",
    value: "self-instability-observed"
  };
  unstableIsolation.participants.fixture.scopes.draft7.isolationControls.aa = {
    status: "changed",
    diagnostic: "A changed"
  };
  assert.deepEqual(
    coldEvidenceDecision(
      validateImplementationEvidence(unstableIsolation),
      "fixture",
      "draft7"
    ),
    { eligible: false, reason: "provider self-instability was observed" }
  );
  assert.deepEqual(coldEvidenceDecision(valid, "missing", "draft7"), {
    eligible: false,
    reason: "implementation evidence is absent"
  });
  assert.deepEqual(
    coldEvidenceDecision(valid, "fixture", "draft7", {
      expectedPackageLockSha256: "e".repeat(64)
    }),
    { eligible: false, reason: "implementation evidence is stale" }
  );
});

test("Cold eligibility ignores source and runtime verdicts but fails closed on API or isolation", () => {
  const artifact = validateImplementationEvidence(evidence());
  const scope = artifact.participants.fixture.scopes.draft7;

  for (const runtimeValue of ["observed", "not-observed", "limited", "inconclusive"]) {
    scope.runtimeObservation.value = runtimeValue;
    assert.deepEqual(coldEvidenceDecision(artifact, "fixture", "draft7"), {
      eligible: true,
      reason: null
    });
  }
  const missingApi = structuredClone(artifact);
  delete missingApi.participants.fixture.scopes.draft7.api;
  assert.deepEqual(coldEvidenceDecision(missingApi, "fixture", "draft7"), {
    eligible: false,
    reason: "implementation API evidence is absent or inconclusive"
  });

  const inconclusiveIsolation = structuredClone(artifact);
  inconclusiveIsolation.participants.fixture.scopes.draft7.isolation.value =
    "inconclusive";
  assert.deepEqual(
    coldEvidenceDecision(inconclusiveIsolation, "fixture", "draft7"),
    { eligible: false, reason: "implementation isolation evidence is inconclusive" }
  );
});

test("instrumentation observes every supported dynamic-code route and propagation", async () => {
  await mkdir(temporaryRoot, { recursive: true });
  const eventPath = path.join(temporaryRoot, `events-${process.pid}.jsonl`);
  await rm(eventPath, { force: true });
  const result = await runInstrumentedModule({
    modulePath: path.join(
      projectRoot,
      "test",
      "fixtures",
      "implementation-dynamic-routes.mjs"
    ),
    eventPath,
    cwd: projectRoot,
    dependencyRoots: [path.join(projectRoot, "test", "fixtures", "implementation-dynamic-dependency.mjs")]
  });
  const events = (await readFile(eventPath, "utf8"))
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  const output = JSON.parse(result.stdout);
  const instrumentationUrl = new URL(
    "../src/implementation-instrumentation.js",
    import.meta.url
  ).href;
  const parserCode = "process.stdout.write(JSON.stringify({execArgv:process.execArgv,argv:process.argv.slice(1)}))";

  assert.equal(result.exitCode, 0);
  assert.deepEqual(output, {
    directEval: 42,
    indirectEval: 42,
    functionValue: 42,
    asyncFunctionValue: 42,
    generatorFunctionValue: 42,
    asyncGeneratorFunctionValue: 42,
    vmValue: 42,
    dataImport: 42,
    workerExecArgv: [
      "--import",
      instrumentationUrl
    ],
    workerWithFlagsExecArgv: [
      "--no-warnings",
      "--import",
      instrumentationUrl
    ],
    workerWithExistingPreloadExecArgv: [
      "--no-warnings",
      "--import",
      instrumentationUrl
    ],
    asyncSpawnStartup: { errors: 1, closes: 1 },
    syncSpawnStartup: { error: true, status: null },
    synchronousSpawnThrow: true,
    asyncExecFileStartup: { errors: 1, closes: 1, callbacks: 1 },
    synchronousExecFileThrow: true,
    forkExecArgv: [
      "--import",
      new URL("../src/implementation-instrumentation.js", import.meta.url).href
    ],
    forkWithoutOptionsExecArgv: ["--import", instrumentationUrl],
    malformedForkThrew: true,
    forkStartup: { errors: 1, closes: 1 },
    flagsBeforeInline: {
      execArgv: ["--no-warnings", "--import", instrumentationUrl, "-e", parserCode],
      argv: []
    },
    evalEquals: {
      execArgv: ["--import", instrumentationUrl, `--eval=${parserCode}`],
      argv: []
    },
    preloadBeforeInline: {
      execArgv: ["--import", instrumentationUrl, "--eval", parserCode],
      argv: []
    },
    preloadAfterInline: {
      execArgv: [
        "--import",
        instrumentationUrl,
        "-e",
        parserCode,
        "--import",
        instrumentationUrl
      ],
      argv: []
    },
    entrypoint: { status: 0, stdout: "entrypoint" },
    separatorStatus: 1,
    malformedInlineStatus: 9,
    asyncExecStartup: { errors: 1, closes: 1, callbacks: 1 },
    synchronousExecThrow: true,
    execValue: "42",
    execSyncValue: "42",
    nonNodeCommandValue: "safe",
    ambiguousCommandValue: "safe; node -e ambiguous",
    wrappedNodeCommandValue: "wrapped",
    dependency: { eval: 42, function: 42 }
  });
  for (const execArgv of [
    output.workerExecArgv,
    output.workerWithFlagsExecArgv,
    output.workerWithExistingPreloadExecArgv
  ]) {
    assert.equal(
      execArgv.filter((value, index) =>
        value === `--import=${instrumentationUrl}` ||
        (value === "--import" && execArgv[index + 1] === instrumentationUrl)
      ).length,
      1
    );
  }
  assert.equal(
    events.every(({ event, phase, processIdentity }) =>
      event !== "capability" ||
      (typeof phase === "string" && typeof processIdentity === "string")
    ),
    true
  );
  assert.equal(
    events.some(({ event, mechanism, status }) =>
      event === "capability" && mechanism === "eval" && status === "limited"
    ),
    true
  );
  for (const mechanism of [
    "eval",
    "function",
    "async-function",
    "generator-function",
    "async-generator-function",
    "node:vm",
    "webassembly",
    "worker",
    "node-inline-child"
  ]) {
    assert.equal(
      events.some(({ event, mechanism: observed, outcome }) =>
        event === "mechanism" && observed === mechanism && outcome === "succeeded"
      ),
      true,
      `${mechanism} succeeded`
    );
    assert.equal(
      events.some(({ event, mechanism: observed, outcome }) =>
        event === "mechanism" && observed === mechanism && outcome === "failed"
      ),
      true,
      `${mechanism} failed`
    );
    assert.equal(
      events.some(({ event, mechanism: observed, outcome }) =>
        event === "mechanism" && observed === mechanism && outcome === "attempted"
      ),
      true,
      `${mechanism} attempted`
    );
    assert.equal(
      events.some(({ event, mechanism: observed, status }) =>
        event === "capability" &&
        observed === mechanism &&
        (["eval", "data-import"].includes(mechanism)
          ? status === "limited"
          : status === "ready")
      ),
      true,
      `${mechanism} capability`
    );
  }
  assert.equal(
    events.some(({ event, mechanism, outcome }) =>
      event === "mechanism" &&
      mechanism === "propagation" &&
      outcome === "succeeded"
    ),
    true
  );
  assert.equal(
    events.some(({ event, attribution, outcome }) =>
      event === "mechanism" &&
      attribution === "dependency" &&
      outcome === "succeeded"
    ),
    true
  );
  assert.equal(
    events.some(({ event, attribution, outcome }) =>
      event === "mechanism" &&
      attribution === "runner" &&
      outcome === "succeeded"
    ),
    true
  );
  for (const route of [
    "spawn",
    "spawnSync",
    "execFile",
    "execFileSync",
    "exec",
    "execSync"
  ]) {
    assert.equal(
      events.some((event) =>
        event.event === "mechanism" &&
        event.mechanism === "node-inline-child" &&
        event.route === route &&
        event.outcome === "succeeded" &&
        event.attribution === "runner"
      ),
      true,
      `${route} propagated and succeeded`
    );
  }
  const routeOutcomes = (mechanism, route) => Object.fromEntries(
    ["attempted", "succeeded", "failed"].map((outcome) => [
      outcome,
      events.filter((event) =>
        event.event === "mechanism" &&
        event.mechanism === mechanism &&
        event.route === route &&
        event.outcome === outcome
      ).length
    ])
  );
  assert.deepEqual(routeOutcomes("node-inline-child", "spawn"), {
    attempted: 3,
    succeeded: 1,
    failed: 2
  });
  assert.deepEqual(routeOutcomes("node-inline-child", "spawnSync"), {
    attempted: 7,
    succeeded: 5,
    failed: 2
  });
  assert.deepEqual(routeOutcomes("node-inline-child", "execFile"), {
    attempted: 2,
    succeeded: 1,
    failed: 1
  });
  assert.deepEqual(routeOutcomes("node-inline-child", "execFileSync"), {
    attempted: 2,
    succeeded: 1,
    failed: 1
  });
  assert.deepEqual(routeOutcomes("node-inline-child", "exec"), {
    attempted: 2,
    succeeded: 1,
    failed: 1
  });
  assert.deepEqual(routeOutcomes("node-inline-child", "execSync"), {
    attempted: 3,
    succeeded: 2,
    failed: 1
  });
  assert.deepEqual(routeOutcomes("propagation", "fork"), {
    attempted: 4,
    succeeded: 2,
    failed: 2
  });
  for (const route of [
    "spawn",
    "spawnSync",
    "execFile",
    "execFileSync",
    "exec",
    "execSync",
    "fork"
  ]) {
    assert.equal(
      events.some((event) =>
        event.event === "capability" &&
        event.mechanism === "propagation" &&
        event.status === "limited" &&
        event.route === route
      ),
      true,
      `${route} startup failure degrades propagation capability`
    );
  }
  assert.equal(
    events.filter((event) =>
      event.event === "mechanism" &&
      event.mechanism === "node-inline-child" &&
      event.route === "exec" &&
      event.outcome === "attempted"
    ).length,
    2,
    "only the unambiguous Node inline exec routes are attributed"
  );
  assert.equal(
    events.filter((event) =>
      event.event === "mechanism" &&
      event.mechanism === "node-inline-child" &&
      event.route === "execSync" &&
      event.outcome === "attempted"
    ).length,
    3,
    "non-Node and ambiguous shell commands are not attributed"
  );
  for (const mechanism of ["node-inline-child", "propagation"]) {
    assert.equal(
      events.filter((event) =>
        event.event === "capability" &&
        event.mechanism === mechanism &&
        event.status === "limited" &&
        event.route === "execSync" &&
        event.limitation.includes("ambiguous")
      ).length,
      0,
      `${mechanism} does not misclassify quoted non-Node shell text`
    );
  }
  assert.equal(
    events.some((event) =>
      event.event === "capability" &&
      event.mechanism === "worker" &&
      event.status === "limited" &&
      event.route === "worker"
    ),
    true,
    "Worker construction failure downgrades its propagation capability"
  );
  const propagationSummary = summarizeRuntimeObservation(events);
  assert.equal(propagationSummary.value, "inconclusive");
  assert.equal(propagationSummary.mechanisms.propagation.capability, "inconclusive");
  assert.equal(
    events.every((event) =>
      !Object.hasOwn(event, "command") &&
      !Object.hasOwn(event, "code") &&
      !Object.hasOwn(event, "source")
    ),
    true
  );
  assert.equal(
    events.some((event) =>
      event.event === "mechanism" &&
      event.mechanism === "propagation" &&
      event.route === "fork" &&
      event.outcome === "succeeded" &&
      event.attribution === "runner"
    ),
    true,
    "fork with execArgv [] received the mandatory preload"
  );
  assert.equal(
    events.some((event) =>
      event.event === "mechanism" &&
      event.mechanism === "propagation" &&
      event.outcome === "succeeded" &&
      event.threadId !== 0
    ),
    true,
    "Worker with execArgv [] received the mandatory preload"
  );
});

test("async child failure keeps its origin phase after the global phase changes", async () => {
  await mkdir(temporaryRoot, { recursive: true });
  const eventPath = path.join(temporaryRoot, `phase-origin-${process.pid}.jsonl`);
  await rm(eventPath, { force: true });
  const result = await runInstrumentedModule({
    modulePath: path.join(
      projectRoot,
      "test",
      "fixtures",
      "implementation-async-phase-origin.mjs"
    ),
    eventPath,
    cwd: projectRoot
  });
  const events = (await readFile(eventPath, "utf8"))
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  const failed = events.find((event) =>
    event.event === "mechanism" &&
    event.mechanism === "node-inline-child" &&
    event.route === "spawn" &&
    event.outcome === "failed"
  );
  const limitation = events.find((event) =>
    event.event === "capability" &&
    event.mechanism === "node-inline-child" &&
    event.route === "spawn" &&
    event.status === "limited"
  );

  assert.equal(result.stdout, "phase-shifted\n");
  assert.equal(failed.phase, "adapter-import");
  assert.equal(limitation.phase, "adapter-import");
  assert.equal(failed.processIdentity, limitation.processIdentity);
  assert.equal(failed.pid, limitation.pid);
});

test("one unavailable required phase makes the scope inconclusive", () => {
  const events = [];
  let pid = 100;
  for (const [processIdentity, phases] of Object.entries(probeProcesses)) {
    pid += 1;
    for (const phase of phases) {
      events.push({ event: "phase", phase, processIdentity, pid, threadId: 0, rootProcess: true });
      for (const mechanism of evidence().instrumentationCapabilities) {
        events.push({
          event: "capability",
          mechanism,
          phase,
          processIdentity,
          pid,
          threadId: 0,
          rootProcess: true,
          status: ["eval", "data-import"].includes(mechanism)
            ? "limited"
            : processIdentity === "bb" &&
                phase === "isolation-bb" &&
                mechanism === "webassembly"
              ? "unavailable"
              : "ready",
          limitation: null
        });
      }
      events.push({
        event: "instrumentation-ready",
        mechanism: "preload",
        phase,
        processIdentity,
        pid,
        threadId: 0,
        rootProcess: true
      });
    }
  }

  const summary = summarizeRuntimeObservation(events);
  assert.equal(summary.value, "inconclusive");
  assert.equal(
    summary.mechanisms.webassembly.phases["isolation-bb"]
      .processes.bb.readiness,
    "unavailable"
  );
  assert.equal(summary.mechanisms.function.phases["isolation-bab"].readiness, "ready");
  assert.equal(
    summary.diagnostics.some((diagnostic) =>
      diagnostic.includes("webassembly") &&
      diagnostic.includes("bb") &&
      diagnostic.includes("unavailable")
    ),
    true
  );
  assert.equal(summary.diagnostics.length, 1);

  const artifact = evidence();
  const scope = artifact.participants.fixture.scopes.draft7;
  scope.runtimeObservation = {
    evidence: "observed",
    value: summary.value,
    routes: summary.routes,
    mechanisms: summary.mechanisms
  };
  scope.diagnostics = summary.diagnostics;
  const validated = validateImplementationEvidence(artifact);
  assert.deepEqual(coldEvidenceDecision(validated, "fixture", "draft7"), {
    eligible: true,
    reason: null
  });

  events.push({
    event: "capability",
    mechanism: "webassembly",
    phase: "isolation-bb",
    processIdentity: "bb",
    pid: 103,
    threadId: 0,
    rootProcess: true,
    status: "ready",
    limitation: null
  });
  const contradictory = summarizeRuntimeObservation(events);
  assert.equal(contradictory.value, "inconclusive");
  assert.equal(
    contradictory.mechanisms.webassembly.phases["isolation-bb"]
      .processes.bb.readiness,
    "inconclusive"
  );
  assert.equal(
    contradictory.diagnostics.some((diagnostic) =>
      diagnostic.includes("webassembly") &&
      diagnostic.includes("bb") &&
      diagnostic.includes("inconclusive")
    ),
    true
  );
});

test("missing optional instrumentation capability is explicit instead of not-observed", async () => {
  await mkdir(temporaryRoot, { recursive: true });
  const eventPath = path.join(temporaryRoot, `unavailable-${process.pid}.jsonl`);
  await rm(eventPath, { force: true });
  const result = await runInstrumentedModule({
    modulePath: path.join(
      projectRoot,
      "test",
      "fixtures",
      "implementation-no-dynamic-code.mjs"
    ),
    eventPath,
    cwd: projectRoot,
    execArgv: ["--jitless"]
  });
  const events = (await readFile(eventPath, "utf8"))
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

  assert.equal(result.stdout, "ready\n");
  assert.equal(
    events.some(({ event, mechanism, status }) =>
      event === "capability" &&
      mechanism === "webassembly" &&
      status === "unavailable"
    ),
    true
  );
});

test("failed real mechanisms never become successful dynamic-code routes", async () => {
  await mkdir(temporaryRoot, { recursive: true });
  const fixture = path.join(
    projectRoot,
    "test",
    "fixtures",
    "implementation-dynamic-failures.mjs"
  );
  const eventPath = path.join(temporaryRoot, `failed-events-${process.pid}.jsonl`);
  await rm(eventPath, { force: true });
  const result = await runInstrumentedModule({
    modulePath: fixture,
    eventPath,
    cwd: projectRoot,
    dependencyRoots: [fixture]
  });
  const events = (await readFile(eventPath, "utf8"))
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  const summary = summarizeRuntimeObservation(events);

  assert.equal(result.stdout, "failed-as-expected\n");
  assert.deepEqual(summary.routes, []);
  for (const mechanism of [
    "eval",
    "function",
    "async-function",
    "generator-function",
    "async-generator-function",
    "node:vm",
    "webassembly",
    "worker",
    "node-inline-child"
  ]) {
    const dependency = summary.mechanisms[mechanism]
      .phases["adapter-import"].dependency;
    assert.equal(dependency.failed > 0, true, `${mechanism} failed`);
    assert.equal(dependency.succeeded, 0, `${mechanism} did not succeed`);
  }
  const dataImport = summary.mechanisms["data-import"];
  assert.equal(
    events.some((event) =>
      event.event === "capability" &&
      event.mechanism === "data-import" &&
      event.status === "limited"
    ),
    true
  );
  assert.equal(
    dataImport.phases["adapter-import"].dependency.attempted > 0,
    true
  );
  assert.equal(
    dataImport.phases["adapter-import"].dependency.succeeded,
    0
  );
});

test("scope cache identity changes with platform, architecture, and effective flags", () => {
  const base = {
    nodeVersion: "v24.18.0",
    platform: "linux",
    architecture: "x64",
    effectiveExecArgv: [],
    effectiveNodeOptionsSha256: null,
    validator: "fixture",
    draft: "draft7",
    adapterSourceSha256: "1".repeat(64),
    validatorRuntimeSha256: "2".repeat(64),
    probeContractSha256: "3".repeat(64)
  };
  const identity = createImplementationScopeIdentity(base);
  for (const changed of [
    { platform: "darwin" },
    { architecture: "arm64" },
    { effectiveExecArgv: ["--jitless"] },
    { effectiveNodeOptionsSha256: "4".repeat(64) }
  ]) {
    assert.notEqual(
      createImplementationScopeIdentity({ ...base, ...changed }),
      identity
    );
  }
});

test("node inline semantics changes invalidate the probe contract and cached scope", async () => {
  const root = path.join(temporaryRoot, `probe-contract-${process.pid}`);
  const sourceRoot = path.join(root, "src");
  const helperName = "node-inline-semantics.js";
  await rm(root, { recursive: true, force: true });
  try {
    await mkdir(sourceRoot, { recursive: true });
    await writeFile(path.join(root, "package-lock.json"), "{}\n", "utf8");
    for (const name of new Set([...implementationProbeContractFiles, helperName])) {
      await writeFile(
        path.join(sourceRoot, name),
        await readFile(path.join(projectRoot, "src", name))
      );
    }

    assert.equal(implementationProbeContractFiles.includes(helperName), true);
    const before = loadImplementationEvidenceSync({ projectRoot: root })
      .context.probeContractSha256;
    await writeFile(
      path.join(sourceRoot, helperName),
      `${await readFile(path.join(sourceRoot, helperName), "utf8")}\n// changed\n`,
      "utf8"
    );
    const after = loadImplementationEvidenceSync({ projectRoot: root })
      .context.probeContractSha256;
    assert.notEqual(after, before);

    const identityInput = {
      nodeVersion: "v24.18.0",
      platform: "linux",
      architecture: "x64",
      effectiveExecArgv: [],
      effectiveNodeOptionsSha256: null,
      validator: "fixture",
      draft: "draft7",
      adapterSourceSha256: "1".repeat(64),
      validatorRuntimeSha256: "2".repeat(64)
    };
    assert.notEqual(
      createImplementationScopeIdentity({
        ...identityInput,
        probeContractSha256: before
      }),
      createImplementationScopeIdentity({
        ...identityInput,
        probeContractSha256: after
      })
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("real isolation controls cover both orders, self-instability, independence, and throws", async () => {
  const { runIsolationControl } = await import("../src/implementation-isolation.js");
  const dialect = "http://json-schema.org/draft-07/schema#";
  const rootSchema = { $schema: dialect, $ref: "https://benchmark.invalid/resource" };
  const resource = (type) => ({
    canonicalUri: "https://benchmark.invalid/resource",
    uri: "https://benchmark.invalid/resource",
    aliases: ["https://benchmark.invalid/resource"],
    schema: { $schema: dialect, $id: "https://benchmark.invalid/resource", type }
  });
  const config = {
    draft: "draft7",
    formatProfile: "base",
    resources: [],
    unknownFormats: []
  };
  const scenarios = {
    independent: () => ({
      create({ resources }) {
        const type = resources[0].schema.type;
        return {
          validate(_target, data) {
            return type === "integer"
              ? Number.isInteger(data)
              : typeof data === "string";
          }
        };
      }
    }),
    aba: () => {
      let aContaminated = false;
      let aCreated = false;
      return {
        create({ resources }) {
          const type = resources[0].schema.type;
          if (type === "integer") {
            aCreated = true;
          } else if (aCreated) {
            aContaminated = true;
          }
          return {
            validate(_target, data) {
              const effective = type === "integer" && aContaminated ? "string" : type;
              return effective === "integer"
                ? Number.isInteger(data)
                : typeof data === "string";
            }
          };
        }
      };
    },
    bab: () => {
      let bContaminated = false;
      let bCreated = false;
      return {
        create({ resources }) {
          const type = resources[0].schema.type;
          if (type === "string") {
            bCreated = true;
          } else if (bCreated) {
            bContaminated = true;
          }
          return {
            validate(_target, data) {
              const effective = type === "string" && bContaminated ? "integer" : type;
              return effective === "integer"
                ? Number.isInteger(data)
                : typeof data === "string";
            }
          };
        }
      };
    },
    unstable: () => ({
      create({ resources }) {
        const type = resources[0].schema.type;
        let calls = 0;
        return {
          validate(_target, data) {
            const stable = type === "integer"
              ? Number.isInteger(data)
              : typeof data === "string";
            const cycle = Math.floor(calls++ / 2);
            return cycle === 0 ? stable : !stable;
          }
        };
      }
    }),
    throws: () => ({
      create() {
        throw new Error("controlled isolation failure");
      }
    })
  };
  const run = (scenario, control) => runIsolationControl({
    adapter: scenarios[scenario](),
    baseConfig: config,
    rootSchema,
    resource,
    control
  });

  for (const control of ["aa", "bb", "aba", "bab"]) {
    assert.equal((await run("independent", control)).status, "passed", control);
  }
  assert.equal((await run("aba", "aba")).status, "changed");
  assert.equal((await run("aba", "bab")).status, "passed");
  assert.equal((await run("bab", "aba")).status, "passed");
  assert.equal((await run("bab", "bab")).status, "changed");
  assert.equal((await run("unstable", "aa")).status, "changed");
  assert.equal((await run("throws", "aba")).status, "threw");
});

test("isolation controls separate self-instability, cross-interference, and throws", () => {
  const passed = { status: "passed", diagnostic: null };
  assert.deepEqual(
    classifyIsolationControls({ aa: passed, bb: passed, aba: passed, bab: passed }),
    { value: "interference-not-observed", diagnostics: [] }
  );
  assert.deepEqual(
    classifyIsolationControls({
      aa: passed,
      bb: passed,
      aba: { status: "changed", diagnostic: "A changed" },
      bab: passed
    }),
    { value: "interference-observed", diagnostics: ["A changed"] }
  );
  assert.deepEqual(
    classifyIsolationControls({
      aa: { status: "changed", diagnostic: "A is unstable" },
      bb: passed,
      aba: passed,
      bab: passed
    }),
    { value: "self-instability-observed", diagnostics: ["A is unstable"] }
  );
  assert.deepEqual(
    classifyIsolationControls({
      aa: passed,
      bb: passed,
      aba: passed,
      bab: { status: "threw", diagnostic: "B threw" }
    }),
    { value: "inconclusive", diagnostics: ["B threw"] }
  );
});

test("capture publishes per-mechanism readiness and attributes successful dependency execution", async () => {
  const root = path.join(temporaryRoot, `dynamic-summary-${process.pid}`);
  const options = {
    resultsRoot: path.join(root, "results"),
    temporaryRoot: path.join(root, "events"),
    definitions: [getRegisteredAdapter("djv")]
  };
  await rm(root, { recursive: true, force: true });
  const { artifact } = await captureImplementationEvidence(options);
  const scope = artifact.participants.djv.scopes.draft6;

  assert.equal(scope.runtimeObservation.value, "observed");
  for (const mechanism of artifact.instrumentationCapabilities) {
    const summary = scope.runtimeObservation.mechanisms[mechanism];
    assert.equal(["ready", "limited"].includes(summary.capability), true);
    assert.equal(Object.keys(summary.phases).length > 0, true);
    for (const phase of Object.values(summary.phases)) {
      assert.notEqual(phase.readiness, "not-entered");
      for (const attribution of ["runner", "dependency"]) {
        for (const outcome of ["attempted", "succeeded", "failed"]) {
          assert.equal(Number.isSafeInteger(phase[attribution][outcome]), true);
        }
      }
    }
  }
  assert.equal(
    Object.values(scope.runtimeObservation.mechanisms).some(
      ({ phases }) => Object.values(phases).some(
        ({ dependency }) => dependency.succeeded > 0
      )
    ),
    true
  );
  await rm(root, { recursive: true, force: true });
});

test("contribution guide does not instruct maintainers to declare implementation metadata", async () => {
  const guide = await readFile(path.join(projectRoot, "contribute.md"), "utf8");
  assert.equal(/^- `implementation`:/m.test(guide), false);
  assert.equal(/implementation behavior through the declaration/i.test(guide), false);
});

test("published evidence covers every declared scope and controls Cold fail-closed", () => {
  const { artifact, diagnostic } = loadImplementationEvidenceSync();
  assert.equal(diagnostic, null);
  for (const definition of adapterRegistry) {
    assert.equal(Object.hasOwn(definition, "implementation"), false);
    for (const draft of definition.drafts) {
      const scope = artifact.participants[definition.id]?.scopes?.[draft];
      assert.equal(typeof scope, "object", `${definition.id}/${draft}`);
      assert.equal(scope.api.evidence, "observed");
      assert.equal(scope.isolation.evidence, "observed");
      assert.deepEqual(Object.keys(scope.isolationControls).sort(), [
        "aa",
        "aba",
        "bab",
        "bb"
      ]);
      assert.equal(scope.runtimeObservation.evidence, "observed");
      assert.equal(Object.hasOwn(scope, "dynamicCode"), false);
    }
  }
  for (const draft of [
    "draft4",
    "draft6",
    "draft7",
    "draft2019-09",
    "draft2020-12"
  ]) {
    const coldIds = getColdExecutionRegistryParticipants(draft).map(({ id }) => id);
    assert.equal(coldIds.includes("hyperjump"), false);
    assert.equal(coldIds.length > 0, true);
  }
});

test("implementation evidence reuses only a compatible scoped capture", async () => {
  const root = path.join(temporaryRoot, `cache-${process.pid}`);
  const options = {
    resultsRoot: path.join(root, "results"),
    temporaryRoot: path.join(root, "events"),
    definitions: [getRegisteredAdapter("djv")]
  };
  await rm(root, { recursive: true, force: true });
  const first = await captureImplementationEvidence(options);
  const second = await captureImplementationEvidence(options);
  assert.deepEqual(
    { captured: first.captured, reused: first.reused },
    { captured: 1, reused: 0 }
  );
  assert.deepEqual(
    { captured: second.captured, reused: second.reused },
    { captured: 0, reused: 1 }
  );
  await rm(root, { recursive: true, force: true });
});
