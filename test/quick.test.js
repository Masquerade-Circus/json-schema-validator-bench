import assert from "node:assert/strict";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  createBenchmarkContractHash,
  performancePhases,
  sampleCacheIdentityVersion,
  sampleCheckpointPath
} from "../src/benchmark.js";
import * as benchmarkApi from "../src/benchmark.js";
import * as cliApi from "../src/cli.js";
import {
  parsePipelineArguments,
  pipelineCommands,
  pipelineUsage,
  runPipeline
} from "../src/pipeline.js";
import {
  buildPerformanceChartSeries,
  consolidatedPerformanceTable,
  createValidatorVersionMap,
  createGlobalConformanceSummary,
  createGlobalPerformanceSummary,
  deriveLastRunMetadata,
  downloadTable,
  globalPerformanceTable,
  globalConformanceTable,
  normalizedGeometricScore,
  performanceTable,
  publishBenchmarkArtifacts,
  renderBenchmarkReadme,
  renderDraftSummary,
  renderRootSummary,
  setupPerformanceTable,
  summarizePhase
} from "../src/report.js";
import * as reportApi from "../src/report.js";
import {
  draftIds,
  getSetupParticipants,
  getParticipants,
  validators
} from "../src/matrix.js";
import { derivePerformanceCorpus } from "../src/performance-corpus.js";
import { createPerformanceEligibilityPolicy } from "../src/eligibility.js";

const benchmarkRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

function performanceValues(median) {
  return {
    roundThroughputs: [median],
    median,
    mean: median,
    medianAbsoluteDeviation: 0,
    relativeMedianAbsoluteDeviation: 0,
    sampleStandardDeviation: 0,
    coefficientOfVariation: 0,
    minimum: median,
    maximum: median
  };
}

test("performance chart series preserves measured rows and omits N/A", () => {
  const rows = [
    {
      participant: {
        displayName: 'Fast "validator"',
        version: "2.0.0"
      },
      average: 9123.6
    },
    {
      participant: { displayName: "Middle", version: "1.5.0" },
      average: 5000.4
    },
    {
      participant: { displayName: "Unavailable", version: "1.0.0" },
      average: null
    }
  ];

  assert.deepEqual(buildPerformanceChartSeries(rows), {
    labels: ['Fast \\"validator\\" (2.0.0)', "Middle (1.5.0)"],
    values: [9.124, 5],
    divisor: 1_000,
    unit: "K",
    yAxisMaximum: 10
  });
});

function completeConformanceReports() {
  const reports = reportFixtures();
  const totalsByDraft = {
    draft4: [718, 206],
    draft6: [945, 273],
    draft7: [1045, 587],
    "draft2019-09": [1417, 655],
    "draft2020-12": [1457, 667]
  };
  for (const report of reports) {
    const [base, formats] = totalsByDraft[report.draft];
    report.countsByFormatProfile.base.PASS = base;
    report.countsByFormatProfile["format-assertion"].PASS = formats;
  }
  return reports;
}

test("global conformance keeps unsupported scopes in the 7,970-case denominator and orders ties by validator ID", () => {
  const reports = completeConformanceReports();
  const summary = createGlobalConformanceSummary(reports);
  assert.equal(summary.canonicalCases, 7970);
  const djv = summary.rows.find(({ id }) => id === "djv");
  assert.equal(djv.cells.draft4.base, null);
  assert.equal(djv.total.denominator, 7970);
  assert.equal(djv.total.pass, 1218);
  assert.equal(djv.total.ratio, 1218 / 7970);

  const tied = structuredClone(reports);
  for (const report of tied) {
    for (const profile of ["base", "format-assertion"]) {
      const total = report.countsByFormatProfile[profile].PASS;
      report.countsByFormatProfile[profile].PASS = 0;
      report.countsByFormatProfile[profile].WRONG = total;
    }
  }
  assert.deepEqual(
    createGlobalConformanceSummary(tied).rows.map(({ id }) => id),
    [...new Set(tied.map(({ validator }) => validator))].sort()
  );
});

