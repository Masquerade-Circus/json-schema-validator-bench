# draft2020-12 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 3,475 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 311.3 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 3,142 | 90.4% | [4](errors/setup/hyperjump-COMPILE.md) | 0 | 313.7 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,434 | 41.3% | [6](errors/setup/z-schema-COMPILE.md) | 0 | 299.7 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1365/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 699,715 | 10,034,403 | 100% | 100% | 100% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 315.9 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 251,368 | 235,577 | 35.9% | 2.3% | 9.2% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 330.2 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 72,026 | 82,166 | 10.3% | 0.8% | 2.9% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 299.8 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1365/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 4,247 | 7,553 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 316.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,545 | 1,777 | 36.4% | 23.5% | 29.3% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 306.1 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1365/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

Setup eligible roster: 3/8. Draft intersection: 2086 represented cases and 415 deduplicated effective operations. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

# Profile: base

Execution eligible roster: 3/8. Intersection: 1425 cases and 393 setup entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Cold execution eligible roster: 2/8. Scopes with absent, stale, incompatible, inconclusive or interference-observed implementation evidence fail closed. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 699,715 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 699,715 | 683,333 | 3.5% | 12.5% | 528,194 to 784,190 | 100% | 0 | 303.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 251,368 | 248,760 | 5.6% | 6.6% | 227,103 to 267,366 | 35.9% | 0 | 330.2 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 72,026 | 72,495 | 0.3% | 1.4% | 71,729 to 74,251 | 10.3% | 0 | 299.8 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1365/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 4,247 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 4,247 | 4,195 | 3.2% | 4.7% | 3,940 to 4,426 | 100% | 0 | 316.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,545 | 1,552 | 2.5% | 3.5% | 1,494 to 1,635 | 36.4% | 0 | 306.1 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1365/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft2020-12 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 1412 | 28 | 9 | 8 | 0 |
| draft2020-12 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 1393 | 32 | 24 | 8 | 0 |
| draft2020-12 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1432 | 21 | 4 | 0 | 0 |
| draft2020-12 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 1365 | 21 | 24 | 47 | 0 |
| draft2020-12 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 1457 | 0 | 0 | 0 | 0 |
| draft2020-12 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 1451 | 2 | 0 | 4 | 0 |
| draft2020-12 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 1443 | 1 | 9 | 4 | 0 |
| draft2020-12 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1450 | 1 | 6 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 3/8. Intersection: 661 cases and 22 setup entries. Roster SHA-256: `6ea15ba8d3dc4dd30f4f31d5d0d99da8afb58dc654ebb84e55059da73934eb3a`.

Cold execution eligible roster: 2/8. Scopes with absent, stale, incompatible, inconclusive or interference-observed implementation evidence fail closed. Roster SHA-256: `739f07934f94218e04b05e9fd8b301127d8efe498da5ae0607d5db35c2e2704c`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 10,034,403 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 10,034,403 | 10,503,553 | 4.2% | 10.6% | 9,482,506 to 12,254,298 | 100% | 0 | 315.9 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 235,577 | 233,135 | 3.9% | 5.4% | 212,594 to 244,782 | 2.3% | 0 | 301.2 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 82,166 | 83,717 | 3.6% | 6.0% | 79,022 to 90,536 | 0.8% | 0 | 290.2 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1365/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 7,553 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 7,553 | 7,588 | 1.5% | 3.0% | 7,237 to 7,900 | 100% | 0 | 299.7 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,777 | 1,784 | 0.4% | 1.0% | 1,769 to 1,818 | 23.5% | 0 | 295.8 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1393/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1365/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
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
| draft2020-12 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 667 | 0 | 0 | 0 | 0 |
| draft2020-12 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 487 | 180 | 0 | 0 | 0 |
| draft2020-12 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 488 | 36 | 143 | 0 | 0 |
| draft2020-12 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 667 | 0 | 0 | 0 | 0 |

## npm snapshot

Period: 2026-07-27 through 2026-08-02. Retrieved at 2026-08-04T18:04:08.000Z.

Each row binds automatically observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. Cold isolation uses independent clean-process controls A-A, B-B, A-B-A and B-A-B. The controls separate self-instability from cross-instance interference and fail closed when a control throws, cannot establish its canary or lacks complete instrumentation readiness.

