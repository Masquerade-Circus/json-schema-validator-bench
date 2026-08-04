# draft6 benchmark results

## Setup ranking

Leader: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 4,194 | 100% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 188.4 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 4,004 | 95.5% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 189.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,648 | 63.2% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 186.6 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 83 | 2.0% | [3](errors/setup/ajv-COMPILE.md) | 0 | 322.8 MiB |

Excluded from this ranking:

- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Balanced score 89.6%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 2,527,458 | 13,544,680 | 80.4% | 100% | 89.6% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 191.4 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 3,145,408 | 4,493,543 | 100% | 33.2% | 57.6% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 301.5 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 397,712 | 1,851,417 | 12.6% | 13.7% | 13.1% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 186.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 80,333 | 109,295 | 2.6% | 0.8% | 1.4% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 191.0 MiB |

Excluded from this ranking:

- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 7,316 | 12,061 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 190.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,712 | 4,510 | 50.7% | 37.4% | 43.6% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 185.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 111 | 119 | 1.5% | 1.0% | 1.2% | [0](errors/cold-execution/base/ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 420.2 MiB |

Excluded from this ranking:

- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

Setup eligible roster: 4/9. Draft intersection: 1198 represented cases and 251 deduplicated effective operations. Roster SHA-256: `6b08a2f321b928e8f256852e6d2d26f9cdb290c31b3cb44f2f225dc251a73524`.

# Profile: base

Execution eligible roster: 4/9. Intersection: 927 cases and 250 setup entries. Roster SHA-256: `6b08a2f321b928e8f256852e6d2d26f9cdb290c31b3cb44f2f225dc251a73524`.

Cold execution eligible roster: 3/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `d64f3ff48f144328253e36e39c0774e28bfb01fcfd5031e3ce0035528e3da139`.

## Execution ranking

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 3,145,408 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 3,145,408 | 3,022,703 | 6.4% | 12.3% | 2,549,453 to 3,499,426 | 100% | 0 | 301.5 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 2,527,458 | 2,450,835 | 7.1% | 11.5% | 2,046,502 to 2,818,691 | 80.4% | 0 | 191.4 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 397,712 | 395,764 | 5.0% | 8.1% | 344,838 to 431,721 | 12.6% | 0 | 186.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 80,333 | 77,783 | 2.9% | 8.3% | 66,055 to 82,868 | 2.6% | 0 | 191.0 MiB |

Excluded from this ranking:

- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 7,316 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 7,316 | 7,294 | 1.9% | 5.2% | 6,661 to 7,818 | 100% | 0 | 190.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,712 | 3,785 | 3.7% | 6.1% | 3,535 to 4,128 | 50.7% | 0 | 185.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 111 | 113 | 1.6% | 4.4% | 107 to 122 | 1.5% | 0 | 420.2 MiB |

Excluded from this ranking:

- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft6 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 937 | 5 | 3 | 0 | 0 |
| draft6 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 931 | 8 | 6 | 0 | 0 |
| draft6 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 923 | 5 | 3 | 14 | 0 |
| draft6 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 945 | 0 | 0 | 0 | 0 |
| draft6 | [djv](https://www.npmjs.com/package/djv) (2.1.4) | 807 | 98 | 15 | 25 | 0 |
| draft6 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 938 | 1 | 0 | 6 | 0 |
| draft6 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 922 | 1 | 0 | 22 | 0 |
| draft6 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 941 | 0 | 4 | 0 | 0 |
| draft6 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 944 | 1 | 0 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 4/9. Intersection: 271 cases and 10 setup entries. Roster SHA-256: `6b08a2f321b928e8f256852e6d2d26f9cdb290c31b3cb44f2f225dc251a73524`.

Cold execution eligible roster: 3/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `d64f3ff48f144328253e36e39c0774e28bfb01fcfd5031e3ce0035528e3da139`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 13,544,680 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 13,544,680 | 13,535,997 | 1.7% | 3.1% | 12,877,468 to 14,137,888 | 100% | 0 | 180.0 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,493,543 | 4,432,358 | 2.6% | 4.4% | 4,190,410 to 4,663,909 | 33.2% | 0 | 181.3 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,851,417 | 1,844,976 | 3.3% | 4.8% | 1,734,849 to 1,981,955 | 13.7% | 0 | 184.2 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 109,295 | 108,896 | 1.1% | 2.1% | 105,385 to 112,295 | 0.8% | 0 | 184.1 MiB |

Excluded from this ranking:

- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 12,061 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 12,061 | 11,904 | 1.6% | 3.4% | 11,387 to 12,349 | 100% | 0 | 187.1 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 4,510 | 4,374 | 1.9% | 7.1% | 3,810 to 4,612 | 37.4% | 0 | 184.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 119 | 119 | 1.1% | 1.5% | 117 to 122 | 1.0% | 0 | 323.2 MiB |

Excluded from this ranking:

- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft6 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 271 | 2 | 0 | 0 | 0 |
| draft6 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 273 | 0 | 0 | 0 | 0 |
| draft6 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 271 | 2 | 0 | 0 | 0 |
| draft6 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 273 | 0 | 0 | 0 | 0 |
| draft6 | [djv](https://www.npmjs.com/package/djv) (2.1.4) | 217 | 54 | 0 | 2 | 0 |
| draft6 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 179 | 94 | 0 | 0 | 0 |
| draft6 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 248 | 25 | 0 | 0 | 0 |
| draft6 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 263 | 3 | 7 | 0 | 0 |
| draft6 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 273 | 0 | 0 | 0 | 0 |

## npm snapshot

Period: 2026-07-27 through 2026-08-02. Retrieved at 2026-08-04T18:04:08.000Z.

Each row binds observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. `module-global-unavailable` means Cold execution is N/A because a fresh adapter wrapper cannot isolate provider state.

| Validator | API | Cold isolation | Dynamic code | Weekly downloads |
| --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | fresh-instance | observed | 366,039,890 |
| [djv](https://www.npmjs.com/package/djv) (2.1.4) | reusable-sync | fresh-instance | observed | 65,678 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | module-global-unavailable | not-observed | 255,244 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | fresh-instance | not-observed | 532,097 |
| [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | validate-only | fresh-instance | not-observed | 6,186,992 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | reusable-sync | fresh-instance | observed | 8,304,494 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | reusable-sync | fresh-instance | not-observed | 279 |
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
