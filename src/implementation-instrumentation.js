import childProcess from "node:child_process";
import { appendFileSync } from "node:fs";
import inspector from "node:inspector";
import { register, syncBuiltinESMExports } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";
import workerThreads, { threadId } from "node:worker_threads";

const eventPath = process.env.IMPLEMENTATION_EVIDENCE_EVENTS;
if (typeof eventPath !== "string" || eventPath.length === 0) {
  throw new Error("IMPLEMENTATION_EVIDENCE_EVENTS must name a controlled event file");
}

const preloadUrl = import.meta.url;
const dependencyUrls = JSON.parse(
  process.env.IMPLEMENTATION_EVIDENCE_DEPENDENCY_ROOTS ?? "[]"
).map((root) => pathToFileURL(root).href);
const processIdentity = process.env.IMPLEMENTATION_EVIDENCE_PROCESS_IDENTITY ?? "standalone";
const rootProcess = process.env.IMPLEMENTATION_EVIDENCE_PROPAGATED !== "1";
const phaseSymbol = Symbol.for("json-schema-validator-bench.implementation-phase");
const phases = new Set([
  "adapter-import",
  "api-setup",
  "api-validation",
  "isolation-aa",
  "isolation-bb",
  "isolation-aba",
  "isolation-bab"
]);
let currentPhase = phases.has(process.env.IMPLEMENTATION_EVIDENCE_PHASE)
  ? process.env.IMPLEMENTATION_EVIDENCE_PHASE
  : "adapter-import";
const capabilities = new Map();

function record(event, mechanism, fields = {}) {
  appendFileSync(
    eventPath,
    `${JSON.stringify({
      event,
      mechanism,
      ...fields,
      processIdentity,
      rootProcess,
      pid: process.pid,
      threadId
    })}\n`,
    { encoding: "utf8" }
  );
}

function setCapability(mechanism, status, limitation = null) {
  capabilities.set(mechanism, { status, limitation });
}

globalThis[phaseSymbol] = (phase) => {
  if (!phases.has(phase)) {
    throw new Error(`unsupported implementation evidence phase: ${phase}`);
  }
  currentPhase = phase;
  process.env.IMPLEMENTATION_EVIDENCE_PHASE = phase;
  record("phase", "instrumentation", { phase });
  for (const [mechanism, capability] of capabilities) {
    record("capability", mechanism, { phase, ...capability });
  }
  record("instrumentation-ready", "preload", { phase });
};

function attributionFromStack(stackTrace) {
  const callerUrl = stackTrace?.callFrames?.find(
    ({ url }) => typeof url === "string" && url.startsWith("file:")
  )?.url;
  if (typeof callerUrl !== "string") {
    return "runner";
  }
  return callerUrl.includes("/node_modules/") ||
    dependencyUrls.some((root) => callerUrl === root || callerUrl.startsWith(`${root}/`))
    ? "dependency"
    : "runner";
}

function attributionFromErrorStack(stack) {
  if (typeof stack !== "string") {
    return "runner";
  }
  return stack.includes("/node_modules/") ||
    dependencyUrls.some((root) => stack.includes(root) || stack.includes(fileURLToPath(root)))
    ? "dependency"
    : "runner";
}

function mechanismFromSource(url, source) {
  if (url.startsWith("data:")) {
    return "data-import";
  }
  if (url.startsWith("evalmachine.")) {
    return "node:vm";
  }
  if (source.startsWith("(async function* anonymous(")) {
    return "async-generator-function";
  }
  if (source.startsWith("(function* anonymous(")) {
    return "generator-function";
  }
  if (source.startsWith("(async function anonymous(")) {
    return "async-function";
  }
  if (source.startsWith("(function anonymous(")) {
    return "function";
  }
  return url.length === 0 ? "eval" : null;
}

