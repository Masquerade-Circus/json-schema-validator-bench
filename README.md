# JSON Schema Validator Bench

## Why

JSON Schema Validator Bench measures conformance and performance across drafts 04, 06, 07, 2019-09, and 2020-12 with pinned dependencies, corpus identities, and report contracts.

Maintainers can reproduce each run, inspect exact conformance records, compare qualified performance scopes, and use the results to target validator improvements.

## Install from a clone

Node.js 22 or later is required. From the cloned project root, install the exact dependency graph from `package-lock.json`:

```bash
git clone <repository-url>
cd <repository-directory>
npm ci
```

Replace `<repository-url>` and `<repository-directory>` with the clone URL and local directory name.

## Root commands

Use Quick for diagnostic change checks. Use Full for canonical publication results. Run Full before publishing.

Run the harness:

```bash
npm test
```

Run Quick:

```bash
npm run benchmark -- --quick
```

Refresh one validator against a compatible Full cohort:

```bash
npm run benchmark -- --validator <canonical-id>
```

Refresh one validator against a compatible Quick cohort:

```bash
npm run benchmark -- --quick --validator <canonical-id>
```

A validator refresh requires a complete compatible publication for the same base mode. Changes to the environment, benchmark contract, suite, locks, threshold, rounds, roster, eligibility, or common PASS corpus require a complete run first.

Regenerate one phase from a complete compatible publication:

```bash
npm run benchmark -- --bench setup
npm run benchmark -- --bench execution
npm run benchmark -- --bench cold
```

Set the atomic Base and Formats eligibility threshold with a decimal percentage from 0 through 100:

```bash
npm run benchmark -- --eligibility-threshold-percent 98.5
```

Run Full:

```bash
npm run benchmark
```

## Last run

- **Mode:** Full
- **Completed (UTC):** 2026-08-02T01:53:39.063Z
- **Total duration:** 27 min 45.765 s
- **Node.js version:** v24.18.0
- **OS/platform:** linux 6.8.0-136-generic (x64)
- **CPU:** AMD Ryzen 7 7840HS w/ Radeon 780M Graphics (12 logical cores)
- **System memory total:** 13.5 GiB
- **Peak benchmark RSS:** 425.4 MiB
- **JSON Schema Test Suite commit:** `0c7b65dc16dd8eaa7bd83e21099c76610c3b246a`
- **Eligibility threshold:** 98%
- **Benchmark contract hash:** `a11db4526dad6fe30e89518e9841589976aab08ff7be46ad9af62f82ab6941e5`

## Total conformance

Eligibility threshold: 98% per draft profile.

```mermaid
xychart horizontal
    title "Total conformance (Higher is better)"
    x-axis ["SchemaShield (1.2.0)", "z-schema (12.4.0)", "Hyperjump (1.17.7)", "Redocly AJV (8.18.3)", "AJV (8.20.0)", "schemasafe (1.3.0)", "json-schema-library (11.6.2)", "@cfworker/json-schema (4.1.1)", "jsonschema (1.5.0)", "djv (2.1.4)"]
    y-axis "PASS (%)" 0 --> 100
    bar [99.987, 99.774, 98.595, 94.705, 94.68, 92.434, 90.527, 79.46, 44.291, 12.848]
    line [98, 98, 98, 98, 98, 98, 98, 98, 98, 98]
```

