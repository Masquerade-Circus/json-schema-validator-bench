# Contributing a validator adapter

## Purpose

JSON Schema Validator Bench compares validator conformance and performance across five JSON Schema drafts and two format profiles. Within each draft, every participating validator receives the same discovered conformance cases. Performance uses one atomic qualified roster per draft and the common `PASS` intersection formed from that roster. Setup further intersects the draft roster with validators that expose reusable `setup()`. Cold execution measures a fresh isolated adapter setup plus one validation per case.

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

Use the exact ID from `src/adapter-registry.js`. The validator refresh runs conformance and performance only for that validator, then rebuilds every report and ranking from the reconciled cohort. It marks the output as diagnostic and preserves the Quick or Full base mode.

The refresh requires a complete compatible publication for the same base mode. Changes to the environment, benchmark contract, suite, locks, threshold, rounds, roster, eligibility, or common `PASS` corpus stop the refresh and request a complete run. Compatible chained refreshes retain every refreshed validator in diagnostic metadata.

Regenerate one phase from a complete compatible publication with `--bench setup`, `--bench execution`, or `--bench cold`. The runner repeats preflight, harness, smoke and conformance, replaces the selected phase, verifies every omitted phase against the baseline, and rebuilds the complete publication transactionally. Combine `--bench` with `--validator` to refresh one validator in one phase while retaining both selectors in diagnostic metadata.

Each sample stores the validator runtime hash that produced it. A combined validator and phase refresh updates only that validator-phase pair. Omitted samples preserve their baseline runtime hash, and `results/environment.json` records provenance by scope and validator so a report cannot attribute baseline measurements to the current runtime.

The atomic eligibility gate defaults to 98%. Configure it for either mode with an ordinary decimal from 0 through 100 and at most six decimal places:

```bash
npm run benchmark -- --quick --eligibility-threshold-percent 98.5
```

Run Full before publishing benchmark results:

```bash
npm run benchmark
```

Full executes complete conformance and complete common-intersection performance samples. It ignores existing performance checkpoints, measures every sample in the current pipeline execution, and replaces Quick artifacts with the publication contract. A publishable Full reports equal measured and published sample counts with zero resumed samples.

Refresh npm package metadata only when dependency metadata or download counts must change:

```bash
npm run metadata:sync
```

Metadata sync updates `npm-snapshot-lock.json` and its generated snapshot. Quick and Full consume that pinned metadata.

SchemaShield provides its official metaschemas inside the locked npm package. The adapter uses those built-in resources and adds only the URI aliases required by the suite.

## Architecture

Each adapter has two parts:

1. A declaration names the validator, npm package, supported drafts, and statically unsupported capabilities.
2. A factory closure owns vendor state, options, resources, setup, validation, and optional error extraction for one benchmark configuration.

`src/adapter-registry.js` imports the ten opaque adapter modules and provides the participant source. Each adapter imports its own provider, draft entrypoints, plugins and metaschemas, then exports its declaration and factory through the common API. Setup eligibility derives from the presence of `setup()`.

The generated Participants table uses these labels:

- `reusable-sync`: prepares a reusable callable synchronously.
- `reusable-async`: resolves asynchronous setup before exposing a reusable callable.
- `validate-only`: validates through the adapter without a separate reusable setup target.
- `fresh-instance`: each fresh adapter creates isolated provider state.
- `module-global-unavailable`: module-global provider state cannot satisfy the fresh-isolation contract, so Cold execution is `N/A`.
- `observed`: the exercised adapter route uses dynamic code generation.
- `not-observed`: the exercised adapter route did not use dynamic code generation.

Dynamic code describes the adapter route exercised at the pinned package version. It does not classify every path available in that package.

The harness detects schema capabilities before it creates an adapter. A declaration can mark a detected capability as unsupported, which produces `UNSUPPORTED` records and skips vendor invocation. Conformance records every case. Performance then applies the objective qualification gate once per draft before it derives the common `PASS` intersections for Base and Formats.

### Runner ownership and adapter ownership

