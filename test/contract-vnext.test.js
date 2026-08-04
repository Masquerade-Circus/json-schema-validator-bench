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
import { runColdExecutionSample, runSetupSample } from "../src/worker.js";
import { adapterRegistry, rotateRoundOrder } from "../src/adapter-registry.js";
import { createSetupEntries, mergeSetupEntries } from "../src/intersection.js";
import { isPreparedSchema } from "../src/schema-profile.js";

test("Quick and Full share one performance contract except for rounds", () => {
  const contract = createBenchmarkContract("full");
  const quickContract = createBenchmarkContract("quick");
  const {
    mode: fullMode,
    rounds: fullRounds,
    ...fullConfiguration
  } = benchmarkModes.full;
  const {
    mode: quickMode,
    rounds: quickRounds,
    ...quickConfiguration
  } = benchmarkModes.quick;

  assert.equal(fullMode, "full");
  assert.equal(quickMode, "quick");
  assert.equal(fullRounds, 6);
  assert.equal(quickRounds, 1);
  assert.deepEqual(quickConfiguration, fullConfiguration);
  assert.equal(fullConfiguration.setupWarmupMinimumMilliseconds, 100);
  assert.equal(fullConfiguration.setupTargetMilliseconds, 250);
  assert.equal(fullConfiguration.setupMinimumSampleMilliseconds, 175);
  assert.equal(fullConfiguration.executionWarmupMinimumMilliseconds, 100);
  assert.equal(fullConfiguration.executionTargetMilliseconds, 250);
  assert.equal(fullConfiguration.executionMinimumSampleMilliseconds, 175);
  assert.equal(fullConfiguration.coldExecutionWarmupMinimumMilliseconds, 100);
  assert.equal(fullConfiguration.coldExecutionTargetMilliseconds, 250);
  assert.equal(fullConfiguration.coldExecutionMinimumSampleMilliseconds, 175);
  const {
    rounds: fullContractRounds,
    ...fullMethodology
  } = contract;
  const {
    rounds: quickContractRounds,
    ...quickMethodology
  } = quickContract;
  assert.equal(fullContractRounds, 6);
  assert.equal(quickContractRounds, 1);
  assert.deepEqual(quickMethodology, fullMethodology);
  assert.equal(Object.hasOwn(contract, "benchmarkMode"), false);
  assert.equal(Object.hasOwn(quickContract, "benchmarkMode"), false);
  assert.equal(benchmarkModes.quick.rounds, 1);
  assert.equal(Object.hasOwn(contract, "compile"), false);
  assert.equal(Object.hasOwn(quickContract, "performanceCorpus"), false);
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
  assert.equal(sampleContractVersion, 26);
  assert.equal(sampleCacheIdentityVersion, 19);
});

test("createSetupEntries uses effective draft format semantics", () => {
  for (const draft of ["draft4", "draft6", "draft7"]) {
    const schemas = ["base", "format-assertion"].map((formatProfile) => ({
      id: `${draft}:${formatProfile}`,
      draft,
      formatProfile,
      schema: { type: "string", format: "email" }
    }));
    const entries = createSetupEntries({
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
    const entries = createSetupEntries({
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

  const distinct = createSetupEntries({
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
      setupKey: "base-source",
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
      setupKey: "formats-equal-source",
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
      setupKey: "formats-distinct-source",
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
  assert.notEqual(merged.setupKey, distinct.setupKey);
});

test("one draft-scoped Setup sample executes each entry with its effective configuration", async () => {
  const observedProfiles = [];
  const sample = await runSetupSample({
    request: {
      phase: "setup",
      validator: "schema-shield",
      draft: "draft2020-12",
      formatProfile: null,
      round: 1,
      deadline: Date.now() + 60_000
    },
    setupEntries: ["base", "format-assertion"].map((formatProfile) => ({
      setupKey: `draft2020-12:${formatProfile}`,
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
        setupMode: "sync",
        setup: (schema) => schema
      };
    },
    timing: {
      warmupMinimumMilliseconds: 0,
      targetSampleMilliseconds: 0,
      minimumSampleMilliseconds: 0
    }
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

test("Cold execution excludes providers with module-global state", () => {
  assert.equal(
    getColdExecutionParticipants("draft6").some(({ id }) => id === "hyperjump"),
    false
  );
});

test("Cold execution measures one fresh adapter setup and validation per case", async () => {
  let factories = 0;
  let setups = 0;
  let validations = 0;
  let clock = 0;
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
    prepareAdapter() {
      return {
        version: "1.0.0",
        execute(schema, data) {
          factories += 1;
          setups += 1;
          validations += 1;
          return schema.type === "integer" && typeof data === "number";
        },
        complete(observed) {
          return observed;
        }
      };
    },
    now: () => ++clock,
    timing: {
      warmupMinimumMilliseconds: 0,
      targetSampleMilliseconds: 0,
      minimumSampleMilliseconds: 0
    }
  });
  assert.equal(sample.phase, "cold-execution");
  assert.equal(sample.operations, 2);
  assert.equal(factories, 2);
  assert.equal(setups, 2);
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
    prepareAdapter() {
      events.push("prepare-adapter");
      return {
        version: "1.0.0",
        execute(targetSchema, targetData) {
          assert.equal(
            isPreparedSchema(targetSchema, "draft6", "base"),
            true
          );
          events.push("factory");
          events.push("setup");
          events.push("validate");
          return targetData.value === 1;
        },
        complete(observed) {
          events.push("complete");
          return observed;
        }
      };
    },
    timing: {
      warmupMinimumMilliseconds: 0,
      targetSampleMilliseconds: 0,
      minimumSampleMilliseconds: 0
    },
    now() {
      events.push(`clock-${++clock}`);
      return clock;
    },
    memoryUsage: () => ({ rss: 1, heapUsed: 1, heapTotal: 1, external: 1 })
  });
  assert.equal(sample.checksum, 3);
  for (const event of [
    "schema-clone",
    "resource-closure",
    "resource-clone",
    "data-clone",
    "prepare-adapter"
  ]) {
    assert.ok(events.indexOf(event) < events.indexOf("clock-1"), event);
  }
  assert.ok(events.indexOf("clock-1") < events.indexOf("factory"));
  assert.ok(events.indexOf("factory") < events.indexOf("setup"));
  assert.ok(events.indexOf("setup") < events.indexOf("validate"));
  assert.ok(events.indexOf("validate") < events.indexOf("clock-2"));
  assert.ok(events.indexOf("clock-2") < events.indexOf("complete"));
  assert.equal(sample.memory !== null, true);
});

test("the runner imports only opaque adapter modules through the generic registry", async () => {
  const registrySource = await readFile(
    new URL("../src/adapter-registry.js", import.meta.url),
    "utf8"
  );
  const runnerSources = await Promise.all(
    ["benchmark.js", "worker.js", "matrix.js", "cli.js"].map((file) =>
      readFile(new URL(`../src/${file}`, import.meta.url), "utf8")
    )
  );
  assert.equal(adapterRegistry.length, 10);
  assert.match(registrySource, /from "\.\/adapters\/ajv\.js"/);
  for (const source of runnerSources) {
    assert.equal(/(?:ajv|hyperjump|schemasafe|z-schema)\/(?:dist|draft)/.test(source), false);
    assert.equal(source.includes("adapters/catalog.js"), false);
  }
});

test("draft score uses normalized Base and Formats geometric mean", () => {
  assert.equal(
    Math.abs(normalizedGeometricScore([25, 100], [100, 100]) - 50) < 1e-12,
    true
  );
});
