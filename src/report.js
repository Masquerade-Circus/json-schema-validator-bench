import { createHash } from "node:crypto";
import {
  access,
  cp,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile
} from "node:fs/promises";
import os from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  createBenchmarkCohortIdentity,
  createBenchmarkContractHash,
  getBenchmarkMode,
  loadBenchmarkArtifacts,
  memoryBudgetFromEnvironment,
  validateGranularSample
} from "./benchmark.js";
import {
  compareValidatorIds,
  draftIds,
  formatProfiles,
  getCompileParticipants,
  getParticipants,
  getRoundOrder,
  sortParticipantsByName,
  sortValidatorIds,
  validators as validatorMatrix
} from "./matrix.js";
import { canonicalJson, sha256 } from "./suite.js";
import { getResultsRoot } from "./paths.js";
import {
  derivePerformanceCorpus,
  quickPerformanceCorpusContract
} from "./performance-corpus.js";
import { mutationRecordKey } from "./intersection.js";
import {
  createPerformanceEligibilityPolicy,
  defaultEligibilityThresholdPercent,
  parseEligibilityThresholdPercent
} from "./eligibility.js";
import { createDiagnosticPublication } from "./diagnostic.js";

const benchmarksRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const statuses = [
  "PASS",
  "WRONG",
  "COMPILE",
  "RUNTIME",
  "UNSUPPORTED"
];
const whySection = [
  "## Why",
  "",
  "JSON Schema Validator Bench measures conformance and performance across drafts 04, 06, 07, 2019-09, and 2020-12 with pinned dependencies, corpus identities, and report contracts.",
  "",
  "Maintainers can reproduce each run, inspect exact conformance records, compare qualified performance scopes, and use the results to target validator improvements."
];

export function assertBenchmarkPath(targetPath) {
  const resolved = path.resolve(targetPath);
  if (
    resolved !== benchmarksRoot &&
    !resolved.startsWith(`${benchmarksRoot}${path.sep}`)
  ) {
    throw new Error(`report output path is outside the project root: ${resolved}`);
  }
  return resolved;
}

export async function publishBenchmarkArtifacts({
  stagedResults,
  stagedReadme,
  currentResults,
  currentReadme,
  transactionRoot,
  renamePath = rename,
  removePath = rm,
  faultInjection = () => {}
}) {
  const cleanupRoot = `${transactionRoot}-cleanup`;
  for (const target of [
    stagedResults,
    stagedReadme,
    currentResults,
    currentReadme,
    transactionRoot,
    cleanupRoot
  ]) {
    assertBenchmarkPath(target);
  }
  try {
    await access(cleanupRoot);
    throw new Error(`publication cleanup root already exists: ${cleanupRoot}`);
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
  await mkdir(transactionRoot);
  const previousResults = path.join(transactionRoot, "previous-results");
  const previousReadmeRoot = path.join(transactionRoot, "previous-readme");
  const previousReadme = path.join(previousReadmeRoot, "README.md");
  await mkdir(previousReadmeRoot);
  const journal = [];
  let committed = false;
  let failureContext = null;

  async function transition(step, source, target) {
    failureContext = { step, timing: "before" };
    await faultInjection({ step, timing: "before", source, target });
    failureContext = { step, timing: "rename" };
    await renamePath(source, target);
    journal.push({ step, source, target });
    if (step === "publish-staged-readme") {
      // Both staged artifacts now occupy their canonical paths. Cleanup cannot revoke this commit.
      committed = true;
    }
    failureContext = { step, timing: "after" };
    await faultInjection({ step, timing: "after", source, target });
    failureContext = null;
  }

  async function cleanupDiagnostic(cleanupError) {
    const cleanupRelocated = journal.some(
      ({ step }) => step === "relocate-backups-for-cleanup"
    );
    const activeBackupRoot = cleanupRelocated ? cleanupRoot : transactionRoot;
    const residuePaths = [];
    let activeBackupRootExists = true;
    async function inspect(directory, prefix = "") {
      const entries = await readdir(directory, { withFileTypes: true });
      entries.sort((left, right) =>
        left.name < right.name ? -1 : left.name > right.name ? 1 : 0
      );
      for (const entry of entries) {
        const relativePath = prefix.length === 0
          ? entry.name
          : `${prefix}/${entry.name}`;
        residuePaths.push(relativePath);
        if (entry.isDirectory()) {
          await inspect(path.join(directory, entry.name), relativePath);
        }
      }
    }
    try {
      await inspect(activeBackupRoot);
    } catch (error) {
      if (error?.code === "ENOENT") {
        activeBackupRootExists = false;
      } else {
        residuePaths.push(`inspection-error:${error.code ?? error.name}`);
      }
    }
    return {
      committed: true,
      cleanupComplete: false,
      cleanup: {
        activeBackupRoot,
        activeBackupRootExists,
        residuePaths,
        failedStep: failureContext?.step ?? "cleanup-remove",
        failedTiming: failureContext?.timing ?? "remove",
        error: {
          name: cleanupError?.name ?? "Error",
          code: cleanupError?.code ?? null,
          message: cleanupError?.message ?? String(cleanupError)
        }
      }
    };
  }

  async function rollback(publicationError) {
    const rollbackErrors = [];
    for (const entry of [...journal].reverse()) {
      try {
        await renamePath(entry.target, entry.source);
      } catch (error) {
        rollbackErrors.push(error);
      }
    }
    for (const directory of [cleanupRoot, transactionRoot]) {
      try {
        await rm(directory, { recursive: true, force: true });
      } catch (error) {
        rollbackErrors.push(error);
      }
    }
    if (rollbackErrors.length > 0) {
      throw new AggregateError(
        [publicationError, ...rollbackErrors],
        "benchmark publication rollback failed"
      );
    }
    throw publicationError;
  }

  try {
    await transition(
      "move-current-results",
      currentResults,
      previousResults
    );
    await transition(
      "move-current-readme",
      currentReadme,
      previousReadme
    );
    await transition(
      "publish-staged-results",
      stagedResults,
      currentResults
    );
    await transition(
      "publish-staged-readme",
      stagedReadme,
      currentReadme
    );
    await transition(
      "relocate-backups-for-cleanup",
      transactionRoot,
      cleanupRoot
    );
  } catch (error) {
    return committed ? cleanupDiagnostic(error) : rollback(error);
  }
  try {
    failureContext = { step: "cleanup-remove", timing: "remove" };
    await removePath(cleanupRoot, { recursive: true, force: true });
    failureContext = null;
    return {
      committed: true,
      cleanupComplete: true,
      cleanup: {
        activeBackupRoot: null,
        activeBackupRootExists: false,
        residuePaths: [],
        error: null
      }
    };
  } catch (cleanupError) {
    return cleanupDiagnostic(cleanupError);
  }
}

export function summarizeTwoRoundThroughputs(samples) {
  if (!Array.isArray(samples) || samples.length !== 2) {
    throw new Error("throughput summary requires exactly two rounds");
  }
  const ordered = [...samples].sort((left, right) => left.round - right.round);
  if (
    ordered[0].round === ordered[1].round ||
    ordered.some(
      ({ throughput }) => !Number.isFinite(throughput) || throughput <= 0
    )
  ) {
    throw new Error("throughput summary requires two distinct valid rounds");
  }
  const roundThroughputs = ordered.map(({ throughput }) => throughput);
  const minimum = Math.min(...roundThroughputs);
  const maximum = Math.max(...roundThroughputs);
  const midpoint = (minimum + maximum) / 2;
  const absoluteSpread = maximum - minimum;
  return {
    roundThroughputs,
    midpoint,
    absoluteSpread,
    relativeSpread: absoluteSpread / midpoint,
    minimum,
    maximum,
    nanosecondsPerOperation: 1e9 / midpoint
  };
}

function summarizeThroughputs(samples, rounds) {
  if (rounds === 2) {
    return summarizeTwoRoundThroughputs(samples);
  }
  if (
    rounds !== 1 ||
    !Array.isArray(samples) ||
    samples.length !== 1 ||
    samples[0].round !== 1 ||
    !Number.isFinite(samples[0].throughput) ||
    samples[0].throughput <= 0
  ) {
    throw new Error("quick throughput summary requires exactly one valid round");
  }
  const throughput = samples[0].throughput;
  return {
    roundThroughputs: [throughput],
    midpoint: throughput,
    absoluteSpread: 0,
    relativeSpread: 0,
    minimum: throughput,
    maximum: throughput,
    nanosecondsPerOperation: 1e9 / throughput
  };
}

export function validateInstalledVersions(expected, actual) {
  for (const [name, version] of expected) {
    if (actual.get(name) !== version) {
      throw new Error(
        `installed package version mismatch for ${name}: expected ${version}, received ${actual.get(name)}`
      );
    }
  }
}

export function validateSampleSet({
  phase,
  result,
  intersection,
  installedVersions,
  participants,
  mode = result?.benchmarkMode ?? "full",
  benchmarkContractHash = createBenchmarkContractHash({
    mode,
    memoryBudget: memoryBudgetFromEnvironment()
  })
}) {
  const config = getBenchmarkMode(mode);
  if (result === null || typeof result !== "object") {
    throw new Error(`missing ${phase} result`);
  }
  if (result.phase !== phase) {
    throw new Error(`${phase} result declares another phase`);
  }
  if (
    result.benchmarkVersion !== 3 ||
    result.benchmarkMode !== mode ||
    result.draft !== intersection.draft ||
    result.formatProfile !== intersection.formatProfile
  ) {
    throw new Error(`${phase} result scope metadata is invalid`);
  }
  if (
    canonicalJson(result.performanceEligibility) !==
    canonicalJson(intersection.performanceEligibility)
  ) {
    throw new Error(`${phase} result eligibility threshold is invalid`);
  }
  if (
    canonicalJson(result.performanceCorpus ?? null) !==
    canonicalJson(intersection.performanceCorpus ?? null)
  ) {
    throw new Error(`${phase} performance corpus metadata is invalid`);
  }
  if (result.intersectionSha256 !== intersection.hash) {
    throw new Error(`${phase} result intersection hash is stale`);
  }
  const participantIds = participants.map(({ id }) => id);
  if (canonicalJson(result.participants) !== canonicalJson(participantIds)) {
    throw new Error(`${phase} result participants differ from the matrix`);
  }
  if (intersection.emptyReason !== null) {
    if (result.samples.length !== 0 || result.emptyReason !== intersection.emptyReason) {
      throw new Error(`${phase} empty corpus result is invalid`);
    }
    return;
  }
  const expectedCount = participants.length * config.rounds;
  if (!Array.isArray(result.samples) || result.samples.length !== expectedCount) {
    throw new Error(`${phase} result must contain exactly ${expectedCount} samples`);
  }
  if (!Array.isArray(result.participantOrderByRound)) {
    throw new Error(`${phase} result lacks participant order`);
  }
  for (let round = 1; round <= config.rounds; round += 1) {
    const eligible = new Set(participantIds);
    const expectedOrder = getRoundOrder({
      draft: intersection.draft,
      phase,
      round
    }).filter((validator) => eligible.has(validator));
    const observedOrder = result.participantOrderByRound.find(
      (entry) => entry.round === round
    )?.validators;
    if (canonicalJson(observedOrder) !== canonicalJson(expectedOrder)) {
      throw new Error(`${phase} participant order mismatch for round ${round}`);
    }
  }

  for (const participant of participants) {
    const samples = result.samples.filter(
      (sample) => sample.validator === participant.id
    );
    if (
      samples.length !== config.rounds ||
      new Set(samples.map(({ round }) => round)).size !== config.rounds
    ) {
      throw new Error(
        `${phase} requires ${config.rounds} distinct rounds for ${intersection.draft}/${intersection.formatProfile}/${participant.id}`
      );
    }
    for (const sample of samples) {
      validateGranularSample({
        request: {
          phase,
          draft: intersection.draft,
          formatProfile: intersection.formatProfile,
          validator: participant.id,
          round: sample.round
        },
        sample,
        intersectionHash: intersection.hash,
        benchmarkContractHash,
        mode
      });
      if (
        canonicalJson(sample.performanceCorpus ?? null) !==
        canonicalJson(intersection.performanceCorpus ?? null)
      ) {
        throw new Error(`${phase} sample performance corpus is stale`);
      }
      if (
        sample.phase !== phase ||
        sample.draft !== intersection.draft ||
        sample.formatProfile !== intersection.formatProfile
      ) {
        throw new Error(`${phase} sample scope is invalid`);
      }
      if (sample.validatorVersion !== installedVersions.get(participant.id)) {
        throw new Error(
          `${phase} sample installed version mismatch for ${participant.id}`
        );
      }
      for (const field of ["operations", "seconds", "throughput"]) {
        if (!Number.isFinite(sample[field]) || sample[field] <= 0) {
          throw new Error(`${phase} sample has invalid ${field}`);
        }
      }
      const prefix = phase === "compile" ? "compile" : "execution";
      if (
        sample.warmupMinimumMilliseconds !==
          config[`${prefix}WarmupMinimumMilliseconds`] ||
        sample.warmupMilliseconds <
            config[`${prefix}WarmupMinimumMilliseconds`] ||
        sample.targetSampleMilliseconds !==
          config[`${prefix}TargetMilliseconds`] ||
        sample.minimumSampleMilliseconds !==
          config[`${prefix}MinimumSampleMilliseconds`] ||
        (!sample.singlePassExceededTarget &&
          sample.actualElapsedMilliseconds <
            config[`${prefix}MinimumSampleMilliseconds`]) ||
        !Number.isInteger(sample.passes) ||
        sample.passes < 1
      ) {
        throw new Error(`${phase} sample timing contract is invalid`);
      }
      if (phase === "compile") {
        if (
          sample.checksum !== intersection.compileChecksum ||
          sample.corpusCompileEntries !== intersection.compileEntries ||
          sample.operations !== sample.corpusCompileEntries * sample.passes
        ) {
          throw new Error(`${phase} checksum or corpus mismatch`);
        }
      } else if (
        sample.operations !== sample.corpusCases * sample.passes ||
        sample.corpusCases !== intersection.execution.cases ||
        sample.validCases !== intersection.execution.valid ||
        sample.invalidCases !== intersection.execution.invalid ||
        sample.checksum !== intersection.execution.passChecksum * sample.passes
      ) {
        throw new Error("execution checksum or corpus mismatch");
      }
      if (sample.intersectionSha256 !== intersection.hash) {
        throw new Error(`${phase} sample intersection hash is stale`);
      }
        }
  }
}

function markdownCell(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}

function errorSummary(record) {
  return [record.errorCode, record.error, record.detailErrorCode, record.detailError]
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(": ");
}

export function renderConformanceMarkdown(report) {
  const participant = validatorMatrix.find(({ id }) => id === report.validator) ??
    (typeof report.packageName === "string"
      ? { id: report.validator, packageName: report.packageName }
      : undefined);
  if (participant === undefined) {
    throw new Error(`missing validator metadata for ${report.validator}`);
  }
  const lines = [
    `# Conformance: ${participantLink({ ...participant, version: report.version })} ${report.draft}`,
    "",
    "## Report options",
    "",
    "| Profile | Options | SHA-256 |",
    "| --- | --- | --- |",
    ...Object.keys(report.reportOptions).sort().map(
      (profile) =>
        `| ${profile} | ${markdownCell(JSON.stringify(report.reportOptions[profile]))} | ${report.reportOptionsSha256[profile]} |`
    ),
    "",
    "## Counts",
    "",
    "| Profile | Status | Cases | Percentage |",
    "| --- | --- | ---: | ---: |"
  ];
  for (const profile of ["base", "format-assertion"]) {
    const profileCounts = report.countsByFormatProfile?.[profile] ?? report.counts;
    const total = statuses.reduce(
      (sum, status) => sum + (profileCounts[status] ?? 0),
      0
    );
    for (const status of statuses) {
      const count = profileCounts[status] ?? 0;
      const percentage = total === 0 ? 0 : (count / total) * 100;
      lines.push(
        `| ${profile} | ${status} | ${count} | ${percentage.toFixed(2)}% |`
      );
    }
  }

  lines.push(
    "",
    "## Non-PASS cases",
    "",
    "| Case ID | Description | Expected | Observed | Status | Error |",
    "| --- | --- | --- | --- | --- | --- |"
  );
  const failures = report.cases.filter(({ status }) => status !== "PASS");
  if (failures.length === 0) {
    lines.push("", "Every reported case has PASS status.");
  } else {
    for (const record of failures) {
      lines.push(
        `| ${markdownCell(record.id)} | ${markdownCell(record.description)} | ${record.expected} | ${markdownCell(record.observed)} | ${record.status} | ${markdownCell(errorSummary(record))} |`
      );
    }
  }

  lines.push(
    "",
    "## Detailed errors for invalid results",
    "",
    "| Case ID | Description | Status | Error |",
    "| --- | --- | --- | --- |"
  );
  const detailed = report.cases.filter(
    (record) =>
      record.observed === false ||
      record.status === "RUNTIME" ||
      record.status === "COMPILE"
  );
  if (detailed.length === 0) {
    lines.push("", "Detailed error records: 0.");
  } else {
    for (const record of detailed) {
      lines.push(
        `| ${markdownCell(record.id)} | ${markdownCell(record.description)} | ${record.status} | ${markdownCell(errorSummary(record))} |`
      );
    }
  }

  return `${lines.join("\n")}\n`;
}

export function createValidatorProfiles(reports) {
  return Object.fromEntries(
    [...reports]
      .sort((left, right) => {
        const draftDifference =
          draftIds.indexOf(left.draft) - draftIds.indexOf(right.draft);
        return draftDifference === 0
          ? compareValidatorIds(left.validator, right.validator)
          : draftDifference;
      })
      .map((report) => [
        `${report.draft}/${report.validator}`,
        {
          version: report.version,
          reportOptions: report.reportOptions,
          reportOptionsSha256: report.reportOptionsSha256
        }
      ])
  );
}

export async function writeConformanceReports(
  reports,
  { preserveExisting = false } = {}
) {
  const runRoot = path.join(
    benchmarksRoot,
    ".cache",
    `run-conformance-${process.pid}-${Date.now()}`
  );
  const stagedRoot = path.join(runRoot, "results");
  for (const report of reports) {
    const draftRoot = path.join(stagedRoot, report.draft, "conformance");
    await mkdir(draftRoot, { recursive: true });
    await writeFile(
      path.join(draftRoot, `${report.validator}.json`),
      `${JSON.stringify(report, null, 2)}\n`
    );
    await writeFile(
      path.join(draftRoot, `${report.validator}.md`),
      renderConformanceMarkdown(report)
    );
  }

  for (const draft of [...new Set(reports.map((report) => report.draft))]) {
    if (preserveExisting) {
      const targetRoot = path.join(getResultsRoot(), draft, "conformance");
      await mkdir(targetRoot, { recursive: true });
      for (const report of reports.filter((candidate) => candidate.draft === draft)) {
        await rename(
          path.join(stagedRoot, draft, "conformance", `${report.validator}.json`),
          path.join(targetRoot, `${report.validator}.json`)
        );
        await rename(
          path.join(stagedRoot, draft, "conformance", `${report.validator}.md`),
          path.join(targetRoot, `${report.validator}.md`)
        );
      }
      continue;
    }
    const targetRoot = path.join(getResultsRoot(), draft, "conformance");
    await mkdir(path.dirname(targetRoot), { recursive: true });
    try {
      await access(targetRoot);
      await rename(
        targetRoot,
        path.join(runRoot, `previous-conformance-${draft}`)
      );
    } catch (error) {
      if (error?.code !== "ENOENT") {
        throw error;
      }
    }
    await rename(path.join(stagedRoot, draft, "conformance"), targetRoot);
  }
}

function compileChecksum(entries) {
  return createHash("sha256")
    .update(entries.map(({ compileKey }) => compileKey).join("\n"))
    .digest("hex");
}

function peakRssBytes(samples) {
  const values = samples
    .map((sample) => sample?.memory?.peak?.rss)
    .filter((value) => Number.isSafeInteger(value) && value >= 0);
  return values.length === 0 ? null : Math.max(...values);
}

function mutationRecordsForValidator(summaries, validator) {
  const records = new Map();
  for (const summary of summaries) {
    for (const record of summary?.mutations?.validators?.[validator]?.records ?? []) {
      records.set(mutationRecordKey(record), record);
    }
  }
  return [...records.values()].sort((left, right) =>
    mutationRecordKey(left).localeCompare(mutationRecordKey(right))
  );
}

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function mutationDocumentSortName(validator, reports) {
  const participant = validatorMatrix.find(({ id }) => id === validator);
  return participant?.displayName ??
    reports.find((report) => report.validator === validator)?.packageName ??
    validator;
}

function safeFileToken(value) {
  const token = String(value)
    .normalize("NFKD")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
  return token.length === 0 ? "validator" : token;
}

export function mutationDocumentFilename(validator) {
  return `${safeFileToken(validator)}-${sha256(String(validator)).slice(0, 16)}.md`;
}

export function mutationViewAnchor({
  view,
  draft = null,
  formatProfile = null,
  phase
}) {
  if (
    !["scope", "draft", "global"].includes(view) ||
    phase !== "conformance" ||
    (view !== "global" && typeof draft !== "string") ||
    (view === "scope" && typeof formatProfile !== "string")
  ) {
    throw new Error("mutation view identity is invalid");
  }
  return `mutation-view-${sha256(canonicalJson({
    view,
    draft: view === "global" ? null : draft,
    formatProfile: view === "scope" ? formatProfile : null,
    phase
  }))}`;
}

function mutationEventAnchor(record) {
  return `mutation-event-${sha256(mutationRecordKey(record))}`;
}

const mutationMarkdownEventLimit = 10;

function uniqueMutationRecords(records) {
  const unique = new Map();
  for (const record of records) {
    const key = mutationRecordKey(record);
    const existing = unique.get(key);
    if (
      existing === undefined ||
      canonicalJson(record) < canonicalJson(existing)
    ) {
      unique.set(key, record);
    }
  }
  return [...unique.values()].sort((left, right) =>
    compareText(mutationRecordKey(left), mutationRecordKey(right))
  );
}

function mutationRecordsFromSummary(summary, validator) {
  return summary?.mutations?.validators?.[validator]?.records ?? [];
}

function markdownText(value) {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll("&", "&amp;")
    .replaceAll("#", "\\#")
    .replaceAll("`", "\\`")
    .replaceAll("*", "\\*")
    .replaceAll("_", "\\_")
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)")
    .replaceAll("!", "\\!")
    .replaceAll("|", "\\|")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\r", " ")
    .replaceAll("\n", " ");
}

