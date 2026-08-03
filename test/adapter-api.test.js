import assert from "node:assert/strict";
import test from "node:test";

import { defineAdapter } from "../src/adapter-api.js";
import { loadMetaschemas } from "../src/metaschemas.js";
import {
  CAPABILITIES,
  detectSchemaCapabilities,
  unsupportedCapabilities
} from "../src/capabilities.js";
import {
  adapterRegistry,
  createAdapterRegistry,
  createRegisteredAdapter,
  getSetupRegistryParticipants,
  getRegisteredAdapter,
  supportsSetup
} from "../src/adapter-registry.js";
import {
  classifySchemaCases,
  runAdapterConformance
} from "../src/conformance.js";
const schemaShield = getRegisteredAdapter("schema-shield");
const ajv = getRegisteredAdapter("ajv");
const schemasafe = getRegisteredAdapter("schemasafe");
const redoclyAjv = getRegisteredAdapter("redocly-ajv");
const cfworker = getRegisteredAdapter("cfworker-json-schema");
const jsonSchemaLibrary = getRegisteredAdapter("json-schema-library");
const jsonschema = getRegisteredAdapter("jsonschema");
const djv = getRegisteredAdapter("djv");
const zSchema = getRegisteredAdapter("z-schema");
const hyperjump = getRegisteredAdapter("hyperjump");

const declaration = {
  id: "fixture",
  packageName: "fixture",
  displayName: "Fixture",
  drafts: ["draft7"],
  unsupported: []
};

function fixtureCases(expectedValues = [false]) {
  return expectedValues.map((expected, index) => ({
    id: `draft7:fixture.json#/groups/0/tests/${index}`,
    schemaId: "draft7:fixture.json#/groups/0",
    draft: "draft7",
    file: "fixture.json",
    groupIndex: 0,
    testIndex: index,
    groupDescription: "fixture group",
    description: `fixture case ${index}`,
    formatProfile: "base",
    expected,
    data: index
  }));
}

test("adapter declarations reject malformed opaque metadata", () => {
  for (const invalid of [
    { ...declaration, implementation: null },
    {
      ...declaration,
      implementation: {
        api: "reusable-sync",
        isolation: "fresh-instance",
        dynamicCode: "observed",
        provider: "leaked"
      }
    },
    { ...declaration, supportClaims: null },
    { ...declaration, supportClaims: { draft6: "declared" } }
  ]) {
    assert.throws(
      () => defineAdapter(invalid, () => ({ validate: () => true })),
      /implementation metadata|support claims/
    );
  }
});

test("adapter factory rejects non-boolean validation results", () => {
  const adapter = defineAdapter(declaration, () => ({
    reportOptions: {},
    validate: () => 0
  })).create({ draft: "draft7" });

  assert.throws(() => adapter.validate({}, 1), /exactly boolean/);
});

test("adapter creation rejects missing behavior and normalizes config", () => {
  assert.throws(
    () => defineAdapter(declaration, () => ({ reportOptions: {} })).create({ draft: "draft7" }),
    /validate must be a function/
  );
  let received = null;
  defineAdapter(declaration, (config) => {
    received = config;
    return { reportOptions: {}, validate: () => true };
  }).create({ draft: "draft7", unknownFormats: ["z", "z", "a"] });
  assert.deepEqual(received, {
    draft: "draft7",
    formatProfile: "format-assertion",
    resources: [],
    unknownFormats: ["a", "z"]
  });
});

test("adapter contract rejects compile and exposes no raw factory", () => {
  const definition = defineAdapter(declaration, () => ({
    reportOptions: {},
    compile: (schema) => schema,
    validate: () => true
  }));
  assert.throws(() => definition.create({ draft: "draft7" }), /compile is forbidden/);
  assert.equal(Object.hasOwn(definition, "createRaw"), false);
});

