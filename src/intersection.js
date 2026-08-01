import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { getResultsRoot } from "./paths.js";

import {
  draftDialectUris,
  formatProfiles,
  getCompileParticipants,
  getParticipants,
  sortValidatorIds
} from "./matrix.js";
import {
  canonicalJson,
  listSchemaReferences,
  listSchemaResourceIds,
  sha256
} from "./suite.js";
import { semanticDifferenceForKey } from "./integrity.js";
import {
  createPerformanceEligibilityPolicy,
  defaultEligibilityThresholdPercent,
  meetsEligibilityThreshold,
  parseEligibilityThresholdPercent
} from "./eligibility.js";

export { performanceEligibilityPolicy } from "./eligibility.js";

const benchmarksRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function reportKey(report) {
  return `${report.draft}/${report.validator}`;
}

const mutationTargets = new Set(["data", "schema", "resources"]);
const mutationClasses = new Set([
  "adapter-setup",
  "compile",
  "validation"
]);
const mutationScopes = new Set(["adapter", "schema", "case", "sample"]);
const conformanceStatuses = Object.freeze([
  "PASS",
  "WRONG",
  "COMPILE",
  "RUNTIME",
  "UNSUPPORTED"
]);

export function performanceIdentitySha256(intersection) {
  if (
    intersection === null ||
    typeof intersection !== "object" ||
    intersection.performanceIdentity === null ||
    typeof intersection.performanceIdentity !== "object"
  ) {
    throw new Error("intersection lacks a performance identity");
  }
  return sha256(canonicalJson(intersection.performanceIdentity));
}

export function createPhaseEligibility({
  reports,
  draft,
  formatProfile,
  phase,
  participants,
  phaseParticipants,
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent
}) {
  if (phase !== "compile" && phase !== "execution") {
    throw new Error(`unknown performance eligibility phase: ${phase}`);
  }
  const orderedParticipants = sortValidatorIds(participants);
  const threshold = parseEligibilityThresholdPercent(
    eligibilityThresholdPercent
  );
  const policy = createPerformanceEligibilityPolicy(threshold);
  const available = new Set(phaseParticipants);
  const reportByValidator = new Map(
    reports
      .filter((report) => report.draft === draft)
      .map((report) => [report.validator, report])
  );
  const eligible = [];
  const excluded = [];
  for (const validator of orderedParticipants) {
    const report = reportByValidator.get(validator);
    if (report === undefined) {
      throw new Error(`eligibility lacks conformance report: ${draft}/${validator}`);
    }
    const countsByProfile = Object.fromEntries(
      formatProfiles.map((profile) => [
        profile,
        Object.fromEntries(conformanceStatuses.map((status) => [status, 0]))
      ])
    );
    for (const record of report.cases) {
      const counts = countsByProfile[record.formatProfile];
      if (counts !== undefined && Object.hasOwn(counts, record.status)) {
        counts[record.status] += 1;
      }
    }
    const reasons = [];
    if (!available.has(validator)) {
      reasons.push({ code: "PHASE_UNAVAILABLE" });
    }
    for (const profile of formatProfiles) {
      const counts = countsByProfile[profile];
      const total = conformanceStatuses.reduce(
        (sum, status) => sum + counts[status],
        0
      );
      if (!meetsEligibilityThreshold(counts.PASS, total, threshold)) {
        reasons.push({
          code: "PASS_THRESHOLD_NOT_MET",
          profile,
          pass: counts.PASS,
          total,
          thresholdPercent: threshold.percent,
          thresholdFraction: policy.thresholdFraction
        });
      }
    }
    if (reasons.length === 0) {
      eligible.push(validator);
    } else {
      excluded.push({
        id: validator,
        counts: countsByProfile[formatProfile],
        countsByProfile,
        reasons
      });
    }
  }
  const rosterSha256 = sha256(canonicalJson(eligible));
  return {
    policy,
    roster: {
      candidates: orderedParticipants,
      eligible,
      excluded,
      size: { candidates: orderedParticipants.length, eligible: eligible.length },
      retention: `${eligible.length}/${orderedParticipants.length}`,
      degenerate: eligible.length < 2,
      sha256: rosterSha256
    }
  };
}

