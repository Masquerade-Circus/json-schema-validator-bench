# draft4 benchmark results

## Compile consolidation

Leader: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — 6,000 ops/s (100%)

| Validator | Base ops/s | Formats ops/s | Average ops/s | Score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 3,819 | 8,181 | 6,000 | 100% | [6](errors/compile/base/hyperjump-COMPILE.md) | [0](errors/compile/format-assertion/hyperjump-COMPILE.md) | 0 | 263.3 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,965 | 5,478 | 4,721 | 78.7% | [0](errors/compile/base/schema-shield-COMPILE.md) | [0](errors/compile/format-assertion/schema-shield-COMPILE.md) | 0 | 276.7 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,316 | 4,457 | 3,886 | 64.8% | [0](errors/compile/base/z-schema-COMPILE.md) | [0](errors/compile/format-assertion/z-schema-COMPILE.md) | 0 | 186.4 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 215 | 230 | 223 | 3.7% | [0](errors/compile/base/redocly-ajv-COMPILE.md) | [0](errors/compile/format-assertion/redocly-ajv-COMPILE.md) | 0 | 282.8 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 210 | 218 | 214 | 3.6% | [0](errors/compile/base/ajv-COMPILE.md) | [0](errors/compile/format-assertion/ajv-COMPILE.md) | 0 | 274.5 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 8,699,373 ops/s (100%)

| Validator | Base ops/s | Formats ops/s | Average ops/s | Score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,605,727 | 13,793,019 | 8,699,373 | 100% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 188.4 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 4,870,401 | 4,475,112 | 4,672,757 | 53.7% | [0](errors/execution/base/redocly-ajv-RUNTIME.md) | [0](errors/execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 280.4 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 5,063,481 | 3,902,085 | 4,482,783 | 51.5% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 268.0 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 636,226 | 1,985,145 | 1,310,685 | 15.1% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 193.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 106,610 | 113,883 | 110,247 | 1.3% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 188.2 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

# Profile: base

Compile eligible roster: 5/9. Intersection: 699 cases and 182 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Execution eligible roster: 5/9. Intersection: 699 cases and 182 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

## Compile ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 3,965 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,973 | 3,956 | 3,956 to 3,973 | 3,965 | 100% | 0 | 276.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 3,815 | 3,824 | 3,815 to 3,824 | 3,819 | 96.3% | 0 | 263.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,215 | 3,416 | 3,215 to 3,416 | 3,316 | 83.6% | 0 | 186.4 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 218 | 213 | 213 to 218 | 215 | 5.4% | 0 | 282.8 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 211 | 209 | 209 to 211 | 210 | 5.3% | 0 | 274.5 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Execution ranking

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 5,063,481 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 5,337,320 | 4,789,641 | 4,789,641 to 5,337,320 | 5,063,481 | 100% | 0 | 268.0 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 4,795,656 | 4,945,146 | 4,795,656 to 4,945,146 | 4,870,401 | 96.2% | 0 | 280.4 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,579,269 | 3,632,184 | 3,579,269 to 3,632,184 | 3,605,727 | 71.2% | 0 | 188.4 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 652,693 | 619,758 | 619,758 to 652,693 | 636,226 | 12.6% | 0 | 193.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 105,894 | 107,326 | 105,894 to 107,326 | 106,610 | 2.1% | 0 | 188.2 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
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

Compile eligible roster: 5/9. Intersection: 204 cases and 7 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Execution eligible roster: 5/9. Intersection: 204 cases and 7 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

## Compile ranking

Leader: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — 8,181 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 8,221 | 8,140 | 8,140 to 8,221 | 8,181 | 100% | 0 | 229.8 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 5,441 | 5,514 | 5,441 to 5,514 | 5,478 | 67.0% | 0 | 258.7 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 4,497 | 4,417 | 4,417 to 4,497 | 4,457 | 54.5% | 0 | 170.6 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 233 | 227 | 227 to 233 | 230 | 2.8% | 0 | 194.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 220 | 216 | 216 to 220 | 218 | 2.7% | 0 | 187.3 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 13,793,019 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 13,946,950 | 13,639,088 | 13,639,088 to 13,946,950 | 13,793,019 | 100% | 0 | 178.7 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 4,769,649 | 4,180,576 | 4,180,576 to 4,769,649 | 4,475,112 | 32.4% | 0 | 177.8 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 3,897,396 | 3,906,774 | 3,897,396 to 3,906,774 | 3,902,085 | 28.3% | 0 | 175.8 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,988,679 | 1,981,610 | 1,981,610 to 1,988,679 | 1,985,145 | 14.4% | 0 | 183.2 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 112,966 | 114,801 | 112,966 to 114,801 | 113,883 | 0.8% | 0 | 183.1 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
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

Weekly downloads show npm adoption volume for the snapshot period.

| Validator | Weekly downloads |
| --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 351,242,149 |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 5,891,999 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 247,240 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 513,747 |
| [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 6,227,344 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 7,551,204 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 261 |
| [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 4,742,721 |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,436,312 |

## Limitations

Format behavior, runtime state, hardware, power state, and operating-system load affect results. Compile N/A identifies a validate-only API or an unavailable compile measurement.
