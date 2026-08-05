# draft6 benchmark results

## Setup ranking

Leader: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 5,585 | 100% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 302.6 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 5,344 | 95.7% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 288.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,398 | 60.8% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 287.1 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 109 | 2.0% | [3](errors/setup/ajv-COMPILE.md) | 0 | 440.5 MiB |

Excluded from this ranking:

- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Balanced score 84.9%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 2,946,571 | 14,000,467 | 72.1% | 100% | 84.9% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 292.4 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,088,308 | 4,453,081 | 100% | 31.8% | 56.4% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 339.5 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 593,141 | 1,854,397 | 14.5% | 13.2% | 13.9% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 313.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 94,588 | 103,968 | 2.3% | 0.7% | 1.3% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 310.2 MiB |

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
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 6,850 | 10,117 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 284.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,688 | 3,868 | 53.8% | 38.2% | 45.4% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 289.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 114 | 115 | 1.7% | 1.1% | 1.4% | [0](errors/cold-execution/base/ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 443.0 MiB |

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

Cold execution eligible roster: 3/9. Scopes with absent, stale, incompatible, inconclusive or interference-observed implementation evidence fail closed. Roster SHA-256: `d64f3ff48f144328253e36e39c0774e28bfb01fcfd5031e3ce0035528e3da139`.

## Execution ranking

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 4,088,308 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,088,308 | 4,043,670 | 3.1% | 6.1% | 3,638,451 to 4,355,196 | 100% | 0 | 339.5 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 2,946,571 | 2,915,575 | 9.0% | 10.9% | 2,498,325 to 3,321,873 | 72.1% | 0 | 278.0 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 593,141 | 592,187 | 3.9% | 6.8% | 527,655 to 642,593 | 14.5% | 0 | 313.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 94,588 | 94,976 | 2.7% | 3.4% | 91,426 to 100,069 | 2.3% | 0 | 310.2 MiB |

Excluded from this ranking:

- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 6,850 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 6,850 | 6,832 | 3.1% | 3.4% | 6,501 to 7,094 | 100% | 0 | 284.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,688 | 3,592 | 2.8% | 7.1% | 3,143 to 3,853 | 53.8% | 0 | 289.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 114 | 113 | 1.6% | 3.1% | 107 to 117 | 1.7% | 0 | 443.0 MiB |

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

Cold execution eligible roster: 3/9. Scopes with absent, stale, incompatible, inconclusive or interference-observed implementation evidence fail closed. Roster SHA-256: `d64f3ff48f144328253e36e39c0774e28bfb01fcfd5031e3ce0035528e3da139`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 14,000,467 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 14,000,467 | 13,901,032 | 4.7% | 6.1% | 12,565,818 to 14,858,831 | 100% | 0 | 292.4 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,453,081 | 4,346,064 | 2.8% | 6.9% | 3,810,847 to 4,602,611 | 31.8% | 0 | 310.0 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,854,397 | 1,849,617 | 3.4% | 5.0% | 1,710,501 to 1,964,681 | 13.2% | 0 | 309.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 103,968 | 104,861 | 3.4% | 4.3% | 100,351 to 111,487 | 0.7% | 0 | 287.8 MiB |

Excluded from this ranking:

- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 10,117 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 10,117 | 10,091 | 5.2% | 6.2% | 9,309 to 10,768 | 100% | 0 | 278.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,868 | 3,996 | 5.6% | 10.3% | 3,647 to 4,633 | 38.2% | 0 | 288.4 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 115 | 115 | 3.5% | 4.6% | 108 to 122 | 1.1% | 0 | 437.9 MiB |

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

Each row binds automatically observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. Cold isolation uses independent clean-process controls A-A, B-B, A-B-A and B-A-B. The controls separate self-instability from cross-instance interference and fail closed when a control throws, cannot establish its canary or lacks complete instrumentation readiness.

| Validator | API | Cold isolation | Dynamic code | Weekly downloads |
| --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | interference-not-observed | observed | 366,039,890 |
| [djv](https://www.npmjs.com/package/djv) (2.1.4) | reusable-sync | interference-not-observed | observed | 65,678 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | interference-observed | limited | 255,244 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | interference-not-observed | limited | 532,097 |
| [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | validate-only | interference-not-observed | limited | 6,186,992 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | reusable-sync | interference-not-observed | observed | 8,304,494 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | reusable-sync | interference-not-observed | limited | 279 |
| [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | reusable-sync | interference-not-observed | observed | 4,851,948 |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | reusable-sync | interference-not-observed | limited | 3,261,931 |

- `reusable-sync`: prepares a reusable callable synchronously.
- `reusable-async`: resolves asynchronous setup before exposing a reusable callable.
- `validate-only`: exposes validation through the adapter without a separate reusable setup target.
- `interference-not-observed`: both self-controls stayed stable and neither cross-order control changed the first instance.
- `interference-observed`: A-B-A or B-A-B changed the first instance while A-A and B-B stayed stable, so Cold execution is `N/A`.
- `self-instability-observed`: A-A or B-B changed without a cross-provider claim, so Cold execution fails closed for that scope.
- `inconclusive`: a canary failed or a control threw, so Cold execution fails closed for that scope.
- `observed`: at least one dependency mechanism successfully generated dynamic code on the exercised route.
- `not-observed`: every required mechanism and phase was ready and no dependency mechanism succeeded.
- `limited`: every required process and phase confirmed readiness, but transparent instrumentation has a known observation limit. `limited` cannot replace unavailable or missing readiness.

Dynamic code describes only the instrumented adapter import, setup, validation and isolation phases at the pinned version. API, A-A, B-B, A-B-A and B-A-B publish independent process identities, PIDs and per-phase readiness. One unavailable, contradictory or missing required process makes the scope inconclusive and Cold fails closed. The evidence separates attempted, succeeded and failed generation where each outcome is observable for eval, Function, AsyncFunction, GeneratorFunction, AsyncGeneratorFunction, node:vm, WebAssembly, workers, inline Node subprocesses, data imports and controlled-child propagation. Worker and fork execArgv values preserve caller flags while forcing one preload. Spawn, execFile and shell exec routes cover their sync and async forms. Inspector observation preserves lexical direct eval semantics, but it cannot transparently distinguish direct from indirect eval or confirm completion of an eval body. Loader hooks observe a data URL request while inspector confirms parsed scripts, but they cannot confirm every parse or evaluation failure. Eval and data imports therefore report capability limits instead of simulated coverage. The event log stores outcomes, provenance and attribution, never generated source text.

## Limitations

Format behavior, runtime state, hardware, power state, and operating-system load affect results. Setup N/A identifies a validate-only API or unavailable setup measurement. Cold execution N/A identifies an adapter whose state cannot be isolated under the direct measurement contract.
