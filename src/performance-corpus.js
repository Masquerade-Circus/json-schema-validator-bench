import { createHash } from "node:crypto";

import { canonicalJson } from "./suite.js";

export const quickPerformanceCorpusContract = Object.freeze({
  policyVersion: 1,
  rank: "sha256-id",
  maximumCompileEntriesPerScope: 6,
  maximumExecutionCasesPerScope: 12,
  requireValidAndInvalid: true
});

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function rank(scope, id) {
  return sha256(`${scope}\n${id}`);
}

export function derivePerformanceCorpus({ mode, intersection, cases }) {
  if (mode !== "quick" && mode !== "full") {
    throw new Error("performance corpus mode must be quick or full");
  }
  if (
    intersection === null ||
    typeof intersection !== "object" ||
    !Array.isArray(intersection.caseIds) ||
    !Array.isArray(intersection.compileEntries) ||
    !Array.isArray(cases)
  ) {
    throw new Error("performance corpus requires an intersection and suite cases");
  }
  if (mode === "full" || intersection.emptyReason !== null) {
    return {
      caseIds: intersection.caseIds,
      compileEntries: intersection.compileEntries,
      metadata: null
    };
  }

  const scope = `${intersection.draft}/${intersection.formatProfile}`;
  const casesById = new Map(cases.map((testCase) => [testCase.id, testCase]));
  const entryBySchemaId = new Map();
  for (const entry of intersection.compileEntries) {
    for (const schemaId of entry.memberSchemaIds) {
      if (entryBySchemaId.has(schemaId)) {
        throw new Error(`schema belongs to multiple compile entries: ${schemaId}`);
      }
      entryBySchemaId.set(schemaId, entry);
    }
  }

  const rankedCases = intersection.caseIds
    .map((id) => {
      const testCase = casesById.get(id);
      if (typeof testCase === "undefined") {
        throw new Error(`intersection case is absent from the suite: ${id}`);
      }
      const entry = entryBySchemaId.get(testCase.schemaId);
      if (typeof entry === "undefined") {
        throw new Error(`intersection case lacks a compile entry: ${id}`);
      }
      return { id, testCase, entry, rank: rank(scope, id) };
    })
    .sort(
      (left, right) =>
        left.rank.localeCompare(right.rank) || left.id.localeCompare(right.id)
    );
  const required = [
    rankedCases.find(({ testCase }) => testCase.expected === true),
    rankedCases.find(({ testCase }) => testCase.expected === false)
  ];
  if (required.some((candidate) => typeof candidate === "undefined")) {
    throw new Error(`${scope} quick corpus requires valid and invalid cases`);
  }

  const selectedCaseIds = new Set(required.map(({ id }) => id));
  const selectedCompileKeys = new Set(
    required.map(({ entry }) => entry.compileKey)
  );
  for (const candidate of rankedCases) {
    if (
      selectedCaseIds.size >=
      quickPerformanceCorpusContract.maximumExecutionCasesPerScope
    ) {
      break;
    }
    if (selectedCaseIds.has(candidate.id)) {
      continue;
    }
    if (
      !selectedCompileKeys.has(candidate.entry.compileKey) &&
      selectedCompileKeys.size >=
        quickPerformanceCorpusContract.maximumCompileEntriesPerScope
    ) {
      continue;
    }
    selectedCaseIds.add(candidate.id);
    selectedCompileKeys.add(candidate.entry.compileKey);
  }

  const selectedCases = rankedCases.filter(({ id }) => selectedCaseIds.has(id));
  const compileEntries = intersection.compileEntries
    .filter(({ compileKey }) => selectedCompileKeys.has(compileKey))
    .sort((left, right) => left.compileKey.localeCompare(right.compileKey));
  const validCases = selectedCases.filter(
    ({ testCase }) => testCase.expected === true
  ).length;
  const invalidCases = selectedCases.length - validCases;
  const selection = {
    ...quickPerformanceCorpusContract,
    scope,
    source: {
      intersectionCases: intersection.caseIds.length,
      compileEntries: intersection.compileEntries.length
    },
    selected: {
      executionCases: selectedCases.length,
      validCases,
      invalidCases,
      compileEntries: compileEntries.length,
      compileChecksum: sha256(
        compileEntries.map(({ compileKey }) => compileKey).join("\n")
      ),
      executionPassChecksum: selectedCases.reduce(
        (total, { testCase }, index) =>
          total + (index + 1) * (testCase.expected ? 3 : 7),
        0
      ),
      executionInputSha256: sha256(
        canonicalJson(selectedCases.map(({ testCase }) => testCase.data))
      )
    },
    caseIds: selectedCases.map(({ id }) => id),
    compileKeys: compileEntries.map(({ compileKey }) => compileKey)
  };
  return {
    caseIds: selection.caseIds,
    compileEntries,
    metadata: {
      ...selection,
      selectionSha256: sha256(JSON.stringify(selection))
    }
  };
}

export function estimateQuickColdBudget({
  fixedStageMilliseconds,
  performanceStageMilliseconds,
  sampleCount,
  startupReserveMillisecondsPerSample,
  fullWorkUnits,
  selectedWorkUnits
}) {
  for (const [name, value] of Object.entries({
    fixedStageMilliseconds,
    performanceStageMilliseconds,
    sampleCount,
    startupReserveMillisecondsPerSample,
    fullWorkUnits,
    selectedWorkUnits
  })) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error(`${name} must be a positive finite number`);
    }
  }
  if (selectedWorkUnits > fullWorkUnits) {
    throw new Error("selected quick work cannot exceed full intersection work");
  }
  const startupReserveMilliseconds =
    sampleCount * startupReserveMillisecondsPerSample;
  if (startupReserveMilliseconds > performanceStageMilliseconds) {
    throw new Error("startup reserve exceeds the observed performance stage");
  }
  const workRatio = selectedWorkUnits / fullWorkUnits;
  const projectedPerformanceMilliseconds =
    startupReserveMilliseconds +
    (performanceStageMilliseconds - startupReserveMilliseconds) * workRatio;
  return {
    fixedStageMilliseconds,
    startupReserveMilliseconds,
    workRatio,
    projectedPerformanceMilliseconds,
    projectedTotalMilliseconds:
      fixedStageMilliseconds + projectedPerformanceMilliseconds
  };
}