| Validator | Draft 4 Base | Draft 4 Formats | Draft 6 Base | Draft 6 Formats | Draft 7 Base | Draft 7 Formats | Draft 2019-09 Base | Draft 2019-09 Formats | Draft 2020-12 Base | Draft 2020-12 Formats | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 99.86% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 99.99% |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 99.72% | 100.00% | 99.89% | 100.00% | 99.90% | 100.00% | 99.51% | 100.00% | 99.52% | 100.00% | 99.77% |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 98.33% | 100.00% | 98.52% | 100.00% | 98.28% | 98.98% | 98.24% | 99.08% | 98.28% | 99.10% | 98.59% |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 98.61% | 99.03% | 98.73% | 99.27% | 98.28% | 85.18% | 97.53% | 86.26% | 95.47% | 85.01% | 94.71% |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 98.61% | 99.03% | 98.73% | 99.27% | 98.28% | 85.18% | 97.53% | 86.26% | 95.33% | 85.01% | 94.68% |
| [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | 99.30% | 95.15% | 99.58% | 96.34% | 96.94% | 71.72% | 99.08% | 74.05% | 99.04% | 73.16% | 92.43% |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | 98.89% | 56.80% | 99.26% | 65.57% | 98.95% | 70.02% | 99.58% | 72.82% | 99.59% | 73.01% | 90.53% |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | 98.33% | 97.57% | N/A | N/A | 98.28% | 82.62% | 98.59% | 83.82% | 96.91% | 83.36% | 79.46% |
| [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | 98.61% | 88.83% | 97.57% | 90.84% | 96.75% | 78.02% | N/A | N/A | N/A | N/A | 44.29% |
| [djv](https://www.npmjs.com/package/djv) (2.1.4) | N/A | N/A | 85.40% | 79.49% | N/A | N/A | N/A | N/A | N/A | N/A | 12.85% |

The line marks the exact 98% draft eligibility threshold. Total uses PASS over all canonical cases. Draft eligibility uses the exact Base and Formats fractions for that draft.

Total means PASS over all 7,970 canonical cases from the five drafts and both profiles. An unsupported draft or scope contributes zero PASS while its cases remain in the denominator. Cells round uniformly to two decimals. The 98% eligibility gate compares exact integer fractions. Rows sort by Total descending with a stable validator ID tie-breaker. Base and Formats must each reach 98% for the participant to qualify in that draft.

## Draft 6 results

### Draft 6 setup

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — Setup score 100%

```mermaid
xychart horizontal
    title "Draft-06 setup (Higher is better)"
    x-axis ["SchemaShield (1.2.0)", "Hyperjump (1.17.7)", "z-schema (12.4.0)", "Redocly AJV (8.18.3)", "AJV (8.20.0)"]
    y-axis "Setup score" 0 --> 100
    bar [100, 88, 86, 3, 3]
```

| Validator | Setup ops/s | Score | Errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,387 | 100% | [0](results/draft6/errors/setup/schema-shield-COMPILE.md) | 0 | 253.7 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 2,972 | 87.7% | [6](results/draft6/errors/setup/hyperjump-COMPILE.md) | 0 | 223.4 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,900 | 85.6% | [0](results/draft6/errors/setup/z-schema-COMPILE.md) | 0 | 188.1 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 113 | 3.3% | [3](results/draft6/errors/setup/redocly-ajv-COMPILE.md) | 0 | 302.2 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 106 | 3.1% | [3](results/draft6/errors/setup/ajv-COMPILE.md) | 0 | 296.8 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

### Draft 6 execution

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — Balanced score 82.5%

```mermaid
xychart horizontal
    title "Draft-06 execution (Higher is better)"
    x-axis ["SchemaShield (1.2.0)", "AJV (8.20.0)", "Redocly AJV (8.18.3)", "Hyperjump (1.17.7)", "z-schema (12.4.0)"]
    y-axis "Balanced score" 0 --> 100
    bar [82, 55, 52, 13, 1]
```

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 2,926,674 | 13,936,699 | 68.0% | 100% | 82.5% | [0](results/draft6/errors/execution/base/schema-shield-RUNTIME.md) | [0](results/draft6/errors/execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 187.8 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 4,302,008 | 4,280,907 | 100% | 30.7% | 55.4% | [0](results/draft6/errors/execution/base/ajv-RUNTIME.md) | [0](results/draft6/errors/execution/format-assertion/ajv-RUNTIME.md) | 0 | 297.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 3,817,630 | 4,284,964 | 88.7% | 30.7% | 52.2% | [0](results/draft6/errors/execution/base/redocly-ajv-RUNTIME.md) | [0](results/draft6/errors/execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 307.3 MiB |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 534,760 | 1,824,976 | 12.4% | 13.1% | 12.8% | [0](results/draft6/errors/execution/base/hyperjump-RUNTIME.md) | [0](results/draft6/errors/execution/format-assertion/hyperjump-RUNTIME.md) | 0 | 191.8 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 91,384 | 104,613 | 2.1% | 0.8% | 1.3% | [0](results/draft6/errors/execution/base/z-schema-RUNTIME.md) | [0](results/draft6/errors/execution/format-assertion/z-schema-RUNTIME.md) | 0 | 191.0 MiB |

Excluded from this ranking:

- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

### Draft 6 Cold execution

Leader: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — Balanced score 100%

```mermaid
xychart horizontal
    title "Draft-06 Cold execution (Higher is better)"
    x-axis ["SchemaShield (1.2.0)", "z-schema (12.4.0)", "Redocly AJV (8.18.3)", "AJV (8.20.0)"]
    y-axis "Balanced score" 0 --> 100
    bar [100, 72, 3, 3]
```

| Validator | Base ops/s | Formats ops/s | Base score | Formats score | Balanced score | Base errors | Format errors | Mutations | Peak RSS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 3,675 | 4,196 | 100% | 100% | 100% | [0](results/draft6/errors/cold-execution/base/schema-shield-RUNTIME.md) | [0](results/draft6/errors/cold-execution/format-assertion/schema-shield-RUNTIME.md) | 0 | 283.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 2,552 | 3,163 | 69.4% | 75.4% | 72.3% | [0](results/draft6/errors/cold-execution/base/z-schema-RUNTIME.md) | [0](results/draft6/errors/cold-execution/format-assertion/z-schema-RUNTIME.md) | 0 | 265.2 MiB |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | 116 | 122 | 3.1% | 2.9% | 3.0% | [0](results/draft6/errors/cold-execution/base/redocly-ajv-RUNTIME.md) | [0](results/draft6/errors/cold-execution/format-assertion/redocly-ajv-RUNTIME.md) | 0 | 425.4 MiB |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | 105 | 111 | 2.8% | 2.6% | 2.7% | [0](results/draft6/errors/cold-execution/base/ajv-RUNTIME.md) | [0](results/draft6/errors/cold-execution/format-assertion/ajv-RUNTIME.md) | 0 | 413.8 MiB |

Excluded from this ranking:

- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): PHASE_UNAVAILABLE.
- [djv](https://www.npmjs.com/package/djv) (2.1.4): PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%).
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%).
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%).

## All drafts results

### All Drafts Setup

Leader global: [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) — Setup score 97.0%

```mermaid
xychart horizontal
    title "All Drafts Setup Setup score (Higher is better)"
    x-axis ["Hyperjump (1.17.7)", "SchemaShield (1.2.0)", "z-schema (12.4.0)"]
    y-axis "Setup score" 0 --> 100
    bar [96.963, 88.658, 83.866]
```

| Validator | Setup ops/s index | Setup score | Errors | Peak RSS |
| --- | ---: | ---: | ---: | ---: |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 12,890 | 97.0% | [26](results/global-errors/setup/setup/hyperjump-COMPILE.md) | 284.5 MiB |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 12,358 | 88.7% | [0](results/global-errors/setup/setup/schema-shield-COMPILE.md) | 294.0 MiB |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 11,441 | 83.9% | [12](results/global-errors/setup/setup/z-schema-COMPILE.md) | 199.2 MiB |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): coverage 0/5. Reason: draft4/setup: PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%). draft6/setup: DRAFT_UNSUPPORTED. draft7/setup: PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%). draft2019-09/setup: PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%). draft2020-12/setup: PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): coverage 2/5. Reason: draft7/setup: PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%). draft2019-09/setup: PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%). draft2020-12/setup: PASS_THRESHOLD_NOT_MET(base 1389/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): coverage 2/5. Reason: draft7/setup: PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%). draft2019-09/setup: PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%). draft2020-12/setup: PASS_THRESHOLD_NOT_MET(base 1391/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): coverage 0/5. Reason: draft4/setup: DRAFT_UNSUPPORTED. draft6/setup: PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%). draft7/setup: DRAFT_UNSUPPORTED. draft2019-09/setup: DRAFT_UNSUPPORTED. draft2020-12/setup: DRAFT_UNSUPPORTED.
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): coverage 0/5. Reason: draft4/setup: PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%). draft6/setup: PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%). draft7/setup: PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%). draft2019-09/setup: PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%). draft2020-12/setup: PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): coverage 0/5. Reason: draft4/setup: PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%). draft6/setup: PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%). draft7/setup: PHASE_UNAVAILABLE, PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%). draft2019-09/setup: DRAFT_UNSUPPORTED. draft2020-12/setup: DRAFT_UNSUPPORTED.
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): coverage 0/5. Reason: draft4/setup: PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%). draft6/setup: PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%). draft7/setup: PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%). draft2019-09/setup: PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%). draft2020-12/setup: PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

