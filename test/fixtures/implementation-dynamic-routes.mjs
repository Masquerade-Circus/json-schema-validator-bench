import {
  exec,
  execFile,
  execFileSync,
  execSync,
  fork,
  spawn,
  spawnSync
} from "node:child_process";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

import { dependencyDynamicRoutes } from "./implementation-dynamic-dependency.mjs";

const lexical = 41;
const directEval = eval("lexical + 1");
const indirectEval = (0, eval)("40 + 2");

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const GeneratorFunction = Object.getPrototypeOf(function* () {}).constructor;
const AsyncGeneratorFunction = Object.getPrototypeOf(async function* () {}).constructor;
const functionValue = Function("return 42")();
const asyncFunctionValue = await AsyncFunction("return 42")();
const generatorFunctionValue = GeneratorFunction("yield 42")().next().value;
const asyncGeneratorFunctionValue = (await AsyncGeneratorFunction("yield 42")().next()).value;

for (const compileFailure of [
  () => eval("("),
  () => Function("("),
  () => AsyncFunction("("),
  () => GeneratorFunction("("),
  () => AsyncGeneratorFunction("("),
  () => new vm.Script("(")
]) {
  try {
    compileFailure();
  } catch {
    // The fixture requires controlled failures for outcome attribution.
  }
}

const vmValue = vm.runInNewContext("40 + 2");
const validWasm = Uint8Array.from([0, 97, 115, 109, 1, 0, 0, 0]);
await WebAssembly.compile(validWasm);
try {
  await WebAssembly.compile(Uint8Array.from([1, 2]));
} catch {
  // Controlled malformed module.
}

const dataImport = await import("data:text/javascript,export default 42");
try {
  await import("data:text/javascript,export default (");
} catch {
  // Controlled syntax failure.
}

const workerExecArgv = await new Promise((resolve, reject) => {
  const worker = new Worker(
    new URL("./implementation-worker-child.mjs", import.meta.url),
    { execArgv: [] }
  );
  worker.once("message", resolve);
  worker.once("error", reject);
  worker.once("exit", (code) => {
    if (code !== 0) {
      reject(new Error(`worker exited ${code}`));
    }
  });
});
const workerWithFlagsExecArgv = await new Promise((resolve, reject) => {
  const worker = new Worker(
    fileURLToPath(new URL("./implementation-worker-child.mjs", import.meta.url)),
    { execArgv: ["--no-warnings"] }
  );
  worker.once("message", resolve);
  worker.once("error", reject);
  worker.once("exit", (code) => {
    if (code !== 0) {
      reject(new Error(`worker with flags exited ${code}`));
    }
  });
});
const preloadIndex = process.execArgv.findIndex((value) => value === "--import");
const instrumentationPreloadUrl = process.execArgv[preloadIndex + 1];
if (preloadIndex < 0 || typeof instrumentationPreloadUrl !== "string") {
  throw new Error("fixture instrumentation preload is absent");
}
const workerWithExistingPreloadExecArgv = await new Promise((resolve, reject) => {
  const worker = new Worker(
    new URL("./implementation-worker-child.mjs", import.meta.url),
    {
      execArgv: ["--no-warnings", "--import", instrumentationPreloadUrl]
    }
  );
  worker.once("message", resolve);
  worker.once("error", reject);
  worker.once("exit", (code) => {
    if (code !== 0) {
      reject(new Error(`worker with existing preload exited ${code}`));
    }
  });
});
try {
  new Worker(null);
} catch {
  // Controlled constructor failure.
}

const successfulChild = spawnSync(process.execPath, ["-e", "1"], {
  encoding: "utf8"
});
const failedChild = spawnSync(process.execPath, ["-e", "process.exit(3)"], {
  encoding: "utf8"
});
if (successfulChild.status !== 0 || failedChild.status !== 3) {
  throw new Error("controlled child outcomes differ from the fixture contract");
}
await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, ["-e", "Function('return 42')()"]);
  child.once("error", reject);
  child.once("exit", (code) => code === 0
    ? resolve()
    : reject(new Error(`spawn exited ${code}`)));
});
const missingCwd = fileURLToPath(new URL("./missing-child-cwd", import.meta.url));
const syncSpawnStartupResult = spawnSync(
  process.execPath,
  ["-e", "Function('return 42')()"],
  { cwd: missingCwd, encoding: "utf8" }
);
const syncSpawnStartup = {
  error: syncSpawnStartupResult.error instanceof Error,
  status: syncSpawnStartupResult.status
};
const asyncSpawnStartup = await new Promise((resolve) => {
  const observed = { errors: 0, closes: 0 };
  const child = spawn(process.execPath, ["-e", "Function('return 42')()"], {
    cwd: missingCwd
  });
  child.on("error", () => {
    observed.errors += 1;
  });
  child.on("close", () => {
    observed.closes += 1;
    resolve(observed);
  });
});
let synchronousSpawnThrow = false;
try {
  spawn(process.execPath, ["-e", "Function('return 42')()"], {
    stdio: "invalid"
  });
} catch {
  synchronousSpawnThrow = true;
}
await new Promise((resolve, reject) => {
  execFile(
    process.execPath,
    ["-e", "Function('return 42')()"],
    (error) => error === null ? resolve() : reject(error)
  );
});
const asyncExecFileStartup = await new Promise((resolve) => {
  const observed = { errors: 0, closes: 0, callbacks: 0 };
  const child = execFile(
    process.execPath,
    ["-e", "Function('return 42')()"],
    { cwd: missingCwd },
    () => {
      observed.callbacks += 1;
    }
  );
  child.on("error", () => {
    observed.errors += 1;
  });
  child.on("close", () => {
    observed.closes += 1;
    resolve(observed);
  });
});
execFileSync(process.execPath, ["-e", "Function('return 42')()"]);
let synchronousExecFileThrow = false;
try {
  execFileSync(process.execPath, ["-e", "Function('return 42')()"], {
    stdio: "invalid"
  });
} catch {
  synchronousExecFileThrow = true;
}