test("global conformance Markdown emits the configured decimal threshold exactly", () => {
  const summary = createGlobalConformanceSummary(
    completeConformanceReports(),
    "98.5"
  );
  summary.rows[0].displayName = 'Validator "quoted"';
  const markdown = globalConformanceTable(summary, reportVersions());
  assert.match(markdown, /^## Total conformance$/m);
  assert.match(markdown, /^xychart horizontal$/m);
  assert.match(markdown, /Validator \\"quoted\\"/);
  assert.match(markdown, /^    bar \[[0-9., ]+\]$/m);
  assert.match(markdown, /^    line \[98\.5(?:, 98\.5)+\]$/m);
  assert.match(markdown, /Eligibility threshold: 98\.5% per draft profile/);
  assert.match(markdown, /exact 98\.5% draft eligibility threshold/);
  assert.match(markdown, /7,970 canonical cases/);
  assert.match(markdown, /stable validator ID tie-breaker/);
});

test("rankings with fewer than two competitors publish no leader, score, or competitive chart", () => {
  const participant = {
    id: "schema-shield",
    packageName: "schema-shield",
    version: "1.0.0"
  };
  const markdown = performanceTable(
    "Execution",
    {
      eligibility: { roster: { eligible: [participant.id], excluded: [] } },
      validators: { [participant.id]: performanceValues(10) }
    },
    [participant]
  );
  assert.match(markdown, /INSUFFICIENT_COMPETITORS/);
  assert.equal(markdown.includes("Leader:"), false);
  assert.equal(markdown.includes("```mermaid"), false);
  assert.match(markdown, /\| N\/A \| 0 \| N\/A \|/);

  const summarized = summarizePhase(
    {
      phase: "execution",
      draft: "draft6",
      formatProfile: "base",
      intersectionSha256: "a".repeat(64),
      participants: [participant.id],
      samples: [{ validator: participant.id, round: 1, throughput: 10 }]
    },
    "quick"
  );
  assert.deepEqual(summarized.ranking, {
    status: "INSUFFICIENT_COMPETITORS",
    competitorCount: 1
  });
  assert.equal(
    Object.hasOwn(summarized.validators[participant.id], "scoreRelativeToBest"),
    false
  );

  const consolidated = consolidatedPerformanceTable({
    title: "Execution",
    phase: "execution",
    draft: "draft6",
    baseSummary: summarized,
    formatSummary: summarized,
    reports: [{ draft: "draft6", validator: participant.id, cases: [] }],
    participants: [participant],
    errorLinkPrefix: "errors",
    chartTitle: "Execution"
  });
  assert.match(consolidated, /INSUFFICIENT_COMPETITORS/);
  assert.equal(consolidated.includes("Leader:"), false);
  assert.equal(consolidated.includes("```mermaid"), false);

  const global = globalPerformanceTable(
    "execution",
    {
      status: "INSUFFICIENT_COMPETITORS",
      competitorCount: 1,
      included: [{
        ...participant,
        baseOpsPerSecond: 10,
        formatsOpsPerSecond: 10,
        averageOpsPerSecond: 10,
        baseScore: 100,
        formatsScore: 100,
        balancedScore: 100
      }],
      excluded: []
    },
    "Global execution"
  );
  assert.match(global, /INSUFFICIENT_COMPETITORS/);
  assert.equal(global.includes("Leader:"), false);
  assert.equal(global.includes("```mermaid"), false);
  assert.equal(global.includes("Score"), false);
});

test("performance chart scaling selects units and preserves bounded roundtrips", () => {
  const cases = [
    {
      source: [999, 125],
      expected: { divisor: 1, unit: null, values: [999, 125], bound: 1000 }
    },
    {
      source: [9124, 5000],
      expected: { divisor: 1000, unit: "K", values: [9.124, 5], bound: 10 }
    },
    {
      source: [4_206_999, 1_619_721],
      expected: { divisor: 1_000_000, unit: "M", values: [4.207, 1.62], bound: 5 }
    }
  ];

  for (const fixture of cases) {
    const series = buildPerformanceChartSeries(
      fixture.source.map((average, index) => ({
        participant: { displayName: `Validator ${index}`, version: "1.0.0" },
        average
      }))
    );
    assert.equal(series.divisor, fixture.expected.divisor);
    assert.equal(series.unit, fixture.expected.unit);
    assert.deepEqual(series.values, fixture.expected.values);
    assert.equal(series.yAxisMaximum, fixture.expected.bound);
    for (let index = 0; index < series.values.length; index += 1) {
      const roundtrip = series.values[index] * series.divisor;
      assert.ok(
        Math.abs(roundtrip - fixture.source[index]) <= series.divisor / 2000,
        `${fixture.expected.unit ?? "unscaled"} roundtrip ${index}`
      );
    }
  }
});

function reportScopes() {
  return new Map(
    draftIds.flatMap((draft) => {
      const validators = Object.fromEntries(
        getParticipants(draft).map((participant, index) => [
          participant.id,
          performanceValues(200 - index * 10)
        ])
      );
      const setupValidators = Object.fromEntries(
        Object.entries(validators).filter(([id]) =>
          getSetupParticipants(draft).some(
            ({ id: candidate }) => candidate === id
          )
        )
      );
      const setupScope = [
        `${draft}/setup`,
        {
          intersections: {
            setup: {
              eligibility: {
                policy: createPerformanceEligibilityPolicy(),
                roster: { eligible: Object.keys(setupValidators), excluded: [] }
              },
              counts: { total: 20, setupEntries: 3 }
            }
          },
          setupSummary: {
            eligibility: {
              roster: { eligible: Object.keys(setupValidators), excluded: [] }
            },
            validators: setupValidators
          }
        }
      ];
      const profileScopes = ["base", "format-assertion"].map((profile) => {
        const executionSummary = { validators: structuredClone(validators) };
        return [
          `${draft}/${profile}`,
          {
            intersection: { counts: { total: 10, setupEntries: 2 } },
            coldExecutionSummary: structuredClone(executionSummary),
            executionSummary
          }
        ];
      });
      return [setupScope, ...profileScopes];
    })
  );
}

function reportFixtures() {
  return draftIds.flatMap((draft) =>
    getParticipants(draft).map((participant) => ({
      validator: participant.id,
      version: "1.0.0",
      draft,
      countsByFormatProfile: {
        base: {
          PASS: 0,
          WRONG: 0,
          COMPILE: 0,
          RUNTIME: 0,
          UNSUPPORTED: 0
        },
        "format-assertion": {
          PASS: 0,
          WRONG: 0,
          COMPILE: 0,
          RUNTIME: 0,
          UNSUPPORTED: 0
        }
      },
      cases: []
    }))
  );
}

function reportEnvironment(mode) {
  return {
    node: { version: "v24.0.0" },
    platform: "linux",
    architecture: "x64",
    osRelease: "test-release",
    cpu: { count: 4, models: ["Test CPU"] },
    totalMemoryBytes: 8 * 1024 ** 3,
    suite: { commit: "0".repeat(40) },
    performanceEligibility: createPerformanceEligibilityPolicy(),
    benchmarkContractSha256: "0".repeat(64),
    lastRun: {
      mode,
      completedAt: "2026-07-28T19:31:01.860Z",
      totalDurationMilliseconds: null,
      peakBenchmarkRssBytes: 512 * 1024 ** 2
    }
  };
}

function reportVersions() {
  return new Map(
    draftIds.flatMap((draft) =>
      getParticipants(draft).map(({ id }) => [id, "1.0.0"])
    )
  );
}

function reportSnapshot() {
  return {
    start: "2026-01-05",
    end: "2026-01-11",
    retrievedAt: "2026-01-12T00:00:00.000Z",
    packages: Object.fromEntries(
      validators.map(({ packageName }, index) => [
        packageName,
        { weeklyDownloads: (validators.length - index) * 100 }
      ])
    )
  };
}

test("generated README exposes the public licensing and Linux result contract", () => {
  const environment = reportEnvironment("full");
  environment.suite.commit = "a".repeat(40);
  const markdown = renderBenchmarkReadme({
    scopes: reportScopes(),
    reports: reportFixtures(),
    environment,
    snapshot: reportSnapshot(),
    versions: reportVersions()
  });

  assert.match(markdown, /## Licensing and third-party materials/);
  assert.match(markdown, /\[THIRD_PARTY_NOTICES\]\(THIRD_PARTY_NOTICES\)/);
  assert.equal(
    markdown.includes(`JSON Schema Test Suite commit: \`${environment.suite.commit}\``),
    true
  );
  assert.match(markdown, /Canonical results come from a controlled Linux host/);
  assert.match(markdown, /git clone <repository-url>/);
  assert.match(markdown, /Replace `<repository-url>` and `<repository-directory>`/);
  assert.match(markdown, /controlled Linux host/);
  assert.match(markdown, /benchmark contract hash/);
});

function mutationReportingFixture(validator = "validator/id [special]") {
  const mutation = ({
    phase,
    target,
    mutationClass,
    scope,
    subjectId,
    path,
    profile = "base",
    round = null,
    moment = `${phase} moment`,
    before = null,
    after = { value: true }
  }) => ({
    validator,
    draft: "draft6",
    formatProfile: profile,
    phase,
    ...(round === null ? {} : { round }),
    moment,
    mutationTarget: target,
    mutationClass,
    scope,
    subjectId,
    ...(scope === "case" ? { caseId: subjectId } : {}),
    ...(scope === "schema" ? { schemaId: subjectId } : {}),
    difference: { path, kind: "changed", before, after }
  });
  const setupRecords = [
    mutation({
      phase: "conformance",
      target: "schema",
      mutationClass: "setup",
      scope: "schema",
      subjectId: "draft6:schema/one",
      path: "$.__normalized"
    }),
    mutation({
      phase: "conformance",
      target: "resources",
      mutationClass: "setup",
      scope: "schema",
      subjectId: "draft6:schema/one",
      path: "$[0].schema.cached"
    })
  ];
  const executionRecords = [
    mutation({
      phase: "conformance",
      target: "data",
      mutationClass: "validation",
      scope: "case",
      subjectId: "draft6:case/one",
      path: "$.payload",
      round: 1,
      before: { payload: "x".repeat(5000) },
      after: { payload: "y".repeat(5000) }
    }),
    mutation({
      phase: "conformance",
      target: "schema",
      mutationClass: "validation",
      scope: "schema",
      subjectId: "draft6:schema/one",
      path: "$.deferred",
      round: 1
    }),
    mutation({
      phase: "conformance",
      target: "resources",
      mutationClass: "validation",
      scope: "schema",
      subjectId: "draft6:schema/one",
      path: "$[0].schema.deferred",
      round: 1
    })
  ];
  const validators = (records) => ({
    [validator]: { count: records.length, records }
  });
  const scopes = new Map([
    [
      "draft6/setup",
      {
        setupSummary: {
          phase: "setup",
          draft: "draft6",
          formatProfile: null,
          eligibility: {
            roster: { eligible: [validator], excluded: [] }
          },
          mutations: {
            validators: {
              [validator]: {
                count: 2,
                records: [...setupRecords, setupRecords[0]]
              }
            }
          },
          validators: {
            [validator]: { ...performanceValues(10), mutationCount: 2 }
          }
        }
      }
    ],
    [
      "draft6/base",
      {
        executionSummary: {
          phase: "execution",
          draft: "draft6",
          formatProfile: "base",
          mutations: {
            validators: validators([...setupRecords, ...executionRecords])
          },
          validators: { [validator]: performanceValues(20) }
        }
      }
    ],
    [
      "draft6/format-assertion",
      {
        executionSummary: {
          phase: "execution",
          draft: "draft6",
          formatProfile: "format-assertion",
          mutations: {
            validators: validators([
              { ...structuredClone(executionRecords[0]), formatProfile: "format-assertion" }
            ])
          },
          validators: { [validator]: performanceValues(21) }
        }
      }
    ]
  ]);
  const reports = [
    {
      validator,
      version: "9.8.7",
      draft: "draft6",
      reportOptions: { base: { strict: false } },
      reportOptionsSha256: { base: "a".repeat(64) },
      cases: [
        {
          id: "draft6:case/one",
          status: "PASS",
          errorCode: null,
          error: null
        },
        {
          id: "draft6:schema/one/tests/0",
          schemaId: "draft6:schema/one",
          formatProfile: "base",
          status: "COMPILE",
          errorCode: "FAST_SETUP_ERROR",
          error: "fixture setup error"
        }
      ]
    }
  ];
  return {
    validator,
    scopes,
    reports,
    versions: new Map([[validator, "9.8.7"]]),
    setupRecords,
    executionRecords
  };
}

function mutationReportingLimitFixture(eventCount) {
  const fixture = mutationReportingFixture("schema-shield");
  const records = Array.from({ length: eventCount }, (_, index) => ({
    ...structuredClone(fixture.executionRecords[0]),
    subjectId: `draft6:case/${String(index).padStart(2, "0")}`,
    caseId: `draft6:case/${String(index).padStart(2, "0")}`,
    formatProfile: index < 10 ? "base" : "format-assertion",
    difference: {
      ...structuredClone(fixture.executionRecords[0].difference),
      path: `$.payload.${String(index).padStart(2, "0")}`
    }
  }));
  for (const scope of fixture.scopes.values()) {
    const summary = scope.setupSummary ?? scope.executionSummary;
    summary.mutations.validators[fixture.validator] = {
      count: 0,
      records: []
    };
  }
  const baseRecords = records.slice(0, 10);
  fixture.scopes.get("draft6/base").executionSummary.mutations.validators[
    fixture.validator
  ] = { count: baseRecords.length, records: baseRecords };
  const formatRecords = records.slice(10);
  fixture.scopes.get(
    "draft6/format-assertion"
  ).executionSummary.mutations.validators[fixture.validator] = {
    count: formatRecords.length,
    records: formatRecords
  };
  return { ...fixture, records };
}

test("mutation documents are deterministic, bounded, scoped, and omit zero validators", () => {
  assert.equal(typeof reportApi.createMutationDocuments, "function");
  const fixture = mutationReportingFixture();
  const zeroValidator = "zero/validator";
  for (const scope of fixture.scopes.values()) {
    for (const summary of [scope.setupSummary, scope.executionSummary].filter(Boolean)) {
      summary.mutations.validators[zeroValidator] = { count: 0, records: [] };
    }
  }
  fixture.versions.set(zeroValidator, "1.0.0");
  const documents = reportApi.createMutationDocuments(fixture);

  assert.equal(documents.length, 1);
  const [document] = documents;
  assert.equal(document.validator, fixture.validator);
  assert.match(document.relativePath, /^mutations\/[A-Za-z0-9._-]+\.md$/);
  assert.equal(document.content.includes(zeroValidator), false);
  assert.match(document.content, /Validator:.*validator\/id/);
  assert.match(document.content, /Version:.*9\.8\.7/);
  assert.match(document.content, /schema/);
  assert.match(document.content, /resources/);
  assert.match(document.content, /data/);
  assert.match(document.content, /mutationClass/);
  assert.match(document.content, /subjectId/);
  assert.match(document.content, /Related status:.*PASS/);
  assert.match(document.content, /FAST\\_SETUP\\_ERROR: fixture setup error/);
  assert.match(document.content, /TRUNCATED.*full structured value remains in JSON results/);
  assert.equal(fixture.executionRecords[0].difference.before.payload.length, 5000);
  const anchors = [...document.content.matchAll(/<a id="([A-Za-z0-9._-]+)"><\/a>/g)]
    .map((match) => match[1]);
  assert.equal(anchors.length, new Set(anchors).size);
  for (const anchor of [
    reportApi.mutationViewAnchor({
      view: "scope",
      draft: "draft6",
      formatProfile: "base",
      phase: "conformance"
    }),
    reportApi.mutationViewAnchor({ view: "draft", draft: "draft6", phase: "conformance" }),
    reportApi.mutationViewAnchor({ view: "global", phase: "conformance" })
  ]) {
    assert.equal(anchors.includes(anchor), true, anchor);
  }
  assert.equal(document.eventCount, 5);
  const shuffled = mutationReportingFixture();
  shuffled.scopes = new Map([...shuffled.scopes].reverse());
  for (const scope of shuffled.scopes.values()) {
    for (const summary of [scope.setupSummary, scope.executionSummary].filter(Boolean)) {
      summary.mutations.validators[shuffled.validator].records.reverse();
    }
  }
  assert.equal(reportApi.createMutationDocuments(shuffled)[0].content, document.content);
  for (const scope of shuffled.scopes.values()) {
    for (const summary of [scope.setupSummary, scope.executionSummary].filter(Boolean)) {
      summary.mutations.validators[shuffled.validator] = { count: 0, records: [] };
    }
  }
  const emptyDocuments = reportApi.createMutationDocuments(shuffled);
  assert.deepEqual(emptyDocuments, []);
  assert.equal(reportApi.createMutationDocumentManifest(emptyDocuments), null);
});

test("mutation Markdown always states total, displayed, and omitted event counts", () => {
  for (const eventCount of [5, 10, 12]) {
    const [document] = reportApi.createMutationDocuments(
      mutationReportingLimitFixture(eventCount)
    );
    const displayedCount = Math.min(eventCount, 10);

    assert.match(
      document.content,
      new RegExp(`Total unique mutations:\\*\\* ${eventCount}`),
      `${eventCount} total`
    );
    assert.match(
      document.content,
      new RegExp(`Displayed unique mutations:\\*\\* ${displayedCount}`),
      `${eventCount} displayed`
    );
    assert.match(
      document.content,
      new RegExp(`Omitted unique mutations:\\*\\* ${eventCount - displayedCount}`),
      `${eventCount} omitted`
    );
  }
});

test("mutation Markdown shows only the first 10 deterministic events without broken links", () => {
  const fixture = mutationReportingLimitFixture(12);

  const [document] = reportApi.createMutationDocuments(fixture);
  const eventAnchors = [
    ...document.content.matchAll(/<a id="(mutation-event-[A-Za-z0-9._-]+)"><\/a>/g)
  ].map((match) => match[1]);
  const eventLinks = [
    ...document.content.matchAll(/\]\(#(mutation-event-[A-Za-z0-9._-]+)\)/g)
  ].map((match) => match[1]);

  assert.equal(document.eventCount, 12);
  assert.match(document.content, /Total unique mutations:\*\* 12/);
  assert.match(document.content, /Displayed unique mutations:\*\* 10/);
  assert.match(document.content, /Omitted unique mutations:\*\* 2/);
  assert.equal(
    [...document.content.matchAll(/^Displayed mutation links: 10$/gm)].length,
    2
  );
  assert.match(document.content, /^Displayed mutation links: 0$/m);
  assert.equal(
    [...document.content.matchAll(/^Omitted mutation links: 2\./gm)].length,
    3
  );
  assert.match(document.content, /draft6:case\/09/);
  assert.equal(document.content.includes("draft6:case/10"), false);
  assert.equal(document.content.includes("draft6:case/11"), false);
  assert.equal(eventAnchors.length, 10);
  assert.equal(new Set(eventAnchors).size, 10);
  assert.equal(eventLinks.length, 30);
  assert.equal(eventLinks.every((anchor) => eventAnchors.includes(anchor)), true);
  assert.equal(document.anchors.length, 14);
  assert.equal(
    document.anchors.every((anchor) => document.content.includes(`id="${anchor}"`)),
    true
  );
  assert.equal(
    reportApi.createMutationDocumentManifest([document]).documents[0].eventCount,
    12
  );

  for (const scope of fixture.scopes.values()) {
    scope.executionSummary?.mutations.validators[
      fixture.validator
    ].records.reverse();
  }
  assert.equal(reportApi.createMutationDocuments(fixture)[0].content, document.content);
});

test("mutation cells link to existing scope and draft anchors without changing metric order", () => {
  const fixture = mutationReportingFixture("schema-shield");
  const documents = reportApi.createMutationDocuments(fixture);
  const document = documents[0];
  const participant = {
    id: "schema-shield",
    packageName: "schema-shield",
    version: "9.8.7"
  };
  const base = fixture.scopes.get("draft6/base");
  base.executionSummary.validators.ajv = performanceValues(30);
  base.executionSummary.mutations.validators.ajv = { count: 0, records: [] };
  const fasterParticipant = {
    id: "ajv",
    packageName: "ajv",
    version: "1.0.0"
  };
  const scopeTable = performanceTable(
    "Execution",
    base.executionSummary,
    [participant, fasterParticipant],
    { mutationLinkPrefix: "../mutations" }
  );
  const setup = fixture.scopes.get("draft6/setup").setupSummary;
  setup.eligibility.roster.eligible.push("ajv");
  setup.validators.ajv = performanceValues(30);
  setup.mutations.validators.ajv = { count: 0, records: [] };
  const setupTable = setupPerformanceTable({
    title: "Setup",
    draft: "draft6",
    summary: setup,
    reports: [
      ...fixture.reports,
      { draft: "draft6", validator: "ajv", cases: [] }
    ],
    participants: [participant, fasterParticipant],
    errorLinkPrefix: "errors",
    mutationLinkPrefix: "../mutations"
  });
  const expectedLinks = [
    `../${document.relativePath}#${reportApi.mutationViewAnchor({ view: "scope", draft: "draft6", formatProfile: "base", phase: "conformance" })}`,
    `../${document.relativePath}#${reportApi.mutationViewAnchor({ view: "draft", draft: "draft6", phase: "conformance" })}`
  ];
  for (const [markdown, href] of [
    [scopeTable, expectedLinks[0]],
    [setupTable, expectedLinks[1]]
  ]) {
    assert.match(markdown, new RegExp(`\\[\\d+\\]\\(${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\)`));
    const anchor = href.split("#")[1];
    assert.match(document.content, new RegExp(`<a id="${anchor}"></a>`));
  }
  assert.ok(scopeTable.indexOf("[ajv]") < scopeTable.indexOf("[schema-shield]"));
  const zero = performanceTable(
    "Setup",
    {
      ...base.executionSummary,
      mutations: { validators: { "schema-shield": { count: 0, records: [] } } },
      validators: { "schema-shield": performanceValues(10) }
    },
    [participant],
    { mutationLinkPrefix: "../mutations" }
  );
  assert.match(zero, /\| 0 \|/);
  assert.equal(zero.includes("mutations/"), false);
});

test("mutation document inventory hashes and coordinated publication include every Markdown artifact", async () => {
  assert.equal(typeof reportApi.writeMutationDocuments, "function");
  const fixture = mutationReportingFixture("schema-shield");
  const documents = reportApi.createMutationDocuments(fixture);
  const manifest = reportApi.createMutationDocumentManifest(documents);
  const root = path.join(
    benchmarkRoot,
    "tmp",
    `mutation-publication-${process.pid}-${Date.now()}`
  );
  const stagedResults = path.join(root, "staged-results");
  const stagedReadme = path.join(root, "staged-README.md");
  const currentResults = path.join(root, "results");
  const currentReadme = path.join(root, "README.md");
  try {
    await mkdir(stagedResults, { recursive: true });
    await mkdir(currentResults, { recursive: true });
    await writeFile(stagedReadme, "staged\n");
    await writeFile(currentReadme, "current\n");
    await writeFile(path.join(currentResults, "old.txt"), "old\n");
    await reportApi.writeMutationDocuments({
      stagedResults,
      documents,
      manifest
    });
    await publishBenchmarkArtifacts({
      stagedResults,
      stagedReadme,
      currentResults,
      currentReadme,
      transactionRoot: path.join(root, "transaction")
    });
    const publishedManifest = JSON.parse(
      await readFile(path.join(currentResults, "mutations", "index.json"), "utf8")
    );
    assert.deepEqual(publishedManifest, manifest);
    for (const entry of manifest.documents) {
      const content = await readFile(path.join(currentResults, entry.relativePath), "utf8");
      assert.equal(reportApi.hashMutationDocument(content), entry.sha256);
    }
    const index = reportApi.createResultsIndex("full", manifest);
    assert.equal(index.resultsVersion, 14);
    assert.deepEqual(index.performancePhases, [
      "setup",
      "execution",
      "cold-execution"
    ]);
    assert.deepEqual(index.performanceScopes, {
      setup: "draft",
      execution: "draft-profile",
      "cold-execution": "draft-profile"
    });
    assert.equal(index.eligibilityThresholdPercent, "98");
    assert.equal(index.mutationDocuments.mutationReportVersion, 2);
    assert.equal(index.mutationDocuments.manifest, "mutations/index.json");
    assert.equal(index.mutationDocuments.count, documents.length);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("main performance charts render current horizontal syntax with units in titles", () => {
  const scopes = reportScopes();
  for (const scope of scopes.values()) {
    for (const id of Object.keys(scope.setupSummary?.validators ?? {})) {
      scope.setupSummary.validators[id] = performanceValues(2_000);
    }
    for (const id of Object.keys(scope.executionSummary?.validators ?? {})) {
      scope.executionSummary.validators[id] = performanceValues(2_000_000);
    }
  }
  const markdown = renderBenchmarkReadme({
    mode: "quick",
    scopes,
    reports: reportFixtures(),
    environment: reportEnvironment("quick"),
    snapshot: reportSnapshot(),
    versions: reportVersions()
  });

  assert.equal([...markdown.matchAll(/^xychart horizontal$/gm)].length, 7);
  assert.equal(markdown.includes("xychart-beta"), false);
  assert.deepEqual(
    [...markdown.matchAll(/^    title ".*\(Higher is better\)"$/gm)].length,
    7
  );
  assert.equal(
    [...markdown.matchAll(/^    y-axis "Average ops\/s" 0 --> /gm)].length,
    0
  );
  assert.equal(
    [...markdown.matchAll(/^    y-axis "Balanced score" 0 --> /gm)].length,
    4
  );
  assert.equal(
    [...markdown.matchAll(/^    y-axis "Setup score" 0 --> /gm)].length,
    2
  );
});

test("every Mermaid performance chart appears immediately before its table", () => {
  const markdown = renderBenchmarkReadme({
    mode: "quick",
    scopes: reportScopes(),
    reports: reportFixtures(),
    environment: reportEnvironment("quick"),
    snapshot: reportSnapshot(),
    versions: reportVersions()
  });
  const charts = [
    ...markdown.matchAll(/```mermaid\nxychart horizontal[\s\S]*?```/g)
  ];

  assert.equal(charts.length, 7);
  for (const chart of charts) {
    assert.match(
      markdown.slice(chart.index + chart[0].length),
      /^\n\n\| Validator \|/
    );
  }
});

test("scope summaries expose conformance mutation counts and maximum Peak RSS in bytes", () => {
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
          throughput: 10,
          memory: { peak: { rss: 64 * 1024 ** 2 } }
        },
        {
          validator: "schema-shield",
          round: 2,
          throughput: 20,
          memory: { peak: { rss: 96 * 1024 ** 2 } }
        },
        {
          validator: "schema-shield",
          round: 3,
          throughput: 30,
          memory: { peak: { rss: 80 * 1024 ** 2 } }
        },
        {
          validator: "schema-shield",
          round: 4,
          throughput: 40,
          memory: { peak: { rss: 72 * 1024 ** 2 } }
        },
        {
          validator: "schema-shield",
          round: 5,
          throughput: 50,
          memory: { peak: { rss: 88 * 1024 ** 2 } }
        },
        {
          validator: "schema-shield",
          round: 6,
          throughput: 60,
          memory: { peak: { rss: 84 * 1024 ** 2 } }
        }
      ]
    },
    "full",
    {
      mutations: {
        validators: {
          "schema-shield": {
            count: 1,
            records: [
              {
                validator: "schema-shield",
                draft: "draft6",
                caseId: "shared-case",
                mutationTarget: "data",
                mutationClass: "validation"
              }
            ]
          }
        }
      }
    }
  );

  assert.equal(summary.units.peakRss, "bytes");
  assert.equal(
    summary.units.mutations,
    "unique mutation findings detected during conformance"
  );
  assert.equal(summary.validators["schema-shield"].peakRssBytes, 96 * 1024 ** 2);
  assert.equal(summary.validators["schema-shield"].mutationCount, 1);
  assert.equal(summary.mutations.validators["schema-shield"].count, 1);
});

test("performance tables show mutations and Peak RSS without changing throughput order", () => {
  const participants = [
    { id: "alpha", packageName: "alpha", version: "1.0.0" },
    { id: "zulu", packageName: "zulu", version: "1.0.0" }
  ];
  const duplicateMutation = {
    validator: "alpha",
    draft: "draft6",
    caseId: "shared-case",
    mutationTarget: "schema",
    mutationClass: "setup"
  };
  const baseSummary = {
    mutations: {
      validators: {
        alpha: { count: 1, records: [duplicateMutation] },
        zulu: { count: 0, records: [] }
      }
    },
    validators: {
      alpha: {
        ...performanceValues(10),
        mutationCount: 1,
        peakRssBytes: 64 * 1024 ** 2
      },
      zulu: {
        ...performanceValues(20),
        mutationCount: 0,
        peakRssBytes: 32 * 1024 ** 2
      }
    }
  };
  const formatSummary = structuredClone(baseSummary);
  formatSummary.validators.alpha.peakRssBytes = 96 * 1024 ** 2;

  const scoped = performanceTable("Execution", baseSummary, participants);
  assert.match(
    scoped,
    /\| Validator \| Median ops\/s \| Mean ops\/s \| Relative MAD \| Sample CV \| Min–max ops\/s \| Score \| Mutations \| Peak RSS \|/
  );
  assert.equal(scoped.includes("Round 1 ops/s"), false);
  assert.equal(scoped.includes("Round 2 ops/s"), false);
  assert.match(scoped, /\| Mutations \| Peak RSS \|/);
  assert.ok(scoped.indexOf("[zulu]") < scoped.indexOf("[alpha]"));
  assert.match(scoped, /\| 1 \| 64\.0 MiB \|/);

  const consolidated = consolidatedPerformanceTable({
    title: "Execution",
    phase: "execution",
    draft: "draft6",
    baseSummary,
    formatSummary,
    reports: participants.map(({ id }) => ({
      draft: "draft6",
      validator: id,
      cases: []
    })),
    participants,
    errorLinkPrefix: "errors"
  });
  assert.match(consolidated, /\| Mutations \| Peak RSS \|/);
  assert.match(consolidated, /\| 1 \| 96\.0 MiB \|/);
  assert.ok(consolidated.indexOf("[zulu]") < consolidated.indexOf("[alpha]"));
});

test("tables render zero mutations and absent memory without inventing a sample", () => {
  const markdown = performanceTable(
    "Setup",
    {
      mutations: {
        validators: { alpha: { count: 0, records: [] } }
      },
      validators: {}
    },
    [{ id: "alpha", packageName: "alpha", version: "1.0.0" }]
  );

  assert.match(markdown, /\| \[alpha\].*\| 0 \| N\/A \|/);

  const summary = summarizePhase(
    {
      phase: "execution",
      draft: "draft6",
      formatProfile: "base",
      intersectionSha256: "a".repeat(64),
      participants: ["alpha"],
      samples: [{ validator: "alpha", round: 1, throughput: 1 }]
    },
    "quick"
  );
  assert.equal(summary.validators.alpha.peakRssBytes, null);
  assert.equal(summary.validators.alpha.mutationCount, 0);
});

test("performance ranking omits excluded participants and keeps their diagnostic reason", () => {
  const participants = [
    { id: "alpha", packageName: "alpha", version: "1.0.0" },
    { id: "zulu", packageName: "zulu", version: "1.0.0" }
  ];
  const markdown = performanceTable(
    "Execution",
    {
      eligibility: {
        roster: {
          eligible: ["zulu"],
          excluded: [
            {
              id: "alpha",
              reasons: [
                {
                  code: "PASS_THRESHOLD_NOT_MET",
                  profile: "base",
                  pass: 97,
                  total: 100,
                  thresholdPercent: "98"
                }
              ]
            }
          ]
        }
      },
      validators: {
        alpha: performanceValues(100),
        zulu: performanceValues(10)
      }
    },
    participants
  );

  assert.equal(markdown.includes("| [alpha]("), false);
  assert.match(markdown, /- \[alpha\].*PASS_THRESHOLD_NOT_MET/);
  assert.match(markdown, /\| \[zulu\].*\| 10 \|/);
});

test("All Drafts ranking omits the exclusions section when every participant qualifies", () => {
  const phaseSummary = createGlobalPerformanceSummary(
    reportScopes(),
    reportFixtures()
  ).phases.execution;
  phaseSummary.excluded = [];

  const markdown = globalPerformanceTable("execution", phaseSummary);

  assert.equal(markdown.includes("Excluded from this ranking"), false);
});

test("global summaries deduplicate profile mutations and retain maximum RSS across scopes", () => {
  const scopes = reportScopes();
  let peakRssBytes = 32 * 1024 ** 2;
  for (const draft of draftIds) {
    const mutation = {
      validator: "schema-shield",
      draft,
      caseId: `${draft}:shared-case`,
      mutationTarget: "data",
      mutationClass: "validation"
    };
    for (const profile of ["base", "format-assertion"]) {
      const summary = scopes.get(`${draft}/${profile}`).executionSummary;
      summary.mutations = {
        validators: {
          "schema-shield": {
            count: 2,
            records: [mutation, structuredClone(mutation)]
          }
        }
      };
      summary.validators["schema-shield"].peakRssBytes = peakRssBytes;
      peakRssBytes += 1024 ** 2;
    }
  }

  const global = createGlobalPerformanceSummary(scopes, reportFixtures());
  const schemaShield = global.phases.execution.included.find(
    ({ id }) => id === "schema-shield"
  );
  const zeroMutationValidator = global.phases.execution.included.find(
    ({ id }) => id !== "schema-shield"
  );

  assert.equal(schemaShield.mutationCount, draftIds.length);
  assert.equal(schemaShield.peakRssBytes, peakRssBytes - 1024 ** 2);
  assert.equal(zeroMutationValidator.mutationCount, 0);
  assert.equal(global.units.peakRss, "bytes");
  assert.equal(
    global.units.mutations,
    "unique mutation findings detected during conformance"
  );
  assert.equal(Number.isSafeInteger(schemaShield.peakRssBytes), true);
  assert.equal(globalPerformanceTable("execution", global.phases.execution).includes("Mutations"), false);
});

test("draft report tables retain public Mutations columns while All Drafts stays focused", () => {
  const scopes = reportScopes();
  const reports = reportFixtures();
  const readme = renderBenchmarkReadme({
    mode: "quick",
    scopes,
    reports,
    environment: reportEnvironment("quick"),
    snapshot: reportSnapshot(),
    versions: reportVersions()
  });
  assert.equal(
    [...readme.matchAll(/\| Mutations \| Peak RSS \|/g)].length,
    3
  );
  assert.equal(
    [...readme.matchAll(/\| Validator \| Base ops\/s \| Formats ops\/s \| Average ops\/s \| Base score \| Formats score \| Balanced score \|/g)].length,
    2
  );
  assert.equal([...readme.matchAll(/^Leader global:/gm)].length, 3);
  assert.equal([...readme.matchAll(/^Leader:/gm)].length, 3);

  const draft = "draft6";
  const draftSummary = renderDraftSummary({
    draft,
    scopes,
    reports: reports.filter((report) => report.draft === draft),
    snapshot: {
      start: "2026-01-05",
      end: "2026-01-11",
      retrievedAt: "2026-01-12T00:00:00.000Z",
      packages: Object.fromEntries(
        getParticipants(draft).map(({ packageName }) => [
          packageName,
          { weeklyDownloads: 1 }
        ])
      )
    },
    versions: reportVersions()
  });
  assert.equal(
    [...draftSummary.matchAll(/\| Mutations \| Peak RSS \|/g)].length,
    7
  );
});

test("generated participant snapshots are complete and alphabetic while metric tables retain value order", () => {
  const snapshot = reportSnapshot();
  const markdown = renderBenchmarkReadme({
    mode: "quick",
    scopes: reportScopes(),
    reports: reportFixtures(),
    environment: reportEnvironment("quick"),
    snapshot,
    versions: reportVersions()
  });
  const participantsHeading = markdown.indexOf("### Participants\n");
  const participantsByDraftHeading = markdown.indexOf("### Participants by draft\n");
  assert.ok(participantsHeading > markdown.indexOf("## Methodology\n"));
  assert.ok(participantsHeading < participantsByDraftHeading);
  const globalParticipantSection = markdown.slice(
    participantsHeading,
    participantsByDraftHeading
  );
  const globalParticipantRows = [
    ...globalParticipantSection.matchAll(
      /^\| \[([^\]]+)\]\(https:\/\/www\.npmjs\.com\/package\/[^)]+\) \([^)]*\) \| [^|]+ \| [^|]+ \| [^|]+ \| ([\d,]+) \|$/gm
    )
  ];
  assert.deepEqual(
    globalParticipantRows.map((match) => match[1]),
    validators.map(({ id }) => id).toSorted()
  );
  assert.deepEqual(
    new Set(globalParticipantRows.map((match) => match[1])),
    new Set(validators.map(({ id }) => id))
  );
  for (const match of globalParticipantRows) {
    const participant = validators.find(({ id }) => id === match[1]);
    assert.equal(
      match[2],
      snapshot.packages[participant.packageName].weeklyDownloads.toLocaleString("en-US")
    );
  }
  for (const label of [
    "`reusable-sync`",
    "`reusable-async`",
    "`validate-only`",
    "`fresh-instance`",
    "`module-global-unavailable`",
    "`observed`",
    "`not-observed`"
  ]) {
    assert.equal(globalParticipantSection.includes(label), true, label);
  }
  assert.match(
    globalParticipantSection,
    /Dynamic code describes the route exercised by the adapter at the pinned version, not every path available in the package/
  );
  assert.doesNotMatch(markdown, /sort validators by canonical name/i);
  assert.doesNotMatch(globalParticipantSection, /sort|alphabet/i);

  const participantSection = markdown.match(
    /### Participants by draft\n\n[\s\S]*?\n\n### Profiles/
  )?.[0];
  assert.ok(participantSection);
  for (const draft of draftIds) {
    const line = participantSection
      .split("\n")
      .find((candidate) => candidate.startsWith(`- **${draft}:**`));
    const observed = [...line.matchAll(/\[([^\]]+)\]\(https:\/\/www\.npmjs\.com/g)].map(
      (match) => match[1]
    );
    const expected = [...getParticipants(draft)]
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
    assert.deepEqual(observed, expected, draft);
  }

  const draft = "draft6";
  const draftParticipants = getParticipants(draft);
  const draftSummary = renderDraftSummary({
    draft,
    scopes: reportScopes(),
    reports: reportFixtures().filter((report) => report.draft === draft),
    snapshot: {
      start: "2026-01-05",
      end: "2026-01-11",
      retrievedAt: "2026-01-12T00:00:00.000Z",
      packages: Object.fromEntries(
        draftParticipants.map(({ packageName }, index) => [
          packageName,
          { weeklyDownloads: index + 1 }
        ])
      )
    },
    versions: reportVersions()
  });
  const conformanceSections = [
    ...draftSummary.matchAll(
      /## Conformance\n[\s\S]*?(?=\n# Profile:|\n## npm snapshot)/g
    )
  ];
  assert.equal(conformanceSections.length, 2);
  for (const section of conformanceSections) {
    const observed = [...section[0].matchAll(/\[([^\]]+)\]\(https:\/\/www\.npmjs\.com/g)].map(
      (match) => match[1]
    );
    assert.deepEqual(observed, draftParticipants.map(({ id }) => id));
  }
  const draftSnapshotSection = draftSummary.slice(
    draftSummary.indexOf("## npm snapshot"),
    draftSummary.indexOf("## Limitations")
  );
  assert.deepEqual(
    [...draftSnapshotSection.matchAll(/\[([^\]]+)\]\(https:\/\/www\.npmjs\.com/g)].map(
      (match) => match[1]
    ),
    draftParticipants.map(({ id }) => id).toSorted()
  );
  assert.doesNotMatch(draftSnapshotSection, /sort|alphabet/i);

  const participants = [
    {
      id: "alpha",
      displayName: "Alpha",
      packageName: "alpha",
      version: "1.0.0"
    },
    {
      id: "zulu",
      displayName: "Zulu",
      packageName: "zulu",
      version: "1.0.0"
    }
  ];
  const summary = {
    validators: {
      alpha: performanceValues(1),
      zulu: performanceValues(2)
    }
  };
  const performance = performanceTable("Metric", summary, participants);
  assert.ok(performance.indexOf("[zulu]") < performance.indexOf("[alpha]"));

  const downloads = downloadTable(
    {
      packages: {
        alpha: { weeklyDownloads: 1 },
        zulu: { weeklyDownloads: 2 }
      }
    },
    participants
  );
  assert.ok(downloads.indexOf("[alpha]") < downloads.indexOf("[zulu]"));
  assert.doesNotMatch(downloads, /sort|alphabet/i);

  const reports = participants.map(({ id }) => ({
    draft: "draft6",
    validator: id,
    cases: []
  }));
  const consolidated = consolidatedPerformanceTable({
    title: "Metric",
    phase: "execution",
    draft: "draft6",
    baseSummary: summary,
    formatSummary: summary,
    reports,
    participants,
    errorLinkPrefix: "errors"
  });
  assert.ok(consolidated.indexOf("[zulu]") < consolidated.indexOf("[alpha]"));

  const global = globalPerformanceTable("execution", {
    status: "COMPETITIVE",
    competitorCount: 2,
    included: [
      {
        ...participants[1],
        baseOpsPerSecond: 2,
        formatsOpsPerSecond: 2,
        averageOpsPerSecond: 2,
        baseScore: 100,
        formatsScore: 100,
        balancedScore: 100
      },
      {
        ...participants[0],
        baseOpsPerSecond: 1,
        formatsOpsPerSecond: 1,
        averageOpsPerSecond: 1,
        baseScore: 50,
        formatsScore: 50,
        balancedScore: 50
      }
    ],
    excluded: []
  });
  assert.ok(global.indexOf("[zulu]") < global.indexOf("[alpha]"));
});