function boundedStructuredMarkdown(value, maximumCharacters = 2048) {
  const serialized = JSON.stringify(value, null, 2) ?? String(value);
  const truncated = serialized.length > maximumCharacters;
  const visible = truncated
    ? serialized.slice(0, maximumCharacters)
    : serialized;
  return [
    ...visible.split("\n").map((line) => `    ${line}`),
    ...(truncated
      ? [
          "",
          `> [TRUNCATED: ${serialized.length} characters exceeded the ${maximumCharacters}-character Markdown limit. The full structured value remains in JSON results.]`
        ]
      : [])
  ];
}

function relatedMutationResult(record, reports) {
  const report = reports.find(
    (candidate) =>
      candidate.validator === record.validator && candidate.draft === record.draft
  );
  const candidates = (report?.cases ?? [])
    .filter((testCase) =>
      typeof record.caseId === "string"
        ? testCase.id === record.caseId
        : typeof record.schemaId === "string"
          ? testCase.schemaId === record.schemaId &&
            testCase.formatProfile === record.formatProfile
          : false
    )
    .sort((left, right) => compareText(left.id, right.id));
  const testCase =
    candidates.find(
      ({ errorCode, error, status }) =>
        errorCode !== null || error !== null || status !== "PASS"
    ) ?? candidates[0];
  const errorCode = record.errorCode ?? testCase?.errorCode ?? null;
  const error = record.error ?? testCase?.error ?? null;
  const status = testCase?.status ?? null;
  return { errorCode, error, status };
}

function mutationExplanation(record, related) {
  if (related.errorCode !== null || related.error !== null) {
    return "Conformance used disposable copies and recorded the related error or non-PASS result below.";
  }
  if (related.status === "PASS") {
    return "Conformance used a disposable copy, and the case retained PASS status.";
  }
  return "Conformance used disposable copies. Related correctness error records: 0.";
}

function mutationLinkCell(count, validator, prefix, anchor) {
  if (!Number.isInteger(count) || count <= 0 || prefix === null) {
    return String(count ?? 0);
  }
  return `[${count}](${prefix}/${mutationDocumentFilename(validator)}#${anchor})`;
}

function mutationViewsForValidator(scopes, validator) {
  const scopeViews = [];
  for (const [scopeName, scope] of [...scopes].sort(([left], [right]) =>
    compareText(left, right)
  )) {
    const separator = scopeName.indexOf("/");
    const draft = scopeName.slice(0, separator);
    const formatProfile = scopeName.slice(separator + 1);
    const records = uniqueMutationRecords(
      [scope.compileSummary, scope.executionSummary].flatMap((summary) =>
        mutationRecordsFromSummary(summary, validator)
      )
    );
    if (records.length > 0) {
      scopeViews.push({
        view: "scope",
        draft,
        formatProfile,
        phase: "conformance",
        records,
        anchor: mutationViewAnchor({
          view: "scope",
          draft,
          formatProfile,
          phase: "conformance"
        })
      });
    }
  }
  const draftNames = [...new Set(scopeViews.map(({ draft }) => draft))].sort();
  const draftViews = draftNames.flatMap((draft) => {
    const records = uniqueMutationRecords(
      scopeViews.filter((view) => view.draft === draft).flatMap((view) => view.records)
    );
    return records.length === 0
      ? []
      : [
          {
            view: "draft",
            draft,
            formatProfile: null,
            phase: "conformance",
            records,
            anchor: mutationViewAnchor({
              view: "draft",
              draft,
              phase: "conformance"
            })
          }
        ];
  });
  const globalRecords = uniqueMutationRecords(
    scopeViews.flatMap((view) => view.records)
  );
  const globalViews = globalRecords.length === 0
    ? []
    : [{
        view: "global",
        draft: null,
        formatProfile: null,
        phase: "conformance",
        records: globalRecords,
        anchor: mutationViewAnchor({ view: "global", phase: "conformance" })
      }];
  return [...globalViews, ...draftViews, ...scopeViews];
}

function renderMutationDocument({ validator, version, views, reports }) {
  const allRecords = uniqueMutationRecords(views.flatMap((view) => view.records));
  const displayedRecords = allRecords.slice(0, mutationMarkdownEventLimit);
  const displayedRecordKeys = new Set(displayedRecords.map(mutationRecordKey));
  const omittedRecordCount = allRecords.length - displayedRecords.length;
  const validatorReports = reports
    .filter((report) => report.validator === validator)
    .sort((left, right) => compareText(left.draft, right.draft));
  const lines = [
    `# Mutation report: ${markdownText(validator)}`,
    "",
    `- **Validator:** ${markdownText(validator)}`,
    `- **Version:** ${markdownText(version)}`,
    `- **Total unique mutations:** ${allRecords.length}`,
    `- **Displayed unique mutations:** ${displayedRecords.length}`,
    `- **Omitted unique mutations:** ${omittedRecordCount}`,
    "- **Source:** conformance checks on disposable schema, data, and resource copies.",
    "- **Deduplication:** validator, draft, scope, subjectId, target, mutationClass, path, kind, and stable structural before/after define one logical mutation. Tracker-local identity numbers, profile, and moment share that identity.",
    "",
    "## Configuration",
    ""
  ];
  if (validatorReports.length === 0) {
    lines.push("Conformance configurations: 0.", "");
  } else {
    for (const report of validatorReports) {
      lines.push(`### ${markdownText(report.draft)}`, "");
      lines.push(
        ...boundedStructuredMarkdown({
          reportOptions: report.reportOptions ?? null,
          reportOptionsSha256: report.reportOptionsSha256 ?? null
        }),
        ""
      );
    }
  }
  lines.push("## Linked views", "");
  for (const view of views) {
    const displayedViewRecords = view.records.filter((record) =>
      displayedRecordKeys.has(mutationRecordKey(record))
    );
    const omittedViewRecordCount = view.records.length - displayedViewRecords.length;
    const label =
      view.view === "global"
        ? "All drafts conformance"
        : view.view === "draft"
          ? `${view.draft} ${view.phase}`
          : `${view.draft}/${view.formatProfile}/${view.phase}`;
    lines.push(
      `<a id="${view.anchor}"></a>`,
      `### ${markdownText(label)}`,
      "",
      `Unique mutations in this view: ${view.records.length}`,
      ...(omittedViewRecordCount > 0
        ? [
            `Displayed mutation links: ${displayedViewRecords.length}`,
            `Omitted mutation links: ${omittedViewRecordCount}. Full records remain in JSON results.`
          ]
        : []),
      ""
    );
    for (const record of displayedViewRecords) {
      lines.push(
        `- [${markdownText(`${record.mutationTarget} ${record.mutationClass} ${record.subjectId}`)}](#${mutationEventAnchor(record)})`
      );
    }
    lines.push("");
  }
  lines.push("## Event details", "");
  for (const record of displayedRecords) {
    const related = relatedMutationResult(record, reports);
    lines.push(
      `<a id="${mutationEventAnchor(record)}"></a>`,
      `### ${markdownText(`${record.mutationTarget} ${record.mutationClass} ${record.subjectId}`)}`,
      "",
      `- **Draft:** ${markdownText(record.draft)}`,
      `- **Profile:** ${markdownText(record.formatProfile ?? "N/A")}`,
      `- **Phase:** ${markdownText(record.phase ?? "N/A")}`,
      `- **Round:** ${markdownText(record.round ?? "N/A")}`,
      `- **Moment:** ${markdownText(record.moment ?? "N/A")}`,
      `- **Target:** ${markdownText(record.mutationTarget)}`,
      `- **mutationClass:** ${markdownText(record.mutationClass)}`,
      `- **Scope:** ${markdownText(record.scope)}`,
      `- **subjectId:** ${markdownText(record.subjectId)}`,
      `- **Path:** ${markdownText(record.difference?.path ?? "N/A")}`,
      `- **Kind:** ${markdownText(record.difference?.kind ?? "N/A")}`,
      `- **Related status:** ${markdownText(related.status ?? "Unreported")}`,
      `- **Related cause/error:** ${markdownText(
        [related.errorCode, related.error].filter((value) => value !== null).join(": ") ||
          "Unreported"
      )}`,
      "",
      mutationExplanation(record, related),
      "",
      "#### Before",
      "",
      ...boundedStructuredMarkdown(record.difference?.before ?? null),
      "",
      "#### After",
      "",
      ...boundedStructuredMarkdown(record.difference?.after ?? null),
      ""
    );
  }
  return `${lines.join("\n")}\n`;
}

