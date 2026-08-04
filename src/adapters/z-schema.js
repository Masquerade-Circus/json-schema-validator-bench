import ZSchema from "z-schema";

import { defineAdapter } from "../adapter-api.js";

function createImplementation({ draft, formatProfile, resources }) {
  const version = {
    draft4: "draft-04",
    draft6: "draft-06",
    draft7: "draft-07",
    "draft2019-09": "draft2019-09",
    "draft2020-12": "draft2020-12"
  }[draft];
  const formatAssertions =
    (draft === "draft2019-09" || draft === "draft2020-12") &&
    formatProfile === "base"
      ? false
      : null;
  let lastResult = null;
  return {
    reportOptions: {
      formatProfile,
      reuse: "public-schema-cache",
      version,
      safe: true,
      breakOnFirstError: true,
      ignoreUnknownFormats: true,
      formatAssertions
    },
    setup(schema) {
      const instance = ZSchema.create({
        safe: true,
        version,
        breakOnFirstError: true,
        ignoreUnknownFormats: true,
        formatAssertions
      });
      for (const resource of resources) {
        for (const alias of resource.aliases) {
          instance.setRemoteReference(alias, resource.schema, { version });
        }
      }
      const uri = "https://benchmark.invalid/z-schema/root-schema";
      instance.setRemoteReference(
        uri,
        typeof schema === "boolean" ? { allOf: [schema] } : schema
      );
      const schemaResult = instance.validateSchema({ $ref: uri });
      if (!schemaResult.valid) {
        throw schemaResult.err;
      }
      return { schema: uri, validator: instance };
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
    unsupported: [],
    implementation: {
      api: "reusable-sync",
      isolation: "fresh-instance",
      dynamicCode: "not-observed"
    }
  },
  createImplementation
);