function performanceCorpusFixture(draft = "draft6", formatProfile = "base") {
  const setupEntries = Array.from({ length: 20 }, (_, index) => ({
    setupKey: `${draft}:${formatProfile}:setup-${index}`,
    draft,
    formatProfile,
    representativeSchemaId: `${draft}:schema-${index}`,
    memberSchemaIds: [`${draft}:schema-${index}`],
    resources: []
  }));
  const cases = setupEntries.flatMap((entry, index) => [
    {
      id: `${draft}:case-${index}-valid`,
      schemaId: entry.representativeSchemaId,
      expected: true,
      data: index
    },
    {
      id: `${draft}:case-${index}-invalid`,
      schemaId: entry.representativeSchemaId,
      expected: false,
      data: `${index}`
    }
  ]);
  return {
    cases,
    intersection: {
      draft,
      formatProfile,
      emptyReason: null,
      caseIds: cases.map(({ id }) => id),
      setupEntries
    }
  };
}

test("pipeline accepts only Full or one Quick flag", () => {
  assert.match(
    pipelineUsage,
    /--eligibility-threshold-percent <0-100>/
  );
  assert.deepEqual(parsePipelineArguments([]), {
    mode: "full",
    controllerDeadlineMilliseconds: null,
    eligibilityThresholdPercent: "98",
    validator: null,
    bench: null
  });
  assert.deepEqual(parsePipelineArguments(["--quick"]), {
    mode: "quick",
    controllerDeadlineMilliseconds: null,
    eligibilityThresholdPercent: "98",
    validator: null,
    bench: null
  });
  assert.deepEqual(
    parsePipelineArguments(["--controller-deadline-minutes", "60"]),
    {
      mode: "full",
      controllerDeadlineMilliseconds: 60 * 60 * 1000,
      eligibilityThresholdPercent: "98",
      validator: null,
      bench: null
    }
  );
  assert.equal(
    parsePipelineArguments(["--eligibility-threshold-percent", "98.5"])
      .eligibilityThresholdPercent,
    "98.5"
  );
  assert.equal(
    parsePipelineArguments(["--eligibility-threshold-percent", "099.9500"])
      .eligibilityThresholdPercent,
    "99.95"
  );
  for (const boundary of ["0", "100"]) {
    assert.equal(
      parsePipelineArguments(["--eligibility-threshold-percent", boundary])
        .eligibilityThresholdPercent,
      boundary
    );
  }
  for (const args of [["--fast"], ["--quick", "--quick"], ["quick"]]) {
    assert.throws(() => parsePipelineArguments(args), /arguments|--quick/);
  }
  for (const bench of ["setup", "execution", "cold"]) {
    assert.equal(parsePipelineArguments(["--bench", bench]).bench, bench);
  }
  for (const args of [
    ["--bench"],
    ["--bench", "coldexecution"],
    ["--bench", "unknown"],
    ["--bench", "setup", "--bench", "cold"]
  ]) {
    assert.throws(() => parsePipelineArguments(args), /--bench.*setup.*execution.*cold|--bench.*exactly once/);
  }
  for (const value of ["", "0", "2", "2.5", "241", "minutes"]) {
    assert.throws(
      () => parsePipelineArguments(["--controller-deadline-minutes", value]),
      /controller deadline/
    );
  }
  for (const value of [
    "",
    "-1",
    "100.000001",
    "NaN",
    "Infinity",
    "1e2",
    ".5",
    "98.",
    "99.1234567"
  ]) {
    assert.throws(
      () => parsePipelineArguments(["--eligibility-threshold-percent", value]),
      /eligibility threshold.*decimal.*0.*100|eligibility threshold.*precision/
    );
  }
});

