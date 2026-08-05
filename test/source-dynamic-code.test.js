import assert from "node:assert/strict";
import { mkdir, rm, symlink, writeFile } from "node:fs/promises";
import test from "node:test";
import path from "node:path";

import {
  SourceDynamicCodeError,
  scanPackageSourceDynamicCode,
  scanValidatorSourceDynamicCode
} from "../src/source-dynamic-code.js";

const temporaryRoot = path.resolve("tmp/source-dynamic-code-tests");

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function createProject(name, packages, adapterFiles = {}) {
  const projectRoot = path.join(temporaryRoot, name);
  await rm(projectRoot, { recursive: true, force: true });
  await mkdir(projectRoot, { recursive: true });
  const lockPackages = {
    "": { name: "fixture-project", version: "1.0.0", dependencies: {} }
  };
  for (const [packageName, fixture] of Object.entries(packages)) {
    const packageRoot = path.join(projectRoot, "node_modules", packageName);
    const manifest = {
      name: packageName,
      version: fixture.version ?? "1.0.0",
      main: fixture.main ?? "index.js",
      ...(fixture.manifest ?? {})
    };
    await writeJson(path.join(packageRoot, "package.json"), manifest);
    for (const [relativePath, content] of Object.entries(fixture.files ?? {})) {
      const filePath = path.join(packageRoot, relativePath);
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, content, "utf8");
    }
    const lockKey = path.relative(projectRoot, packageRoot).split(path.sep).join("/");
    lockPackages[lockKey] = {
      version: manifest.version,
      integrity: `sha512-${Buffer.from(packageName).toString("base64")}`,
      dependencies: manifest.dependencies ?? {}
    };
    lockPackages[""].dependencies[packageName] = manifest.version;
  }
  for (const [relativePath, content] of Object.entries(adapterFiles)) {
    const filePath = path.join(projectRoot, relativePath);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, content, "utf8");
  }
  await writeJson(path.join(projectRoot, "package.json"), {
    name: "fixture-project",
    version: "1.0.0",
    type: "module"
  });
  await writeJson(path.join(projectRoot, "package-lock.json"), {
    name: "fixture-project",
    version: "1.0.0",
    lockfileVersion: 3,
    requires: true,
    packages: lockPackages
  });
  return projectRoot;
}

async function expectRunnerError(action, code) {
  await assert.rejects(action, (error) => {
    assert.equal(error instanceof SourceDynamicCodeError, true);
    assert.equal(error.code, code);
    return true;
  });
}

