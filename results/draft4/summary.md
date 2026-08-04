# draft4 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 3,578 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 242.6 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,859 | 79.9% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 209.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,560 | 71.6% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 181.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 152 | 4.2% | [0](errors/setup/ajv-COMPILE.md) | 0 | 272.4 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 144 | 4.0% | [0](errors/setup/redocly-ajv-COMPILE.md) | 0 | 283.3 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 687/718 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 86.6%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 1,789,818 | 12,398,177 | 75.1% | 100% | 86.6% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 181.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 2,384,175 | 3,324,982 | 100% | 26.8% | 51.8% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 260.4 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 2,116,766 | 2,903,665 | 88.8% | 23.4% | 45.6% | [0](errors/execution/base/redocly-ajv-RUNTIME.md) | [0](errors/execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 270.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 412,293 | 1,594,737 | 17.3% | 12.9% | 14.9% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 187.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 74,294 | 76,828 | 3.1% | 0.6% | 1.4% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 186.0 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 687/718 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 6,767 | 10,511 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 186.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,522 | 3,817 | 52.0% | 36.3% | 43.5% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 185.8 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 218 | 221 | 3.2% | 2.1% | 2.6% | [0](errors/cold-execution/base/ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 313.1 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 189 | 189 | 2.8% | 1.8% | 2.2% | [0](errors/cold-execution/base/redocly-ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 290.7 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 687/718 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

Setup eligible roster: 5/9. Draft intersection: 907 represented cases and 183 deduplicated effective operations. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

# Profile: base

Execution eligible roster: 5/9. Intersection: 703 cases and 182 setup entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 2,384,175 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 2,384,175 | 2,419,950 | 2.1% | 6.7% | 2,255,028 to 2,724,133 | 100% | 0 | 260.4 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 2,116,766 | 2,023,631 | 11.3% | 17.3% | 1,585,993 to 2,430,707 | 88.8% | 0 | 270.2 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 1,789,818 | 1,677,100 | 9.6% | 20.0% | 1,130,218 to 1,991,899 | 75.1% | 0 | 181.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 412,293 | 415,675 | 6.3% | 11.3% | 352,667 to 490,968 | 17.3% | 0 | 187.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 74,294 | 75,330 | 4.5% | 6.2% | 69,982 to 82,767 | 3.1% | 0 | 186.0 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 687/718 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 6,767 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 6,767 | 6,769 | 1.0% | 1.5% | 6,628 to 6,896 | 100% | 0 | 186.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,522 | 3,550 | 1.4% | 2.7% | 3,471 to 3,707 | 52.0% | 0 | 185.8 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 218 | 217 | 0.3% | 1.4% | 211 to 219 | 3.2% | 0 | 313.1 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 189 | 188 | 0.7% | 3.1% | 178 to 195 | 2.8% | 0 | 290.7 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 687/718 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
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
| draft4 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 687 | 23 | 0 | 8 | 0 |
| draft4 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 713 | 1 | 4 | 0 | 0 |
| draft4 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 716 | 2 | 0 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 5/9. Intersection: 204 cases and 7 setup entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Cold execution eligible roster: 4/9. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `72be4390de4cd2a1ee4ec88d34bf6d3818982fe4ce72101448f052142d6d45e5`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 12,398,177 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 12,398,177 | 12,343,134 | 7.3% | 11.2% | 10,788,087 to 14,537,715 | 100% | 0 | 180.0 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 3,324,982 | 3,263,032 | 4.5% | 7.7% | 2,841,117 to 3,541,706 | 26.8% | 0 | 172.6 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 2,903,665 | 2,917,633 | 3.1% | 5.6% | 2,665,802 to 3,135,774 | 23.4% | 0 | 172.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,594,737 | 1,479,456 | 5.0% | 16.5% | 1,160,154 to 1,691,284 | 12.9% | 0 | 180.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 76,828 | 75,420 | 2.6% | 8.7% | 63,219 to 82,193 | 0.6% | 0 | 181.9 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 687/718 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 10,511 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 10,511 | 10,541 | 1.5% | 3.1% | 10,202 to 11,138 | 100% | 0 | 180.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,817 | 3,805 | 1.4% | 2.5% | 3,678 to 3,948 | 36.3% | 0 | 181.8 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 221 | 219 | 3.4% | 4.3% | 205 to 230 | 2.1% | 0 | 199.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 189 | 187 | 1.2% | 4.2% | 172 to 195 | 1.8% | 0 | 270.4 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 687/718 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
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