const session = new inspector.Session();
let inspectorReady = false;
try {
  session.connect();
  for (const [protocolEvent, outcome] of [
    ["Debugger.scriptParsed", "succeeded"],
    ["Debugger.scriptFailedToParse", "failed"]
  ]) {
    session.on(protocolEvent, ({ params }) => {
      const phase = currentPhase;
      session.post(
        "Debugger.getScriptSource",
        { scriptId: params.scriptId },
        (error, result) => {
          if (error !== null) {
            return;
          }
          const mechanism = mechanismFromSource(params.url, result.scriptSource);
          if (mechanism === null) {
            return;
          }
          const attribution = attributionFromStack(params.stackTrace);
          record("mechanism", mechanism, {
            outcome: "attempted",
            attribution,
            phase
          });
          record("mechanism", mechanism, { outcome, attribution, phase });
        }
      );
    });
  }
  await new Promise((resolve, reject) => {
    session.post("Debugger.enable", {}, (error) => {
      if (error !== null) {
        reject(error);
        return;
      }
      resolve();
    });
  });
  inspectorReady = true;
} catch (error) {
  record("instrumentation-error", "inspector", {
    detail: error?.message ?? String(error)
  });
}

for (const mechanism of [
  "eval",
  "function",
  "async-function",
  "generator-function",
  "async-generator-function",
  "node:vm",
  "data-import"
]) {
  setCapability(
    mechanism,
    ["eval", "data-import"].includes(mechanism) && inspectorReady
      ? "limited"
      : inspectorReady
        ? "ready"
        : "unavailable",
    mechanism === "eval" && inspectorReady
      ? "inspector preserves lexical direct eval but cannot distinguish direct from indirect eval or confirm body completion"
      : mechanism === "data-import" && inspectorReady
        ? "loader hooks observe data URL resolution and inspector confirms parsed scripts but cannot confirm every parse or evaluation failure"
        : null
  );
}

function observedProxy(original, mechanism) {
  return new Proxy(original, {
    apply(target, thisArgument, argumentsList) {
      const phase = currentPhase;
      const attribution = attributionFromErrorStack(new Error().stack);
      record("mechanism", mechanism, { outcome: "attempted", attribution, phase });
      try {
        const result = Reflect.apply(target, thisArgument, argumentsList);
        if (result !== null && typeof result?.then === "function") {
          return result.then(
            (value) => {
              record("mechanism", mechanism, { outcome: "succeeded", attribution, phase });
              return value;
            },
            (error) => {
              record("mechanism", mechanism, { outcome: "failed", attribution, phase });
              throw error;
            }
          );
        }
        record("mechanism", mechanism, { outcome: "succeeded", attribution, phase });
        return result;
      } catch (error) {
        record("mechanism", mechanism, { outcome: "failed", attribution, phase });
        throw error;
      }
    },
    construct(target, argumentsList, newTarget) {
      const phase = currentPhase;
      const attribution = attributionFromErrorStack(new Error().stack);
      record("mechanism", mechanism, { outcome: "attempted", attribution, phase });
      try {
        const result = Reflect.construct(target, argumentsList, newTarget);
        record("mechanism", mechanism, { outcome: "succeeded", attribution, phase });
        return result;
      } catch (error) {
        record("mechanism", mechanism, { outcome: "failed", attribution, phase });
        throw error;
      }
    }
  });
}

if (typeof globalThis.WebAssembly === "object") {
  for (const name of [
    "Module",
    "compile",
    "compileStreaming",
    "instantiate",
    "instantiateStreaming"
  ]) {
    if (typeof WebAssembly[name] === "function") {
      WebAssembly[name] = observedProxy(WebAssembly[name], "webassembly");
    }
  }
  setCapability("webassembly", "ready");
} else {
  setCapability("webassembly", "unavailable");
}

for (const name of [
  "Script",
  "compileFunction",
  "runInContext",
  "runInNewContext",
  "runInThisContext"
]) {
  if (typeof vm[name] === "function") {
    vm[name] = observedProxy(vm[name], "node:vm");
  }
}

function withPreload(execArgv = []) {
  for (let index = 0; index < execArgv.length; index += 1) {
    if (
      execArgv[index] === `--import=${preloadUrl}` ||
      (execArgv[index] === "--import" && execArgv[index + 1] === preloadUrl)
    ) {
      return [...execArgv];
    }
  }
  return [...execArgv, "--import", preloadUrl];
}

