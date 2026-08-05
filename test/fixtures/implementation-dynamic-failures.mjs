import { spawnSync } from "node:child_process";
import vm from "node:vm";
import { Worker } from "node:worker_threads";

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const GeneratorFunction = Object.getPrototypeOf(function* () {}).constructor;
const AsyncGeneratorFunction = Object.getPrototypeOf(async function* () {}).constructor;

for (const failure of [
  () => eval("("),
  () => Function("("),
  () => AsyncFunction("("),
  () => GeneratorFunction("("),
  () => AsyncGeneratorFunction("("),
  () => new vm.Script("("),
  () => new Worker(null)
]) {
  try {
    failure();
  } catch {
    // Each call is a controlled failed attempt.
  }
}

try {
  await WebAssembly.compile(Uint8Array.from([1, 2]));
} catch {
  // Controlled malformed module.
}

try {
  await import("data:text/javascript,export default (");
} catch {
  // Controlled parse failure.
}

const child = spawnSync(process.execPath, ["-e", "process.exit(3)"], {
  encoding: "utf8"
});
if (child.status !== 3) {
  throw new Error("controlled child failure did not occur");
}

process.stdout.write("failed-as-expected\n");