| Validator | API | Cold isolation | Dynamic code in implementation | Executed during benchmark | Weekly downloads |
| --- | --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | interference-not-observed | Yes | Yes | 366,039,890 |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | reusable-sync | interference-not-observed | No | No | 6,655,864 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | interference-observed | No | No | 255,244 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | interference-not-observed | No | No | 532,097 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | reusable-sync | interference-not-observed | Yes | Yes | 8,304,494 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | reusable-sync | interference-not-observed | No | No | 279 |
| [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | reusable-sync | interference-not-observed | Yes | Yes | 4,851,948 |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | reusable-sync | interference-not-observed | No | No | 3,261,931 |

- `reusable-sync`: prepares a reusable callable synchronously.
- `reusable-async`: resolves asynchronous setup before exposing a reusable callable.
- `validate-only`: exposes validation through the adapter without a separate reusable setup target.
- `interference-not-observed`: both self-controls stayed stable and neither cross-order control changed the first instance.
- `interference-observed`: A-B-A or B-A-B changed the first instance while A-A and B-B stayed stable, so Cold execution is `N/A`.
- `self-instability-observed`: A-A or B-B changed without a cross-provider claim, so Cold execution fails closed for that scope.
- `inconclusive`: a canary failed or a control threw, so Cold execution fails closed for that scope.
- `Dynamic code in implementation` is `Yes` when the installed primary package or an explicit companion contains a source finding. Otherwise it is `No`.
- `Executed during benchmark` is `Yes` when runtime instrumentation records at least one successful dependency mechanism on the exercised routes. Otherwise it is `No`.

The source scanner inspects every installed distributed file in each primary package and explicit companion, not only code reached by the benchmark. It parses supported JavaScript and TypeScript representations into an AST, resolves lexical and interfile bindings, converges the call graph to a fixed point and detects the supported dynamic-code sinks. Ownership and reachability remain attached to each finding. Transitive packages and benchmark adapters stay visible as separate owners and cannot elevate the family verdict.

Source presence and runtime execution answer different questions. Runtime capability and coverage details remain in `results/implementation-evidence.json`; they never change the source `Yes` or `No`. A source scanner error aborts capture as a runner error and must be fixed before publication. It never becomes a validator state.

#### Dynamic code evidence details

The detail uses stored scanner evidence. It never renders distributed source text or runtime payloads.

| Validator | Primary | Companions | Transitives (excluded) | Adapter (excluded) |
| --- | --- | --- | --- | --- |
| ajv | ajv (Yes) | ajv-draft-04, ajv-formats | fast-deep-equal, fast-uri, json-schema-traverse, require-from-string | json-schema-validator-bench |
| cfworker-json-schema | @cfworker/json-schema (No) | None | None | json-schema-validator-bench |
| hyperjump | @hyperjump/json-schema (No) | @hyperjump/browser | @hyperjump/json-pointer, @hyperjump/json-schema-formats, @hyperjump/pact, @hyperjump/uri, content-type, idn-hostname, json-stringify-deterministic, just-curry-it, punycode, uuid | json-schema-validator-bench |
| json-schema-library | json-schema-library (No) | None | @hyperjump/json-schema-formats, @hyperjump/uri, @sagold/json-pointer, fast-copy, fast-deep-equal, idn-hostname, punycode, uri-js, valid-url | json-schema-validator-bench |
| redocly-ajv | @redocly/ajv (Yes) | ajv-formats | ajv, fast-deep-equal, fast-uri, json-schema-traverse, require-from-string | json-schema-validator-bench |
| schema-shield | schema-shield (No) | None | None | json-schema-validator-bench |
| schemasafe | @exodus/schemasafe (Yes) | None | None | json-schema-validator-bench |
| z-schema | z-schema (No) | None | commander, punycode, ret, safe-regex2, validator | json-schema-validator-bench |

| Validator | Owner | Package | Mechanism | Location | Reachability | Representation |
| --- | --- | --- | --- | --- | --- | --- |
| ajv | primary | ajv | function construct | dist/compile/index.js:89 | Reachable | source |
| ajv | primary | ajv | function construct | dist/compile/jtd/parse.js:50 | Not reachable | source |
| ajv | primary | ajv | function construct | dist/compile/jtd/serialize.js:50 | Not reachable | source |
| ajv | primary | ajv | function construct | lib/compile/index.ts:171 | Not reachable | source |
| ajv | primary | ajv | function construct | lib/compile/jtd/parse.ts:69 | Not reachable | source |
| ajv | primary | ajv | function construct | lib/compile/jtd/serialize.ts:65 | Not reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | dist/compile/index.js:89 | Reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | dist/compile/jtd/parse.js:50 | Not reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | dist/compile/jtd/serialize.js:50 | Not reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | lib/compile/index.ts:175 | Not reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | lib/compile/jtd/parse.ts:71 | Not reachable | source |
| redocly-ajv | primary | @redocly/ajv | function construct | lib/compile/jtd/serialize.ts:67 | Not reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/compile.js:176 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/compile.js:1357 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/compile.js:1372 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/generate-function.js:101 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/index.js:33 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/index.js:36 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/index.js:55 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/index.js:90 | Reachable | source |
| schemasafe | primary | @exodus/schemasafe | function invoke | src/index.js:95 | Reachable | source |

## Limitations

Format behavior, runtime state, hardware, power state, and operating-system load affect results. Setup N/A identifies a validate-only API or unavailable setup measurement. Cold execution N/A identifies an adapter whose state cannot be isolated under the direct measurement contract.