### All Drafts Execution

Leader global: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — Balanced score 100%

```mermaid
xychart horizontal
    title "All Drafts Execution Balanced score (Higher is better)"
    x-axis ["SchemaShield (1.2.0)", "Hyperjump (1.17.7)", "z-schema (12.4.0)"]
    y-axis "Balanced score" 0 --> 100
    bar [100, 9.606, 1.816]
```

| Validator | Base ops/s | Formats ops/s | Average ops/s | Base score | Formats score | Balanced score |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 10,051,696 | 67,258,943 | 38,655,319 | 100% | 100% | 100% |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | 1,992,490 | 4,399,138 | 3,195,814 | 22.3% | 4.1% | 9.6% |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 400,259 | 473,924 | 437,091 | 4.7% | 0.7% | 1.8% |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): coverage 0/10. Reason: draft4/base: PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%). draft4/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%). draft6/base: DRAFT_UNSUPPORTED. draft6/format-assertion: DRAFT_UNSUPPORTED. draft7/base: PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%). draft2019-09/base: PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%). draft2019-09/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%). draft2020-12/base: PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%). draft2020-12/format-assertion: PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): coverage 4/10. Reason: draft7/base: PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%). draft2019-09/base: PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%). draft2019-09/format-assertion: PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%). draft2020-12/base: PASS_THRESHOLD_NOT_MET(base 1389/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%). draft2020-12/format-assertion: PASS_THRESHOLD_NOT_MET(base 1389/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): coverage 4/10. Reason: draft7/base: PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%). draft2019-09/base: PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%). draft2019-09/format-assertion: PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%). draft2020-12/base: PASS_THRESHOLD_NOT_MET(base 1391/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%). draft2020-12/format-assertion: PASS_THRESHOLD_NOT_MET(base 1391/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): coverage 0/10. Reason: draft4/base: DRAFT_UNSUPPORTED. draft4/format-assertion: DRAFT_UNSUPPORTED. draft6/base: PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%). draft6/format-assertion: PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%). draft7/base: DRAFT_UNSUPPORTED. draft7/format-assertion: DRAFT_UNSUPPORTED. draft2019-09/base: DRAFT_UNSUPPORTED. draft2019-09/format-assertion: DRAFT_UNSUPPORTED. draft2020-12/base: DRAFT_UNSUPPORTED. draft2020-12/format-assertion: DRAFT_UNSUPPORTED.
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): coverage 0/10. Reason: draft4/base: PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%). draft4/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%). draft6/base: PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%). draft6/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%). draft7/base: PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%). draft2019-09/base: PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%). draft2019-09/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%). draft2020-12/base: PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%). draft2020-12/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): coverage 0/10. Reason: draft4/base: PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%). draft4/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%). draft6/base: PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%). draft6/format-assertion: PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%). draft7/base: PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%). draft2019-09/base: DRAFT_UNSUPPORTED. draft2019-09/format-assertion: DRAFT_UNSUPPORTED. draft2020-12/base: DRAFT_UNSUPPORTED. draft2020-12/format-assertion: DRAFT_UNSUPPORTED.
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): coverage 0/10. Reason: draft4/base: PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%). draft4/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%). draft6/base: PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%). draft6/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%). draft7/base: PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%). draft2019-09/base: PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%). draft2019-09/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%). draft2020-12/base: PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%). draft2020-12/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

