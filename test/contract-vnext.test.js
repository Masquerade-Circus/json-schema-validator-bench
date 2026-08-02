import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  benchmarkModes,
  createBenchmarkContract,
  performancePhases,
  sampleCacheIdentityVersion,
  sampleContractVersion
} from "../src/benchmark.js";
import {
  getColdExecutionParticipants,
  getParticipants
} from "../src/matrix.js";
import { normalizedGeometricScore, summarizePhase } from "../src/report.js";
import { runColdExecutionSample, runCompileSample } from "../src/worker.js";
import { rotateRoundOrder } from "../src/adapters/index.js";
import { createCompileEntries, mergeSetupEntries } from "../src/intersection.js";

test("vNext rejects the legacy performance phase contract", () => {
  const contract = createBenchmarkContract("full");
  assert.equal(benchmarkModes.full.rounds, 6);
  assert.equal(benchmarkModes.full.setupWarmupMinimumMilliseconds, 100);
  assert.equal(benchmarkModes.full.setupTargetMilliseconds, 250);
  assert.equal(benchmarkModes.full.setupMinimumSampleMilliseconds, 175);
  assert.equal(benchmarkModes.full.executionWarmupMinimumMilliseconds, 100);
  assert.equal(benchmarkModes.full.executionTargetMilliseconds, 250);
  assert.equal(benchmarkModes.full.executionMinimumSampleMilliseconds, 175);
  assert.equal(benchmarkModes.full.coldExecutionWarmupMinimumMilliseconds, 100);
  assert.equal(benchmarkModes.full.coldExecutionTargetMilliseconds, 250);
  assert.equal(benchmarkModes.full.coldExecutionMinimumSampleMilliseconds, 175);
  assert.equal(benchmarkModes.quick.rounds, 1);
  assert.equal(benchmarkModes.quick.setupTargetMilliseconds, 0);
  assert.equal(benchmarkModes.quick.executionTargetMilliseconds, 0);
  assert.equal(benchmarkModes.quick.coldExecutionTargetMilliseconds, 0);
  assert.equal(Object.hasOwn(contract, "compile"), false);
  assert.deepEqual(Object.keys(contract.phases), [
    "setup",
    "execution",
    "cold-execution"
  ]);
  assert.deepEqual(performancePhases, ["setup", "execution", "cold-execution"]);
  for (const participants of Object.values(contract.participantsByDraft)) {
    assert.deepEqual(Object.keys(participants), [
      "setup",
      "execution",
      "cold-execution"
    ]);
  }
  assert.equal(sampleContractVersion > 15, true);
  assert.equal(sampleCacheIdentityVersion > 9, true);
});

test("createCompileEntries uses effective draft format semantics", () => {
  for (const draft of ["draft4", "draft6", "draft7"]) {
    const schemas = ["base", "format-assertion"].map((formatProfile) => ({
      id: `${draft}:${formatProfile}`,
      draft,
      formatProfile,
      schema: { type: "string", format: "email" }
    }));
    const entries = createCompileEntries({
      schemas,
      representedSchemaIds: schemas.map(({ id }) => id),
      remoteEntries: [],
      formatProfile: null
    });
    assert.equal(entries.length, 1, draft);
    assert.deepEqual(entries[0].sourceFormatProfiles, ["base", "format-assertion"]);
    assert.deepEqual(entries[0].setupConfiguration, {
      formatAssertion: true,
      stripFormatKeywords: false,
      formatPolicyVersion: 4
    });
  }

  for (const draft of ["draft2019-09", "draft2020-12"]) {
    const schemas = ["base", "format-assertion"].map((formatProfile) => ({
      id: `${draft}:${formatProfile}`,
      draft,
      formatProfile,
      schema: { type: "string", format: "email" }
    }));
    const entries = createCompileEntries({
      schemas,
      representedSchemaIds: schemas.map(({ id }) => id),
      remoteEntries: [],
      formatProfile: null
    });
    assert.equal(entries.length, 2, draft);
    assert.deepEqual(
      entries.map(({ setupConfiguration }) => setupConfiguration),
      [
        {
          formatAssertion: false,
          stripFormatKeywords: true,
          formatPolicyVersion: 4
        },
        {
          formatAssertion: true,
          stripFormatKeywords: false,
          formatPolicyVersion: 4
        }
      ]
    );
  }

  const distinct = createCompileEntries({
    schemas: [
      {
        id: "draft7:base",
        draft: "draft7",
        formatProfile: "base",
        schema: { type: "string" }
      },
      {
        id: "draft7:format-assertion",
        draft: "draft7",
        formatProfile: "format-assertion",
        schema: { type: "number" }
      }
    ],
    representedSchemaIds: ["draft7:base", "draft7:format-assertion"],
    remoteEntries: [],
    formatProfile: null
  });
  assert.equal(distinct.length, 2);
});