The runner owns benchmark policy. It discovers the suite, assigns the draft and format profile, detects capabilities, computes the local resource closure, detects unknown format names, applies the schema profile on a clone, qualifies the atomic draft roster, intersects Setup with reusable `setup()`, chooses each phase's common conformance intersection, creates fresh factory contexts at the required boundary and controls the operation timers. Adapters consume those decisions and the neutral corpus supplied by the runner.

The qualification gate requires Base and Formats to reach the configured percentage in the same draft. The CLI preserves the normalized decimal text and converts it to a reduced fraction. Eligibility compares `PASS * threshold denominator >= total * threshold numerator` with integers, so displayed rounding preserves the result. `WRONG`, `COMPILE`, `RUNTIME`, and `UNSUPPORTED` all count as non-PASS. The exact profile fractions determine eligibility. Execution uses the eligible draft roster. Setup uses the same roster intersected with participants that expose reusable `setup()`. Cold execution also requires fresh adapter state that the wrapper can isolate. Eligibility depends exclusively on the exact Base and Formats `PASS` fractions for the atomic draft roster.

The global conformance table shows one percentage cell per draft and profile. Its Total divides PASS by all 7,970 canonical cases across the five drafts and both profiles. Unsupported drafts and scopes contribute zero PASS while their cases remain in the denominator. Rows sort by Total descending and use validator ID as the stable tie-breaker. The accompanying Mermaid chart keeps the same order and marks the configured threshold as a reference line. The atomic Base and Formats fractions for each draft control eligibility.

A performance ranking needs at least two competitors. A smaller roster publishes `INSUFFICIENT_COMPETITORS` and omits the leader, relative score, and competitive chart.

Each phase publishes a performance identity hash over the policy, relevant suite and format configuration, eligible roster, and eligible corpus. Compatible performance cache entries share this identity. A separate artifact hash covers excluded-roster diagnostics, mutations, all source-report hashes, and the rest of the complete document. Excluded participants remain visible in conformance and diagnostics.

The adapter owns the vendor integration. Its factory selects the vendor constructor or dialect API, creates vendor state, applies stable options, registers formats and local resources through the vendor's public API, and returns the vendor-specific `setup`, `validate`, and optional `getError` functions. Mutable vendor state belongs inside the factory closure so one benchmark configuration cannot leak registrations or errors into another.

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

`unknownFormats` contains the sorted, deduplicated format names detected in the relevant schema or performance corpus that are outside the benchmark's known format lists. The benchmark treats these names as annotation candidates. Some vendors require explicit registration before schema setup to preserve that behavior.

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

Add the validator to `dependencies` in `package.json` with an exact version. `package.json` is the source of truth for direct dependency versions. Update `package-lock.json` with that exact dependency and keep its root dependency inventory equal to `package.json`. Keep package resolution, integrity, and transitive dependencies in the lockfile.

```bash
npm install --save-exact tiny-json-validator@2.4.1
```

Run metadata sync when the package is new to the benchmark or its pinned version changed. `npm-snapshot-lock.json` and `results/npm-snapshot.json` are generated artifacts rather than independent version sources. Review the resulting metadata before publication.

### 2. Create the adapter

Create `src/adapters/<validator-id>.js`. Import the vendor statically when its module shape requires a static import. Keep vendor options and mutable state inside the factory closure.

The declaration fields are:

- `id`: stable benchmark ID.
- `packageName`: exact npm package name.
- `additionalPackages`: optional exact npm package names imported directly by this adapter in addition to `packageName`. The registry unions these declarations to derive the required `package.json` dependency inventory.
- `displayName`: human-readable report name.
- `drafts`: drafts for which the adapter makes a support claim. Use only `draft4`, `draft6`, `draft7`, `draft2019-09`, and `draft2020-12`.
- `unsupported`: known capabilities the validator cannot process. The current declarative capability is `ADAPTER_CAPABILITIES.EXTERNAL_SCHEMA_RESOURCES`.
- `implementation`: public API, isolation and dynamic-code labels for generated participant metadata.
- `supportClaims`: optional per-draft claim labels. Omitted drafts use `declared`.

The factory receives normalized `draft`, `formatProfile`, `resources`, and `unknownFormats` values. It must return:

