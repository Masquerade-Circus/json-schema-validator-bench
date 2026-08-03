import { createRequire } from "node:module";

import { defineAdapter } from "../adapter-api.js";

const require = createRequire(import.meta.url);
const { Validator } = require("jsonschema");

function createImplementation({ formatProfile, resources }) {
  const instance = new Validator();
  for (const resource of resources) {
    for (const alias of resource.aliases) {
      instance.addSchema(resource.schema, alias);
    }
  }
  let lastResult = null;
  return {
    reportOptions: { formatProfile, nestedErrors: false },
    validate(schema, data) {
      lastResult = instance.validate(data, schema);
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
    id: "jsonschema",
    packageName: "jsonschema",
    displayName: "jsonschema",
    drafts: ["draft4", "draft6", "draft7"],
    unsupported: [],
    implementation: {
      api: "validate-only",
      isolation: "fresh-instance",
      dynamicCode: "not-observed"
    }
  },
  createImplementation
);