test("benchmark contract hash includes the normalized eligibility threshold", () => {
  const defaultHash = createBenchmarkContractHash({
    mode: "quick",
    eligibilityThresholdPercent: "98"
  });
  assert.equal(
    defaultHash,
    createBenchmarkContractHash({
      mode: "quick",
      eligibilityThresholdPercent: "098.000"
    })
  );
  assert.notEqual(
    defaultHash,
    createBenchmarkContractHash({
      mode: "quick",
      eligibilityThresholdPercent: "98.5"
    })
  );
});

test("controller deadlines are validated at the benchmark boundary", () => {
  assert.equal(
    typeof benchmarkApi.controllerDeadlineMillisecondsFromEnvironment,
    "function"
  );
  assert.equal(
    benchmarkApi.controllerDeadlineMillisecondsFromEnvironment("full", {}),
    4 * 60 * 60 * 1000
  );
  assert.equal(
    benchmarkApi.controllerDeadlineMillisecondsFromEnvironment("full", {
      BENCHMARK_CONTROLLER_DEADLINE_MILLISECONDS: String(60 * 60 * 1000)
    }),
    60 * 60 * 1000
  );
  for (const value of ["NaN", "179999", "14400001"]) {
    assert.throws(
      () =>
        benchmarkApi.controllerDeadlineMillisecondsFromEnvironment("full", {
          BENCHMARK_CONTROLLER_DEADLINE_MILLISECONDS: value
        }),
      /controller deadline/
    );
  }
});

