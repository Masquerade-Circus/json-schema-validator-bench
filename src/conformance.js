import {
  detectSchemaCapabilities,
  unsupportedCapabilities
} from "./capabilities.js";
import { analyzeSchemaCapabilities, canonicalJson } from "./suite.js";
import {
  createIntegrityTracker,
  semanticDifferenceForKey
} from "./integrity.js";
import { prepareSchemaForFormatProfile } from "./schema-profile.js";
import { checkValidationStability } from "./stability.js";

const statuses = [
  "PASS",
  "WRONG",
  "COMPILE",
  "RUNTIME",
  "UNSUPPORTED"
];

function normalizeThrown(error, fallbackCode) {
  return {
    errorCode: error?.code ?? fallbackCode,
    error: error?.message ?? String(error)
  };
}

function baseRecord(adapter, testCase) {
  const record = {
    id: testCase.id,
    schemaId: testCase.schemaId,
    draft: testCase.draft,
    file: testCase.file,
    groupIndex: testCase.groupIndex,
    testIndex: testCase.testIndex,
    groupDescription: testCase.groupDescription,
    description: testCase.description,
    formatProfile: testCase.formatProfile,
    expected: testCase.expected,
    observed: null,
    status: null,
    errorCode: null,
    error: null,
    detailErrorCode: null,
    detailError: null,
    version: adapter.version
  };
  return record;
}

function unsupportedRecords(adapter, cases, unsupported) {
  return cases.map((testCase) => ({
    ...baseRecord(adapter, testCase),
    status: "UNSUPPORTED",
    errorCode: "UNSUPPORTED_CAPABILITY",
    capability: unsupported.capability,
    evidence: unsupported.evidence,
    error: `${adapter.displayName ?? adapter.name}: unsupported capability ${unsupported.capability}`
  }));
}

function failedRecords(adapter, cases, status, error, fallbackCode) {
  const normalized = normalizeThrown(error, fallbackCode);
  return cases.map((testCase) => ({
    ...baseRecord(adapter, testCase),
    status,
    ...normalized
  }));
}

function conformanceMutationKey(record) {
  return [
    record.validator,
    record.draft,
    record.formatProfile,
    record.phase,
    record.scope,
    record.subjectId,
    record.mutationTarget,
    record.mutationClass,
    record.moment,
    canonicalJson(semanticDifferenceForKey(record.difference ?? null))
  ].join("\u0000");
}

function addMutationEvents(events, findings, context) {
  for (const finding of findings) {
    events.push({
      validator: context.adapter.name,
      draft: context.draft,
      formatProfile: context.formatProfile,
      phase: "conformance",
      scope: context.scope,
      subjectId: context.subjectId,
      ...(context.caseId === null ? {} : { caseId: context.caseId }),
      ...(context.schemaId === null ? {} : { schemaId: context.schemaId }),
      mutationTarget: finding.mutationTarget,
      mutationClass: finding.mutationClass,
      moment: context.moment,
      difference: finding.difference
    });
  }
}

function deduplicateMutationEvents(events) {
  const unique = new Map();
  for (const event of events) {
    unique.set(conformanceMutationKey(event), event);
  }
  return [...unique.values()].sort((left, right) =>
    conformanceMutationKey(left).localeCompare(conformanceMutationKey(right))
  );
}

function checkpointMutations({
  schemaTracker,
  resourcesTracker,
  mutationClass,
  release = true
}) {
  const findings = [];
  const schemaIntegrity = schemaTracker?.verify();
  if (schemaIntegrity !== undefined && !schemaIntegrity.unchanged) {
    findings.push({
      mutationTarget: "schema",
      mutationClass,
      difference: schemaIntegrity.difference
    });
  }
  const resourcesIntegrity = resourcesTracker?.verify();
  if (resourcesIntegrity !== undefined && !resourcesIntegrity.unchanged) {
    findings.push({
      mutationTarget: "resources",
      mutationClass,
      difference: resourcesIntegrity.difference
    });
  }
  if (release) {
    schemaTracker?.release();
    resourcesTracker?.release();
  }
  return findings;
}