function mutationScope(record) {
  if (typeof record.scope === "string") {
    return record.scope;
  }
  if (typeof record.caseId === "string") {
    return "case";
  }
  if (typeof record.schemaId === "string") {
    return "schema";
  }
  return "sample";
}

function mutationSubjectId(record) {
  return record.subjectId ?? record.caseId ?? record.schemaId ?? record.sampleId;
}

export function mutationRecordKey(record) {
  return [
    record.validator,
    record.draft,
    mutationScope(record),
    mutationSubjectId(record),
    record.mutationTarget,
    record.mutationClass,
    canonicalJson(semanticDifferenceForKey(record.difference ?? null))
  ].join("\u0000");
}

function collectMutationRecords(report, formatProfile) {
  const records = new Map();
  for (const mutation of report.mutations ?? []) {
    const scope = mutationScope(mutation);
    const subjectId = mutationSubjectId(mutation);
    if (mutation?.formatProfile !== formatProfile) {
      continue;
    }
    if (
      mutation === null ||
      typeof mutation !== "object" ||
      mutation.validator !== report.validator ||
      mutation.draft !== report.draft ||
      !mutationScopes.has(scope) ||
      typeof subjectId !== "string" ||
      subjectId.length === 0 ||
      !mutationTargets.has(mutation.mutationTarget) ||
      !mutationClasses.has(mutation.mutationClass) ||
      mutation.phase !== "conformance" ||
      typeof mutation.moment !== "string" ||
      mutation.moment.length === 0 ||
      mutation.difference === null ||
      typeof mutation.difference !== "object"
    ) {
      throw new Error(
        `conformance mutation event is invalid: ${report.validator}/${subjectId ?? "unknown"}`
      );
    }
    const normalized = { ...mutation, scope, subjectId };
    records.set(mutationRecordKey(normalized), normalized);
  }
  for (const record of report.cases) {
    if (
      record.formatProfile !== formatProfile ||
      record.errorCode !== "INPUT_MUTATION"
    ) {
      continue;
    }
    const findings = Array.isArray(record.mutations)
      ? [...record.mutations]
      : [];
    if (
      typeof record.mutationTarget === "string" &&
      typeof record.mutationClass === "string"
    ) {
      findings.push({
        mutationTarget: record.mutationTarget,
        mutationClass: record.mutationClass
      });
    }
    if (findings.length === 0) {
      throw new Error(
        `INPUT_MUTATION requires a structured target and class: ${report.validator}/${record.id}`
      );
    }
    for (const finding of findings) {
      if (
        finding === null ||
        typeof finding !== "object" ||
        !mutationTargets.has(finding.mutationTarget) ||
        !mutationClasses.has(finding.mutationClass)
      ) {
        throw new Error(
          `INPUT_MUTATION requires a structured target and class: ${report.validator}/${record.id}`
        );
      }
      const mutation = {
        validator: report.validator,
        draft: report.draft,
        formatProfile: record.formatProfile,
        phase: "conformance",
        scope: "case",
        subjectId: record.id,
        caseId: record.id,
        schemaId: record.schemaId,
        mutationTarget: finding.mutationTarget,
        mutationClass: finding.mutationClass,
        moment: "legacy case mutation",
        difference: finding.difference ?? {
          path: "$",
          kind: "legacy-mutation-without-difference",
          before: null,
          after: null
        }
      };
      records.set(mutationRecordKey(mutation), mutation);
    }
  }
  return [...records.values()].sort((left, right) =>
    mutationRecordKey(left).localeCompare(mutationRecordKey(right))
  );
}