test("adapter wrapper preserves synchronous and asynchronous setup contracts", async () => {
  const sync = defineAdapter(declaration, () => ({
    reportOptions: {},
    setup: (schema) => ({ schema }),
    validate: (target, data) => target.schema.type === typeof data
  })).create({ draft: "draft7" });
  const syncTarget = sync.setup({ type: "number" });
  assert.equal(sync.setupMode, "sync");
  assert.equal(typeof syncTarget?.then, "undefined");
  assert.equal(sync.validate(syncTarget, 1), true);

  const asyncAdapter = defineAdapter(declaration, () => ({
    reportOptions: {},
    setup: async (schema) => ({ schema }),
    validate: (target, data) => target.schema.type === typeof data
  })).create({ draft: "draft7" });
  const asyncTarget = asyncAdapter.setup({ type: "number" });
  assert.equal(asyncAdapter.setupMode, "async");
  assert.equal(typeof asyncTarget.then, "function");
  assert.equal(asyncAdapter.validate(await asyncTarget, 1), true);
});

test("sync setup rejects undeclared Promise results", () => {
  const adapter = defineAdapter(declaration, () => ({
    reportOptions: {},
    setup: (schema) => Promise.resolve({ schema }),
    validate: () => true
  })).create({ draft: "draft7" });

  assert.throws(
    () => adapter.setup({ type: "number" }),
    /must be declared async/
  );
});

test("prepared primitive schemas bypass neutral cloning inside fresh adapters", () => {
  const adapter = defineAdapter(declaration, () => ({
    reportOptions: {},
    setup: (schema) => schema,
    validate: (target, data) => target === data
  })).create({ draft: "draft7", formatProfile: "base" });
  const canary = Symbol("primitive-schema-clone-canary");

  assert.equal(adapter.setup(canary), canary);
});

test("boolean schemas preserve correctness in both format profiles", () => {
  for (const formatProfile of ["base", "format-assertion"]) {
    const adapter = defineAdapter(declaration, () => ({
      reportOptions: {},
      setup: (schema) => schema,
      validate: (target) => target
    })).create({ draft: "draft7", formatProfile });

    const alwaysValid = adapter.setup(true);
    const alwaysInvalid = adapter.setup(false);
    assert.equal(adapter.validate(alwaysValid, "anything"), true, formatProfile);
    assert.equal(adapter.validate(alwaysInvalid, "anything"), false, formatProfile);
  }
});

test("getError is conformance-only and produces flat string, null, and throw records", async () => {
  const cases = [
    {
      detail: "type mismatch",
      status: "PASS",
      expected: { errorCode: null, error: "type mismatch", detailErrorCode: null, detailError: null }
    },
    {
      detail: null,
      status: "RUNTIME",
      errorPattern: /Detailed error unavailable.*returned false/,
      expected: {
        errorCode: "PROFILE_RESULT_DIVERGENCE",
        detailErrorCode: null,
        detailError: null
      }
    },
    {
      detail: Object.assign(new Error("detail exploded"), { code: "DETAIL_EXPLODED" }),
      status: "PASS",
      expected: {
        errorCode: null,
        error: null,
        detailErrorCode: "DETAIL_EXPLODED",
        detailError: "detail exploded"
      }
    }
  ];
  for (const entry of cases) {
    let received = null;
    const adapter = defineAdapter(declaration, () => ({
      reportOptions: {},
      validate: () => false,
      getError: async (context) => {
        received = context;
        if (entry.detail instanceof Error) {
          throw entry.detail;
        }
        return entry.detail;
      }
    })).create({ draft: "draft7" });
    await assert.rejects(() => adapter.getError({}), /only after validate/);
    if (!(entry.detail instanceof Error)) {
      const trueAdapter = defineAdapter(declaration, () => ({
        reportOptions: {},
        validate: () => true,
        getError: () => entry.detail
      })).create({ draft: "draft7" });
      trueAdapter.validate({}, 0);
      await assert.rejects(() => trueAdapter.getError({}), /only after validate/);
    }
    const records = await classifySchemaCases({
      adapter,
      schema: {},
      schemaMetadata: { id: fixtureCases()[0].schemaId },
      cases: fixtureCases()
    });
    assert.equal(records[0].status, entry.status);
    const observedError = {
      errorCode: records[0].errorCode,
      error: records[0].error,
      detailErrorCode: records[0].detailErrorCode,
      detailError: records[0].detailError
    };
    if (entry.errorPattern !== undefined) {
      assert.match(observedError.error, entry.errorPattern);
      delete observedError.error;
    }
    assert.deepEqual(observedError, entry.expected);
    assert.deepEqual(received.schema, {});
    assert.equal(received.target !== undefined, true);
    assert.equal(received.testCase.id, fixtureCases()[0].id);
    assert.equal(received.data, 0);
    assert.equal(received.config.draft, "draft7");
  }
});

