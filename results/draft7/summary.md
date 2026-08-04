# draft7 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 2,892 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 194.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,102 | 72.7% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 223.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,821 | 63.0% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 187.5 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 1,351,209 | 8,971,003 | 100% | 100% | 100% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 192.4 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 245,227 | 168,477 | 18.1% | 1.9% | 5.8% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 258.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 62,064 | 62,357 | 4.6% | 0.7% | 1.8% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 193.8 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 4,780 | 6,707 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 198.1 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,443 | 2,609 | 51.1% | 38.9% | 44.6% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 196.7 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%).

Setup eligible roster: 3/9. Draft intersection: 1607 represented cases and 281 deduplicated effective operations. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

# Profile: base

Execution eligible roster: 3/9. Intersection: 1026 cases and 280 setup entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Cold execution eligible roster: 2/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 1,351,209 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 1,351,209 | 1,261,394 | 16.9% | 27.1% | 853,244 to 1,697,688 | 100% | 0 | 192.4 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 245,227 | 236,974 | 9.8% | 14.2% | 188,053 to 272,927 | 18.1% | 0 | 258.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 62,064 | 63,158 | 2.9% | 7.0% | 58,734 to 71,321 | 4.6% | 0 | 193.8 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 4,780 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 4,780 | 4,790 | 3.4% | 4.7% | 4,475 to 5,091 | 100% | 0 | 198.1 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,443 | 2,383 | 4.6% | 8.5% | 2,041 to 2,604 | 51.1% | 0 | 196.7 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft7 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 1027 | 11 | 3 | 4 | 0 |
| draft7 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 1031 | 9 | 5 | 0 | 0 |
| draft7 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1027 | 12 | 6 | 0 | 0 |
| draft7 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 1031 | 9 | 5 | 0 | 0 |
| draft7 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 1045 | 0 | 0 | 0 | 0 |
| draft7 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 1034 | 5 | 0 | 6 | 0 |
| draft7 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 1011 | 6 | 0 | 28 | 0 |
| draft7 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 1013 | 4 | 28 | 0 | 0 |
| draft7 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1044 | 1 | 0 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 3/9. Intersection: 581 cases and 18 setup entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Cold execution eligible roster: 2/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 8,971,003 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 8,971,003 | 8,689,627 | 3.2% | 7.9% | 7,670,642 to 9,339,834 | 100% | 0 | 179.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 168,477 | 168,740 | 2.3% | 2.9% | 163,890 to 175,761 | 1.9% | 0 | 201.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 62,357 | 61,194 | 5.4% | 8.2% | 53,057 to 67,179 | 0.7% | 0 | 185.1 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 6,707 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 6,707 | 6,748 | 2.5% | 5.1% | 6,380 to 7,342 | 100% | 0 | 191.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,609 | 2,642 | 6.3% | 7.6% | 2,412 to 2,894 | 38.9% | 0 | 188.4 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft7 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 485 | 102 | 0 | 0 | 0 |
| draft7 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 500 | 87 | 0 | 0 | 0 |
| draft7 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 581 | 6 | 0 | 0 | 0 |
| draft7 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 500 | 87 | 0 | 0 | 0 |
| draft7 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 587 | 0 | 0 | 0 | 0 |
| draft7 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 411 | 176 | 0 | 0 | 0 |
| draft7 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 458 | 129 | 0 | 0 | 0 |
| draft7 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 421 | 28 | 138 | 0 | 0 |
| draft7 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 587 | 0 | 0 | 0 | 0 |

## npm snapshot

Period: 2026-07-27 through 2026-08-02. Retrieved at 2026-08-04T03:17:09.810Z.

Each row binds observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. `module-global-unavailable` means Cold execution is N/A because a fresh adapter wrapper cannot isolate provider state.

| Validator | API | Cold isolation | Dynamic code | Weekly downloads |
| --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | fresh-instance | observed | 366,039,890 |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | reusable-sync | fresh-instance | not-observed | 6,655,864 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | module-global-unavailable | not-observed | 255,244 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | fresh-instance | not-observed | 532,097 |
| [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | validate-only | fresh-instance | not-observed | 6,186,992 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | reusable-sync | fresh-instance | observed | 8,304,494 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | reusable-sync | fresh-instance | not-observed | 279 |
| [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | reusable-sync | fresh-instance | observed | 4,851,948 |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | reusable-sync | fresh-instance | not-observed | 3,261,931 |

- `reusable-sync`: prepares a reusable callable synchronously.
- `reusable-async`: resolves asynchronous setup before exposing a reusable callable.
- `validate-only`: exposes validation through the adapter without a separate reusable setup target.
- `fresh-instance`: each fresh adapter creates isolated provider state.
- `module-global-unavailable`: module-global provider state cannot satisfy the fresh-isolation contract, so Cold execution is `N/A`.
- `observed`: the exercised adapter route uses dynamic code generation.
- `not-observed`: the exercised adapter route did not use dynamic code generation.

Dynamic code describes the route exercised by the adapter at the pinned version, not every path available in the package.

## Limitations

Format behavior, runtime state, hardware, power state, and operating-system load affect results. Setup N/A identifies a validate-only API or unavailable setup measurement. Cold execution N/A identifies an adapter whose state cannot be isolated under the direct measurement contract.
