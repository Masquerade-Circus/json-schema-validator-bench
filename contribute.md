# Contributing a validator adapter

## Purpose

JSON Schema Validator Bench compares validator conformance and performance across five JSON Schema drafts and two format profiles. Within each draft, every participating validator receives the same discovered conformance cases. Performance uses one atomic qualified roster per draft and the common `PASS` intersection formed from that roster. Compile further intersects the draft roster with validators that expose Compile capability.

The benchmark package is standalone. Run every command in this guide from the directory that contains this file.

## Prerequisites

- Node.js 22 or later.
- npm with support for the lockfile version in `package-lock.json`.
- Enough local disk space for dependencies, the pinned JSON Schema Test Suite checkout, checkpoints, and generated results.

## Setup and commands

Install the exact dependency graph:

```bash
npm ci
```

Run the local behavioral harness:

```bash
npm test
```

Run Quick while developing an adapter:

```bash
npm run benchmark -- --quick
```

Quick executes complete conformance and a deterministic, capped performance corpus. It replaces the canonical `README.md` and `results/` with diagnostic artifacts.

Refresh one validator from a compatible Quick publication:

```bash
npm run benchmark -- --quick --validator <canonical-id>
```

Refresh one validator from a compatible Full publication:

```bash
npm run benchmark -- --validator <canonical-id>
```

Use the exact ID from `src/adapters/index.js`. The validator refresh runs conformance and performance only for that validator, then rebuilds every report and ranking from the reconciled cohort. It marks the output as diagnostic and preserves the Quick or Full base mode.

The refresh requires a complete compatible publication for the same base mode. Changes to the environment, benchmark contract, suite, locks, threshold, rounds, roster, eligibility, or common `PASS` corpus stop the refresh and request a complete run. Compatible chained refreshes retain every refreshed validator in diagnostic metadata.

The atomic eligibility gate defaults to 98%. Configure it for either mode with an ordinary decimal from 0 through 100 and at most six decimal places:

```bash
npm run benchmark -- --quick --eligibility-threshold-percent 98.5
```

Run Full before publishing benchmark results:

```bash
npm run benchmark
```

Full executes complete conformance and complete common-intersection performance samples. It replaces Quick artifacts with the publication contract.

Refresh npm package metadata only when dependency metadata or download counts must change:

```bash
npm run metadata:sync
```

Metadata sync updates `npm-snapshot-lock.json` and its generated snapshot. Quick and Full consume that pinned metadata.

The versioned metaschemas under `metaschemas/` are byte-for-byte snapshots from the package versions and source paths recorded in `metaschemas/manifest.json`. The manifest also records each package integrity from `package-lock.json`. Keep the matching notice file for every recorded source; AJV and Redocly AJV distribute these snapshots under the MIT license.

## Architecture

Each adapter has two parts:

1. A declaration names the validator, npm package, supported drafts, and statically unsupported capabilities.
2. A factory closure owns vendor state, options, resources, compilation, validation, and optional error extraction for one benchmark configuration.

`src/adapters/index.js` is the single registry. The participant matrix, compile eligibility, package metadata, and runtime factories derive from it. The presence of `compile` grants Compile eligibility.

The harness detects schema capabilities before it creates an adapter. A declaration can mark a detected capability as unsupported, which produces `UNSUPPORTED` records and skips vendor invocation. Conformance records every case. Performance then applies the objective qualification gate once per draft before it derives the common `PASS` intersections for Base and Formats.

### Runner ownership and adapter ownership

The runner owns benchmark policy. It discovers the suite, assigns the draft and format profile, detects capabilities, computes the local resource closure, detects unknown format names, applies the schema profile on a clone, qualifies the atomic draft roster, intersects Compile with API capability, chooses each phase's common conformance intersection, creates fresh factory contexts at the required boundary, and starts and stops the operation timers. Adapters consume those decisions and the corpus supplied by the runner.

The qualification gate requires Base and Formats to reach the configured percentage in the same draft. The CLI preserves the normalized decimal text and converts it to a reduced fraction. Eligibility compares `PASS * threshold denominator >= total * threshold numerator` with integers, so displayed rounding preserves the result. `WRONG`, `COMPILE`, `RUNTIME`, and `UNSUPPORTED` all count as non-PASS. The exact profile fractions determine eligibility. Execution uses the eligible draft roster. Compile uses the same roster intersected with participants that expose a reusable compile API. Eligibility depends exclusively on the exact Base and Formats `PASS` fractions for the atomic draft roster.

