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

function createImplementation({ draft, formatProfile, resources }) {
  const dialect = {
    draft4: "http://json-schema.org/draft-04/schema#",
    draft6: "http://json-schema.org/draft-06/schema#",
    draft7: "http://json-schema.org/draft-07/schema#",
    "draft2019-09": "https://json-schema.org/draft/2019-09/schema",
    "draft2020-12": "https://json-schema.org/draft/2020-12/schema"
  }[draft];
  const fastOptions = { failFast: true, useDefaults: false, immutable: false };
  const detailedOptions = {
    failFast: false,
    useDefaults: false,
    immutable: false
  };
  const compileOptions = { validateSchema: true };
  function createInstance(options) {
    const instance = new SchemaShield(options);
    for (const [alias, builtinUri] of builtinMetaschemaAliases) {
      instance.addSchema({ $ref: builtinUri }, { uri: alias });
    }
    for (const resource of resources) {
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
        continue;
      }
      const schema =
        resource.schema !== null &&
        typeof resource.schema === "object" &&
        !Array.isArray(resource.schema) &&
        typeof resource.schema.$schema !== "string"
          ? { ...resource.schema, $schema: resource.dialect ?? dialect }
          : resource.schema;
      instance.addSchema(schema, {
        uri: resource.canonicalUri,
        aliases: resource.aliases.filter(
          (alias) => alias !== resource.canonicalUri
        )
      });
    }
    return instance;
  }

  const fast = createInstance(fastOptions);
  let detailed = null;
  return {
    reportOptions: {
      formatProfile,
      defaultDialect: dialect,
      fast: fastOptions,
      detailed: detailedOptions,
      compile: compileOptions,
      formats: "built-in; unknown formats ignored",
      metaschemas: "built-in",
      resources: "registered"
    },
    setup(schema) {
      const prepared =
        schema !== null &&
        typeof schema === "object" &&
        !Array.isArray(schema) &&
        typeof schema.$schema !== "string"
          ? { ...schema, $schema: dialect }
          : schema;
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
      if (detailed === null) {
        detailed = createInstance(detailedOptions);
      }
      target.detailed ??= detailed.compile(target.schema, compileOptions);
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
    },
    supportClaims: {
      "draft2019-09": "experimental-observed",
      "draft2020-12": "experimental-observed"
    }
  },
  createImplementation
);
