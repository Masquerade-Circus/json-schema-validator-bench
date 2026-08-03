import { createRequire } from "node:module";

import { defineAdapter } from "../adapter-api.js";

const require = createRequire(import.meta.url);
const { validator } = require("@exodus/schemasafe");

function createImplementation({ draft, formatProfile, resources }) {
  const schemas = new Map();
  for (const resource of resources) {
    for (const alias of resource.aliases) {
      schemas.set(alias, resource.schema);
    }
  }
  const draftUri = {
    draft4: "http://json-schema.org/draft-04/schema#",
    draft6: "http://json-schema.org/draft-06/schema#",
    draft7: "http://json-schema.org/draft-07/schema#",
    "draft2019-09": "https://json-schema.org/draft/2019-09/schema",
    "draft2020-12": "https://json-schema.org/draft/2020-12/schema"
  }[draft];
  const formatAssertion =
    draft === "draft4" ||
    draft === "draft6" ||
    draft === "draft7" ||
    formatProfile === "format-assertion";
  const baseOptions = {
    mode: "lax",
    allErrors: false,
    useDefaults: false,
    removeAdditional: false,
    contentValidation: false,
    formatAssertion,
    extraFormats: false,
    weakFormats: true,
    allowUnusedKeywords: true,
    allowUnreachable: true,
    schemas,
    $schemaDefault: draftUri
  };
  let detailedOptions = null;
  return {
    reportOptions: {
      formatProfile,
      fast: { ...baseOptions, schemas: "registered", includeErrors: false },
      detailed: { ...baseOptions, schemas: "registered", includeErrors: true }
    },
    setup(schema) {
      return {
        schema,
        validate: validator(schema, { ...baseOptions, includeErrors: false }),
        detailed: null
      };
    },
    validate(target, data) {
      return Boolean(target.validate(data));
    },
    getError({ target, data }) {
      detailedOptions ??= { ...baseOptions, includeErrors: true };
      target.detailed ??= validator(target.schema, detailedOptions);
      const valid = Boolean(target.detailed(data));
      const error = target.detailed.errors?.[0];
      return valid
        ? null
        : JSON.stringify({
            keywordLocation: error?.keywordLocation ?? null,
            instanceLocation: error?.instanceLocation ?? null
          });
    }
  };
}

export const adapter = defineAdapter(
  {
    id: "schemasafe",
    packageName: "@exodus/schemasafe",
    displayName: "schemasafe",
    drafts: ["draft4", "draft6", "draft7", "draft2019-09", "draft2020-12"],
    unsupported: [],
    implementation: {
      api: "reusable-sync",
      isolation: "fresh-instance",
      dynamicCode: "observed"
    }
  },
  createImplementation
);