The global conformance table shows one percentage cell per draft and profile. Its Total divides PASS by all 7,970 canonical cases across the five drafts and both profiles. Unsupported drafts and scopes contribute zero PASS while their cases remain in the denominator. Rows sort by Total descending and use validator ID as the stable tie-breaker. The accompanying Mermaid chart keeps the same order and marks the configured threshold as a reference line. The atomic Base and Formats fractions for each draft control eligibility.

A performance ranking needs at least two competitors. A smaller roster publishes `INSUFFICIENT_COMPETITORS` and omits the leader, relative score, and competitive chart.

Each phase publishes a performance identity hash over the policy, relevant suite and format configuration, eligible roster, and eligible corpus. Compatible performance cache entries share this identity. A separate artifact hash covers excluded-roster diagnostics, mutations, all source-report hashes, and the rest of the complete document. Excluded participants remain visible in conformance and diagnostics.

The adapter owns the vendor integration. Its factory selects the vendor constructor or dialect API, creates vendor state, applies stable options, registers formats and local resources through the vendor's public API, and returns the vendor-specific `compile`, `validate`, and optional `getError` functions. Mutable vendor state belongs inside the factory closure so one benchmark configuration cannot leak registrations or errors into another.

This split keeps policy comparable while still respecting each package's native API. The runner says what the configuration means. The adapter says how that meaning is expressed to one vendor.

## Factory configuration in detail

The runner calls the adapter factory with this normalized shape:

```javascript
{
  draft: "draft2020-12",
  formatProfile: "format-assertion",
  resources: [],
  unknownFormats: ["example-custom-format"]
}
```

Treat the object as read-only input. Preserve the root schema, every `resource.schema`, test data, and configuration array. If a vendor requires an injected `$schema`, `$id`, or bridge schema, clone the schema or create a separate wrapper object.

### `draft`

`draft` is exactly one of:

- `draft4`
- `draft6`
- `draft7`
- `draft2019-09`
- `draft2020-12`

The value selects JSON Schema semantics. It can change the constructor, imported dialect module, meta-schema, default dialect URI, keyword vocabulary, reference behavior, and format rules used by the vendor. For example, AJV uses its base constructor for Draft 6 and Draft 7, `Ajv2019` for Draft 2019-09, and `Ajv2020` for Draft 2020-12. Hyperjump selects a separate draft API and dialect URI. schemasafe receives the selected dialect through `$schemaDefault`.

Use an explicit mapping when the vendor exposes draft-specific entry points:

```javascript
const dialects = {
  draft6: { api: Draft6, uri: "http://json-schema.org/draft-06/schema#" },
  draft7: { api: Draft7, uri: "http://json-schema.org/draft-07/schema#" },
  "draft2019-09": {
    api: Draft201909,
    uri: "https://json-schema.org/draft/2019-09/schema"
  },
  "draft2020-12": {
    api: Draft202012,
    uri: "https://json-schema.org/draft/2020-12/schema"
  }
};

const { api, uri: dialectUri } = dialects[draft];
```

List a draft when the integration selects its semantics and executes its schemas.

### `formatProfile`

`formatProfile` is either `base` or `format-assertion`.

- `base` measures core validation behavior. For Draft 2019-09 and Draft 2020-12, the runner removes `format` keywords from its cloned schema before the adapter receives it. This preserves annotation semantics across vendor defaults.
- `format-assertion` keeps `format` and requires the adapter to enable the vendor's assertion behavior. Draft 6 and Draft 7 integrations keep format assertion enabled because those benchmark cells use the older-draft behavior represented by their suite corpus.

For example, consider this Draft 2020-12 schema:

```javascript
const emailSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "string",
  format: "email"
};
```

Under `base`, the runner supplies a clone equivalent to `{ type: "string" }`, apart from `$schema`, so `"not-an-email"` passes the type constraint. Under `format-assertion`, the adapter keeps and enables `format: "email"`, so the same value fails. The adapter expresses that distinction with the vendor's native switch, plugin, or dialect API. The runner owns the schema rewrite.

