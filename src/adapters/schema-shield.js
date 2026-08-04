import { SchemaShield } from "schema-shield";

import { ADAPTER_CAPABILITIES, defineAdapter } from "../adapter-api.js";

const builtinMetaschemaUris = [
  "http://json-schema.org/draft-04/schema#",
  "http://json-schema.org/draft-06/schema#",
  "http://json-schema.org/draft-07/schema#",
  "https://json-schema.org/draft/2019-09/schema",
  "https://json-schema.org/draft/2019-09/meta/core",
  "https://json-schema.org/draft/2019-09/meta/applicator",
  "https://json-schema.org/draft/2019-09/meta/validation",
  "https://json-schema.org/draft/2019-09/meta/meta-data",
  "https://json-schema.org/draft/2019-09/meta/format",
  "https://json-schema.org/draft/2019-09/meta/content",
  "https://json-schema.org/draft/2020-12/schema",
  "https://json-schema.org/draft/2020-12/meta/core",
  "https://json-schema.org/draft/2020-12/meta/applicator",
  "https://json-schema.org/draft/2020-12/meta/unevaluated",
  "https://json-schema.org/draft/2020-12/meta/validation",
  "https://json-schema.org/draft/2020-12/meta/meta-data",
  "https://json-schema.org/draft/2020-12/meta/format-annotation",
  "https://json-schema.org/draft/2020-12/meta/format-assertion",
  "https://json-schema.org/draft/2020-12/meta/content"
];
const builtinMetaschemaAliases = new Map([
  ["https://json-schema.org/draft-04/schema", builtinMetaschemaUris[0]],
  ["https://json-schema.org/draft-06/schema", builtinMetaschemaUris[1]],
  ["https://json-schema.org/draft-07/schema", builtinMetaschemaUris[2]],
  ["http://json-schema.org/draft/2019-09/schema", builtinMetaschemaUris[3]],
  ["http://json-schema.org/draft/2020-12/schema", builtinMetaschemaUris[10]]
]);
const builtinMetaschemaByResourceUri = new Map([
  ...builtinMetaschemaUris.map((uri) => [resourceUri(uri), uri]),
  ...builtinMetaschemaAliases
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

function resourceUri(value) {
  if (typeof value !== "string" || value.length === 0) {
    return null;
  }
  try {
    const url = new URL(value);
    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
}

function resolveUri(value, base = null) {
  if (typeof value !== "string" || value.length === 0) {
    return null;
  }
  try {
    return new URL(value, base ?? undefined).href;
  } catch {
    return null;
  }
}

function resolveResourceUri(value, base = null) {
  const resolved = resolveUri(value, base);
  return resolved === null ? null : resourceUri(resolved);
}

function visitSchemas(schema, visit, baseUri = null) {
  if (typeof schema === "boolean" || schema === null || typeof schema !== "object") {
    return;
  }
  const identifier =
    typeof schema.$id === "string"
      ? schema.$id
      : typeof schema.id === "string"
        ? schema.id
        : null;
  const currentBase =
    identifier === null ? baseUri : resolveResourceUri(identifier, baseUri) ?? baseUri;
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

function resourceBase(resource) {
  return (
    resolveResourceUri(resource.canonicalUri) ??
    resource.aliases.map((alias) => resolveResourceUri(alias)).find((uri) => uri !== null) ??
    resolveResourceUri(resource.schema?.$id) ??
    resolveResourceUri(resource.schema?.id)
  );
}

function normalizeDialect(schema, baseUri, fallbackDialect) {
  if (schema === null || typeof schema !== "object" || Array.isArray(schema)) {
    return schema;
  }
  if (typeof schema.$schema !== "string") {
    return { ...schema, $schema: fallbackDialect };
  }
  const resolvedDialect = resolveUri(schema.$schema, baseUri);
  return resolvedDialect === null || resolvedDialect === schema.$schema
    ? schema
    : { ...schema, $schema: resolvedDialect };
}

function createImplementation({ draft, formatProfile, resources }) {
  const dialect = {
    draft4: "http://json-schema.org/draft-04/schema#",
    draft6: "http://json-schema.org/draft-06/schema#",
    draft7: "http://json-schema.org/draft-07/schema#",
    "draft2019-09": "https://json-schema.org/draft/2019-09/schema",
    "draft2020-12": "https://json-schema.org/draft/2020-12/schema"
  }[draft];
  const format =
    draft === "draft4" ||
    draft === "draft6" ||
    draft === "draft7" ||
    formatProfile === "format-assertion";
  const fastOptions = {
    failFast: true,
    format,
    useDefaults: false,
    immutable: false
  };
  const detailedOptions = {
    failFast: false,
    format,
    useDefaults: false,
    immutable: false
  };
  const compileOptions = { validateSchema: true };
  function createInstance(options, rootSchema) {
    const instance = new SchemaShield(options);
    for (const [alias, builtinUri] of builtinMetaschemaAliases) {
      instance.addSchema({ $ref: builtinUri }, { uri: alias });
    }
    const identityOwners = new Map();
    for (const resource of resources) {
      const baseUri = resourceBase(resource);
      const identities = [resource.canonicalUri, ...resource.aliases];
      const builtinUri = [
        ...identities,
        resource.schema?.$id,
        resource.schema?.id
      ]
        .map(resourceUri)
        .map((uri) => builtinMetaschemaByResourceUri.get(uri))
        .find((uri) => typeof uri === "string");
      if (typeof builtinUri === "string") {
        continue;
      }
      visitSchemas(
        resource.schema,
        (_schema, nestedBase) => {
          identities.push(nestedBase);
        },
        baseUri
      );
      for (const identity of identities) {
        const normalized = resolveResourceUri(identity, baseUri);
        if (normalized !== null) {
          identityOwners.set(normalized, resource);
        }
      }
    }
    const metaschemas = new Set();
    const dependencies = new Map(
      resources.map((resource) => [resource, new Set()])
    );
    const sources = [
      { schema: rootSchema, baseUri: resolveResourceUri(rootSchema?.$id) },
      ...resources.map((resource) => ({
        schema: resource.schema,
        baseUri: resourceBase(resource),
        resource
      }))
    ];
    for (const source of sources) {
      visitSchemas(
        source.schema,
        (schema, baseUri) => {
          const targetUri = resolveResourceUri(
            schema.$schema,
            baseUri ?? source.baseUri
          );
          const target = targetUri === null ? null : identityOwners.get(targetUri);
          if (target !== null && target !== undefined) {
            metaschemas.add(target);
            if (source.resource !== undefined) {
              dependencies.get(source.resource).add(target);
            }
          }
        },
        source.baseUri
      );
    }

    function registerResource(resource, metaschema) {
      const identities = [
        resource.canonicalUri,
        ...resource.aliases,
        resource.schema?.$id,
        resource.schema?.id
      ];
      const builtinUri = identities
        .map(resourceUri)
        .map((uri) => builtinMetaschemaByResourceUri.get(uri))
        .find((uri) => typeof uri === "string");
      if (typeof builtinUri === "string") {
        instance.addSchema(resource.schema, { uri: builtinUri });
        const aliases = [
          ...new Set(
            identities
              .map(resourceUri)
              .filter(
                (uri) =>
                  uri !== null &&
                  uri !== resourceUri(builtinUri) &&
                  !builtinMetaschemaByResourceUri.has(uri)
              )
          )
        ];
        if (aliases.length > 0) {
          instance.addSchema(
            { $ref: builtinUri },
            { uri: aliases[0], aliases: aliases.slice(1) }
          );
        }
        return;
      }
      const schema = normalizeDialect(
        resource.schema,
        resourceBase(resource),
        resource.dialect ?? dialect
      );
      const registration = {
        uri: resource.canonicalUri,
        aliases: resource.aliases.filter(
          (alias) => alias !== resource.canonicalUri
        )
      };
      if (metaschema) {
        instance.addMetaSchema(schema, registration);
      } else {
        instance.addSchema(schema, registration);
      }
    }

    for (const resource of resources) {
      if (!metaschemas.has(resource)) {
        registerResource(resource, false);
      }
    }
    const registeredMetaschemas = new Set();
    const registeringMetaschemas = new Set();
    function registerMetaschema(resource) {
      if (registeredMetaschemas.has(resource)) {
        return;
      }
      if (registeringMetaschemas.has(resource)) {
        throw new Error("external metaschema dependency cycle");
      }
      registeringMetaschemas.add(resource);
      for (const dependency of dependencies.get(resource)) {
        if (metaschemas.has(dependency)) {
          registerMetaschema(dependency);
        }
      }
      registerResource(resource, true);
      registeringMetaschemas.delete(resource);
      registeredMetaschemas.add(resource);
    }
    for (const resource of resources) {
      if (metaschemas.has(resource)) {
        registerMetaschema(resource);
      }
    }
    return instance;
  }

  return {
    reportOptions: {
      formatProfile,
      defaultDialect: dialect,
      fast: fastOptions,
      detailed: detailedOptions,
      compile: compileOptions,
      formats: "built-in; unknown formats ignored",
      metaschemas: "built-in-and-referenced-external",
      resources: "registered"
    },
    setup(schema) {
      const prepared = normalizeDialect(schema, resolveResourceUri(schema?.$id), dialect);
      const fast = createInstance(fastOptions, prepared);
      return {
        schema: prepared,
        validate: fast.compile(prepared, compileOptions),
        detailed: null
      };
    },
    validate(target, data) {
      return target.validate(data).valid;
    },
    getError({ target, data }) {
      target.detailed ??= createInstance(detailedOptions, target.schema).compile(
        target.schema,
        compileOptions
      );
      const result = target.detailed(data);
      if (result.valid) {
        return null;
      }
      const error = result.error;
      return JSON.stringify(
        error === true || error === null || typeof error !== "object"
          ? {
              name: "ValidationError",
              message: "SchemaShield validation failed"
            }
          : {
              name: error.name ?? "ValidationError",
              message: error.message ?? "SchemaShield validation failed",
              keyword: error.keyword ?? null,
              code: error.code ?? null,
              schemaPath: error.schemaPath ?? null,
              instancePath: error.instancePath ?? null,
              tree: typeof error.getTree === "function" ? error.getTree() : null
            }
      );
    }
  };
}

const supportsExternalResources =
  typeof SchemaShield?.prototype?.addSchema === "function";

export const adapter = defineAdapter(
  {
    id: "schema-shield",
    packageName: "schema-shield",
    displayName: "SchemaShield",
    drafts: ["draft4", "draft6", "draft7", "draft2019-09", "draft2020-12"],
    unsupported: supportsExternalResources
      ? []
      : [ADAPTER_CAPABILITIES.EXTERNAL_SCHEMA_RESOURCES],
    implementation: {
      api: "reusable-sync",
      isolation: "fresh-instance",
      dynamicCode: "not-observed"
    }
  },
  createImplementation
);