test("Setup merges equal effective operations across profiles and preserves real differences", () => {
  const common = {
    draft: "draft2020-12",
    effectiveSchemaSha256: "a".repeat(64),
    resources: [{ uri: "https://example.test/resource", sha256: "b".repeat(64) }],
    unknownFormats: []
  };
  const entries = mergeSetupEntries([
    {
      ...common,
      compileKey: "base-source",
      formatProfile: "base",
      sourceFormatProfiles: ["base"],
      setupConfiguration: {
        formatAssertion: false,
        stripFormatKeywords: true,
        formatPolicyVersion: 4
      },
      representativeSchemaId: "base-schema",
      memberSchemaIds: ["base-schema"]
    },
    {
      ...common,
      compileKey: "formats-equal-source",
      formatProfile: "format-assertion",
      sourceFormatProfiles: ["format-assertion"],
      setupConfiguration: {
        formatAssertion: false,
        stripFormatKeywords: true,
        formatPolicyVersion: 4
      },
      representativeSchemaId: "formats-equal-schema",
      memberSchemaIds: ["formats-equal-schema"]
    },
    {
      ...common,
      compileKey: "formats-distinct-source",
      formatProfile: "format-assertion",
      sourceFormatProfiles: ["format-assertion"],
      setupConfiguration: {
        formatAssertion: true,
        stripFormatKeywords: false,
        formatPolicyVersion: 4
      },
      representativeSchemaId: "formats-distinct-schema",
      memberSchemaIds: ["formats-distinct-schema"]
    }
  ]);

  assert.equal(entries.length, 2);
  const merged = entries.find(({ memberSchemaIds }) => memberSchemaIds.length === 2);
  const distinct = entries.find(({ memberSchemaIds }) => memberSchemaIds.length === 1);
  assert.deepEqual(merged.memberSchemaIds, [
    "base-schema",
    "formats-equal-schema"
  ]);
  assert.equal(distinct.memberSchemaIds.includes("formats-distinct-schema"), true);
  assert.notEqual(merged.compileKey, distinct.compileKey);
});

test("one draft-scoped Setup sample executes each entry with its effective configuration", async () => {
  const observedProfiles = [];
  let clock = 0;
  const sample = await runCompileSample({
    request: {
      phase: "setup",
      validator: "schema-shield",
      draft: "draft2020-12",
      formatProfile: null,
      round: 1,
      deadline: Date.now() + 60_000
    },
    compileEntries: ["base", "format-assertion"].map((formatProfile) => ({
      compileKey: `draft2020-12:${formatProfile}`,
      draft: "draft2020-12",
      formatProfile,
      setupConfiguration: {
        formatAssertion: formatProfile === "format-assertion",
        stripFormatKeywords: formatProfile === "base",
        formatPolicyVersion: 4
      },
      representativeSchemaId: `${formatProfile}-schema`,
      memberSchemaIds: [`${formatProfile}-schema`],
      resources: []
    })),
    schemas: [
      {
        id: "base-schema",
        schema: { type: "string", format: "email" }
      },
      {
        id: "format-assertion-schema",
        schema: { type: "string", format: "email" }
      }
    ],
    resourceRegistry: { resourcesFor: () => [] },
    createAdapter({ formatProfile }) {
      observedProfiles.push(formatProfile);
      return {
        version: "1.0.0",
        compileMode: "sync",
        compile: (schema) => schema
      };
    },
    timing: {
      warmupMinimumMilliseconds: 0,
      targetSampleMilliseconds: 0,
      minimumSampleMilliseconds: 0
    },
    now: () => ++clock
  });

  assert.equal(sample.formatProfile, null);
  assert.equal(sample.operations, 2);
  assert.deepEqual(observedProfiles, ["base", "format-assertion"]);
});