### `unknownFormats`

`unknownFormats` contains the sorted, deduplicated format names detected in the relevant schema or performance corpus that are outside the benchmark's known format lists. The benchmark treats these names as annotation candidates. Some vendors require explicit registration to preserve that behavior during compilation.

When the selected profile and draft require annotation or ignore semantics, neutralize that vendor-specific compile rejection through its native format API. A common pattern is a validator that always succeeds:

```javascript
for (const name of unknownFormats) {
  validator.addFormat(name, () => true);
}
```

Some APIs accept `true` or an explicit ignore option instead. Use the narrowest native mechanism. Reserve `UNSUPPORTED` for declared capability gaps, and keep every standard format active when the assertion profile requires validation.

## Local schema resources

`resources` is the local transitive closure required by the root schema's references. The runner starts with references from the root document, resolves each target against the pinned local suite registry, follows references from every newly required document, and passes that closure to the factory.

The word "remote" in the upstream suite describes URI identity and fixture layout. Every supplied resource comes from the pinned local checkout. Register those in-memory schemas through the vendor API. Network retrieval falls outside the adapter contract, and a missing local target produces a harness or capability result.

### Resource shape

Each resource contains at least the fields needed by the vendor integration:

```javascript
{
  schema: { $id: "https://schemas.example.test/address", type: "object" },
  canonicalUri: "http://localhost:1234/address.json",
  uri: "https://schemas.example.test/address",
  aliases: [
    "http://localhost:1234/address.json",
    "https://schemas.example.test/address"
  ]
}
```

- `resource.schema` is the already parsed local schema document. Treat it as read-only.
- `resource.canonicalUri` is the suite's canonical retrieval URI for the document. For JSON Schema Test Suite fixtures, this commonly starts with `http://localhost:1234/`.
- `resource.uri` is the resource URI obtained from the schema's identifier and base resolution. It can differ from the retrieval URI.
- `resource.aliases` is the normalized, deduplicated set of fragment-free URIs that identify the same document. It includes the applicable retrieval URI and schema identifier aliases.

`canonicalUri`, `uri`, and every alias identify a document, so the normalized values omit URI fragments. Fragment resolution remains the vendor's job after it finds the document.

### Complete alias example

This root schema reaches the same local address document through two different references:

```javascript
const rootSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://schemas.example.test/order",
  type: "object",
  properties: {
    shippingAddress: {
      $ref: "http://localhost:1234/address.json#/$defs/address"
    },
    billingAddress: {
      $ref: "https://schemas.example.test/address#/$defs/address"
    }
  },
  required: ["shippingAddress", "billingAddress"]
};

const addressDocument = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://schemas.example.test/address",
  $defs: {
    address: {
      type: "object",
      properties: {
        postalCode: { type: "string", minLength: 1 }
      },
      required: ["postalCode"]
    }
  }
};

const resources = [
  {
    schema: addressDocument,
    canonicalUri: "http://localhost:1234/address.json",
    uri: "https://schemas.example.test/address",
    aliases: [
      "http://localhost:1234/address.json",
      "https://schemas.example.test/address"
    ]
  }
];
```

The retrieval URI and `$id` differ. Both `$ref` values must select `addressDocument` before the vendor resolves `#/$defs/address`. Register every required identity so both properties compile against the same local document.

### Register resources through the native API

Adapters must translate the normalized resource records into the vendor's public registration API. Some vendors accept the same schema under every alias:

```javascript
for (const resource of resources) {
  for (const alias of resource.aliases) {
    validator.addSchema(resource.schema, alias);
  }
}
```

Other vendors deduplicate by `$id`, reject duplicate registration of one object, or retain only one registration key. Register the document once under `canonicalUri`, then add lightweight alias bridges that point to its own `$id` or canonical target:

```javascript
for (const resource of resources) {
  const target = resource.schema.$id ?? resource.schema.id ?? resource.canonicalUri;

  validator.addSchema(resource.schema, resource.canonicalUri);

  for (const alias of resource.aliases) {
    if (alias !== resource.canonicalUri && alias !== target) {
      validator.addSchema({ $ref: target }, alias);
    }
  }
}
```

