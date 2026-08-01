import { isDeepStrictEqual } from "node:util";

import { SchemaShield } from "schema-shield";

import { ADAPTER_CAPABILITIES, defineAdapter } from "../adapter-api.js";
import { loadMetaschemas } from "../metaschemas.js";
import { resourceIdentifiers } from "./helpers.js";

const dialectUris = {
  draft4: "http://json-schema.org/draft-04/schema#",
  draft6: "http://json-schema.org/draft-06/schema#",
  draft7: "http://json-schema.org/draft-07/schema#",
  "draft2019-09": "https://json-schema.org/draft/2019-09/schema",
  "draft2020-12": "https://json-schema.org/draft/2020-12/schema"
};

const fastOptions = {
  failFast: true,
  useDefaults: false,
  immutable: false
};
const detailedOptions = {
  failFast: false,
  useDefaults: false,
  immutable: false
};

function schemaIdentity(value) {
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

function createInstance(
  SchemaShieldClass,
  options,
  draft,
  unknownFormats,
  resources
) {
  const instance = new SchemaShieldClass(options);
  for (const format of unknownFormats) {
    instance.addFormat(format, () => true);
  }
  if (typeof instance.addSchema === "function") {
    const consumedResources = new Set();
    for (const metaschema of loadMetaschemas(draft)) {
      const identities = new Set(
        [
          metaschema.uri,
          metaschema.schema.$id,
          metaschema.schema.id,
          ...metaschema.aliases
        ]
          .map(schemaIdentity)
          .filter((identity) => identity !== null)
      );
      let foundMatch = true;
      while (foundMatch) {
        foundMatch = false;
        for (const resource of resources) {
          if (consumedResources.has(resource)) {
            continue;
          }
          const { aliases } = resourceIdentifiers(resource);
          const resourceIdentities = [
            ...aliases,
            resource.schema?.$id,
            resource.schema?.id
          ]
            .map(schemaIdentity)
            .filter((identity) => identity !== null);
          if (
            resourceIdentities.some((identity) => identities.has(identity)) &&
            isDeepStrictEqual(resource.schema, metaschema.schema)
          ) {
            for (const identity of resourceIdentities) {
              identities.add(identity);
            }
            consumedResources.add(resource);
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
      const uri = schemaIdentity(metaschema.uri);
      instance.addSchema(registrationSchema, {
        uri,
        aliases: [...identities].filter((identity) => identity !== uri)
      });
    }
    for (const resource of resources) {
      if (consumedResources.has(resource)) {
        continue;
      }
      const { aliases } = resourceIdentifiers(resource);
      const uri = resource.canonicalUri ?? resource.uri;
      const resourceSchema =
        resource.schema !== null &&
        typeof resource.schema === "object" &&
        !Array.isArray(resource.schema) &&
        typeof resource.schema.$schema !== "string"
          ? {
              ...resource.schema,
              $schema:
                resource.dialect ?? dialectUris[resource.draft] ?? dialectUris[draft]
            }
          : resource.schema;
      instance.addSchema(resourceSchema, {
        uri,
        aliases: aliases.filter((alias) => alias !== uri)
      });
    }
  }
  return instance;
}

function normalizeError(error) {
  if (error === true || error === null || typeof error !== "object") {
    return {
      name: "ValidationError",
      message: "SchemaShield validation failed"
    };
  }
  return {
    name: error.name ?? "ValidationError",
    message: error.message ?? "SchemaShield validation failed",
    keyword: error.keyword ?? null,
    code: error.code ?? null,
    schemaPath: error.schemaPath ?? null,
    instancePath: error.instancePath ?? null,
    tree: typeof error.getTree === "function" ? error.getTree() : null
  };
}

export function createSchemaShieldAdapter(SchemaShieldClass) {
  const supportsExternalResources =
    typeof SchemaShieldClass?.prototype?.addSchema === "function";
  function createImplementation({ draft, formatProfile, unknownFormats, resources }) {
    const fastInstance = createInstance(
      SchemaShieldClass,
      fastOptions,
      draft,
      unknownFormats,
      resources
    );
    let detailedInstance = null;
    return {
      reportOptions: {
        formatProfile,
        defaultDialect: dialectUris[draft],
        fast: fastOptions,
        detailed: detailedOptions,
        resources: supportsExternalResources ? "registered" : "unsupported"
      },
      compile(schema) {
        const dialectSchema =
          schema !== null &&
          typeof schema === "object" &&
          !Array.isArray(schema) &&
          typeof schema.$schema !== "string"
            ? { ...schema, $schema: dialectUris[draft] }
            : schema;
        return {
          schema: dialectSchema,
          validate: fastInstance.compile(dialectSchema),
          detailed: null
        };
      },
      validate(target, data) {
        return target.validate(data).valid;
      },
      getError({ compiled: target, data }) {
        detailedInstance ??= createInstance(
          SchemaShieldClass,
          detailedOptions,
          draft,
          unknownFormats,
          resources
        );
        target.detailed ??= detailedInstance.compile(target.schema);
        const result = target.detailed(data);
        return result.valid ? null : JSON.stringify(normalizeError(result.error));
      }
    };
  }
  return defineAdapter(
    {
      id: "schema-shield",
      packageName: "schema-shield",
      displayName: "SchemaShield",
      drafts: ["draft4", "draft6", "draft7", "draft2019-09", "draft2020-12"],
      unsupported: supportsExternalResources
        ? []
        : [ADAPTER_CAPABILITIES.EXTERNAL_SCHEMA_RESOURCES]
    },
    createImplementation
  );
}

export const adapter = createSchemaShieldAdapter(SchemaShield);