export function createMutationDocuments({ scopes, reports = [], versions }) {
  const validatorIds = new Set();
  for (const scope of scopes.values()) {
    for (const phase of ["compile", "execution"]) {
      const validators = scope[`${phase}Summary`]?.mutations?.validators ?? {};
      for (const [validator, details] of Object.entries(validators)) {
        if (Array.isArray(details.records) && details.records.length > 0) {
          validatorIds.add(validator);
        }
      }
    }
  }
  return [...validatorIds]
    .sort((left, right) => {
      const nominal = compareText(
        mutationDocumentSortName(left, reports),
        mutationDocumentSortName(right, reports)
      );
      return nominal === 0 ? compareText(left, right) : nominal;
    })
    .map((validator) => {
      const version = versions.get(validator) ??
        reports.find((report) => report.validator === validator)?.version;
      if (typeof version !== "string" || version.length === 0) {
        throw new Error(`mutation document lacks validator version: ${validator}`);
      }
      const views = mutationViewsForValidator(scopes, validator);
      const records = uniqueMutationRecords(views.flatMap((view) => view.records));
      const displayedRecords = records.slice(0, mutationMarkdownEventLimit);
      const content = renderMutationDocument({
        validator,
        version,
        views,
        reports
      });
      return {
        validator,
        version,
        relativePath: `mutations/${mutationDocumentFilename(validator)}`,
        eventCount: records.length,
        anchors: [
          ...views.map(({ anchor }) => anchor),
          ...displayedRecords.map((record) => mutationEventAnchor(record))
        ].sort(),
        content
      };
    });
}

export function hashMutationDocument(content) {
  return sha256(content);
}

export function createMutationDocumentManifest(documents) {
  if (!Array.isArray(documents) || documents.length === 0) {
    return null;
  }
  return {
    mutationReportVersion: 2,
    deduplication:
      "validator,draft,scope,subjectId,mutationTarget,mutationClass,path,kind,stable-before,stable-after",
    documents: documents.map((document) => ({
      validator: document.validator,
      version: document.version,
      relativePath: document.relativePath,
      eventCount: document.eventCount,
      anchors: [...document.anchors],
      sha256: hashMutationDocument(document.content)
    }))
  };
}

export async function writeMutationDocuments({
  stagedResults,
  documents,
  manifest = createMutationDocumentManifest(documents)
}) {
  if (documents.length === 0) {
    if (manifest !== null) {
      throw new Error("empty mutation documents require a null manifest");
    }
    return null;
  }
  if (manifest === null || manifest.documents.length !== documents.length) {
    throw new Error("mutation document manifest is incomplete");
  }
  const resolvedStagedResults = path.resolve(stagedResults);
  for (const document of documents) {
    const entry = manifest.documents.find(
      ({ relativePath }) => relativePath === document.relativePath
    );
    if (
      entry === undefined ||
      entry.sha256 !== hashMutationDocument(document.content)
    ) {
      throw new Error(`mutation document hash mismatch: ${document.relativePath}`);
    }
    const target = assertBenchmarkPath(path.join(stagedResults, document.relativePath));
    if (!target.startsWith(`${resolvedStagedResults}${path.sep}`)) {
      throw new Error(`mutation document escapes staged results: ${document.relativePath}`);
    }
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, document.content);
  }
  const manifestPath = assertBenchmarkPath(
    path.join(stagedResults, "mutations", "index.json")
  );
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

function maximumPeakRss(values) {
  const observed = values.filter(
    (value) => Number.isSafeInteger(value) && value >= 0
  );
  return observed.length === 0 ? null : Math.max(...observed);
}

export function summarizePhase(result, mode, intersection = null) {
  const rounds = getBenchmarkMode(mode).rounds;
  const validators = {};
  const conformanceMutations = intersection?.mutations ?? {
    countKey: [
      "validator",
      "draft",
      "scope",
      "subjectId",
      "mutationTarget",
      "mutationClass",
      "difference"
    ],
    validators: {}
  };
  const mutationValidators = {};
  const mutationValidatorIds = new Set([
    ...Object.keys(conformanceMutations.validators),
    ...result.participants
  ]);
  for (const validator of sortValidatorIds([...mutationValidatorIds])) {
    const records = new Map();
    for (const record of conformanceMutations.validators[validator]?.records ?? []) {
      records.set(mutationRecordKey(record), record);
    }
    const ordered = [...records.values()].sort((left, right) =>
      mutationRecordKey(left).localeCompare(mutationRecordKey(right))
    );
    mutationValidators[validator] = { count: ordered.length, records: ordered };
  }
  const mutations = {
    countKey: [
      "validator",
      "draft",
      "scope",
      "subjectId",
      "mutationTarget",
      "mutationClass",
      "difference"
    ],
    validators: mutationValidators
  };
  for (const validator of sortValidatorIds(result.participants)) {
    const samples = result.samples.filter(
      (sample) => sample.validator === validator
    );
    const summary = summarizeThroughputs(samples, rounds);
    summary.mutationCount = mutations.validators[validator]?.count ?? 0;
    summary.peakRssBytes = peakRssBytes(samples);
    validators[validator] = summary;
  }
  const competitorCount = Object.keys(validators).length;
  const rankingStatus =
    competitorCount < 2 ? "INSUFFICIENT_COMPETITORS" : "COMPETITIVE";
  if (rankingStatus === "COMPETITIVE") {
    const bestMidpoint = Math.max(
      ...Object.values(validators).map(({ midpoint }) => midpoint)
    );
    for (const values of Object.values(validators)) {
      values.scoreRelativeToBest = (values.midpoint / bestMidpoint) * 100;
    }
  }
  return {
    benchmarkVersion: 3,
    summaryVersion: 7,
    phase: result.phase,
    draft: result.draft,
    formatProfile: result.formatProfile,
    performanceEligibility: result.performanceEligibility,
    intersectionSha256: result.intersectionSha256,
    primaryUnit: "operations per second",
    units: {
      throughput: "operations per second",
      mutations: "unique mutation findings detected during conformance",
      peakRss: "bytes"
    },
    centerFormula:
      rounds === 1
        ? "round_1_throughput"
        : "(round_1_throughput + round_2_throughput) / 2",
    scoreFormula: "midpoint_validator / best_midpoint_in_scope * 100",
    mutationCountFormula:
      "count distinct (validator, draft, scope, subjectId, mutationTarget, mutationClass, difference)",
    peakRssFormula: "max(sample.memory.peak.rss across valid rounds)",
    ranking: { status: rankingStatus, competitorCount },
    eligibility: intersection?.eligibility ?? null,
    mutations,
    validators
  };
}

function number(value) {
  return Number(value).toLocaleString("en-US", {
    maximumFractionDigits: 0
  });
}

function score(value) {
  return value === 100 ? "100%" : `${value.toFixed(1)}%`;
}

function peakRssMiB(value) {
  return Number.isSafeInteger(value) && value >= 0
    ? `${(value / 1024 ** 2).toFixed(1)} MiB`
    : "N/A";
}

function escapeMermaidText(value) {
  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll('"', '\\"')
    .replaceAll("\r", " ")
    .replaceAll("\n", " ");
}

export function buildPerformanceChartSeries(rows) {
  const measured = rows.filter(
    ({ average }) => Number.isFinite(average) && average > 0
  );
  if (measured.length === 0) {
    throw new Error("performance chart requires at least one measured row");
  }
  const sourceValues = measured.map(({ average }) => Math.round(average));
  const maximum = Math.max(...sourceValues);
  const divisor =
    maximum >= 1_000_000 ? 1_000_000 : maximum >= 1_000 ? 1_000 : 1;
  const unit = divisor === 1_000_000 ? "M" : divisor === 1_000 ? "K" : null;
  const magnitude = 10 ** Math.floor(Math.log10(maximum));
  const yAxisMaximum =
    ((Math.floor(maximum / magnitude) + 1) * magnitude) / divisor;
  return {
    labels: measured.map(({ participant }) =>
      escapeMermaidText(
        `${participant.displayName} (${participant.version})`
      )
    ),
    values: sourceValues.map((value) => Number((value / divisor).toFixed(3))),
    divisor,
    unit,
    yAxisMaximum
  };
}

export function createGlobalConformanceSummary(
  reports,
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent
) {
  const eligibilityPolicy = createPerformanceEligibilityPolicy(
    parseEligibilityThresholdPercent(eligibilityThresholdPercent)
  );
  const totalsByScope = {};
  for (const draft of draftIds) {
    totalsByScope[draft] = {};
    for (const profile of formatProfiles) {
      const totals = reports
        .filter((report) => report.draft === draft)
        .map((report) => {
          const counts = report.countsByFormatProfile?.[profile];
          return counts === undefined
            ? null
            : statuses.reduce((total, status) => total + (counts[status] ?? 0), 0);
        })
        .filter((total) => total !== null);
      if (totals.length === 0 || new Set(totals).size !== 1) {
        throw new Error(`global conformance has inconsistent totals for ${draft}/${profile}`);
      }
      totalsByScope[draft][profile] = totals[0];
    }
  }
  const canonicalCases = draftIds.reduce(
    (total, draft) =>
      total + formatProfiles.reduce(
        (draftTotal, profile) => draftTotal + totalsByScope[draft][profile],
        0
      ),
    0
  );
  const reportByScope = new Map(
    reports.map((report) => [`${report.draft}/${report.validator}`, report])
  );
  const rows = validatorMatrix.map((participant) => {
    const cells = {};
    let pass = 0;
    for (const draft of draftIds) {
      cells[draft] = {};
      const report = reportByScope.get(`${draft}/${participant.id}`);
      for (const profile of formatProfiles) {
        if (report === undefined) {
          cells[draft][profile] = null;
          continue;
        }
        const profilePass = report.countsByFormatProfile[profile].PASS ?? 0;
        const total = totalsByScope[draft][profile];
        pass += profilePass;
        cells[draft][profile] = {
          pass: profilePass,
          total,
          ratio: total === 0 ? 0 : profilePass / total
        };
      }
    }
    return {
      id: participant.id,
      displayName: participant.displayName,
      packageName: participant.packageName,
      cells,
      total: {
        pass,
        denominator: canonicalCases,
        ratio: canonicalCases === 0 ? 0 : pass / canonicalCases
      }
    };
  });
  rows.sort((left, right) => {
    const difference = right.total.ratio - left.total.ratio;
    return difference === 0 ? compareText(left.id, right.id) : difference;
  });
  return {
    conformanceSummaryVersion: 2,
    eligibilityPolicy,
    denominatorPolicy:
      "PASS across every canonical case in all five drafts and both profiles; unsupported scopes contribute zero PASS and remain in the denominator",
    tieBreak: "validator ID ascending by JavaScript code-unit order",
    canonicalCases,
    totalsByScope,
    rows
  };
}

function conformancePercentage(ratio) {
  return `${(ratio * 100).toFixed(2)}%`;
}

export function globalConformanceTable(summary, versions) {
  const chartValues = summary.rows.map(({ total }) =>
    Number((total.ratio * 100).toFixed(3))
  );
  const labels = summary.rows.map((row) =>
    escapeMermaidText(`${row.displayName} (${versions.get(row.id)})`)
  );
  const thresholdPercent = summary.eligibilityPolicy.thresholdPercent;
  const threshold = summary.rows.map(() => thresholdPercent);
  const headers = draftIds.flatMap((draft) => [
    `${draft.replace("draft", "Draft ")} Base`,
    `${draft.replace("draft", "Draft ")} Formats`
  ]);
  const lines = [
    "## Total conformance",
    "",
    `Eligibility threshold: ${thresholdPercent}% per draft profile.`,
    "",
    "```mermaid",
    "xychart horizontal",
    '    title "Total conformance (Higher is better)"',
    `    x-axis [${labels.map((label) => `"${label}"`).join(", ")}]`,
    '    y-axis "PASS (%)" 0 --> 100',
    `    bar [${chartValues.join(", ")}]`,
    `    line [${threshold.join(", ")}]`,
    "```",
    "",
    `| Validator | ${headers.join(" | ")} | Total |`,
    `| --- | ${headers.map(() => "---:").join(" | ")} | ---: |`
  ];
  for (const row of summary.rows) {
    const participant = { ...row, version: versions.get(row.id) };
    const cells = draftIds.flatMap((draft) =>
      formatProfiles.map((profile) => {
        const cell = row.cells[draft][profile];
        return cell === null ? "N/A" : conformancePercentage(cell.ratio);
      })
    );
    lines.push(
      `| ${participantLink(participant)} | ${cells.join(" | ")} | ${conformancePercentage(row.total.ratio)} |`
    );
  }
  lines.push(
    "",
    `The line marks the exact ${thresholdPercent}% draft eligibility threshold. Total uses PASS over all canonical cases. Draft eligibility uses the exact Base and Formats fractions for that draft.`,
    "",
    `Total means PASS over all ${number(summary.canonicalCases)} canonical cases from the five drafts and both profiles. An unsupported draft or scope contributes zero PASS while its cases remain in the denominator. Cells round uniformly to two decimals. The ${thresholdPercent}% eligibility gate compares exact integer fractions. Rows sort by Total descending with a stable validator ID tie-breaker. Base and Formats must each reach ${thresholdPercent}% for the participant to qualify in that draft.`
  );
  return lines.join("\n");
}

