import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

import { adapterRegistry } from "./adapter-registry.js";
import {
  createValidatorRuntimeIdentity,
  effectiveWorkerExecArgv
} from "./benchmark.js";
import { runChildProcess } from "./child-process.js";
import {
  implementationEvidenceVersion,
  implementationDynamicCodePhases,
  implementationInstrumentationCapabilities,
  implementationInstrumentationVersion,
  implementationProbeProcesses,
  implementationProbeContractFiles,
  createImplementationRunIdentity,
  createImplementationScopeIdentity,
  validateImplementationEvidence
} from "./implementation-evidence.js";
import { getResultsRoot } from "./paths.js";

const sourceRoot = path.dirname(fileURLToPath(import.meta.url));
const instrumentationUrl = pathToFileURL(
  path.join(sourceRoot, "implementation-instrumentation.js")
).href;

const projectRoot = path.resolve(sourceRoot, "..");
const probeChildPath = path.join(sourceRoot, "implementation-probe-child.js");

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function runInstrumentedModule({
  modulePath,
  eventPath,
  cwd,
  args = [],
  dependencyRoots = [],
  execArgv = [],
  processIdentity = "standalone"
}) {
  if (typeof modulePath !== "string" || modulePath.length === 0) {
    throw new Error("instrumented module path must be a non-empty string");
  }
  if (typeof eventPath !== "string" || eventPath.length === 0) {
    throw new Error("instrumentation event path must be a non-empty string");
  }
  return runChildProcess(
    process.execPath,
    [...execArgv, "--import", instrumentationUrl, modulePath, ...args],
    {
      cwd,
      env: {
        ...process.env,
        IMPLEMENTATION_EVIDENCE_EVENTS: eventPath,
        IMPLEMENTATION_EVIDENCE_DEPENDENCY_ROOTS: JSON.stringify(dependencyRoots),
        IMPLEMENTATION_EVIDENCE_PROCESS_IDENTITY: processIdentity
      },
      streamOutput: false
    }
  );
}

async function readPreviousArtifact(artifactPath) {
  try {
    return validateImplementationEvidence(
      JSON.parse(await readFile(artifactPath, "utf8"))
    );
  } catch {
    return null;
  }
}

function parseEvents(serialized) {
  if (serialized.trim().length === 0) {
    return [];
  }
  return serialized.trim().split("\n").map((line) => JSON.parse(line));
}