test("Quick and Full keep the same complete performance intersection", () => {
  const fixture = performanceCorpusFixture();
  const full = derivePerformanceCorpus({ mode: "full", ...fixture });
  const quick = derivePerformanceCorpus({ mode: "quick", ...fixture });

  assert.strictEqual(full.caseIds, fixture.intersection.caseIds);
  assert.strictEqual(full.setupEntries, fixture.intersection.setupEntries);
  assert.equal(full.metadata, null);
  assert.strictEqual(quick.caseIds, full.caseIds);
  assert.strictEqual(quick.setupEntries, full.setupEntries);
  assert.equal(quick.metadata, null);
  assert.notEqual(
    createBenchmarkContractHash({ mode: "quick" }),
    createBenchmarkContractHash({ mode: "full" })
  );
});

test("Quick and Full checkpoints cannot overlap", () => {
  const request = {
    phase: "setup",
    draft: "draft6",
    formatProfile: null,
    validator: "schema-shield",
    round: 1
  };
  const sampleIdentityHash = "a".repeat(64);
  const quick = sampleCheckpointPath(request, {
    mode: "quick",
    sampleIdentityHash
  });
  const full = sampleCheckpointPath(request, {
    mode: "full",
    sampleIdentityHash
  });

  assert.notEqual(quick, full);
  assert.ok(quick.includes(`${path.sep}granular-samples-v${sampleCacheIdentityVersion}${path.sep}`));
  assert.ok(full.includes(`${path.sep}granular-samples-v${sampleCacheIdentityVersion}${path.sep}`));
  assert.ok(quick.includes(`${path.sep}quick${path.sep}`));
  assert.ok(full.includes(`${path.sep}full${path.sep}`));
});