function performanceChart(title, rows) {
  const series = buildPerformanceChartSeries(rows);
  const chartTitle =
    typeof series.unit === "string"
      ? `${title} (Higher is better, values in ${series.unit})`
      : `${title} (Higher is better)`;
  return [
    "```mermaid",
    "xychart horizontal",
    `    title "${escapeMermaidText(chartTitle)}"`,
    `    x-axis [${series.labels.map((label) => `"${label}"`).join(", ")}]`,
    `    y-axis "Average ops/s" 0 --> ${series.yAxisMaximum}`,
    `    bar [${series.values.join(", ")}]`,
    "```"
  ].join("\n");
}

function chartParticipant(participant) {
  const definition = validatorMatrix.find(({ id }) => id === participant.id);
  if (typeof definition !== "object") {
    throw new Error(`performance chart lacks validator metadata for ${participant.id}`);
  }
  return { ...definition, version: participant.version };
}

export function createValidatorVersionMap({ reports, packages }) {
  const versions = new Map();
  for (const participant of validatorMatrix) {
    const packageVersion = packages?.[participant.packageName]?.version;
    const reportVersions = new Set(
      reports
        .filter(({ validator }) => validator === participant.id)
        .map(({ version }) => version)
    );
    if (
      typeof packageVersion !== "string" ||
      packageVersion.length === 0 ||
      reportVersions.size !== 1 ||
      !reportVersions.has(packageVersion)
    ) {
      throw new Error(`validator version metadata mismatch for ${participant.id}`);
    }
    versions.set(participant.id, packageVersion);
  }
  return versions;
}

function versionedParticipants(participants, versions) {
  return participants.map((participant) => ({
    ...participant,
    version: versions.get(participant.id)
  }));
}

function participantLink(participant) {
  if (typeof participant.version !== "string" || participant.version.length === 0) {
    throw new Error(`missing validator version for ${participant.id}`);
  }
  const label = String(participant.id)
    .replaceAll("\\", "\\\\")
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
  return `[${label}](https://www.npmjs.com/package/${encodeURI(participant.packageName)}) (${participant.version})`;
}

function winnerNames(participants) {
  const links = participants.map(participantLink);
  if (links.length === 2) {
    return links.join(" and ");
  }
  if (links.length > 2) {
    return `${links.slice(0, -1).join(", ")} and ${links.at(-1)}`;
  }
  return links[0];
}

function compareIds(left, right) {
  if (left.id < right.id) {
    return -1;
  }
  if (left.id > right.id) {
    return 1;
  }
  return 0;
}

function phaseErrorStatus(phase) {
  if (phase === "compile") {
    return "COMPILE";
  }
  if (phase === "execution") {
    return "RUNTIME";
  }
  throw new Error(`unknown consolidated phase: ${phase}`);
}

function measuredMidpoint(summary, validatorId) {
  const midpoint = summary?.validators?.[validatorId]?.midpoint;
  return Number.isFinite(midpoint) && midpoint > 0 ? midpoint : null;
}

export function normalizedGeometricScore(rates, references) {
  if (rates.length === 0) {
    throw new Error("normalized geometric score requires at least one rate");
  }
  if (rates.length !== references.length) {
    throw new Error(
      "normalized geometric score requires the same number of rates and references"
    );
  }
  const meanLogRatio = rates.reduce((total, rate, index) => {
    const reference = references[index];
    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error("normalized geometric score rates must be finite and greater than zero");
    }
    if (!Number.isFinite(reference) || reference <= 0) {
      throw new Error(
        "normalized geometric score references must be finite and greater than zero"
      );
    }
    if (rate > reference) {
      throw new Error("normalized geometric score rate cannot exceed its reference");
    }
    return total + Math.log(rate) - Math.log(reference);
  }, 0) / rates.length;
  const result = 100 * Math.exp(meanLogRatio);
  if (!Number.isFinite(result) || result <= 0) {
    throw new Error("normalized geometric score result must be finite and greater than zero");
  }
  return result;
}

function globalErrorRecords(reports, validator, profile, status) {
  return reports
    .filter((report) => report.validator === validator)
    .flatMap((report) =>
      report.cases
        .filter(
          (record) =>
            record.formatProfile === profile && record.status === status
        )
        .map((record) => ({
          draft: report.draft,
          profile,
          caseId: record.id,
          description: record.description,
          status: record.status,
          message: errorSummary(record)
        }))
    )
    .sort((left, right) => {
      const draftDifference = draftIds.indexOf(left.draft) - draftIds.indexOf(right.draft);
      if (draftDifference !== 0) {
        return draftDifference;
      }
      return left.caseId.localeCompare(right.caseId);
    });
}

export function createGlobalPerformanceSummary(
  scopes,
  reports = [],
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent
) {
  const eligibilityPolicy = createPerformanceEligibilityPolicy(
    parseEligibilityThresholdPercent(eligibilityThresholdPercent)
  );
  for (const scope of scopes.values()) {
    for (const phase of ["compile", "execution"]) {
      const observedPolicy = scope.intersections?.[phase]?.eligibility?.policy;
      if (
        observedPolicy !== undefined &&
        canonicalJson(observedPolicy) !== canonicalJson(eligibilityPolicy)
      ) {
        throw new Error("global summary eligibility threshold is inconsistent");
      }
    }
  }
  const versions = new Map();
  for (const report of reports) {
    if (typeof report.version !== "string" || report.version.length === 0) {
      continue;
    }
    const current = versions.get(report.validator);
    if (current !== undefined && current !== report.version) {
      throw new Error(`validator version metadata mismatch for ${report.validator}`);
    }
    versions.set(report.validator, report.version);
  }
  const phases = {};

  for (const phase of ["compile", "execution"]) {
    const evaluated = validatorMatrix.map((participant) => {
      const inputsByDraft = {};
      const scopeStates = {};
      const phaseSummaries = [];
      for (const draft of draftIds) {
        const draftInputs = {};
        for (const profile of formatProfiles) {
          const scopeName = `${draft}/${profile}`;
          const scope = scopes.get(scopeName);
          if (scope === undefined) {
            throw new Error(`global summary lacks scope ${scopeName}`);
          }
          const supportsDraft = participant.drafts.includes(draft);
          const supportsPhase =
            phase !== "compile" ||
            getCompileParticipants(draft).some(({ id }) => id === participant.id);
          const eligibility = scope.intersections?.[phase]?.eligibility ?? null;
          const excluded = eligibility?.roster?.excluded?.find(
            ({ id }) => id === participant.id
          );
          const midpoint = measuredMidpoint(
            scope[`${phase}Summary`],
            participant.id
          );
          phaseSummaries.push(scope[`${phase}Summary`]);
          draftInputs[profile === "base" ? "baseMidpoint" : "formatsMidpoint"] =
            midpoint;
          if (!supportsDraft) {
            scopeStates[scopeName] = { eligible: false, reasons: [{ code: "DRAFT_UNSUPPORTED" }] };
          } else if (!supportsPhase || midpoint === null) {
            scopeStates[scopeName] = {
              eligible: false,
              reasons: excluded?.reasons ?? [{ code: "MEASUREMENT_UNAVAILABLE" }]
            };
          } else if (excluded !== undefined) {
            scopeStates[scopeName] = { eligible: false, reasons: excluded.reasons };
          } else {
            scopeStates[scopeName] = { eligible: true, reasons: [] };
          }
        }
        inputsByDraft[draft] = draftInputs;
      }
      const mutationRecords = mutationRecordsForValidator(
        phaseSummaries,
        participant.id
      );
      return {
        id: participant.id,
        packageName: participant.packageName,
        version: versions.get(participant.id),
        inputsByDraft,
        scopeStates,
        mutationCount: mutationRecords.length,
        mutationRecords,
        peakRssBytes: maximumPeakRss(
          phaseSummaries.map(
            (summary) => summary?.validators?.[participant.id]?.peakRssBytes
          )
        )
      };
    });
    function createRanking() {
      const requiredScopes = draftIds.flatMap((draft) =>
        formatProfiles.map((profile) => `${draft}/${profile}`)
      );
      const prepared = evaluated.map((participant) => {
        const missingScopes = requiredScopes
          .filter((scope) => participant.scopeStates[scope].eligible !== true)
          .map((scope) => ({
            scope,
            reasons: participant.scopeStates[scope].reasons
          }));
        return {
          ...participant,
          coverage: `${requiredScopes.length - missingScopes.length}/${requiredScopes.length}`,
          requiredScopes,
          missingScopes
        };
      });
      const includedCandidates = prepared.filter(
        ({ missingScopes }) => missingScopes.length === 0
      );
      const referencesByDraft = Object.fromEntries(
        draftIds.map((draft) => [
          draft,
          {
            baseMidpoint:
              includedCandidates.length === 0
                ? null
                : Math.max(
                    ...includedCandidates.map(
                      ({ inputsByDraft }) => inputsByDraft[draft].baseMidpoint
                    )
                  ),
            formatsMidpoint:
              includedCandidates.length === 0
                ? null
                : Math.max(
                    ...includedCandidates.map(
                      ({ inputsByDraft }) => inputsByDraft[draft].formatsMidpoint
                    )
                  )
          }
        ])
      );
      const included = includedCandidates.map((participant) => {
        const baseRates = draftIds.map(
          (draft) => participant.inputsByDraft[draft].baseMidpoint
        );
        const formatsRates = draftIds.map(
          (draft) => participant.inputsByDraft[draft].formatsMidpoint
        );
        const baseReferences = draftIds.map(
          (draft) => referencesByDraft[draft].baseMidpoint
        );
        const formatsReferences = draftIds.map(
          (draft) => referencesByDraft[draft].formatsMidpoint
        );
        const baseOpsPerSecond = baseRates.reduce((total, rate) => total + rate, 0);
        const formatsOpsPerSecond = formatsRates.reduce(
          (total, rate) => total + rate,
          0
        );
        const status = phaseErrorStatus(phase);
        const baseRecords = globalErrorRecords(
          reports,
          participant.id,
          "base",
          status
        );
        const formatRecords = globalErrorRecords(
          reports,
          participant.id,
          "format-assertion",
          status
        );
        return {
          ...participant,
          baseOpsPerSecond,
          formatsOpsPerSecond,
          averageOpsPerSecond: (baseOpsPerSecond + formatsOpsPerSecond) / 2,
          baseScore: normalizedGeometricScore(baseRates, baseReferences),
          formatsScore: normalizedGeometricScore(formatsRates, formatsReferences),
          balancedScore: normalizedGeometricScore(
            [...baseRates, ...formatsRates],
            [...baseReferences, ...formatsReferences]
          ),
          errors: {
            base: { count: baseRecords.length, records: baseRecords },
            formats: { count: formatRecords.length, records: formatRecords }
          }
        };
      });
      const rankingStatus =
        included.length < 2 ? "INSUFFICIENT_COMPETITORS" : "COMPETITIVE";
      included.sort((left, right) => {
        const difference = right.balancedScore - left.balancedScore;
        return difference === 0 ? compareIds(left, right) : difference;
      });
      const excluded = prepared
        .filter(({ missingScopes }) => missingScopes.length !== 0)
        .sort((left, right) => compareValidatorIds(left.id, right.id));
      return {
        requiredScopes,
        requiredCoverage: `${requiredScopes.length}/${requiredScopes.length}`,
        status: rankingStatus,
        competitorCount: included.length,
        referencesByDraft,
        included,
        excluded
      };
    }
    phases[phase] = createRanking();
  }

  return {
    globalSummaryVersion: 11,
    drafts: draftIds,
    requiredCoverage: `${draftIds.length * formatProfiles.length}/${draftIds.length * formatProfiles.length}`,
    units: {
      throughput: "operations per second",
      allDraftsRawIndices:
        "operations per second inherited from summed scope midpoint rates",
      mutations: "unique mutation findings detected during conformance",
      peakRss: "bytes"
    },
    formulas: {
      reference:
        "maximum eligible midpoint in each phase, draft and profile scope",
      ratio: "validator midpoint / scope reference",
      baseOpsPerSecond:
        "sum(base midpoint operations per second across all five drafts)",
      formatsOpsPerSecond:
        "sum(format-assertion midpoint operations per second across all five drafts)",
      averageOpsPerSecond: "(baseOpsPerSecond + formatsOpsPerSecond) / 2",
      baseScore: "100 * exp(sum(log(base ratio)) / 5)",
      formatsScore: "100 * exp(sum(log(format-assertion ratio)) / 5)",
      balancedScore: "100 * exp(sum(log(all base and format-assertion ratios)) / 10)",
      errorCount: "sum(matching status records across all configured drafts)",
      mutationCount:
        "count distinct (validator, draft, scope, subjectId, mutationTarget, mutationClass, difference) across conformance profiles",
      peakRss: "max(scope peakRssBytes across valid samples)"
    },
    eligibility: {
      policy: eligibilityPolicy,
      allDrafts: "eligible in base and format-assertion for all five configured drafts in the phase"
    },
    phases,
    conformance:
      reports.length === 0
        ? null
        : createGlobalConformanceSummary(reports, eligibilityThresholdPercent)
  };
}

function excludedGlobalParticipants(excluded) {
  if (excluded.length === 0) {
    return [];
  }
  return [
    "",
    `Excluded from this ranking:\n\n${excluded
      .map((participant) => {
        const reasons = participant.missingScopes
          .map(
            ({ scope, reasons: scopeReasons }) =>
              `${scope}: ${scopeReasons.map(eligibilityReasonLabel).join(", ")}`
          )
          .join(". ");
        return `- ${participantLink(participant)}: coverage ${participant.coverage}. Reason: ${reasons}.`;
      })
      .join("\n")}`
  ];
}

function eligibilityReasonLabel(reason) {
  if (reason.code !== "PASS_THRESHOLD_NOT_MET") {
    return reason.code;
  }
  return `${reason.code}(${reason.profile} ${reason.pass}/${reason.total} < ${reason.thresholdPercent}%)`;
}