export function summarizeDynamicCode(events) {
  const requiredProcesses = (phase) => Object.entries(implementationProbeProcesses)
    .filter(([, phases]) => phases.includes(phase))
    .map(([processIdentity]) => processIdentity);
  const emptyOutcomes = () => ({ attempted: 0, succeeded: 0, failed: 0 });
  const mechanisms = Object.fromEntries(
    implementationInstrumentationCapabilities.map((mechanism) => [
      mechanism,
      {
        capability: "inconclusive",
        limitation: null,
        phases: Object.fromEntries(
          implementationDynamicCodePhases.map((phase) => [
            phase,
            {
              readiness: "not-entered",
              processes: Object.fromEntries(
                requiredProcesses(phase).map((processIdentity) => [
                  processIdentity,
                  {
                    readiness: "not-entered",
                    instrumentationReady: false,
                    processIds: [],
                    runner: emptyOutcomes(),
                    dependency: emptyOutcomes()
                  }
                ])
              ),
              runner: emptyOutcomes(),
              dependency: emptyOutcomes()
            }
          ])
        )
      }
    ])
  );
  const phaseEntries = new Map();
  const readyEntries = new Map();
  const capabilityEntries = new Map();
  const entryKey = ({ mechanism, phase, processIdentity }) =>
    `${mechanism}\0${phase}\0${processIdentity}`;
  const processPhaseKey = ({ phase, processIdentity }) =>
    `${phase}\0${processIdentity}`;
  const addProcessId = (entries, key, processId) => {
    const processIds = entries.get(key) ?? new Set();
    processIds.add(processId);
    entries.set(key, processIds);
  };

  for (const event of events) {
    if (
      event.rootProcess === true &&
      event.threadId === 0 &&
      implementationDynamicCodePhases.includes(event.phase) &&
      Object.hasOwn(implementationProbeProcesses, event.processIdentity) &&
      implementationProbeProcesses[event.processIdentity].includes(event.phase)
    ) {
      if (event.event === "phase") {
        addProcessId(phaseEntries, processPhaseKey(event), event.pid);
      }
      if (event.event === "instrumentation-ready") {
        addProcessId(readyEntries, processPhaseKey(event), event.pid);
      }
    }
    const summary = mechanisms[event.mechanism];
    if (summary === undefined) {
      continue;
    }
    if (
      event.event === "capability" &&
      event.rootProcess === true &&
      event.threadId === 0 &&
      implementationDynamicCodePhases.includes(event.phase) &&
      Object.hasOwn(implementationProbeProcesses, event.processIdentity) &&
      implementationProbeProcesses[event.processIdentity].includes(event.phase) &&
      ["ready", "limited", "unavailable"].includes(event.status)
    ) {
      const key = entryKey(event);
      const entry = capabilityEntries.get(key) ?? {
        statuses: new Set(),
        limitations: new Set(),
        processIds: new Set()
      };
      entry.statuses.add(event.status);
      if (typeof event.limitation === "string") {
        entry.limitations.add(event.limitation);
      }
      entry.processIds.add(event.pid);
      capabilityEntries.set(key, entry);
      continue;
    }
    if (
      event.event === "mechanism" &&
      implementationDynamicCodePhases.includes(event.phase) &&
      ["runner", "dependency"].includes(event.attribution) &&
      ["attempted", "succeeded", "failed"].includes(event.outcome)
    ) {
      const phaseSummary = summary.phases[event.phase];
      phaseSummary[event.attribution][event.outcome] += 1;
      const processSummary = phaseSummary.processes[event.processIdentity];
      if (processSummary !== undefined) {
        processSummary[event.attribution][event.outcome] += 1;
      }
    }
  }

  const diagnostics = [];
  for (const [mechanism, summary] of Object.entries(mechanisms)) {
    const mechanismReadiness = [];
    const limitations = new Set();
    for (const phase of implementationDynamicCodePhases) {
      const phaseSummary = summary.phases[phase];
      const processReadiness = [];
      for (const processIdentity of requiredProcesses(phase)) {
        const processSummary = phaseSummary.processes[processIdentity];
        const key = `${mechanism}\0${phase}\0${processIdentity}`;
        const processKey = `${phase}\0${processIdentity}`;
        const capability = capabilityEntries.get(key);
        const phaseProcessIds = phaseEntries.get(processKey) ?? new Set();
        const readyProcessIds = readyEntries.get(processKey) ?? new Set();
        processSummary.instrumentationReady = readyProcessIds.size === 1;
        processSummary.processIds = capability === undefined
          ? []
          : [...capability.processIds].sort((left, right) => left - right);
        if (
          phaseProcessIds.size === 0 ||
          !processSummary.instrumentationReady ||
          capability === undefined
        ) {
          processSummary.readiness = "not-entered";
        } else if (
          capability.statuses.size !== 1 ||
          capability.processIds.size !== 1 ||
          phaseProcessIds.size !== 1 ||
          readyProcessIds.size !== 1 ||
          !phaseProcessIds.has(processSummary.processIds[0]) ||
          !readyProcessIds.has(processSummary.processIds[0])
        ) {
          processSummary.readiness = "inconclusive";
        } else {
          processSummary.readiness = [...capability.statuses][0];
        }
        for (const limitation of capability?.limitations ?? []) {
          limitations.add(limitation);
        }
        processReadiness.push(processSummary.readiness);
        if (["unavailable", "not-entered", "inconclusive"].includes(processSummary.readiness)) {
          diagnostics.push(
            `${mechanism} readiness ${processSummary.readiness} for process ${processIdentity} phase ${phase} pids ${processSummary.processIds.join(",") || "none"}`
          );
        }
      }
      phaseSummary.readiness = processReadiness.includes("inconclusive")
        ? "inconclusive"
        : processReadiness.includes("not-entered")
          ? "not-entered"
          : processReadiness.includes("unavailable")
            ? "unavailable"
            : processReadiness.includes("limited")
              ? "limited"
              : "ready";
      mechanismReadiness.push(phaseSummary.readiness);
    }
    summary.capability = mechanismReadiness.some((readiness) =>
      ["unavailable", "not-entered", "inconclusive"].includes(readiness)
    )
      ? "inconclusive"
      : mechanismReadiness.includes("limited")
        ? "limited"
        : "ready";
    summary.limitation = limitations.size === 0
      ? null
      : [...limitations].sort().join("; ");
  }
  const capabilities = Object.values(mechanisms).map(({ capability }) => capability);
  const dependencySucceeded = Object.values(mechanisms).some(
    ({ phases }) => Object.values(phases).some(
      ({ dependency }) => dependency.succeeded > 0
    )
  );
  let value = "not-observed";
  if (capabilities.includes("inconclusive")) {
    value = "inconclusive";
  } else if (dependencySucceeded) {
    value = "observed";
  } else if (capabilities.includes("limited")) {
    value = "limited";
  }
  return {
    mechanisms,
    value,
    diagnostics,
    routes: Object.entries(mechanisms)
      .filter(([, { phases }]) => Object.values(phases).some(
        ({ dependency }) => dependency.succeeded > 0
      ))
      .map(([mechanism]) => mechanism)
      .sort()
  };
}