The bridge is a new schema object. It preserves `resource.schema`, avoids duplicate-object registration, and makes both identifiers resolve through the vendor's own reference machinery. Follow the actual vendor contract rather than forcing one registration recipe onto every package.

## Add a validator step by step

### 1. Pin the dependency and metadata

Add the validator to `dependencies` in `package.json` with an exact version. Update `package-lock.json` with that exact dependency. Keep package resolution, integrity, and transitive dependencies in the lockfile.

```bash
npm install --save-exact tiny-json-validator@2.4.1
```

Run metadata sync when the package is new to the benchmark or its pinned version changed. Review the resulting `npm-snapshot-lock.json` and `results/npm-snapshot.json` metadata before publication.

### 2. Create the adapter

Create `src/adapters/<validator-id>.js`. Import the vendor statically when its module shape requires a static import. Keep vendor options and mutable state inside the factory closure.

The declaration fields are:

- `id`: stable benchmark ID.
- `packageName`: exact npm package name.
- `displayName`: human-readable report name.
- `drafts`: drafts for which the adapter makes a support claim. Use only `draft4`, `draft6`, `draft7`, `draft2019-09`, and `draft2020-12`.
- `unsupported`: known capabilities the validator cannot process. The current declarative capability is `ADAPTER_CAPABILITIES.EXTERNAL_SCHEMA_RESOURCES`.

The factory receives normalized `draft`, `formatProfile`, `resources`, and `unknownFormats` values. It must return:

- `reportOptions`: JSON-serializable options that explain the stable configuration used in reports. Include stable scalar, array, and plain-object configuration values. Schemas, per-case data, resources, and runtime objects belong to their dedicated inputs.
- `validate(target, data)`: required synchronous function that returns exactly `true` or `false`.
- `compile(schema)`: optional sync or `async` function. A synchronous declaration must return its target directly. A vendor that requires asynchronous setup must declare `async` and return a Promise. Omit `compile` for a validate-only API.
- `getError(context)`: optional sync or async function that returns a non-empty string or `null`. It runs only after `validate` returns `false` and only during conformance.

Use `formatProfile` to enable the vendor's format assertion behavior. Register each normalized `unknownFormats` entry when the vendor rejects unknown formats at compile time and the suite expects annotation behavior. Register every local resource alias when the vendor supports external schema resources. Declare static resource capability gaps through `unsupported`.

### 3. Register one static import

If the adapter needs a static import, add it once to `src/adapters/index.js`, then add the imported adapter to `adapterRegistry`. This registry is the unique participant source and rejects duplicate IDs.

### 4. State draft and capability support precisely

List the drafts that the adapter executes with the correct semantics. Generated metadata derives each support claim from the registry.

Use the declaration's `unsupported` list for a known static capability gap. The conformance preflight compares detected schema capabilities with this list before factory creation. This safeguard keeps `UNSUPPORTED` distinct from vendor compile failures and runtime defects.

## Complete compiled adapter example

This complete module illustrates a validator with a reusable compile API, local resource registration, format setup, and error extraction. Replace the illustrative package API with the pinned vendor's real API.

```javascript
import { TinyValidator } from "tiny-json-validator";

import { defineAdapter } from "../adapter-api.js";

function createImplementation({ draft, formatProfile, resources, unknownFormats }) {
  const validator = new TinyValidator({
    draft,
    assertFormats: formatProfile === "format-assertion"
  });

  for (const format of unknownFormats) {
    validator.addFormat(format, () => true);
  }

  for (const resource of resources) {
    for (const alias of resource.aliases) {
      validator.addSchema(resource.schema, alias);
    }
  }

  let lastError = null;

  return {
    reportOptions: {
      draft,
      formatProfile,
      assertFormats: formatProfile === "format-assertion"
    },
    compile(schema) {
      return validator.compile(schema);
    },
    validate(compiled, data) {
      const result = compiled(data);
      lastError = result.error ?? null;
      return result.valid === true;
    },
    getError() {
      return lastError === null ? null : JSON.stringify(lastError);
    }
  };
}

export const adapter = defineAdapter(
  {
    id: "tiny-json-validator",
    packageName: "tiny-json-validator",
    displayName: "Tiny JSON Validator",
    drafts: ["draft7", "draft2019-09", "draft2020-12"],
    unsupported: []
  },
  createImplementation
);
```