### All Drafts Cold execution

Leader global: [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) — Balanced score 100%

```mermaid
xychart horizontal
    title "All Drafts Cold execution Balanced score (Higher is better)"
    x-axis ["SchemaShield (1.2.0)", "z-schema (12.4.0)"]
    y-axis "Balanced score" 0 --> 100
    bar [100, 74.485]
```

| Validator | Base ops/s | Formats ops/s | Average ops/s | Base score | Formats score | Balanced score |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | 14,884 | 16,608 | 15,746 | 100% | 100% | 100% |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | 10,887 | 12,279 | 11,583 | 74.4% | 74.5% | 74.5% |

Excluded from this ranking:

- [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1): coverage 0/10. Reason: draft4/base: PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%). draft4/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 201/206 < 98%). draft6/base: DRAFT_UNSUPPORTED. draft6/format-assertion: DRAFT_UNSUPPORTED. draft7/base: PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 485/587 < 98%). draft2019-09/base: PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%). draft2019-09/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 549/655 < 98%). draft2020-12/base: PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%). draft2020-12/format-assertion: PASS_THRESHOLD_NOT_MET(base 1412/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 556/667 < 98%).
- [ajv](https://www.npmjs.com/package/ajv) (8.20.0): coverage 4/10. Reason: draft7/base: PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%). draft2019-09/base: PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%). draft2019-09/format-assertion: PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%). draft2020-12/base: PASS_THRESHOLD_NOT_MET(base 1389/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%). draft2020-12/format-assertion: PASS_THRESHOLD_NOT_MET(base 1389/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7): coverage 0/10. Reason: draft4/base: PHASE_UNAVAILABLE. draft4/format-assertion: PHASE_UNAVAILABLE. draft6/base: PHASE_UNAVAILABLE. draft6/format-assertion: PHASE_UNAVAILABLE. draft7/base: PHASE_UNAVAILABLE. draft7/format-assertion: PHASE_UNAVAILABLE. draft2019-09/base: PHASE_UNAVAILABLE. draft2019-09/format-assertion: PHASE_UNAVAILABLE. draft2020-12/base: PHASE_UNAVAILABLE. draft2020-12/format-assertion: PHASE_UNAVAILABLE.
- [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3): coverage 4/10. Reason: draft7/base: PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 500/587 < 98%). draft2019-09/base: PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%). draft2019-09/format-assertion: PASS_THRESHOLD_NOT_MET(base 1382/1417 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 565/655 < 98%). draft2020-12/base: PASS_THRESHOLD_NOT_MET(base 1391/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%). draft2020-12/format-assertion: PASS_THRESHOLD_NOT_MET(base 1391/1457 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 567/667 < 98%).
- [djv](https://www.npmjs.com/package/djv) (2.1.4): coverage 0/10. Reason: draft4/base: DRAFT_UNSUPPORTED. draft4/format-assertion: DRAFT_UNSUPPORTED. draft6/base: PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%). draft6/format-assertion: PASS_THRESHOLD_NOT_MET(base 807/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 217/273 < 98%). draft7/base: DRAFT_UNSUPPORTED. draft7/format-assertion: DRAFT_UNSUPPORTED. draft2019-09/base: DRAFT_UNSUPPORTED. draft2019-09/format-assertion: DRAFT_UNSUPPORTED. draft2020-12/base: DRAFT_UNSUPPORTED. draft2020-12/format-assertion: DRAFT_UNSUPPORTED.
- [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2): coverage 0/10. Reason: draft4/base: PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%). draft4/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 117/206 < 98%). draft6/base: PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%). draft6/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 179/273 < 98%). draft7/base: PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 411/587 < 98%). draft2019-09/base: PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%). draft2019-09/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 477/655 < 98%). draft2020-12/base: PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%). draft2020-12/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 487/667 < 98%).
- [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0): coverage 0/10. Reason: draft4/base: PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%). draft4/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 183/206 < 98%). draft6/base: PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%). draft6/format-assertion: PASS_THRESHOLD_NOT_MET(base 922/945 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 248/273 < 98%). draft7/base: PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(base 1011/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 458/587 < 98%). draft2019-09/base: DRAFT_UNSUPPORTED. draft2019-09/format-assertion: DRAFT_UNSUPPORTED. draft2020-12/base: DRAFT_UNSUPPORTED. draft2020-12/format-assertion: DRAFT_UNSUPPORTED.
- [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0): coverage 0/10. Reason: draft4/base: PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%). draft4/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 196/206 < 98%). draft6/base: PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%). draft6/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 263/273 < 98%). draft7/base: PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%). draft7/format-assertion: PASS_THRESHOLD_NOT_MET(base 1013/1045 < 98%), PASS_THRESHOLD_NOT_MET(format-assertion 421/587 < 98%). draft2019-09/base: PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%). draft2019-09/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 485/655 < 98%). draft2020-12/base: PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%). draft2020-12/format-assertion: PASS_THRESHOLD_NOT_MET(format-assertion 488/667 < 98%).

