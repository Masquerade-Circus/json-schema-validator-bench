import {
  compileSchema,
  draft04,
  draft06,
  draft07,
  draft2019,
  draft2020
} from "json-schema-library";

import { defineAdapter } from "../adapter-api.js";
import {
  resourceIdentifiers
} from "./helpers.js";

const drafts = {
  draft4: draft04,
  draft6: draft06,
  draft7: draft07,
  "draft2019-09": draft2019,
  "draft2020-12": draft2020
};

function remoteSchemas(resources) {
  const schemas = [];
  const seen = new Set();
  for (const resource of resources) {
    if (seen.has(resource.schema)) {
      continue;
    }
    seen.add(resource.schema);
    if (
      typeof resource.schema?.$id === "string" ||
      typeof resource.schema?.id === "string"
    ) {
      schemas.push(resource.schema);
      const target = resource.schema.$id ?? resource.schema.id;
      for (const alias of resourceIdentifiers(resource).aliases) {
        if (alias !== target) {
          schemas.push({ $id: alias, $ref: target });
        }
      }
    } else if (typeof resource.uri === "string") {
      schemas.push({ ...resource.schema, $id: resource.uri });
    }
  }
  return schemas;
}

function createImplementation({ draft, formatProfile, resources }) {
  const remotes = remoteSchemas(resources);
  const compileOptions = {
    drafts: [drafts[draft]],
    draft,
    remotes,
    formatAssertion:
      draft === "draft4" ||
      draft === "draft6" ||
      draft === "draft7" ||
      formatProfile === "format-assertion",
    throwOnInvalidSchema: true,
    throwOnInvalidRef: true
  };
  const reportOptions = {
    drafts: [draft],
    draft,
    formatAssertion: compileOptions.formatAssertion,
    throwOnInvalidSchema: compileOptions.throwOnInvalidSchema,
    throwOnInvalidRef: compileOptions.throwOnInvalidRef
  };
  let lastResult = null;
  return {
    reportOptions,
    compile(schema) {
      return compileSchema(schema, compileOptions);
    },
    validate(node, data) {
      lastResult = node.validate(data);
      return lastResult.valid;
    },
    getError() {
      const error = lastResult?.errors?.[0];
      return error === null || typeof error === "undefined"
        ? null
        : JSON.stringify(error);
    }
  };
}

export const adapter = defineAdapter(
  {
    id: "json-schema-library",
    packageName: "json-schema-library",
    displayName: "json-schema-library",
    drafts: ["draft4", "draft6", "draft7", "draft2019-09", "draft2020-12"],
    unsupported: []
  },
  createImplementation
);