test("Full balances every participant position across its configured rounds", () => {
  const canonical = ["alpha", "beta", "gamma", "delta", "epsilon"];
  const orders = Array.from({ length: benchmarkModes.full.rounds }, (_value, index) =>
    rotateRoundOrder(canonical, index + 1)
  );
  assert.deepEqual(orders, [
    ["alpha", "beta", "gamma", "delta", "epsilon"],
    ["epsilon", "delta", "gamma", "beta", "alpha"],
    ["beta", "gamma", "delta", "epsilon", "alpha"],
    ["alpha", "epsilon", "delta", "gamma", "beta"],
    ["delta", "epsilon", "alpha", "beta", "gamma"],
    ["gamma", "beta", "alpha", "epsilon", "delta"]
  ]);
  const positionTotals = new Map(canonical.map((participant) => [participant, 0]));
  for (const order of orders) {
    order.forEach((participant, position) => {
      positionTotals.set(participant, positionTotals.get(participant) + position);
    });
  }
  assert.deepEqual(
    new Set(positionTotals.values()),
    new Set([(benchmarkModes.full.rounds / 2) * (canonical.length - 1)])
  );
});

test("Full summaries use the six-round median and publish robust dispersion", () => {
  const summary = summarizePhase(
    {
      phase: "execution",
      draft: "draft6",
      formatProfile: "base",
      intersectionSha256: "a".repeat(64),
      participants: ["schema-shield"],
      samples: [10, 20, 30, 40, 50, 60].map((throughput, index) => ({
        validator: "schema-shield",
        round: index + 1,
        throughput
      }))
    },
    "full"
  );
  const values = summary.validators["schema-shield"];
  assert.deepEqual(values.roundThroughputs, [10, 20, 30, 40, 50, 60]);
  assert.equal(values.median, 35);
  assert.equal(values.mean, 35);
  assert.equal(values.minimum, 10);
  assert.equal(values.maximum, 60);
  assert.equal(values.medianAbsoluteDeviation, 15);
  assert.equal(values.relativeMedianAbsoluteDeviation, 15 / 35);
  assert.equal(Math.abs(values.sampleStandardDeviation - Math.sqrt(350)) < 1e-12, true);
  assert.equal(
    Math.abs(values.coefficientOfVariation - Math.sqrt(350) / 35) < 1e-12,
    true
  );
  assert.equal(summary.centerFormula, "median(round_throughputs)");
  assert.equal(summary.scoreFormula, "median_validator / best_median_in_scope * 100");
});

test("eligible subsets rotate after roster filtering", () => {
  const eligible = ["alpha", "beta", "gamma"];
  assert.deepEqual(rotateRoundOrder(eligible, 1), eligible);
  assert.deepEqual(rotateRoundOrder(eligible, 2), ["gamma", "beta", "alpha"]);
  assert.deepEqual(rotateRoundOrder(eligible, 3), ["beta", "gamma", "alpha"]);
});

test("module-global adapters publish Cold execution as unavailable", () => {
  assert.equal(
    getColdExecutionParticipants("draft6").some(({ id }) => id === "hyperjump"),
    false
  );
});

test("Cold execution measures one complete fresh operation per case", async () => {
  let clock = 0;
  let factories = 0;
  let validations = 0;
  const schemaId = "draft6:cold.json#/groups/0";
  const sample = await runColdExecutionSample({
    request: {
      phase: "cold-execution",
      validator: "schema-shield",
      draft: "draft6",
      formatProfile: "base",
      round: 1,
      deadline: Date.now() + 60_000
    },
    cases: [
      { id: `${schemaId}/tests/0`, schemaId, expected: true, data: 1 },
      { id: `${schemaId}/tests/1`, schemaId, expected: false, data: "1" }
    ],
    caseIds: [`${schemaId}/tests/0`, `${schemaId}/tests/1`],
    schemas: [{ id: schemaId, schema: { type: "integer" } }],
    resourceRegistry: { resourcesFor: () => [] },
    createAdapter() {
      factories += 1;
      return {
        version: "1.0.0",
        compileMode: "sync",
        compile: (schema) => schema,
        validate(schema, data) {
          validations += 1;
          return schema.type === "integer" && typeof data === "number";
        }
      };
    },
    timing: {
      warmupMinimumMilliseconds: 0,
      targetSampleMilliseconds: 0,
      minimumSampleMilliseconds: 0
    },
    now: () => ++clock
  });
  assert.equal(sample.phase, "cold-execution");
  assert.equal(sample.operations, 2);
  assert.equal(factories, 2);
  assert.equal(validations, 2);
  assert.equal(sample.checksum > 0, true);
});

