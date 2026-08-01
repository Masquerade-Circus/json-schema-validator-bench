import ZSchema from "z-schema";
import { createHash } from "node:crypto";

import { defineAdapter } from "../adapter-api.js";

const versions = {
  draft4: "draft-04",
  draft6: "draft-06",
  draft7: "draft-07",
  "draft2019-09": "draft2019-09",
  "draft2020-12": "draft2020-12"
};

function context(draft, formatProfile, resources) {
  const validator = ZSchema.create({
    safe: true,
    version: versions[draft],
    breakOnFirstError: true,
    ignoreUnknownFormats: true,
    formatAssertions:
      (draft === "draft2019-09" || draft === "draft2020-12") &&
      formatProfile === "base"
        ? false
        : null
  });
  for (const resource of resources) {
    for (const alias of resource.aliases) {
      validator.setRemoteReference(alias, resource.schema, {
        version: versions[draft]
      });
    }
  }
  return validator;
}

function createImplementation({ draft, formatProfile, resources }) {
  let lastResult = null;
  const reportOptions = {
    formatProfile,
    reuse: "public-schema-cache",
    version: versions[draft],
    safe: true,
    breakOnFirstError: true,
    ignoreUnknownFormats: true,
    formatAssertions:
      (draft === "draft2019-09" || draft === "draft2020-12") &&
      formatProfile === "base"
        ? false
        : null
  };
  return {
    reportOptions,
    compile(schema) {
      const validator = context(draft, formatProfile, resources);
      const uri = `https://benchmark.invalid/z-schema/${createHash("sha256")
        .update(JSON.stringify(schema))
        .digest("hex")}`;
      const registeredSchema =
        typeof schema === "boolean" ? { allOf: [schema] } : schema;
      validator.setRemoteReference(uri, registeredSchema);
      const schemaResult = validator.validateSchema({ $ref: uri });
      if (!schemaResult.valid) {
        throw schemaResult.err;
      }
      return { schema: uri, validator };
    },
    validate(target, data) {
      lastResult = target.validator.validate(data, target.schema);
      return lastResult.valid;
    },
    getError() {
      const error = lastResult?.err?.details?.[0] ?? lastResult?.err;
      return error === null || typeof error === "undefined"
        ? null
        : JSON.stringify(error);
    }
  };
}

export const adapter = defineAdapter(
  {
    id: "z-schema",
    packageName: "z-schema",
    displayName: "z-schema",
    drafts: ["draft4", "draft6", "draft7", "draft2019-09", "draft2020-12"],
    unsupported: []
  },
  createImplementation
);
