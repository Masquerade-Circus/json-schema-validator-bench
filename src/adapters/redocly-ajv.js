import { createRequire } from "node:module";

import Ajv from "@redocly/ajv";
import AjvDraft4 from "@redocly/ajv/dist/draft4.js";
import Ajv2019 from "@redocly/ajv/dist/2019.js";
import Ajv2020 from "@redocly/ajv/dist/2020.js";
import addFormats from "ajv-formats";

import { defineAdapter } from "../adapter-api.js";

const commonFormats = Object.freeze([
  "date",
  "time",
  "date-time",
  "duration",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uuid",
  "uri",
  "uri-reference",
  "uri-template",
  "regex",
  "json-pointer",
  "relative-json-pointer"
]);

const require = createRequire(import.meta.url);
const draft6MetaSchema = require("@redocly/ajv/dist/refs/json-schema-draft-06.json");
const draft7MetaSchema = require("@redocly/ajv/dist/refs/json-schema-draft-07.json");
const redoclyVersion = require("@redocly/ajv/package.json").version;
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

function isolateVisitedReferences(source) {
  const declaration = "const visitedNodesForRef = new WeakMap();";
  const declarationIndex = source.indexOf(declaration);
  const functionStart = source.indexOf("return function ");
  const bodyStart = source.indexOf("){", functionStart) + 1;
  const bodyEnd = source.lastIndexOf("}");
  if (
    declarationIndex < 0 ||
    functionStart < 0 ||
    bodyStart <= functionStart ||
    bodyEnd <= bodyStart
  ) {
    throw new Error("Redocly AJV generated an unsupported validation function");
  }
  const prefix = source
    .slice(0, bodyStart + 1)
    .replace(
      declaration,
      "let visitedNodesForRef = new WeakMap();let validationDepth = 0;"
    );
  const body = source.slice(bodyStart + 1, bodyEnd);
  const suffix = source.slice(bodyEnd + 1);
  return `${prefix}const rootValidation = validationDepth++ === 0;try {${body}} finally {validationDepth--;if (rootValidation) visitedNodesForRef = new WeakMap();}}${suffix}`;
}

function createImplementation({ draft, formatProfile, resources }) {
  const constructor = constructors[draft];
  const { Constructor } = constructor;
  const validateFormats =
    draft === "draft4" ||
    draft === "draft6" ||
    draft === "draft7" ||
    formatProfile === "format-assertion";
  const baseOptions = {
    ownProperties: true,
    coerceTypes: false,
    useDefaults: false,
    removeAdditional: false,
    strict: false,
    validateFormats
  };
  const fastOptions = {
    ...baseOptions,
    allErrors: false,
    messages: false,
    code: { process: isolateVisitedReferences }
  };
  const fastReportOptions = {
    ...baseOptions,
    allErrors: false,
    messages: false,
    code: { process: "isolate-visited-references-per-root-validation" }
  };
  const detailedOptions = { ...baseOptions, allErrors: true, messages: true };
  function createContext(options) {
    const instance = new Constructor(options);
    if (draft === "draft6") {
      instance.addMetaSchema(draft6MetaSchema);
    }
    if (draft === "draft2019-09" || draft === "draft2020-12") {
      instance.addMetaSchema(draft7MetaSchema);
    }
    addFormats(instance, {
      mode: "full",
      formats: commonFormats,
      keywords: false
    });
    const registered = new Set();
    for (const resource of resources) {
      if (
        typeof resource.canonicalUri !== "string" ||
        registered.has(resource.schema)
      ) {
        continue;
      }
      instance.addSchema(resource.schema, resource.canonicalUri);
      const target =
        resource.schema?.$id ?? resource.schema?.id ?? resource.canonicalUri;
      for (const alias of resource.aliases) {
        if (alias !== resource.canonicalUri && alias !== target) {
          instance.addSchema({ $ref: target }, alias);
        }
      }
      registered.add(resource.schema);
    }
    return instance;
  }

  const fast = createContext(fastOptions);
  let detailed = null;
  return {
    reportOptions: {
      formatProfile,
      fast: fastReportOptions,
      detailed: detailedOptions,
      formats: { mode: "full", names: commonFormats, keywords: false },
      implementation: {
        core: { packageName: "@redocly/ajv", version: redoclyVersion },
        constructor: {
          packageName: "@redocly/ajv",
          version: redoclyVersion,
          entrypoint: constructor.entrypoint
        }
      }
    },
    setup(schema) {
      return { schema, validate: fast.compile(schema), detailed: null };
    },
    validate(target, data) {
      return Boolean(target.validate(data));
    },
    getError({ target, data }) {
      if (detailed === null) {
        detailed = createContext(detailedOptions);
      }
      target.detailed ??= detailed.compile(target.schema);
      const valid = Boolean(target.detailed(data));
      const error = target.detailed.errors?.[0];
      return valid
        ? null
        : JSON.stringify({
            keyword: error?.keyword ?? null,
            instancePath: error?.instancePath ?? null,
            schemaPath: error?.schemaPath ?? null,
            message: error?.message ?? null
          });
    }
  };
}

export const adapter = defineAdapter(
  {
    id: "redocly-ajv",
    packageName: "@redocly/ajv",
    displayName: "Redocly AJV",
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