test("last-run metadata selects observed sample peaks and does not relabel report time as total run time", () => {
  const metadata = deriveLastRunMetadata({
    mode: "quick",
    previousEnvironment: {
      endedAt: "2026-07-28T19:31:01.860Z"
    },
    sampleResults: [
      {
        endedAt: "2026-07-28T19:30:40.700Z",
        samples: [{ memory: { peak: { rss: 200 } } }]
      },
      {
        endedAt: "2026-07-28T19:30:58.165Z",
        samples: [
          { memory: { peak: { rss: 500 } } },
          { memory: { peak: { rss: 300 } } }
        ]
      }
    ],
    reportEndedAt: "2026-07-28T20:00:00.000Z"
  });

  assert.deepEqual(metadata, {
    mode: "quick",
    completedAt: "2026-07-28T19:31:01.860Z",
    totalDurationMilliseconds: null,
    peakBenchmarkRssBytes: 500
  });
});

test("last-run metadata uses pipeline timing when the pipeline supplied its start", () => {
  const metadata = deriveLastRunMetadata({
    mode: "full",
    previousEnvironment: null,
    sampleResults: [{ samples: [{ memory: { peak: { rss: 400 } } }] }],
    pipelineStartedAt: "2026-07-28T19:00:00.000Z",
    reportEndedAt: "2026-07-28T19:01:35.988Z"
  });

  assert.equal(metadata.completedAt, "2026-07-28T19:01:35.988Z");
  assert.equal(metadata.totalDurationMilliseconds, 95_988);
  assert.equal(metadata.peakBenchmarkRssBytes, 400);
});

test("validator version mapping requires package and conformance metadata to agree", () => {
  const participants = [
    ...new Map(
      draftIds
        .flatMap((draft) => getParticipants(draft))
        .map((participant) => [participant.id, participant])
    ).values()
  ];
  const packages = Object.fromEntries(
    participants.map(({ packageName }, index) => [
      packageName,
      { version: `1.0.${index}` }
    ])
  );
  const reports = participants.map((participant, index) => ({
    validator: participant.id,
    version: `1.0.${index}`
  }));

  const versions = createValidatorVersionMap({ reports, packages });
  const schemaShield = participants.find(({ id }) => id === "schema-shield");
  assert.equal(
    versions.get(schemaShield.id),
    packages[schemaShield.packageName].version
  );

  reports[0] = { ...reports[0], version: "9.9.9" };
  assert.throws(
    () => createValidatorVersionMap({ reports, packages }),
    /version metadata mismatch/
  );
});

test("pipeline preserves stage order, propagates mode and stops on failure", async () => {
  const observed = [];
  const progress = [];
  await runPipeline({
    mode: "quick",
    controllerDeadlineMilliseconds: 60 * 60 * 1000,
    eligibilityThresholdPercent: "99.95",
    runCommand: async (
      command,
      mode,
      _resultsRoot,
      _runContext,
      controllerDeadlineMilliseconds,
      eligibilityThresholdPercent,
      validator,
      bench
    ) => observed.push([
      command,
      mode,
      controllerDeadlineMilliseconds,
      eligibilityThresholdPercent,
      validator,
      bench
    ]),
    writeProgress(event) {
      progress.push(event);
    }
  });
  assert.deepEqual(
    observed,
    pipelineCommands.map((command) => [
      command,
      "quick",
      60 * 60 * 1000,
      "99.95",
      null,
      null
    ])
  );
  assert.deepEqual(progress[0], {
    event: "pipeline-context",
    mode: "quick",
    controllerDeadlineMilliseconds: 60 * 60 * 1000,
    eligibilityThresholdPercent: "99.95",
    validator: null,
    bench: null
  });

  const failed = [];
  await assert.rejects(
    () =>
      runPipeline({
        mode: "quick",
        runCommand: async (command) => {
          failed.push(command);
          if (command === "setup") {
            throw new Error("injected setup failure");
          }
        },
        writeProgress() {}
      }),
    /injected setup failure/
  );
  assert.equal(failed.at(-1), "setup");
  assert.equal(failed.includes("execution"), false);
  assert.equal(failed.includes("report"), false);
});

test("phase refresh validates a complete baseline before running only the selected phase", async () => {
  const events = [];
  await runPipeline({
    mode: "quick",
    bench: "cold",
    prepareBaseline: async (context) => events.push({ type: "baseline", ...context }),
    runCommand: async (
      command,
      _mode,
      _root,
      _context,
      _deadline,
      _threshold,
      validator,
      bench
    ) => events.push({ type: "command", command, validator, bench }),
    writeProgress() {}
  });
  assert.equal(events[0].type, "baseline");
  assert.equal(events[0].bench, "cold");
  assert.deepEqual(
    events.slice(1).map(({ command }) => command),
    [
      "preflight",
      "suite-ensure",
      "harness",
      "smoke",
      "conformance",
      "cold-execution",
      "report"
    ]
  );
});

test("pipeline gives every stage one isolated staging root", async () => {
  const roots = [];
  await runPipeline({
    mode: "quick",
    runCommand: async (_command, _mode, resultsRoot) => roots.push(resultsRoot),
    writeProgress() {}
  });

  assert.equal(new Set(roots).size, 1);
  assert.notEqual(roots[0], path.join(benchmarkRoot, "results"));
  assert.ok(roots[0].startsWith(path.join(benchmarkRoot, ".cache")));
});

test("normalized geometric scores reject invalid rates and references", () => {
  const invalidCases = [
    { label: "zero rate", rates: [0], references: [1] },
    { label: "negative rate", rates: [-1], references: [1] },
    { label: "NaN rate", rates: [Number.NaN], references: [1] },
    { label: "infinite rate", rates: [Number.POSITIVE_INFINITY], references: [1] },
    { label: "zero reference", rates: [1], references: [0] },
    { label: "negative reference", rates: [1], references: [-1] },
    { label: "NaN reference", rates: [1], references: [Number.NaN] },
    { label: "infinite reference", rates: [1], references: [Number.POSITIVE_INFINITY] }
  ];
  for (const { label, rates, references } of invalidCases) {
    assert.throws(
      () => normalizedGeometricScore(rates, references),
      /finite and greater than zero/,
      label
    );
  }
  assert.throws(
    () => normalizedGeometricScore([], []),
    /at least one rate/
  );
  assert.throws(
    () => normalizedGeometricScore([1], [1, 1]),
    /same number of rates and references/
  );
  assert.throws(
    () => normalizedGeometricScore([2], [1]),
    /cannot exceed its reference/
  );
});

test("normalized geometric scores use log-space ratios", () => {
  assert.ok(Math.abs(normalizedGeometricScore([25, 100], [100, 100]) - 50) < 1e-12);
  assert.equal(normalizedGeometricScore([1, 1], [1, 1]), 100);
});

test("All Drafts normalizes five Setup scopes and ten execution scopes", () => {
  const scopes = reportScopes();
  let draftValue = 1;
  for (const draft of draftIds) {
    const setupScope = scopes.get(`${draft}/setup`);
    for (const id of Object.keys(setupScope.setupSummary.validators)) {
      setupScope.setupSummary.validators[id] = performanceValues(1);
    }
    setupScope.setupSummary.validators["schema-shield"] = performanceValues(
      draftValue
    );
    setupScope.setupSummary.validators["z-schema"] = performanceValues(
      draftValue
    );
    for (const profile of ["base", "format-assertion"]) {
      const scope = scopes.get(`${draft}/${profile}`);
      const profileOffset = profile === "base" ? 0 : 10;
      for (const id of Object.keys(scope.executionSummary.validators)) {
        scope.executionSummary.validators[id] = performanceValues(1);
      }
      scope.executionSummary.validators["schema-shield"] = performanceValues(
        draftValue + profileOffset
      );
      scope.executionSummary.validators["z-schema"] = performanceValues(
        draftValue + profileOffset
      );
    }
    draftValue += 1;
  }
  delete scopes.get("draft2020-12/format-assertion").executionSummary.validators
    .schemasafe;

  const summary = createGlobalPerformanceSummary(scopes);
  assert.equal(summary.globalSummaryVersion, 15);
  const setup = summary.phases.setup.included.find(
    ({ id }) => id === "schema-shield"
  );
  assert.equal(setup.setupOpsPerSecond, 15);
  assert.equal(setup.setupScore, 100);
  assert.equal(setup.coverage, "5/5");
  for (const removed of [
    "baseOpsPerSecond",
    "formatsOpsPerSecond",
    "averageOpsPerSecond",
    "baseScore",
    "formatsScore",
    "balancedScore"
  ]) {
    assert.equal(Object.hasOwn(setup, removed), false, removed);
  }
  assert.deepEqual(summary.phases.setup.requiredScopes, [
    "draft4/setup",
    "draft6/setup",
    "draft7/setup",
    "draft2019-09/setup",
    "draft2020-12/setup"
  ]);

  const execution = summary.phases.execution.included.find(
    ({ id }) => id === "schema-shield"
  );
  assert.equal(execution.baseOpsPerSecond, 15);
  assert.equal(execution.formatsOpsPerSecond, 65);
  assert.equal(execution.averageOpsPerSecond, 40);
  assert.equal(execution.balancedScore, 100);
  assert.equal(execution.coverage, "10/10");
  assert.equal(summary.phases.execution.requiredScopes.length, 10);
  assert.deepEqual(summary.phases.execution.referencesByDraft.draft4, {
    baseMedian: 1,
    formatsMedian: 11
  });
  const excluded = summary.phases.execution.excluded.find(
    ({ id }) => id === "schemasafe"
  );
  assert.deepEqual(excluded.missingScopes, [
    {
      scope: "draft2020-12/format-assertion",
      reasons: [{ code: "MEASUREMENT_UNAVAILABLE" }]
    }
  ]);
});