export function validateIntersectionInputs({
  suite,
  reports,
  expectedAdapters,
  reportHashes,
  draft,
  participants = getParticipants(draft).map(({ id }) => id)
}) {
  if (!Array.isArray(reports) || reports.length !== participants.length) {
    throw new Error(
      `intersection requires exactly ${participants.length} conformance reports for ${draft}`
    );
  }
  const reportsByKey = new Map();
  for (const report of reports) {
    const key = reportKey(report);
    if (
      report.draft !== draft ||
      !participants.includes(report.validator) ||
      reportsByKey.has(key)
    ) {
      throw new Error(`invalid or duplicate conformance report: ${key}`);
    }
    reportsByKey.set(key, report);
  }

  const expectedIds = suite.cases
    .filter((testCase) => testCase.draft === draft)
    .map(({ id }) => id);
  for (const validator of participants) {
    const key = `${draft}/${validator}`;
    const report = reportsByKey.get(key);
    if (report === undefined) {
      throw new Error(`missing conformance report: ${key}`);
    }
    if (
      report.suite.commit !== suite.manifest.commit ||
      report.suite.tree !== suite.manifest.tree ||
      report.suite.manifestSha256 !== suite.manifest.manifestSha256
    ) {
      throw new Error(`suite hash mismatch in conformance report: ${key}`);
    }
    const expectedAdapter = expectedAdapters.get(key);
    if (expectedAdapter === undefined) {
      throw new Error(`missing current adapter metadata: ${key}`);
    }
    if (report.version !== expectedAdapter.version) {
      throw new Error(`adapter version mismatch in conformance report: ${key}`);
    }
    if (
      canonicalJson(report.reportOptionsSha256) !==
      canonicalJson(expectedAdapter.reportOptionsSha256)
    ) {
      throw new Error(`adapter option hash mismatch in conformance report: ${key}`);
    }
    const reportIds = report.cases.map(({ id }) => id);
    if (
      reportIds.length !== expectedIds.length ||
      new Set(reportIds).size !== reportIds.length ||
      reportIds.some((id, index) => id !== expectedIds[index])
    ) {
      throw new Error(`conformance case IDs differ from manifest: ${key}`);
    }
    if (reportHashes !== null) {
      const hashes = reportHashes.get(key);
      if (
        hashes === undefined ||
        hashes.expected !== hashes.actual ||
        !/^[0-9a-f]{64}$/.test(hashes.actual)
      ) {
        throw new Error(`stale conformance report hash: ${key}`);
      }
    }
  }
  return reportsByKey;
}

function normalizeResourceUri(uri) {
  const parsed = new URL(uri);
  parsed.hash = "";
  return parsed.href;
}

function resourceClosure(schema, remoteEntries, draft) {
  const aliases = new Map();
  for (const entry of remoteEntries) {
    for (const alias of entry.aliases) {
      aliases.set(normalizeResourceUri(alias), entry);
    }
    aliases.set(normalizeResourceUri(entry.canonicalUrl), entry);
    for (const resourceId of listSchemaResourceIds(
      entry.schema,
      entry.canonicalUrl
    )) {
      aliases.set(normalizeResourceUri(resourceId), entry);
    }
  }

  const rootResources = new Set(
    listSchemaResourceIds(schema).map((uri) => normalizeResourceUri(uri))
  );
  const dialectUri = normalizeResourceUri(draftDialectUris[draft]);
  const resources = new Map();
  const queue = listSchemaReferences(schema);
  while (queue.length > 0) {
    const reference = queue.shift();
    if (!/^https?:/.test(reference)) {
      continue;
    }
    const uri = normalizeResourceUri(reference);
    if (rootResources.has(uri) || uri === dialectUri) {
      continue;
    }
    const remote = aliases.get(uri);
    if (remote === undefined) {
      throw new Error(`external resource is absent from the local registry: ${uri}`);
    }
    const hash = sha256(canonicalJson(remote.schema));
    const canonicalUri = normalizeResourceUri(remote.canonicalUrl);
    const key = `${canonicalUri}:${hash}`;
    if (resources.has(key)) {
      continue;
    }
    resources.set(key, { uri: canonicalUri, sha256: hash });
    queue.push(...listSchemaReferences(remote.schema, canonicalUri));
  }
  return [...resources.values()].sort(
    (left, right) =>
      left.uri.localeCompare(right.uri) || left.sha256.localeCompare(right.sha256)
  );
}