## How to read these results

Setup tables use one draft-scoped median and normalize it against the fastest eligible Setup median. Execution and Cold execution tables normalize Base and Formats against the fastest eligible median in each profile. Their Balanced score is the geometric mean of those two normalized scores and determines the draft leader and row order.

All Drafts Setup shows a raw Setup ops/s index that sums the 5 draft medians and a Setup score that uses their normalized geometric mean. Execution and Cold execution show Base and Formats indices, their arithmetic Average ops/s index, and a Balanced score across 10 scopes.

Setup error links open COMPILE records. Cold execution and Execution error links open RUNTIME records. COMPILE remains a conformance status and does not name a performance phase.

N/A marks an unavailable measurement. Setup N/A identifies a validate-only API or unavailable setup measurement. Cold execution N/A identifies a provider whose state cannot be isolated under the direct fresh-operation contract.

Setup charts plot Setup score. Execution and Cold execution charts plot Balanced score. All Drafts tables retain raw summed ops/s indices for diagnosis, while eligibility excludes incomplete participants.

## Detailed draft summaries

- [draft4 detailed summary](results/draft4/summary.md)
- [draft6 detailed summary](results/draft6/summary.md)
- [draft7 detailed summary](results/draft7/summary.md)
- [draft2019-09 detailed summary](results/draft2019-09/summary.md)
- [draft2020-12 detailed summary](results/draft2020-12/summary.md)

## Methodology

### Participants

Period: 2026-07-20 through 2026-07-26. Retrieved at 2026-07-31T05:01:12.902Z.

Each row binds observed adapter behavior to the pinned package version. Weekly downloads show npm adoption volume for the snapshot period. `module-global-unavailable` means Cold execution is N/A because a fresh adapter wrapper cannot isolate provider state.

