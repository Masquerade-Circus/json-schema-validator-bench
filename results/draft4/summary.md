# draft4 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,283 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 250.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 3,223 | 98.2% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 242.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,851 | 86.8% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 186.1 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 186 | 5.7% | [0](errors/setup/redocly-ajv-COMPILE.md) | 0 | 280.6 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 186 | 5.7% | [0](errors/setup/ajv-COMPILE.md) | 0 | 274.9 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — Balanced score 83.9%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 2,915,826 | 13,899,842 | 70.4% | 100% | 83.9% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 187.7 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,140,315 | 3,813,731 | 100% | 27.4% | 52.4% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 270.3 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 3,598,676 | 3,878,713 | 86.9% | 27.9% | 49.2% | [0](errors/execution/base/redocly-ajv-RUNTIME.md) | [0](errors/execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 270.0 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 521,348 | 1,812,190 | 12.6% | 13.0% | 12.8% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 189.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 90,789 | 94,240 | 2.2% | 0.7% | 1.2% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 187.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,759 | 4,473 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 275.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,655 | 3,116 | 70.6% | 69.7% | 70.2% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 230.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 210 | 207 | 5.6% | 4.6% | 5.1% | [0](errors/cold-execution/base/ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 299.7 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 209 | 207 | 5.6% | 4.6% | 5.1% | [0](errors/cold-execution/base/redocly-ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 307.7 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

Setup eligible roster: 5/9. Draft intersection: 903 represented cases and 183 deduplicated effective operations. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

# Profile: base

Execution eligible roster: 5/9. Intersection: 699 cases and 182 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 4,140,315 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,140,315 | 4,295,175 | 9.4% | 13.7% | 3,530,900 to 5,014,623 | 100% | 0 | 270.3 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 3,598,676 | 3,571,615 | 8.3% | 10.2% | 3,123,111 to 3,996,841 | 86.9% | 0 | 270.0 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 2,915,826 | 2,917,230 | 4.2% | 6.0% | 2,707,236 to 3,193,343 | 70.4% | 0 | 187.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 521,348 | 526,286 | 3.2% | 8.5% | 460,977 to 597,994 | 12.6% | 0 | 189.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 90,789 | 90,256 | 1.4% | 3.6% | 84,968 to 94,601 | 2.2% | 0 | 187.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 3,759 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,759 | 3,609 | 3.7% | 11.6% | 2,794 to 3,915 | 100% | 0 | 275.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,655 | 2,646 | 2.0% | 4.1% | 2,493 to 2,817 | 70.6% | 0 | 230.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 210 | 210 | 2.5% | 3.1% | 203 to 220 | 5.6% | 0 | 299.7 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 209 | 214 | 5.1% | 7.9% | 197 to 238 | 5.6% | 0 | 307.7 MiB |

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
| draft4 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 708 | 10 | 0 | 0 | 0 |
| draft4 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 706 | 6 | 6 | 0 | 0 |
| draft4 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 708 | 10 | 0 | 0 | 0 |
| draft4 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 717 | 1 | 0 | 0 | 0 |
| draft4 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 710 | 2 | 0 | 6 | 0 |
| draft4 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 708 | 2 | 0 | 8 | 0 |
| draft4 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 713 | 1 | 4 | 0 | 0 |
| draft4 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 716 | 2 | 0 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 5/9. Intersection: 204 cases and 7 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 13,899,842 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 13,899,842 | 13,594,974 | 3.5% | 7.3% | 11,793,830 to 14,542,472 | 100% | 0 | 179.7 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 3,878,713 | 3,886,811 | 2.5% | 3.2% | 3,734,326 to 4,077,019 | 27.9% | 0 | 177.5 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 3,813,731 | 3,793,039 | 1.0% | 2.8% | 3,610,407 to 3,928,798 | 27.4% | 0 | 177.8 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,812,190 | 1,831,813 | 3.1% | 4.5% | 1,722,138 to 1,939,862 | 13.0% | 0 | 183.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 94,240 | 94,863 | 3.3% | 5.5% | 86,917 to 101,888 | 0.7% | 0 | 180.8 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 4,473 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 4,473 | 4,448 | 2.3% | 3.6% | 4,278 to 4,705 | 100% | 0 | 260.7 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,116 | 3,116 | 2.1% | 3.7% | 2,931 to 3,252 | 69.7% | 0 | 220.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 207 | 203 | 3.4% | 7.0% | 177 to 214 | 4.6% | 0 | 274.1 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 207 | 203 | 4.2% | 6.5% | 184 to 220 | 4.6% | 0 | 278.5 MiB |

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
| draft4 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 206 | 0 | 0 | 0 | 0 |
| draft4 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 117 | 89 | 0 | 0 | 0 |
| draft4 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 183 | 23 | 0 | 0 | 0 |
| draft4 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 196 | 3 | 7 | 0 | 0 |
| draft4 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 206 | 0 | 0 | 0 | 0 |

## npm snapshot

Period: 2026-07-20 through 2026-07-26. Retrieved at 2026-07-31T05:01:12.902Z.

Each row binds observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. `module-global-unavailable` means Cold execution is N/A because a fresh adapter wrapper cannot isolate provider state.

| Validator | API | Cold isolation | Dynamic code | Weekly downloads |
| --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | fresh-instance | observed | 351,242,149 |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | reusable-sync | fresh-instance | not-observed | 5,891,999 |
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
