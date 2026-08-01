import { createRequire } from "node:module";

import Ajv from "@redocly/ajv";
import AjvDraft4 from "@redocly/ajv/dist/draft4.js";
import Ajv2019 from "@redocly/ajv/dist/2019.js";
import Ajv2020 from "@redocly/ajv/dist/2020.js";
import addFormats from "ajv-formats";

import { defineAdapter } from "../adapter-api.js";
import { commonFormats } from "../formats.js";
import { packageMetadata, resourceIdentifiers } from "./helpers.js";

const require = createRequire(import.meta.url);
const draft6MetaSchema = require("@redocly/ajv/dist/refs/json-schema-draft-06.json");
const draft7MetaSchema = require("@redocly/ajv/dist/refs/json-schema-draft-07.json");
const redoclyVersion = packageMetadata("@redocly/ajv").version;
const constructors = {
  draft4: { Constructor: AjvDraft4, entrypoint: "@redocly/ajv/dist/draft4.js" },
  draft6: { Constructor: Ajv, entrypoint: "@redocly/ajv" },
  draft7: { Constructor: Ajv, entrypoint: "@redocly/ajv" },
  "draft2019-09": {
    Constructor: Ajv2019,
    entrypoint: "@redocly/ajv/dist/2019.js"
  },
  "draft2020-12": {
    Constructor: Ajv2020,
    entrypoint: "@redocly/ajv/dist/2020.js"
  }
};
const baseOptions = {
  // Redocly AJV's short-circuit $ref path retains object identities between calls.
  // Completing the validation path releases that recursion state for reusable callables.
  allErrors: true,
  coerceTypes: false,
  useDefaults: false,
  removeAdditional: false,
  strict: false
};

function createContext(draft, formatProfile, resources, messages) {
  const { Constructor } = constructors[draft];
  const validateFormats =
    draft === "draft4" ||
    draft === "draft6" ||
    draft === "draft7" ||
    formatProfile === "format-assertion";
  const instance = new Constructor({ ...baseOptions, validateFormats, messages });
  if (draft === "draft6") {
    instance.addMetaSchema(draft6MetaSchema);
  }
  if (draft === "draft2019-09" || draft === "draft2020-12") {
    instance.addMetaSchema(draft7MetaSchema);
  }
  addFormats(instance, { mode: "full", formats: commonFormats, keywords: false });
  const registered = new Set();
  for (const resource of resources) {
    if (registered.has(resource.schema)) {
      continue;
    }
    const { aliases, canonicalUri } = resourceIdentifiers(resource);
    if (typeof canonicalUri !== "string") {
      continue;
    }
    instance.addSchema(resource.schema, canonicalUri);
    const target = resource.schema?.$id ?? resource.schema?.id ?? canonicalUri;
    for (const alias of aliases) {
      if (alias !== canonicalUri && alias !== target) {
        instance.addSchema({ $ref: target }, alias);
      }
    }
    registered.add(resource.schema);
  }
  return instance;
}

function errorOf(error) {
  return {
    keyword: error?.keyword ?? null,
    instancePath: error?.instancePath ?? null,
    schemaPath: error?.schemaPath ?? null,
    message: error?.message ?? null
  };
}

function createImplementation({ draft, formatProfile, resources }) {
  const validateFormats =
    draft === "draft4" ||
    draft === "draft6" ||
    draft === "draft7" ||
    formatProfile === "format-assertion";
  const fast = createContext(draft, formatProfile, resources, false);
  let detailed = null;
  return {
    reportOptions: {
      formatProfile,
      fast: { ...baseOptions, validateFormats, messages: false },
      detailed: { ...baseOptions, validateFormats, messages: true },
      formats: { mode: "full", names: commonFormats, keywords: false },
      implementation: {
        core: { packageName: "@redocly/ajv", version: redoclyVersion },
        constructor: {
          packageName: "@redocly/ajv",
          version: redoclyVersion,
          entrypoint: constructors[draft].entrypoint
        }
      }
    },
    compile(schema) {
      return { schema, validate: fast.compile(schema), detailed: null };
    },
    validate(target, data) {
      return Boolean(target.validate(data));
    },
    getError({ compiled: target, data }) {
      detailed ??= createContext(draft, formatProfile, resources, true);
      target.detailed ??= detailed.compile(target.schema);
      const valid = Boolean(target.detailed(data));
      return valid ? null : JSON.stringify(errorOf(target.detailed.errors?.[0]));
    }
  };
}

export const adapter = defineAdapter(
  {
    id: "redocly-ajv",
    packageName: "@redocly/ajv",
    displayName: "Redocly AJV",
    drafts: ["draft4", "draft6", "draft7", "draft2019-09", "draft2020-12"],
    unsupported: []
  },
  createImplementation
);
