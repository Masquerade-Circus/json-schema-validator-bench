import {
  compileSchema,
  draft04,
  draft06,
  draft07,
  draft2019,
  draft2020
} from "json-schema-library";

import { defineAdapter } from "../adapter-api.js";

function createImplementation({ draft, formatProfile, resources }) {
  const draftImplementation = {
    draft4: draft04,
    draft6: draft06,
    draft7: draft07,
    "draft2019-09": draft2019,
    "draft2020-12": draft2020
  }[draft];
  const remotes = [];
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
      remotes.push(resource.schema);
      const target = resource.schema.$id ?? resource.schema.id;
      for (const alias of resource.aliases) {
        if (alias !== target) {
          remotes.push({ $id: alias, $ref: target });
        }
      }
    } else if (typeof resource.canonicalUri === "string") {
      remotes.push({ ...resource.schema, $id: resource.canonicalUri });
    }
  }
  const formatAssertion =
    draft === "draft4" ||
    draft === "draft6" ||
    draft === "draft7" ||
    formatProfile === "format-assertion";
  const compileOptions = {
    drafts: [draftImplementation],
    draft,
    remotes,
    formatAssertion,
    throwOnInvalidSchema: true,
    throwOnInvalidRef: true
  };
  let lastResult = null;
  return {
    reportOptions: {
      drafts: [draft],
      draft,
      formatAssertion,
      throwOnInvalidSchema: true,
      throwOnInvalidRef: true
    },
    setup(schema) {
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