function recordPropagationLimitation(
  route,
  limitation,
  routeMechanism = "node-inline-child",
  phase = currentPhase
) {
  for (const mechanism of new Set([routeMechanism, "propagation"])) {
    record("capability", mechanism, {
      phase,
      status: "limited",
      limitation,
      route
    });
  }
}

function observeAsyncChild(child, { mechanism, attribution, phase, route }) {
  let settled = false;
  const settle = (outcome, startupFailure = false) => {
    if (settled) {
      return;
    }
    settled = true;
    if (startupFailure) {
      recordPropagationLimitation(
        route,
        `${route} failed before preload propagation could be confirmed`,
        mechanism,
        phase
      );
    }
    record("mechanism", mechanism, { outcome, attribution, phase, route });
  };
  child.once("error", () => settle("failed", true));
  child.once("exit", (code) => settle(code === 0 ? "succeeded" : "failed"));
  child.once("close", (code) => settle(code === 0 ? "succeeded" : "failed"));
  return child;
}

function preloadBeforeInlineArguments(args) {
  const inlineIndex = inlineNodeArgumentIndex(args);
  if (inlineIndex === -1) {
    return [...args];
  }
  for (let index = 0; index < inlineIndex; index += 1) {
    if (
      args[index] === `--import=${preloadUrl}` ||
      (
        args[index] === "--import" &&
        index + 1 < inlineIndex &&
        args[index + 1] === preloadUrl
      )
    ) {
      return [...args];
    }
  }
  return [
    ...args.slice(0, inlineIndex),
    "--import",
    preloadUrl,
    ...args.slice(inlineIndex)
  ];
}

const OriginalWorker = workerThreads.Worker;
if (typeof OriginalWorker === "function") {
  workerThreads.Worker = new Proxy(OriginalWorker, {
    construct(target, argumentsList, newTarget) {
      const phase = currentPhase;
      const attribution = attributionFromErrorStack(new Error().stack);
      record("mechanism", "worker", { outcome: "attempted", attribution, phase });
      try {
        const options = argumentsList[1];
        const callerExecArgv = options?.execArgv ?? process.execArgv;
        if (!Array.isArray(callerExecArgv)) {
          recordPropagationLimitation(
            "worker",
            "Worker execArgv was not an array and the mandatory preload could not be merged safely",
            "worker",
            phase
          );
          return Reflect.construct(target, argumentsList, newTarget);
        }
        const effectiveArguments = options === undefined || (
          options !== null && typeof options === "object" && !Array.isArray(options)
        )
          ? [
              argumentsList[0],
              {
                ...(options ?? {}),
                execArgv: withPreload(callerExecArgv)
              }
            ]
          : argumentsList;
        const worker = Reflect.construct(target, effectiveArguments, newTarget);
        let settled = false;
        worker.once("online", () => {
          settled = true;
          record("mechanism", "worker", {
            outcome: "succeeded",
            attribution,
            phase
          });
        });
        worker.once("error", () => {
          if (!settled) {
            settled = true;
            recordPropagationLimitation(
              "worker",
              "Worker failed before preload propagation could be confirmed",
              "worker",
              phase
            );
            record("mechanism", "worker", {
              outcome: "failed",
              attribution,
              phase
            });
          }
        });
        return worker;
      } catch (error) {
        recordPropagationLimitation(
          "worker",
          "Worker construction failed before preload propagation could be confirmed",
          "worker",
          phase
        );
        record("mechanism", "worker", { outcome: "failed", attribution, phase });
        throw error;
      }
    }
  });
  setCapability("worker", "ready");
} else {
  setCapability("worker", "unavailable");
}

function isNodeCommand(command) {
  return command === process.execPath || /(?:^|[\\/])node(?:\.exe)?$/.test(command);
}

const nodeOptionsWithSeparateValue = new Set([
  "--experimental-loader",
  "--import",
  "--loader",
  "--require",
  "-r"
]);

