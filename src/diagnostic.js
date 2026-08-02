import { canonicalJson } from "./suite.js";

function requireFullRun(mode, reason) {
  const label = mode === "quick" ? "full Quick benchmark" : "full benchmark";
  throw new Error(`Diagnostic refresh cannot reuse the current publication: ${reason}. Run the ${label} first.`);
}

export function createDiagnosticPublication({
  previousDiagnostic,
  validator,
  bench = null
}) {
  const refreshes = previousDiagnostic?.diagnostic === true
    ? [...previousDiagnostic.refreshes]
    : [];
  refreshes.push({ validator, bench });
  const unique = new Map(
    refreshes.map((refresh) => [
      `${refresh.validator ?? "*"}/${refresh.bench ?? "*"}`,
      refresh
    ])
  );
  return {
    diagnostic: true,
    refreshes: [...unique.values()].sort(
      (left, right) =>
        (left.validator ?? "").localeCompare(right.validator ?? "") ||
        (left.bench ?? "").localeCompare(right.bench ?? "")
    )
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
  if (validator !== null && !validatorIds.includes(validator)) {
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
      !Array.isArray(previousDiagnostic.refreshes) ||
      previousDiagnostic.refreshes.some(
        (refresh) =>
          refresh === null ||
          typeof refresh !== "object" ||
          (refresh.validator !== null &&
            !validatorIds.includes(refresh.validator)) ||
          (refresh.bench !== null &&
            !["setup", "execution", "cold"].includes(refresh.bench)) ||
          (refresh.validator === null && refresh.bench === null)
      ) ||
      new Set(
        previousDiagnostic.refreshes.map(
          ({ validator: refreshedValidator, bench: refreshedBench }) =>
            `${refreshedValidator ?? "*"}/${refreshedBench ?? "*"}`
        )
      ).size !== previousDiagnostic.refreshes.length
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
      (validator === null || runtimeValidator !== validator) &&
      baselineRuntime[key] !== currentRuntime[key]
    ) {
      requireFullRun(mode, `validator runtime mismatch for ${runtimeValidator}`);
    }
  }
  return {
    refreshes:
      previousDiagnostic?.diagnostic === true
        ? previousDiagnostic.refreshes.map((refresh) => ({ ...refresh }))
        : []
  };
}

export function createSampleRuntimeProvenance(results) {
  if (!Array.isArray(results)) {
    throw new Error("sample runtime provenance requires phase results");
  }
  const scopes = {};
  for (const result of results) {
    if (
      result === null ||
      typeof result !== "object" ||
      !["setup", "execution", "cold-execution"].includes(result.phase) ||
      typeof result.draft !== "string" ||
      !Array.isArray(result.samples)
    ) {
      throw new Error("sample runtime provenance received an invalid phase result");
    }
    const scope = result.phase === "setup"
      ? `${result.draft}/setup`
      : `${result.draft}/${result.formatProfile}/${result.phase}`;
    scopes[scope] ??= {};
    for (const sample of result.samples) {
      if (
        typeof sample.validator !== "string" ||
        !/^[a-f0-9]{64}$/.test(sample.validatorRuntimeSha256)
      ) {
        throw new Error(`sample runtime provenance is invalid for ${scope}`);
      }
      const existing = scopes[scope][sample.validator];
      if (
        typeof existing === "string" &&
        existing !== sample.validatorRuntimeSha256
      ) {
        throw new Error(
          `sample runtime provenance changes across rounds for ${scope}/${sample.validator}`
        );
      }
      scopes[scope][sample.validator] = sample.validatorRuntimeSha256;
    }
  }
  return { provenanceVersion: 1, scopes };
}

export function assertCompatibleIntersections(previous, current, mode) {
  if (canonicalJson(previous) !== canonicalJson(current)) {
    requireFullRun(mode, "eligibility, roster, or common PASS corpus changed");
  }
}

export function groupIntersectionHashesByScope(hashes) {
  if (hashes === null || typeof hashes !== "object" || Array.isArray(hashes)) {
    throw new Error("intersection hashes must be an object");
  }
  const inventory = {};
  for (const [key, hash] of Object.entries(hashes)) {
    const parts = key.split("/");
    const phase = parts.at(-1);
    const setup = phase === "setup";
    if (
      (setup && (parts.length !== 2 || parts[1] !== "setup")) ||
      (!setup &&
        (parts.length !== 3 ||
          !["execution", "cold-execution"].includes(phase)))
    ) {
      throw new Error(`invalid intersection hash key: ${key}`);
    }
    const scope = setup ? key : parts.slice(0, -1).join("/");
    inventory[scope] ??= {};
    if (Object.hasOwn(inventory[scope], phase)) {
      throw new Error(`duplicate intersection hash key: ${key}`);
    }
    inventory[scope][phase] = hash;
  }
  return inventory;
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
