# draft2019-09 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 2,688 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 226.5 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,355 | 87.6% | [4](errors/setup/hyperjump-COMPILE.md) | 0 | 259.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,425 | 53.0% | [6](errors/setup/z-schema-COMPILE.md) | 0 | 196.2 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1359/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 862,681 | 11,372,682 | 100% | 100% | 100% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 230.9 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 248,868 | 265,991 | 28.8% | 2.3% | 8.2% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 264.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 63,908 | 89,138 | 7.4% | 0.8% | 2.4% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 269.7 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1359/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 4,487 | 10,021 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 272.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,136 | 2,364 | 47.6% | 23.6% | 33.5% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 200.9 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1359/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

Setup eligible roster: 3/8. Draft intersection: 2034 represented cases and 403 deduplicated effective operations. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

# Profile: base

Execution eligible roster: 3/8. Intersection: 1385 cases and 383 setup entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Cold execution eligible roster: 2/8. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 862,681 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 862,681 | 820,536 | 5.4% | 12.9% | 662,107 to 928,594 | 100% | 0 | 230.9 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 248,868 | 251,775 | 9.2% | 11.9% | 208,638 to 287,590 | 28.8% | 0 | 264.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 63,908 | 63,013 | 1.7% | 3.7% | 59,626 to 65,534 | 7.4% | 0 | 269.7 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1359/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 4,487 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 4,487 | 4,464 | 0.6% | 2.1% | 4,295 to 4,567 | 100% | 0 | 272.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,136 | 2,153 | 2.1% | 3.0% | 2,086 to 2,246 | 47.6% | 0 | 200.9 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1359/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft2019-09 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 1397 | 9 | 5 | 6 | 0 |
| draft2019-09 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 1386 | 12 | 19 | 0 | 0 |
| draft2019-09 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1392 | 21 | 4 | 0 | 0 |
| draft2019-09 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 1359 | 12 | 19 | 27 | 0 |
| draft2019-09 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 1417 | 0 | 0 | 0 | 0 |
| draft2019-09 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 1411 | 2 | 0 | 4 | 0 |
| draft2019-09 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 1404 | 0 | 9 | 4 | 0 |
| draft2019-09 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1410 | 1 | 6 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 3/8. Intersection: 649 cases and 20 setup entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Cold execution eligible roster: 2/8. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 11,372,682 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 11,372,682 | 11,622,928 | 1.8% | 5.3% | 11,152,868 to 12,747,562 | 100% | 0 | 182.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 265,991 | 267,360 | 3.2% | 3.7% | 256,896 to 280,163 | 2.3% | 0 | 206.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 89,138 | 88,931 | 3.5% | 4.5% | 83,883 to 93,983 | 0.8% | 0 | 192.1 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1359/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 10,021 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 10,021 | 9,854 | 2.0% | 6.4% | 8,670 to 10,517 | 100% | 0 | 194.7 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,364 | 2,381 | 2.7% | 4.0% | 2,297 to 2,526 | 23.6% | 0 | 192.3 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1359/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
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
| draft2019-09 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 655 | 0 | 0 | 0 | 0 |
| draft2019-09 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 477 | 178 | 0 | 0 | 0 |
| draft2019-09 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 485 | 31 | 139 | 0 | 0 |
| draft2019-09 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 655 | 0 | 0 | 0 | 0 |

## npm snapshot

Period: 2026-07-27 through 2026-08-02. Retrieved at 2026-08-04T18:04:08.000Z.

Each row binds observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. `module-global-unavailable` means Cold execution is N/A because a fresh adapter wrapper cannot isolate provider state.

| Validator | API | Cold isolation | Dynamic code | Weekly downloads |
| --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | fresh-instance | observed | 366,039,890 |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | reusable-sync | fresh-instance | not-observed | 6,655,864 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | module-global-unavailable | not-observed | 255,244 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | fresh-instance | not-observed | 532,097 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | reusable-sync | fresh-instance | observed | 8,304,494 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | reusable-sync | fresh-instance | not-observed | 279 |
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
