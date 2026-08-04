import { readFileSync } from "node:fs";

import { adapter as schemaShield } from "./adapters/schema-shield.js";
import { adapter as ajv } from "./adapters/ajv.js";
import { adapter as schemasafe } from "./adapters/schemasafe.js";
import { adapter as redoclyAjv } from "./adapters/redocly-ajv.js";
import { adapter as cfworker } from "./adapters/cfworker-json-schema.js";
import { adapter as jsonSchemaLibrary } from "./adapters/json-schema-library.js";
import { adapter as jsonschema } from "./adapters/jsonschema.js";
import { adapter as djv } from "./adapters/djv.js";
import { adapter as zSchema } from "./adapters/z-schema.js";
import { adapter as hyperjump } from "./adapters/hyperjump.js";

function packageMetadata(name) {
  const metadata = JSON.parse(
    readFileSync(
      new URL(`../node_modules/${name}/package.json`, import.meta.url),
      "utf8"
    )
  );
  return {
    packageName: name,
    version: metadata.version,
    license: metadata.license,
    engines: metadata.engines ?? null
  };
}

export function compareCanonicalAdapters(left, right) {
  if (left.displayName < right.displayName) {
    return -1;
  }
  if (left.displayName > right.displayName) {
    return 1;
  }
  return left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
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

export const benchmarkPackageNames = Object.freeze(
  [
    ...new Set(
      adapterRegistry.flatMap(({ packageName, additionalPackages }) => [
        packageName,
        ...additionalPackages
      ])
    )
  ].sort()
);

const adaptersById = new Map(
  adapterRegistry.map((definition) => [definition.id, definition])
);

export function getRegisteredAdapter(id) {
  const definition = adaptersById.get(id);
  if (definition === undefined) {
    throw new Error(`unknown benchmark adapter: ${String(id)}`);
  }
  return definition;
}

export function createRegisteredAdapter(id, config) {
  return getRegisteredAdapter(id).create(config);
}

export function getAdapterFactory(id) {
  const definition = getRegisteredAdapter(id);
  const installed = packageMetadata(definition.packageName);
  return (config, options) => {
    const runtime = definition.create(config, options);
    const descriptors = Object.getOwnPropertyDescriptors(runtime);
    for (const [key, value] of Object.entries({
      name: definition.id,
      ...installed,
      supportClaim: definition.supportClaims[config.draft]
    })) {
      descriptors[key] = {
        enumerable: true,
        configurable: false,
        writable: false,
        value
      };
    }
    return Object.freeze(Object.defineProperties({}, descriptors));
  };
}

export function getSetupAdapterFactory(id) {
  const definition = getRegisteredAdapter(id);
  const installed = packageMetadata(definition.packageName);
  return (config) => {
    const operation = definition.prepareSetup(config);
    return Object.freeze({ version: installed.version, ...operation });
  };
}

export function getColdExecutionAdapterFactory(id) {
  const definition = getRegisteredAdapter(id);
  const installed = packageMetadata(definition.packageName);
  return (config) => {
    const operation = definition.prepareColdExecution(config);
    return Object.freeze({ version: installed.version, ...operation });
  };
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
    setupEligible: supportsSetup(id, draft),
    ...packageMetadata(definition.packageName),
    supportClaim: definition.supportClaims[draft]
  };
}

export const participantImplementations = Object.freeze(
  Object.fromEntries(
    adapterRegistry.map(({ id, implementation }) => [id, implementation])
  )
);

export function getRegistrySupportClaim(id, draft) {
  const definition = getRegisteredAdapter(id);
  if (!definition.drafts.includes(draft)) {
    throw new Error(`unsupported draft: ${String(draft)}`);
  }
  return definition.supportClaims[draft];
}

const setupSupport = new Map();

export function supportsSetup(id, draft) {
  const key = `${draft}/${id}`;
  if (!setupSupport.has(key)) {
    const runtime = createRegisteredAdapter(id, {
      draft,
      formatProfile: "base",
      resources: [],
      unknownFormats: []
    });
    setupSupport.set(key, typeof runtime.setup === "function");
  }
  return setupSupport.get(key);
}

export function getSetupRegistryParticipants(draft) {
  return adapterRegistry.filter(
    (definition) =>
      definition.drafts.includes(draft) && supportsSetup(definition.id, draft)
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
      ? getSetupRegistryParticipants(draft)
      : phase === "cold-execution"
        ? getColdExecutionRegistryParticipants(draft)
        : adapterRegistry.filter((definition) =>
            definition.drafts.includes(draft)
          )
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
  adapterRegistry.map(
    ({ id, packageName, additionalPackages, displayName, drafts, unsupported }) =>
      Object.freeze({
        id,
        packageName,
        additionalPackages,
        displayName,
        drafts,
        unsupported
      })
  )
);
