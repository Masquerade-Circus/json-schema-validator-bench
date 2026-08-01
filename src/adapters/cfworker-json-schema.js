import { Validator } from "@cfworker/json-schema";

import { defineAdapter } from "../adapter-api.js";
import { resourceIdentifiers } from "./helpers.js";

const draftNames = {
  draft4: "4",
  draft7: "7",
  "draft2019-09": "2019-09",
  "draft2020-12": "2020-12"
};

function compile(schema, draft, resources) {
  const validator = new Validator(schema, draftNames[draft], true);
  for (const resource of resources) {
    if (resource.schema === schema) {
      continue;
    }
    const internalId = resource.schema?.$id ?? resource.schema?.id;
    if (typeof internalId === "string") {
      validator.addSchema(resource.schema);
    }
    for (const alias of resourceIdentifiers(resource).aliases) {
      if (alias !== internalId) {
        validator.addSchema(resource.schema, alias);
      }
    }
  }
  return validator;
}

function createImplementation({ draft, formatProfile, resources }) {
  let lastResult = null;
  return {
    reportOptions: { formatProfile, draft: draftNames[draft], shortCircuit: true },
    compile(schema) {
      return compile(schema, draft, resources);
    },
    validate(validator, data) {
      lastResult = validator.validate(data);
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