test("getError rejects empty or non-string detail values", async () => {
  for (const detail of ["", "   ", {}, 1, false]) {
    const adapter = defineAdapter(declaration, () => ({
      reportOptions: {},
      validate: () => false,
      getError: () => detail
    })).create({ draft: "draft7" });
    adapter.validate({}, 0);
    await assert.rejects(() => adapter.getError({}), /string or null/);
  }
});

test("unsupported capabilities include evidence and stop before the factory", async () => {
  let factoryCalls = 0;
  const definition = defineAdapter(
    {
      ...declaration,
      unsupported: [CAPABILITIES.EXTERNAL_SCHEMA_RESOURCES]
    },
    () => {
      factoryCalls += 1;
      return { reportOptions: {}, validate: () => true };
    }
  );
  const detected = detectSchemaCapabilities({
    $ref: "https://example.test/external.json"
  });
  assert.deepEqual(detected, {
    capabilities: [CAPABILITIES.EXTERNAL_SCHEMA_RESOURCES],
    evidence: {
      EXTERNAL_SCHEMA_RESOURCES: ["https://example.test/external.json"]
    }
  });
  assert.deepEqual(unsupportedCapabilities(definition.unsupported, detected), [
    {
      capability: CAPABILITIES.EXTERNAL_SCHEMA_RESOURCES,
      evidence: "https://example.test/external.json"
    }
  ]);
  const cases = fixtureCases();
  const report = await runAdapterConformance({
    adapter: {
      name: "fixture",
      displayName: "Fixture",
      packageName: "fixture",
      version: "1.0.0",
      license: "MIT",
      engines: null,
      supportClaim: "declared",
      unsupported: definition.unsupported,
      setupEligible: false
    },
    adapterFactory: (config) => definition.create(config),
    adapterConfiguration: { draft: "draft7" },
    draft: "draft7",
    suite: {
      manifest: { commit: "a", tree: "b", manifestSha256: "c" },
      schemas: [{
        id: cases[0].schemaId,
        draft: "draft7",
        formatProfile: "base",
        schema: { $ref: "https://example.test/external.json" }
      }],
      cases,
      resourceRegistry: { resourcesFor: () => [] }
    }
  });
  assert.deepEqual(report.cases.map((record) => ({
    status: record.status,
    errorCode: record.errorCode,
    capability: record.capability,
    evidence: record.evidence
  })), cases.map(() => ({
    status: "UNSUPPORTED",
    errorCode: "UNSUPPORTED_CAPABILITY",
    capability: "EXTERNAL_SCHEMA_RESOURCES",
    evidence: "https://example.test/external.json"
  })));
  for (const record of report.cases) {
    assert.match(record.error, /Fixture.*unsupported capability.*EXTERNAL_SCHEMA_RESOURCES/);
  }
  assert.equal(factoryCalls, 0);
});