export function globalPerformanceTable(
  phase,
  phaseSummary,
  chartTitle = null
) {
  if (phase !== "compile" && phase !== "execution") {
    throw new Error(`unknown global phase: ${phase}`);
  }
  const competitive = phaseSummary.status !== "INSUFFICIENT_COMPETITORS";
  const best = competitive ? phaseSummary.included[0]?.balancedScore ?? null : null;
  const winners = phaseSummary.included.filter(
    ({ balancedScore }) => balancedScore === best
  );
  const phaseLabel = phase === "compile" ? "Compile" : "Execution";
  const lines = [
    `### All Drafts ${phaseLabel}`,
    "",
    competitive
      ? `Leader: ${winnerNames(winners)} — Balanced score ${score(best)}`
      : "INSUFFICIENT_COMPETITORS: this ranking requires at least two qualified competitors."
  ];
  if (chartTitle !== null && competitive) {
    lines.push(
      "",
      [
        "```mermaid",
        "xychart horizontal",
        `    title "${escapeMermaidText(`${chartTitle} Balanced score (Higher is better)`)}"`,
        `    x-axis [${phaseSummary.included
          .map((participant) =>
            `"${escapeMermaidText(`${chartParticipant(participant).displayName} (${participant.version})`)}"`
          )
          .join(", ")}]`,
        '    y-axis "Balanced score" 0 --> 100',
        `    bar [${phaseSummary.included
          .map(({ balancedScore }) => Number(balancedScore.toFixed(3)))
          .join(", ")}]`,
        "```"
      ].join("\n")
    );
  }
  lines.push(
    "",
    "| Validator | Base ops/s | Formats ops/s | Average ops/s | Base score | Formats score | Balanced score |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
    ...phaseSummary.included.map(
      (participant) =>
        `| ${participantLink(participant)} | ${number(participant.baseOpsPerSecond)} | ${number(participant.formatsOpsPerSecond)} | ${number(participant.averageOpsPerSecond)} | ${score(participant.baseScore)} | ${score(participant.formatsScore)} | ${score(participant.balancedScore)} |`
    ),
    ...excludedGlobalParticipants(phaseSummary.excluded)
  );
  return lines.join("\n");
}

export function createGlobalErrorDocuments(globalSummary) {
  const documents = [];
  for (const phase of ["compile", "execution"]) {
    const status = phaseErrorStatus(phase);
    const participants = new Map();
    for (const participant of globalSummary.phases[phase].included) {
      participants.set(participant.id, participant);
    }
    for (const participant of [...participants.values()].sort(
      (left, right) => compareValidatorIds(left.id, right.id)
    )) {
      for (const [profile, errorKey] of [
        ["base", "base"],
        ["format-assertion", "formats"]
      ]) {
        const records = participant.errors[errorKey].records;
        const lines = [
          `# All drafts ${profile} ${participantLink(participant)} ${status} errors`,
          "",
          `Phase: ${phase}`,
          "",
          `Exact matching records: ${records.length}`,
          ""
        ];
        if (records.length === 0) {
          lines.push(
            `Result: 0 matching ${status} errors across all configured drafts for ${profile}/${participantLink(participant)}.`
          );
        } else {
          lines.push(
            "| Draft | Profile | Case ID | Description | Status | Error |",
            "| --- | --- | --- | --- | --- | --- |"
          );
          for (const record of records) {
            lines.push(
              `| ${record.draft} | ${record.profile} | ${markdownCell(record.caseId)} | ${markdownCell(record.description)} | ${record.status} | ${markdownCell(record.message)} |`
            );
          }
        }
        documents.push({
          phase,
          profile,
          validator: participant.id,
          status,
          count: records.length,
          records,
          relativePath: `global-errors/${phase}/${profile}/${participant.id}-${status}.md`,
          content: `${lines.join("\n")}\n`
        });
      }
    }
  }
  return documents;
}

function errorDocumentPath(phase, profile, validatorId, status) {
  return `errors/${phase}/${profile}/${validatorId}-${status}.md`;
}

function recordsForErrorDocument(report, profile, status) {
  return report.cases.filter(
    (record) => record.formatProfile === profile && record.status === status
  );
}

export function renderErrorMarkdown(document) {
  const validator = participantLink(document.participant);
  const lines = [
    `# ${document.draft} ${document.profile} ${validator} ${document.status} errors`,
    "",
    `Phase: ${document.phase}`,
    "",
    `Exact matching records: ${document.records.length}`,
    ""
  ];
  if (document.records.length === 0) {
    lines.push(
      `Result: 0 matching ${document.status} errors for ${document.draft}/${document.profile}/${validator}.`
    );
    return `${lines.join("\n")}\n`;
  }
  lines.push(
    "| Case ID | Description | Status | Error |",
    "| --- | --- | --- | --- |"
  );
  for (const record of document.records) {
    lines.push(
      `| ${markdownCell(record.id)} | ${markdownCell(record.description)} | ${record.status} | ${markdownCell(errorSummary(record))} |`
    );
  }
  return `${lines.join("\n")}\n`;
}

export function createErrorDocuments({ draft, reports, participants }) {
  const reportByValidator = new Map(
    reports
      .filter((report) => report.draft === draft)
      .map((report) => [report.validator, report])
  );
  const documents = [];
  for (const phase of ["compile", "execution"]) {
    const status = phaseErrorStatus(phase);
    for (const profile of formatProfiles) {
      for (const participant of sortParticipantsByName(participants)) {
        const report = reportByValidator.get(participant.id);
        if (report === undefined) {
          throw new Error(`missing conformance report for ${draft}/${participant.id}`);
        }
        const document = {
          draft,
          phase,
          profile,
          validator: participant.id,
          participant: { ...participant, version: report.version },
          status,
          records: recordsForErrorDocument(report, profile, status)
        };
        documents.push({
          ...document,
          count: document.records.length,
          relativePath: errorDocumentPath(
            phase,
            profile,
            participant.id,
            status
          ),
          content: renderErrorMarkdown(document)
        });
      }
    }
  }
  return documents;
}

export function consolidatedPerformanceTable({
  title,
  phase,
  draft,
  baseSummary,
  formatSummary,
  reports,
  participants,
  errorLinkPrefix,
  mutationLinkPrefix = null,
  headingLevel = 2,
  chartTitle = null
}) {
  const status = phaseErrorStatus(phase);
  const reportByValidator = new Map(
    reports
      .filter((report) => report.draft === draft)
      .map((report) => [report.validator, report])
  );
  const allRows = participants.map((participant) => {
    const report = reportByValidator.get(participant.id);
    if (report === undefined) {
      throw new Error(`missing conformance report for ${draft}/${participant.id}`);
    }
    const baseMidpoint = measuredMidpoint(baseSummary, participant.id);
    const formatMidpoint = measuredMidpoint(formatSummary, participant.id);
    const mutationRecords = mutationRecordsForValidator(
      [baseSummary, formatSummary],
      participant.id
    );
    return {
      participant,
      baseMidpoint,
      formatMidpoint,
      combined:
        baseMidpoint === null || formatMidpoint === null
          ? null
          : (baseMidpoint + formatMidpoint) / 2,
      mutationCount: mutationRecords.length,
      peakRssBytes: maximumPeakRss([
        baseSummary?.validators?.[participant.id]?.peakRssBytes,
        formatSummary?.validators?.[participant.id]?.peakRssBytes
      ]),
      baseErrors: recordsForErrorDocument(report, "base", status).length,
      formatErrors: recordsForErrorDocument(
        report,
        "format-assertion",
        status
      ).length
    };
  });
  const rows = allRows.filter(({ combined }) => combined !== null);
  rows.sort((left, right) => {
    if (left.combined === null && right.combined !== null) {
      return 1;
    }
    if (left.combined !== null && right.combined === null) {
      return -1;
    }
    if (left.combined !== null && right.combined !== null) {
      const difference = right.combined - left.combined;
      if (difference !== 0) {
        return difference;
      }
    }
    return compareIds(left.participant, right.participant);
  });
  const measured = rows.filter(({ combined }) => combined !== null);
  const competitive = measured.length >= 2;
  const bestCombined =
    !competitive
      ? null
      : Math.max(...measured.map(({ combined }) => combined));
  const winners = measured
    .filter(({ combined }) => combined === bestCombined)
    .map(({ participant }) => participant);
  const lines = [
    `${"#".repeat(headingLevel)} ${title}`,
    "",
    competitive
      ? `Leader: ${winnerNames(winners)} — ${number(bestCombined)} ops/s (100%)`
      : "INSUFFICIENT_COMPETITORS: this ranking requires at least two qualified competitors."
  ];
  if (chartTitle !== null && competitive) {
    lines.push(
      "",
      performanceChart(
        chartTitle,
        rows.map(({ participant, combined }) => ({
          participant,
          average: combined
        }))
      )
    );
  }
  lines.push(
    "",
    "| Validator | Base ops/s | Formats ops/s | Average ops/s | Score | Base errors | Format errors | Mutations | Peak RSS |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |"
  );
  for (const row of rows) {
    const baseHref = `${errorLinkPrefix}/${errorDocumentPath(phase, "base", row.participant.id, status).slice("errors/".length)}`;
    const formatHref = `${errorLinkPrefix}/${errorDocumentPath(phase, "format-assertion", row.participant.id, status).slice("errors/".length)}`;
    const mutationCell = mutationLinkCell(
      row.mutationCount,
      row.participant.id,
      mutationLinkPrefix,
      mutationViewAnchor({ view: "draft", draft, phase: "conformance" })
    );
    lines.push(
      `| ${participantLink(row.participant)} | ${row.baseMidpoint === null ? "N/A" : number(row.baseMidpoint)} | ${row.formatMidpoint === null ? "N/A" : number(row.formatMidpoint)} | ${row.combined === null ? "N/A" : number(row.combined)} | ${!competitive || row.combined === null ? "N/A" : score((row.combined / bestCombined) * 100)} | [${row.baseErrors}](${baseHref}) | [${row.formatErrors}](${formatHref}) | ${mutationCell} | ${peakRssMiB(row.peakRssBytes)} |`
    );
  }
  const excluded = allRows.filter(({ combined }) => combined === null);
  if (excluded.length > 0) {
    lines.push(
      "",
      "Excluded from this ranking:",
      "",
      ...excluded.map((row) => {
        const reasons = new Set();
        if (row.baseMidpoint === null) {
          const exclusions = baseSummary.eligibility?.roster?.excluded?.find(
            ({ id }) => id === row.participant.id
          )?.reasons;
          for (const reason of exclusions ?? [{ code: "MEASUREMENT_UNAVAILABLE" }]) {
            reasons.add(eligibilityReasonLabel(reason));
          }
        }
        if (row.formatMidpoint === null) {
          const exclusions = formatSummary.eligibility?.roster?.excluded?.find(
            ({ id }) => id === row.participant.id
          )?.reasons;
          for (const reason of exclusions ?? [{ code: "MEASUREMENT_UNAVAILABLE" }]) {
            reasons.add(eligibilityReasonLabel(reason));
          }
        }
        return `- ${participantLink(row.participant)}: ${[...reasons].join(", ")}.`;
      })
    );
  }
  return lines.join("\n");
}

export function performanceTable(
  title,
  summary,
  allParticipants,
  { headingLevel = 2, mutationLinkPrefix = null } = {}
) {
  const eligibleIds = new Set(
    summary.eligibility?.roster?.eligible ?? allParticipants.map(({ id }) => id)
  );
  const participants = allParticipants
    .filter(({ id }) => eligibleIds.has(id))
    .sort((left, right) => {
    const leftValues = summary.validators[left.id];
    const rightValues = summary.validators[right.id];
    if (leftValues === undefined && rightValues !== undefined) {
      return 1;
    }
    if (leftValues !== undefined && rightValues === undefined) {
      return -1;
    }
    if (leftValues !== undefined && rightValues !== undefined) {
      const difference = rightValues.midpoint - leftValues.midpoint;
      if (difference !== 0) {
        return difference;
      }
    }
    return compareIds(left, right);
    });
  const measurable = participants.filter(({ id }) => {
    const midpoint = summary.validators[id]?.midpoint;
    return Number.isFinite(midpoint) && midpoint > 0;
  });
  const competitive = measurable.length >= 2;
  const bestMidpoint =
    !competitive
      ? null
      : Math.max(...measurable.map(({ id }) => summary.validators[id].midpoint));
  const winners = measurable.filter(
    ({ id }) => summary.validators[id].midpoint === bestMidpoint
  );
  const lines = [
    `${"#".repeat(headingLevel)} ${title}`,
    "",
    competitive
      ? `Leader: ${winnerNames(winners)} — ${number(bestMidpoint)} ops/s (100%)`
      : "INSUFFICIENT_COMPETITORS: this ranking requires at least two qualified competitors.",
    "",
    "Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.",
    "",
    "| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |",
    "| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |"
  ];
  for (const participant of participants) {
    const values = summary.validators[participant.id];
    if (values === undefined) {
      const mutationCount =
        summary.mutations?.validators?.[participant.id]?.count ?? 0;
      const mutationCell = mutationLinkCell(
        mutationCount,
        participant.id,
        mutationLinkPrefix,
        mutationLinkPrefix === null || mutationCount <= 0
          ? ""
          : mutationViewAnchor({
              view: "scope",
              draft: summary.draft,
              formatProfile: summary.formatProfile,
              phase: "conformance"
            })
      );
      lines.push(
        `| ${participantLink(participant)} | N/A | N/A | N/A | N/A | N/A | ${mutationCell} | N/A |`
      );
      continue;
    }
    const mutationCount =
      values.mutationCount ??
      summary.mutations?.validators?.[participant.id]?.count ??
      0;
    const mutationCell = mutationLinkCell(
      mutationCount,
      participant.id,
      mutationLinkPrefix,
      mutationLinkPrefix === null || mutationCount <= 0
        ? ""
          : mutationViewAnchor({
              view: "scope",
              draft: summary.draft,
              formatProfile: summary.formatProfile,
              phase: "conformance"
            })
    );
    lines.push(
      `| ${participantLink(participant)} | ${number(values.roundThroughputs[0])} | ${values.roundThroughputs.length === 1 ? "N/A" : number(values.roundThroughputs[1])} | ${values.roundThroughputs.length === 1 ? "N/A" : `${number(values.minimum)} to ${number(values.maximum)}`} | ${number(values.midpoint)} | ${competitive ? score((values.midpoint / bestMidpoint) * 100) : "N/A"} | ${mutationCell} | ${peakRssMiB(values.peakRssBytes)} |`
    );
  }
  const excluded = summary.eligibility?.roster?.excluded ?? [];
  if (excluded.length > 0) {
    lines.push(
      "",
      "Excluded from this ranking:",
      "",
      ...excluded.map(({ id, reasons }) => {
        const participant = allParticipants.find((candidate) => candidate.id === id);
        if (participant === undefined) {
          throw new Error(`eligibility lacks participant metadata: ${id}`);
        }
        return `- ${participantLink(participant)}: ${reasons.map(eligibilityReasonLabel).join(", ")}.`;
      })
    );
  }
  return lines.join("\n");
}

export function downloadTable(snapshot, participants) {
  const ordered = [...participants].sort(compareIds);
  return [
    "Weekly downloads show npm adoption volume for the snapshot period.",
    "",
    "| Validator | Weekly downloads |",
    "| --- | ---: |",
    ...ordered.map(
      (participant) =>
        `| ${participantLink(participant)} | ${number(snapshot.packages[participant.packageName].weeklyDownloads)} |`
    )
  ].join("\n");
}

