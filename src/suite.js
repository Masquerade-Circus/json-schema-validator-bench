import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  writeFile
} from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { schemaForFormatProfile as schemaForFormatProfileValue } from "./schema-profile.js";
import { commonFormats } from "./formats.js";

export { commonFormats } from "./formats.js";

import { draftIds, getDraft } from "./matrix.js";
import { getResultsRoot } from "./paths.js";

const benchmarksRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultSuiteRoot = path.join(
  benchmarksRoot,
  ".cache",
  "json-schema-test-suite"
);

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function canonicalJson(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error("canonical JSON rejects non-finite numbers");
    }
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalJson(item)).join(",")}]`;
  }
  if (typeof value === "object") {
    const entries = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`);
    return `{${entries.join(",")}}`;
  }
  throw new Error(`canonical JSON does not support ${typeof value}`);
}

const unsupportedStandardFormats = new Set([
  "idn-email",
  "idn-hostname",
  "iri",
  "iri-reference"
]);
const singleSchemaKeywords = [
  "additionalItems",
  "additionalProperties",
  "contains",
  "contentSchema",
  "else",
  "if",
  "items",
  "not",
  "propertyNames",
  "unevaluatedItems",
  "unevaluatedProperties",
  "then"
];
const schemaArrayKeywords = ["allOf", "anyOf", "oneOf", "prefixItems"];
const schemaMapKeywords = [
  "$defs",
  "definitions",
  "dependentSchemas",
  "dependencies",
  "patternProperties",
  "properties"
];

function visitSchemas(schema, visit, baseUri = null) {
  if (typeof schema === "boolean" || schema === null || typeof schema !== "object") {
    return;
  }

  let currentBase = baseUri;
  const identifier =
    typeof schema.$id === "string"
      ? schema.$id
      : typeof schema.id === "string"
        ? schema.id
        : null;
  if (identifier !== null) {
    try {
      currentBase = new URL(identifier, baseUri ?? undefined).href;
    } catch {
      currentBase = identifier;
    }
  }
  visit(schema, currentBase);

  for (const keyword of singleSchemaKeywords) {
    const child = schema[keyword];
    if (keyword === "items" && Array.isArray(child)) {
      for (const item of child) {
        visitSchemas(item, visit, currentBase);
      }
    } else {
      visitSchemas(child, visit, currentBase);
    }
  }
  for (const keyword of schemaArrayKeywords) {
    if (Array.isArray(schema[keyword])) {
      for (const child of schema[keyword]) {
        visitSchemas(child, visit, currentBase);
      }
    }
  }
  for (const keyword of schemaMapKeywords) {
    const children = schema[keyword];
    if (children !== null && typeof children === "object" && !Array.isArray(children)) {
      for (const child of Object.values(children)) {
        if (keyword !== "dependencies" || !Array.isArray(child)) {
          visitSchemas(child, visit, currentBase);
        }
      }
    }
  }
}

export function analyzeSchemaCapabilities(schema) {
  const formats = new Set();
  const externalRefs = new Set();
  const embeddedResources = new Set();

  visitSchemas(schema, (subschema, baseUri) => {
    if (typeof subschema.format === "string") {
      formats.add(subschema.format);
    }
    if (typeof baseUri === "string" && /^https?:/.test(baseUri)) {
      embeddedResources.add(baseUri.split("#")[0]);
    }
  });
  visitSchemas(schema, (subschema, baseUri) => {
    for (const keyword of ["$ref", "$recursiveRef", "$dynamicRef"]) {
      if (typeof subschema[keyword] !== "string") {
        continue;
      }
      try {
        const resolved = new URL(subschema[keyword], baseUri ?? undefined);
        const resource = resolved.href.split("#")[0];
        if (/^https?:/.test(resolved.protocol) && !embeddedResources.has(resource)) {
          externalRefs.add(resolved.href);
        }
      } catch {
        // Relative and fragment references without an absolute base stay inside the root schema.
      }
    }
  });

  return {
    unsupportedFormats: [...formats]
      .filter((format) => unsupportedStandardFormats.has(format))
      .sort(),
    unknownFormats: [...formats]
      .filter(
        (format) =>
          !commonFormats.includes(format) && !unsupportedStandardFormats.has(format)
      )
      .sort(),
    externalRefs: [...externalRefs].sort()
  };
}

