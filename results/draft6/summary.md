# draft6 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 2,530 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 187.6 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,002 | 79.2% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 221.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,875 | 74.1% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 182.1 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 70 | 2.8% | [3](errors/setup/ajv-COMPILE.md) | 0 | 295.3 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 62 | 2.5% | [3](errors/setup/redocly-ajv-COMPILE.md) | 0 | 322.8 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 96.5%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 1,611,820 | 9,472,719 | 93.2% | 100% | 96.5% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 187.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 1,729,971 | 3,326,393 | 100% | 35.1% | 59.3% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 297.0 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 1,094,940 | 2,886,678 | 63.3% | 30.5% | 43.9% | [0](errors/execution/base/redocly-ajv-RUNTIME.md) | [0](errors/execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 316.9 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 316,710 | 1,357,501 | 18.3% | 14.3% | 16.2% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 189.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 61,253 | 73,175 | 3.5% | 0.8% | 1.7% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 186.1 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 4,505 | 6,599 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 189.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,511 | 2,906 | 55.8% | 44.0% | 49.6% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 185.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 78 | 74 | 1.7% | 1.1% | 1.4% | [0](errors/cold-execution/base/ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 415.4 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 70 | 70 | 1.6% | 1.1% | 1.3% | [0](errors/cold-execution/base/redocly-ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 438.7 MiB |

Excluded from this ranking:

- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

Setup eligible roster: 5/9. Draft intersection: 1198 represented cases and 251 deduplicated effective operations. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

# Profile: base

Execution eligible roster: 5/9. Intersection: 927 cases and 250 setup entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 1,729,971 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 1,729,971 | 1,794,354 | 10.3% | 15.3% | 1,412,027 to 2,187,007 | 100% | 0 | 297.0 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 1,611,820 | 1,579,028 | 3.6% | 10.6% | 1,255,618 to 1,716,410 | 93.2% | 0 | 187.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 1,094,940 | 1,092,600 | 7.9% | 19.2% | 733,819 to 1,363,094 | 63.3% | 0 | 316.9 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 316,710 | 319,360 | 5.7% | 10.7% | 273,393 to 374,346 | 18.3% | 0 | 189.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 61,253 | 60,980 | 2.4% | 3.5% | 58,379 to 64,264 | 3.5% | 0 | 186.1 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 4,505 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 4,505 | 4,558 | 2.8% | 4.3% | 4,327 to 4,818 | 100% | 0 | 189.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,511 | 2,512 | 3.4% | 3.9% | 2,367 to 2,624 | 55.8% | 0 | 185.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 78 | 77 | 1.6% | 3.0% | 74 to 80 | 1.7% | 0 | 415.4 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 70 | 70 | 1.6% | 3.5% | 65 to 72 | 1.6% | 0 | 438.7 MiB |

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
| draft6 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 937 | 5 | 3 | 0 | 0 |
| draft6 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 931 | 8 | 6 | 0 | 0 |
| draft6 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 937 | 5 | 3 | 0 | 0 |
| draft6 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 945 | 0 | 0 | 0 | 0 |
| draft6 | [djv](https://www.npmjs.com/package/djv) (2.1.4) | 807 | 98 | 15 | 25 | 0 |
| draft6 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 938 | 1 | 0 | 6 | 0 |
| draft6 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 922 | 1 | 0 | 22 | 0 |
| draft6 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 941 | 0 | 4 | 0 | 0 |
| draft6 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 944 | 1 | 0 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 5/9. Intersection: 271 cases and 10 setup entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 9,472,719 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 9,472,719 | 9,241,248 | 2.6% | 7.9% | 7,831,619 to 9,816,242 | 100% | 0 | 179.6 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 3,326,393 | 3,353,241 | 2.0% | 5.3% | 3,152,881 to 3,672,562 | 35.1% | 0 | 177.5 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 2,886,678 | 2,824,980 | 6.3% | 9.1% | 2,469,127 to 3,125,701 | 30.5% | 0 | 182.4 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,357,501 | 1,322,286 | 1.9% | 7.7% | 1,120,758 to 1,393,947 | 14.3% | 0 | 183.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 73,175 | 73,308 | 2.0% | 3.3% | 69,952 to 76,736 | 0.8% | 0 | 179.1 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 6,599 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 6,599 | 6,535 | 3.1% | 4.4% | 6,072 to 6,869 | 100% | 0 | 183.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,906 | 2,870 | 6.0% | 7.6% | 2,569 to 3,104 | 44.0% | 0 | 181.8 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 74 | 74 | 3.3% | 4.2% | 71 to 78 | 1.1% | 0 | 327.8 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 70 | 70 | 1.7% | 2.3% | 68 to 72 | 1.1% | 0 | 300.7 MiB |

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
| draft6 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 273 | 0 | 0 | 0 | 0 |
| draft6 | [djv](https://www.npmjs.com/package/djv) (2.1.4) | 217 | 54 | 0 | 2 | 0 |
| draft6 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 179 | 94 | 0 | 0 | 0 |
| draft6 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 248 | 25 | 0 | 0 | 0 |
| draft6 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 263 | 3 | 7 | 0 | 0 |
| draft6 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 273 | 0 | 0 | 0 | 0 |

## npm snapshot

Period: 2026-07-27 through 2026-08-02. Retrieved at 2026-08-04T03:17:09.810Z.

Each row binds observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. `module-global-unavailable` means Cold execution is N/A because a fresh adapter wrapper cannot isolate provider state.

| Validator | API | Cold isolation | Dynamic code | Weekly downloads |
| --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | fresh-instance | observed | 366,039,890 |
| [djv](https://www.npmjs.com/package/djv) (2.1.4) | reusable-sync | fresh-instance | observed | 65,678 |
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