function conformanceTable(reports, formatProfile, versions) {
  const reportByValidator = new Map(
    reports.map((report) => [report.validator, report])
  );
  const orderedReports = getParticipants(reports[0].draft).map(({ id }) =>
    reportByValidator.get(id)
  );
  const lines = [
    "## Conformance",
    "",
    "The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.",
    "",
    "| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: |"
  ];
  for (const report of orderedReports) {
    const counts = report.countsByFormatProfile[formatProfile];
    const participant = getParticipants(report.draft).find(
      ({ id }) => id === report.validator
    );
    lines.push(
      `| ${report.draft} | ${participantLink({ ...participant, version: versions.get(participant.id) })} | ${counts.PASS} | ${counts.WRONG} | ${counts.COMPILE} | ${counts.RUNTIME} | ${counts.UNSUPPORTED} |`
    );
  }
  return lines.join("\n");
}

export function renderRootSummary({ environment }) {
  return `${[
    "# JSON Schema Validator Bench",
    "",
    `Environment: Node ${environment.node.version} on ${environment.platform}/${environment.architecture}.`,
    "",
    `Suite commit: ${environment.suite.commit}`,
    "",
    ...draftIds.flatMap((draft) => [
      `- [${draft}](${draft}/summary.md)`,
    ]),
    "",
    "Each draft keeps independent base and format-assertion corpora. The root README and global summary publish qualified All Drafts Compile and Execution aggregates."
  ].join("\n")}\n`;
}

export function renderDraftSummary({ draft, scopes, reports, snapshot, versions }) {
  const lines = [`# ${draft} benchmark results`, ""];
  const participants = versionedParticipants(getParticipants(draft), versions);
  const baseScope = scopes.get(`${draft}/base`);
  const formatScope = scopes.get(`${draft}/format-assertion`);
  lines.push(
    consolidatedPerformanceTable({
      title: "Compile consolidation",
      phase: "compile",
      draft,
      baseSummary: baseScope.compileSummary,
      formatSummary: formatScope.compileSummary,
      reports,
      participants,
      errorLinkPrefix: "errors",
      mutationLinkPrefix: "../mutations"
    }),
    "",
    consolidatedPerformanceTable({
      title: "Execution consolidation",
      phase: "execution",
      draft,
      baseSummary: baseScope.executionSummary,
      formatSummary: formatScope.executionSummary,
      reports,
      participants,
      errorLinkPrefix: "errors",
      mutationLinkPrefix: "../mutations"
    }),
    ""
  );
  for (const formatProfile of formatProfiles) {
    const scope = scopes.get(`${draft}/${formatProfile}`);
    const compileIntersection = scope.intersections?.compile ?? scope.intersection;
    const executionIntersection = scope.intersections?.execution ?? scope.intersection;
    const performanceCorpora = scope.performanceCorpora ?? {
      compile: scope.performanceCorpus ?? null,
      execution: scope.performanceCorpus ?? null
    };
    lines.push(
      `# Profile: ${formatProfile}`,
      "",
      `Compile eligible roster: ${compileIntersection.eligibility?.roster?.retention ?? "legacy"}. Intersection: ${compileIntersection.counts.total} cases and ${compileIntersection.counts.compileEntries} compile entries. Roster SHA-256: \`${compileIntersection.eligibility?.roster?.sha256 ?? "N/A"}\`.`,
      "",
      `Execution eligible roster: ${executionIntersection.eligibility?.roster?.retention ?? "legacy"}. Intersection: ${executionIntersection.counts.total} cases and ${executionIntersection.counts.compileEntries} compile entries. Roster SHA-256: \`${executionIntersection.eligibility?.roster?.sha256 ?? "N/A"}\`.`,
      ...["compile", "execution"].flatMap((phase) => {
        const performanceCorpus = performanceCorpora[phase];
        return performanceCorpus === null
          ? []
          : [
              "",
              `${phase === "compile" ? "Compile" : "Execution"} Quick performance corpus: ${performanceCorpus.selected.executionCases} cases (${performanceCorpus.selected.validCases} valid and ${performanceCorpus.selected.invalidCases} invalid) and ${performanceCorpus.selected.compileEntries} compile entries. Selection SHA-256: \`${performanceCorpus.selectionSha256}\`.`
            ];
      }),
      "",
      performanceTable(
        "Compile ranking",
        scope.compileSummary,
        participants,
        { mutationLinkPrefix: "../mutations" }
      ),
      "",
      performanceTable(
        "Execution ranking",
        scope.executionSummary,
        participants,
        { mutationLinkPrefix: "../mutations" }
      ),
      "",
      conformanceTable(reports, formatProfile, versions),
      ""
    );
  }
  lines.push(
    "## npm snapshot",
    "",
    `Period: ${snapshot.start} through ${snapshot.end}. Retrieved at ${snapshot.retrievedAt}.`,
    "",
    downloadTable(snapshot, participants)
  );
  lines.push(
    "",
    "## Limitations",
    "",
    "Format behavior, runtime state, hardware, power state, and operating-system load affect results. Compile N/A identifies a validate-only API or an unavailable compile measurement."
  );
  return `${lines.join("\n")}\n`;
}

function participantList(versions) {
  return draftIds.map(
    (draft) =>
      `- **${draft}:** ${versionedParticipants(getParticipants(draft), versions).map(participantLink).join(", ")}`
  );
}

function draft6MainTables(scopes, reports, versions) {
  const baseScope = scopes.get("draft6/base");
  const formatScope = scopes.get("draft6/format-assertion");
  if (baseScope === undefined || formatScope === undefined) {
    throw new Error("README lacks reporting scopes for draft6");
  }
  return [
    "## Draft 6 results",
    "",
    consolidatedPerformanceTable({
      title: "Draft 6 compile",
      phase: "compile",
      draft: "draft6",
      baseSummary: baseScope.compileSummary,
      formatSummary: formatScope.compileSummary,
      reports,
      participants: versionedParticipants(getParticipants("draft6"), versions),
      errorLinkPrefix: "results/draft6/errors",
      mutationLinkPrefix: "results/mutations",
      headingLevel: 3,
      chartTitle: "Draft-06 compile"
    }),
    "",
    consolidatedPerformanceTable({
      title: "Draft 6 execution",
      phase: "execution",
      draft: "draft6",
      baseSummary: baseScope.executionSummary,
      formatSummary: formatScope.executionSummary,
      reports,
      participants: versionedParticipants(getParticipants("draft6"), versions),
      errorLinkPrefix: "results/draft6/errors",
      mutationLinkPrefix: "results/mutations",
      headingLevel: 3,
      chartTitle: "Draft-06 execution"
    }),
    ""
  ];
}

function allDraftTables(globalSummary) {
  const lines = ["## All drafts results", ""];
  for (const phase of ["compile", "execution"]) {
    const phaseLabel = phase === "compile" ? "Compile" : "Execution";
    lines.push(
      globalPerformanceTable(
        phase,
        globalSummary.phases[phase],
        `All Drafts ${phaseLabel}`
      ),
      ""
    );
  }
  return lines;
}

export function deriveLastRunMetadata({
  mode,
  previousEnvironment,
  sampleResults,
  pipelineStartedAt = null,
  reportEndedAt
}) {
  if (mode !== "quick" && mode !== "full") {
    throw new Error("last-run mode must be quick or full");
  }
  const reportEndedMilliseconds = Date.parse(reportEndedAt);
  if (!Number.isFinite(reportEndedMilliseconds)) {
    throw new Error("last-run report completion must be ISO-8601");
  }
  const peakRssValues = sampleResults.flatMap((result) =>
    (result.samples ?? []).map((sample) => sample?.memory?.peak?.rss)
  );
  if (
    peakRssValues.length === 0 ||
    peakRssValues.some((value) => !Number.isFinite(value) || value < 0)
  ) {
    throw new Error("last-run samples lack valid peak RSS telemetry");
  }

  if (pipelineStartedAt !== null) {
    const startedMilliseconds = Date.parse(pipelineStartedAt);
    if (
      !Number.isFinite(startedMilliseconds) ||
      startedMilliseconds > reportEndedMilliseconds
    ) {
      throw new Error("pipeline start must be valid and precede report completion");
    }
    return {
      mode,
      completedAt: reportEndedAt,
      totalDurationMilliseconds: reportEndedMilliseconds - startedMilliseconds,
      peakBenchmarkRssBytes: Math.max(...peakRssValues)
    };
  }

  const completedAt =
    previousEnvironment?.lastRun?.completedAt ??
    previousEnvironment?.endedAt ??
    sampleResults
      .map(({ endedAt }) => endedAt)
      .filter((value) => Number.isFinite(Date.parse(value)))
      .sort()
      .at(-1) ??
    null;
  return {
    mode,
    completedAt,
    totalDurationMilliseconds:
      previousEnvironment?.lastRun?.totalDurationMilliseconds ?? null,
    peakBenchmarkRssBytes: Math.max(...peakRssValues)
  };
}

function humanBytes(value) {
  if (!Number.isFinite(value) || value < 0) {
    return "N/A";
  }
  const units = ["B", "KiB", "MiB", "GiB", "TiB"];
  let amount = value;
  let unit = 0;
  while (amount >= 1024 && unit < units.length - 1) {
    amount /= 1024;
    unit += 1;
  }
  const digits = unit === 0 ? 0 : amount >= 10 ? 1 : 2;
  return `${amount.toFixed(digits)} ${units[unit]}`;
}

function humanDuration(value) {
  if (!Number.isFinite(value) || value < 0) {
    return "N/A";
  }
  const totalSeconds = value / 1000;
  if (totalSeconds < 60) {
    return `${totalSeconds.toFixed(3)} s`;
  }
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes} min ${(totalSeconds - minutes * 60).toFixed(3)} s`;
}

function renderLastRun(environment) {
  const run = environment.lastRun;
  const cpuModels = environment.cpu.models.join(", ");
  return [
    "## Last run",
    "",
    `- **Mode:** ${run.mode === "quick" ? "Quick" : "Full"}`,
    ...(environment.diagnostic?.diagnostic === true
      ? [
          `- **Publication:** Diagnostic refresh of ${environment.diagnostic.refreshedValidator}. Refreshed validators in this cohort: ${environment.diagnostic.refreshedValidators.join(", ")}.`
        ]
      : []),
    `- **Completed (UTC):** ${run.completedAt ?? "N/A"}`,
    `- **Total duration:** ${humanDuration(run.totalDurationMilliseconds)}`,
    `- **Node.js version:** ${environment.node.version}`,
    `- **OS/platform:** ${environment.platform} ${environment.osRelease} (${environment.architecture})`,
    `- **CPU:** ${cpuModels} (${environment.cpu.count} logical cores)`,
    `- **System memory total:** ${humanBytes(environment.totalMemoryBytes)}`,
    `- **Peak benchmark RSS:** ${humanBytes(run.peakBenchmarkRssBytes)}`,
    `- **JSON Schema Test Suite commit:** \`${environment.suite.commit}\``,
    `- **Eligibility threshold:** ${environment.performanceEligibility.thresholdPercent}%`,
    `- **Benchmark contract hash:** \`${environment.benchmarkContractSha256}\``,
    ""
  ];
}