export function listSchemaReferences(schema, initialBase = null) {
  const references = [];
  visitSchemas(schema, (subschema, baseUri) => {
    for (const keyword of ["$ref", "$recursiveRef", "$dynamicRef"]) {
      if (typeof subschema[keyword] !== "string") {
        continue;
      }
      try {
        references.push(
          new URL(subschema[keyword], baseUri ?? initialBase ?? undefined).href
        );
      } catch {
        if (!subschema[keyword].startsWith("#")) {
          references.push(subschema[keyword]);
        }
      }
    }
  }, initialBase);
  return references;
}

export function listSchemaResourceIds(schema, initialBase = null) {
  const resources = new Set();
  visitSchemas(
    schema,
    (_subschema, baseUri) => {
      if (typeof baseUri === "string" && /^https?:/.test(baseUri)) {
        resources.add(baseUri.split("#")[0]);
      }
    },
    initialBase
  );
  return [...resources].sort();
}

export function getFormatProfile(draft, relativePath) {
  getDraft(draft);
  const normalized = relativePath.replaceAll("\\", "/");
  if (normalized.startsWith("optional/format/")) {
    return "format-assertion";
  }
  if (
    draft === "draft2020-12" &&
    normalized === "optional/format-assertion.json"
  ) {
    return "format-assertion";
  }
  return "base";
}

export function schemaForFormatProfile(schema, draft, formatProfile) {
  return schemaForFormatProfileValue(schema, draft, formatProfile);
}

function normalizeResourceUri(uri, base = null) {
  try {
    return new URL(uri, base ?? undefined).href;
  } catch {
    return null;
  }
}