export async function classifySchemaCases({
  adapter,
  schema,
  schemaMetadata,
  cases,
  resources = null,
  mutationEvents = []
}) {
  const draft = schemaMetadata.draft ?? cases[0]?.draft;
  const formatProfile =
    schemaMetadata.formatProfile ?? cases[0]?.formatProfile ?? "base";
  const disposableSchema = structuredClone(schema);
  prepareSchemaForFormatProfile(
    disposableSchema,
    draft,
    formatProfile
  );
  let schemaTracker = createIntegrityTracker(disposableSchema);
  let resourcesTracker = resources === null
    ? null
    : createIntegrityTracker(resources);
  let validationTarget;
  let setupError = null;
  try {
    validationTarget = typeof adapter.setup === "function"
      ? await adapter.setup(disposableSchema)
      : disposableSchema;
  } catch (error) {
    setupError = error;
  }
  const setupMutations = checkpointMutations({
    schemaTracker,
    resourcesTracker,
    mutationClass: "setup"
  });
  addMutationEvents(mutationEvents, setupMutations, {
    adapter,
    draft,
    formatProfile,
    scope: "schema",
    subjectId: schemaMetadata.id,
    caseId: null,
    schemaId: schemaMetadata.id,
    moment: "after setup"
  });
  schemaTracker = null;
  resourcesTracker = null;
  if (setupError !== null) {
    const records = failedRecords(
      adapter,
      cases,
      typeof adapter.setup === "function" ? "COMPILE" : "RUNTIME",
      setupError,
      typeof adapter.setup === "function"
        ? "FAST_SETUP_ERROR"
        : "FAST_RUNTIME_ERROR"
    );
    return records;
  }

  schemaTracker = createIntegrityTracker(disposableSchema);
  resourcesTracker = resources === null
    ? null
    : createIntegrityTracker(resources);
  function checkpointValidationMutations() {
    const findings = checkpointMutations({
      schemaTracker,
      resourcesTracker,
      mutationClass: "validation",
      release: false
    });
    if (findings.length > 0) {
      schemaTracker.release();
      resourcesTracker?.release();
      schemaTracker = createIntegrityTracker(disposableSchema);
      resourcesTracker = resources === null
        ? null
        : createIntegrityTracker(resources);
    }
    return findings;
  }

  const records = [];
  for (let index = 0; index < cases.length; index += 1) {
    const testCase = cases[index];
    const record = baseRecord(adapter, testCase);
    const disposableData = structuredClone(testCase.data);
    const dataTracker = createIntegrityTracker(disposableData);
    try {
      const stability = checkValidationStability(() => adapter.validate(
        validationTarget,
        disposableData
      ));
      record.observed = stability.stable
        ? stability.observed
        : stability.expected;
      record.status =
        record.observed === testCase.expected ? "PASS" : "WRONG";
      if (!stability.stable) {
        record.status = "RUNTIME";
        record.errorCode = "PROVIDER_RESULT_INSTABILITY";
        record.error = `${adapter.displayName ?? adapter.name} changed from ${stability.expected} to ${stability.observed} on repeated validation ${stability.repetition} of the same object`;
      }
    } catch (error) {
      record.status = "RUNTIME";
      Object.assign(record, normalizeThrown(error, "FAST_RUNTIME_ERROR"));
    }
    const dataIntegrity = dataTracker.verify();
    dataTracker.release();
    const validationMutations = checkpointValidationMutations();
    if (!dataIntegrity.unchanged) {
      validationMutations.push({
        mutationTarget: "data",
        mutationClass: "validation",
        difference: dataIntegrity.difference
      });
    }
    addMutationEvents(mutationEvents, validationMutations, {
      adapter,
      draft,
      formatProfile,
      scope: "case",
      subjectId: testCase.id,
      caseId: testCase.id,
      schemaId: testCase.schemaId,
      moment: "fast validation"
    });
    if (
      record.status !== "RUNTIME" &&
      record.observed === false &&
      typeof adapter.getError === "function"
    ) {
      const detailedTestCase = structuredClone(testCase);
      const detailTracker = createIntegrityTracker(detailedTestCase);
      try {
        const detail = await adapter.getError({
          schema: disposableSchema,
          target: validationTarget,
          testCase: detailedTestCase,
          data: detailedTestCase.data
        });
        if (detail === null) {
          record.status = "RUNTIME";
          record.errorCode = "PROFILE_RESULT_DIVERGENCE";
          record.error = `Detailed error unavailable after ${adapter.displayName ?? adapter.name} returned false`;
        } else {
          record.error = detail;
        }
      } catch (error) {
        const detail = normalizeThrown(error, "DETAIL_RUNTIME_ERROR");
        record.detailErrorCode = detail.errorCode;
        record.detailError = detail.error;
      }
      const detailIntegrity = detailTracker.verify();
      detailTracker.release();
      const detailMutations = checkpointValidationMutations();
      if (!detailIntegrity.unchanged) {
        detailMutations.push({
          mutationTarget: "data",
          mutationClass: "validation",
          difference: detailIntegrity.difference
        });
      }
      addMutationEvents(mutationEvents, detailMutations, {
        adapter,
        draft,
        formatProfile,
        scope: "case",
        subjectId: testCase.id,
        caseId: testCase.id,
        schemaId: testCase.schemaId,
        moment: "detailed validation"
      });
    }
    records.push(record);
  }
  schemaTracker.release();
  resourcesTracker?.release();

  if (schemaMetadata?.id !== cases[0]?.schemaId) {
    throw new Error("schema metadata and case schema ID mismatch");
  }
  return records;
}

