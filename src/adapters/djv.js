import { createRequire } from "node:module";

import { defineAdapter } from "../adapter-api.js";

const require = createRequire(import.meta.url);
const Environment = require("djv");

function createImplementation({ formatProfile, resources }) {
  let sequence = 0;
  let lastError = null;
  return {
    reportOptions: { formatProfile, version: "draft-06" },
    setup(schema) {
      const instance = new Environment({ version: "draft-06" });
      for (const resource of resources) {
        for (const alias of resource.aliases) {
          instance.addSchema(alias, resource.schema);
        }
      }
      const name = `schema-${(sequence += 1)}`;
      return instance.addSchema(name, schema).fn;
    },
    validate(target, data) {
      lastError = target(data);
      return typeof lastError === "undefined";
    },
    getError() {
      return typeof lastError === "undefined" ? null : String(lastError);
    }
  };
}

export const adapter = defineAdapter(
  {
    id: "djv",
    packageName: "djv",
    displayName: "djv",
    drafts: ["draft6"],
    unsupported: []
  },
  createImplementation
);
