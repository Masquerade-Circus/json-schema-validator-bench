import { canonicalJson } from "./suite.js";

function requireFullRun(mode, reason) {
  const label = mode === "quick" ? "full Quick benchmark" : "full benchmark";
  throw new Error(`Diagnostic refresh cannot reuse the current publication: ${reason}. Run the ${label} first.`);
}

export function createDiagnosticPublication({ previousDiagnostic, validator }) {
  const refreshedValidators = new Set(
    previousDiagnostic?.diagnostic === true
      ? previousDiagnostic.refreshedValidators
      : []
  );
  refreshedValidators.add(validator);
  return {
    diagnostic: true,
    refreshedValidators: [...refreshedValidators].sort()
  };
}

export function assertCompatibleDiagnosticBaseline({
  mode,
  validator,
  validatorIds,
  baselineIndex,
  baselineEnvironment,
  currentCohortIdentity
}) {
  if (!validatorIds.includes(validator)) {
    throw new Error(`diagnostic validator must use one canonical adapter registry ID: ${String(validator)}`);
  }
  if (
    baselineIndex === null ||
    baselineEnvironment === null ||
    baselineEnvironment.cohortIdentity === null ||
    typeof baselineEnvironment.cohortIdentity !== "object"
  ) {
    requireFullRun(mode, "a compatible complete baseline is absent");
  }
  if (baselineIndex.benchmarkMode !== mode) {
    requireFullRun(mode, "mode mismatch");
  }
  const previousDiagnostic = baselineIndex.diagnostic ?? null;
  if (
    previousDiagnostic !== null &&
    (
      previousDiagnostic.diagnostic !== true ||
      !Array.isArray(previousDiagnostic.refreshedValidators) ||
      new Set(previousDiagnostic.refreshedValidators).size !==
        previousDiagnostic.refreshedValidators.length ||
      previousDiagnostic.refreshedValidators.some(
        (id) => !validatorIds.includes(id)
      )
    )
  ) {
    requireFullRun(mode, "diagnostic trace metadata is invalid");
  }
  const baseline = baselineEnvironment.cohortIdentity;
  const stableFields = [
    ["cohort identity", "cohortIdentityVersion"],
    ["mode", "benchmarkMode"],
    ["rounds", "rounds"],
    ["contract", "benchmarkContractSha256"],
    ["threshold", "eligibilityThresholdPercent"],
    ["harness", "sharedHarnessSha256"],
    ["package lock", "packageLockSha256"],
    ["npm snapshot lock", "npmSnapshotLockSha256"],
    ["suite lock", "suiteLockSha256"],
    ["environment", "runtimeEnvironment"]
  ];
  for (const [label, field] of stableFields) {
    if (canonicalJson(baseline[field]) !== canonicalJson(currentCohortIdentity[field])) {
      requireFullRun(mode, `${label} mismatch`);
    }
  }
  const knownValidators = new Set(validatorIds);
  const baselineRuntime = baseline.validatorRuntimeSha256;
  const currentRuntime = currentCohortIdentity.validatorRuntimeSha256;
  if (
    baselineRuntime === null ||
    typeof baselineRuntime !== "object" ||
    currentRuntime === null ||
    typeof currentRuntime !== "object"
  ) {
    requireFullRun(mode, "validator runtime identity is absent");
  }
  const runtimeKeys = new Set([
    ...Object.keys(baselineRuntime),
    ...Object.keys(currentRuntime)
  ]);
  for (const key of runtimeKeys) {
    const runtimeValidator = key.slice(key.lastIndexOf("/") + 1);
    if (!knownValidators.has(runtimeValidator)) {
      requireFullRun(mode, "validator roster mismatch");
    }
    if (
      runtimeValidator !== validator &&
      baselineRuntime[key] !== currentRuntime[key]
    ) {
      requireFullRun(mode, `validator runtime mismatch for ${runtimeValidator}`);
    }
  }
  return {
    refreshedValidators:
      previousDiagnostic?.diagnostic === true
        ? [...previousDiagnostic.refreshedValidators]
        : []
  };
}

export function assertCompatibleIntersections(previous, current, mode) {
  if (canonicalJson(previous) !== canonicalJson(current)) {
    requireFullRun(mode, "eligibility, roster, or common PASS corpus changed");
  }
}

export function reconcileDiagnosticPhaseResult({
  previousResult,
  validator,
  freshSamples,
  startedAt,
  endedAt
}) {
  if (
    previousResult === null ||
    typeof previousResult !== "object" ||
    !Array.isArray(previousResult.participants) ||
    !Array.isArray(previousResult.samples) ||
    !Array.isArray(previousResult.participantOrderByRound)
  ) {
    throw new Error("diagnostic phase lacks a compatible complete result");
  }
  const participates = previousResult.participants.includes(validator);
  if (!Array.isArray(freshSamples)) {
    throw new Error("diagnostic phase samples must be an array");
  }
  if (
    freshSamples.some((sample) => sample?.validator !== validator) ||
    (!participates && freshSamples.length !== 0)
  ) {
    throw new Error("diagnostic phase received samples for an invalid validator");
  }
  const freshByRound = new Map(
    freshSamples.map((sample) => [sample.round, sample])
  );
  if (
    freshByRound.size !== freshSamples.length ||
    (participates &&
      previousResult.participantOrderByRound.some(
        ({ round }) => !freshByRound.has(round)
      ))
  ) {
    throw new Error("diagnostic phase lacks one selected-validator sample per round");
  }
  const previousByIdentity = new Map(
    previousResult.samples.map((sample) => [
      `${sample.round}/${sample.validator}`,
      sample
    ])
  );
  const samples = [];
  for (const { round, validators } of previousResult.participantOrderByRound) {
    for (const participant of validators) {
      const sample = participant === validator
        ? freshByRound.get(round)
        : previousByIdentity.get(`${round}/${participant}`);
      if (sample === undefined) {
        throw new Error(`diagnostic phase lacks a reusable sample for ${participant} round ${round}`);
      }
      samples.push(sample);
    }
  }
  const started = Date.parse(startedAt);
  const ended = Date.parse(endedAt);
  if (!Number.isFinite(started) || !Number.isFinite(ended) || ended < started) {
    throw new Error("diagnostic phase timestamps are invalid");
  }
  return {
    ...previousResult,
    startedAt,
    endedAt,
    durationMilliseconds: ended - started,
    samples
  };
}