export function createResourceRegistry({ rootSchemas, remoteEntries }) {
  const globalAliases = new Map();
  const scopedAliases = new Map();
  const allRecords = new Set();
  let misses = 0;

  function addAlias(map, alias, record) {
    const normalized = normalizeResourceUri(alias);
    if (normalized === null) {
      return;
    }
    const existing = map.get(normalized);
    if (existing !== undefined && existing.schema !== record.schema) {
      throw new Error(`local resource alias collision: ${normalized}`);
    }
    map.set(normalized, record);
    record.aliases.add(normalized);
  }

  function registerDocument({
    schema,
    ownerId,
    draft,
    initialBase,
    canonicalUri,
    aliases,
    targetMap
  }) {
    const rootDialect = typeof schema?.$schema === "string" ? schema.$schema : null;
    let rootRecord = null;
    visitSchemas(schema, (subschema, baseUri) => {
      const identifier =
        typeof subschema.$id === "string"
          ? subschema.$id
          : typeof subschema.id === "string"
            ? subschema.id
            : null;
      const isRoot = subschema === schema;
      const normalizedBase =
        typeof baseUri === "string" ? normalizeResourceUri(baseUri) : null;
      let record = rootRecord;
      const baseHasFragment =
        normalizedBase !== null && new URL(normalizedBase).hash.length > 0;
      if (isRoot && normalizedBase === null) {
        record = {
          ownerId,
          draft,
          documentRoot: true,
          canonicalUri: null,
          uri: null,
          schema: subschema,
          dialect: rootDialect,
          aliases: new Set(),
          anchors: [],
          recursiveAnchor: subschema.$recursiveAnchor === true,
          dynamicAnchors: [],
          references: listSchemaReferences(subschema)
        };
        allRecords.add(record);
        rootRecord = record;
      }
      if (
        (isRoot || (identifier !== null && !baseHasFragment)) &&
        normalizedBase !== null
      ) {
        const resourceUrl = new URL(normalizedBase);
        resourceUrl.hash = "";
        record = {
          ownerId,
          draft,
          documentRoot: isRoot,
          canonicalUri:
            isRoot && typeof canonicalUri === "string"
              ? canonicalUri.split("#")[0]
              : null,
          uri: resourceUrl.href,
          schema: subschema,
          dialect:
            typeof subschema.$schema === "string"
              ? subschema.$schema
              : rootDialect,
          aliases: new Set(),
          anchors: [],
          recursiveAnchor: subschema.$recursiveAnchor === true,
          dynamicAnchors: [],
          references: listSchemaReferences(subschema, normalizedBase)
        };
        allRecords.add(record);
        addAlias(targetMap, record.uri, record);
        if (isRoot) {
          rootRecord = record;
        }
      }
      if (
        identifier !== null &&
        baseHasFragment &&
        record !== null &&
        normalizedBase !== null
      ) {
        const fragmentRecord = {
          ...record,
          schema: subschema,
          aliases: record.aliases,
          anchor: new URL(normalizedBase).hash.slice(1)
        };
        addAlias(targetMap, normalizedBase, fragmentRecord);
      }
      if (record === null || normalizedBase === null) {
        return;
      }
      if (typeof subschema.$anchor === "string") {
        const anchorUri = `${normalizedBase.split("#")[0]}#${subschema.$anchor}`;
        const anchorRecord = {
          ...record,
          schema: subschema,
          aliases: record.aliases,
          anchor: subschema.$anchor
        };
        record.anchors.push(subschema.$anchor);
        addAlias(targetMap, anchorUri, anchorRecord);
      }
      if (typeof subschema.$dynamicAnchor === "string") {
        const anchorUri = `${normalizedBase.split("#")[0]}#${subschema.$dynamicAnchor}`;
        const anchorRecord = {
          ...record,
          schema: subschema,
          aliases: record.aliases,
          dynamicAnchor: subschema.$dynamicAnchor
        };
        record.dynamicAnchors.push(subschema.$dynamicAnchor);
        addAlias(targetMap, anchorUri, anchorRecord);
      }
      if (subschema.$recursiveAnchor === true) {
        record.recursiveAnchor = true;
      }
    }, initialBase);
    if (rootRecord !== null) {
      for (const alias of aliases) {
        addAlias(targetMap, alias, rootRecord);
      }
    }
  }

  for (const remote of remoteEntries) {
    registerDocument({
      schema: remote.schema,
      ownerId: remote.canonicalUrl,
      draft: remote.draft ?? null,
      initialBase: remote.canonicalUrl,
      canonicalUri: remote.canonicalUrl,
      aliases: remote.aliases,
      targetMap: globalAliases
    });
  }
  for (const root of rootSchemas) {
    const scope = new Map();
    scopedAliases.set(root.id, scope);
    registerDocument({
      schema: root.schema,
      ownerId: root.id,
      draft: root.draft,
      initialBase: null,
      canonicalUri: null,
      aliases: [],
      targetMap: scope
    });
  }

  return {
    resolve(uri, ownerId = null) {
      const normalized = normalizeResourceUri(uri);
      const scoped = ownerId === null ? null : scopedAliases.get(ownerId);
      let record = scoped?.get(normalized) ?? globalAliases.get(normalized);
      if (record === undefined && ownerId === null) {
        const matches = [];
        for (const scope of scopedAliases.values()) {
          const candidate = scope.get(normalized);
          if (candidate !== undefined && !matches.includes(candidate)) {
            matches.push(candidate);
          }
        }
        if (matches.length === 1) {
          [record] = matches;
        }
      }
      if (record === undefined) {
        misses += 1;
        const error = new Error(`local resource not found: ${uri}`);
        error.code = "LOCAL_RESOURCE_NOT_FOUND";
        throw error;
      }
      return record;
    },
    resourcesFor(ownerId) {
      const resources = new Set();
      const queue = [...allRecords]
        .filter((record) => record.ownerId === ownerId)
        .flatMap((record) => [record.dialect, ...record.references])
        .filter((reference) => typeof reference === "string");
      while (queue.length > 0) {
        const reference = queue.shift();
        const normalized = normalizeResourceUri(reference);
        const resourceUri =
          normalized === null ? null : normalized.split("#")[0];
        const record =
          scopedAliases.get(ownerId)?.get(normalized) ??
          globalAliases.get(normalized) ??
          scopedAliases.get(ownerId)?.get(resourceUri) ??
          globalAliases.get(resourceUri);
        if (record === undefined || record.ownerId === ownerId) {
          continue;
        }
        const documentRoot = [...allRecords].find(
          (candidate) =>
            candidate.ownerId === record.ownerId &&
            candidate.documentRoot === true
        );
        if (documentRoot === undefined || resources.has(documentRoot)) {
          continue;
        }
        resources.add(documentRoot);
        queue.push(
          ...[documentRoot.dialect, ...documentRoot.references].filter(
            (candidate) => typeof candidate === "string"
          )
        );
      }
      return [...resources];
    },
    get entries() {
      return [...allRecords];
    },
    get misses() {
      return misses;
    }
  };
}

async function walkJson(root, relativeRoot = "") {
  const directory = path.join(root, relativeRoot);
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const files = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const relativePath = path.posix.join(relativeRoot, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkJson(root, relativePath)));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(relativePath);
    }
  }
  return files;
}

