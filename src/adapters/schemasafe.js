import { createRequire } from "node:module";

import { defineAdapter } from "../adapter-api.js";

const require = createRequire(import.meta.url);
const { validator } = require("@exodus/schemasafe");
const draftUris = {
  draft4: "http://json-schema.org/draft-04/schema#",
  draft6: "http://json-schema.org/draft-06/schema#",
  draft7: "http://json-schema.org/draft-07/schema#",
  "draft2019-09": "https://json-schema.org/draft/2019-09/schema",
  "draft2020-12": "https://json-schema.org/draft/2020-12/schema"
};
const baseOptions = {
  mode: "lax",
  allErrors: false,
  useDefaults: false,
  removeAdditional: false,
  contentValidation: false,
  formatAssertion: true,
  extraFormats: false,
  weakFormats: true,
  allowUnusedKeywords: true,
  allowUnreachable: true
};

function optionsFor(draft, formatProfile, schemas, includeErrors) {
  return {
    ...baseOptions,
    formatAssertion:
      draft === "draft4" ||
      draft === "draft6" ||
      draft === "draft7" ||
      formatProfile === "format-assertion",
    includeErrors,
    schemas,
    $schemaDefault: draftUris[draft]
  };
}

function createImplementation({ draft, formatProfile, resources }) {
  const schemas = new Map();
  for (const resource of resources) {
    for (const alias of resource.aliases) {
      schemas.set(alias, resource.schema);
    }
  }
  const formatAssertion =
    draft === "draft4" ||
    draft === "draft6" ||
    draft === "draft7" ||
    formatProfile === "format-assertion";
  let detailedOptions = null;
  return {
    reportOptions: {
      formatProfile,
      fast: {
        ...baseOptions,
        formatAssertion,
        $schemaDefault: draftUris[draft],
        includeErrors: false
      },
      detailed: {
        ...baseOptions,
        formatAssertion,
        $schemaDefault: draftUris[draft],
        includeErrors: true
      }
    },
    compile(schema) {
      return {
        schema,
        validate: validator(
          schema,
          optionsFor(draft, formatProfile, schemas, false)
        ),
        detailed: null
      };
    },
    validate(target, data) {
      return Boolean(target.validate(data));
    },
    getError({ compiled: target, data }) {
      detailedOptions ??= optionsFor(
        draft,
        formatProfile,
        schemas,
        true
      );
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
    unsupported: []
  },
  createImplementation
);
