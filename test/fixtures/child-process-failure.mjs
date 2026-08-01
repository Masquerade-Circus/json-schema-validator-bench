import assert from "node:assert/strict";
import test from "node:test";

process.stdout.write("CONTROLLED_CHILD_STDOUT\n");
process.stderr.write("CONTROLLED_CHILD_STDERR\n");

test("controlled child failure", () => {
  assert.fail("CONTROLLED_CHILD_ASSERTION");
});