export function renderBenchmarkReadme({
  mode = "full",
  diagnostic = null,
  scopes,
  reports,
  environment,
  snapshot,
  versions,
  globalSummary = createGlobalPerformanceSummary(scopes, reports)
}) {
  const quick = mode === "quick";
  const thresholdPercent =
    globalSummary.eligibility.policy.thresholdPercent;
  const discoveredCaseCount = draftIds.reduce((total, draft) => {
    const report = reports.find((candidate) => candidate.draft === draft);
    return total + (report?.cases.length ?? 0);
  }, 0);
  return `${[
    benchmarkTitle(mode, diagnostic),
    "",
    ...(diagnostic === null
      ? []
      : [
          `> Diagnostic publication for \`${diagnostic.refreshedValidator}\`. Run the full ${mode === "quick" ? "Quick " : ""}benchmark before official publication.`,
          ""
        ]),
    ...whySection,
    "",
    "## Install from a clone",
    "",
    "Node.js 22 or later is required. From the cloned project root, install the exact dependency graph from `package-lock.json`:",
    "",
    "```bash",
    "git clone <repository-url>",
    "cd <repository-directory>",
    "npm ci",
    "```",
    "",
    "Replace `<repository-url>` and `<repository-directory>` with the clone URL and local directory name.",
    "",
    "## Root commands",
    "",
    "Use Quick for diagnostic change checks. Use Full for canonical publication results. Run Full before publishing.",
    "",
    "Run the harness:",
    "",
    "```bash",
    "npm test",
    "```",
    "",
    "Run Quick:",
    "",
    "```bash",
    "npm run benchmark -- --quick",
    "```",
    "",
    "Refresh one validator against a compatible Full cohort:",
    "",
    "```bash",
    "npm run benchmark -- --validator <canonical-id>",
    "```",
    "",
    "Refresh one validator against a compatible Quick cohort:",
    "",
    "```bash",
    "npm run benchmark -- --quick --validator <canonical-id>",
    "```",
    "",
    "A validator refresh requires a complete compatible publication for the same base mode. Changes to the environment, benchmark contract, suite, locks, threshold, rounds, roster, eligibility, or common PASS corpus require a complete run first.",
    "",
    "Set the atomic Base and Formats eligibility threshold with a decimal percentage from 0 through 100:",
    "",
    "```bash",
    "npm run benchmark -- --eligibility-threshold-percent 98.5",
    "```",
    "",
    "Run Full:",
    "",
    "```bash",
    "npm run benchmark",
    "```",
    "",
    ...renderLastRun(environment),
    globalConformanceTable(globalSummary.conformance, versions),
    "",
    ...draft6MainTables(scopes, reports, versions),
    ...allDraftTables(globalSummary),
    "## How to read these results",
    "",
    "Draft tables use the arithmetic Average of their Base and Formats midpoints. The relative Score divides that draft-level Average by the best Average in the same phase and multiplies the ratio by 100.",
    "",
    `All-drafts tables show three raw aggregated indices before the normalized scores. Base ops/s sums the ${draftIds.length} Base midpoints, Formats ops/s sums the ${draftIds.length} Formats midpoints, and Average ops/s equals their arithmetic mean. These columns inherit ops/s units from their scope midpoints. Base score and Formats score use normalized geometric means across ${draftIds.length} scopes. Balanced score uses all ${draftIds.length * formatProfiles.length} scopes and alone determines the leader and row order.`,
    "",
    "Compile error links open COMPILE records. Execution error links open RUNTIME records.",
    "",
    "N/A marks an unavailable measurement. Compile N/A identifies a validate-only API or unavailable compile measurement.",
    "",
    "Draft charts plot measured Average ops/s values. All-drafts charts plot Balanced score rather than the raw Average ops/s index. Draft tables retain N/A entries, while all-drafts eligibility excludes incomplete participants.",
    "",
    "## Detailed draft summaries",
    "",
    ...draftIds.map(
      (draft) =>
        `- [${draft} detailed summary](results/${draft}/summary.md)`
    ),
    "",
    "## Methodology",
    "",
    "### Participants",
    "",
    `Period: ${snapshot.start} through ${snapshot.end}. Retrieved at ${snapshot.retrievedAt}.`,
    "",
    downloadTable(snapshot, versionedParticipants(validatorMatrix, versions)),
    "",
    "### Participants by draft",
    "",
    "Every participant listed for a draft runs conformance in both `base` and `format-assertion`. One atomic roster per draft governs both profiles. Compile intersects that roster with participants that expose Compile capability. Participant links use the package names recorded in `results/packages.json` and verified against npm.",
    "",
    ...participantList(versions),
    "",
    "### Profiles",
    "",
    "For draft4, draft6 and draft7, `base` contains the standard suite outside the official optional format assertion directories, including each draft's core format behavior. `format-assertion` contains the official `optional/format/*` cases.",
    "",
    "For draft2019-09 and draft2020-12, `base` treats `format` as an annotation. `format-assertion` enables the official optional format assertion cases. Draft2020-12 also includes its `optional/format-assertion` suite in that profile.",
    "",
    "```mermaid",
    "flowchart TD",
    '    A["We maintain a fixed JSON Schema suite"] --> B["We run five drafts"]',
    '    B --> C["We evaluate Base and Formats"]',
    '    C --> D["We measure conformance for every validator"]',
    '    D --> E{"We apply the configurable eligibility gate (98% default)"}',
    '    E -->|Eligible| F["We add the validator to the draft roster"]',
    '    E -->|Below gate| G["We publish diagnostic results"]',
    '    F --> H["We build the common PASS corpus"]',
    '    H --> I["We measure Compile with fresh complete construction"]',
    '    H --> J["We measure Execution with a reusable callable"]',
    '    I --> K["We publish draft results: Base, Formats, and Average"]',
    '    J --> K',
    '    K --> L{"Does the validator qualify across all five drafts?"}',
    '    L -->|Below gate| G',
    '    L -->|Yes| M["We consolidate validators that qualify across all five drafts"]',
    '    M --> N["We publish All Drafts Compile and Execution"]',
    '    N --> O["We normalize scope midpoints"]',
    '    O --> P["We calculate geometric scores with equal weight per scope"]',
    "```",
    "",
    "### Conformance and common PASS corpus",
    "",
    "We measure conformance for every configured validator against every discovered case in Base and Formats. We preserve each `PASS`, `WRONG`, `COMPILE`, `RUNTIME` and `UNSUPPORTED` result in the reports and participant matrix.",
    "",
    `We calculate the Base and Formats PASS fractions independently. We compare exact integer fractions and require each fraction to reach the configured ${thresholdPercent}% gate. Every non-PASS status reduces its profile fraction. We add a validator to one atomic draft roster when both profiles reach the gate. Execution uses that roster directly, while Compile intersects it with validators that expose Compile capability.`,
    "",
    "We retain every excluded validator and its exact reasons in diagnostic results. We build each common phase corpus from cases where every validator in that phase roster reports `PASS`. A ranking requires at least two qualified competitors. Smaller rosters publish `INSUFFICIENT_COMPETITORS`; competitive leader, relative score, and chart fields start with two competitors.",
    "",
    "We publish two hashes for each phase intersection. The performance identity hash covers the policy, relevant suite and format configuration, eligible roster, and common corpus. Compatible performance cache entries share this identity. The artifact hash also covers excluded-roster diagnostics, mutations, and all source-report hashes.",
    "",
    "### Compile",
    "",
    "We measure one complete fresh construction per Compile operation: adapter factory and context creation, vendor construction, format and metaschema registration, resource registration, and schema compilation. We prepare the neutral corpus and disposable schema and resource copies before the clock starts. Primitive schemas, including `true` and `false`, enter each fresh adapter directly. Compile `N/A` identifies a validate-only API or unavailable compile measurement.",
    "",
    "### Execution",
    "",
    "We prepare each reusable callable and its correctness-check data before the Execution clock starts. We then measure complete passes over the common corpus with one isolated mutable measurement set per worker and round. `reusable-sync` exposes synchronous compilation, `reusable-async` resolves asynchronous setup before reuse, and `validate-only` calls validation directly through the vendor API. Any boolean result change or memory-budget violation fails the sample.",
    "",
    "### Timing and scoring",
    "",
    quick
      ? `In Quick mode, we evaluate all ${discoveredCaseCount.toLocaleString("en-US")} discovered cases for conformance and select each performance corpus by deterministic SHA-256 case-ID rank. We cap a scope at ${quickPerformanceCorpusContract.maximumCompileEntriesPerScope} compile entries and ${quickPerformanceCorpusContract.maximumExecutionCasesPerScope} execution cases, preserve valid and invalid cases, and measure one complete pass per eligible validator. We record selection hashes and counts in \`results/environment.json\` and each phase's \`samples.json\`.`
      : "In Full mode, we evaluate every discovered conformance case and measure the complete common corpus. We keep integrity checks and baseline resets outside operation clocks. We warm complete corpus passes for at least 100 ms, then measure complete passes toward a 500 ms target with a normal minimum of 350 ms. Each active validator receives two isolated samples in canonical-name order with validator ID as the deterministic tie-breaker.",
    "",
    quick
      ? "Higher ops/s is better. Each scope reports its observed Quick pass. We calculate the scoped relative Score as `midpoint / bestMidpoint * 100`, which is a normalized relative performance index. The best scoped midpoint scores exactly 100%, and rows sort by midpoint ops/s descending with validator ID for deterministic ties."
      : "Higher ops/s is better. Each scope reports both rounds, their range, and their arithmetic midpoint. We calculate the scoped relative Score as `midpoint / bestMidpoint * 100`, a normalized relative performance index. Statistical significance and percentage improvement require separate analysis. The best scoped midpoint scores exactly 100%, and rows sort by midpoint ops/s descending with validator ID for deterministic ties.",
    "",
    "Draft tables retain the arithmetic Average of their Base and Formats midpoints for one draft and phase. In All Drafts tables, Base ops/s and Formats ops/s sum five scope midpoints, and Average ops/s is the arithmetic mean of those sums. All three are raw aggregated indices with inherited ops/s units. Complete traversal throughput remains scoped to each draft and profile. We keep N/A measurements last.",
    "",
    `For All Drafts, we require atomic eligibility at ${thresholdPercent}% in Base and Formats across all five drafts. We set each phase-and-scope reference to the fastest midpoint in the common All Drafts roster and divide each validator midpoint by that reference. We calculate Base score and Formats score as five-scope geometric means, then calculate Balanced score as the ten-scope geometric mean with equal weight per scope. Balanced score also equals \`sqrt(Base score * Formats score)\` within floating-point precision. Balanced score determines the leader and row order, with validator ID as the deterministic tie-breaker. The raw indices provide context. A validator scores 100 only by matching every relevant scope reference. The highest All Drafts score can therefore be below 100.`,
    "",
    "### Mutations",
    "",
    "Conformance detects schema, data, and resource mutations on disposable copies. We deduplicate findings by `(validator, draft, scope, subjectId, mutationTarget, mutationClass, difference)` and retain every event in JSON. Each validator report renders the first 10 findings in deterministic order, states its omitted count, and links readers to the complete JSON record. Performance Compile and Execution use separate copies. Performance rankings use throughput and score metrics.",
    "",
    "### Memory",
    "",
    "We record Peak RSS as the maximum absolute resident-set size across valid rounds in a scope. Draft tables take the maximum across profiles, while All Drafts JSON takes the maximum across all valid scopes. Markdown renders MiB, JSON stores integer bytes as `peakRssBytes`, and missing samples remain `N/A`. Rankings and charts use throughput and score metrics.",
    "",
    "### Reproducibility",
    "",
    "We pin the npm dependency graph, npm metadata snapshot, and JSON Schema Test Suite commit and tree. We keep the suite checkout and resumable checkpoints under `.cache/`, and we record package, corpus, intersection and sample hashes in the generated artifacts.",
    "",
    "On a clean clone, we use `npm ci` for exact dependencies and `npm test` for the local suite. `npm run benchmark` prepares the pinned suite checkout and runs Full. The `--quick` flag uses the same suite with a reduced performance corpus. Only `npm run metadata:sync` refreshes npm metadata. We stage and validate Quick diagnostics or the Full publication contract before a coordinated transactional publication of `README.md` and `results/`. The transaction rolls back failures before both paths commit. Because the public layout has two root paths, concurrent readers can observe the rename window.",
    "",
    "Canonical results come from a controlled Linux host. CI validates tests and artifact integrity. Record the environment and benchmark contract hash for every published run.",
    "",
    "## Status definitions",
    "",
    "- `PASS`: observed validation matches the suite expectation.",
    "- `WRONG`: the validator returned the opposite boolean.",
    "- `COMPILE`: the reusable profile rejected the schema.",
    "- `RUNTIME`: validation threw or fast and detailed profiles diverged.",
    "- `UNSUPPORTED`: the common preflight or adapter declared a known unsupported capability.",
    "",
    "The global conformance table reports PASS percentage for every draft and profile. Total divides PASS by the complete canonical denominator across all five drafts and both profiles. Unsupported scopes contribute zero PASS and keep their cases in the denominator. Rows sort by Total descending with validator ID as the stable tie-breaker.",
    "",
    "## Results",
    "",
    "- `results/index.json` records the result format, benchmark mode, drafts and profiles.",
    "- `results/environment.json` records runtime and hashes.",
    "- `results/packages.json` records package versions, tarballs, and integrities.",
    "- `results/validators.json` records validator profiles.",
    "- `results/global-summary.json` records one All Drafts ranking per phase with raw draft midpoints, summed Base and Formats ops/s indices, their arithmetic Average ops/s index, per-scope references, geometric Base, Formats and Balanced scores, mutation counts, peak RSS bytes, eligibility and exclusions.",
    "- `results/global-errors/` contains the exact records summed by each linked all-drafts error count, including explicit zero-record pages.",
    "- `results/mutations/` contains one bounded Markdown mutation report for each validator with recorded mutations plus a hashed inventory. Each report renders at most 10 deterministic event details while its total and the JSON results remain complete.",
    "- `results/<draft>/conformance/` contains full JSON and Markdown reports.",
    "- `results/<draft>/profiles/<profile>/intersections/` contains phase-specific eligibility, rosters, hashes, intersections, and retention data.",
    "- `results/<draft>/profiles/<profile>/<phase>/` contains raw phase samples and summaries for the exact eligible roster.",
    "- `results/<draft>/summary.md` contains rankings per profile.",
    "- `results/summary.md` indexes all configured drafts.",
    "",
    "## Contributing",
    "",
    "[Read the contribution guide](contribute.md)",
    "",
    "## Licensing and third-party materials",
    "",
    "Original code and documentation are Copyright Masquerade Circus and licensed under [Apache-2.0](LICENSE).",
    "",
    `The benchmark corpus comes from the JSON Schema Test Suite. JSON Schema Test Suite commit: \`${environment.suite.commit}\`. Copyright (c) 2012 Julian Berman. The corpus remains under the MIT License. See [THIRD_PARTY_NOTICES](THIRD_PARTY_NOTICES) for its full terms and attribution.`,
    "",
    "Dependencies, bundled metaschema snapshots, and other third-party materials retain their own licenses. The third-party notices also point to the existing AJV and Redocly AJV metaschema notices."
  ].join("\n")}\n`;
}

export function benchmarkTitle(mode = "full", diagnostic = null) {
  if (mode !== "quick" && mode !== "full") {
    throw new Error("benchmark title mode must be quick or full");
  }
  if (diagnostic !== null) {
    return `# JSON Schema Validator Bench (${mode === "quick" ? "quick diagnostic" : "diagnostic"})`;
  }
  return `# JSON Schema Validator Bench${mode === "quick" ? " (quick)" : ""}`;
}

export function createResultsIndex(
  mode,
  mutationManifest = null,
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent,
  diagnostic = null
) {
  if (mode !== "quick" && mode !== "full") {
    throw new Error("results index mode must be quick or full");
  }
  return {
    resultsVersion: 10,
    benchmarkMode: mode,
    eligibilityThresholdPercent: parseEligibilityThresholdPercent(
      eligibilityThresholdPercent
    ).percent,
    publicationWarning: diagnostic === null
      ? mode === "quick" ? "Run Full before publishing." : null
      : `Diagnostic publication. Run the full ${mode === "quick" ? "Quick " : ""}benchmark before official publication.`,
    ...(diagnostic === null
      ? {}
      : {
          diagnostic: {
            diagnostic: true,
            refreshedValidator: diagnostic.validator,
            refreshedValidators: [...diagnostic.refreshedValidators]
          }
        }),
    drafts: draftIds,
    formatProfiles,
    ...(mutationManifest === null
      ? {}
      : {
          mutationDocuments: {
            manifest: "mutations/index.json",
            count: mutationManifest.documents.length,
            mutationReportVersion: mutationManifest.mutationReportVersion
          }
        }),
    ...(mode === "quick"
      ? { performanceCorpus: quickPerformanceCorpusContract }
      : {})
  };
}

export function packageInventoryNames(packageJson) {
  const dependencies = packageJson?.dependencies;
  if (
    dependencies === null ||
    typeof dependencies !== "object" ||
    Array.isArray(dependencies)
  ) {
    throw new Error("benchmark package dependencies must be an object");
  }
  return Object.keys(dependencies).sort();
}

async function readJson(relativePath) {
  return JSON.parse(
    await readFile(path.join(benchmarksRoot, relativePath), "utf8")
  );
}

async function readPackageMetadata(name) {
  const packagePath = path.join(
    benchmarksRoot,
    "node_modules",
    ...name.split("/"),
    "package.json"
  );
  return readJson(path.relative(benchmarksRoot, packagePath));
}

async function writeStaged(stagedRoot, relativePath, content) {
  const target = assertBenchmarkPath(path.join(stagedRoot, relativePath));
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
}

