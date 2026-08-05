import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { runIsolationControl } from "./implementation-isolation.js";

const [validator, draft, mode = "api"] = process.argv.slice(2);
if (typeof validator !== "string" || !/^[a-z0-9-]+$/.test(validator)) {
  throw new Error("implementation probe validator is invalid");
}
if (typeof draft !== "string" || !/^[a-z0-9-]+$/.test(draft)) {
  throw new Error("implementation probe draft is invalid");
}

const dialects = {
  draft4: "http://json-schema.org/draft-04/schema#",
  draft6: "http://json-schema.org/draft-06/schema#",
  draft7: "http://json-schema.org/draft-07/schema#",
  "draft2019-09": "https://json-schema.org/draft/2019-09/schema",
  "draft2020-12": "https://json-schema.org/draft/2020-12/schema"
};
const dialect = dialects[draft];
if (typeof dialect !== "string") {
  throw new Error("implementation probe draft is unsupported");
}

const setPhase = globalThis[
  Symbol.for("json-schema-validator-bench.implementation-phase")
];
if (typeof setPhase !== "function") {
  throw new Error("implementation instrumentation phase control is unavailable");
}
setPhase("adapter-import");

const adapterPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "adapters",
  `${validator}.js`
);
const { adapter } = await import(pathToFileURL(adapterPath).href);
if (adapter.id !== validator || !adapter.drafts.includes(draft)) {
  throw new Error("implementation probe scope does not match the adapter");
}

const baseConfig = {
  draft,
  formatProfile: "base",
  resources: [],
  unknownFormats: []
};

async function prepare(runtime, schema) {
  return typeof runtime.setup === "function"
    ? await runtime.setup(schema)
    : schema;
}

function assertBoolean(runtime, target, data, expected, label) {
  const observed = runtime.validate(target, data);
  if (observed !== expected) {
    throw new Error(`${label} expected ${expected} but observed ${observed}`);
  }
}

const resourceUri = `https://benchmark.invalid/implementation/${validator}/${draft}/resource`;
function resource(type) {
  return {
    canonicalUri: resourceUri,
    uri: resourceUri,
    aliases: [resourceUri],
    schema: {
      $schema: dialect,
      $id: resourceUri,
      ...(draft === "draft4" ? { id: resourceUri } : {}),
      type
    }
  };
}
const rootSchema = { $schema: dialect, $ref: resourceUri };

if (mode === "api") {
  setPhase("api-setup");
  const runtime = adapter.create(baseConfig, { deferReportOptions: true });
  const api = typeof runtime.setup !== "function"
    ? "validate-only"
    : runtime.setupMode === "async"
      ? "reusable-async"
      : "reusable-sync";
  const simpleTarget = await prepare(runtime, { type: "integer" });
  setPhase("api-validation");
  assertBoolean(runtime, simpleTarget, 1, true, "API valid canary");
  assertBoolean(runtime, simpleTarget, "1", false, "API invalid canary");
  process.stdout.write(`${JSON.stringify({ api, diagnostics: [] })}\n`);
} else if (["aa", "bb", "aba", "bab"].includes(mode)) {
  setPhase(`isolation-${mode}`);
  const control = await runIsolationControl({
    adapter,
    baseConfig,
    rootSchema,
    resource,
    control: mode
  });
  process.stdout.write(`${JSON.stringify({ control })}\n`);
} else {
  throw new Error(`implementation probe mode is unsupported: ${mode}`);
}
