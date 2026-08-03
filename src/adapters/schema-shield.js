import { isDeepStrictEqual } from "node:util";
import { readFileSync } from "node:fs";

import { SchemaShield } from "schema-shield";

import { ADAPTER_CAPABILITIES, defineAdapter } from "../adapter-api.js";

let metaschemaManifest = null;
const metaschemaCache = new Map();

function createImplementation({ draft, formatProfile, resources, unknownFormats }) {
  metaschemaManifest ??= JSON.parse(
    readFileSync(new URL("../../metaschemas/manifest.json", import.meta.url), "utf8")
  );
  if (!metaschemaCache.has(draft)) {
    metaschemaCache.set(
      draft,
      metaschemaManifest.files
        .filter((entry) => entry.draft === draft)
        .map((entry) => ({
          ...entry,
          schema: JSON.parse(
            readFileSync(
              new URL(`../../metaschemas/${entry.path}`, import.meta.url),
              "utf8"
            )
          )
        }))
    );
  }
  const metaschemas = metaschemaCache.get(draft);
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
  function identity(value) {
    if (typeof value !== "string" || value.length === 0) {
      return null;
    }
    try {
      const url = new URL(value);
      url.hash = "";
      return url.href;
    } catch {
      return value.split("#")[0];
    }
  }
  function createInstance(options) {
    const instance = new SchemaShield(options);
    for (const format of unknownFormats) {
      instance.addFormat(format, () => true);
    }
    const consumed = new Set();
    for (const metaschema of metaschemas) {
      const identities = new Set(
        [
          metaschema.uri,
          metaschema.schema.$id,
          metaschema.schema.id,
          ...metaschema.aliases
        ]
          .map(identity)
          .filter((value) => value !== null)
      );
      let foundMatch = true;
      while (foundMatch) {
        foundMatch = false;
        for (const resource of resources) {
          if (consumed.has(resource)) {
            continue;
          }
          const resourceIdentities = [
            ...resource.aliases,
            resource.schema?.$id,
            resource.schema?.id
          ]
            .map(identity)
            .filter((value) => value !== null);
          if (
            resourceIdentities.some((value) => identities.has(value)) &&
            isDeepStrictEqual(resource.schema, metaschema.schema)
          ) {
            for (const value of resourceIdentities) {
              identities.add(value);
            }
            consumed.add(resource);
            foundMatch = true;
          }
        }
      }
      const idKeyword = typeof metaschema.schema.$id === "string" ? "$id" : "id";
      const schemaId = metaschema.schema[idKeyword];
      const registrationSchema =
        typeof schemaId === "string" && schemaId.endsWith("#")
          ? { ...metaschema.schema, [idKeyword]: schemaId.slice(0, -1) }
          : metaschema.schema;
      const uri = identity(metaschema.uri);
      instance.addSchema(registrationSchema, {
        uri,
        aliases: [...identities].filter((value) => value !== uri)
      });
    }
    for (const resource of resources) {
      if (consumed.has(resource)) {
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
        validate: fast.compile(prepared),
        detailed: null
      };
    },
    validate(target, data) {
      return target.validate(data).valid;
    },
    getError({ target, data }) {
      if (detailed === null) {
        detailed = new SchemaShield(detailedOptions);
        for (const format of unknownFormats) {
          detailed.addFormat(format, () => true);
        }
        const consumed = new Set();
        for (const metaschema of metaschemas) {
          const identities = new Set(
            [
              metaschema.uri,
              metaschema.schema.$id,
              metaschema.schema.id,
              ...metaschema.aliases
            ]
              .map((value) => {
                if (typeof value !== "string" || value.length === 0) {
                  return null;
                }
                try {
                  const url = new URL(value);
                  url.hash = "";
                  return url.href;
                } catch {
                  return value.split("#")[0];
                }
              })
              .filter((value) => value !== null)
          );
          let foundMatch = true;
          while (foundMatch) {
            foundMatch = false;
            for (const resource of resources) {
              if (consumed.has(resource)) {
                continue;
              }
              const resourceIdentities = [
                ...resource.aliases,
                resource.schema?.$id,
                resource.schema?.id
              ]
                .map((value) => {
                  if (typeof value !== "string" || value.length === 0) {
                    return null;
                  }
                  try {
                    const url = new URL(value);
                    url.hash = "";
                    return url.href;
                  } catch {
                    return value.split("#")[0];
                  }
                })
                .filter((value) => value !== null);
              if (
                resourceIdentities.some((value) => identities.has(value)) &&
                isDeepStrictEqual(resource.schema, metaschema.schema)
              ) {
                for (const value of resourceIdentities) {
                  identities.add(value);
                }
                consumed.add(resource);
                foundMatch = true;
              }
            }
          }
          const idKeyword =
            typeof metaschema.schema.$id === "string" ? "$id" : "id";
          const schemaId = metaschema.schema[idKeyword];
          const registrationSchema =
            typeof schemaId === "string" && schemaId.endsWith("#")
              ? { ...metaschema.schema, [idKeyword]: schemaId.slice(0, -1) }
              : metaschema.schema;
          let uri;
          if (typeof metaschema.uri !== "string" || metaschema.uri.length === 0) {
            uri = null;
          } else {
            try {
              const url = new URL(metaschema.uri);
              url.hash = "";
              uri = url.href;
            } catch {
              uri = metaschema.uri.split("#")[0];
            }
          }
          detailed.addSchema(registrationSchema, {
            uri,
            aliases: [...identities].filter((value) => value !== uri)
          });
        }
        for (const resource of resources) {
          if (consumed.has(resource)) {
            continue;
          }
          const schema =
            resource.schema !== null &&
            typeof resource.schema === "object" &&
            !Array.isArray(resource.schema) &&
            typeof resource.schema.$schema !== "string"
              ? { ...resource.schema, $schema: resource.dialect ?? dialect }
              : resource.schema;
          detailed.addSchema(schema, {
            uri: resource.canonicalUri,
            aliases: resource.aliases.filter(
              (alias) => alias !== resource.canonicalUri
            )
          });
        }
      }
      target.detailed ??= detailed.compile(target.schema);
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