test("negative fixtures do not become dynamic-code findings", async () => {
  const projectRoot = await createProject("negative", {
    fixture: {
      manifest: {
        exports: ".",
        module: "index.js",
        browser: "index.js",
        bin: { fixture: "cli.js" }
      },
      files: {
        "index.js": `
          // eval('comment') and Function('comment') are inert.
          const text = "eval('string') Function('string')";
          function shadowed(eval, Function) {
            eval("local");
            Function("local");
          }
          function shadowedObject(Object) {
            const LocalAsync = Object.getPrototypeOf(async function () {}).constructor;
            return LocalAsync("return 1");
          }
          function hoistedShadow() {
            eval("local");
            if (true) var eval = () => {};
          }
          const callback = () => {};
          const callbackIsFunction = callback instanceof Function;
          const functionType = typeof Function;
          const user = { eval() {}, constructor() {} };
          user.eval("value");
          new user.constructor("value");
          new Worker("./worker.js", { type: "module" });
          spawn("python", ["-e", "print(1)"]);
          new URL("https://example.test/module.js");
          export { shadowed, text };
        `,
        "cli.js": "process.stdout.write('fixture');\n",
        "types.d.ts": "declare function eval(source: string): unknown;\n"
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({
    projectRoot,
    packageName: "fixture",
    ownerType: "primary"
  });

  assert.equal(result.value, "no");
  assert.deepEqual(result.findings, []);
  assert.equal(result.inventory.declarationFiles, 1);
  assert.deepEqual(result.provenance.entrypoints.toSorted(), ["cli.js", "index.js"]);
});

test("AST bindings and bounded flow detect all required source mechanisms", async () => {
  const projectRoot = await createProject("positive", {
    fixture: {
      manifest: {
        type: "module",
        exports: { ".": "./index.js" }
      },
      files: {
        "index.js": `
          import { compile } from "./reexport.js";
          import { ExportedFactory } from "./alias.js";
          import { getFactory } from "./factory.js";
          import vm, { Script as VMScript, compileFunction as vmCompile } from "node:vm";
          import { Worker as NodeWorker } from "node:worker_threads";
          import { spawn, execFile, exec, fork } from "node:child_process";
          eval("1");
          (0, eval)("2");
          const indirect = globalThis["ev" + "al"];
          const { eval: destructuredEval } = globalThis;
          indirect("3");
          destructuredEval("4");
          eval.call(globalThis, "5");
          Function("return 1")();
          const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
          const GeneratorFunction = Object.getPrototypeOf(function* () {}).constructor;
          const AsyncGeneratorFunction = Object.getPrototypeOf(async function* () {}).constructor;
          const getPrototype = Object["get" + "PrototypeOf"];
          const ComputedAsyncFunction = getPrototype(async function () {}).constructor;
          AsyncFunction("return 1")();
          GeneratorFunction("yield 1")();
          AsyncGeneratorFunction("yield 1")();
          ComputedAsyncFunction("return 2")();
          new vm.Script("1");
          vm.runInNewContext("1");
          new VMScript("1");
          vmCompile("return 1");
          WebAssembly.compile(new Uint8Array());
          const { instantiate: instantiateWasm } = WebAssembly;
          instantiateWasm(new Uint8Array());
          new NodeWorker("code", { eval: true });
          new Worker("data:text/javascript,postMessage(1)");
          const blob = new Blob(["postMessage(1)"]);
          new Worker(blob);
          spawn(process.execPath, ["--eval", "Function('return 1')()"]);
          execFile("node", ["-e", "1"]);
          exec("node --print \\\"1\\\"");
          exec("env MODE=test node -e \\\"1\\\"");
          fork("./worker.js", [], { execArgv: ["--eval=1"] });
          import("data:text/javascript,export default 1");
          compile("return 2");
          ExportedFactory("return 3");
          getFactory()("return 4");
        `,
        "compiler.js": `
          export function compile(source) {
            const Factory = globalThis.Function;
            return new Factory(source);
          }
        `,
        "reexport.js": "export { compile } from './compiler.js';\n",
        "alias.js": "export const ExportedFactory = globalThis.Function;\n",
        "factory.js": "export const getFactory = () => globalThis.Function;\n",
        "cjs.cjs": `
          const { runInThisContext: run } = require("vm");
          const child = require("node:child_process");
          run("1");
          child.spawnSync(process.execPath, ["-p", "1"]);
          module.exports = () => Function("return 4");
        `,
        "minified.mjs": "const F=globalThis['Fun'+'ction'];new F('return 1')();",
        "typed.ts": "export const typedEval = globalThis.eval;\n",
        "typed.cts": "module.exports = Function('return 5');\n",
        "typed.mts": "WebAssembly.instantiate(new Uint8Array());\n",
        "worker.js": "export {};\n"
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({
    projectRoot,
    packageName: "fixture",
    ownerType: "primary"
  });
  const mechanisms = new Set(result.findings.map(({ mechanism }) => mechanism));

  assert.equal(result.value, "yes");
  for (const mechanism of [
    "eval",
    "function",
    "async-function",
    "generator-function",
    "async-generator-function",
    "node:vm",
    "webassembly",
    "worker",
    "node-inline-child",
    "data-import"
  ]) {
    assert.equal(mechanisms.has(mechanism), true, mechanism);
  }
  assert.equal(result.findings.every((finding) =>
    finding.owner.type === "primary" &&
    finding.owner.package === "fixture" &&
    finding.owner.version === "1.0.0" &&
    Number.isSafeInteger(finding.line) && finding.line > 0 &&
    Number.isSafeInteger(finding.column) && finding.column > 0 &&
    ["source", "bundle", "sourcemap"].includes(finding.representation) &&
    typeof finding.reachableFromEntrypoint === "boolean" &&
    ["high", "medium"].includes(finding.confidence) &&
    /^[a-f0-9]{64}$/.test(finding.fileSha256) &&
    Array.isArray(finding.bindingTrace) && finding.bindingTrace.length <= 8
  ), true);
  assert.equal(
    result.findings.some(({ relativePath, reachableFromEntrypoint, bindingTrace }) =>
      relativePath === "compiler.js" &&
      reachableFromEntrypoint &&
      bindingTrace.some((step) => step.includes("reexport.js"))
    ),
    true
  );
  assert.equal(
    result.findings.some(({ relativePath, operation }) =>
      relativePath === "factory.js" && operation === "reference"
    ),
    true
  );
  assert.equal(
    result.findings.some(({ relativePath, operation }) =>
      relativePath === "alias.js" && operation === "alias"
    ),
    true
  );
  for (const relativePath of ["typed.ts", "typed.cts", "typed.mts"]) {
    assert.equal(result.findings.some((finding) => finding.relativePath === relativePath), true);
  }
});

test("sourcesContent is analyzed once with sourcemap provenance", async () => {
  const source = "export const compile = (code) => Function(code);\n";
  const projectRoot = await createProject("sourcemap", {
    fixture: {
      files: {
        "index.js": "export {};\n//# sourceMappingURL=index.js.map\n",
        "index.js.map": JSON.stringify({
          version: 3,
          file: "index.js",
          sources: ["src/compiler.ts"],
          sourcesContent: [source],
          names: [],
          mappings: ""
        })
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({
    projectRoot,
    packageName: "fixture",
    ownerType: "primary"
  });

  assert.equal(result.value, "yes");
  assert.equal(result.findings.length, 1);
  assert.equal(result.findings[0].representation, "sourcemap");
  assert.equal(result.findings[0].relativePath, "src/compiler.ts");
});

test("valid source maps without embedded source do not replace parsed distribution files", async () => {
  const projectRoot = await createProject("sourcemap-no-content", {
    fixture: {
      files: {
        "index.js": "export const value = 1;\n",
        "index.js.map": JSON.stringify({
          version: 3,
          file: "index.js",
          sources: ["src/index.ts"],
          names: [],
          mappings: ""
        })
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({
    projectRoot,
    packageName: "fixture"
  });

  assert.equal(result.value, "no");
  assert.equal(result.inventory.sourceMaps, 1);
});

test("duplicate sourcemap content preserves representation provenance without duplicate findings", async () => {
  const source = "export const compile = Function('return 1');\n";
  const projectRoot = await createProject("sourcemap-dedup", {
    fixture: {
      files: {
        "index.js": source,
        "index.js.map": JSON.stringify({
          version: 3,
          file: "index.js",
          sources: ["src/index.ts"],
          sourcesContent: [source],
          names: [],
          mappings: ""
        })
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({
    projectRoot,
    packageName: "fixture"
  });

  assert.equal(result.findings.length, 1);
  assert.deepEqual(
    result.findings[0].representations.map(({ type }) => type).toSorted(),
    ["source", "sourcemap"]
  );
  assert.equal(result.inventory.sourceRepresentations.length, 1);
});

test("wildcard exports contribute reachable entrypoints", async () => {
  const projectRoot = await createProject("wildcard-entrypoint", {
    fixture: {
      manifest: {
        exports: { "./features/*": "./features/*.js" }
      },
      files: {
        "index.js": "export const value = 1;\n",
        "features/compiler.js": "export const compile = Function('return 1');\n"
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({
    projectRoot,
    packageName: "fixture"
  });

  assert.equal(result.value, "yes");
  assert.equal(result.findings[0].relativePath, "features/compiler.js");
  assert.equal(result.findings[0].reachableFromEntrypoint, true);
});

test("inventory analyzes JSX, TSX, extensionless bins, and Node shebang files", async () => {
  const projectRoot = await createProject("extended-inventory", {
    fixture: {
      manifest: {
        main: "index.jsx",
        exports: { "./component": "./component.tsx" },
        bin: { fixture: "cli", plain: "plain-cli" }
      },
      files: {
        "index.jsx": "export const view = <div>{Function('return 1')()}</div>;\n",
        "component.tsx": "export const component = <span>{eval('1')}</span>;\n",
        "cli": "#!/usr/bin/env node\nFunction('return 2')();\n",
        "plain-cli": "Function('return 3')();\n",
        "shebang-tool": "#!/usr/bin/node\neval('2');\n",
        "README.md": "fixture docs\n",
        "data.json": "{\"safe\":true}\n",
        "asset.png": "known binary fixture"
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({
    projectRoot,
    packageName: "fixture"
  });
  const findingPaths = new Set(result.findings.map(({ relativePath }) => relativePath));

  assert.equal(result.value, "yes");
  for (const relativePath of [
    "index.jsx",
    "component.tsx",
    "cli",
    "plain-cli",
    "shebang-tool"
  ]) {
    assert.equal(findingPaths.has(relativePath), true, relativePath);
  }
  assert.equal(result.inventory.classifications.length, result.inventory.files);
  assert.equal(
    result.inventory.classifications.every(({ classification }) => [
      "analyzed",
      "configuration",
      "declaration",
      "documentation",
      "data",
      "source-map",
      "known-binary"
    ].includes(classification)),
    true
  );
});

test("every material manifest entrypoint must resolve to analyzed source", async (context) => {
  await context.test("missing entrypoint", async () => {
    const projectRoot = await createProject("entrypoint-missing", {
      fixture: {
        manifest: { main: "missing.js" },
        files: { "index.js": "export {};\n" }
      }
    });
    await expectRunnerError(
      () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
      "SOURCE_ENTRYPOINT_MISSING"
    );
  });

  await context.test("unsupported executable entrypoint", async () => {
    const projectRoot = await createProject("entrypoint-unsupported", {
      fixture: {
        manifest: { main: "index.custom" },
        files: { "index.custom": "Function('return 1');\n" }
      }
    });
    await expectRunnerError(
      () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
      "SOURCE_EXECUTABLE_TYPE_UNSUPPORTED"
    );
  });
});

test("conservative expression traversal preserves nested sinks and global shadowing", async (context) => {
  const positives = {
    logical: "export const value = flag && Function('return 1');\n",
    void: "void eval('1');\n",
    await: "export async function run() { await WebAssembly.compile(new Uint8Array()); }\n",
    conditional: "export const value = flag ? eval('1') : Function('return 1')();\n",
    comma: "export const value = (flag, eval('1'));\n",
    spread: "export const value = [...items, ...[Function('return 1')]];\n",
    optional: "global?.Function('return 1')();\n",
    satisfies: "const Factory = globalThis.Function satisfies FunctionConstructor; Factory('return 1');\n",
    forAwait: "export async function run() { for await (const item of [eval('1')]) void item; }\n",
    jsx: "export const nested = <div>{flag && Function('return 1')()}</div>;\n",
    unary: "export const value = typeof global.eval('1');\n"
  };
  for (const [label, source] of Object.entries(positives)) {
    await context.test(label, async () => {
      const extension = ["satisfies"].includes(label)
        ? "ts"
        : label === "jsx"
          ? "jsx"
          : "js";
      const fileName = `index.${extension}`;
      const projectRoot = await createProject(`traversal-${label}`, {
        fixture: {
          manifest: { main: fileName },
          files: { [fileName]: source }
        }
      });
      const result = await scanPackageSourceDynamicCode({
        projectRoot,
        packageName: "fixture"
      });
      assert.equal(result.value, "yes", label);
      const findingKeys = result.findings.map((finding) =>
        [finding.relativePath, finding.line, finding.column, finding.mechanism, finding.operation].join(":"));
      assert.equal(new Set(findingKeys).size, findingKeys.length, `${label} duplicate findings`);
    });
  }

  await context.test("shadowed Node global", async () => {
    const projectRoot = await createProject("traversal-global-shadow", {
      fixture: {
        files: {
          "index.js": `
            export function local(global) {
              global.Function("return 1");
              global.eval("1");
            }
          `
        }
      }
    });
    const result = await scanPackageSourceDynamicCode({
      projectRoot,
      packageName: "fixture"
    });
    assert.equal(result.value, "no");
  });
});

test("ESM bindings propagate vm bridges and wrapper summaries across reexports", async () => {
  const projectRoot = await createProject("esm-interfile", {
    fixture: {
      manifest: { main: "consumer.js" },
      files: {
        "consumer.js": `
          import { VMBridge } from "./bridge.js";
          import { compile } from "./reexport.js";
          new VMBridge("1");
          compile("SENSITIVE_PAYLOAD_CANARY");
        `,
        "bridge.js": "export { Script as VMBridge } from 'node:vm';\n",
        "reexport.js": "export { default as compile } from './wrapper.js';\n",
        "wrapper.js": `
          export default function compile(source) {
            return Function(source);
          }
        `
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  const consumerFindings = result.findings.filter(({ relativePath }) =>
    relativePath === "consumer.js");

  assert.equal(consumerFindings.some(({ mechanism }) => mechanism === "node:vm"), true);
  assert.equal(consumerFindings.some(({ mechanism }) => mechanism === "function"), true);
  assert.equal(result.findings.some(({ relativePath }) => relativePath === "bridge.js"), false);
  assert.equal(
    consumerFindings.every(({ bindingTrace }) =>
      bindingTrace.length <= 8 &&
      bindingTrace.some((step) => step.includes("bridge.js") || step.includes("wrapper.js"))),
    true
  );
  assert.equal(JSON.stringify(result.findings).includes("SENSITIVE_PAYLOAD_CANARY"), false);
  assert.equal(result.findings.every((finding) =>
    !("source" in finding) && !("content" in finding) && !("payload" in finding)), true);
});

test("default, namespace, CJS exports, and destructured require propagate authorities", async () => {
  const projectRoot = await createProject("module-shapes", {
    fixture: {
      manifest: {
        main: "esm-consumer.js",
        exports: {
          import: "./esm-consumer.js",
          require: "./cjs-consumer.cjs"
        }
      },
      files: {
        "esm-consumer.js": `
          import compile from "./esm-wrapper.js";
          import * as bridge from "./esm-bridge.js";
          compile("return 1");
          new bridge.ScriptAlias("1");
        `,
        "esm-wrapper.js": `
          const compile = (source) => Function(source);
          export { compile as default };
        `,
        "esm-bridge.js": "export { Script as ScriptAlias } from 'node:vm';\n",
        "cjs-consumer.cjs": `
          const wrapperPath = "./cjs-wrapper.cjs";
          const compile = require(wrapperPath);
          const { ScriptAlias } = require("./cjs-bridge.cjs");
          compile("return 2");
          new ScriptAlias("2");
        `,
        "cjs-wrapper.cjs": "module.exports = (source) => Function(source);\n",
        "cjs-bridge.cjs": `
          const { Script } = require("node:vm");
          exports.ScriptAlias = Script;
        `
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  for (const relativePath of ["esm-consumer.js", "cjs-consumer.cjs"]) {
    const mechanisms = new Set(
      result.findings
        .filter((finding) => finding.relativePath === relativePath)
        .map(({ mechanism }) => mechanism)
    );
    assert.deepEqual([...mechanisms].toSorted(), ["function", "node:vm"]);
  }
});

test("export-star cycles converge and extensionless directory resolution remains deterministic", async () => {
  const projectRoot = await createProject("module-cycle", {
    fixture: {
      manifest: { main: "index.js" },
      files: {
        "index.js": `
          import { compile } from "./cycle/b.js";
          import directoryCompile from "./directory";
          compile("return 1");
          directoryCompile("return 2");
        `,
        "cycle/a.js": `
          export { compile };
          export * from "./b.js";
          const compile = (source) => Function(source);
        `,
        "cycle/b.js": "export * from './a.js';\n",
        "directory/index.js": "export default (source) => Function(source);\n"
      }
    }
  });

  const first = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  const second = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  const consumerFindings = first.findings.filter(({ relativePath }) => relativePath === "index.js");

  assert.equal(consumerFindings.filter(({ mechanism }) => mechanism === "function").length, 2);
  assert.deepEqual(first.findings, second.findings);
});

test("unresolved material module bindings fail closed", async (context) => {
  for (const [label, files] of [
    ["missing relative import", {
      "index.js": "import { compile } from './missing.js'; compile('return 1');\n"
    }],
    ["missing named export", {
      "index.js": "import { compile } from './helper.js'; compile('return 1');\n",
      "helper.js": "export const value = 1;\n"
    }],
    ["computed require", {
      "index.js": "export function load(name) { const helper = require(name); helper(); }\n",
      "helper.cjs": "module.exports = () => 1;\n"
    }],
    ["computed dynamic import", {
      "index.js": "export function load(name) { return import(name); }\n",
      "helper.js": "export {};\n"
    }],
    ["constant missing dynamic import", {
      "index.js": "const name = './missing.js'; import(name);\n"
    }]
  ]) {
    await context.test(label, async () => {
      const projectRoot = await createProject(`module-unresolved-${label.replaceAll(" ", "-")}`, {
        fixture: { files }
      });
      await expectRunnerError(
        () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
        "SOURCE_ANALYSIS_UNRESOLVED"
      );
    });
  }
});

test("type-only imports and reexports do not enter the runtime binding graph", async () => {
  const projectRoot = await createProject("module-type-only", {
    fixture: {
      manifest: { main: "index.ts" },
      files: {
        "index.ts": `
          import type { Missing } from "./missing.js";
          export type { MissingAgain } from "./also-missing.js";
          export const value = 1;
        `
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  assert.equal(result.value, "no");
});

test("transitive findings preserve ownership and per-file reachability", async () => {
  const projectRoot = await createProject("transitive-reachability", {
    primary: { files: { "index.js": "import 'transitive'; export const value = 1;\n" } },
    transitive: {
      files: {
        "index.js": "import './reachable.js';\n",
        "reachable.js": "Function('return 1');\n",
        "unreachable.js": "Function('return 2');\n"
      }
    }
  });

  const result = await scanValidatorSourceDynamicCode({
    projectRoot,
    primaryPackage: "primary",
    transitivePackages: ["transitive"]
  });
  const transitiveFindings = result.components.transitives[0].findings;

  assert.equal(result.value, "no");
  assert.equal(transitiveFindings.every(({ owner }) => owner.type === "transitive"), true);
  assert.equal(
    transitiveFindings.find(({ relativePath }) => relativePath === "reachable.js")
      .reachableFromEntrypoint,
    true
  );
  assert.equal(
    transitiveFindings.find(({ relativePath }) => relativePath === "unreachable.js")
      .reachableFromEntrypoint,
    false
  );
});

test("child Node inline detection uses only the effective Node option region", async () => {
  const projectRoot = await createProject("child-node-region", {
    fixture: {
      files: {
        "index.js": `
          import { spawn, spawnSync, execFile, exec, execSync } from "node:child_process";
          spawn(process.execPath, ["--eval", "1"]);
          spawnSync("/opt/node/bin/node", ["--print=1"]);
          execFile("node", ["--import", "loader.js", "-e", "1"]);
          execFile("node", ["--eval=1"]);
          exec("MODE=x node -e '1'");
          exec("/usr/bin/env node --print=1");
          execSync("env MODE=x node --eval '1'");
          spawn("node", ["script.js", "-e", "value"]);
          spawn("node", ["--", "-e", "value"]);
          spawn("python", ["-e", "print(1)"]);
          exec("node script.js -e value");
          exec("python $(flags) -e value");
        `
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  const childFindings = result.findings.filter(({ mechanism }) =>
    mechanism === "node-inline-child");

  assert.equal(childFindings.length, 7);
  assert.equal(childFindings.every(({ relativePath }) => relativePath === "index.js"), true);
  assert.deepEqual(childFindings.map(({ line }) => line), [3, 4, 5, 6, 7, 8, 9]);
});

test("ambiguous shell with potential Node inline execution fails closed", async () => {
  const projectRoot = await createProject("child-node-ambiguous", {
    fixture: {
      files: {
        "index.js": `
          const { exec } = require("node:child_process");
          exec("node \\\"$FLAGS\\\" -e '1'");
        `
      }
    }
  });

  await expectRunnerError(
    () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
    "SOURCE_ANALYSIS_UNRESOLVED"
  );
});

test("resolvable property assignments propagate authorities without ordinary-method false positives", async () => {
  const projectRoot = await createProject("property-authorities", {
    fixture: {
      files: {
        "index.js": `
          const direct = {};
          direct.factory = Function;
          direct.factory("return 1");

          const key = "compiler";
          const nested = { tools: {} };
          nested.tools[key] = globalThis.Function;
          const { compiler } = nested.tools;
          compiler("return 2");

          const ordinary = {
            method() { return 1; },
            constructor: function Ordinary() { return 2; }
          };
          ordinary.factory = () => 3;
          ordinary.factory();
          ordinary.method();
          ordinary.constructor();
          new ordinary.constructor();
          export function installOrdinary(target, dynamicKey) {
            target[dynamicKey] = () => 4;
          }
        `
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  const invokes = result.findings.filter(({ mechanism, operation }) =>
    mechanism === "function" && operation === "invoke");

  assert.equal(invokes.length, 2);
  assert.deepEqual(invokes.map(({ line }) => line), [4, 10]);
});

test("unresolvable material property assignment fails closed", async () => {
  const projectRoot = await createProject("property-authority-unresolved", {
    fixture: {
      files: {
        "index.js": `
          export function install(target, key) {
            target[key] = Function;
          }
        `
      }
    }
  });

  await expectRunnerError(
    () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
    "SOURCE_ANALYSIS_UNRESOLVED"
  );
});

test("dynamic import returns builtin and relative module authorities", async () => {
  const projectRoot = await createProject("dynamic-import-bindings", {
    fixture: {
      files: {
        "index.js": `
          const { Script } = await import("node:vm");
          new Script("1");
          const vm = (await import("node:vm")).default;
          vm.runInNewContext("1");
          const target = "./wrapper.js";
          const { compile } = await import(target);
          compile("PRIVATE_DYNAMIC_IMPORT_PAYLOAD");
        `,
        "wrapper.js": "export const compile = (source) => Function(source);\n"
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  const mechanisms = result.findings
    .filter(({ relativePath, operation }) =>
      relativePath === "index.js" && ["construct", "invoke"].includes(operation))
    .map(({ mechanism }) => mechanism)
    .toSorted();

  assert.deepEqual(mechanisms, ["function", "node:vm", "node:vm"]);
  assert.equal(JSON.stringify(result.findings).includes("PRIVATE_DYNAMIC_IMPORT_PAYLOAD"), false);
});

test("assignment destructuring propagates object, array, alias, default, computed, and rest authorities", async () => {
  const projectRoot = await createProject("assignment-destructuring", {
    fixture: {
      files: {
        "index.js": `
          let Script, Alias, Computed, Remaining;
          ({ Script } = await import("node:vm"));
          ({ Script: Alias } = await import("node:vm"));
          const key = "Script";
          ({ [key]: Computed, ...Remaining } = await import("node:vm"));
          new Script("1");
          new Alias("2");
          new Computed("3");
          Remaining.runInNewContext("4");

          let First, Rest, Defaulted;
          [First, ...Rest] = [Function, Function];
          ({ missing: Defaulted = Function } = {});
          First("return 1");
          Rest[0]("return 2");
          Defaulted("return 3");
        `
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  const callMechanisms = result.findings
    .filter(({ operation }) => ["construct", "invoke"].includes(operation))
    .map(({ mechanism }) => mechanism)
    .toSorted();

  assert.deepEqual(callMechanisms, [
    "function",
    "function",
    "function",
    "node:vm",
    "node:vm",
    "node:vm",
    "node:vm"
  ]);
});

test("ordinary assignment destructuring and property assignment remain negative", async () => {
  const projectRoot = await createProject("assignment-destructuring-negative", {
    fixture: {
      files: {
        "index.js": `
          let method, first;
          ({ method } = { method: () => 1 });
          [first] = [() => 2];
          const object = {};
          object.factory = () => 3;
          method();
          first();
          object.factory();
        `
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  assert.equal(result.value, "no");
});

test("unresolvable assignment pattern with authorities fails closed", async () => {
  const projectRoot = await createProject("assignment-destructuring-unresolved", {
    fixture: {
      files: {
        "index.js": `
          export async function select(key) {
            let Selected;
            ({ [key]: Selected } = await import("node:vm"));
            return new Selected("1");
          }
        `
      }
    }
  });

  await expectRunnerError(
    () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
    "SOURCE_ANALYSIS_UNRESOLVED"
  );
});

test("dynamic import evaluates nested option arguments before returning its namespace", async () => {
  const projectRoot = await createProject("dynamic-import-options", {
    fixture: {
      files: {
        "index.js": `
          const vm = await import("node:vm", {
            with: { type: Function("PRIVATE_IMPORT_OPTION") },
            nested: [eval("1")]
          });
          new vm.Script("1");
        `
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  assert.deepEqual(
    result.findings
      .filter(({ operation }) => ["construct", "invoke"].includes(operation))
      .map(({ mechanism }) => mechanism)
      .toSorted(),
    ["eval", "function", "node:vm"]
  );
  assert.equal(JSON.stringify(result.findings).includes("PRIVATE_IMPORT_OPTION"), false);
});

test("ordinary dynamic import options remain negative", async () => {
  const projectRoot = await createProject("dynamic-import-options-negative", {
    fixture: {
      files: {
        "index.js": `
          await import("./safe.js", {
            with: { type: "json" },
            nested: [() => 1]
          });
        `,
        "safe.js": "export const value = 1;\n"
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  assert.equal(result.value, "no");
});

test("catch, loop, and block bindings shadow locally without contaminating outer authorities", async () => {
  const projectRoot = await createProject("lexical-shadowing", {
    fixture: {
      files: {
        "index.js": `
          try { throw new Error("local"); } catch (eval) {
            eval("local catch");
          }
          for (let eval = () => 1, index = 0; index < 1; index += 1) {
            eval("local loop");
          }
          {
            const Function = () => 2;
            Function("local block");
          }
          eval("global eval");
          Function("global Function");
        `
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  assert.deepEqual(
    result.findings.map(({ mechanism, line }) => ({ mechanism, line })),
    [
      { mechanism: "eval", line: 12 },
      { mechanism: "function", line: 13 }
    ]
  );
});

test("for-in and for-of bindings remain local to their loop environments", async () => {
  const projectRoot = await createProject("lexical-for-in-of", {
    fixture: {
      files: {
        "index.js": `
          for (const eval of [() => 1]) {
            eval("local for-of");
          }
          for (const Function in { local: true }) {
            void Function;
          }
          eval("global after loops");
          Function("global after loops");
        `
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  assert.deepEqual(result.findings.map(({ mechanism }) => mechanism), ["eval", "function"]);
});

test("constant shell wrappers detect only nested Node inline commands", async () => {
  const projectRoot = await createProject("shell-wrapper-inline", {
    fixture: {
      files: {
        "index.js": `
          import { spawn, spawnSync, exec } from "node:child_process";
          spawn("sh", ["-c", "node -e '1'"]);
          spawnSync("/bin/bash", ["-c", "/usr/bin/env MODE=x node --print=1"]);
          exec("sh -c \\\"node --eval='1'\\\"");
          spawn("sh", ["-c", "python -c 'print(1)'"]);
          exec("bash -c \\\"python -c 'print(1)'\\\"");
        `
      }
    }
  });

  const result = await scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" });
  const childFindings = result.findings.filter(({ mechanism }) =>
    mechanism === "node-inline-child");

  assert.equal(childFindings.length, 3);
  assert.deepEqual(childFindings.map(({ line }) => line), [3, 4, 5]);
});

test("dynamic shell wrapper command with potential Node inline fails closed", async () => {
  const projectRoot = await createProject("shell-wrapper-unresolved", {
    fixture: {
      files: {
        "index.js": `
          const { spawn } = require("node:child_process");
          export function run(command) {
            spawn("sh", ["-c", command]);
          }
        `
      }
    }
  });

  await expectRunnerError(
    () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
    "SOURCE_ANALYSIS_UNRESOLVED"
  );
});

test("ownership keeps companions, transitives, and adapters separate", async () => {
  const projectRoot = await createProject(
    "ownership",
    {
      primary: { files: { "index.js": "export const value = 1;\n" } },
      companion: { files: { "index.js": "export const compile = Function('return 1');\n" } },
      transitive: { files: { "index.js": "export const compile = Function('return 2');\n" } }
    },
    {
      "src/adapters/fixture.js": "export { compile } from './fixture-helper.js';\n",
      "src/adapters/fixture-helper.js": "export const compile = Function('return 3');\n"
    }
  );

  const result = await scanValidatorSourceDynamicCode({
    projectRoot,
    primaryPackage: "primary",
    companionPackages: ["companion"],
    transitivePackages: ["transitive"],
    adapterPaths: ["src/adapters/fixture.js"]
  });

  assert.equal(result.value, "yes");
  assert.equal(result.findings.every(({ owner }) =>
    ["primary", "companion"].includes(owner.type)
  ), true);
  assert.equal(result.components.primary.value, "no");
  assert.equal(result.components.companions[0].value, "yes");
  assert.equal(result.components.transitives[0].value, "yes");
  assert.equal(result.components.adapters[0].value, "yes");
  assert.equal(result.components.transitives[0].findings[0].owner.type, "transitive");
  assert.equal(result.components.adapters[0].findings[0].owner.type, "adapter");
});

test("transitive and adapter sinks alone do not change the validator result", async () => {
  const projectRoot = await createProject(
    "ownership-negative",
    {
      primary: { files: { "index.js": "export const value = 1;\n" } },
      transitive: { files: { "index.js": "Function('return 2');\n" } }
    },
    {
      "src/adapters/fixture.js": "import './fixture-helper.js';\n",
      "src/adapters/fixture-helper.js": "Function('return 3');\n"
    }
  );

  const result = await scanValidatorSourceDynamicCode({
    projectRoot,
    primaryPackage: "primary",
    transitivePackages: ["transitive"],
    adapterPaths: ["src/adapters/fixture.js"]
  });

  assert.equal(result.value, "no");
  assert.deepEqual(result.findings, []);
  assert.equal(result.components.transitives[0].value, "yes");
  assert.equal(result.components.adapters[0].value, "yes");
});

test("cache identity is package-scoped and deterministic", async () => {
  const projectRoot = await createProject("cache", {
    fixture: { files: { "index.js": "Function('return 1');\n" } }
  });
  const cache = new Map();
  const first = await scanPackageSourceDynamicCode({
    projectRoot,
    packageName: "fixture",
    ownerType: "primary",
    cache
  });
  const second = await scanPackageSourceDynamicCode({
    projectRoot,
    packageName: "fixture",
    ownerType: "primary",
    cache
  });

  assert.equal(first.cache.reused, false);
  assert.equal(second.cache.reused, true);
  assert.equal(first.cache.identitySha256, second.cache.identitySha256);
  assert.match(first.cache.identitySha256, /^[a-f0-9]{64}$/);
  assert.match(first.provenance.packageBytesSha256, /^[a-f0-9]{64}$/);
  assert.match(first.provenance.packageLockSha256, /^[a-f0-9]{64}$/);
  assert.equal(first.provenance.parser.name, "typescript");
  assert.equal(first.provenance.parser.version, "6.0.3");
});

test("scanner failures are typed runner errors instead of validator values", async (context) => {
  await context.test("parse error", async () => {
    const projectRoot = await createProject("error-parse", {
      fixture: { files: { "index.js": "export const broken = ;\n" } }
    });
    await expectRunnerError(
      () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
      "SOURCE_PARSE_ERROR"
    );
  });

  await context.test("invalid UTF-8 source", async () => {
    const projectRoot = await createProject("error-encoding", {
      fixture: { files: { "index.js": "export {};\n" } }
    });
    await writeFile(
      path.join(projectRoot, "node_modules", "fixture", "index.js"),
      Buffer.from([0x65, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x20, 0xff])
    );
    await expectRunnerError(
      () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
      "SOURCE_ENCODING_INVALID"
    );
  });

  for (const [label, target, setup, code] of [
    ["missing lock", "package-lock.json", "missing", "SOURCE_LOCK_MISSING"],
    ["corrupt lock", "package-lock.json", "corrupt", "SOURCE_LOCK_INVALID"],
    ["unreadable lock", "package-lock.json", "directory", "SOURCE_LOCK_READ_ERROR"],
    ["missing package manifest", "node_modules/fixture/package.json", "missing", "SOURCE_PACKAGE_MANIFEST_MISSING"],
    ["corrupt package manifest", "node_modules/fixture/package.json", "corrupt", "SOURCE_PACKAGE_MANIFEST_INVALID"],
    ["unreadable package manifest", "node_modules/fixture/package.json", "directory", "SOURCE_PACKAGE_MANIFEST_READ_ERROR"]
  ]) {
    await context.test(label, async () => {
      const projectRoot = await createProject(`error-${label.replaceAll(" ", "-")}`, {
        fixture: { files: { "index.js": "export {};\n" } }
      });
      const targetPath = path.join(projectRoot, target);
      await rm(targetPath, { recursive: true, force: true });
      if (setup === "corrupt") {
        await writeFile(targetPath, "{", "utf8");
      } else if (setup === "directory") {
        await mkdir(targetPath, { recursive: true });
      }
      await expectRunnerError(
        () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
        code
      );
    });
  }

  await context.test("corrupt project adapter manifest", async () => {
    const projectRoot = await createProject(
      "error-project-manifest",
      { fixture: { files: { "index.js": "export {};\n" } } },
      { "src/adapters/fixture.js": "export {};\n" }
    );
    await writeFile(path.join(projectRoot, "package.json"), "{", "utf8");
    await expectRunnerError(
      () => scanValidatorSourceDynamicCode({
        projectRoot,
        primaryPackage: "fixture",
        adapterPaths: ["src/adapters/fixture.js"]
      }),
      "SOURCE_PROJECT_MANIFEST_INVALID"
    );
  });

  await context.test("project adapter manifest without identity", async () => {
    const projectRoot = await createProject(
      "error-project-manifest-identity",
      { fixture: { files: { "index.js": "export {};\n" } } },
      { "src/adapters/fixture.js": "export {};\n" }
    );
    await writeFile(path.join(projectRoot, "package.json"), "{}\n", "utf8");
    await expectRunnerError(
      () => scanValidatorSourceDynamicCode({
        projectRoot,
        primaryPackage: "fixture",
        adapterPaths: ["src/adapters/fixture.js"]
      }),
      "SOURCE_PROJECT_MANIFEST_INVALID"
    );
  });

  await context.test("missing adapter source", async () => {
    const projectRoot = await createProject("error-adapter-missing", {
      fixture: { files: { "index.js": "export {};\n" } }
    });
    await expectRunnerError(
      () => scanValidatorSourceDynamicCode({
        projectRoot,
        primaryPackage: "fixture",
        adapterPaths: ["src/adapters/missing.js"]
      }),
      "SOURCE_ADAPTER_READ_ERROR"
    );
  });

  await context.test("corrupt sourcemap", async () => {
    const projectRoot = await createProject("error-map", {
      fixture: { files: { "index.js": "export {};\n", "index.js.map": "{" } }
    });
    await expectRunnerError(
      () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
      "SOURCE_MAP_INVALID"
    );
  });

  await context.test("sourcemap escape", async () => {
    const projectRoot = await createProject("error-map-escape", {
      fixture: {
        files: {
          "index.js": "export {};\n",
          "index.js.map": JSON.stringify({
            version: 3,
            sources: ["../../outside.js"],
            sourcesContent: ["Function('return 1')"],
            names: [],
            mappings: ""
          })
        }
      }
    });
    await expectRunnerError(
      () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
      "SOURCE_MAP_ESCAPE"
    );
  });

  for (const [label, extension, code] of [
    ["native addon", "node", "OPAQUE_NATIVE_ADDON"],
    ["wasm module", "wasm", "OPAQUE_WASM_MODULE"]
  ]) {
    await context.test(label, async () => {
      const projectRoot = await createProject(`error-${extension}`, {
        fixture: { files: { "index.js": "export {};\n", [`opaque.${extension}`]: "opaque" } }
      });
      await expectRunnerError(
        () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
        code
      );
    });
  }

  await context.test("symlink escape", async () => {
    const projectRoot = await createProject("error-symlink", {
      fixture: { files: { "index.js": "export {};\n" } }
    });
    const outside = path.join(projectRoot, "outside.js");
    await writeFile(outside, "Function('return 1');\n", "utf8");
    await symlink(
      outside,
      path.join(projectRoot, "node_modules", "fixture", "escape.js")
    );
    await expectRunnerError(
      () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
      "SOURCE_SYMLINK_ESCAPE"
    );
  });

  for (const [label, source] of [
    ["dynamic import", "const specifier = getSpecifier(); import(specifier);\n"],
    ["computed global", "const key = getKey(); globalThis[key]('value');\n"],
    ["Worker source", "new Worker(getWorkerSource(), { type: 'module' });\n"],
    ["Worker options", "new Worker('./worker.js', getWorkerOptions());\n"]
  ]) {
    await context.test(`material unresolved ${label}`, async () => {
      const projectRoot = await createProject(`error-unresolved-${label.replaceAll(" ", "-")}`, {
        fixture: { files: { "index.js": source } }
      });
      await expectRunnerError(
        () => scanPackageSourceDynamicCode({ projectRoot, packageName: "fixture" }),
        "SOURCE_ANALYSIS_UNRESOLVED"
      );
    });
  }
});