export function classifyIsolationControls(controls) {
  const diagnostics = Object.values(controls)
    .filter(({ status }) => status !== "passed")
    .map(({ diagnostic }) => diagnostic);
  if (controls.aa.status === "changed" || controls.bb.status === "changed") {
    return { value: "self-instability-observed", diagnostics };
  }
  if (Object.values(controls).some(({ status }) => !["passed", "changed"].includes(status))) {
    return { value: "inconclusive", diagnostics };
  }
  if (controls.aba.status === "changed" || controls.bab.status === "changed") {
    return { value: "interference-observed", diagnostics };
  }
  return { value: "interference-not-observed", diagnostics: [] };
}

export async function captureImplementationEvidence({
  resultsRoot = getResultsRoot(),
  temporaryRoot = path.join(projectRoot, "tmp", "implementation-evidence"),
  definitions = adapterRegistry
} = {}) {
  if (!Array.isArray(definitions) || definitions.length === 0) {
    throw new Error("implementation evidence definitions must be a non-empty array");
  }
  const generatedAt = new Date().toISOString();
  const packageLockSha256 = sha256(
    await readFile(path.join(projectRoot, "package-lock.json"))
  );
  const probeContractSha256 = sha256(
    (
      await Promise.all(
        implementationProbeContractFiles.map((name) =>
          readFile(path.join(sourceRoot, name))
        )
      )
    ).map((content) => content.toString("utf8")).join("\0")
  );
  const runContext = {
    generatedAt,
    packageLockSha256,
    probeContractSha256,
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    effectiveExecArgv: effectiveWorkerExecArgv(),
    effectiveNodeOptionsSha256: typeof process.env.NODE_OPTIONS === "string"
      ? sha256(process.env.NODE_OPTIONS)
      : null,
    processId: process.pid
  };
  const runIdentitySha256 = createImplementationRunIdentity(runContext);
  const artifactPath = path.join(resultsRoot, "implementation-evidence.json");
  const previous = await readPreviousArtifact(artifactPath);
  const runRoot = path.join(temporaryRoot, runIdentitySha256);
  await mkdir(runRoot, { recursive: true });
  const participants = {};
  let captured = 0;
  let reused = 0;

  for (const definition of definitions) {
    const scopes = {};
    const adapterSourceSha256 = sha256(
      await readFile(path.join(sourceRoot, "adapters", `${definition.id}.js`))
    );
    const runtimeIdentity = await createValidatorRuntimeIdentity({
      validator: definition.id,
      draft: definition.drafts[0],
      projectRoot
    });
    for (const draft of definition.drafts) {
      const evidenceIdentitySha256 = createImplementationScopeIdentity({
        nodeVersion: process.version,
        platform: process.platform,
        architecture: process.arch,
        effectiveExecArgv: runContext.effectiveExecArgv,
        effectiveNodeOptionsSha256: runContext.effectiveNodeOptionsSha256,
        validator: definition.id,
        draft,
        adapterSourceSha256,
        validatorRuntimeSha256: runtimeIdentity.hash,
        probeContractSha256,
      });
      const cached = previous?.participants?.[definition.id]?.scopes?.[draft] ?? null;
      if (cached?.evidenceIdentitySha256 === evidenceIdentitySha256) {
        scopes[draft] = cached;
        reused += 1;
        continue;
      }

      const events = [];
      const dependencyRoots = [
        path.join(sourceRoot, "adapters", `${definition.id}.js`)
      ];
      const apiEventPath = path.join(
        runRoot,
        `${definition.id}-${draft}-api.jsonl`
      );
      const apiChild = await runInstrumentedModule({
        modulePath: probeChildPath,
        eventPath: apiEventPath,
        cwd: projectRoot,
        dependencyRoots,
        execArgv: runContext.effectiveExecArgv,
        processIdentity: "api",
        args: [definition.id, draft, "api"]
      });
      const probe = JSON.parse(apiChild.stdout.trim());
      events.push(...parseEvents(await readFile(apiEventPath, "utf8")));
      const controls = {};
      for (const control of ["aa", "bb", "aba", "bab"]) {
        const eventPath = path.join(
          runRoot,
          `${definition.id}-${draft}-${control}.jsonl`
        );
        const child = await runInstrumentedModule({
          modulePath: probeChildPath,
          eventPath,
          cwd: projectRoot,
          dependencyRoots,
          execArgv: runContext.effectiveExecArgv,
          processIdentity: control,
          args: [definition.id, draft, control]
        });
        controls[control] = JSON.parse(child.stdout.trim()).control;
        events.push(...parseEvents(await readFile(eventPath, "utf8")));
      }
      const isolation = classifyIsolationControls(controls);
      const dynamicCode = summarizeDynamicCode(events);
      scopes[draft] = {
        evidenceIdentitySha256,
        adapterSourceSha256,
        validatorRuntimeSha256: runtimeIdentity.hash,
        capturedAt: generatedAt,
        captureRunIdentitySha256: runIdentitySha256,
        api: { evidence: "observed", value: probe.api },
        isolation: { evidence: "observed", value: isolation.value },
        isolationControls: controls,
        dynamicCode: {
          evidence: "observed",
          value: dynamicCode.value
        },
        dynamicCodeRoutes: dynamicCode.routes,
        dynamicCodeMechanisms: dynamicCode.mechanisms,
        diagnostics: [
          ...probe.diagnostics,
          ...isolation.diagnostics,
          ...dynamicCode.diagnostics
        ]
      };
      captured += 1;
    }
    participants[definition.id] = { scopes };
  }

  const captureRunIdentities = new Set([runIdentitySha256]);
  for (const participant of Object.values(participants)) {
    for (const scope of Object.values(participant.scopes)) {
      captureRunIdentities.add(scope.captureRunIdentitySha256);
    }
  }
  const captureRuns = Object.fromEntries(
    [...captureRunIdentities].map((identity) => [
      identity,
      identity === runIdentitySha256
        ? runContext
        : previous.captureRuns[identity]
    ])
  );

  const artifact = validateImplementationEvidence({
    implementationEvidenceVersion,
    instrumentationVersion: implementationInstrumentationVersion,
    instrumentationCapabilities: implementationInstrumentationCapabilities,
    generatedAt,
    packageLockSha256,
    probeContractSha256,
    captureRuns,
    runIdentitySha256,
    participants
  });
  await mkdir(resultsRoot, { recursive: true });
  const stagedPath = `${artifactPath}.staged-${process.pid}`;
  await writeFile(stagedPath, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
  await rename(stagedPath, artifactPath);
  return { artifact, artifactPath, captured, reused };
}