export function assertReportCoverage(report, expectedCases) {
  if (report.cases.length !== expectedCases.length) {
    throw new Error(
      `conformance coverage mismatch: expected ${expectedCases.length}, received ${report.cases.length}`
    );
  }
  const expectedIds = expectedCases.map(({ id }) => id);
  const actualIds = report.cases.map(({ id }) => id);
  const unique = new Set(actualIds);
  if (
    unique.size !== actualIds.length ||
    actualIds.some((id, index) => id !== expectedIds[index])
  ) {
    throw new Error("conformance coverage IDs differ from the suite manifest");
  }
  const statusTotal = statuses.reduce(
    (total, status) => total + (report.counts[status] ?? 0),
    0
  );
  if (statusTotal !== expectedCases.length) {
    throw new Error("conformance status counts do not cover the suite manifest");
  }
}

export async function runAdapterConformance({
  adapter,
  adapterFactory = null,
  adapterConfiguration = null,
  draft,
  suite,
  deadline = Date.now() + 15 * 60 * 1000
}) {
  const draftSchemas = suite.schemas.filter((schema) => schema.draft === draft);
  const draftCases = suite.cases.filter((testCase) => testCase.draft === draft);
  const casesBySchema = new Map();
  for (const testCase of draftCases) {
    const list = casesBySchema.get(testCase.schemaId) ?? [];
    list.push(testCase);
    casesBySchema.set(testCase.schemaId, list);
  }

  const records = [];
  const mutationEvents = [];
  const reportOptions = {};
  const reportOptionsSha256 = {};
  for (const schemaMetadata of draftSchemas) {
    if (Date.now() > deadline) {
      const error = new Error(
        `${adapter.name} ${draft} exceeded the cooperative conformance deadline`
      );
      error.code = "COOPERATIVE_DEADLINE_EXCEEDED";
      throw error;
    }
    const schemaCases = casesBySchema.get(schemaMetadata.id) ?? [];
    const unsupported = unsupportedCapabilities(
      adapter.unsupported ?? [],
      detectSchemaCapabilities(schemaMetadata.schema)
    );
    if (unsupported.length > 0) {
      records.push(...unsupportedRecords(adapter, schemaCases, unsupported[0]));
      continue;
    }
    let schemaAdapter;
    let disposableResources = null;
    let resourcesTracker = null;
    let setupError = null;
    try {
      if (adapterFactory !== null) {
        disposableResources = structuredClone(
          suite.resourceRegistry.resourcesFor(schemaMetadata.id)
        );
        resourcesTracker = createIntegrityTracker(disposableResources);
      }
      schemaAdapter =
        adapterFactory === null
          ? adapter
          : adapterFactory({
              ...adapterConfiguration,
              formatProfile: schemaMetadata.formatProfile,
              resources: disposableResources,
              unknownFormats:
                analyzeSchemaCapabilities(schemaMetadata.schema).unknownFormats
            });
    } catch (error) {
      setupError = error;
    }
    const setupMutations = checkpointMutations({
      schemaTracker: null,
      resourcesTracker,
      mutationClass: "adapter-setup"
    });
    addMutationEvents(mutationEvents, setupMutations, {
      adapter,
      draft,
      formatProfile: schemaMetadata.formatProfile,
      scope: "adapter",
      subjectId: `${adapter.name}/${draft}/${schemaMetadata.formatProfile}/${schemaMetadata.id}`,
      caseId: null,
      schemaId: schemaMetadata.id,
      moment: "setup"
    });
    resourcesTracker = null;
    if (setupError !== null) {
      const setupRecords = failedRecords(
        adapter,
        schemaCases,
        adapter.setupEligible === true ? "COMPILE" : "RUNTIME",
        setupError,
        adapter.setupEligible === true
          ? "FAST_SETUP_ERROR"
          : "FAST_RUNTIME_ERROR"
      );
      records.push(...setupRecords);
      continue;
    }
    reportOptions[schemaMetadata.formatProfile] ??= schemaAdapter.reportOptions;
    if (
      Object.hasOwn(reportOptionsSha256, schemaMetadata.formatProfile) &&
      reportOptionsSha256[schemaMetadata.formatProfile] !==
        schemaAdapter.reportOptionsSha256
    ) {
      throw new Error(
        `adapter reportOptions changed within ${draft}/${schemaMetadata.formatProfile}`
      );
    }
    reportOptionsSha256[schemaMetadata.formatProfile] ??=
      schemaAdapter.reportOptionsSha256;
    const schemaRecords = await classifySchemaCases({
      adapter: schemaAdapter,
      schema: schemaMetadata.schema,
      schemaMetadata,
      cases: schemaCases,
      resources: disposableResources,
      mutationEvents
    });
    records.push(...schemaRecords);
  }

  const counts = Object.fromEntries(statuses.map((status) => [status, 0]));
  const countsByFormatProfile = Object.fromEntries(
    ["base", "format-assertion"].map((profile) => [
      profile,
      Object.fromEntries(statuses.map((status) => [status, 0]))
    ])
  );
  for (const record of records) {
    counts[record.status] += 1;
    countsByFormatProfile[record.formatProfile][record.status] += 1;
    record.suite = {
      commit: suite.manifest.commit,
      tree: suite.manifest.tree,
      manifestSha256: suite.manifest.manifestSha256
    };
  }
  const report = {
    validator: adapter.name,
    draft,
    packageName: adapter.packageName,
    version: adapter.version,
    license: adapter.license,
    engines: adapter.engines,
    supportClaim: adapter.supportClaim,
    reportOptions,
    reportOptionsSha256,
    suite: {
      commit: suite.manifest.commit,
      tree: suite.manifest.tree,
      manifestSha256: suite.manifest.manifestSha256
    },
    counts,
    countsByFormatProfile,
    cases: records,
    mutations: deduplicateMutationEvents(mutationEvents)
  };
  assertReportCoverage(report, draftCases);
  return report;
}
