import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { getResultsRoot } from "./paths.js";

export const implementationEvidenceVersion = 4;
export const implementationInstrumentationVersion = 4;
export const implementationProbeContractFiles = Object.freeze([
  "adapter-api.js",
  "implementation-evidence.js",
  "implementation-instrumentation.js",
  "implementation-isolation.js",
  "implementation-loader-hooks.js",
  "implementation-probe-child.js",
  "implementation-probe.js",
  "node-inline-semantics.js"
]);
export const implementationInstrumentationCapabilities = Object.freeze([
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
]);
export const implementationRuntimeObservationPhases = Object.freeze([
  "adapter-import",
  "api-setup",
  "api-validation",
  "isolation-aa",
  "isolation-bb",
  "isolation-aba",
  "isolation-bab"
]);
export const implementationProbeProcesses = Object.freeze({
  api: Object.freeze(["adapter-import", "api-setup", "api-validation"]),
  aa: Object.freeze(["adapter-import", "isolation-aa"]),
  bb: Object.freeze(["adapter-import", "isolation-bb"]),
  aba: Object.freeze(["adapter-import", "isolation-aba"]),
  bab: Object.freeze(["adapter-import", "isolation-bab"])
});

const hashPattern = /^[a-f0-9]{64}$/;
const apiValues = new Set(["reusable-sync", "reusable-async", "validate-only"]);
const isolationValues = new Set([
  "interference-observed",
  "interference-not-observed",
  "self-instability-observed",
  "inconclusive"
]);
const runtimeObservationValues = new Set([
  "observed",
  "not-observed",
  "limited",
  "inconclusive"
]);

