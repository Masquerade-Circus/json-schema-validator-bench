# draft6 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 3,204 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 208.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,605 | 81.3% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 219.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,325 | 72.6% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 184.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 85 | 2.7% | [3](errors/setup/ajv-COMPILE.md) | 0 | 327.5 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 74 | 2.3% | [3](errors/setup/redocly-ajv-COMPILE.md) | 0 | 307.8 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 892/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 96.6%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 2,584,224 | 15,385,854 | 93.3% | 100% | 96.6% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 189.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 2,770,133 | 4,861,689 | 100% | 31.6% | 56.2% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 300.3 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 2,595,918 | 4,220,412 | 93.7% | 27.4% | 50.7% | [0](errors/execution/base/redocly-ajv-RUNTIME.md) | [0](errors/execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 317.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 495,130 | 2,057,895 | 17.9% | 13.4% | 15.5% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 190.1 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 75,787 | 113,214 | 2.7% | 0.7% | 1.4% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 186.5 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 892/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 7,473 | 11,435 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 191.7 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,623 | 4,057 | 48.5% | 35.5% | 41.5% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 185.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 105 | 101 | 1.4% | 0.9% | 1.1% | [0](errors/cold-execution/base/ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 419.5 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 98 | 97 | 1.3% | 0.9% | 1.1% | [0](errors/cold-execution/base/redocly-ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 440.4 MiB |

Excluded from this ranking:

- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 892/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

Setup eligible roster: 5/9. Draft intersection: 1198 represented cases and 251 deduplicated effective operations. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

# Profile: base

Execution eligible roster: 5/9. Intersection: 927 cases and 250 setup entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 2,770,133 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 2,770,133 | 3,220,894 | 5.7% | 25.6% | 2,571,682 to 4,285,781 | 100% | 0 | 300.3 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 2,595,918 | 2,299,994 | 22.1% | 45.1% | 574,077 to 3,195,986 | 93.7% | 0 | 317.7 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 2,584,224 | 2,528,923 | 24.4% | 31.0% | 1,441,017 to 3,305,928 | 93.3% | 0 | 189.9 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 495,130 | 501,637 | 26.8% | 28.0% | 354,752 to 654,342 | 17.9% | 0 | 190.1 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 75,787 | 80,953 | 7.6% | 16.1% | 66,143 to 98,213 | 2.7% | 0 | 186.5 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 892/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 7,473 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 7,473 | 7,539 | 4.2% | 5.9% | 7,017 to 8,191 | 100% | 0 | 191.7 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,623 | 3,623 | 2.7% | 4.9% | 3,342 to 3,868 | 48.5% | 0 | 185.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 105 | 105 | 0.9% | 2.2% | 101 to 109 | 1.4% | 0 | 419.5 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 98 | 98 | 0.9% | 2.2% | 95 to 102 | 1.3% | 0 | 440.4 MiB |

Excluded from this ranking:

- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 892/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
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
| draft6 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 892 | 31 | 0 | 22 | 0 |
| draft6 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 941 | 0 | 4 | 0 | 0 |
| draft6 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 944 | 1 | 0 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 5/9. Intersection: 271 cases and 10 setup entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 15,385,854 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 15,385,854 | 15,164,091 | 0.9% | 3.1% | 14,474,970 to 15,577,589 | 100% | 0 | 178.8 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,861,689 | 4,804,230 | 1.6% | 3.8% | 4,448,191 to 4,939,588 | 31.6% | 0 | 178.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 4,220,412 | 4,203,696 | 0.6% | 2.6% | 3,997,185 to 4,324,561 | 27.4% | 0 | 182.1 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,057,895 | 2,042,131 | 1.2% | 3.7% | 1,895,332 to 2,101,257 | 13.4% | 0 | 182.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 113,214 | 112,692 | 1.3% | 5.2% | 103,151 to 121,322 | 0.7% | 0 | 182.8 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 892/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 11,435 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 11,435 | 11,410 | 2.7% | 4.1% | 10,679 to 11,960 | 100% | 0 | 183.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 4,057 | 4,054 | 2.5% | 4.6% | 3,752 to 4,284 | 35.5% | 0 | 183.3 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 101 | 104 | 5.6% | 8.4% | 91 to 114 | 0.9% | 0 | 323.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 97 | 99 | 2.8% | 5.3% | 94 to 106 | 0.9% | 0 | 300.1 MiB |

Excluded from this ranking:

- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 892/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
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
