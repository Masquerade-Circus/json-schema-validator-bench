# draft4 benchmark results

## Setup ranking

Leader: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 5,438 | 100% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 289.6 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 5,250 | 96.5% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 287.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,028 | 55.7% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 279.5 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 201 | 3.7% | [0](errors/setup/ajv-COMPILE.md) | 0 | 351.3 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 702/718 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Balanced score 76.7%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 2,512,681 | 12,197,574 | 58.8% | 100% | 76.7% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 310.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,269,683 | 3,410,549 | 100% | 28.0% | 52.9% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 347.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 515,735 | 1,694,789 | 12.1% | 13.9% | 13.0% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 314.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 85,280 | 84,920 | 2.0% | 0.7% | 1.2% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 303.2 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 702/718 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Balanced score 100%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 6,154 | 9,955 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 289.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,654 | 3,964 | 59.4% | 39.8% | 48.6% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 287.6 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 211 | 216 | 3.4% | 2.2% | 2.7% | [0](errors/cold-execution/base/ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 439.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 702/718 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

Setup eligible roster: 4/9. Draft intersection: 907 represented cases and 183 deduplicated effective operations. Roster SHA-256: `6b08a2f321b928e8f256852e6d2d26f9cdb290c31b3cb44f2f225dc251a73524`.

# Profile: base

Execution eligible roster: 4/9. Intersection: 703 cases and 182 setup entries. Roster SHA-256: `6b08a2f321b928e8f256852e6d2d26f9cdb290c31b3cb44f2f225dc251a73524`.

Cold execution eligible roster: 3/9. Scopes with absent, stale, incompatible, inconclusive or interference-observed implementation evidence fail closed. Roster SHA-256: `d64f3ff48f144328253e36e39c0774e28bfb01fcfd5031e3ce0035528e3da139`.

## Execution ranking

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 4,269,683 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,269,683 | 4,074,225 | 3.5% | 16.6% | 2,720,304 to 4,501,741 | 100% | 0 | 347.2 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 2,512,681 | 2,566,363 | 5.1% | 9.3% | 2,322,055 to 2,971,202 | 58.8% | 0 | 283.1 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 515,735 | 511,052 | 4.2% | 9.0% | 431,761 to 566,769 | 12.1% | 0 | 294.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 85,280 | 84,300 | 2.8% | 4.2% | 79,610 to 87,974 | 2.0% | 0 | 285.4 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 702/718 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 6,154 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 6,154 | 6,104 | 5.2% | 5.9% | 5,678 to 6,551 | 100% | 0 | 289.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,654 | 3,646 | 2.6% | 3.3% | 3,474 to 3,778 | 59.4% | 0 | 287.6 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 211 | 210 | 3.2% | 4.0% | 201 to 223 | 3.4% | 0 | 439.6 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 702/718 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Conformance

The conformance table treats higher PASS counts and lower WRONG, COMPILE, RUNTIME and UNSUPPORTED counts as better. The table retains the stable configured participant order because those metrics move in opposite directions and do not form a composite ranking.

| Draft | Validator | PASS | WRONG | COMPILE | RUNTIME | UNSUPPORTED |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| draft4 | [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 706 | 8 | 0 | 4 | 0 |
| draft4 | [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 712 | 6 | 0 | 0 | 0 |
| draft4 | [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 706 | 6 | 6 | 0 | 0 |
| draft4 | [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 702 | 6 | 0 | 10 | 0 |
| draft4 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 717 | 1 | 0 | 0 | 0 |
| draft4 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 710 | 2 | 0 | 6 | 0 |
| draft4 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 708 | 2 | 0 | 8 | 0 |
| draft4 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 713 | 1 | 4 | 0 | 0 |
| draft4 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 716 | 2 | 0 | 0 | 0 |

# Profile: format-assertion

Execution eligible roster: 4/9. Intersection: 204 cases and 7 setup entries. Roster SHA-256: `6b08a2f321b928e8f256852e6d2d26f9cdb290c31b3cb44f2f225dc251a73524`.

Cold execution eligible roster: 3/9. Scopes with absent, stale, incompatible, inconclusive or interference-observed implementation evidence fail closed. Roster SHA-256: `d64f3ff48f144328253e36e39c0774e28bfb01fcfd5031e3ce0035528e3da139`.

## Execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 12,197,574 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 12,197,574 | 12,385,327 | 2.7% | 6.7% | 11,696,450 to 13,974,547 | 100% | 0 | 310.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 3,410,549 | 3,540,867 | 2.2% | 7.6% | 3,288,371 to 3,945,347 | 28.0% | 0 | 289.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,694,789 | 1,671,439 | 3.7% | 5.8% | 1,547,609 to 1,763,901 | 13.9% | 0 | 314.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 84,920 | 86,756 | 6.3% | 8.8% | 78,510 to 95,900 | 0.7% | 0 | 303.2 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 702/718 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 9,955 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 9,955 | 9,708 | 4.5% | 8.1% | 8,592 to 10,680 | 100% | 0 | 287.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,964 | 4,026 | 3.8% | 5.6% | 3,800 to 4,326 | 39.8% | 0 | 279.4 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 216 | 218 | 0.9% | 2.2% | 213 to 226 | 2.2% | 0 | 304.4 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 702/718 < 98%).
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
| draft4 | [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 206 | 0 | 0 | 0 | 0 |
| draft4 | [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 117 | 89 | 0 | 0 | 0 |
| draft4 | [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 183 | 23 | 0 | 0 | 0 |
| draft4 | [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 196 | 3 | 7 | 0 | 0 |
| draft4 | [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 206 | 0 | 0 | 0 | 0 |

## npm snapshot

Period: 2026-07-27 through 2026-08-02. Retrieved at 2026-08-04T18:04:08.000Z.

Each row binds automatically observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. Cold isolation uses independent clean-process controls A-A, B-B, A-B-A and B-A-B. The controls separate self-instability from cross-instance interference and fail closed when a control throws, cannot establish its canary or lacks complete instrumentation readiness.

| Validator | API | Cold isolation | Dynamic code in implementation | Executed during benchmark | Weekly downloads |
| --- | --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | interference-not-observed | Yes | Yes | 366,039,890 |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | reusable-sync | interference-not-observed | No | No | 6,655,864 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | interference-observed | No | No | 255,244 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | interference-not-observed | No | No | 532,097 |
| [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | validate-only | interference-not-observed | No | No | 6,186,992 |
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
| jsonschema | jsonschema (No) | None | None | json-schema-validator-bench |
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
