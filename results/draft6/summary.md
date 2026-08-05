# draft6 benchmark results

## Setup ranking

Leader: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 5,093 | 100% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 294.7 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 4,836 | 94.9% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 283.1 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,038 | 59.7% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 282.7 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 101 | 2.0% | [3](errors/setup/ajv-COMPILE.md) | 0 | 444.7 MiB |

Excluded from this ranking:

- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Balanced score 88.2%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 2,747,626 | 13,055,658 | 77.7% | 100% | 88.2% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 304.1 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 3,534,731 | 4,166,882 | 100% | 31.9% | 56.5% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 395.9 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 545,621 | 1,768,871 | 15.4% | 13.5% | 14.5% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 313.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 83,846 | 89,361 | 2.4% | 0.7% | 1.3% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 313.4 MiB |

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
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 6,576 | 9,284 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 283.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,535 | 3,782 | 53.7% | 40.7% | 46.8% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 292.3 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 105 | 110 | 1.6% | 1.2% | 1.4% | [0](errors/cold-execution/base/ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 450.2 MiB |

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

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 3,534,731 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 3,534,731 | 3,297,395 | 6.6% | 26.0% | 1,593,305 to 3,871,732 | 100% | 0 | 395.9 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 2,747,626 | 2,800,750 | 5.9% | 8.3% | 2,506,478 to 3,114,567 | 77.7% | 0 | 304.1 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 545,621 | 534,228 | 3.5% | 6.5% | 485,160 to 577,607 | 15.4% | 0 | 289.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 83,846 | 84,667 | 2.3% | 4.0% | 80,904 to 90,361 | 2.4% | 0 | 296.9 MiB |

Excluded from this ranking:

- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 6,576 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 6,576 | 6,557 | 0.8% | 1.4% | 6,401 to 6,638 | 100% | 0 | 283.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,535 | 3,479 | 3.6% | 6.0% | 3,143 to 3,696 | 53.7% | 0 | 292.3 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 105 | 104 | 1.6% | 4.3% | 96 to 109 | 1.6% | 0 | 450.2 MiB |

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

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 13,055,658 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 13,055,658 | 13,103,546 | 6.6% | 7.9% | 11,564,820 to 14,232,515 | 100% | 0 | 294.5 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,166,882 | 4,101,030 | 2.2% | 4.6% | 3,777,565 to 4,263,188 | 31.9% | 0 | 310.9 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,768,871 | 1,747,554 | 7.0% | 8.7% | 1,518,623 to 1,916,620 | 13.5% | 0 | 313.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 89,361 | 89,657 | 3.3% | 4.2% | 85,185 to 94,857 | 0.7% | 0 | 313.4 MiB |

Excluded from this ranking:

- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 923/945 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 9,284 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 9,284 | 9,316 | 2.3% | 6.5% | 8,360 to 10,205 | 100% | 0 | 278.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,782 | 3,796 | 2.0% | 4.5% | 3,573 to 4,088 | 40.7% | 0 | 289.0 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 110 | 110 | 1.4% | 2.6% | 105 to 112 | 1.2% | 0 | 367.7 MiB |

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

| Validator | API | Cold isolation | Dynamic code in implementation | Executed during benchmark | Weekly downloads |
| --- | --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | interference-not-observed | Yes | Yes | 366,039,890 |
| [djv](https://www.npmjs.com/package/djv) (2.1.4) | reusable-sync | interference-not-observed | Yes | Yes | 65,678 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | interference-observed | No | No | 255,244 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | interference-not-observed | No | No | 532,097 |
| [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | validate-only | interference-not-observed | No | No | 6,186,992 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | reusable-sync | interference-not-observed | Yes | Yes | 8,304,494 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | reusable-sync | interference-not-observed | No | No | 279 |
| [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | reusable-sync | interference-not-observed | Yes | Yes | 4,851,948 |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | reusable-sync | interference-not-observed | No | No | 3,261,931 |

- `reusable-sync`: prepares a reusable callable synchronously.
- `reusable-async`: resolves asynchronous setup before exposing a reusable callable.
- `validate-only`: exposes validation through the adapter without a separate reusable setup target.
- `interference-not-observed`: both self-controls stayed stable and neither cross-order control changed the first instance.
- `interference-observed`: A-B-A or B-A-B changed the first instance while A-A and B-B stayed stable, so Cold execution is `N/A`.
- `self-instability-observed`: A-A or B-B changed without a cross-provider claim, so Cold execution fails closed for that scope.
- `inconclusive`: a canary failed or a control threw, so Cold execution fails closed for that scope.
- `Dynamic code in implementation` is `Yes` when the installed primary package or an explicit companion contains a source finding. Otherwise it is `No`.
- `Executed during benchmark` is `Yes` when runtime instrumentation records at least one successful dependency mechanism on the exercised routes. Otherwise it is `No`.

The source scanner inspects every installed distributed file in each primary package and explicit companion, not only code reached by the benchmark. It parses supported JavaScript and TypeScript representations into an AST, resolves lexical and interfile bindings, converges the call graph to a fixed point and detects the supported dynamic-code sinks. Ownership and reachability remain attached to each finding. Transitive packages and benchmark adapters stay visible as separate owners and cannot elevate the family verdict.

Source presence and runtime execution answer different questions. Runtime capability and coverage details remain in `results/implementation-evidence.json`; they never change the source `Yes` or `No`. A source scanner error aborts capture as a runner error and must be fixed before publication. It never becomes a validator state.

#### Dynamic code evidence details

The detail uses stored scanner evidence. It never renders distributed source text or runtime payloads.

| Validator | Primary | Companions | Transitives (excluded) | Adapter (excluded) |
| --- | --- | --- | --- | --- |
| ajv | ajv (Yes) | ajv-draft-04, ajv-formats | fast-deep-equal, fast-uri, json-schema-traverse, require-from-string | json-schema-validator-bench |
| djv | djv (Yes) | None | @korzio/djv-draft-04 | json-schema-validator-bench |
| hyperjump | @hyperjump/json-schema (No) | @hyperjump/browser | @hyperjump/json-pointer, @hyperjump/json-schema-formats, @hyperjump/pact, @hyperjump/uri, content-type, idn-hostname, json-stringify-deterministic, just-curry-it, punycode, uuid | json-schema-validator-bench |
| json-schema-library | json-schema-library (No) | None | @hyperjump/json-schema-formats, @hyperjump/uri, @sagold/json-pointer, fast-copy, fast-deep-equal, idn-hostname, punycode, uri-js, valid-url | json-schema-validator-bench |
| jsonschema | jsonschema (No) | None | None | json-schema-validator-bench |
| redocly-ajv | @redocly/ajv (Yes) | ajv-formats | ajv, fast-deep-equal, fast-uri, json-schema-traverse, require-from-string | json-schema-validator-bench |
| schema-shield | schema-shield (No) | None | None | json-schema-validator-bench |
| schemasafe | @exodus/schemasafe (Yes) | None | None | json-schema-validator-bench |
| z-schema | z-schema (No) | None | commander, punycode, ret, safe-regex2, validator | json-schema-validator-bench |

| Validator | Owner | Package | Mechanism | Location | Reachability | Representation |
| --- | --- | --- | --- | --- | --- | --- |
| ajv | primary | ajv | function construct | dist/compile/index.js:89 | Reachable | source |
| ajv | primary | ajv | function construct | dist/compile/jtd/parse.js:50 | Not reachable | source |
| ajv | primary | ajv | function construct | dist/compile/jtd/serialize.js:50 | Not reachable | source |
| ajv | primary | ajv | function construct | lib/compile/index.ts:171 | Not reachable | source |
| ajv | primary | ajv | function construct | lib/compile/jtd/parse.ts:69 | Not reachable | source |
| ajv | primary | ajv | function construct | lib/compile/jtd/serialize.ts:65 | Not reachable | source |
| djv | primary | djv | function construct | djv.js:1 | Reachable | source |
| djv | primary | djv | function invoke | lib/djv.js:201 | Reachable | source |
| djv | primary | djv | function invoke | lib/utils/state.js:52 | Reachable | source |
| djv | primary | djv | function invoke | lib/utils/state.js:79 | Reachable | source |
| djv | primary | djv | function construct | lib/utils/template.js:143 | Reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | dist/compile/index.js:89 | Reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | dist/compile/jtd/parse.js:50 | Not reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | dist/compile/jtd/serialize.js:50 | Not reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | lib/compile/index.ts:175 | Not reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | lib/compile/jtd/parse.ts:71 | Not reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | lib/compile/jtd/serialize.ts:67 | Not reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/compile.js:176 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/compile.js:1357 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/compile.js:1372 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/generate-function.js:101 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/index.js:33 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/index.js:36 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/index.js:55 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/index.js:90 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/index.js:95 | Reachable | source |

## Limitations

Format behavior, runtime state, hardware, power state, and operating-system load affect results. Setup N/A identifies a validate-only API or unavailable setup measurement. Cold execution N/A identifies an adapter whose state cannot be isolated under the direct measurement contract.
