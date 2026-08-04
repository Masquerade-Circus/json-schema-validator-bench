# draft4 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 2,441 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 182.5 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,183 | 89.4% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 187.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,839 | 75.4% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 184.4 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 118 | 4.8% | [0](errors/setup/ajv-COMPILE.md) | 0 | 272.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 114 | 4.7% | [0](errors/setup/redocly-ajv-COMPILE.md) | 0 | 282.1 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 88.7%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 1,263,808 | 8,898,854 | 78.7% | 100% | 88.7% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 182.8 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 1,605,222 | 2,862,994 | 100% | 32.2% | 56.7% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 262.9 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 1,195,030 | 2,303,353 | 74.4% | 25.9% | 43.9% | [0](errors/execution/base/redocly-ajv-RUNTIME.md) | [0](errors/execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 268.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 283,154 | 1,195,071 | 17.6% | 13.4% | 15.4% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 183.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 56,859 | 56,640 | 3.5% | 0.6% | 1.5% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 183.8 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 4,423 | 6,893 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 187.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,546 | 2,894 | 57.6% | 42.0% | 49.2% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 182.5 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 151 | 151 | 3.4% | 2.2% | 2.7% | [0](errors/cold-execution/base/ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 314.3 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 127 | 128 | 2.9% | 1.9% | 2.3% | [0](errors/cold-execution/base/redocly-ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 293.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

Setup eligible roster: 5/9. Draft intersection: 907 represented cases and 183 deduplicated effective operations. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

# Profile: base

Execution eligible roster: 5/9. Intersection: 703 cases and 182 setup entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 1,605,222 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 1,605,222 | 1,497,547 | 12.7% | 34.2% | 572,495 to 2,080,247 | 100% | 0 | 262.9 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 1,263,808 | 1,215,703 | 9.7% | 27.9% | 569,965 to 1,517,268 | 78.7% | 0 | 182.8 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 1,195,030 | 1,278,168 | 2.6% | 12.1% | 1,138,581 to 1,476,731 | 74.4% | 0 | 268.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 283,154 | 291,608 | 9.5% | 13.5% | 249,756 to 356,835 | 17.6% | 0 | 183.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 56,859 | 59,281 | 10.3% | 21.0% | 41,704 to 78,667 | 3.5% | 0 | 183.8 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 4,423 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 4,423 | 4,003 | 2.2% | 23.5% | 2,128 to 4,551 | 100% | 0 | 187.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,546 | 2,466 | 7.7% | 11.9% | 2,044 to 2,786 | 57.6% | 0 | 181.6 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 151 | 145 | 2.2% | 9.4% | 122 to 155 | 3.4% | 0 | 314.3 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 127 | 126 | 5.0% | 6.0% | 115 to 134 | 2.9% | 0 | 293.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft4 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 706 | 8 | 0 | 4 | 0 |
| draft4 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 712 | 6 | 0 | 0 | 0 |
| draft4 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 706 | 6 | 6 | 0 | 0 |
| draft4 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 712 | 6 | 0 | 0 | 0 |
| draft4 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 717 | 1 | 0 | 0 | 0 |
| draft4 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 710 | 2 | 0 | 6 | 0 |
| draft4 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 708 | 2 | 0 | 8 | 0 |
| draft4 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 713 | 1 | 4 | 0 | 0 |
| draft4 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 716 | 2 | 0 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 5/9. Intersection: 204 cases and 7 setup entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 8,898,854 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 8,898,854 | 8,633,984 | 9.5% | 14.4% | 6,914,528 to 10,375,057 | 100% | 0 | 177.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 2,862,994 | 2,700,907 | 7.5% | 16.1% | 2,097,983 to 3,095,608 | 32.2% | 0 | 176.3 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 2,303,353 | 2,270,173 | 8.2% | 12.1% | 1,840,259 to 2,608,736 | 25.9% | 0 | 174.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,195,071 | 1,181,349 | 8.1% | 13.2% | 911,843 to 1,331,696 | 13.4% | 0 | 178.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 56,640 | 57,643 | 5.5% | 7.5% | 53,408 to 63,566 | 0.6% | 0 | 178.0 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 6,893 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 6,893 | 6,580 | 5.3% | 12.2% | 5,488 to 7,486 | 100% | 0 | 184.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,894 | 2,791 | 4.2% | 9.8% | 2,345 to 3,019 | 42.0% | 0 | 182.5 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 151 | 151 | 1.7% | 2.4% | 145 to 154 | 2.2% | 0 | 198.5 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 128 | 128 | 3.3% | 5.1% | 121 to 138 | 1.9% | 0 | 270.8 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft4 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 201 | 5 | 0 | 0 | 0 |
| draft4 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 204 | 2 | 0 | 0 | 0 |
| draft4 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 206 | 0 | 0 | 0 | 0 |
| draft4 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 204 | 2 | 0 | 0 | 0 |
| draft4 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 206 | 0 | 0 | 0 | 0 |
| draft4 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 117 | 89 | 0 | 0 | 0 |
| draft4 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 183 | 23 | 0 | 0 | 0 |
| draft4 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 196 | 3 | 7 | 0 | 0 |
| draft4 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 206 | 0 | 0 | 0 | 0 |

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