test("unexpected factory errors keep COMPILE and validate-only RUNTIME classifications", async () => {
  const cases = fixtureCases();
  for (const [setupEligible, status] of [[true, "COMPILE"], [false, "RUNTIME"]]) {
    const report = await runAdapterConformance({
      adapter: {
        name: "fixture",
        displayName: "Fixture",
        packageName: "fixture",
        version: "1.0.0",
        license: "MIT",
        engines: null,
        supportClaim: "declared",
        unsupported: [],
        setupEligible
      },
      adapterFactory: () => {
        throw Object.assign(new Error("factory exploded"), { code: "FACTORY_EXPLODED" });
      },
      adapterConfiguration: { draft: "draft7" },
      draft: "draft7",
      suite: {
        manifest: { commit: "a", tree: "b", manifestSha256: "c" },
        schemas: [{
          id: cases[0].schemaId,
          draft: "draft7",
          formatProfile: "base",
          schema: {}
        }],
        cases,
        resourceRegistry: { resourcesFor: () => [] }
      }
    });
    assert.deepEqual(report.cases.map((record) => record.status), cases.map(() => status));
    assert.deepEqual(report.cases.map((record) => record.errorCode), cases.map(() => "FACTORY_EXPLODED"));
    assert.deepEqual(report.cases.map((record) => record.error), cases.map(() => "factory exploded"));
  }
});

test("reportOptions must serialize and receive a stable hash", () => {
  const first = defineAdapter(declaration, () => ({
    reportOptions: { beta: [2], alpha: 1 },
    validate: () => true
  })).create({ draft: "draft7" });
  const second = defineAdapter(declaration, () => ({
    reportOptions: { alpha: 1, beta: [2] },
    validate: () => true
  })).create({ draft: "draft7" });
  assert.match(first.reportOptionsSha256, /^[0-9a-f]{64}$/);
  assert.equal(first.reportOptionsSha256, second.reportOptionsSha256);

  assert.throws(
    () => defineAdapter(declaration, () => ({
      reportOptions: { invalid: BigInt(1) },
      validate: () => true
    })).create({ draft: "draft7" }),
    /JSON-serializable/
  );
});

test("json-schema-library reportOptions exclude per-schema resource payloads", () => {
  const config = {
    draft: "draft7",
    formatProfile: "base",
    unknownFormats: []
  };
  const withoutResources = createRegisteredAdapter("json-schema-library", {
    ...config,
    resources: []
  });
  const withResources = createRegisteredAdapter("json-schema-library", {
    ...config,
    resources: [{
      canonicalUri: "https://example.test/resource.json",
      aliases: ["https://example.test/resource.json"],
      schema: {
        $id: "https://example.test/resource.json",
        type: "integer"
      }
    }]
  });
  assert.equal(
    withoutResources.reportOptionsSha256,
    withResources.reportOptionsSha256
  );
  assert.equal(Object.hasOwn(withResources.reportOptions, "remotes"), false);
});

test("conformance reports options once per profile and keeps them out of cases", async () => {
  const definition = defineAdapter(declaration, (config) => ({
    reportOptions: { profile: config.formatProfile },
    validate: (_schema, data) => typeof data === "number"
  }));
  const cases = fixtureCases([true]);
  cases[0].formatProfile = "base";
  const report = await runAdapterConformance({
    adapter: {
      name: "fixture",
      packageName: "fixture",
      version: "1.0.0",
      license: "MIT",
      engines: null,
      supportClaim: "declared",
      options: null
    },
    adapterFactory: (config) => definition.create(config),
    adapterConfiguration: { draft: "draft7" },
    draft: "draft7",
    suite: {
      manifest: { commit: "a", tree: "b", manifestSha256: "c" },
      schemas: [
        {
          id: cases[0].schemaId,
          draft: "draft7",
          formatProfile: "base",
          schema: { type: "number" }
        }
      ],
      cases,
      resourceRegistry: { resourcesFor: () => [] }
    }
  });
  assert.deepEqual(report.reportOptions, { base: { profile: "base" } });
  assert.match(report.reportOptionsSha256.base, /^[0-9a-f]{64}$/);
  assert.equal(Object.hasOwn(report.cases[0], "options"), false);
  assert.equal(Object.hasOwn(report.cases[0], "reportOptions"), false);
  assert.equal(Object.hasOwn(report.cases[0], "mode"), false);
  assert.equal(Object.hasOwn(report.cases[0], "supportClaim"), false);
});