test("All Drafts ranks only by Balanced score when raw Average favors another validator", () => {
  const scopes = reportScopes();
  for (const draft of draftIds) {
    for (const profile of ["base", "format-assertion"]) {
      const scope = scopes.get(`${draft}/${profile}`);
      for (const id of Object.keys(scope.executionSummary.validators)) {
        scope.executionSummary.validators[id] = performanceValues(1);
      }
      scope.executionSummary.validators["schema-shield"] = performanceValues(
        draft === "draft4" && profile === "base" ? 1_000 : 1
      );
      scope.executionSummary.validators["z-schema"] = performanceValues(10);
    }
  }

  const summary = createGlobalPerformanceSummary(scopes);
  const leaders = summary.phases.execution.included.slice(0, 2);
  assert.deepEqual(leaders.map(({ id }) => id), ["z-schema", "schema-shield"]);
  assert.equal(leaders[0].averageOpsPerSecond, 50);
  assert.equal(leaders[1].baseOpsPerSecond, 1_004);
  assert.equal(leaders[1].formatsOpsPerSecond, 5);
  assert.equal(leaders[1].averageOpsPerSecond, 504.5);
  assert.ok(leaders[0].balancedScore > leaders[1].balancedScore);
  assert.ok(Math.abs(leaders[0].balancedScore - 63.09573444801933) < 1e-12);
  assert.ok(Math.abs(leaders[1].balancedScore - 12.589254117941675) < 1e-12);
});

test("root summary describes qualified aggregates across drafts and profiles", () => {
  const markdown = renderRootSummary({ environment: reportEnvironment("quick") });

  assert.match(markdown, /qualified All Drafts Setup, Execution and Cold execution aggregates/);
  assert.equal(markdown.includes("Combined"), false);
  assert.equal(markdown.includes("no aggregate across drafts or profiles"), false);
});