export async function generateFinalReport({
  mode = "full",
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent,
  validator = null
} = {}) {
  const config = getBenchmarkMode(mode);
  const eligibilityPolicy = createPerformanceEligibilityPolicy(
    parseEligibilityThresholdPercent(eligibilityThresholdPercent)
  );
  const resultsRoot = getResultsRoot();
  const reportStarted = Date.now();
  let previousEnvironment = null;
  let previousIndex = null;
  try {
    previousEnvironment = JSON.parse(
      await readFile(path.join(resultsRoot, "environment.json"), "utf8")
    );
    previousIndex = JSON.parse(
      await readFile(path.join(resultsRoot, "index.json"), "utf8")
    );
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
  const benchmarkContractHash = createBenchmarkContractHash({
    mode,
    memoryBudget: memoryBudgetFromEnvironment(),
    eligibilityThresholdPercent
  });
  const packageJson = await readJson("package.json");
  const packageLockRaw = await readFile(
    path.join(benchmarksRoot, "package-lock.json")
  );
  const packageLock = JSON.parse(packageLockRaw);
  if (packageLock.lockfileVersion !== 3) {
    throw new Error("benchmark package lock must use lockfileVersion 3");
  }
  const installedPackages = new Map();
  const npmSnapshotLockRaw = await readFile(
    path.join(benchmarksRoot, "npm-snapshot-lock.json")
  );
  const snapshot = JSON.parse(npmSnapshotLockRaw);
  if (
    snapshot.snapshotVersion !== 1 ||
    typeof snapshot.start !== "string" ||
    typeof snapshot.end !== "string" ||
    !Number.isFinite(Date.parse(snapshot.retrievedAt))
  ) {
    throw new Error("npm snapshot metadata is incomplete");
  }
  for (const name of packageInventoryNames(packageJson)) {
    const metadata = await readPackageMetadata(name);
    installedPackages.set(name, metadata.version);
    const locked = packageLock.packages[`node_modules/${name}`];
    if (
      locked === undefined ||
      locked.version !== metadata.version ||
      typeof locked.integrity !== "string" ||
      typeof locked.resolved !== "string"
    ) {
      throw new Error(`package lock metadata mismatch for ${name}`);
    }
    const snap = snapshot.packages[name];
    if (
      snap === undefined ||
      snap.version !== metadata.version ||
      snap.integrity !== locked.integrity ||
      snap.tarball !== locked.resolved ||
      snap.license !== (metadata.license ?? null) ||
      canonicalJson(snap.engines) !== canonicalJson(metadata.engines ?? null) ||
      !Number.isInteger(snap.weeklyDownloads) ||
      snap.weeklyDownloads < 0
    ) {
      throw new Error(`npm snapshot is stale for ${name}`);
    }
  }
  validateInstalledVersions(
    new Map(Object.entries(packageJson.dependencies)),
    installedPackages
  );
  const installedValidators = new Map(
    validatorMatrix.map(({ id, packageName }) => [
      id,
      installedPackages.get(packageName)
    ])
  );

  const reports = [];
  const reportHashes = {};
  for (const draft of draftIds) {
    for (const { id } of getParticipants(draft)) {
      const relativePath = `${draft}/conformance/${id}.json`;
      const raw = await readFile(path.join(resultsRoot, relativePath));
      reports.push(JSON.parse(raw));
      reportHashes[`${draft}/${id}`] = sha256(raw);
    }
  }
  const scopes = new Map();
  const performanceHashes = {};
  const sampleResults = [];
  let suiteArtifacts = null;
  for (const draft of draftIds) {
    for (const formatProfile of formatProfiles) {
      const scopePath = `${draft}/profiles/${formatProfile}`;
      const compileRaw = await readFile(
        path.join(resultsRoot, scopePath, "compile/samples.json")
      );
      const executionRaw = await readFile(
        path.join(resultsRoot, scopePath, "execution/samples.json")
      );
      const compileResult = JSON.parse(compileRaw);
      const executionResult = JSON.parse(executionRaw);
      sampleResults.push(compileResult, executionResult);
      const phaseData = {};
      for (const [phase, result] of [
        ["compile", compileResult],
        ["execution", executionResult]
      ]) {
        const artifacts = await loadBenchmarkArtifacts({
          draft,
          formatProfile,
          phase,
          eligibilityThresholdPercent
        });
        suiteArtifacts ??= artifacts;
        const performanceCorpus = derivePerformanceCorpus({
          mode,
          intersection: artifacts.intersection,
          cases: artifacts.suite.cases
        });
        const manifestCases = new Map(
          artifacts.suite.cases.map((testCase) => [testCase.id, testCase])
        );
        const cases = performanceCorpus.caseIds.map((id) => manifestCases.get(id));
        const validationContext = {
          draft,
          formatProfile,
          hash: artifacts.intersectionHash,
          emptyReason: artifacts.intersection.emptyReason,
          performanceCorpus: performanceCorpus.metadata,
          performanceEligibility: artifacts.intersection.eligibility.policy,
          compileChecksum: compileChecksum(performanceCorpus.compileEntries),
          compileEntries: performanceCorpus.compileEntries.length,
          execution: {
            cases: cases.length,
            valid: cases.filter(({ expected }) => expected === true).length,
            invalid: cases.filter(({ expected }) => expected === false).length,
            inputHash: sha256(canonicalJson(cases.map(({ data }) => data))),
            passChecksum: cases.reduce(
              (total, testCase, index) =>
                total + (index + 1) * (testCase.expected ? 3 : 7),
              0
            )
          }
        };
        const participants = artifacts.intersection.participants.map(({ id }) => {
          const participant = validatorMatrix.find((candidate) => candidate.id === id);
          if (participant === undefined) {
            throw new Error(`intersection has unknown eligible participant: ${id}`);
          }
          return participant;
        });
        validateSampleSet({
          phase,
          result,
          intersection: validationContext,
          installedVersions: installedValidators,
          participants,
          benchmarkContractHash,
          mode
        });
        phaseData[phase] = { artifacts, performanceCorpus };
      }
      const key = `${draft}/${formatProfile}`;
      scopes.set(key, {
        intersections: {
          compile: phaseData.compile.artifacts.intersection,
          execution: phaseData.execution.artifacts.intersection
        },
        performanceCorpora: {
          compile: phaseData.compile.performanceCorpus.metadata,
          execution: phaseData.execution.performanceCorpus.metadata
        },
        compileSummary: summarizePhase(
          compileResult,
          mode,
          phaseData.compile.artifacts.intersection
        ),
        executionSummary: summarizePhase(
          executionResult,
          mode,
          phaseData.execution.artifacts.intersection
        )
      });
      performanceHashes[key] = {
        compileSamples: sha256(compileRaw),
        executionSamples: sha256(executionRaw),
        intersections: {
          compile: phaseData.compile.artifacts.intersectionHash,
          execution: phaseData.execution.artifacts.intersectionHash
        },
        intersectionArtifacts: {
          compile: phaseData.compile.artifacts.artifactHash,
          execution: phaseData.execution.artifacts.artifactHash
        }
      };
    }
  }
  const suiteLockRaw = await readFile(
    path.join(benchmarksRoot, "suite-lock.json")
  );
  const manifestRaw = await readFile(
    path.join(resultsRoot, "suite-manifest.json")
  );
  const validators = createValidatorProfiles(reports);
  const diagnostic = validator === null
    ? null
    : {
        validator,
        refreshedValidator: validator,
        ...createDiagnosticPublication({
          previousDiagnostic: previousIndex?.diagnostic ?? null,
          validator
        })
      };
  const cohortIdentity = await createBenchmarkCohortIdentity({
    mode,
    eligibilityThresholdPercent,
    packageLockSha256: sha256(packageLockRaw),
    npmSnapshotLockSha256: sha256(npmSnapshotLockRaw),
    suiteLockSha256: sha256(suiteLockRaw)
  });
  const reportEnded = Date.now();
  const pipelineStartedAt = process.env.BENCHMARK_PIPELINE_STARTED_AT ?? null;
  const preserveRunEnvironment = pipelineStartedAt === null && previousEnvironment !== null;
  const cpuModels = preserveRunEnvironment
    ? previousEnvironment.cpu.models
    : [...new Set(os.cpus().map(({ model }) => model))];
  const lastRun = deriveLastRunMetadata({
    mode,
    previousEnvironment,
    sampleResults,
    pipelineStartedAt,
    reportEndedAt: new Date(reportEnded).toISOString()
  });
  const environment = {
    startedAt: new Date(reportStarted).toISOString(),
    endedAt: new Date(reportEnded).toISOString(),
    durationMilliseconds: reportEnded - reportStarted,
    node: {
      version: preserveRunEnvironment
        ? previousEnvironment.node.version
        : process.version,
      v8: preserveRunEnvironment ? previousEnvironment.node.v8 : process.versions.v8
    },
    platform: preserveRunEnvironment ? previousEnvironment.platform : process.platform,
    architecture: preserveRunEnvironment
      ? previousEnvironment.architecture
      : process.arch,
    osRelease: preserveRunEnvironment ? previousEnvironment.osRelease : os.release(),
    cpu: {
      count: preserveRunEnvironment
        ? previousEnvironment.cpu.count
        : os.cpus().length,
      models: cpuModels
    },
    totalMemoryBytes: preserveRunEnvironment
      ? previousEnvironment.totalMemoryBytes
      : os.totalmem(),
    powerState: preserveRunEnvironment ? previousEnvironment.powerState : null,
    lastRun,
    packages: snapshot.packages,
    suite: {
      commit: suiteArtifacts.suite.manifest.commit,
      tree: suiteArtifacts.suite.manifest.tree
    },
    hashes: {
      packageLock: sha256(packageLockRaw),
      suiteLock: sha256(suiteLockRaw),
      suiteManifest: sha256(manifestRaw),
      conformance: reportHashes,
      performance: performanceHashes
    },
    performanceCorpora: Object.fromEntries(
      [...scopes].map(([key, scope]) => [key, scope.performanceCorpora])
    ),
    benchmarkMode: mode,
    publicationWarning: diagnostic === null
      ? mode === "quick" ? "Run the full benchmark before publication." : null
      : `Diagnostic publication. Run the full ${mode === "quick" ? "Quick " : ""}benchmark before official publication.`,
    ...(diagnostic === null ? {} : { diagnostic }),
    cohortIdentity,
    benchmarkConstants: config,
    performanceEligibility: eligibilityPolicy,
    benchmarkContractSha256: benchmarkContractHash
  };
  const globalSummary = createGlobalPerformanceSummary(
    scopes,
    reports,
    eligibilityThresholdPercent
  );
  globalSummary.publication = diagnostic === null
    ? { diagnostic: false, benchmarkMode: mode }
    : {
        diagnostic: true,
        benchmarkMode: mode,
        refreshedValidator: validator,
        refreshedValidators: [...diagnostic.refreshedValidators]
      };
  const versions = createValidatorVersionMap({
    reports,
    packages: snapshot.packages
  });
  const mutationDocuments = createMutationDocuments({
    scopes,
    reports,
    versions
  });
  const mutationManifest = createMutationDocumentManifest(mutationDocuments);
  environment.hashes.mutationDocuments =
    mutationManifest === null
      ? null
      : {
          manifest: sha256(`${JSON.stringify(mutationManifest, null, 2)}\n`),
          documents: Object.fromEntries(
            mutationManifest.documents.map((document) => [
              document.relativePath,
              document.sha256
            ])
          )
        };
  const index = createResultsIndex(
    mode,
    mutationManifest,
    eligibilityThresholdPercent,
    diagnostic
  );
  const summaryMarkdown = renderRootSummary({ environment });
  const readme = renderBenchmarkReadme({
    mode,
    diagnostic,
    scopes,
    reports,
    environment,
    snapshot,
    versions,
    globalSummary
  });
  const runRoot = path.join(
    benchmarksRoot,
    ".cache",
    `run-expansion-${process.pid}-${Date.now()}`
  );
  const stagedResults = path.join(runRoot, "results");
  await mkdir(stagedResults, { recursive: true });
  await cp(
    path.join(resultsRoot, "suite-manifest.json"),
    path.join(stagedResults, "suite-manifest.json")
  );
  for (const draft of draftIds) {
    await cp(
      path.join(resultsRoot, draft),
      path.join(stagedResults, draft),
      { recursive: true }
    );
  }
  await writeStaged(runRoot, "results/index.json", `${JSON.stringify(index, null, 2)}\n`);
  await writeStaged(runRoot, "results/environment.json", `${JSON.stringify(environment, null, 2)}\n`);
  await writeStaged(runRoot, "results/packages.json", `${JSON.stringify(snapshot, null, 2)}\n`);
  await writeStaged(runRoot, "results/validators.json", `${JSON.stringify(validators, null, 2)}\n`);
  await writeStaged(
    runRoot,
    "results/global-summary.json",
    `${JSON.stringify(globalSummary, null, 2)}\n`
  );
  await writeStaged(runRoot, "results/npm-snapshot.json", `${JSON.stringify(snapshot, null, 2)}\n`);
  await writeStaged(runRoot, "results/summary.md", summaryMarkdown);
  await writeMutationDocuments({
    stagedResults,
    documents: mutationDocuments,
    manifest: mutationManifest
  });
  for (const document of createGlobalErrorDocuments(globalSummary)) {
    await writeStaged(
      runRoot,
      `results/${document.relativePath}`,
      document.content
    );
  }
  for (const draft of draftIds) {
    const draftReports = reports.filter((report) => report.draft === draft);
    for (const report of draftReports) {
      await writeStaged(
        runRoot,
        `results/${draft}/conformance/${report.validator}.md`,
        renderConformanceMarkdown(report)
      );
    }
    await writeStaged(
      runRoot,
      `results/${draft}/summary.md`,
      renderDraftSummary({
        draft,
        scopes,
        reports: draftReports,
        snapshot,
        versions
      })
    );
    for (const document of createErrorDocuments({
      draft,
      reports: draftReports,
      participants: getParticipants(draft)
    })) {
      await writeStaged(
        runRoot,
        `results/${draft}/${document.relativePath}`,
        document.content
      );
    }
    for (const formatProfile of formatProfiles) {
      const scope = scopes.get(`${draft}/${formatProfile}`);
      await writeStaged(
        runRoot,
        `results/${draft}/profiles/${formatProfile}/compile/summary.json`,
        `${JSON.stringify(scope.compileSummary, null, 2)}\n`
      );
      await writeStaged(
        runRoot,
        `results/${draft}/profiles/${formatProfile}/execution/summary.json`,
        `${JSON.stringify(scope.executionSummary, null, 2)}\n`
      );
    }
  }
  await writeStaged(runRoot, "README.md", readme);

  await publishBenchmarkArtifacts({
    stagedResults,
    stagedReadme: path.join(runRoot, "README.md"),
    currentResults: path.join(benchmarksRoot, "results"),
    currentReadme: path.join(benchmarksRoot, "README.md"),
    transactionRoot: path.join(runRoot, "publication-transaction")
  });
  return {
    index,
    scopes,
    environment
  };
}
