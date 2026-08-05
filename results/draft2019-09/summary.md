# draft2019-09 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 3,855 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 298.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 3,589 | 93.1% | [4](errors/setup/hyperjump-COMPILE.md) | 0 | 303.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,907 | 49.5% | [6](errors/setup/z-schema-COMPILE.md) | 0 | 295.5 MiB |

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
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 994,067 | 12,599,104 | 100% | 100% | 100% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 325.4 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 308,444 | 247,243 | 31.0% | 2.0% | 7.8% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 319.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 78,484 | 82,857 | 7.9% | 0.7% | 2.3% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 321.8 MiB |

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
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 4,888 | 9,496 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 298.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,973 | 2,329 | 40.4% | 24.5% | 31.5% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 295.8 MiB |

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

Cold execution eligible roster: 2/8. Scopes with absent, stale, incompatible, inconclusive or interference-observed implementation evidence fail closed. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 994,067 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 994,067 | 984,511 | 2.5% | 6.7% | 869,630 to 1,066,637 | 100% | 0 | 325.4 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 308,444 | 306,823 | 1.5% | 4.2% | 284,124 to 323,253 | 31.0% | 0 | 319.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 78,484 | 78,207 | 2.8% | 3.1% | 74,885 to 81,086 | 7.9% | 0 | 321.8 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1359/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 4,888 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 4,888 | 4,886 | 0.8% | 2.1% | 4,721 to 5,030 | 100% | 0 | 298.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,973 | 1,972 | 2.3% | 3.0% | 1,905 to 2,056 | 40.4% | 0 | 295.8 MiB |

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

Cold execution eligible roster: 2/8. Scopes with absent, stale, incompatible, inconclusive or interference-observed implementation evidence fail closed. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 12,599,104 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 12,599,104 | 12,716,565 | 8.7% | 9.6% | 11,052,766 to 14,154,587 | 100% | 0 | 303.1 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 247,243 | 247,823 | 0.7% | 4.0% | 233,425 to 264,454 | 2.0% | 0 | 312.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 82,857 | 84,430 | 2.3% | 8.1% | 78,716 to 97,794 | 0.7% | 0 | 304.7 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1359/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 9,496 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 9,496 | 9,424 | 0.8% | 1.9% | 9,138 to 9,574 | 100% | 0 | 288.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,329 | 2,340 | 3.1% | 3.4% | 2,243 to 2,437 | 24.5% | 0 | 286.4 MiB |

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

Each row binds automatically observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. Cold isolation uses independent clean-process controls A-A, B-B, A-B-A and B-A-B. The controls separate self-instability from cross-instance interference and fail closed when a control throws, cannot establish its canary or lacks complete instrumentation readiness.

| Validator | API | Cold isolation | Dynamic code | Weekly downloads |
| --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | interference-not-observed | observed | 366,039,890 |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | reusable-sync | interference-not-observed | limited | 6,655,864 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | interference-observed | limited | 255,244 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | interference-not-observed | limited | 532,097 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | reusable-sync | interference-not-observed | observed | 8,304,494 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | reusable-sync | interference-not-observed | limited | 279 |
| [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | reusable-sync | interference-not-observed | observed | 4,851,948 |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | reusable-sync | interference-not-observed | limited | 3,261,931 |

- `reusable-sync`: prepares a reusable callable synchronously.
- `reusable-async`: resolves asynchronous setup before exposing a reusable callable.
- `validate-only`: exposes validation through the adapter without a separate reusable setup target.
- `interference-not-observed`: both self-controls stayed stable and neither cross-order control changed the first instance.
- `interference-observed`: A-B-A or B-A-B changed the first instance while A-A and B-B stayed stable, so Cold execution is `N/A`.
- `self-instability-observed`: A-A or B-B changed without a cross-provider claim, so Cold execution fails closed for that scope.
- `inconclusive`: a canary failed or a control threw, so Cold execution fails closed for that scope.
- `observed`: at least one dependency mechanism successfully generated dynamic code on the exercised route.
- `not-observed`: every required mechanism and phase was ready and no dependency mechanism succeeded.
- `limited`: every required process and phase confirmed readiness, but transparent instrumentation has a known observation limit. `limited` cannot replace unavailable or missing readiness.

Dynamic code describes only the instrumented adapter import, setup, validation and isolation phases at the pinned version. API, A-A, B-B, A-B-A and B-A-B publish independent process identities, PIDs and per-phase readiness. One unavailable, contradictory or missing required process makes the scope inconclusive and Cold fails closed. The evidence separates attempted, succeeded and failed generation where each outcome is observable for eval, Function, AsyncFunction, GeneratorFunction, AsyncGeneratorFunction, node:vm, WebAssembly, workers, inline Node subprocesses, data imports and controlled-child propagation. Worker and fork execArgv values preserve caller flags while forcing one preload. Spawn, execFile and shell exec routes cover their sync and async forms. Inspector observation preserves lexical direct eval semantics, but it cannot transparently distinguish direct from indirect eval or confirm completion of an eval body. Loader hooks observe a data URL request while inspector confirms parsed scripts, but they cannot confirm every parse or evaluation failure. Eval and data imports therefore report capability limits instead of simulated coverage. The event log stores outcomes, provenance and attribution, never generated source text.

## Limitations

Format behavior, runtime state, hardware, power state, and operating-system load affect results. Setup N/A identifies a validate-only API or unavailable setup measurement. Cold execution N/A identifies an adapter whose state cannot be isolated under the direct measurement contract.