| Validator | API | Cold isolation | Dynamic code | Weekly downloads |
| --- | --- | --- | --- | ---: |
| [ajv](https://www.npmjs.com/package/ajv) (8.20.0) | reusable-sync | fresh-instance | observed | 351,242,149 |
| [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) | reusable-sync | fresh-instance | not-observed | 5,891,999 |
| [djv](https://www.npmjs.com/package/djv) (2.1.4) | reusable-sync | fresh-instance | observed | 81,251 |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) | reusable-async | module-global-unavailable | not-observed | 247,240 |
| [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) | reusable-sync | fresh-instance | not-observed | 513,747 |
| [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) | validate-only | fresh-instance | not-observed | 6,227,344 |
| [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) | reusable-sync | fresh-instance | observed | 7,551,204 |
| [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0) | reusable-sync | fresh-instance | not-observed | 261 |
| [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) | reusable-sync | fresh-instance | observed | 4,742,721 |
| [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0) | reusable-sync | fresh-instance | not-observed | 3,436,312 |

- `reusable-sync`: prepares a reusable callable synchronously.
- `reusable-async`: resolves asynchronous setup before exposing a reusable callable.
- `validate-only`: exposes validation through the adapter without a separate reusable compile result.
- `fresh-instance`: each fresh adapter creates isolated provider state.
- `module-global-unavailable`: module-global provider state cannot satisfy the fresh-isolation contract, so Cold execution is `N/A`.
- `observed`: the exercised adapter route uses dynamic code generation.
- `not-observed`: the exercised adapter route did not use dynamic code generation.

Dynamic code describes the route exercised by the adapter at the pinned version, not every path available in the package.

### Participants by draft

Every participant listed for a draft runs conformance in both `base` and `format-assertion`. One atomic roster per draft governs both profiles. Setup intersects that roster with participants that expose reusable compilation. Cold execution excludes providers whose state cannot be isolated. Participant links use the pinned package names and versions recorded in `results/packages.json`.

- **draft4:** [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1), [ajv](https://www.npmjs.com/package/ajv) (8.20.0), [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7), [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3), [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0), [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2), [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0), [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0), [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0)
- **draft6:** [ajv](https://www.npmjs.com/package/ajv) (8.20.0), [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7), [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3), [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0), [djv](https://www.npmjs.com/package/djv) (2.1.4), [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2), [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0), [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0), [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0)
- **draft7:** [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1), [ajv](https://www.npmjs.com/package/ajv) (8.20.0), [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7), [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3), [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0), [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2), [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0), [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0), [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0)
- **draft2019-09:** [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1), [ajv](https://www.npmjs.com/package/ajv) (8.20.0), [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7), [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3), [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0), [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2), [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0), [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0)
- **draft2020-12:** [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1), [ajv](https://www.npmjs.com/package/ajv) (8.20.0), [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7), [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3), [schema-shield](https://www.npmjs.com/package/schema-shield) (1.2.0), [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2), [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0), [z-schema](https://www.npmjs.com/package/z-schema) (12.4.0)

### Profiles

For draft4, draft6 and draft7, `base` contains the standard suite outside the official optional format assertion directories, including each draft's core format behavior. `format-assertion` contains the official `optional/format/*` cases.

For draft2019-09 and draft2020-12, `base` treats `format` as an annotation. `format-assertion` enables the official optional format assertion cases. Draft2020-12 also includes its `optional/format-assertion` suite in that profile.

```mermaid
flowchart TD
    A["We maintain a fixed JSON Schema suite"] --> B["We run five drafts"]
    B --> C["We evaluate Base and Formats"]
    C --> D["We measure conformance for every validator"]
    D --> E{"We apply the configurable eligibility gate (98% default)"}
    E -->|Eligible| F["We add the validator to the draft roster"]
    E -->|Below gate| G["We publish diagnostic results"]
    F --> H["We build the common PASS corpus"]
    H --> I["We measure Setup with deduplicated fresh construction"]
    H --> J["We measure Execution with prepared validation context"]
    H --> Q["We measure Cold execution directly per case"]
    I --> K["We publish one normalized Setup score per draft"]
    J --> K
    Q --> K
    K --> L{"Does the validator qualify across all five drafts?"}
    L -->|Below gate| G
    L -->|Yes| M["We consolidate validators that qualify across all five drafts"]
    M --> N["We publish All Drafts Setup, Execution and Cold execution"]
    N --> O["We normalize scope medians"]
    O --> P["We calculate geometric scores with equal weight per scope"]
```

### Conformance and common PASS corpus

We measure conformance for every configured validator against every discovered case in Base and Formats. We preserve each `PASS`, `WRONG`, `COMPILE`, `RUNTIME` and `UNSUPPORTED` result in the reports and participant matrix.

We calculate the Base and Formats PASS fractions independently. We compare exact integer fractions and require each fraction to reach the configured 98% gate. Every non-PASS status reduces its profile fraction. We add a validator to one atomic draft roster when both profiles reach the gate. Execution uses that roster directly. Setup intersects it with validators that expose reusable compilation. Cold execution intersects it with adapters that provide fresh isolated state.

We retain every excluded validator and its exact reasons in diagnostic results. We build each common phase corpus from cases where every validator in that phase roster reports `PASS`. A ranking requires at least two qualified competitors. Smaller rosters publish `INSUFFICIENT_COMPETITORS`; competitive leader, relative score, and chart fields start with two competitors.

We publish two hashes for each phase intersection. The performance identity hash covers the policy, relevant suite and format configuration, eligible roster, and common corpus. Compatible performance cache entries share this identity. The artifact hash also covers excluded-roster diagnostics, mutations, and all source-report hashes.
Each performance sample records the validator runtime hash that produced it. A partial refresh preserves that hash on omitted baseline samples, while `results/environment.json` publishes the runtime provenance by scope and validator. This prevents an old sample from inheriting the current runtime identity by presentation alone.

### Setup

We measure one complete fresh construction per Setup operation: adapter factory and context creation, vendor construction, format and metaschema registration, resource registration, and schema compilation. Each draft unions the effective operations represented by Base and Formats, then deduplicates them by transformed schema, transitive resource closure and effective adapter configuration. A profile label alone does not create another operation. We prepare neutral disposable copies before the clock starts. Primitive schemas, including `true` and `false`, enter each fresh adapter directly. Setup `N/A` identifies a validate-only API or unavailable setup measurement.

### Execution

Before the Execution clock starts, reusable adapters prepare their callable and `validate-only` adapters prepare their adapter context, profiled schema and correctness-check data. During each measured complete-corpus pass, reusable adapters call the prepared callable, while `validate-only` adapters call the vendor API through their prepared adapter context. Each worker and round owns one isolated mutable measurement set. Any boolean result change or memory-budget violation fails the sample.

### Cold execution

Cold execution measures each case directly. Before the operation clock, the runner clones the schema and data, constructs and clones the resource closure, applies the format profile and analyzes schema capabilities. The timed operation creates a fresh adapter and provider context, applies integration-owned configuration and registration, obtains the callable or validate-only equivalent, validates once and ends when validation returns. Result comparison, checksum, diagnostics and telemetry remain outside the clock. The runner never derives this rate from Setup or Execution and never rewrites `$id` or references. Hyperjump is N/A because its pinned API stores schema and format state in module globals that a fresh adapter wrapper cannot isolate.

### Timing and scoring

Quick runs complete conformance, one performance round without warmup, and a reduced deterministic performance corpus selected by SHA-256 case-ID rank. It caps each scope at 6 deduplicated Setup entries and 12 execution cases, preserves valid and invalid cases, and records selection hashes and counts in `results/environment.json` and each phase's `samples.json`. Quick is diagnostic and does not define the canonical publication.

Full runs complete conformance and the complete common performance corpus under the canonical contract. Each phase warms complete corpus passes for at least 100 ms, then measures complete passes toward a 250 ms target with a normal minimum of 175 ms. A pass that exceeds the target remains valid because the runner never truncates a corpus pass. Each active validator receives six isolated samples in three antithetic pairs. The pair rotations use deterministic offsets 0, floor(n / 3), and floor(2n / 3) for the eligible roster size n, so every participant has the same mean position. Reports use their median for ranking and scoring and publish the arithmetic mean, relative median absolute deviation, sample coefficient of variation, minimum, maximum and all six rates. Compatible before-and-after analysis may pair the same rounds, but the runner makes no automatic significance claim. Run Full only for the final publication, after tests and Quick are stable.

Higher ops/s is better. Each scope reports all six round rates, uses their median for ranking and scoring, and publishes the arithmetic mean, relative median absolute deviation, sample coefficient of variation, minimum and maximum as diagnostics. We calculate the scoped relative Score as `median / bestMedian * 100`, a normalized relative performance index. Compatible before-and-after analysis may pair the same rounds and inspect their ratios, but the runner makes no automatic significance claim. The best scoped median scores exactly 100%, and rows sort by median ops/s descending with validator ID for deterministic ties.

Setup draft tables normalize one median against the eligible draft reference. All Drafts Setup sums five medians as a diagnostic index and ranks by the geometric mean of five normalized ratios. Execution and Cold execution retain Base and Formats normalization, their raw global indices and the ten-scope Balanced score. We keep N/A measurements last.

For All Drafts, we require atomic eligibility at 98% in Base and Formats across all five drafts. Setup uses one reference per draft and calculates Setup score as the five-scope geometric mean. Execution and Cold execution calculate Base score and Formats score as five-scope geometric means, then calculate Balanced score as the ten-scope geometric mean with equal weight per scope. Each ranking uses its normalized score with validator ID as the deterministic tie-breaker. Raw summed indices remain diagnostic. A validator scores 100 only by matching every relevant scope reference.

### Mutations

Conformance detects schema, data, and resource mutations on disposable copies. We deduplicate findings by `(validator, draft, scope, subjectId, mutationTarget, mutationClass, difference)` and retain every event in JSON. Each validator report renders the first 10 findings in deterministic order, states its omitted count, and links readers to the complete JSON record. Setup, Execution and Cold execution use separate copies. Performance rankings use throughput and score metrics.

### Using the bench to improve a validator

Use this procedure for one validator:

1. Establish a diagnostic baseline with `npm test`, then `npm run benchmark -- --quick`.
2. Inspect `results/<draft>/conformance/<canonical-id>.json` and its Markdown companion. `WRONG` means the validator returned the opposite boolean. `COMPILE` means a reusable adapter rejected the schema before validation. `RUNTIME` means validation, validate-only setup or detailed error extraction failed.
3. Choose the phase that matches the suspected cost. Setup isolates fresh provider construction, registration and compilation. Cold execution measures fresh setup plus one validation per case. Execution measures repeated validation through a prepared reusable callable or a prepared `validate-only` adapter context.
4. Inspect `results/<draft>/setup/samples.json` for Setup or `results/<draft>/profiles/<profile>/<phase>/samples.json` for Execution and Cold execution. Compare each round's `operations`, `actualElapsedMilliseconds`, throughput and `memory.peak.rss`, then confirm Peak RSS, the intersection hash, the performance identity and the benchmark contract hash before attributing a change.
5. Keep the units separate. Raw rates belong to one scope. Scoped and Balanced relative scores compare eligible validators against their scope references. The global ops/s indices sum scope medians and serve as diagnostic indices rather than one directly measured workload.
6. Before changing the validator, copy the relevant baseline artifacts outside `results/` so a refresh cannot replace them, and record the benchmark contract hash, intersection and performance identities, and baseline values for the exact draft, profile and phase under analysis.
7. Keep the pinned corpus, target and adapter options fixed, make one validator change, then run `npm run benchmark -- --quick --validator <canonical-id>` when a complete compatible Quick publication exists. This command produces only the post-change state; it does not calculate a before/after comparison. Compare that post-change state with the preserved baseline for exactly the same draft, profile and phase.
8. A complete Quick run is required after changes to the environment, benchmark contract, suite, locks, threshold, rounds, roster, eligibility or common PASS corpus. It also establishes a new diagnostic baseline when no compatible Quick publication exists.
9. Run `npm run benchmark` only after the implementation, tests and Quick results are stable. Full is reserved for the final publication.

### Memory

We record Peak RSS as the maximum absolute resident-set size across valid rounds in a scope. Draft tables take the maximum across profiles, while All Drafts JSON takes the maximum across all valid scopes. Markdown renders MiB, JSON stores integer bytes as `peakRssBytes`, and missing samples remain `N/A`. Rankings and charts use throughput and score metrics.

### Reproducibility

We pin the npm dependency graph, npm metadata snapshot, and JSON Schema Test Suite commit and tree. We keep the suite checkout and resumable checkpoints under `.cache/`, and we record package, corpus, intersection and sample hashes in the generated artifacts.

On a clean clone, we use `npm ci` for exact dependencies and `npm test` for the local suite. `npm run benchmark` prepares the pinned suite checkout and runs Full. The `--quick` flag uses the same suite with a reduced performance corpus. Only `npm run metadata:sync` refreshes npm metadata. We stage and validate Quick diagnostics or the Full publication contract before a coordinated transactional publication of `README.md` and `results/`. The transaction rolls back failures before both paths commit. Because the public layout has two root paths, concurrent readers can observe the rename window.

Canonical results come from a controlled Linux host. CI validates tests and artifact integrity. Record the environment and benchmark contract hash for every published run.

## Status definitions

- `PASS`: observed validation matches the suite expectation.
- `WRONG`: the validator returned the opposite boolean.
- `COMPILE`: the reusable profile rejected the schema.
- `RUNTIME`: validation threw or fast and detailed profiles diverged.
- `UNSUPPORTED`: the common preflight or adapter declared a known unsupported capability.

The global conformance table reports PASS percentage for every draft and profile. Total divides PASS by the complete canonical denominator across all five drafts and both profiles. Unsupported scopes contribute zero PASS and keep their cases in the denominator. Rows sort by Total descending with validator ID as the stable tie-breaker.

## Results

- `results/index.json` records the result format, benchmark mode, drafts and profiles.
- `results/environment.json` records the current runtime, hashes, and sample runtime provenance by scope and validator.
- `results/packages.json` records package versions, tarballs, and integrities.
- `results/validators.json` records validator profiles.
- `results/global-summary.json` records All Drafts rankings for Setup, Execution and Cold execution. Setup contains five draft medians, a summed Setup ops/s index and a five-scope geometric score. The other phases retain Base, Formats, Average and Balanced fields.
- `results/global-errors/` contains the exact records summed by each linked all-drafts error count, including explicit zero-record pages.
- `results/mutations/` contains one bounded Markdown mutation report for each validator with recorded mutations plus a hashed inventory. Each report renders at most 10 deterministic event details while its total and the JSON results remain complete.
- `results/<draft>/conformance/` contains full JSON and Markdown reports.
- `results/<draft>/intersections/setup.*` and `results/<draft>/setup/` contain the unified Setup intersection, samples and summary.
- `results/<draft>/profiles/<profile>/intersections/` contains Execution and Cold execution eligibility, rosters, hashes and intersections.
- `results/<draft>/profiles/<profile>/<phase>/` contains Execution or Cold execution samples and summaries for the exact eligible roster.
- `results/<draft>/summary.md` contains rankings per profile.
- `results/summary.md` indexes all configured drafts.

## Contributing

[Read the contribution guide](contribute.md)

## Licensing and third-party materials

Original code and documentation are Copyright Masquerade Circus and licensed under [Apache-2.0](LICENSE).

The benchmark corpus comes from the JSON Schema Test Suite. JSON Schema Test Suite commit: `0c7b65dc16dd8eaa7bd83e21099c76610c3b246a`. Copyright (c) 2012 Julian Berman. The corpus remains under the MIT License. See [THIRD_PARTY_NOTICES](THIRD_PARTY_NOTICES) for its full terms and attribution.

Dependencies, bundled metaschema snapshots, and other third-party materials retain their own licenses. The third-party notices also point to the existing AJV and Redocly AJV metaschema notices.
