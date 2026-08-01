# draft6 benchmark results

## Compile consolidation

Leader: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — 5,796 ops/s (100%)

| Validator | Base ops/s | Formats ops/s | Average ops/s | Score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 3,558 | 8,033 | 5,796 | 100% | [6](errors/compile/base/hyperjump-COMPILE.md) | [0](errors/compile/format-assertion/hyperjump-COMPILE.md) | 0 | 271.3 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,726 | 5,549 | 4,638 | 80.0% | [0](errors/compile/base/schema-shield-COMPILE.md) | [0](errors/compile/format-assertion/schema-shield-COMPILE.md) | 0 | 268.7 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,387 | 4,209 | 3,798 | 65.5% | [0](errors/compile/base/z-schema-COMPILE.md) | [0](errors/compile/format-assertion/z-schema-COMPILE.md) | 0 | 188.7 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 129 | 116 | 122 | 2.1% | [3](errors/compile/base/redocly-ajv-COMPILE.md) | [0](errors/compile/format-assertion/redocly-ajv-COMPILE.md) | 0 | 298.7 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 116 | 101 | 108 | 1.9% | [3](errors/compile/base/ajv-COMPILE.md) | [0](errors/compile/format-assertion/ajv-COMPILE.md) | 0 | 293.3 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 8,693,197 ops/s (100%)

| Validator | Base ops/s | Formats ops/s | Average ops/s | Score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,569,221 | 13,817,174 | 8,693,197 | 100% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 190.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 5,139,668 | 4,972,764 | 5,056,216 | 58.2% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 300.5 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 4,433,661 | 4,935,008 | 4,684,335 | 53.9% | [0](errors/execution/base/redocly-ajv-RUNTIME.md) | [0](errors/execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 311.3 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 670,116 | 2,100,864 | 1,385,490 | 15.9% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 193.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 102,575 | 121,714 | 112,145 | 1.3% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 192.0 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

# Profile: base

Compile eligible roster: 5/9. Intersection: 923 cases and 250 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Execution eligible roster: 5/9. Intersection: 923 cases and 250 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

## Compile ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 3,726 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,749 | 3,703 | 3,703 to 3,749 | 3,726 | 100% | 0 | 268.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 3,643 | 3,472 | 3,472 to 3,643 | 3,558 | 95.5% | 0 | 271.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,413 | 3,362 | 3,362 to 3,413 | 3,387 | 90.9% | 0 | 188.7 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 130 | 127 | 127 to 130 | 129 | 3.5% | 0 | 298.7 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 120 | 111 | 111 to 120 | 116 | 3.1% | 0 | 293.3 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Execution ranking

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 5,139,668 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,974,385 | 5,304,951 | 4,974,385 to 5,304,951 | 5,139,668 | 100% | 0 | 300.5 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 4,271,799 | 4,595,523 | 4,271,799 to 4,595,523 | 4,433,661 | 86.3% | 0 | 311.3 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,663,267 | 3,475,174 | 3,475,174 to 3,663,267 | 3,569,221 | 69.4% | 0 | 190.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 685,734 | 654,498 | 654,498 to 685,734 | 670,116 | 13.0% | 0 | 193.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 102,367 | 102,783 | 102,367 to 102,783 | 102,575 | 2.0% | 0 | 192.0 MiB |

Excluded from this ranking:

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

Compile eligible roster: 5/9. Intersection: 271 cases and 10 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

Execution eligible roster: 5/9. Intersection: 271 cases and 10 compile entries. Roster SHA-256: `09e3a45b0fd3b8ead7b3f5a940d9236b97d6df40c34ab217add257429616b3d4`.

## Compile ranking

Leader: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — 8,033 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 7,830 | 8,237 | 7,830 to 8,237 | 8,033 | 100% | 0 | 232.3 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 5,513 | 5,585 | 5,513 to 5,585 | 5,549 | 69.1% | 0 | 261.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 4,211 | 4,207 | 4,207 to 4,211 | 4,209 | 52.4% | 0 | 173.4 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 110 | 122 | 110 to 122 | 116 | 1.4% | 0 | 195.6 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 103 | 100 | 100 to 103 | 101 | 1.3% | 0 | 195.0 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 13,817,174 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 13,971,923 | 13,662,424 | 13,662,424 to 13,971,923 | 13,817,174 | 100% | 0 | 178.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 5,060,075 | 4,885,454 | 4,885,454 to 5,060,075 | 4,972,764 | 36.0% | 0 | 178.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 5,064,674 | 4,805,343 | 4,805,343 to 5,064,674 | 4,935,008 | 35.7% | 0 | 179.0 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,108,078 | 2,093,649 | 2,093,649 to 2,108,078 | 2,100,864 | 15.2% | 0 | 185.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 124,261 | 119,168 | 119,168 to 124,261 | 121,714 | 0.9% | 0 | 185.4 MiB |

Excluded from this ranking:

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

Weekly downloads show npm adoption volume for the snapshot period.

| Validator | Weekly downloads |
| --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 351,242,149 |
| [djv](https://www.npmjs.com/package/djv) (2.1.4) | 81,251 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 247,240 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 513,747 |
| [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 6,227,344 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 7,551,204 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 261 |
| [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 4,742,721 |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,436,312 |

## Limitations

Format behavior, runtime state, hardware, power state, and operating-system load affect results. Compile N/A identifies a validate-only API or an unavailable compile measurement.
