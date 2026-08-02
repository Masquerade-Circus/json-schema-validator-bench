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

export const participantImplementations = Object.freeze({
  "schema-shield": Object.freeze({ api: "reusable-sync", isolation: "fresh-instance", dynamicCode: "not-observed" }),
  ajv: Object.freeze({ api: "reusable-sync", isolation: "fresh-instance", dynamicCode: "observed" }),
  schemasafe: Object.freeze({ api: "reusable-sync", isolation: "fresh-instance", dynamicCode: "observed" }),
  "redocly-ajv": Object.freeze({ api: "reusable-sync", isolation: "fresh-instance", dynamicCode: "observed" }),
  "cfworker-json-schema": Object.freeze({ api: "reusable-sync", isolation: "fresh-instance", dynamicCode: "not-observed" }),
  "json-schema-library": Object.freeze({ api: "reusable-sync", isolation: "fresh-instance", dynamicCode: "not-observed" }),
  jsonschema: Object.freeze({ api: "validate-only", isolation: "fresh-instance", dynamicCode: "not-observed" }),
  djv: Object.freeze({ api: "reusable-sync", isolation: "fresh-instance", dynamicCode: "observed" }),
  "z-schema": Object.freeze({ api: "reusable-sync", isolation: "fresh-instance", dynamicCode: "not-observed" }),
  hyperjump: Object.freeze({ api: "reusable-async", isolation: "module-global-unavailable", dynamicCode: "not-observed" })
});

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

export function getColdExecutionRegistryParticipants(draft) {
  return adapterRegistry.filter(
    (definition) =>
      definition.drafts.includes(draft) &&
      participantImplementations[definition.id].isolation !==
        "module-global-unavailable"
  );
}

export function getRegistryRoundOrder({ draft, phase, round }) {
  if (!["setup", "execution", "cold-execution"].includes(phase)) {
    throw new Error(`unknown benchmark phase: ${phase}`);
  }
  if (!Number.isInteger(round) || round < 1 || round > 9) {
    throw new Error("round must be an integer from 1 through 9");
  }
  const participants = (
    phase === "setup"
      ? getCompileRegistryParticipants(draft)
      : phase === "cold-execution"
        ? getColdExecutionRegistryParticipants(draft)
      : adapterRegistry.filter((definition) => definition.drafts.includes(draft))
  )
    .sort(compareCanonicalAdapters)
    .map(({ id }) => id);
  return rotateRoundOrder(participants, round);
}

export function rotateRoundOrder(participants, round) {
  if (!Array.isArray(participants) || participants.length === 0) {
    return [];
  }
  if (!Number.isInteger(round) || round < 1) {
    throw new Error("round must be a positive integer");
  }
  const pair = Math.floor((round - 1) / 2) % 3;
  const offset = Math.floor((pair * participants.length) / 3);
  const order = [...participants.slice(offset), ...participants.slice(0, offset)];
  return round % 2 === 0 ? order.reverse() : order;
}

export const registryMetadata = Object.freeze(
  adapterRegistry.map(({ id, packageName, displayName, drafts, unsupported }) =>
    Object.freeze({ id, packageName, displayName, drafts, unsupported })
  )
);
