# draft2019-09 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 2,149 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 241.5 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,301 | 60.5% | [4](errors/setup/hyperjump-COMPILE.md) | 0 | 259.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,176 | 54.7% | [6](errors/setup/z-schema-COMPILE.md) | 0 | 193.5 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 461,928 | 9,176,742 | 100% | 100% | 100% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 198.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 151,466 | 180,209 | 32.8% | 2.0% | 8.0% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 265.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 41,952 | 63,137 | 9.1% | 0.7% | 2.5% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 268.3 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 2,723 | 6,351 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 271.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,374 | 1,603 | 50.5% | 25.2% | 35.7% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 199.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

Setup eligible roster: 3/8. Draft intersection: 2034 represented cases and 403 deduplicated effective operations. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

# Profile: base

Execution eligible roster: 3/8. Intersection: 1385 cases and 383 setup entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Cold execution eligible roster: 2/8. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 461,928 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 461,928 | 472,356 | 4.7% | 10.9% | 409,489 to 561,849 | 100% | 0 | 198.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 151,466 | 150,817 | 3.7% | 6.1% | 140,313 to 165,891 | 32.8% | 0 | 265.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 41,952 | 41,558 | 2.9% | 4.7% | 38,341 to 43,698 | 9.1% | 0 | 268.3 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 2,723 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 2,723 | 2,713 | 2.7% | 5.4% | 2,445 to 2,852 | 100% | 0 | 271.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,374 | 1,372 | 2.6% | 2.8% | 1,318 to 1,417 | 50.5% | 0 | 199.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft2019-09 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 1397 | 9 | 5 | 6 | 0 |
| draft2019-09 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 1386 | 12 | 19 | 0 | 0 |
| draft2019-09 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1392 | 21 | 4 | 0 | 0 |
| draft2019-09 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 1386 | 12 | 19 | 0 | 0 |
| draft2019-09 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 1417 | 0 | 0 | 0 | 0 |
| draft2019-09 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 1411 | 2 | 0 | 4 | 0 |
| draft2019-09 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 1404 | 0 | 9 | 4 | 0 |
| draft2019-09 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1410 | 1 | 6 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 3/8. Intersection: 649 cases and 20 setup entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Cold execution eligible roster: 2/8. Hyperjump is N/A because its adapter uses module-global schema state that a fresh wrapper cannot isolate. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 9,176,742 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 9,176,742 | 9,018,565 | 1.6% | 4.3% | 8,371,966 to 9,384,010 | 100% | 0 | 184.8 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 180,209 | 181,477 | 3.6% | 5.5% | 171,711 to 198,540 | 2.0% | 0 | 201.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 63,137 | 63,156 | 0.9% | 2.8% | 60,933 to 66,239 | 0.7% | 0 | 186.3 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) — 6,351 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 6,351 | 6,246 | 4.5% | 6.7% | 5,592 to 6,719 | 100% | 0 | 192.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,603 | 1,602 | 4.2% | 4.7% | 1,502 to 1,695 | 25.2% | 0 | 190.3 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
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
| draft2019-09 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) | 655 | 0 | 0 | 0 | 0 |
| draft2019-09 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 477 | 178 | 0 | 0 | 0 |
| draft2019-09 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 485 | 31 | 139 | 0 | 0 |
| draft2019-09 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 655 | 0 | 0 | 0 | 0 |

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