test("registry rejects duplicate IDs and derives setup participation", () => {
  assert.throws(
    () => createAdapterRegistry([jsonschema, jsonschema]),
    /duplicate adapter ID/
  );
  assert.equal(adapterRegistry.length, 10);
  assert.equal(getRegisteredAdapter("jsonschema"), jsonschema);
  assert.equal(supportsSetup("json-schema-library", "draft7"), true);
  assert.equal(supportsSetup("jsonschema", "draft7"), false);
  assert.equal(
    getSetupRegistryParticipants("draft7").some(({ id }) => id === "jsonschema"),
    false
  );
  assert.equal(
    adapterRegistry.every((definition) => !Object.hasOwn(definition, "mode")),
    true
  );
});

test("draft4 support matrix lists only adapters with a native draft4 integration", () => {
  const supported = adapterRegistry
    .filter((definition) => definition.drafts.includes("draft4"))
    .map(({ id }) => id);
  assert.deepEqual(supported, [
    "cfworker-json-schema",
    "ajv",
    "hyperjump",
    "redocly-ajv",
    "schema-shield",
    "json-schema-library",
    "jsonschema",
    "schemasafe",
    "z-schema",
  ]);
  assert.equal(supportsSetup("schema-shield", "draft4"), true);
  assert.equal(supportsSetup("jsonschema", "draft4"), false);
});