const forkExecArgv = await new Promise((resolve, reject) => {
  const child = fork(
    new URL("./implementation-fork-child.mjs", import.meta.url),
    [],
    { execArgv: [], silent: true }
  );
  child.once("message", resolve);
  child.once("error", reject);
  child.once("exit", (code) => {
    if (code !== 0) {
      reject(new Error(`fork exited ${code}`));
    }
  });
});
const forkWithoutOptionsExecArgv = await new Promise((resolve, reject) => {
  const child = fork(
    fileURLToPath(new URL("./implementation-fork-child.mjs", import.meta.url))
  );
  child.once("message", resolve);
  child.once("error", reject);
  child.once("exit", (code) => {
    if (code !== 0) {
      reject(new Error(`fork without options exited ${code}`));
    }
  });
});
let malformedForkThrew = false;
try {
  fork(
    fileURLToPath(new URL("./implementation-fork-child.mjs", import.meta.url)),
    [],
    { execArgv: "malformed", silent: true }
  );
} catch {
  malformedForkThrew = true;
}
const forkStartup = await new Promise((resolve) => {
  const observed = { errors: 0, closes: 0 };
  const child = fork(
    fileURLToPath(new URL("./implementation-fork-child.mjs", import.meta.url)),
    [],
    { cwd: missingCwd, execArgv: [], silent: true }
  );
  child.on("error", () => {
    observed.errors += 1;
  });
  child.on("close", () => {
    observed.closes += 1;
    resolve(observed);
  });
});

const parserCode = "process.stdout.write(JSON.stringify({execArgv:process.execArgv,argv:process.argv.slice(1)}))";
function parseInlineResult(args) {
  const result = spawnSync(process.execPath, args, { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`parser child exited ${result.status}`);
  }
  return JSON.parse(result.stdout);
}
const flagsBeforeInline = parseInlineResult(["--no-warnings", "-e", parserCode]);
const evalEquals = parseInlineResult([`--eval=${parserCode}`]);
const preloadBeforeInline = parseInlineResult([
  "--import",
  instrumentationPreloadUrl,
  "--eval",
  parserCode
]);
const preloadAfterInline = parseInlineResult([
  "-e",
  parserCode,
  "--import",
  instrumentationPreloadUrl
]);
const entrypointResult = spawnSync(
  process.execPath,
  [
    fileURLToPath(new URL("./implementation-node-entrypoint-child.mjs", import.meta.url)),
    "-e",
    "value"
  ],
  { encoding: "utf8" }
);
const separatorResult = spawnSync(process.execPath, ["--", "-e", "value"], {
  encoding: "utf8"
});
const malformedInlineResult = spawnSync(process.execPath, ["-e"], {
  encoding: "utf8"
});

const inlineCommand = `${JSON.stringify(process.execPath)} -e "process.stdout.write(String(Function('return 42')()))"`;
const execValue = await new Promise((resolve, reject) => {
  exec(inlineCommand, { encoding: "utf8" }, (error, stdout) => {
    if (error !== null) {
      reject(error);
      return;
    }
    resolve(stdout);
  });
});
const asyncExecStartup = await new Promise((resolve) => {
  const observed = { errors: 0, closes: 0, callbacks: 0 };
  const child = exec(
    inlineCommand,
    { cwd: missingCwd, encoding: "utf8" },
    () => {
      observed.callbacks += 1;
    }
  );
  child.on("error", () => {
    observed.errors += 1;
  });
  child.on("close", () => {
    observed.closes += 1;
    resolve(observed);
  });
});
const execSyncValue = execSync(inlineCommand, { encoding: "utf8" });
let synchronousExecThrow = false;
try {
  execSync(inlineCommand, { cwd: missingCwd, encoding: "utf8" });
} catch {
  synchronousExecThrow = true;
}
const nonNodeCommandValue = execSync("printf safe", { encoding: "utf8" });
const ambiguousCommandValue = execSync(
  "printf 'safe; node -e ambiguous'",
  { encoding: "utf8" }
);
const wrappedNodeCommandValue = execSync(
  "env node -e \"process.stdout.write('wrapped')\"",
  { encoding: "utf8" }
);

process.stdout.write(`${JSON.stringify({
  directEval,
  indirectEval,
  functionValue,
  asyncFunctionValue,
  generatorFunctionValue,
  asyncGeneratorFunctionValue,
    vmValue,
    dataImport: dataImport.default,
    workerExecArgv,
    workerWithFlagsExecArgv,
    workerWithExistingPreloadExecArgv,
    asyncSpawnStartup,
    syncSpawnStartup,
    synchronousSpawnThrow,
    asyncExecFileStartup,
    synchronousExecFileThrow,
    forkExecArgv,
    forkWithoutOptionsExecArgv,
    malformedForkThrew,
    forkStartup,
    flagsBeforeInline,
    evalEquals,
    preloadBeforeInline,
    preloadAfterInline,
    entrypoint: {
      status: entrypointResult.status,
      stdout: entrypointResult.stdout
    },
    separatorStatus: separatorResult.status,
    malformedInlineStatus: malformedInlineResult.status,
    asyncExecStartup,
    synchronousExecThrow,
    execValue,
    execSyncValue,
    nonNodeCommandValue,
    ambiguousCommandValue,
    wrappedNodeCommandValue,
    dependency: await dependencyDynamicRoutes()
})}\n`);
