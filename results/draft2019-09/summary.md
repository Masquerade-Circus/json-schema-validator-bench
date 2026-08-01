# draft2019-09 benchmark results

## Compile consolidation

Leader: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — 4,548 ops/s (100%)

| Validator | Base ops/s | Formats ops/s | Average ops/s | Score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,281 | 6,815 | 4,548 | 100% | [4](errors/compile/base/hyperjump-COMPILE.md) | [0](errors/compile/format-assertion/hyperjump-COMPILE.md) | 0 | 277.1 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 1,924 | 2,607 | 2,266 | 49.8% | [0](errors/compile/base/schema-shield-COMPILE.md) | [0](errors/compile/format-assertion/schema-shield-COMPILE.md) | 0 | 295.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,883 | 2,339 | 2,111 | 46.4% | [6](errors/compile/base/z-schema-COMPILE.md) | [0](errors/compile/format-assertion/z-schema-COMPILE.md) | 0 | 196.5 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 7,757,670 ops/s (100%)

| Validator | Base ops/s | Formats ops/s | Average ops/s | Score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 984,962 | 14,530,377 | 7,757,670 | 100% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 270.0 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 310,911 | 306,904 | 308,907 | 4.0% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 270.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 77,978 | 106,913 | 92,446 | 1.2% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 272.1 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

# Profile: base

Compile eligible roster: 3/8. Intersection: 1385 cases and 401 compile entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Execution eligible roster: 3/8. Intersection: 1385 cases and 401 compile entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

## Compile ranking

Leader: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — 2,281 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,248 | 2,315 | 2,248 to 2,315 | 2,281 | 100% | 0 | 277.1 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 1,938 | 1,909 | 1,909 to 1,938 | 1,924 | 84.3% | 0 | 295.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,898 | 1,867 | 1,867 to 1,898 | 1,883 | 82.5% | 0 | 196.5 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 984,962 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 1,034,945 | 934,979 | 934,979 to 1,034,945 | 984,962 | 100% | 0 | 270.0 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 308,486 | 313,335 | 308,486 to 313,335 | 310,911 | 31.6% | 0 | 270.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 77,683 | 78,273 | 77,683 to 78,273 | 77,978 | 7.9% | 0 | 272.1 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft2019-09 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 1397 | 9 | 5 | 6 | 0 |
| draft2019-09 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 1382 | 16 | 19 | 0 | 0 |
| draft2019-09 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1392 | 21 | 4 | 0 | 0 |
| draft2019-09 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 1382 | 16 | 19 | 0 | 0 |
| draft2019-09 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 1417 | 0 | 0 | 0 | 0 |
| draft2019-09 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 1411 | 2 | 0 | 4 | 0 |
| draft2019-09 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 1404 | 0 | 9 | 4 | 0 |
| draft2019-09 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1410 | 1 | 6 | 0 | 0 |

# Profile: format-assertion

Compile eligible roster: 3/8. Intersection: 649 cases and 20 compile entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Execution eligible roster: 3/8. Intersection: 649 cases and 20 compile entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

## Compile ranking

Leader: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — 6,815 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 6,774 | 6,857 | 6,774 to 6,857 | 6,815 | 100% | 0 | 242.5 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 2,693 | 2,522 | 2,522 to 2,693 | 2,607 | 38.3% | 0 | 262.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,313 | 2,366 | 2,313 to 2,366 | 2,339 | 34.3% | 0 | 189.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — 14,530,377 ops/s (100%)

Higher ops/s and a higher score are better. The score is each midpoint divided by the best midpoint in this scope, multiplied by 100. Rows are sorted by midpoint ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Round 1 ops/s | Round 2 ops/s | Range ops/s | Midpoint ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 13,873,912 | 15,186,842 | 13,873,912 to 15,186,842 | 14,530,377 | 100% | 0 | 184.4 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 306,152 | 307,656 | 306,152 to 307,656 | 306,904 | 2.1% | 0 | 207.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 104,972 | 108,854 | 104,972 to 108,854 | 106,913 | 0.7% | 0 | 188.5 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft2019-09 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 549 | 106 | 0 | 0 | 0 |
| draft2019-09 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 565 | 90 | 0 | 0 | 0 |
| draft2019-09 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 649 | 6 | 0 | 0 | 0 |
| draft2019-09 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 565 | 90 | 0 | 0 | 0 |
| draft2019-09 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 655 | 0 | 0 | 0 | 0 |
| draft2019-09 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 477 | 178 | 0 | 0 | 0 |
| draft2019-09 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 485 | 31 | 139 | 0 | 0 |
| draft2019-09 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 655 | 0 | 0 | 0 | 0 |

## npm snapshot

Period: 2026-07-20 through 2026-07-26. Retrieved at 2026-07-31T05:01:12.902Z.

Weekly downloads show npm adoption volume for the snapshot period.

| Validator | Weekly downloads |
| --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 351,242,149 |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 5,891,999 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 247,240 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 513,747 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 7,551,204 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 261 |
| [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 4,742,721 |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,436,312 |

## Limitations

Format behavior, runtime state, hardware, power state, and operating-system load affect results. Compile N/A identifies a validate-only API or an unavailable compile measurement.