- `reportOptions`: JSON-serializable options that explain the stable configuration used in reports. Include stable scalar, array, and plain-object configuration values. Schemas, per-case data, resources, and runtime objects belong to their dedicated inputs.
- `validate(target, data)`: required synchronous function that returns exactly `true` or `false`.
- `setup(schema)`: optional sync or `async` function. A synchronous declaration must return its target directly. A vendor that requires asynchronous setup must declare `async` and return a Promise. Omit `setup` for a validate-only API.
- `getError(context)`: optional sync or async function that returns a non-empty string or `null`. It runs only after `validate` returns `false` and only during conformance.

Use `formatProfile` to enable the vendor's format assertion behavior. Register each normalized `unknownFormats` entry when the vendor rejects unknown formats at compile time and the suite expects annotation behavior. Register every local resource alias when the vendor supports external schema resources. Declare static resource capability gaps through `unsupported`.

### 3. Register one static import

Import the provider, its draft entrypoints, plugins and private metaschema snapshots directly inside `src/adapters/<validator-id>.js`. Add one import of the completed adapter module to `src/adapter-registry.js`, then add that adapter to `adapterRegistry`. The registry treats each adapter as an opaque unit and rejects duplicate IDs.

### 4. State draft and capability support precisely

List the drafts that the adapter executes with the correct semantics. Generated metadata derives each support claim from the registry.

Use the declaration's `unsupported` list for a known static capability gap. The conformance preflight compares detected schema capabilities with this list before factory creation. This safeguard keeps `UNSUPPORTED` distinct from vendor setup failures and runtime defects.

## Complete reusable adapter example