test("all registered adapters use the runtime contract and preserve setup eligibility", async () => {
  const sourceDefinitions = [
    schemaShield,
    ajv,
    schemasafe,
    redoclyAjv,
    cfworker,
    jsonSchemaLibrary,
    jsonschema,
    djv,
    zSchema,
    hyperjump
  ];
  assert.deepEqual(
    adapterRegistry,
    sourceDefinitions.sort((left, right) => {
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
  );
  const reusable = new Set([
    "schema-shield",
    "ajv",
    "schemasafe",
    "redocly-ajv",
    "cfworker-json-schema",
    "json-schema-library",
    "djv",
    "z-schema",
    "hyperjump"
  ]);
  for (const definition of adapterRegistry) {
    const draft = definition.drafts[0];
    const runtime = definition.create({
      draft,
      formatProfile: "base",
      resources: [],
      unknownFormats: ["vendor-format"]
    });
    assert.equal(typeof runtime.validate, "function", definition.id);
    assert.equal(typeof runtime.setup === "function", reusable.has(definition.id), definition.id);
    assert.equal(Object.hasOwn(runtime, "mode"), false, definition.id);
    const schema = { type: "integer" };
    const target = typeof runtime.setup === "function"
      ? await runtime.setup(schema)
      : schema;
    assert.equal(runtime.validate(target, 1), true, definition.id);
    assert.equal(runtime.validate(target, "1"), false, definition.id);
  }
});

test("migrated adapters preserve resources, profiles, and input", async () => {
  const resource = {
    canonicalUri: "https://example.test/integer.json",
    uri: "https://example.test/integer.json",
    aliases: new Set(["https://example.test/integer.json"]),
    schema: {
      $id: "https://example.test/integer.json",
      type: "integer"
    }
  };
  for (const id of ["json-schema-library", "jsonschema"]) {
    const adapter = createRegisteredAdapter(id, {
      draft: "draft7",
      formatProfile: "base",
      resources: [resource],
      unknownFormats: []
    });
    const schema = { $ref: resource.uri };
    const target = typeof adapter.setup === "function"
      ? await adapter.setup(schema)
      : schema;
    const input = { value: 1 };
    const before = JSON.stringify(input);
    adapter.validate(target, input);
    assert.equal(JSON.stringify(input), before, id);
    assert.equal(adapter.validate(target, 1), true, id);
    assert.equal(adapter.validate(target, "1"), false, id);
    assert.equal(
      typeof await adapter.getError({
        schema,
        target,
        testCase: { id: "fixture" },
        data: "1"
      }),
      "string",
      id
    );
  }

  for (const profile of ["base", "format-assertion"]) {
    const adapter = createRegisteredAdapter("json-schema-library", {
      draft: "draft2020-12",
      formatProfile: profile,
      resources: [],
      unknownFormats: []
    });
    const target = await adapter.setup({ type: "string", format: "email" });
    assert.equal(
      adapter.validate(target, "not-an-email"),
      profile === "base",
      profile
    );
  }
});

test("SchemaShield registers aliases, transitive and boolean resources in fast and detailed profiles", async () => {
  const integerSchema = {
    $id: "https://ids.example/integer",
    type: "integer"
  };
  const middleSchema = {
    $id: "https://ids.example/middle",
    type: "object",
    properties: {
      value: { $ref: "https://aliases.example/integer" },
      allowed: { $ref: "https://aliases.example/boolean" }
    },
    required: ["value", "allowed"]
  };
  const resources = [
    {
      canonicalUri: "https://retrieval.example/integer.json",
      uri: "https://legacy.example/integer.json",
      aliases: [
        "https://retrieval.example/integer.json#ignored",
        "https://aliases.example/integer"
      ],
      schema: integerSchema
    },
    {
      canonicalUri: "https://retrieval.example/middle.json",
      aliases: ["https://aliases.example/middle"],
      schema: middleSchema
    },
    {
      canonicalUri: "https://retrieval.example/boolean.json",
      aliases: ["https://aliases.example/boolean"],
      schema: true
    }
  ];
  const before = structuredClone(resources);
  const definition = getRegisteredAdapter("schema-shield");
  assert.deepEqual(definition.unsupported, []);
  const runtime = definition.create({
    draft: "draft7",
    formatProfile: "base",
    resources,
    unknownFormats: []
  });
  assert.equal(runtime.reportOptions.resources, "registered");
  const schema = {
    allOf: [
      { $ref: "https://retrieval.example/middle.json" },
      { $ref: "https://aliases.example/boolean" }
    ]
  };
  const target = await runtime.setup(schema);
  assert.equal(runtime.validate(target, { value: 1, allowed: "anything" }), true);
  const invalid = { value: "1", allowed: "anything" };
  assert.equal(runtime.validate(target, invalid), false);
  assert.equal(
    typeof await runtime.getError({
      schema,
      target,
      testCase: { id: "local-resource-fixture" },
      data: invalid
    }),
    "string"
  );
  assert.deepEqual(resources, before);
  assert.deepEqual(integerSchema, before[0].schema);
  assert.deepEqual(middleSchema, before[1].schema);
});

test("SchemaShield preloads each draft metaschema for the 20 official setup cases", async () => {
  const fixtures = [
    {
      draft: "draft4",
      schemas: [
        { $ref: "http://json-schema.org/draft-04/schema#" },
        { $ref: "https://json-schema.org/draft-04/schema#" }
      ],
      valid: { definitions: { foo: { type: "integer" } } },
      invalid: { definitions: { foo: { type: 1 } } }
    },
    {
      draft: "draft6",
      schemas: [
        { $ref: "http://json-schema.org/draft-06/schema#" },
        { $ref: "https://json-schema.org/draft-06/schema#" }
      ],
      valid: { definitions: { foo: { type: "integer" } } },
      invalid: { definitions: { foo: { type: 1 } } }
    },
    {
      draft: "draft7",
      schemas: [
        { $ref: "http://json-schema.org/draft-07/schema#" },
        { $ref: "https://json-schema.org/draft-07/schema#" }
      ],
      valid: { definitions: { foo: { type: "integer" } } },
      invalid: { definitions: { foo: { type: 1 } } }
    },
    {
      draft: "draft2019-09",
      schemas: [
        {
          $schema: "https://json-schema.org/draft/2019-09/schema",
          $ref: "https://json-schema.org/draft/2019-09/schema"
        },
        { $ref: "http://json-schema.org/draft/2019-09/schema#" }
      ],
      valid: { $defs: { foo: { type: "integer" } } },
      invalid: { $defs: { foo: { type: 1 } } }
    },
    {
      draft: "draft2020-12",
      schemas: [
        {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          $ref: "https://json-schema.org/draft/2020-12/schema"
        },
        { $ref: "http://json-schema.org/draft/2020-12/schema#" }
      ],
      valid: { $defs: { foo: { type: "integer" } } },
      invalid: { $defs: { foo: { type: 1 } } }
    }
  ];
  const definition = getRegisteredAdapter("schema-shield");

  for (const fixture of fixtures) {
    const runtime = definition.create({
      draft: fixture.draft,
      formatProfile: "base",
      resources: [],
      unknownFormats: []
    });
    for (const schema of fixture.schemas) {
      const target = await runtime.setup(schema);
      assert.equal(runtime.validate(target, fixture.valid), true, fixture.draft);
      assert.equal(runtime.validate(target, fixture.invalid), false, fixture.draft);
      assert.equal(
        typeof await runtime.getError({
          schema,
          target,
          testCase: { id: `${fixture.draft}-metaschema` },
          data: fixture.invalid
        }),
        "string",
        fixture.draft
      );
    }
  }
});

test("SchemaShield metaschema preload unions snapshot and suite aliases", async () => {
  const definition = getRegisteredAdapter("schema-shield");
  const [snapshot] = loadMetaschemas("draft6");
  const extraAlias = "https://schemas.example.test/draft-06/schema";
  const runtime = definition.create({
    draft: "draft6",
    formatProfile: "base",
    resources: [
      {
        canonicalUri: extraAlias,
        aliases: [extraAlias, snapshot.uri],
        schema: structuredClone(snapshot.schema)
      }
    ],
    unknownFormats: []
  });
  const schema = { $ref: extraAlias };
  const target = await runtime.setup(schema);
  const valid = { definitions: { foo: { type: "integer" } } };
  const invalid = { definitions: { foo: { type: 1 } } };
  assert.equal(runtime.validate(target, valid), true);
  assert.equal(runtime.validate(target, invalid), false);
  assert.equal(
    typeof await runtime.getError({
      schema,
      target,
      testCase: { id: "metaschema-extra-alias" },
      data: invalid
    }),
    "string"
  );
});

test("SchemaShield metaschema preload rejects a real schema conflict", () => {
  const definition = getRegisteredAdapter("schema-shield");
  const [snapshot] = loadMetaschemas("draft6");
  assert.throws(
    () =>
      definition.create({
        draft: "draft6",
        formatProfile: "base",
        resources: [
          {
            canonicalUri: snapshot.uri,
            aliases: snapshot.aliases,
            schema: { $id: snapshot.schema.$id.slice(0, -1), type: "string" }
          }
        ],
        unknownFormats: []
      }),
    (error) => error?.code === "DUPLICATE_SCHEMA_ID"
  );
});

test("migrated adapters keep representative conformance booleans", async () => {
  const cases = fixtureCases([true, false]).map((testCase, index) => ({
    ...testCase,
    data: index === 0 ? 1 : "1"
  }));
  for (const id of ["json-schema-library", "jsonschema"]) {
    const records = await classifySchemaCases({
      adapter: createRegisteredAdapter(id, {
        draft: "draft7",
        formatProfile: "base",
        resources: [],
        unknownFormats: []
      }),
      schema: { type: "integer" },
      schemaMetadata: { id: cases[0].schemaId },
      cases
    });
    assert.deepEqual(records.map(({ status }) => status), ["PASS", "PASS"], id);
  }
});