## Complete validate-only adapter example

This complete module illustrates a CommonJS validator with a validate-only API:

```javascript
import { createRequire } from "node:module";

import { defineAdapter } from "../adapter-api.js";

const require = createRequire(import.meta.url);
const DirectValidator = require("direct-json-validator");

function createImplementation({ draft, formatProfile, resources }) {
  const validator = new DirectValidator({
    draft,
    validateFormats: formatProfile === "format-assertion"
  });

  for (const resource of resources) {
    for (const alias of resource.aliases) {
      validator.addSchema(resource.schema, alias);
    }
  }

  let lastError = null;

  return {
    reportOptions: {
      draft,
      formatProfile,
      validateFormats: formatProfile === "format-assertion"
    },
    validate(schema, data) {
      const result = validator.validate(data, schema);
      lastError = result.error ?? null;
      return result.valid === true;
    },
    getError() {
      return lastError === null ? null : JSON.stringify(lastError);
    }
  };
}

export const adapter = defineAdapter(
  {
    id: "direct-json-validator",
    packageName: "direct-json-validator",
    displayName: "Direct JSON Validator",
    drafts: ["draft6", "draft7"],
    unsupported: []
  },
  createImplementation
);
```

A validate-only adapter omits `compile`, so its compile performance is `N/A`. Execution prepares each schema before the measured execution interval and calls `validate` inside it.

## Timing boundaries

The adapter factory belongs to conformance setup and to the measured Compile operation. Its lifetime differs by stage.

- Conformance first detects statically unsupported capabilities. For a supported schema, it creates one factory context for that schema and profile, optionally compiles once, validates every case in the schema group, and may call `getError` after a false result. Factory, compile, validation, and diagnostic behavior all contribute to classification. Throughput timers apply to the performance phases.
- Compile performance prepares neutral schema and resource copies before the start timestamp. Primitive schemas, including `true` and `false`, pass directly into each fresh adapter. The timer then covers the complete fresh contractual construction for one operation: adapter factory and context creation, vendor construction, format and metaschema registration, resource registration, and `compile(schema)`. Post-call yielding, serialization, deadline checks, memory sampling, and harness diagnostics remain outside the accumulated compile duration.
- Execution performance creates one adapter context for each representative compile entry before warmup and measurement. Optional compilation, resource and format registration, closure creation, validator-to-schema mapping, and the correctness precheck all occur outside the execution timer. The measured interval covers repeated complete-corpus passes, including the `validate(target, data)` calls and the runner's minimal traversal, checksum, clock, deadline, and memory bookkeeping inside those passes.
- `getError` runs during conformance after `validate` returns `false`. Compile and execution throughput measure their phase contracts.

Keep vendor construction and registrations in the factory, reusable compilation in `compile`, and data validation in `validate`. Compile measures both factory and compilation as one fresh operation. Moving setup into `validate` inflates execution cost. Moving compilation into the factory changes the API under test even though the timer catches the cost.

## Result classification

- `PASS`: the observed boolean matches the suite expectation.
- `WRONG`: the adapter returns the opposite boolean.
- `COMPILE`: a compiled adapter rejects the schema before validation.
- `RUNTIME`: validation throws, a validate-only setup fails, or detailed error extraction reveals a profile divergence.
- `UNSUPPORTED`: capability preflight finds a capability listed in the adapter declaration.

Static unsupported declarations represent known capability gaps. Classify vendor defects as `COMPILE`, `RUNTIME`, or `WRONG` so reports keep them visible.

## Behavioral tests

Add tests for business behavior and orchestration that can regress:

