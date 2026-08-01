import { adapter as schemaShield } from "./schema-shield.js";
import { adapter as ajv } from "./ajv.js";
import { adapter as schemasafe } from "./schemasafe.js";
import { adapter as redoclyAjv } from "./redocly-ajv.js";
import { adapter as cfworker } from "./cfworker-json-schema.js";
import { adapter as jsonSchemaLibrary } from "./json-schema-library.js";
import { adapter as jsonschema } from "./jsonschema.js";
import { adapter as djv } from "./djv.js";
import { adapter as zSchema } from "./z-schema.js";
import { adapter as hyperjump } from "./hyperjump.js";
import { packageMetadata } from "./helpers.js";

export function compareCanonicalAdapters(left, right) {
  if (left.displayName < right.displayName) {
    return -1;
  }
  if (left.displayName > right.displayName) {
    return 1;
  }
  if (left.id < right.id) {
    return -1;
  }
  if (left.id > right.id) {
    return 1;
  }
  return 0;
}

export function createAdapterRegistry(definitions) {
  if (!Array.isArray(definitions)) {
    throw new Error("adapter registry must be an array");
  }
  const ids = new Set();
  for (const definition of definitions) {
    if (ids.has(definition.id)) {
      throw new Error(`duplicate adapter ID: ${definition.id}`);
    }
    ids.add(definition.id);
  }
  return Object.freeze([...definitions].sort(compareCanonicalAdapters));
}

export const adapterRegistry = createAdapterRegistry([
  schemaShield,
  ajv,
  schemasafe,
  redoclyAjv,
  cfworker,
  jsonSchemaLibrary,
  jsonschema,
  djv,
  zSchema,
  hyperjump
]);

const adaptersById = new Map(
  adapterRegistry.map((definition) => [definition.id, definition])
);

export function getRegisteredAdapter(id) {
  if (!adaptersById.has(id)) {
    throw new Error(`unknown benchmark adapter: ${String(id)}`);
  }
  return adaptersById.get(id);
}

export function createRegisteredAdapter(id, config) {
  return getRegisteredAdapter(id).create(config);
}

export function getAdapterFactory(id) {
  const definition = getRegisteredAdapter(id);
  const installed = packageMetadata(definition.packageName);
  return (config) => ({
    ...definition.create(config),
    name: definition.id,
    ...installed,
    supportClaim:
      definition.id === "schema-shield" &&
      (config.draft === "draft2019-09" || config.draft === "draft2020-12")
        ? "experimental-observed"
        : "declared"
  });
}

export function getBenchmarkAdapterMetadata(id, draft) {
  const definition = getRegisteredAdapter(id);
  if (!definition.drafts.includes(draft)) {
    throw new Error(`unsupported draft: ${String(draft)}`);
  }
  return {
    id,
    name: id,
    displayName: definition.displayName,
    unsupported: definition.unsupported,
    compileEligible: supportsCompile(id, draft),
    ...packageMetadata(definition.packageName),
    supportClaim:
      id === "schema-shield" &&
      (draft === "draft2019-09" || draft === "draft2020-12")
        ? "experimental-observed"
        : "declared"
  };
}

const compileSupport = new Map();

export function supportsCompile(id, draft) {
  const key = `${draft}/${id}`;
  if (compileSupport.has(key)) {
    return compileSupport.get(key);
  }
  const runtime = createRegisteredAdapter(id, {
    draft,
    formatProfile: "base",
    resources: [],
    unknownFormats: []
  });
  const supported = typeof runtime.compile === "function";
  compileSupport.set(key, supported);
  return supported;
}

export function getCompileRegistryParticipants(draft) {
  return adapterRegistry.filter(
    (definition) =>
      definition.drafts.includes(draft) && supportsCompile(definition.id, draft)
  );
}

export function getRegistryRoundOrder({ draft, phase, round }) {
  if (phase !== "compile" && phase !== "execution") {
    throw new Error(`unknown benchmark phase: ${phase}`);
  }
  if (!Number.isInteger(round) || round < 1 || round > 9) {
    throw new Error("round must be an integer from 1 through 9");
  }
  return (
    phase === "compile"
      ? getCompileRegistryParticipants(draft)
      : adapterRegistry.filter((definition) => definition.drafts.includes(draft))
  )
    .sort(compareCanonicalAdapters)
    .map(({ id }) => id);
}

export const registryMetadata = Object.freeze(
  adapterRegistry.map(({ id, packageName, displayName, drafts, unsupported }) =>
    Object.freeze({ id, packageName, displayName, drafts, unsupported })
  )
);
