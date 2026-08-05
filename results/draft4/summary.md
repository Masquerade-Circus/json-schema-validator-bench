# draft4 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 5,673 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 291.5 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 5,474 | 96.5% | [6](errors/setup/hyperjump-COMPILE.md) | 0 | 289.5 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,507 | 61.8% | [0](errors/setup/z-schema-COMPILE.md) | 0 | 287.4 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 210 | 3.7% | [0](errors/setup/ajv-COMPILE.md) | 0 | 345.9 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 702/718 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Execution consolidation

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Balanced score 79.5%

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 2,901,008 | 13,415,684 | 63.1% | 100% | 79.5% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 288.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,595,102 | 3,691,011 | 100% | 27.5% | 52.5% | [0](errors/execution/base/ajv-RUNTIME.md) | [0](errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 324.5 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 576,745 | 1,853,419 | 12.6% | 13.8% | 13.2% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 308.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 87,809 | 85,549 | 1.9% | 0.6% | 1.1% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 300.9 MiB |

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
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 6,702 | 10,075 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 288.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,871 | 4,034 | 57.8% | 40.0% | 48.1% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 293.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 225 | 230 | 3.4% | 2.3% | 2.8% | [0](errors/cold-execution/base/ajv-RUNTIME.md) | [0](errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 445.0 MiB |

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

Leader: [ajv](https://www.npmjs.com/package/ajv) (8.20.0) — 4,595,102 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,595,102 | 4,518,137 | 6.4% | 11.9% | 3,573,305 to 5,054,990 | 100% | 0 | 324.5 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 2,901,008 | 2,937,016 | 6.7% | 7.9% | 2,640,468 to 3,223,294 | 63.1% | 0 | 284.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 576,745 | 576,495 | 0.6% | 1.0% | 568,879 to 583,504 | 12.6% | 0 | 295.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 87,809 | 85,376 | 3.5% | 8.0% | 73,623 to 92,645 | 1.9% | 0 | 293.0 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 702/718 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 6,702 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 6,702 | 6,796 | 1.8% | 4.1% | 6,566 to 7,306 | 100% | 0 | 288.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 3,871 | 3,863 | 3.6% | 4.0% | 3,636 to 4,030 | 57.8% | 0 | 293.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 225 | 225 | 1.8% | 3.6% | 212 to 236 | 3.4% | 0 | 445.0 MiB |

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

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 13,415,684 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 13,415,684 | 13,439,996 | 5.4% | 5.9% | 12,680,233 to 14,244,456 | 100% | 0 | 288.9 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 3,691,011 | 3,691,077 | 7.6% | 8.8% | 3,311,079 to 4,028,124 | 27.5% | 0 | 310.8 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,853,419 | 1,825,784 | 5.2% | 8.4% | 1,575,772 to 2,012,157 | 13.8% | 0 | 308.6 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 85,549 | 84,933 | 3.4% | 13.1% | 67,911 to 102,508 | 0.6% | 0 | 300.9 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 702/718 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 10,075 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 10,075 | 9,970 | 5.9% | 8.4% | 8,806 to 11,041 | 100% | 0 | 277.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 4,034 | 4,055 | 6.3% | 6.9% | 3,681 to 4,410 | 40.0% | 0 | 282.6 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 230 | 229 | 2.8% | 3.4% | 221 to 241 | 2.3% | 0 | 346.8 MiB |

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

| Validator | API | Cold isolation | Dynamic code | Weekly downloads |
| --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | interference-not-observed | observed | 366,039,890 |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | reusable-sync | interference-not-observed | limited | 6,655,864 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | interference-observed | limited | 255,244 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | interference-not-observed | limited | 532,097 |
| [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | validate-only | interference-not-observed | limited | 6,186,992 |
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