export function createCompileEntries({
  schemas,
  representedSchemaIds,
  remoteEntries,
  formatProfile
}) {
  const represented = new Set(representedSchemaIds);
  const grouped = new Map();
  for (const schemaMetadata of schemas) {
    if (
      !represented.has(schemaMetadata.id) ||
      (formatProfile !== undefined &&
        schemaMetadata.formatProfile !== formatProfile)
    ) {
      continue;
    }
    const profile = formatProfile ?? schemaMetadata.formatProfile ?? "base";
    const resources = resourceClosure(
      schemaMetadata.schema,
      remoteEntries,
      schemaMetadata.draft
    );
    const digest = sha256(
      canonicalJson({
        schema: schemaMetadata.schema,
        resources,
        formatProfile: profile,
        formatPolicyVersion: 2
      })
    );
    const compileKey = `${schemaMetadata.draft}:${profile}:${digest}`;
    const existing = grouped.get(compileKey);
    if (existing === undefined) {
      grouped.set(compileKey, {
        compileKey,
        draft: schemaMetadata.draft,
        formatProfile: profile,
        representativeSchemaId: schemaMetadata.id,
        memberSchemaIds: [schemaMetadata.id],
        resources
      });
    } else {
      existing.memberSchemaIds.push(schemaMetadata.id);
    }
  }

  const entries = [...grouped.values()];
  for (const entry of entries) {
    entry.memberSchemaIds.sort();
    entry.representativeSchemaId = entry.memberSchemaIds[0];
  }
  entries.sort((left, right) => left.compileKey.localeCompare(right.compileKey));
  return entries;
}

export function createIntersection({
  suite,
  reports,
  expectedAdapters,
  reportHashes,
  draft,
  formatProfile,
  phase = "execution",
  participants = getParticipants(draft).map(({ id }) => id),
  phaseParticipants =
    phase === "compile"
      ? getCompileParticipants(draft).map(({ id }) => id)
      : participants,
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent
}) {
  const orderedParticipants = sortValidatorIds(participants);
  const reportsByKey = validateIntersectionInputs({
    suite,
    reports,
    expectedAdapters,
    reportHashes,
    draft,
    participants: orderedParticipants
  });
  const eligibility = createPhaseEligibility({
    reports,
    draft,
    formatProfile,
    phase,
    participants: orderedParticipants,
    phaseParticipants,
    eligibilityThresholdPercent
  });
  const eligibleParticipants = eligibility.roster.eligible;
  const profileCases = suite.cases.filter(
    (testCase) =>
      testCase.draft === draft && testCase.formatProfile === formatProfile
  );
  const caseIds =
    eligibleParticipants.length === 0
      ? []
      : profileCases
    .filter((testCase) =>
      eligibleParticipants.every((validator) => {
        const report = reportsByKey.get(`${draft}/${validator}`);
        return report.cases.find(({ id }) => id === testCase.id).status === "PASS";
      })
    )
    .map(({ id }) => id);

  const included = new Set(caseIds);
  const includedCases = profileCases.filter(({ id }) => included.has(id));
  const expectedTrue = includedCases.filter(({ expected }) => expected === true).length;
  const expectedFalse = includedCases.filter(({ expected }) => expected === false).length;
  let emptyReason = null;
  if (caseIds.length === 0) {
    emptyReason =
      eligibleParticipants.length === 0
        ? "phase has no eligible participants"
        : profileCases.length === 0
        ? "profile has no official cases"
        : "profile has no cases that PASS for every eligible participant";
  } else if (expectedTrue === 0 || expectedFalse === 0) {
    throw new Error(`${draft}/${formatProfile} intersection must contain valid and invalid cases`);
  }

  const representedSchemaIds = [
    ...new Set(includedCases.map(({ schemaId }) => schemaId))
  ];
  const compileEntries = createCompileEntries({
    schemas: suite.schemas,
    representedSchemaIds,
    remoteEntries: suite.remoteEntries,
    formatProfile
  });
  if (caseIds.length > 0 && compileEntries.length === 0) {
    throw new Error("intersection has no compile entries");
  }

  const sourceReports = {};
  if (reportHashes !== null) {
    for (const validator of orderedParticipants) {
      const key = `${draft}/${validator}`;
      sourceReports[key] = reportHashes.get(key).actual;
    }
  }
  const mutationValidators = {};
  for (const validator of orderedParticipants) {
    const mutationRecords = collectMutationRecords(
      reportsByKey.get(`${draft}/${validator}`),
      formatProfile
    );
    mutationValidators[validator] = {
      count: mutationRecords.length,
      records: mutationRecords
    };
  }
  const suiteIdentity = {
    commit: suite.manifest.commit,
    tree: suite.manifest.tree,
    manifestSha256: suite.manifest.manifestSha256
  };
  const participantsForPerformance = eligibleParticipants.map((validator) => ({
    id: validator,
    version: reportsByKey.get(`${draft}/${validator}`).version
  }));
  const counts = {
    total: caseIds.length,
    expectedTrue,
    expectedFalse,
    compileEntries: compileEntries.length,
    representedSchemas: representedSchemaIds.length
  };
  return {
    intersectionVersion: 7,
    formatPolicyVersion: 2,
    draft,
    formatProfile,
    phase,
    emptyReason,
    eligibility,
    suite: suiteIdentity,
    participants: participantsForPerformance,
    sourceReports,
    mutations: {
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
    },
    counts,
    performanceIdentity: {
      performanceIdentityVersion: 2,
      formatPolicyVersion: 2,
      scope: { draft, formatProfile, phase },
      policy: eligibility.policy,
      suite: suiteIdentity,
      roster: {
        participants: participantsForPerformance,
        sha256: eligibility.roster.sha256
      },
      corpus: {
        emptyReason,
        counts,
        caseIds,
        compileEntries
      }
    },
    caseIds,
    compileEntries
  };
}