function inlineNodeArgumentIndex(args) {
  if (!Array.isArray(args)) {
    return -1;
  }
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (typeof argument !== "string" || argument === "--") {
      return -1;
    }
    if (["-e", "--eval", "-p", "--print"].includes(argument)) {
      return typeof args[index + 1] === "string" ? index : -1;
    }
    if (
      ["-e=", "--eval=", "-p=", "--print="].some((prefix) =>
        argument.startsWith(prefix)
      )
    ) {
      return index;
    }
    if (nodeOptionsWithSeparateValue.has(argument)) {
      if (typeof args[index + 1] !== "string") {
        return -1;
      }
      index += 1;
      continue;
    }
    if (argument === "-" || !argument.startsWith("-")) {
      return -1;
    }
  }
  return -1;
}

function inlineNodeArguments(command, args) {
  if (!isNodeCommand(command) || !Array.isArray(args)) {
    return null;
  }
  return inlineNodeArgumentIndex(args) === -1 ? null : args;
}

function looksLikeInlineNodeShellCommand(command) {
  if (typeof command !== "string") {
    return false;
  }
  const hasNodeCommand = command.includes(process.execPath) ||
    /(?:^|[\s"';&|])node(?:\.exe)?(?:\s|$)/.test(command);
  return hasNodeCommand && /(?:^|\s)(?:-e|--eval|-p|--print)(?:=|\s)/.test(command);
}

function tokenizeSimpleShellCommand(command) {
  const tokens = [];
  let token = "";
  let quote = null;
  let escaped = false;
  const pushToken = () => {
    if (token.length > 0) {
      tokens.push(token);
      token = "";
    }
  };

  for (let index = 0; index < command.length; index += 1) {
    const character = command[index];
    if (escaped) {
      token += character;
      escaped = false;
      continue;
    }
    if (quote === "'") {
      if (character === "'") {
        quote = null;
      } else {
        token += character;
      }
      continue;
    }
    if (quote === '"') {
      if (character === '"') {
        quote = null;
      } else if (character === "\\") {
        escaped = true;
      } else {
        token += character;
      }
      continue;
    }
    if (character === "'" || character === '"') {
      quote = character;
      continue;
    }
    if (character === "\\") {
      escaped = true;
      continue;
    }
    if (/\s/.test(character)) {
      pushToken();
      continue;
    }
    if (
      ";&|<>`".includes(character) ||
      (character === "$" && command[index + 1] === "(")
    ) {
      return null;
    }
    token += character;
  }
  if (quote !== null || escaped) {
    return null;
  }
  pushToken();
  return tokens;
}

function classifyInlineNodeShellCommand(command) {
  if (typeof command !== "string") {
    return "other";
  }
  const tokens = tokenizeSimpleShellCommand(command);
  if (tokens !== null && isNodeCommand(tokens[0])) {
    for (const token of tokens.slice(1)) {
      if (
        ["-e", "--eval", "-p", "--print"].includes(token) ||
        ["-e=", "--eval=", "-p=", "--print="].some((prefix) =>
          token.startsWith(prefix)
        )
      ) {
        return "inline-node";
      }
      if (token === "--" || !token.startsWith("-")) {
        break;
      }
    }
  }
  return looksLikeInlineNodeShellCommand(command) ? "ambiguous-node" : "other";
}

function environmentWithPreload(environment = process.env) {
  const nodeOptions = environment.NODE_OPTIONS ?? "";
  const importOption = `--import=${preloadUrl}`;
  return {
    ...environment,
    NODE_OPTIONS: nodeOptions.includes(importOption)
      ? nodeOptions
      : `${nodeOptions} ${importOption}`.trim()
  };
}

for (const name of ["spawn", "execFile"]) {
  const original = childProcess[name];
  childProcess[name] = function instrumentedChild(command, args, ...rest) {
    const inlineArgs = inlineNodeArguments(command, args);
    if (inlineArgs === null) {
      return Reflect.apply(original, this, [command, args, ...rest]);
    }
    const phase = currentPhase;
    const attribution = attributionFromErrorStack(new Error().stack);
    record("mechanism", "node-inline-child", {
      outcome: "attempted",
      attribution,
      phase,
      route: name
    });
    try {
      const child = Reflect.apply(original, this, [
        command,
        preloadBeforeInlineArguments(inlineArgs),
        ...rest
      ]);
      return observeAsyncChild(child, {
        mechanism: "node-inline-child",
        attribution,
        phase,
        route: name
      });
    } catch (error) {
      recordPropagationLimitation(
        name,
        `${name} threw before preload propagation could be confirmed`,
        "node-inline-child",
        phase
      );
      record("mechanism", "node-inline-child", {
        outcome: "failed",
        attribution,
        phase,
        route: name
      });
      throw error;
    }
  };
}

for (const name of ["spawnSync", "execFileSync"]) {
  const original = childProcess[name];
  childProcess[name] = function instrumentedChild(command, args, ...rest) {
    const inlineArgs = inlineNodeArguments(command, args);
    if (inlineArgs === null) {
      return Reflect.apply(original, this, [command, args, ...rest]);
    }
    const phase = currentPhase;
    const attribution = attributionFromErrorStack(new Error().stack);
    record("mechanism", "node-inline-child", {
      outcome: "attempted",
      attribution,
      phase,
      route: name
    });
    try {
      const result = Reflect.apply(original, this, [
        command,
        preloadBeforeInlineArguments(inlineArgs),
        ...rest
      ]);
      const startupFailure = result?.error !== undefined;
      if (startupFailure) {
        recordPropagationLimitation(
          name,
          `${name} failed before preload propagation could be confirmed`,
          "node-inline-child",
          phase
        );
      }
      record("mechanism", "node-inline-child", {
        outcome: startupFailure || (name === "spawnSync" && result?.status !== 0)
          ? "failed"
          : "succeeded",
        attribution,
        phase,
        route: name
      });
      return result;
    } catch (error) {
      recordPropagationLimitation(
        name,
        `${name} threw before preload propagation could be confirmed`,
        "node-inline-child",
        phase
      );
      record("mechanism", "node-inline-child", {
        outcome: "failed",
        attribution,
        phase,
        route: name
      });
      throw error;
    }
  };
}

const originalExec = childProcess.exec;
childProcess.exec = function instrumentedExec(command, options, callback) {
  const classification = classifyInlineNodeShellCommand(command);
  if (classification === "ambiguous-node") {
    recordPropagationLimitation(
      "exec",
      "ambiguous Node inline shell command was left unchanged"
    );
    return Reflect.apply(originalExec, this, [command, options, callback]);
  }
  if (classification === "other") {
    return Reflect.apply(originalExec, this, [command, options, callback]);
  }
  const phase = currentPhase;
  const attribution = attributionFromErrorStack(new Error().stack);
  const callerCallback = typeof options === "function" ? options : callback;
  const callerOptions = options === undefined || typeof options === "function"
    ? {}
    : options;
  if (
    callerOptions === null ||
    typeof callerOptions !== "object" ||
    Array.isArray(callerOptions)
  ) {
    recordPropagationLimitation(
      "exec",
      "Node inline exec options could not be merged safely",
      "node-inline-child",
      phase
    );
    return Reflect.apply(originalExec, this, [command, options, callback]);
  }
  record("mechanism", "node-inline-child", {
    outcome: "attempted",
    attribution,
    phase,
    route: "exec"
  });
  try {
    const child = Reflect.apply(originalExec, this, [
      command,
      { ...callerOptions, env: environmentWithPreload(callerOptions.env ?? process.env) },
      callerCallback
    ]);
    return observeAsyncChild(child, {
      mechanism: "node-inline-child",
      attribution,
      phase,
      route: "exec"
    });
  } catch (error) {
    recordPropagationLimitation(
      "exec",
      "exec threw before preload propagation could be confirmed",
      "node-inline-child",
      phase
    );
    record("mechanism", "node-inline-child", {
      outcome: "failed",
      attribution,
      phase,
      route: "exec"
    });
    throw error;
  }
};

const originalExecSync = childProcess.execSync;
childProcess.execSync = function instrumentedExecSync(command, options = {}) {
  const classification = classifyInlineNodeShellCommand(command);
  if (classification === "ambiguous-node") {
    recordPropagationLimitation(
      "execSync",
      "ambiguous Node inline shell command was left unchanged"
    );
    return Reflect.apply(originalExecSync, this, [command, options]);
  }
  if (
    classification === "other" ||
    options === null ||
    typeof options !== "object" ||
    Array.isArray(options)
  ) {
    if (classification === "inline-node") {
      recordPropagationLimitation(
        "execSync",
        "Node inline execSync options could not be merged safely"
      );
    }
    return Reflect.apply(originalExecSync, this, [command, options]);
  }
  const phase = currentPhase;
  const attribution = attributionFromErrorStack(new Error().stack);
  record("mechanism", "node-inline-child", {
    outcome: "attempted",
    attribution,
    phase,
    route: "execSync"
  });
  try {
    const result = Reflect.apply(originalExecSync, this, [
      command,
      { ...options, env: environmentWithPreload(options.env ?? process.env) }
    ]);
    record("mechanism", "node-inline-child", {
      outcome: "succeeded",
      attribution,
      phase,
      route: "execSync"
    });
    return result;
  } catch (error) {
    recordPropagationLimitation(
      "execSync",
      "execSync threw before preload propagation could be confirmed",
      "node-inline-child",
      phase
    );
    record("mechanism", "node-inline-child", {
      outcome: "failed",
      attribution,
      phase,
      route: "execSync"
    });
    throw error;
  }
};

const originalFork = childProcess.fork;
childProcess.fork = function instrumentedFork(modulePath, ...forkArguments) {
  const phase = currentPhase;
  const attribution = attributionFromErrorStack(new Error().stack);
  record("mechanism", "propagation", {
    outcome: "attempted",
    attribution,
    phase,
    route: "fork"
  });
  let args;
  let options;
  if (forkArguments.length === 0) {
    args = [];
    options = {};
  } else if (Array.isArray(forkArguments[0])) {
    args = forkArguments[0];
    options = forkArguments[1] ?? {};
  } else if (
    forkArguments.length === 1 &&
    forkArguments[0] !== null &&
    typeof forkArguments[0] === "object"
  ) {
    args = [];
    options = forkArguments[0];
  } else {
    recordPropagationLimitation(
      "fork",
      "fork arguments could not be normalized safely",
      "propagation",
      phase
    );
    record("mechanism", "propagation", {
      outcome: "failed",
      attribution,
      phase,
      route: "fork"
    });
    throw new TypeError("fork arguments are malformed");
  }
  if (
    options === null ||
    typeof options !== "object" ||
    Array.isArray(options) ||
    (
      options.execArgv !== undefined &&
      (
        !Array.isArray(options.execArgv) ||
        options.execArgv.some((argument) => typeof argument !== "string")
      )
    )
  ) {
    recordPropagationLimitation(
      "fork",
      "fork options or execArgv could not be merged safely",
      "propagation",
      phase
    );
    record("mechanism", "propagation", {
      outcome: "failed",
      attribution,
      phase,
      route: "fork"
    });
    throw new TypeError("fork options.execArgv must be an array of strings");
  }
  try {
    const child = Reflect.apply(originalFork, this, [
      modulePath,
      args,
      { ...options, execArgv: withPreload(options.execArgv ?? process.execArgv) }
    ]);
    return observeAsyncChild(child, {
      mechanism: "propagation",
      attribution,
      phase,
      route: "fork"
    });
  } catch (error) {
    recordPropagationLimitation(
      "fork",
      "fork threw before preload propagation could be confirmed",
      "propagation",
      phase
    );
    record("mechanism", "propagation", {
      outcome: "failed",
      attribution,
      phase,
      route: "fork"
    });
    throw error;
  }
};

setCapability("node-inline-child", "ready");
setCapability("propagation", "ready");
if (process.env.IMPLEMENTATION_EVIDENCE_PROPAGATED === "1") {
  record("mechanism", "propagation", {
    outcome: "attempted",
    attribution: "runner",
    phase: currentPhase
  });
  record("mechanism", "propagation", {
    outcome: "succeeded",
    attribution: "runner",
    phase: currentPhase
  });
}

process.env.IMPLEMENTATION_EVIDENCE_PROPAGATED = "1";
syncBuiltinESMExports();
register(new URL("./implementation-loader-hooks.js", import.meta.url), import.meta.url);
globalThis[phaseSymbol](currentPhase);
