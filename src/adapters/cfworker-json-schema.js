import { Validator } from "@cfworker/json-schema";

import { defineAdapter } from "../adapter-api.js";

function createImplementation({ draft, formatProfile, resources }) {
  const draftName = {
    draft4: "4",
    draft7: "7",
    "draft2019-09": "2019-09",
    "draft2020-12": "2020-12"
  }[draft];
  let lastResult = null;
  return {
    reportOptions: { formatProfile, draft: draftName, shortCircuit: true },
    setup(schema) {
      const instance = new Validator(schema, draftName, true);
      for (const resource of resources) {
        if (resource.schema === schema) {
          continue;
        }
        const internalId = resource.schema?.$id ?? resource.schema?.id;
        if (typeof internalId === "string") {
          instance.addSchema(resource.schema);
        }
        for (const alias of resource.aliases) {
          if (alias !== internalId) {
            instance.addSchema(resource.schema, alias);
          }
        }
      }
      return instance;
    },
    validate(instance, data) {
      lastResult = instance.validate(data);
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
    id: "cfworker-json-schema",
    packageName: "@cfworker/json-schema",
    displayName: "@cfworker/json-schema",
    drafts: ["draft4", "draft7", "draft2019-09", "draft2020-12"],
    unsupported: []
  },
  createImplementation
);