export async function generateIntersection({
  suite,
  expectedAdapters,
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent
}) {
  const intersections = [];
  const hashes = {};
  for (const draft of suite.manifest.drafts) {
    const participants = getParticipants(draft).map(({ id }) => id);
    const reports = [];
    const reportHashes = new Map();
    for (const validator of participants) {
      const key = `${draft}/${validator}`;
      const reportPath = path.join(
        getResultsRoot(),
        draft,
        "conformance",
        `${validator}.json`
      );
      const raw = await readFile(reportPath, "utf8");
      const actual = sha256(raw);
      reports.push(JSON.parse(raw));
      reportHashes.set(key, { expected: actual, actual });
    }

    for (const formatProfile of formatProfiles) {
      for (const phase of ["compile", "execution"]) {
        const intersection = createIntersection({
          suite,
          reports,
          expectedAdapters,
          reportHashes,
          draft,
          formatProfile,
          phase,
          participants,
          phaseParticipants:
            phase === "compile"
              ? getCompileParticipants(draft).map(({ id }) => id)
              : participants,
          eligibilityThresholdPercent
        });
        const content = `${JSON.stringify(intersection)}\n`;
        const hash = performanceIdentitySha256(intersection);
        const artifactHash = sha256(content);
        const runRoot = path.join(
          benchmarksRoot,
          ".cache",
          `run-intersection-${process.pid}-${Date.now()}-${draft}-${formatProfile}-${phase}`
        );
        const targetRoot = path.join(
          getResultsRoot(),
          draft,
          "profiles",
          formatProfile,
          "intersections"
        );
        await mkdir(runRoot, { recursive: true });
        await mkdir(targetRoot, { recursive: true });
        const stagedJson = path.join(runRoot, `${phase}.json`);
        const stagedHash = path.join(runRoot, `${phase}.sha256`);
        const stagedArtifactHash = path.join(
          runRoot,
          `${phase}.artifact.sha256`
        );
        await writeFile(stagedJson, content);
        await writeFile(stagedHash, `${hash}\n`);
        await writeFile(stagedArtifactHash, `${artifactHash}\n`);
        await rename(stagedJson, path.join(targetRoot, `${phase}.json`));
        await rename(stagedHash, path.join(targetRoot, `${phase}.sha256`));
        await rename(
          stagedArtifactHash,
          path.join(targetRoot, `${phase}.artifact.sha256`)
        );
        intersections.push(intersection);
        hashes[`${draft}/${formatProfile}/${phase}`] = hash;
      }
    }
  }
  return { intersections, hashes };
}