test("Cold execution prepares neutral inputs before the provider clock", async () => {
  const events = [];
  const schema = {};
  Object.defineProperty(schema, "type", {
    enumerable: true,
    get() {
      events.push("schema-clone");
      return "object";
    }
  });
  const data = {};
  Object.defineProperty(data, "value", {
    enumerable: true,
    get() {
      events.push("data-clone");
      return 1;
    }
  });
  const resource = {};
  Object.defineProperty(resource, "marker", {
    enumerable: true,
    get() {
      events.push("resource-clone");
      return true;
    }
  });
  let clock = 0;
  let telemetrySnapshots = 0;
  const sample = await runColdExecutionSample({
    request: {
      phase: "cold-execution",
      validator: "schema-shield",
      draft: "draft6",
      formatProfile: "base",
      round: 1,
      deadline: Date.now() + 60_000
    },
    cases: [
      {
        id: "draft6:cold-boundary.json#/tests/0",
        schemaId: "draft6:cold-boundary.json#/groups/0",
        expected: true,
        data
      }
    ],
    caseIds: ["draft6:cold-boundary.json#/tests/0"],
    schemas: [
      {
        id: "draft6:cold-boundary.json#/groups/0",
        schema
      }
    ],
    resourceRegistry: {
      resourcesFor() {
        events.push("resource-closure");
        return [resource];
      }
    },
    createAdapter() {
      events.push("adapter");
      return {
        get version() {
          events.push("metadata");
          return "1.0.0";
        },
        compileMode: "sync",
        compile(preparedSchema) {
          events.push("compile");
          return preparedSchema;
        },
        validate(_preparedSchema, preparedData) {
          events.push("validate");
          return preparedData.value === 1;
        }
      };
    },
    timing: {
      warmupMinimumMilliseconds: 0,
      targetSampleMilliseconds: 0,
      minimumSampleMilliseconds: 0
    },
    now() {
      events.push(clock === 0 ? "start" : "stop");
      clock += 1;
      return clock;
    },
    memoryUsage() {
      telemetrySnapshots += 1;
      events.push(`telemetry-${telemetrySnapshots}`);
      return { rss: 1, heapUsed: 1, heapTotal: 1, external: 1 };
    }
  });
  assert.equal(sample.checksum, 3);
  for (const event of [
    "schema-clone",
    "resource-closure",
    "resource-clone",
    "data-clone"
  ]) {
    assert.ok(events.indexOf(event) < events.indexOf("start"), event);
  }
  for (const event of ["adapter", "compile", "validate"]) {
    assert.ok(events.indexOf("start") < events.indexOf(event), event);
    assert.ok(events.indexOf(event) < events.indexOf("stop"), event);
  }
  assert.ok(events.indexOf("stop") < events.indexOf("metadata"));
  assert.ok(events.indexOf("stop") < events.indexOf("telemetry-2"));

  const workerSource = await readFile(
    new URL("../src/worker.js", import.meta.url),
    "utf8"
  );
  const coldStart = workerSource.indexOf("async function coldPass()");
  const coldEnd = workerSource.indexOf("let warmupPasses", coldStart);
  const coldSource = workerSource.slice(coldStart, coldEnd);
  const stop = coldSource.indexOf("elapsed += now() - start");
  for (const operation of [
    "adapterMetadata ??= adapter",
    "if (observed !== testCase.expected)",
    "executionError(",
    "checksum +="
  ]) {
    assert.ok(stop < coldSource.indexOf(operation), operation);
  }
});

test("draft score uses normalized Base and Formats geometric mean", () => {
  assert.equal(
    Math.abs(normalizedGeometricScore([25, 100], [100, 100]) - 50) < 1e-12,
    true
  );
});
