import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const setPhase = globalThis[
  Symbol.for("json-schema-validator-bench.implementation-phase")
];
if (typeof setPhase !== "function") {
  throw new Error("implementation phase control is unavailable");
}

const child = spawn(process.execPath, ["-e", "Function('return 42')()"], {
  cwd: fileURLToPath(new URL("./missing-phase-origin-cwd", import.meta.url))
});
setPhase("api-setup");
await new Promise((resolve) => child.once("close", resolve));
process.stdout.write("phase-shifted\n");
