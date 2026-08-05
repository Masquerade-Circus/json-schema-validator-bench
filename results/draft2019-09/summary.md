# draft2019-09 benchmark results

## Setup ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — Setup score 100%

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 3,864 | 100% | [0](errors/setup/schema-shield-COMPILE.md) | 0 | 304.0 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 3,593 | 93.0% | [4](errors/setup/hyperjump-COMPILE.md) | 0 | 308.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,833 | 47.4% | [6](errors/setup/z-schema-COMPILE.md) | 0 | 320.8 MiB |

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
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 741,724 | 11,601,500 | 100% | 100% | 100% | [0](errors/execution/base/schema-shield-RUNTIME.md) | [0](errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 316.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 276,285 | 241,128 | 37.2% | 2.1% | 8.8% | [0](errors/execution/base/hyperjump-RUNTIME.md) | [0](errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 326.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 73,911 | 85,102 | 10.0% | 0.7% | 2.7% | [0](errors/execution/base/z-schema-RUNTIME.md) | [0](errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 319.0 MiB |

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
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 4,592 | 8,868 | 100% | 100% | 100% | [0](errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 299.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,866 | 2,196 | 40.6% | 24.8% | 31.7% | [0](errors/cold-execution/base/z-schema-RUNTIME.md) | [0](errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 299.0 MiB |

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

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 741,724 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 741,724 | 745,811 | 11.2% | 13.0% | 632,367 to 885,930 | 100% | 0 | 316.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 276,285 | 274,658 | 1.4% | 2.2% | 265,398 to 281,486 | 37.2% | 0 | 307.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 73,911 | 72,812 | 2.8% | 5.0% | 67,944 to 76,101 | 10.0% | 0 | 319.0 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1359/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 4,592 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 4,592 | 4,625 | 1.6% | 3.6% | 4,460 to 4,926 | 100% | 0 | 299.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 1,866 | 1,855 | 2.3% | 3.1% | 1,764 to 1,913 | 40.6% | 0 | 299.0 MiB |

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

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 11,601,500 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 11,601,500 | 12,027,266 | 3.7% | 8.6% | 11,092,494 to 13,615,987 | 100% | 0 | 309.2 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 241,128 | 243,888 | 5.2% | 6.9% | 222,495 to 267,692 | 2.1% | 0 | 326.3 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 85,102 | 84,055 | 5.3% | 11.5% | 66,179 to 93,008 | 0.7% | 0 | 294.9 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): PASS_THRESHOLD_NOT_MET(base 1386/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): PASS_THRESHOLD_NOT_MET(base 1359/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%).

## Cold execution ranking

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) — 8,868 ops/s (100%)

Higher ops/s and a higher score are better. The median is the ranking center. Relative MAD is the primary robust dispersion measure, while mean and sample CV remain diagnostic. The score is each median divided by the best median in this scope, multiplied by 100. Statistical significance and percentage improvement require separate analysis. Rows are sorted by median ops/s descending, with validator ID as the deterministic tie-breaker and N/A last.

| Validator | Median ops/s | Mean ops/s | Relative MAD | Sample CV | Min–max ops/s | Score | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.4.0) | 8,868 | 8,591 | 3.1% | 7.8% | 7,659 to 9,212 | 100% | 0 | 288.9 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,196 | 2,193 | 0.9% | 3.4% | 2,076 to 2,308 | 24.8% | 0 | 283.2 MiB |

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
