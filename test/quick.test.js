import assert from "node:assert/strict";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  createBenchmarkContractHash,
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
  summarizePhase
} from "../src/report.js";
import * as reportApi from "../src/report.js";
import {
  draftIds,
  getCompileParticipants,
  getParticipants,
  validators
} from "../src/matrix.js";
import {
  derivePerformanceCorpus,
  quickPerformanceCorpusContract
} from "../src/performance-corpus.js";
import { createPerformanceEligibilityPolicy } from "../src/eligibility.js";

const benchmarkRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

function performanceValues(midpoint) {
  return {
    roundThroughputs: [midpoint],
    minimum: midpoint,
    maximum: midpoint,
    midpoint
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
    draftIds.flatMap((draft) =>
      ["base", "format-assertion"].map((profile) => {
        const validators = Object.fromEntries(
          getParticipants(draft).map((participant, index) => [
            participant.id,
            performanceValues(200 - index * 10)
          ])
        );
        return [
          `${draft}/${profile}`,
          {
            intersection: { counts: { total: 10, compileEntries: 2 } },
            compileSummary: {
              validators: Object.fromEntries(
                Object.entries(validators).filter(
                  ([id]) =>
                    getCompileParticipants(draft).some(
                      ({ id: candidate }) => candidate === id
                    )
                )
              )
            },
            executionSummary: { validators }
          }
        ];
      })
    )
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
  const compileRecords = [
    mutation({
      phase: "conformance",
      target: "schema",
      mutationClass: "compile",
      scope: "schema",
      subjectId: "draft6:schema/one",
      path: "$.__normalized"
    }),
    mutation({
      phase: "conformance",
      target: "resources",
      mutationClass: "compile",
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
      "draft6/base",
      {
        compileSummary: {
          phase: "compile",
          draft: "draft6",
          formatProfile: "base",
          mutations: {
            validators: {
              [validator]: {
                count: 2,
                records: [...compileRecords, compileRecords[0]]
              }
            }
          },
          validators: { [validator]: performanceValues(10) }
        },
        executionSummary: {
          phase: "execution",
          draft: "draft6",
          formatProfile: "base",
          mutations: { validators: validators(executionRecords) },
          validators: { [validator]: performanceValues(20) }
        }
      }
    ],
    [
      "draft6/format-assertion",
      {
        compileSummary: {
          phase: "compile",
          draft: "draft6",
          formatProfile: "format-assertion",
          mutations: { validators: validators([]) },
          validators: { [validator]: performanceValues(11) }
        },
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
          errorCode: "FAST_COMPILE_ERROR",
          error: "fixture compile error"
        }
      ]
    }
  ];
  return {
    validator,
    scopes,
    reports,
    versions: new Map([[validator, "9.8.7"]]),
    compileRecords,
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
    scope.compileSummary.mutations.validators[fixture.validator] = {
      count: 0,
      records: []
    };
    scope.executionSummary.mutations.validators[fixture.validator] = {
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
    for (const summary of [scope.compileSummary, scope.executionSummary]) {
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
  assert.match(document.content, /FAST\\_COMPILE\\_ERROR: fixture compile error/);
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
    for (const summary of [scope.compileSummary, scope.executionSummary]) {
      summary.mutations.validators[shuffled.validator].records.reverse();
    }
  }
  assert.equal(reportApi.createMutationDocuments(shuffled)[0].content, document.content);
  for (const scope of shuffled.scopes.values()) {
    for (const summary of [scope.compileSummary, scope.executionSummary]) {
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
    scope.executionSummary.mutations.validators[fixture.validator].records.reverse();
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
  base.compileSummary.validators.ajv = performanceValues(30);
  base.compileSummary.mutations.validators.ajv = { count: 0, records: [] };
  const fasterParticipant = {
    id: "ajv",
    packageName: "ajv",
    version: "1.0.0"
  };
  const scopeTable = performanceTable(
    "Compile",
    base.compileSummary,
    [participant, fasterParticipant],
    { mutationLinkPrefix: "../mutations" }
  );
  const consolidated = consolidatedPerformanceTable({
    title: "Compile",
    phase: "compile",
    draft: "draft6",
    baseSummary: base.compileSummary,
    formatSummary: fixture.scopes.get("draft6/format-assertion").compileSummary,
    reports: fixture.reports,
    participants: [participant],
    errorLinkPrefix: "errors",
    mutationLinkPrefix: "../mutations"
  });
  const expectedLinks = [
    `../${document.relativePath}#${reportApi.mutationViewAnchor({ view: "scope", draft: "draft6", formatProfile: "base", phase: "conformance" })}`,
    `../${document.relativePath}#${reportApi.mutationViewAnchor({ view: "draft", draft: "draft6", phase: "conformance" })}`
  ];
  for (const [markdown, href] of [
    [scopeTable, expectedLinks[0]],
    [consolidated, expectedLinks[1]]
  ]) {
    assert.match(markdown, new RegExp(`\\[\\d+\\]\\(${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\)`));
    const anchor = href.split("#")[1];
    assert.match(document.content, new RegExp(`<a id="${anchor}"></a>`));
  }
  assert.ok(scopeTable.indexOf("[ajv]") < scopeTable.indexOf("[schema-shield]"));
  const zero = performanceTable(
    "Compile",
    {
      ...base.compileSummary,
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
    assert.equal(index.resultsVersion, 10);
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
    for (const id of Object.keys(scope.compileSummary.validators)) {
      scope.compileSummary.validators[id] = performanceValues(2_000);
    }
    for (const id of Object.keys(scope.executionSummary.validators)) {
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

  assert.equal([...markdown.matchAll(/^xychart horizontal$/gm)].length, 5);
  assert.equal(markdown.includes("xychart-beta"), false);
  assert.deepEqual(
    [...markdown.matchAll(/^    title ".*\(Higher is better, values in ([KM])\)"$/gm)]
      .map((match) => match[1]),
    ["K", "M"]
  );
  assert.equal(
    [...markdown.matchAll(/^    y-axis "Average ops\/s" 0 --> /gm)].length,
    2
  );
  assert.equal(
    [...markdown.matchAll(/^    y-axis "Balanced score" 0 --> 100$/gm)].length,
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

  assert.equal(charts.length, 5);
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
    mutationClass: "compile"
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
    "Compile",
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
    2
  );
  assert.equal(
    [...readme.matchAll(/\| Validator \| Base ops\/s \| Formats ops\/s \| Average ops\/s \| Base score \| Formats score \| Balanced score \|/g)].length,
    2
  );

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
    6
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
      /^\| \[([^\]]+)\]\(https:\/\/www\.npmjs\.com\/package\/[^)]+\) \([^)]*\) \| ([\d,]+) \|$/gm
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
  const compileEntries = Array.from({ length: 20 }, (_, index) => ({
    compileKey: `${draft}:${formatProfile}:compile-${index}`,
    draft,
    formatProfile,
    representativeSchemaId: `${draft}:schema-${index}`,
    memberSchemaIds: [`${draft}:schema-${index}`],
    resources: []
  }));
  const cases = compileEntries.flatMap((entry, index) => [
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
      compileEntries
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
    validator: null
  });
  assert.deepEqual(parsePipelineArguments(["--quick"]), {
    mode: "quick",
    controllerDeadlineMilliseconds: null,
    eligibilityThresholdPercent: "98",
    validator: null
  });
  assert.deepEqual(
    parsePipelineArguments(["--controller-deadline-minutes", "60"]),
    {
      mode: "full",
      controllerDeadlineMilliseconds: 60 * 60 * 1000,
      eligibilityThresholdPercent: "98",
      validator: null
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
    14 * 60 * 1000
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

test("Quick corpus selection is deterministic, bounded and balanced", () => {
  for (const draft of draftIds) {
    for (const formatProfile of ["base", "format-assertion"]) {
      const fixture = performanceCorpusFixture(draft, formatProfile);
      const selected = derivePerformanceCorpus({ mode: "quick", ...fixture });
      const reversed = derivePerformanceCorpus({
        mode: "quick",
        cases: [...fixture.cases].reverse(),
        intersection: {
          ...fixture.intersection,
          caseIds: [...fixture.intersection.caseIds].reverse(),
          compileEntries: [...fixture.intersection.compileEntries].reverse()
        }
      });

      assert.deepEqual(selected, reversed);
      assert.ok(
        selected.compileEntries.length <=
          quickPerformanceCorpusContract.maximumCompileEntriesPerScope
      );
      assert.ok(
        selected.caseIds.length <=
          quickPerformanceCorpusContract.maximumExecutionCasesPerScope
      );
      assert.ok(selected.metadata.selected.validCases > 0);
      assert.ok(selected.metadata.selected.invalidCases > 0);

      const selectedCaseIds = new Set(selected.caseIds);
      const selectedSchemaIds = new Set(
        fixture.cases
          .filter(({ id }) => selectedCaseIds.has(id))
          .map(({ schemaId }) => schemaId)
      );
      const representedSchemaIds = new Set(
        selected.compileEntries.flatMap(({ memberSchemaIds }) => memberSchemaIds)
      );
      assert.ok(
        [...selectedSchemaIds].every((schemaId) =>
          representedSchemaIds.has(schemaId)
        )
      );
    }
  }
});

test("Quick corpus rejects a one-sided intersection", () => {
  const fixture = performanceCorpusFixture();
  const validOnly = fixture.cases.filter(({ expected }) => expected === true);
  assert.throws(
    () =>
      derivePerformanceCorpus({
        mode: "quick",
        cases: validOnly,
        intersection: {
          ...fixture.intersection,
          caseIds: validOnly.map(({ id }) => id)
        }
      }),
    /requires valid and invalid cases/
  );
});

test("Full keeps the complete intersection and has an isolated contract", () => {
  const fixture = performanceCorpusFixture();
  const full = derivePerformanceCorpus({ mode: "full", ...fixture });
  const quick = derivePerformanceCorpus({ mode: "quick", ...fixture });

  assert.strictEqual(full.caseIds, fixture.intersection.caseIds);
  assert.strictEqual(full.compileEntries, fixture.intersection.compileEntries);
  assert.equal(full.metadata, null);
  assert.notDeepEqual(quick.caseIds, full.caseIds);
  assert.notEqual(
    createBenchmarkContractHash({ mode: "quick" }),
    createBenchmarkContractHash({ mode: "full" })
  );
});

test("Quick and Full checkpoints cannot overlap", () => {
  const request = {
    phase: "compile",
    draft: "draft6",
    formatProfile: "base",
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
  assert.ok(quick.includes(`${path.sep}granular-samples-v9${path.sep}`));
  assert.ok(full.includes(`${path.sep}granular-samples-v9${path.sep}`));
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
      validator
    ) => observed.push([
      command,
      mode,
      controllerDeadlineMilliseconds,
      eligibilityThresholdPercent,
      validator
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
      null
    ])
  );
  assert.deepEqual(progress[0], {
    event: "pipeline-context",
    mode: "quick",
    controllerDeadlineMilliseconds: 60 * 60 * 1000,
    eligibilityThresholdPercent: "99.95",
    validator: null
  });

  const failed = [];
  await assert.rejects(
    () =>
      runPipeline({
        mode: "quick",
        runCommand: async (command) => {
          failed.push(command);
          if (command === "compile") {
            throw new Error("injected compile failure");
          }
        },
        writeProgress() {}
      }),
    /injected compile failure/
  );
  assert.equal(failed.at(-1), "compile");
  assert.equal(failed.includes("execution"), false);
  assert.equal(failed.includes("report"), false);
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

test("All Drafts normalizes ten scopes, excludes incomplete data and orders Balanced score ties", () => {
  const scopes = reportScopes();
  let draftValue = 1;
  for (const draft of draftIds) {
    for (const profile of ["base", "format-assertion"]) {
      const scope = scopes.get(`${draft}/${profile}`);
      const profileOffset = profile === "base" ? 0 : 10;
      for (const id of Object.keys(scope.compileSummary.validators)) {
        scope.compileSummary.validators[id] = performanceValues(1);
      }
      for (const id of Object.keys(scope.executionSummary.validators)) {
        scope.executionSummary.validators[id] = performanceValues(1);
      }
      scope.compileSummary.validators["schema-shield"] = performanceValues(
        draftValue + profileOffset
      );
      scope.executionSummary.validators["schema-shield"] = performanceValues(
        draftValue + profileOffset
      );
      scope.compileSummary.validators["z-schema"] = performanceValues(
        draftValue + profileOffset
      );
      scope.executionSummary.validators["z-schema"] = performanceValues(
        draftValue + profileOffset
      );
    }
    draftValue += 1;
  }
  delete scopes.get("draft2020-12/format-assertion").compileSummary.validators
    .schemasafe;
  delete scopes.get("draft2020-12/format-assertion").executionSummary.validators
    .schemasafe;

  const summary = createGlobalPerformanceSummary(scopes);
  assert.equal(summary.globalSummaryVersion, 11);
  for (const phase of ["compile", "execution"]) {
    const schemaShield = summary.phases[phase].included.find(
      ({ id }) => id === "schema-shield"
    );
    assert.equal(schemaShield.baseScore, 100);
    assert.equal(schemaShield.formatsScore, 100);
    assert.equal(schemaShield.balancedScore, 100);
    assert.equal(schemaShield.baseOpsPerSecond, 15);
    assert.equal(schemaShield.formatsOpsPerSecond, 65);
    assert.equal(schemaShield.averageOpsPerSecond, 40);
    assert.equal(Object.hasOwn(schemaShield, "base"), false);
    assert.equal(Object.hasOwn(schemaShield, "formats"), false);
    assert.equal(Object.hasOwn(schemaShield, "average"), false);
    assert.equal(Object.hasOwn(schemaShield, "scoreVsBestAverage"), false);
    assert.equal(schemaShield.coverage, "10/10");
    for (const participant of summary.phases[phase].included) {
      const baseRates = draftIds.map(
        (draft) =>
          scopes.get(`${draft}/base`)[`${phase}Summary`].validators[participant.id]
            .midpoint
      );
      const formatsRates = draftIds.map(
        (draft) =>
          scopes.get(`${draft}/format-assertion`)[`${phase}Summary`].validators[
            participant.id
          ].midpoint
      );
      const baseReferences = draftIds.map(
        (draft) => summary.phases[phase].referencesByDraft[draft].baseMidpoint
      );
      const formatsReferences = draftIds.map(
        (draft) => summary.phases[phase].referencesByDraft[draft].formatsMidpoint
      );
      const expectedBase = baseRates.reduce((total, rate) => total + rate, 0);
      const expectedFormats = formatsRates.reduce((total, rate) => total + rate, 0);
      assert.equal(participant.baseOpsPerSecond, expectedBase, participant.id);
      assert.equal(participant.formatsOpsPerSecond, expectedFormats, participant.id);
      assert.equal(
        participant.averageOpsPerSecond,
        (expectedBase + expectedFormats) / 2,
        participant.id
      );
      assert.equal(
        participant.baseScore,
        normalizedGeometricScore(baseRates, baseReferences),
        participant.id
      );
      assert.equal(
        participant.formatsScore,
        normalizedGeometricScore(formatsRates, formatsReferences),
        participant.id
      );
      assert.equal(
        participant.balancedScore,
        normalizedGeometricScore(
          [...baseRates, ...formatsRates],
          [...baseReferences, ...formatsReferences]
        ),
        participant.id
      );
    }
    assert.deepEqual(
      summary.phases[phase].included
        .filter(({ balancedScore }) => balancedScore === 100)
        .map(({ id }) => id),
      ["schema-shield", "z-schema"]
    );
    assert.deepEqual(summary.phases[phase].referencesByDraft.draft4, {
      baseMidpoint: 1,
      formatsMidpoint: 11
    });
    assert.equal(Object.hasOwn(summary.phases[phase], "bestAverage"), false);

    const excluded = summary.phases[phase].excluded.find(
      ({ id }) => id === "schemasafe"
    );
    assert.deepEqual(excluded.missingScopes, [
      {
        scope: "draft2020-12/format-assertion",
        reasons: [{ code: "MEASUREMENT_UNAVAILABLE" }]
      }
    ]);
    assert.equal(Object.hasOwn(summary.phases[phase], "rankings"), false);
    const excludedIds = summary.phases[phase].excluded.map(({ id }) => id);
    const metadata = new Map(
      draftIds
        .flatMap((draft) => getParticipants(draft))
        .map((participant) => [participant.id, participant])
    );
    const nominal = [...excludedIds].sort((leftId, rightId) => {
      const left = metadata.get(leftId);
      const right = metadata.get(rightId);
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
    });
    assert.deepEqual(excludedIds, nominal);
  }
});

test("All Drafts ranks only by Balanced score when raw Average favors another validator", () => {
  const scopes = reportScopes();
  for (const draft of draftIds) {
    for (const profile of ["base", "format-assertion"]) {
      const scope = scopes.get(`${draft}/${profile}`);
      for (const phase of ["compile", "execution"]) {
        for (const id of Object.keys(scope[`${phase}Summary`].validators)) {
          scope[`${phase}Summary`].validators[id] = performanceValues(1);
        }
        scope[`${phase}Summary`].validators["schema-shield"] = performanceValues(
          draft === "draft4" && profile === "base" ? 1_000 : 1
        );
        scope[`${phase}Summary`].validators["z-schema"] = performanceValues(10);
      }
    }
  }

  const summary = createGlobalPerformanceSummary(scopes);
  for (const phase of ["compile", "execution"]) {
    const leaders = summary.phases[phase].included.slice(0, 2);
    assert.deepEqual(leaders.map(({ id }) => id), ["z-schema", "schema-shield"]);
    assert.equal(leaders[0].averageOpsPerSecond, 50);
    assert.equal(leaders[1].baseOpsPerSecond, 1_004);
    assert.equal(leaders[1].formatsOpsPerSecond, 5);
    assert.equal(leaders[1].averageOpsPerSecond, 504.5);
    assert.ok(leaders[0].balancedScore > leaders[1].balancedScore);
    assert.ok(Math.abs(leaders[0].balancedScore - 63.09573444801933) < 1e-12);
    assert.ok(Math.abs(leaders[1].balancedScore - 12.589254117941675) < 1e-12);
  }
});

test("root summary describes qualified aggregates across drafts and profiles", () => {
  const markdown = renderRootSummary({ environment: reportEnvironment("quick") });

  assert.match(markdown, /qualified All Drafts Compile and Execution aggregates/);
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

  assert.equal((allDrafts.match(/^### All Drafts Compile$/gm) ?? []).length, 1);
  assert.equal((allDrafts.match(/^### All Drafts Execution$/gm) ?? []).length, 1);
  assert.equal(
    (allDrafts.match(/^\| Validator \| Base ops\/s \| Formats ops\/s \| Average ops\/s \| Base score \| Formats score \| Balanced score \|$/gm) ?? []).length,
    2
  );
  assert.equal(allDrafts.includes("Combined"), false);
  const profiles = readme.indexOf("### Profiles");
  const flowchart = readme.indexOf("```mermaid\nflowchart TD", profiles);
  const conformance = readme.indexOf("### Conformance and common PASS corpus");
  assert.ok(profiles < flowchart && flowchart < conformance);
  assert.match(readme, /We normalize scope midpoints/);
  assert.match(readme, /raw aggregated indices with inherited ops\/s units/);
  assert.match(readme, /Balanced score determines the leader and row order/);
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
    "We measure Compile with fresh complete construction",
    "We measure Execution with a reusable callable",
    "draft results: Base, Formats, and Average",
    "We consolidate validators that qualify across all five drafts",
    "All Drafts Compile and Execution",
    "We normalize scope midpoints",
    "equal weight per scope"
  ]) {
    assert.equal(flowchart.includes(expected), true, expected);
  }

  const headings = [
    "### Conformance and common PASS corpus",
    "### Compile",
    "### Execution",
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
    /Draft tables retain the arithmetic Average of their Base and Formats midpoints/
  );
});

test("README methodology and global JSON reflect the configured eligibility threshold", () => {
  const scopes = reportScopes();
  const reports = reportFixtures();
  const globalSummary = createGlobalPerformanceSummary(scopes, reports, "99.95");
  const environment = {
    ...reportEnvironment("quick"),
    performanceEligibility: createPerformanceEligibilityPolicy("99.95")
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
  assert.equal((readme.match(/^### All Drafts /gm) ?? []).length, 2);
  assert.equal(readme.includes("Combined"), false);
});

test("All Drafts requires all ten phase scopes and keeps phase eligibility independent", () => {
  const scopes = reportScopes();
  const excludedId = "schema-shield";
  for (const scope of scopes.values()) {
    scope.intersections = {
      compile: {
        eligibility: { roster: { excluded: [] } }
      },
      execution: {
        eligibility: { roster: { excluded: [] } }
      }
    };
  }
  scopes.get("draft2020-12/base").intersections.compile.eligibility.roster.excluded = [
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
  assert.equal(summary.phases.compile.excluded.some(({ id }) => id === excludedId), true);
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
      description: "compile failure",
      formatProfile: "base",
      status: "COMPILE",
      error: "failed"
    });
  const summary = createGlobalPerformanceSummary(reportScopes(), reports);
  const schemaShield = summary.phases.compile.included.find(
    ({ id }) => id === "schema-shield"
  );

  assert.equal(schemaShield.errors.base.count, 1);
  assert.equal(schemaShield.errors.base.records[0].status, "COMPILE");
  assert.equal(schemaShield.errors.formats.count, 0);
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