test("All Drafts publishes raw ops/s indices before geometric scores in both phase tables", () => {
  const readme = renderBenchmarkReadme({
    mode: "quick",
    scopes: reportScopes(),
    reports: reportFixtures(),
    environment: reportEnvironment("quick"),
    snapshot: reportSnapshot(),
    versions: reportVersions()
  });
  const allDrafts = readme.slice(readme.indexOf("## All drafts results"));

  assert.equal((allDrafts.match(/^### All Drafts Setup$/gm) ?? []).length, 1);
  assert.equal((allDrafts.match(/^### All Drafts Execution$/gm) ?? []).length, 1);
  assert.equal((allDrafts.match(/^### All Drafts Cold execution$/gm) ?? []).length, 1);
  assert.ok(
    allDrafts.indexOf("### All Drafts Setup") <
      allDrafts.indexOf("### All Drafts Execution") &&
      allDrafts.indexOf("### All Drafts Execution") <
        allDrafts.indexOf("### All Drafts Cold execution")
  );
  assert.match(
    allDrafts,
    /^\| Validator \| Setup ops\/s index \| Setup score \| Errors \| Peak RSS \|$/m
  );
  assert.equal(
    (allDrafts.match(/^\| Validator \| Base ops\/s \| Formats ops\/s \| Average ops\/s \| Base score \| Formats score \| Balanced score \|$/gm) ?? []).length,
    2
  );
  assert.equal(allDrafts.includes("Combined"), false);
  const profiles = readme.indexOf("### Profiles");
  const flowchart = readme.indexOf("```mermaid\nflowchart TD", profiles);
  const conformance = readme.indexOf("### Conformance and common PASS corpus");
  assert.ok(profiles < flowchart && flowchart < conformance);
  assert.match(readme, /We normalize scope medians/);
  assert.match(readme, /Raw summed indices remain diagnostic/);
  assert.match(readme, /Setup score.*five-scope geometric mean/);
});

test("generated methodology documents the complete benchmark flow in active voice", () => {
  const readme = renderBenchmarkReadme({
    mode: "quick",
    scopes: reportScopes(),
    reports: reportFixtures(),
    environment: reportEnvironment("quick"),
    snapshot: reportSnapshot(),
    versions: reportVersions()
  });
  const methodology = readme.slice(
    readme.indexOf("## Methodology"),
    readme.indexOf("## Status definitions")
  );
  const flowchart = methodology.match(/```mermaid\nflowchart TD[\s\S]*?```/)?.[0];
  assert.ok(flowchart);
  for (const expected of [
    "We maintain a fixed JSON Schema suite",
    "We run five drafts",
    "We evaluate Base and Formats",
    "We measure conformance for every validator",
    "98% default",
    "draft roster",
    "diagnostic results",
    "We build the common PASS corpus",
    "We measure Setup with deduplicated fresh construction",
    "We measure Execution with prepared validation context",
    "We measure Cold execution directly per case",
    "We consolidate validators that qualify across all five drafts",
    "All Drafts Setup, Execution and Cold execution",
    "We normalize scope medians",
    "equal weight per scope"
  ]) {
    assert.equal(flowchart.includes(expected), true, expected);
  }

  const headings = [
    "### Conformance and common PASS corpus",
    "### Setup",
    "### Execution",
    "### Cold execution",
    "### Timing and scoring",
    "### Mutations",
    "### Memory",
    "### Reproducibility"
  ];
  for (let index = 1; index < headings.length; index += 1) {
    assert.ok(
      methodology.indexOf(headings[index - 1]) < methodology.indexOf(headings[index]),
      headings[index]
    );
  }
  assert.match(methodology, /compare exact integer fractions/);
  assert.match(methodology, /normalized relative performance index/);
  assert.equal(methodology.includes("normalized throughput comparison"), false);
  assert.match(
    methodology,
    /Setup draft tables normalize one median/
  );
  assert.match(
    methodology,
    /reusable adapters call the prepared callable, while `validate-only` adapters call the vendor API through their prepared adapter context/
  );
  assert.match(
    methodology,
    /Before the operation clock, the runner clones the schema and data, constructs and clones the resource closure, applies the format profile and analyzes schema capabilities/
  );
  assert.match(
    methodology,
    /The timed operation creates a fresh opaque adapter and provider context, applies provider-specific configuration and registration, calls `setup\(\)` when available, validates once and ends when validation returns/
  );
  assert.match(
    methodology,
    /Result comparison, checksum, diagnostics and telemetry remain outside the clock/
  );
  assert.match(
    methodology,
    /Quick uses the same complete common performance corpus, 100 ms warmup, 250 ms target, 175 ms normal minimum, phases, scopes, isolation, eligibility, scoring, preparation and sample contract as Full/
  );
  assert.match(methodology, /neither complete antithetic pairs nor multi-round dispersion/);
  assert.match(methodology, /Quick is diagnostic and does not define the canonical publication/);
  assert.match(
    methodology,
    /Full runs complete conformance and the complete common performance corpus under the canonical contract/
  );
  assert.match(methodology, /250 ms target with a normal minimum of 175 ms/);
  assert.match(methodology, /six isolated samples in three antithetic pairs/);
  assert.match(
    methodology,
    /deterministic offsets 0, floor\(n \/ 3\), and floor\(2n \/ 3\)/
  );
  assert.match(methodology, /use their median for ranking and scoring/);
  assert.match(methodology, /relative median absolute deviation/);
  assert.match(methodology, /sample coefficient of variation/);
  assert.match(methodology, /no automatic significance claim/);
  assert.match(methodology, /Run Full only for the final publication/);
  for (const expected of [
    "npm test",
    "npm run benchmark -- --quick",
    "results/<draft>/conformance/<canonical-id>.json",
    "WRONG",
    "COMPILE",
    "RUNTIME",
    "Setup",
    "Cold execution",
    "Execution",
    "actualElapsedMilliseconds",
    "Peak RSS",
    "performance identity",
    "Each performance sample records the validator runtime hash that produced it",
    "rates belong to one scope",
    "relative scores compare eligible validators",
    "global ops/s indices sum scope medians",
    "Before changing the validator, copy the relevant baseline artifacts outside `results/`",
    "record the benchmark contract hash, intersection and performance identities, and baseline values",
    "npm run benchmark -- --quick --validator <canonical-id>",
    "produces only the post-change state; it does not calculate a before/after comparison",
    "Compare that post-change state with the preserved baseline for exactly the same draft, profile and phase",
    "A complete Quick run is required",
    "npm run benchmark"
  ]) {
    assert.equal(methodology.includes(expected), true, expected);
  }
});

test("README methodology and global JSON reflect the configured eligibility threshold", () => {
  const scopes = reportScopes();
  const reports = reportFixtures();
  const eligibilityPolicy = createPerformanceEligibilityPolicy("99.95");
  for (const scope of scopes.values()) {
    for (const phase of performancePhases) {
      if (scope.intersections?.[phase] !== undefined) {
        scope.intersections[phase].eligibility.policy = eligibilityPolicy;
      }
    }
  }
  const globalSummary = createGlobalPerformanceSummary(scopes, reports, "99.95");
  const environment = {
    ...reportEnvironment("quick"),
    performanceEligibility: eligibilityPolicy
  };
  const readme = renderBenchmarkReadme({
    mode: "quick",
    scopes,
    reports,
    environment,
    snapshot: reportSnapshot(),
    versions: reportVersions(),
    globalSummary
  });

  assert.equal(globalSummary.eligibility.policy.thresholdPercent, "99.95");
  assert.match(readme, /configured 99\.95% gate/);
  assert.match(readme, /For All Drafts, we require atomic eligibility at 99\.95%/);
  assert.match(readme, /coordinated transactional publication/);
  assert.match(readme, /concurrent readers can observe the rename window/i);
  assert.equal(readme.includes("one atomic replacement"), false);
  assert.equal((readme.match(/^### All Drafts /gm) ?? []).length, 3);
  assert.equal(readme.includes("Combined"), false);
});

test("All Drafts keeps five Setup scopes independent from ten execution scopes", () => {
  const scopes = reportScopes();
  const excludedId = "schema-shield";
  scopes.get("draft2020-12/setup").intersections.setup.eligibility.roster.excluded = [
    {
      id: excludedId,
      reasons: [
        {
          code: "PASS_THRESHOLD_NOT_MET",
          profile: "base",
          pass: 97,
          total: 100,
          thresholdPercent: "98"
        }
      ]
    }
  ];

  const summary = createGlobalPerformanceSummary(scopes, reportFixtures());
  assert.equal(summary.phases.setup.excluded.some(({ id }) => id === excludedId), true);
  assert.equal(
    summary.phases.execution.included.some(({ id }) => id === excludedId),
    true
  );
});

test("global error aggregation preserves exact statuses and zero totals", () => {
  const reports = reportFixtures();
  reports
    .find(
      ({ draft, validator }) =>
        draft === "draft6" && validator === "schema-shield"
    )
    .cases.push({
      id: "draft6:fixture#/tests/0",
      description: "setup failure",
      formatProfile: "base",
      status: "COMPILE",
      error: "failed"
    });
  const summary = createGlobalPerformanceSummary(reportScopes(), reports);
  const schemaShield = summary.phases.setup.included.find(
    ({ id }) => id === "schema-shield"
  );

  assert.equal(schemaShield.errors.setup.count, 1);
  assert.equal(schemaShield.errors.setup.records[0].status, "COMPILE");
});

async function publicationFixture(label) {
  const root = path.join(
    benchmarkRoot,
    ".cache",
    "publication-tests",
    `${label}-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
  const currentResults = path.join(root, "current-results");
  const currentReadme = path.join(root, "README.md");
  const transactionRoot = path.join(root, "transaction");
  await mkdir(currentResults, { recursive: true });
  await writeFile(path.join(currentResults, "marker.txt"), "old-results\n");
  await writeFile(currentReadme, "old-readme\n");
  return { root, currentResults, currentReadme, transactionRoot };
}

async function stagedPublication(root, label, readme) {
  const stagedResults = path.join(root, `staged-${label}`);
  const stagedReadme = path.join(root, `staged-${label}.md`);
  await mkdir(stagedResults, { recursive: true });
  await writeFile(path.join(stagedResults, "marker.txt"), `${label}-results\n`);
  await writeFile(stagedReadme, readme);
  return { stagedResults, stagedReadme };
}

async function directorySnapshot(root) {
  const snapshot = {};
  async function visit(directory, prefix = "") {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) =>
      left.name < right.name ? -1 : left.name > right.name ? 1 : 0
    );
    for (const entry of entries) {
      const relativePath = prefix.length === 0
        ? entry.name
        : `${prefix}/${entry.name}`;
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(absolutePath, relativePath);
      } else {
        snapshot[relativePath] = (await readFile(absolutePath)).toString("base64");
      }
    }
  }
  await visit(root);
  return snapshot;
}

async function atomicMutationPublicationFixture(label) {
  const root = path.join(
    benchmarkRoot,
    "tmp",
    `atomic-publication-${label}-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
  const currentResults = path.join(root, "results");
  const currentReadme = path.join(root, "README.md");
  const stagedResults = path.join(root, "staged-results");
  const stagedReadme = path.join(root, "staged-README.md");
  const transactionRoot = path.join(root, "transaction");
  for (const directory of [
    path.join(currentResults, "mutations"),
    path.join(stagedResults, "mutations")
  ]) {
    await mkdir(directory, { recursive: true });
  }
  await writeFile(path.join(currentResults, "marker.txt"), "old-results\n");
  await writeFile(
    path.join(currentResults, "mutations", "index.json"),
    '{"generation":"old"}\n'
  );
  await writeFile(
    path.join(currentResults, "mutations", "old.md"),
    "old mutation document\n"
  );
  await writeFile(currentReadme, "old-readme\n");
  await writeFile(path.join(stagedResults, "marker.txt"), "new-results\n");
  await writeFile(
    path.join(stagedResults, "mutations", "index.json"),
    '{"generation":"new"}\n'
  );
  await writeFile(
    path.join(stagedResults, "mutations", "new.md"),
    "new mutation document\n"
  );
  await writeFile(stagedReadme, "new-readme\n");
  return {
    root,
    currentResults,
    currentReadme,
    stagedResults,
    stagedReadme,
    transactionRoot
  };
}

test("coordinated publication rolls back only before both canonical paths commit", async () => {
  const faultPoints = [
    ["move-current-results", "before"],
    ["move-current-results", "after"],
    ["move-current-readme", "before"],
    ["move-current-readme", "after"],
    ["publish-staged-results", "before"],
    ["publish-staged-results", "after"],
    ["publish-staged-readme", "before"]
  ];
  for (const [step, timing] of faultPoints) {
      const fixture = await atomicMutationPublicationFixture(`${step}-${timing}`);
      try {
        const beforeResults = await directorySnapshot(fixture.currentResults);
        const beforeReadme = await readFile(fixture.currentReadme, "utf8");
        const stagedResults = await directorySnapshot(fixture.stagedResults);
        const stagedReadme = await readFile(fixture.stagedReadme, "utf8");
        await assert.rejects(
          () =>
            publishBenchmarkArtifacts({
              ...fixture,
              faultInjection: ({ step: observedStep, timing: observedTiming }) => {
                if (observedStep === step && observedTiming === timing) {
                  throw new Error(`injected ${step}/${timing}`);
                }
              }
            }),
          new RegExp(`injected ${step}/${timing}`)
        );
        assert.deepEqual(await directorySnapshot(fixture.currentResults), beforeResults);
        assert.equal(await readFile(fixture.currentReadme, "utf8"), beforeReadme);
        assert.deepEqual(await directorySnapshot(fixture.stagedResults), stagedResults);
        assert.equal(await readFile(fixture.stagedReadme, "utf8"), stagedReadme);
        assert.deepEqual(
          (await readdir(fixture.root)).filter((name) =>
            /transaction|cleanup|aborted|previous/.test(name)
          ),
          []
        );
      } finally {
        await rm(fixture.root, { recursive: true, force: true });
      }
  }
});

test("post-commit rename faults preserve the complete new publication", async () => {
  const faultPoints = [
    ["publish-staged-readme", "after"],
    ["relocate-backups-for-cleanup", "before"],
    ["relocate-backups-for-cleanup", "after"]
  ];
  for (const [step, timing] of faultPoints) {
    const fixture = await atomicMutationPublicationFixture(`${step}-${timing}`);
    try {
      const expectedResults = await directorySnapshot(fixture.stagedResults);
      const result = await publishBenchmarkArtifacts({
        ...fixture,
        faultInjection: ({ step: observedStep, timing: observedTiming }) => {
          if (observedStep === step && observedTiming === timing) {
            throw new Error(`injected ${step}/${timing}`);
          }
        }
      });
      assert.equal(result.committed, true);
      assert.equal(result.cleanupComplete, false);
      assert.match(result.cleanup.error.message, new RegExp(`injected ${step}/${timing}`));
      assert.equal(result.cleanup.failedStep, step);
      assert.equal(result.cleanup.failedTiming, timing);
      assert.equal(typeof result.cleanup.activeBackupRoot, "string");
      assert.equal(result.cleanup.activeBackupRootExists, true);
      assert.ok(result.cleanup.residuePaths.length > 0);
      assert.deepEqual(await directorySnapshot(fixture.currentResults), expectedResults);
      assert.equal(await readFile(fixture.currentReadme, "utf8"), "new-readme\n");
      assert.equal(
        Object.hasOwn(await directorySnapshot(fixture.currentResults), "mutations/old.md"),
        false
      );
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  }
});

test("coordinated publication commits mutation documents and manifest as one results tree", async () => {
  const fixture = await atomicMutationPublicationFixture("success");
  try {
    const expectedResults = await directorySnapshot(fixture.stagedResults);
    await publishBenchmarkArtifacts(fixture);
    assert.deepEqual(await directorySnapshot(fixture.currentResults), expectedResults);
    assert.equal(await readFile(fixture.currentReadme, "utf8"), "new-readme\n");
    assert.equal(
      await readFile(
        path.join(fixture.currentResults, "mutations", "index.json"),
        "utf8"
      ),
      '{"generation":"new"}\n'
    );
    assert.deepEqual(
      (await readdir(fixture.root)).filter((name) =>
        /transaction|cleanup|aborted|previous|staged/.test(name)
      ),
      []
    );
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});

test("cleanup remove failures never restore complete or partial old backups", async () => {
  for (const mode of ["before-remove", "after-partial-remove"]) {
    const fixture = await atomicMutationPublicationFixture(mode);
    try {
      const expectedResults = await directorySnapshot(fixture.stagedResults);
      const result = await publishBenchmarkArtifacts({
        ...fixture,
        removePath: async (cleanupRoot) => {
          if (mode === "after-partial-remove") {
            await rm(
              path.join(cleanupRoot, "previous-results", "mutations", "old.md")
            );
            await rm(
              path.join(cleanupRoot, "previous-readme", "README.md")
            );
          }
          throw new Error(`injected ${mode}`);
        }
      });
      assert.equal(result.committed, true);
      assert.equal(result.cleanupComplete, false);
      assert.match(result.cleanup.error.message, new RegExp(`injected ${mode}`));
      assert.equal(result.cleanup.failedStep, "cleanup-remove");
      assert.equal(result.cleanup.failedTiming, "remove");
      assert.equal(result.cleanup.activeBackupRootExists, true);
      assert.deepEqual(await directorySnapshot(fixture.currentResults), expectedResults);
      assert.equal(await readFile(fixture.currentReadme, "utf8"), "new-readme\n");
      assert.equal(
        Object.hasOwn(await directorySnapshot(fixture.currentResults), "mutations/old.md"),
        false
      );
      if (mode === "after-partial-remove") {
        assert.equal(
          result.cleanup.residuePaths.includes(
            "previous-results/mutations/old.md"
          ),
          false
        );
        assert.equal(
          result.cleanup.residuePaths.includes("previous-readme/README.md"),
          false
        );
      }
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  }
});

test("publication rollback restores both prior artifacts", async () => {
  const fixture = await publicationFixture("rollback");
  const staged = await stagedPublication(fixture.root, "quick", "quick-readme\n");
  const { rename } = await import("node:fs/promises");

  await assert.rejects(
    () =>
      publishBenchmarkArtifacts({
        ...fixture,
        ...staged,
        renamePath: async (source, target) => {
          if (source === staged.stagedReadme) {
            throw new Error("injected publication failure");
          }
          await rename(source, target);
        }
      }),
    /injected publication failure/
  );
  assert.equal(
    await readFile(path.join(fixture.currentResults, "marker.txt"), "utf8"),
    "old-results\n"
  );
  assert.equal(await readFile(fixture.currentReadme, "utf8"), "old-readme\n");
});

test("Full publication transaction replaces Quick artifacts", async () => {
  const fixture = await publicationFixture("replace");
  const scopes = reportScopes();
  const reports = reportFixtures();
  const quick = await stagedPublication(
    fixture.root,
    "quick",
    renderBenchmarkReadme({
      mode: "quick",
      scopes,
      reports,
      environment: reportEnvironment("quick"),
      snapshot: reportSnapshot(),
      versions: reportVersions()
    })
  );
  await publishBenchmarkArtifacts({ ...fixture, ...quick });
  assert.match(await readFile(fixture.currentReadme, "utf8"), /\(quick\)/);

  const full = await stagedPublication(
    fixture.root,
    "full",
    renderBenchmarkReadme({
      mode: "full",
      scopes,
      reports,
      environment: reportEnvironment("full"),
      snapshot: reportSnapshot(),
      versions: reportVersions()
    })
  );
  await publishBenchmarkArtifacts({
    ...fixture,
    ...full,
    transactionRoot: path.join(fixture.root, "transaction-full")
  });

  assert.equal(
    (await readFile(fixture.currentReadme, "utf8")).includes("(quick)"),
    false
  );
  assert.equal(
    await readFile(path.join(fixture.currentResults, "marker.txt"), "utf8"),
    "full-results\n"
  );
});
