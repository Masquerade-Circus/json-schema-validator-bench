# draft6 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,387 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 253.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,972 | 87.7% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 223.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,900 | 85.6% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 188.1 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 113 | 3.3% | [3](errors/setup/redocly-ajv-COMPILE.md) | 0 | 302.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 106 | 3.1% | [3](errors/setup/ajv-COMPILE.md) | 0 | 296.8 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — Balanced score 82.5%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 2,926,674 | 13,936,699 | 68.0% | 100% | 82.5% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 187.8 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,302,008 | 4,280,907 | 100% | 30.7% | 55.4% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 297.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 3,817,630 | 4,284,964 | 88.7% | 30.7% | 52.2% | [0](errors/execution/base/redocly-ajv-RUNTIME.md) | [0](errors/execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 307.3 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 534,760 | 1,824,976 | 12.4% | 13.1% | 12.8% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 191.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 91,384 | 104,613 | 2.1% | 0.8% | 1.3% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 191.0 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,675 | 4,196 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 283.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,552 | 3,163 | 69.4% | 75.4% | 72.3% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 265.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 116 | 122 | 3.1% | 2.9% | 3.0% | [0](errors/cold-execution/base/redocly-ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 425.4 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 105 | 111 | 2.8% | 2.6% | 2.7% | [0](errors/cold-execution/base/ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 413.8 MiB |

Excluded from this ranking:

- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

Setup eligible roster: 5/9. Draft intersection: 1194 represented cases and 251 deduplicated effective operations. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

# Profile: base

Execution eligible roster: 5/9. Intersection: 923 cases and 250 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 4,302,008 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,302,008 | 4,303,195 | 2.4% | 3.1% | 4,156,072 to 4,496,339 | 100% | 0 | 297.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 3,817,630 | 3,806,139 | 1.5% | 2.5% | 3,650,699 to 3,926,012 | 88.7% | 0 | 307.3 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 2,926,674 | 2,920,780 | 2.0% | 5.0% | 2,680,259 to 3,117,966 | 68.0% | 0 | 187.8 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 534,760 | 525,363 | 2.8% | 5.7% | 471,374 to 554,742 | 12.4% | 0 | 191.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 91,384 | 91,395 | 1.9% | 3.1% | 86,676 to 94,240 | 2.1% | 0 | 191.0 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 3,675 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,675 | 3,723 | 5.7% | 8.3% | 3,249 to 4,091 | 100% | 0 | 283.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,552 | 2,576 | 3.7% | 4.8% | 2,406 to 2,734 | 69.4% | 0 | 265.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 116 | 116 | 1.5% | 2.2% | 112 to 120 | 3.1% | 0 | 425.4 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 105 | 104 | 4.4% | 4.6% | 99 to 111 | 2.8% | 0 | 413.8 MiB |

Excluded from this ranking:

- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft6 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 933 | 9 | 3 | 0 | 0 |
| draft6 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 931 | 8 | 6 | 0 | 0 |
| draft6 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 933 | 9 | 3 | 0 | 0 |
| draft6 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 945 | 0 | 0 | 0 | 0 |
| draft6 | [djv](https://www.npmjs.com/package/djv) (2.1.4) | 807 | 98 | 15 | 25 | 0 |
| draft6 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 938 | 1 | 0 | 6 | 0 |
| draft6 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 922 | 1 | 0 | 22 | 0 |
| draft6 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 941 | 0 | 4 | 0 | 0 |
| draft6 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 944 | 1 | 0 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 5/9. Intersection: 271 cases and 10 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 13,936,699 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 13,936,699 | 13,972,124 | 1.6% | 2.9% | 13,392,570 to 14,566,327 | 100% | 0 | 180.9 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 4,284,964 | 4,250,508 | 3.8% | 5.0% | 3,926,461 to 4,506,910 | 30.7% | 0 | 182.6 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,280,907 | 4,223,559 | 0.7% | 3.5% | 3,925,029 to 4,320,987 | 30.7% | 0 | 181.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,824,976 | 1,823,423 | 0.9% | 2.6% | 1,763,030 to 1,903,810 | 13.1% | 0 | 186.1 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 104,613 | 104,862 | 1.3% | 1.8% | 102,590 to 107,642 | 0.8% | 0 | 185.5 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 4,196 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 4,196 | 4,108 | 1.0% | 7.1% | 3,516 to 4,286 | 100% | 0 | 260.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,163 | 3,091 | 1.7% | 6.1% | 2,726 to 3,236 | 75.4% | 0 | 225.8 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 122 | 120 | 3.3% | 5.3% | 110 to 128 | 2.9% | 0 | 303.0 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 111 | 111 | 1.0% | 1.7% | 109 to 114 | 2.6% | 0 | 294.7 MiB |

Excluded from this ranking:

- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
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
| draft6 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 273 | 0 | 0 | 0 | 0 |
| draft6 | [djv](https://www.npmjs.com/package/djv) (2.1.4) | 217 | 54 | 0 | 2 | 0 |
| draft6 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 179 | 94 | 0 | 0 | 0 |
| draft6 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 248 | 25 | 0 | 0 | 0 |
| draft6 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 263 | 3 | 7 | 0 | 0 |
| draft6 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 273 | 0 | 0 | 0 | 0 |

## npm snapshot

Period: 2026-07-20 through 2026-07-26. Retrieved at 2026-07-31T05:01:12.902Z.

Each row binds observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. `module-global-unavailable` means Cold execution is N/A because a fresh adapter wrapper cannot isolate provider state.

| Validator | API | Cold isolation | Dynamic code | Weekly downloads |
| --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | fresh-instance | observed | 351,242,149 |
| [djv](https://www.npmjs.com/package/djv) (2.1.4) | reusable-sync | fresh-instance | observed | 81,251 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | module-global-unavailable | not-observed | 247,240 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | fresh-instance | not-observed | 513,747 |
| [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | validate-only | fresh-instance | not-observed | 6,227,344 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | reusable-sync | fresh-instance | observed | 7,551,204 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | reusable-sync | fresh-instance | not-observed | 261 |
| [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | reusable-sync | fresh-instance | observed | 4,742,721 |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | reusable-sync | fresh-instance | not-observed | 3,436,312 |

- `reusable-sync`: prepares a reusable callable synchronously.
- `reusable-async`: resolves asynchronous setup before exposing a reusable callable.
- `validate-only`: exposes validation through the adapter without a separate reusable compile result.
- `fresh-instance`: each fresh adapter creates isolated provider state.
- `module-global-unavailable`: module-global provider state cannot satisfy the fresh-isolation contract, so Cold execution is `N/A`.
- `observed`: the exercised adapter route uses dynamic code generation.
- `not-observed`: the exercised adapter route did not use dynamic code generation.

Dynamic code describes the route exercised by the adapter at the pinned version, not every path available in the package.

## Limitations

Format behavior, runtime state, hardware, power state, and operating-system load affect results. Setup N/A identifies a validate-only API or unavailable setup measurement. Cold execution N/A identifies an adapter whose state cannot be isolated under the direct measurement contract.