function assertObject(value, field) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${field} must be an object`);
  }
}

function assertHash(value, field) {
  if (typeof value !== "string" || !hashPattern.test(value)) {
    throw new Error(`${field} must be a SHA-256 hash`);
  }
}

function assertTimestamp(value, field) {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
    throw new Error(`${field} must be an ISO timestamp`);
  }
}

export function createImplementationRunIdentity(context) {
  assertObject(context, "implementation capture run");
  return sha256(JSON.stringify({
    generatedAt: context.generatedAt,
    packageLockSha256: context.packageLockSha256,
    probeContractSha256: context.probeContractSha256,
    nodeVersion: context.nodeVersion,
    platform: context.platform,
    architecture: context.architecture,
    effectiveExecArgv: context.effectiveExecArgv,
    effectiveNodeOptionsSha256: context.effectiveNodeOptionsSha256,
    processId: context.processId
  }));
}

export function createImplementationScopeIdentity({
  nodeVersion,
  platform,
  architecture,
  effectiveExecArgv,
  effectiveNodeOptionsSha256,
  validator,
  draft,
  adapterSourceSha256,
  validatorRuntimeSha256,
  probeContractSha256
}) {
  return sha256(JSON.stringify({
    implementationEvidenceVersion,
    instrumentationVersion: implementationInstrumentationVersion,
    probeContractSha256,
    nodeVersion,
    platform,
    architecture,
    effectiveExecArgv,
    effectiveNodeOptionsSha256,
    validator,
    draft,
    adapterSourceSha256,
    validatorRuntimeSha256
  }));
}

function validateObservation(observation, field, allowed) {
  assertObject(observation, field);
  if (observation.evidence !== "observed") {
    throw new Error(`${field} must use observed evidence`);
  }
  if (!allowed.has(observation.value)) {
    throw new Error(`${field} has an unsupported value`);
  }
}

export function validateImplementationEvidence(artifact) {
  assertObject(artifact, "implementation evidence");
  if (artifact.implementationEvidenceVersion !== implementationEvidenceVersion) {
    throw new Error("implementation evidence version is incompatible");
  }
  if (artifact.instrumentationVersion !== implementationInstrumentationVersion) {
    throw new Error("implementation instrumentation version is incompatible");
  }
  assertHash(artifact.packageLockSha256, "implementation package lock identity");
  assertHash(artifact.probeContractSha256, "implementation probe contract identity");
  assertHash(artifact.runIdentitySha256, "implementation run identity");
  if (
    !Array.isArray(artifact.instrumentationCapabilities) ||
    artifact.instrumentationCapabilities.length !== implementationInstrumentationCapabilities.length ||
    implementationInstrumentationCapabilities.some(
      (capability) => !artifact.instrumentationCapabilities.includes(capability)
    )
  ) {
    throw new Error("implementation instrumentation capabilities are incomplete");
  }
  assertTimestamp(artifact.generatedAt, "implementation generatedAt");
  assertObject(artifact.captureRuns, "implementation capture runs");
  for (const [identity, run] of Object.entries(artifact.captureRuns)) {
    assertHash(identity, "implementation capture run key");
    assertObject(run, `implementation capture run ${identity}`);
    assertTimestamp(run.generatedAt, `implementation capture run ${identity} generatedAt`);
    assertHash(run.packageLockSha256, `implementation capture run ${identity} package lock`);
    assertHash(run.probeContractSha256, `implementation capture run ${identity} probe contract`);
    if (
      !Number.isSafeInteger(run.processId) ||
      run.processId < 1 ||
      !Array.isArray(run.effectiveExecArgv) ||
      run.effectiveExecArgv.some((value) => typeof value !== "string") ||
      !(
        run.effectiveNodeOptionsSha256 === null ||
        hashPattern.test(run.effectiveNodeOptionsSha256)
      ) ||
      [run.nodeVersion, run.platform, run.architecture].some(
        (value) => typeof value !== "string" || value.length === 0
      ) ||
      createImplementationRunIdentity(run) !== identity
    ) {
      throw new Error(`implementation capture run ${identity} is invalid`);
    }
  }
  if (!Object.hasOwn(artifact.captureRuns, artifact.runIdentitySha256)) {
    throw new Error("implementation current run identity is absent");
  }
  assertObject(artifact.participants, "implementation participants");
  for (const [validator, participant] of Object.entries(artifact.participants)) {
    assertObject(participant, `implementation participant ${validator}`);
    assertObject(participant.scopes, `implementation scopes ${validator}`);
    for (const [draft, scope] of Object.entries(participant.scopes)) {
      const prefix = `implementation scope ${validator}/${draft}`;
      assertObject(scope, prefix);
      if (
        ["dynamicCode", "dynamicCodeRoutes", "dynamicCodeMechanisms"].some(
          (field) => Object.hasOwn(scope, field)
        )
      ) {
        throw new Error(`${prefix} contains a legacy dynamic code field`);
      }
      assertHash(scope.evidenceIdentitySha256, `${prefix} evidence identity`);
      assertHash(scope.adapterSourceSha256, `${prefix} adapter source identity`);
      assertHash(scope.validatorRuntimeSha256, `${prefix} runtime identity`);
      assertHash(scope.captureRunIdentitySha256, `${prefix} capture run identity`);
      assertTimestamp(scope.capturedAt, `${prefix} capturedAt`);
      const captureRun = artifact.captureRuns[scope.captureRunIdentitySha256];
      if (captureRun === null || typeof captureRun !== "object") {
        throw new Error(`${prefix} capture run provenance is absent`);
      }
      if (scope.capturedAt !== captureRun.generatedAt) {
        throw new Error(`${prefix} capture timestamp differs from its run`);
      }
      if (
        scope.evidenceIdentitySha256 !== createImplementationScopeIdentity({
          nodeVersion: captureRun.nodeVersion,
          platform: captureRun.platform,
          architecture: captureRun.architecture,
          effectiveExecArgv: captureRun.effectiveExecArgv,
          effectiveNodeOptionsSha256: captureRun.effectiveNodeOptionsSha256,
          validator,
          draft,
          adapterSourceSha256: scope.adapterSourceSha256,
          validatorRuntimeSha256: scope.validatorRuntimeSha256,
          probeContractSha256: captureRun.probeContractSha256
        })
      ) {
        throw new Error(`${prefix} stable identity is invalid`);
      }
      validateObservation(scope.api, `${prefix} API`, apiValues);
      validateObservation(scope.isolation, `${prefix} isolation`, isolationValues);
      assertObject(scope.isolationControls, `${prefix} isolation controls`);
      if (
        Object.keys(scope.isolationControls).length !== 4 ||
        ["aa", "bb", "aba", "bab"].some(
          (control) => !Object.hasOwn(scope.isolationControls, control)
        )
      ) {
        throw new Error(`${prefix} isolation controls are incomplete`);
      }
      for (const [control, result] of Object.entries(scope.isolationControls)) {
        assertObject(result, `${prefix} isolation control ${control}`);
        if (!["passed", "changed", "threw", "inconclusive"].includes(result.status)) {
          throw new Error(`${prefix} isolation control ${control} status is invalid`);
        }
        if (!(result.diagnostic === null || typeof result.diagnostic === "string")) {
          throw new Error(`${prefix} isolation control ${control} diagnostic is invalid`);
        }
      }
      validateObservation(
        scope.runtimeObservation,
        `${prefix} runtime observation`,
        runtimeObservationValues
      );
      let hasReadinessFailure = false;
      let hasKnownLimitation = false;
      if (
        !Array.isArray(scope.runtimeObservation.routes) ||
        new Set(scope.runtimeObservation.routes).size !==
          scope.runtimeObservation.routes.length ||
        scope.runtimeObservation.routes.some(
          (route) =>
            typeof route !== "string" ||
            !implementationInstrumentationCapabilities.includes(route)
        )
      ) {
        throw new Error(`${prefix} dynamic code routes are invalid`);
      }
      assertObject(
        scope.runtimeObservation.mechanisms,
        `${prefix} runtime observation mechanisms`
      );
      if (
        Object.keys(scope.runtimeObservation.mechanisms).length !==
        implementationInstrumentationCapabilities.length
      ) {
        throw new Error(`${prefix} dynamic code mechanisms are incomplete`);
      }
      for (const mechanism of implementationInstrumentationCapabilities) {
        const summary = scope.runtimeObservation.mechanisms[mechanism];
        assertObject(summary, `${prefix} ${mechanism} summary`);
        if (!["ready", "limited", "inconclusive"].includes(summary.capability)) {
          throw new Error(`${prefix} ${mechanism} capability is invalid`);
        }
        if (!(summary.limitation === null || typeof summary.limitation === "string")) {
          throw new Error(`${prefix} ${mechanism} limitation is invalid`);
        }
        assertObject(summary.phases, `${prefix} ${mechanism} phases`);
        if (
          Object.keys(summary.phases).length !== implementationRuntimeObservationPhases.length ||
          implementationRuntimeObservationPhases.some(
            (phase) => !Object.hasOwn(summary.phases, phase)
          )
        ) {
          throw new Error(`${prefix} ${mechanism} phase readiness is incomplete`);
        }
        for (const phase of implementationRuntimeObservationPhases) {
          const phaseSummary = summary.phases[phase];
          assertObject(phaseSummary, `${prefix} ${mechanism} ${phase}`);
          if (
            !["ready", "limited", "unavailable", "not-entered", "inconclusive"].includes(
              phaseSummary.readiness
            )
          ) {
            throw new Error(`${prefix} ${mechanism} ${phase} readiness is invalid`);
          }
          assertObject(phaseSummary.processes, `${prefix} ${mechanism} ${phase} processes`);
          const requiredProcesses = Object.entries(implementationProbeProcesses)
            .filter(([, phases]) => phases.includes(phase))
            .map(([processIdentity]) => processIdentity);
          if (
            Object.keys(phaseSummary.processes).length !== requiredProcesses.length ||
            requiredProcesses.some(
              (processIdentity) => !Object.hasOwn(phaseSummary.processes, processIdentity)
            )
          ) {
            throw new Error(`${prefix} ${mechanism} ${phase} process readiness is incomplete`);
          }
          for (const processIdentity of requiredProcesses) {
            const processSummary = phaseSummary.processes[processIdentity];
            assertObject(
              processSummary,
              `${prefix} ${mechanism} ${phase} ${processIdentity}`
            );
            if (
              !["ready", "limited", "unavailable", "not-entered", "inconclusive"].includes(
                processSummary.readiness
              ) ||
              typeof processSummary.instrumentationReady !== "boolean" ||
              !Array.isArray(processSummary.processIds) ||
              processSummary.processIds.some(
                (processId) => !Number.isSafeInteger(processId) || processId < 1
              )
            ) {
              throw new Error(
                `${prefix} ${mechanism} ${phase} ${processIdentity} provenance is invalid`
              );
            }
            if (["unavailable", "not-entered", "inconclusive"].includes(
              processSummary.readiness
            )) {
              hasReadinessFailure = true;
            }
            if (processSummary.readiness === "limited") {
              hasKnownLimitation = true;
            }
            for (const attribution of ["runner", "dependency"]) {
              assertObject(
                processSummary[attribution],
                `${prefix} ${mechanism} ${phase} ${processIdentity} ${attribution}`
              );
              for (const outcome of ["attempted", "succeeded", "failed"]) {
                if (
                  !Number.isSafeInteger(processSummary[attribution][outcome]) ||
                  processSummary[attribution][outcome] < 0
                ) {
                  throw new Error(
                    `${prefix} ${mechanism} ${phase} ${processIdentity} ${attribution} ${outcome} is invalid`
                  );
                }
              }
            }
          }
          for (const attribution of ["runner", "dependency"]) {
            assertObject(
              phaseSummary[attribution],
              `${prefix} ${mechanism} ${phase} ${attribution}`
            );
            for (const outcome of ["attempted", "succeeded", "failed"]) {
              if (
                !Number.isSafeInteger(phaseSummary[attribution][outcome]) ||
                phaseSummary[attribution][outcome] < 0
              ) {
                throw new Error(
                  `${prefix} ${mechanism} ${phase} ${attribution} ${outcome} is invalid`
                );
              }
            }
          }
        }
      }
      if (hasReadinessFailure && scope.runtimeObservation.value !== "inconclusive") {
        throw new Error(`${prefix} runtime observation must be inconclusive when readiness fails`);
      }
      if (
        scope.runtimeObservation.value === "limited" &&
        (!hasKnownLimitation || hasReadinessFailure)
      ) {
        throw new Error(`${prefix} runtime observation limited verdict is invalid`);
      }
      if (
        !Array.isArray(scope.diagnostics) ||
        scope.diagnostics.some((diagnostic) => typeof diagnostic !== "string")
      ) {
        throw new Error(`${prefix} diagnostics must be strings`);
      }
    }
  }
  return artifact;
}

export function coldEvidenceDecision(
  artifact,
  validator,
  draft,
  {
    expectedPackageLockSha256 = null,
    expectedProbeContractSha256 = null,
    expectedAdapterSourceSha256 = null
  } = {}
) {
  if (
    (expectedPackageLockSha256 !== null &&
      artifact.packageLockSha256 !== expectedPackageLockSha256) ||
    (expectedProbeContractSha256 !== null &&
      artifact.probeContractSha256 !== expectedProbeContractSha256)
  ) {
    return { eligible: false, reason: "implementation evidence is stale" };
  }
  const scope = artifact.participants[validator]?.scopes?.[draft] ?? null;
  if (scope === null) {
    return { eligible: false, reason: "implementation evidence is absent" };
  }
  if (
    expectedAdapterSourceSha256 !== null &&
    scope.adapterSourceSha256 !== expectedAdapterSourceSha256
  ) {
    return { eligible: false, reason: "implementation evidence is stale" };
  }
  if (
    scope.api?.evidence !== "observed" ||
    !apiValues.has(scope.api.value)
  ) {
    return {
      eligible: false,
      reason: "implementation API evidence is absent or inconclusive"
    };
  }
  if (
    scope.isolation?.evidence !== "observed" ||
    !isolationValues.has(scope.isolation.value) ||
    scope.isolation.value === "inconclusive"
  ) {
    return {
      eligible: false,
      reason: "implementation isolation evidence is inconclusive"
    };
  }
  if (scope.isolation.value === "interference-observed") {
    return { eligible: false, reason: "provider state interference was observed" };
  }
  if (scope.isolation.value === "self-instability-observed") {
    return { eligible: false, reason: "provider self-instability was observed" };
  }
  return { eligible: true, reason: null };
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function loadImplementationEvidenceSync({
  resultsRoot = null,
  projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
} = {}) {
  const sourceRoot = path.join(projectRoot, "src");
  const context = {
    packageLockSha256: sha256(readFileSync(path.join(projectRoot, "package-lock.json"))),
    probeContractSha256: sha256(
      implementationProbeContractFiles
        .map((name) => readFileSync(path.join(sourceRoot, name), "utf8"))
        .join("\0")
    ),
    adapterSourceSha256(validator) {
      return sha256(
        readFileSync(path.join(sourceRoot, "adapters", `${validator}.js`))
      );
    }
  };
  try {
    const resolvedResultsRoot = resultsRoot ?? getResultsRoot();
    return {
      artifact: validateImplementationEvidence(
        JSON.parse(
          readFileSync(
            path.join(resolvedResultsRoot, "implementation-evidence.json"),
            "utf8"
          )
        )
      ),
      context,
      diagnostic: null
    };
  } catch (error) {
    return { artifact: null, context, diagnostic: error?.message ?? String(error) };
  }
}
