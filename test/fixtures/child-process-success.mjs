import assert from "node:assert/strict";
import test from "node:test";

import { eligibilityThresholdFromEnvironment } from "../../src/eligibility.js";

test("controlled harness success", () => {
  assert.equal(process.env.BENCHMARK_RESULTS_ROOT, undefined);
  assert.equal(process.env.BENCHMARK_PIPELINE_STARTED_AT, undefined);
  assert.equal(process.env.BENCHMARK_ELIGIBILITY_THRESHOLD_PERCENT, undefined);
  assert.equal(eligibilityThresholdFromEnvironment().percent, "98");
});
