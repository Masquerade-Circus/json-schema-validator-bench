# draft2020-12 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 2,375 | 100% | [9](errors/setup/schema-shield-COMPILE.md) | 0 | 259.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,325 | 55.8% | [4](errors/setup/hyperjump-COMPILE.md) | 0 | 266.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,119 | 47.1% | [6](errors/setup/z-schema-COMPILE.md) | 0 | 195.3 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1395/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 879,102 | 12,859,661 | 100% | 100% | 100% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 207.6 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 234,331 | 274,859 | 26.7% | 2.1% | 7.5% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 265.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 61,330 | 95,072 | 7.0% | 0.7% | 2.3% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 271.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1395/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 4,593 | 10,242 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 271.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,763 | 1,977 | 38.4% | 19.3% | 27.2% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 201.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1395/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

Setup eligible roster: 3/8. Draft intersection: 2077 represented cases and 411 deduplicated effective operations. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

# Profile: base

Execution eligible roster: 3/8. Intersection: 1420 cases and 391 setup entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Cold execution eligible roster: 2/8. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 879,102 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 879,102 | 879,081 | 10.2% | 14.4% | 718,381 to 1,033,180 | 100% | 0 | 207.6 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 234,331 | 232,470 | 2.9% | 5.9% | 209,377 to 249,361 | 26.7% | 0 | 265.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 61,330 | 61,540 | 1.0% | 1.8% | 60,470 to 63,549 | 7.0% | 0 | 271.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1395/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 4,593 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 4,593 | 4,604 | 0.9% | 1.2% | 4,532 to 4,678 | 100% | 0 | 271.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,763 | 1,771 | 0.5% | 1.7% | 1,744 to 1,828 | 38.4% | 0 | 201.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1395/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft2020-12 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 1412 | 28 | 9 | 8 | 0 |
| draft2020-12 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 1393 | 32 | 24 | 8 | 0 |
| draft2020-12 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1432 | 21 | 4 | 0 | 0 |
| draft2020-12 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 1395 | 34 | 24 | 4 | 0 |
| draft2020-12 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 1452 | 0 | 5 | 0 | 0 |
| draft2020-12 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 1451 | 2 | 0 | 4 | 0 |
| draft2020-12 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 1443 | 1 | 9 | 4 | 0 |
| draft2020-12 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1450 | 1 | 6 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 3/8. Intersection: 657 cases and 20 setup entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Cold execution eligible roster: 2/8. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 12,859,661 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 12,859,661 | 12,888,176 | 2.5% | 4.5% | 12,083,294 to 13,775,768 | 100% | 0 | 185.3 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 274,859 | 274,227 | 0.8% | 2.2% | 264,214 to 282,044 | 2.1% | 0 | 208.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 95,072 | 95,674 | 0.9% | 2.2% | 93,919 to 99,763 | 0.7% | 0 | 191.2 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1395/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 10,242 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 10,242 | 10,309 | 5.2% | 6.8% | 9,291 to 11,145 | 100% | 0 | 192.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,977 | 1,961 | 3.8% | 4.7% | 1,855 to 2,069 | 19.3% | 0 | 192.0 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1395/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft2020-12 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 556 | 111 | 0 | 0 | 0 |
| draft2020-12 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 567 | 96 | 4 | 0 | 0 |
| draft2020-12 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 661 | 6 | 0 | 0 | 0 |
| draft2020-12 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 567 | 96 | 4 | 0 | 0 |
| draft2020-12 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 663 | 0 | 4 | 0 | 0 |
| draft2020-12 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 487 | 180 | 0 | 0 | 0 |
| draft2020-12 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 488 | 36 | 143 | 0 | 0 |
| draft2020-12 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 667 | 0 | 0 | 0 | 0 |

## npm snapshot

Period: 2026-07-27 through 2026-08-02. Retrieved at 2026-08-04T03:17:09.810Z.

Each row binds observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. `module-global-unavailable` means Cold execution is N/A because a fresh adapter wrapper cannot isolate provider state.

| Validator | API | Cold isolation | Dynamic code | Weekly downloads |
| --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | fresh-instance | observed | 366,039,890 |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | reusable-sync | fresh-instance | not-observed | 6,655,864 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | module-global-unavailable | not-observed | 255,244 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | fresh-instance | not-observed | 532,097 |
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