This complete module illustrates a validator with a reusable setup API, local resource registration, format setup, and error extraction. Replace the illustrative package API with the pinned vendor's real API.

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
    setup(schema) {
      return validator.compile(schema);
    },
    validate(target, data) {
      const result = target(data);
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
    unsupported: [],
    implementation: {
      api: "reusable-sync",
      isolation: "fresh-instance",
      dynamicCode: "not-observed"
    }
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
    unsupported: [],
    implementation: {
      api: "validate-only",
      isolation: "fresh-instance",
      dynamicCode: "not-observed"
    }
  },
  createImplementation
);
```

A validate-only adapter omits `setup()`, so its Setup performance is `N/A`. It participates in Execution through the provider's public validation call. It participates in Cold execution when a fresh adapter instance isolates its provider state.

The fast `validate` path must use the provider's first-error or fail-fast option when its public API exposes one. `getError` may create a separate detailed context because it runs only after a false conformance result and remains outside performance timing.

## Timing boundaries

The adapter factory belongs to conformance setup, measured Setup and measured Cold execution. Its lifetime differs by stage.

- Conformance first detects statically unsupported capabilities. For a supported schema, it creates one factory context for that schema and profile, calls `setup()` once when available, validates every case in the schema group, and may call `getError` after a false result. Factory, setup, validation and diagnostic behavior all contribute to classification. Throughput timers apply to the performance phases.
- Setup performance forms one draft-scoped union of effective Base and Formats operations. It deduplicates by transformed schema, resource closure and effective adapter configuration before it prepares neutral copies. Primitive schemas, including `true` and `false`, pass directly into each fresh adapter. The timer then covers the adapter factory, provider construction, format and metaschema registration, resource registration, and `setup(schema)`. Post-call yielding, serialization, deadline checks, memory sampling and harness diagnostics remain outside the accumulated Setup duration.
- Execution performance creates one adapter context for each representative setup entry before warmup and measurement. Reusable adapters prepare a target, while `validate-only` adapters prepare their adapter context and profiled schema. Resource and format registration, validator-to-schema mapping and the correctness precheck all occur outside the execution timer. The measured interval covers repeated complete-corpus passes through the prepared target or prepared `validate-only` context, plus the runner's minimal traversal, checksum, clock, deadline and memory bookkeeping.
- Cold execution prepares disposable schema, data and resource copies, analyzes capabilities and normalizes the common adapter configuration before the operation clock. The timed interval creates the provider context through the opaque adapter, applies provider-specific configuration and registration, calls `setup()` when available, validates once and ends when validation returns. Module imports, process startup, common contract checks, result comparison, checksum, diagnostics and telemetry remain outside the clock. Hyperjump is `N/A` because its module-global state cannot satisfy this fresh-isolation contract.
- `getError` runs during conformance after `validate` returns `false`. Setup, Execution and Cold execution throughput measure their phase contracts.

Quick and Full use the complete common corpus and the same timing, phases, scopes, isolation, eligibility, scoring, preparation and sample contract. Every sample warms complete passes for at least 100 ms, targets 250 ms of measured work, and requires a normal minimum of 175 ms. Full records six isolated samples per participant and scope in three antithetic order pairs with deterministic offsets `0`, `floor(n / 3)`, and `floor(2n / 3)` for roster size `n`. A complete Full measures all six rounds from zero inside one pipeline window and does not read prior performance samples. Quick records only the deterministic first round and may resume compatible checkpoints, so it provides neither complete antithetic pairs nor multi-round dispersion. Full reports rank by the six-round median and publish the mean, relative median absolute deviation, sample coefficient of variation, minimum, maximum, and all six rates. These diagnostics do not establish statistical significance.

Keep vendor construction and registrations in the factory, reusable preparation in `setup()`, and data validation in `validate()`. Setup measures the factory and `setup()` as one fresh operation. Cold execution measures that fresh lifecycle plus one validation for every case. Moving setup into `validate()` inflates execution cost and breaks the phase contract.

## Result classification

- `PASS`: the observed boolean matches the suite expectation.
- `WRONG`: the adapter returns the opposite boolean.
- `COMPILE`: historical status for a reusable adapter that rejects the schema during `setup()` before validation.
- `RUNTIME`: validation throws, a validate-only setup fails, or detailed error extraction reveals a profile divergence.
- `UNSUPPORTED`: capability preflight finds a capability listed in the adapter declaration.

Static unsupported declarations represent known capability gaps. Classify vendor defects as `COMPILE`, `RUNTIME`, or `WRONG` so reports keep them visible.

## Behavioral tests

Add tests for business behavior and orchestration that can regress:

- The adapter rejects invalid configuration or unsupported drafts through the public adapter boundary.
- `validate` returns the expected boolean for valid and invalid data and preserves its inputs.
- Resources, aliases, format profiles, and unknown formats reach the vendor correctly.
- Optional async setup resolves through the shared contract.
- Validate-only adapters stay outside Setup participants.
- An exact boundary such as 98%, 98.5%, or 99.95% qualifies in both profiles, while the next fraction below it remains excluded.
- Base and Formats form one atomic draft decision, and every non-PASS category reduces its profile percentage.
- Execution uses the atomic draft roster. Setup intersects that roster with reusable `setup()` capability. Cold execution also requires fresh isolated adapter state. Each phase corpus derives from its eligible roster.
- All Drafts requires atomic qualification in Base and Formats across all five drafts. Setup publishes `setupOpsPerSecond` as the sum of five draft medians and ranks by `setupScore`, the geometric mean of five normalized ratios. Execution and Cold execution retain `baseOpsPerSecond`, `formatsOpsPerSecond`, `averageOpsPerSecond`, five-scope Base and Formats scores, and the ten-scope Balanced score.
- Unsupported scopes contribute zero PASS to the global 7,970-case Total denominator.
- Total rows use deterministic descending order and validator ID tie-breaking, and the Mermaid series preserves that order.
- Rankings with fewer than two competitors publish `INSUFFICIENT_COMPETITORS`. Leader, score, and competitive chart fields start with two competitors.
- Error extraction returns a flat string or `null` after a false result.
- Static capability declarations produce `UNSUPPORTED` before the factory runs.
- Pipeline stages stop after a failed stage and preserve coordinated transactional publication with rollback before both public paths commit.

Write tests for executable behavior, observed evidence, formulas, columns, ordering, links, hashes, truncation, and structure. Review prose and local documentation links directly.

## Contribution workflow

Use this sequence for a reproducible validator change:

1. Run `npm test`, then `npm run benchmark -- --quick` to establish a diagnostic baseline. Quick runs complete conformance and the complete performance corpus under the Full timing contract, with one round instead of six. Quick artifacts are diagnostic and do not provide complete antithetic pairs or multi-round dispersion.
2. Inspect `results/<draft>/conformance/<canonical-id>.json` and its Markdown companion. `WRONG` records the opposite boolean, `COMPILE` records reusable schema preparation failure, and `RUNTIME` records validation, validate-only setup or detailed error extraction failure.
3. Select the relevant performance phase. Setup isolates public provider construction, registration and `setup()` over neutral inputs. Execution measures repeated validation through the provider's best public recurrent call. Cold execution measures a fresh isolated adapter setup plus the first validation.
4. Read `results/<draft>/setup/samples.json` for Setup or `results/<draft>/profiles/<profile>/<phase>/samples.json` for Execution and Cold execution. Compare rounds, operations, duration, throughput and memory. Confirm the corpus, intersection, performance and benchmark identities before attributing a result to the validator change.
5. Interpret each value in its unit. Raw rates belong to one scope. Relative scores compare eligible validators with that scope's reference. Global ops/s indices sum scope medians and support diagnosis across drafts. They do not represent one measured workload.
6. Before changing the validator, copy the relevant baseline artifacts outside `results/` so the refresh cannot replace them, and record the benchmark contract hash, intersection and performance identities, and baseline values for the exact draft, profile and phase under analysis.
7. Keep the corpus, target and adapter options fixed. After one validator change, use `npm run benchmark -- --quick --validator <canonical-id>` when the existing Quick publication remains compatible. The command produces only the post-change state and does not calculate a before/after comparison. Compare it with the preserved baseline for exactly the same draft, profile and phase.
8. Run complete Quick when the environment, benchmark contract, suite, locks, threshold, rounds, roster, eligibility or common `PASS` corpus changes, or when no compatible Quick publication exists.
9. Run `npm run benchmark` only after tests and Quick are stable. Full runs complete conformance and the complete performance corpus under the canonical contract. Use it only for final publication.

Quick and Full stage and validate canonical `README.md` and `results/` artifacts before a coordinated transactional publication after every prior pipeline stage passes. The transaction uses separate renames for the two public root paths and rolls back failures before both paths commit. Concurrent readers can observe the rename window. `.cache/` contains the pinned suite checkout, diagnostic checkpoints, staging directories, and local transaction data. Quick and selective validator or phase refreshes may resume compatible checkpoints. A complete Full ignores their samples and replaces each checkpoint only after a fresh measurement. The versioned locks recreate the cache. Publish the generated artifacts and keep `.cache/` and `node_modules/` local.

Canonical results come from a controlled Linux host. CI runs `npm test` and artifact-integrity checks. Record the environment and benchmark contract hash for every published run.

Before publishing, verify that the generated clone command uses the public repository URL, then regenerate all publication artifacts through the Full pipeline and its coordinated publication transaction.

The JSON Schema Test Suite corpus retains its MIT license and attribution. `THIRD_PARTY_NOTICES` records the exact commit from `suite-lock.json` and the full upstream MIT text. Original benchmark code and documentation use Apache-2.0. Dependencies retain their respective licenses.

Review generated conformance JSON, intersections, performance samples, checksums, summaries, error links, package metadata, and the final README before publication. Performance values can vary across hosts. Corpus identities, counts, checksums, contract versions, and report structure must remain internally consistent.

## Contribution checklist

- [ ] The dependency uses an exact version in `package.json`.
- [ ] `package-lock.json` records the exact dependency graph and integrity.
- [ ] npm snapshot metadata matches the pinned package and version when metadata changed.
- [ ] The adapter uses `defineAdapter(declaration, factory)`.
- [ ] The declaration lists exact package identity, drafts, and known unsupported capabilities.
- [ ] The factory owns vendor state and returns JSON-serializable `reportOptions`.
- [ ] `validate` is synchronous and returns exactly a boolean.
- [ ] `setup()` exists only when the vendor exposes reusable preparation.
- [ ] `getError` returns a non-empty string or `null` during conformance.
- [ ] Resources, aliases, formats, and unknown formats follow the vendor API.
- [ ] A required static import appears once in the single adapter registry.
- [ ] Behavioral tests cover invalid and valid paths. Direct review covers copy and source layout.
- [ ] `npm test` passes.
- [ ] Quick passes during development.
- [ ] Full passes before benchmark results are published.
- [ ] Generated artifacts, local links, status counts, intersections, and checksums were reviewed.