- The adapter rejects invalid configuration or unsupported drafts through the public adapter boundary.
- `validate` returns the expected boolean for valid and invalid data and preserves its inputs.
- Resources, aliases, format profiles, and unknown formats reach the vendor correctly.
- Optional async compilation resolves through the shared contract.
- Validate-only adapters stay outside compile participants.
- An exact boundary such as 98%, 98.5%, or 99.95% qualifies in both profiles, while the next fraction below it remains excluded.
- Base and Formats form one atomic draft decision, and every non-PASS category reduces its profile percentage.
- Execution uses the atomic draft roster. Compile intersects that roster with Compile API capability. Each phase corpus derives from its eligible roster.
- All Drafts requires atomic qualification in Base and Formats across all five drafts. Each phase publishes `baseOpsPerSecond` and `formatsOpsPerSecond` as the sums of its five profile midpoints, plus `averageOpsPerSecond` as the arithmetic mean of those sums. These raw indices inherit ops/s units and represent aggregated scope rates. Each phase also builds one common roster, sets each scope reference to that roster's fastest midpoint, and normalizes every validator midpoint against its scope reference. Base score and Formats score use five-scope geometric means. Balanced score uses the ten-scope geometric mean and controls the ranking with validator ID as the deterministic tie-breaker. Compile also requires its phase to be available in all five drafts.
- Unsupported scopes contribute zero PASS to the global 7,970-case Total denominator.
- Total rows use deterministic descending order and validator ID tie-breaking, and the Mermaid series preserves that order.
- Rankings with fewer than two competitors publish `INSUFFICIENT_COMPETITORS`. Leader, score, and competitive chart fields start with two competitors.
- Error extraction returns a flat string or `null` after a false result.
- Static capability declarations produce `UNSUPPORTED` before the factory runs.
- Pipeline stages stop after a failed stage and preserve coordinated transactional publication with rollback before both public paths commit.

Write tests for executable behavior, observed evidence, formulas, columns, ordering, links, hashes, truncation, and structure. Review prose and local documentation links directly.

## Contribution workflow

During development:

```bash
npm test
npm run benchmark -- --quick
```

Before publishing benchmark results:

```bash
npm test
npm run benchmark
```

Quick and Full stage and validate canonical `README.md` and `results/` artifacts before a coordinated transactional publication after every prior pipeline stage passes. The transaction uses separate renames for the two public root paths and rolls back failures before both paths commit. Concurrent readers can observe the rename window. `.cache/` contains the pinned suite checkout, resumable checkpoints, staging directories, and local transaction data. The versioned locks recreate the cache. Publish the generated artifacts and keep `.cache/` and `node_modules/` local.

Canonical results come from a controlled Linux host. CI runs `npm test` and artifact-integrity checks. Record the environment and benchmark contract hash for every published run.

Before publishing, verify that the generated clone command uses the public repository URL, then regenerate all publication artifacts through the Full pipeline and its coordinated publication transaction.

The JSON Schema Test Suite corpus retains its MIT license and attribution. `THIRD_PARTY_NOTICES` records the exact commit from `suite-lock.json` and the full upstream MIT text. Original benchmark code and documentation use Apache-2.0. Dependencies and bundled metaschemas retain their respective licenses, including the AJV and Redocly AJV terms under `metaschemas/`.

Review generated conformance JSON, intersections, performance samples, checksums, summaries, error links, package metadata, and the final README before publication. Performance values can vary across hosts. Corpus identities, counts, checksums, contract versions, and report structure must remain internally consistent.

## Contribution checklist

- [ ] The dependency uses an exact version in `package.json`.
- [ ] `package-lock.json` records the exact dependency graph and integrity.
- [ ] npm snapshot metadata matches the pinned package and version when metadata changed.
- [ ] The adapter uses `defineAdapter(declaration, factory)`.
- [ ] The declaration lists exact package identity, drafts, and known unsupported capabilities.
- [ ] The factory owns vendor state and returns JSON-serializable `reportOptions`.
- [ ] `validate` is synchronous and returns exactly a boolean.
- [ ] `compile` exists only when the vendor exposes reusable compilation.
- [ ] `getError` returns a non-empty string or `null` during conformance.
- [ ] Resources, aliases, formats, and unknown formats follow the vendor API.
- [ ] A required static import appears once in the single adapter registry.
- [ ] Behavioral tests cover invalid and valid paths. Direct review covers copy and source layout.
- [ ] `npm test` passes.
- [ ] Quick passes during development.
- [ ] Full passes before benchmark results are published.
- [ ] Generated artifacts, local links, status counts, intersections, and checksums were reviewed.