async function gitInventory(suiteRoot, commit, drafts) {
  const roots = drafts.map((draft) => `tests/${draft}`);
  const args = [
    "-C",
    suiteRoot,
    "ls-tree",
    "-r",
    "--name-only",
    commit,
    "--",
    ...roots
  ];

  return new Promise((resolve, reject) => {
    const child = spawn("git", args, {
      cwd: benchmarksRoot,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.once("error", reject);
    child.once("close", (code) => {
      if (code !== 0) {
        reject(new Error(`git inventory failed with code ${code}: ${stderr.trim()}`));
        return;
      }
      resolve(
        stdout
          .split("\n")
          .filter((file) => file.endsWith(".json"))
          .sort()
      );
    });
  });
}

function parseJson(raw, relativePath) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`invalid JSON in ${relativePath}: ${error.message}`);
  }
}

function validateGroup(group, relativePath, groupIndex) {
  if (group === null || typeof group !== "object" || Array.isArray(group)) {
    throw new Error(`${relativePath} group ${groupIndex} must be an object`);
  }
  if (!Object.hasOwn(group, "schema")) {
    throw new Error(`${relativePath} group ${groupIndex} lacks schema`);
  }
  if (!Array.isArray(group.tests)) {
    throw new Error(`${relativePath} group ${groupIndex} lacks tests array`);
  }
}

function validateTest(testCase, relativePath, groupIndex, testIndex) {
  if (testCase === null || typeof testCase !== "object" || Array.isArray(testCase)) {
    throw new Error(
      `${relativePath} group ${groupIndex} test ${testIndex} must be an object`
    );
  }
  if (!Object.hasOwn(testCase, "data")) {
    throw new Error(
      `${relativePath} group ${groupIndex} test ${testIndex} lacks data`
    );
  }
  if (typeof testCase.valid !== "boolean") {
    throw new Error(
      `${relativePath} group ${groupIndex} test ${testIndex} lacks boolean valid`
    );
  }
}

async function loadRemotes(suiteRoot) {
  const remotePaths = await walkJson(suiteRoot, "remotes");
  const remotes = new Map();
  const remoteEntries = [];

  for (const fullRelativePath of remotePaths) {
    const remotePath = fullRelativePath.slice("remotes/".length);
    const raw = await readFile(path.join(suiteRoot, fullRelativePath), "utf8");
    const schema = parseJson(raw, fullRelativePath);
    const canonicalUrl = new URL(
      remotePath,
      "http://localhost:1234/"
    ).href;
    const aliases = [canonicalUrl];
    if (typeof schema?.$id === "string") {
      let absoluteId;
      try {
        absoluteId = new URL(schema.$id).href;
      } catch {
        absoluteId = null;
      }
      if (absoluteId !== null && !aliases.includes(absoluteId)) {
        aliases.push(absoluteId);
      }
    }

    for (const alias of aliases) {
      if (remotes.has(alias) && remotes.get(alias) !== schema) {
        throw new Error(`remote alias collision: ${alias}`);
      }
      remotes.set(alias, schema);
    }
    remoteEntries.push({
      path: remotePath,
      canonicalUrl,
      aliases,
      dialect: typeof schema?.$schema === "string" ? schema.$schema : null,
      sha256: sha256(raw),
      schema
    });
  }

  return { remotes, remoteEntries };
}

