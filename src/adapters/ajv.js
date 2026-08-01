import { createRequire } from "node:module";

import Ajv from "ajv";
import AjvDraft4 from "ajv-draft-04";
import Ajv2019 from "ajv/dist/2019.js";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

import { defineAdapter } from "../adapter-api.js";
import { commonFormats } from "../formats.js";
import { packageMetadata, resourceIdentifiers } from "./helpers.js";

const require = createRequire(import.meta.url);
const draft6MetaSchema = require("ajv/dist/refs/json-schema-draft-06.json");
const draft7MetaSchema = require("ajv/dist/refs/json-schema-draft-07.json");
const ajvVersion = packageMetadata("ajv").version;
const draft4Version = packageMetadata("ajv-draft-04").version;
const constructors = {
  draft4: {
    Constructor: AjvDraft4,
    packageName: "ajv-draft-04",
    version: draft4Version,
    entrypoint: "ajv-draft-04"
  },
  draft6: {
    Constructor: Ajv,
    packageName: "ajv",
    version: ajvVersion,
    entrypoint: "ajv"
  },
  draft7: {
    Constructor: Ajv,
    packageName: "ajv",
    version: ajvVersion,
    entrypoint: "ajv"
  },
  "draft2019-09": {
    Constructor: Ajv2019,
    packageName: "ajv",
    version: ajvVersion,
    entrypoint: "ajv/dist/2019.js"
  },
  "draft2020-12": {
    Constructor: Ajv2020,
    packageName: "ajv",
    version: ajvVersion,
    entrypoint: "ajv/dist/2020.js"
  }
};
const baseOptions = {
  allErrors: false,
  coerceTypes: false,
  useDefaults: false,
  removeAdditional: false,
  strict: false,
  validateFormats: true
};

function createContext(draft, formatProfile, resources, unknownFormats, messages) {
  const { Constructor } = constructors[draft];
  const validateFormats =
    draft === "draft4" ||
    draft === "draft6" ||
    draft === "draft7" ||
    formatProfile === "format-assertion";
  const ajv = new Constructor({ ...baseOptions, validateFormats, messages });
  if (draft === "draft6") {
    ajv.addMetaSchema(draft6MetaSchema);
  }
  if (draft === "draft2019-09" || draft === "draft2020-12") {
    ajv.addMetaSchema(draft7MetaSchema);
  }
  addFormats(ajv, { mode: "full", formats: commonFormats, keywords: false });
  for (const format of unknownFormats) {
    ajv.addFormat(format, true);
  }
  const registered = new Set();
  for (const resource of resources) {
    const { aliases, canonicalUri } = resourceIdentifiers(resource);
    if (typeof canonicalUri !== "string" || registered.has(resource.schema)) {
      continue;
    }
    ajv.addSchema(resource.schema, canonicalUri);
    const target = resource.schema?.$id ?? resource.schema?.id ?? canonicalUri;
    for (const alias of aliases) {
      if (alias !== canonicalUri && alias !== target) {
        ajv.addSchema({ $ref: target }, alias);
      }
    }
    registered.add(resource.schema);
  }
  return ajv;
}

function normalizeError(error) {
  return {
    keyword: error?.keyword ?? null,
    instancePath: error?.instancePath ?? null,
    schemaPath: error?.schemaPath ?? null,
    params: error?.params ?? null,
    message: error?.message ?? null
  };
}

function createImplementation({ draft, formatProfile, resources, unknownFormats }) {
  const validateFormats =
    draft === "draft4" ||
    draft === "draft6" ||
    draft === "draft7" ||
    formatProfile === "format-assertion";
  const fast = createContext(draft, formatProfile, resources, unknownFormats, false);
  let detailed = null;
  return {
    reportOptions: {
      formatProfile,
      fast: { ...baseOptions, validateFormats, messages: false },
      detailed: { ...baseOptions, validateFormats, messages: true },
      formats: { mode: "full", names: commonFormats, keywords: false },
      implementation: {
        core: { packageName: "ajv", version: ajvVersion },
        constructor: {
          packageName: constructors[draft].packageName,
          version: constructors[draft].version,
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
      detailed ??= createContext(draft, formatProfile, resources, unknownFormats, true);
      target.detailed ??= detailed.compile(target.schema);
      const valid = Boolean(target.detailed(data));
      return valid
        ? null
        : JSON.stringify(normalizeError(target.detailed.errors?.[0]));
    }
  };
}

export const adapter = defineAdapter(
  {
    id: "ajv",
    packageName: "ajv",
    displayName: "AJV",
    drafts: ["draft4", "draft6", "draft7", "draft2019-09", "draft2020-12"],
    unsupported: []
  },
  createImplementation
);