async function writeManifestAtomically(manifest) {
  const runDirectory = path.join(
    benchmarksRoot,
    ".cache",
    `run-suite-${process.pid}`
  );
  const resultsDirectory = getResultsRoot();
  const stagedPath = path.join(runDirectory, "suite-manifest.json");
  const targetPath = path.join(resultsDirectory, "suite-manifest.json");
  await mkdir(runDirectory, { recursive: true });
  await mkdir(resultsDirectory, { recursive: true });
  await writeFile(stagedPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await rename(stagedPath, targetPath);
}

export async function loadSuite({
  suiteRoot = defaultSuiteRoot,
  lock,
  inventoryPaths,
  writeManifest = true
}) {
  if (!Array.isArray(lock?.drafts) || lock.drafts.length === 0) {
    throw new Error("suite lock must provide at least one draft");
  }

  const files = [];
  for (const draft of lock.drafts) {
    getDraft(draft);
    const discovered = await walkJson(suiteRoot, `tests/${draft}`);
    for (const fullRelativePath of discovered) {
      files.push({
        draft,
        fullRelativePath,
        relativePath: fullRelativePath.slice(`tests/${draft}/`.length)
      });
    }
  }
  files.sort((left, right) => {
    const draftOrder = draftIds.indexOf(left.draft) - draftIds.indexOf(right.draft);
    return draftOrder || left.relativePath.localeCompare(right.relativePath);
  });

  const inventory = (
    inventoryPaths ?? (await gitInventory(suiteRoot, lock.commit, lock.drafts))
  )
    .filter((file) => file.endsWith(".json"))
    .sort();
  const discoveredPaths = files.map(({ fullRelativePath }) => fullRelativePath).sort();
  if (
    inventory.length !== discoveredPaths.length ||
    inventory.some((file, index) => file !== discoveredPaths[index])
  ) {
    throw new Error(
      `suite inventory mismatch: git has ${inventory.length} JSON files, loader found ${discoveredPaths.length}`
    );
  }

  const cases = [];
  const schemas = [];
  const manifestFiles = [];
  const ids = new Set();
  const counts = {};
  for (const draft of lock.drafts) {
    counts[draft] = { files: 0, schemas: 0, cases: 0 };
  }

  for (const file of files) {
    const raw = await readFile(path.join(suiteRoot, file.fullRelativePath), "utf8");
    const groups = parseJson(raw, file.fullRelativePath);
    if (!Array.isArray(groups)) {
      throw new Error(`${file.fullRelativePath} must contain an array`);
    }

    let fileCases = 0;
    groups.forEach((group, groupIndex) => {
      validateGroup(group, file.fullRelativePath, groupIndex);
      const schemaId = `${file.draft}:${file.relativePath}#/groups/${groupIndex}`;
      const formatProfile = getFormatProfile(file.draft, file.relativePath);
      if (ids.has(schemaId)) {
        throw new Error(`schema ID collision: ${schemaId}`);
      }
      ids.add(schemaId);
      schemas.push({
        id: schemaId,
        draft: file.draft,
        file: file.relativePath,
        groupIndex,
        description: group.description ?? "",
        formatProfile,
        schema: group.schema,
        schemaHash: sha256(canonicalJson(group.schema))
      });

      group.tests.forEach((testCase, testIndex) => {
        validateTest(testCase, file.fullRelativePath, groupIndex, testIndex);
        const id = `${schemaId}/tests/${testIndex}`;
        if (ids.has(id)) {
          throw new Error(`case ID collision: ${id}`);
        }
        ids.add(id);
        cases.push({
          id,
          schemaId,
          draft: file.draft,
          file: file.relativePath,
          groupIndex,
          testIndex,
          groupDescription: group.description ?? "",
          description: testCase.description ?? "",
          formatProfile,
          expected: testCase.valid,
          data: testCase.data
        });
        fileCases += 1;
      });
    });

    counts[file.draft].files += 1;
    counts[file.draft].schemas += groups.length;
    counts[file.draft].cases += fileCases;
    manifestFiles.push({
      draft: file.draft,
      path: file.relativePath,
      formatProfile: getFormatProfile(file.draft, file.relativePath),
      sha256: sha256(raw),
      schemas: groups.length,
      cases: fileCases
    });
  }

  const { remotes, remoteEntries } = await loadRemotes(suiteRoot);
  const resourceRegistry = createResourceRegistry({
    rootSchemas: schemas,
    remoteEntries
  });
  const manifestBase = {
    commit: lock.commit,
    tree: lock.tree,
    drafts: lock.drafts,
    files: manifestFiles,
    schemas: schemas.map(({ schema, ...metadata }) => metadata),
    cases: cases.map(({ data, ...metadata }) => metadata),
    remotes: remoteEntries.map(({ schema, ...metadata }) => metadata),
    counts: {
      byDraft: counts,
      files: manifestFiles.length,
      schemas: schemas.length,
      cases: cases.length,
      remotes: remoteEntries.length,
      resources: resourceRegistry.entries.length
    }
  };
  const manifest = {
    ...manifestBase,
    manifestSha256: sha256(canonicalJson(manifestBase))
  };

  if (writeManifest) {
    await writeManifestAtomically(manifest);
  }

  return {
    manifest,
    cases,
    schemas,
    remotes,
    remoteEntries,
    resourceRegistry
  };
}

export const suitePaths = {
  benchmarksRoot,
  defaultSuiteRoot
};
