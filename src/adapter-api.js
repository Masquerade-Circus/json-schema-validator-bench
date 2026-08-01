import { createHash } from "node:crypto";

import {
  isPreparedSchema,
  schemaForFormatProfile
} from "./schema-profile.js";

export const ADAPTER_DRAFTS = Object.freeze([
  "draft4",
  "draft6",
  "draft7",
  "draft2019-09",
  "draft2020-12"
]);

const FORMAT_PROFILES = Object.freeze(["base", "format-assertion"]);
export const ADAPTER_CAPABILITIES = Object.freeze({
  EXTERNAL_SCHEMA_RESOURCES: "EXTERNAL_SCHEMA_RESOURCES"
});

const CAPABILITY_KEYS = Object.freeze(Object.values(ADAPTER_CAPABILITIES));

function nonEmptyString(value, field) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`adapter ${field} must be a non-empty string`);
  }
  return value;
}

function uniqueKnownStrings(values, field, allowed = null) {
  if (
    !Array.isArray(values) ||
    (field === "drafts" && values.length === 0) ||
    new Set(values).size !== values.length
  ) {
    throw new Error(`adapter ${field} must be an array of unique strings`);
  }
  for (const value of values) {
    if (
      typeof value !== "string" ||
      (allowed !== null && !allowed.includes(value))
    ) {
      throw new Error(
        `adapter ${field} contains an unsupported value: ${String(value)}`
      );
    }
  }
  return Object.freeze([...values]);
}

function canonicalJson(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error("reportOptions must be JSON-serializable");
    }
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(",")}]`;
  }
  if (typeof value === "object") {
    const entries = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`);
    return `{${entries.join(",")}}`;
  }
  throw new Error("reportOptions must be JSON-serializable");
}

function normalizeReportOptions(reportOptions) {
  let normalized;
  try {
    const serialized = JSON.stringify(reportOptions, (_key, value) => {
      if (
        typeof value === "undefined" ||
        typeof value === "function" ||
        typeof value === "symbol" ||
        typeof value === "bigint" ||
        (typeof value === "number" && !Number.isFinite(value))
      ) {
        throw new Error("not serializable");
      }
      return value;
    });
    if (typeof serialized !== "string") {
      throw new Error("not serializable");
    }
    normalized = JSON.parse(serialized);
  } catch {
    throw new Error("adapter reportOptions must be JSON-serializable");
  }
  const canonical = canonicalJson(normalized);
  return {
    reportOptions: normalized,
    reportOptionsSha256: createHash("sha256").update(canonical).digest("hex")
  };
}

function normalizeConfig(config, drafts) {
  if (config === null || typeof config !== "object" || Array.isArray(config)) {
    throw new Error("adapter config must be an object");
  }
  if (!drafts.includes(config.draft)) {
    throw new Error(`unsupported draft: ${String(config.draft)}`);
  }
  const formatProfile = config.formatProfile ?? "format-assertion";
  if (!FORMAT_PROFILES.includes(formatProfile)) {
    throw new Error(`unsupported format profile: ${String(formatProfile)}`);
  }
  const resources = config.resources ?? [];
  const unknownFormats = config.unknownFormats ?? [];
  if (!Array.isArray(resources)) {
    throw new Error("adapter resources must be an array");
  }
  if (
    !Array.isArray(unknownFormats) ||
    unknownFormats.some((format) => typeof format !== "string")
  ) {
    throw new Error("adapter unknownFormats must be an array of strings");
  }
  const normalizedResources = resources.map((resource) => {
    if (resource === null || typeof resource !== "object") {
      throw new Error("adapter resource must be an object");
    }
    const candidates = [
      resource.canonicalUri,
      resource.uri,
      ...(resource.aliases ?? [])
    ].filter((candidate) => typeof candidate === "string" && candidate.length > 0);
    const aliases = [...new Set(candidates.map((candidate) => candidate.split("#")[0]))];
    const canonicalUri =
      resource.canonicalUri ??
      aliases.find((alias) => alias.startsWith("http://localhost:1234/")) ??
      resource.uri ??
      aliases[0] ??
      null;
    return Object.freeze({
      ...resource,
      canonicalUri,
      aliases: Object.freeze(aliases)
    });
  });
  return Object.freeze({
    draft: config.draft,
    formatProfile,
    resources: Object.freeze(normalizedResources),
    unknownFormats: Object.freeze([...new Set(unknownFormats)].sort())
  });
}

export function defineAdapter(declaration, factory) {
  if (
    declaration === null ||
    typeof declaration !== "object" ||
    Array.isArray(declaration)
  ) {
    throw new Error("adapter declaration must be an object");
  }
  if (typeof factory !== "function") {
    throw new Error("adapter factory must be a function");
  }
  const declarationFields = Object.keys(declaration).sort();
  const expectedDeclarationFields = [
    "displayName",
    "drafts",
    "id",
    "packageName",
    "unsupported"
  ];
  if (
    declarationFields.length !== expectedDeclarationFields.length ||
    declarationFields.some(
      (field, index) => field !== expectedDeclarationFields[index]
    )
  ) {
    throw new Error("adapter declaration fields differ from the public contract");
  }
  const metadata = Object.freeze({
    id: nonEmptyString(declaration.id, "id"),
    packageName: nonEmptyString(declaration.packageName, "packageName"),
    displayName: nonEmptyString(declaration.displayName, "displayName"),
    drafts: uniqueKnownStrings(declaration.drafts, "drafts", ADAPTER_DRAFTS),
    unsupported: uniqueKnownStrings(
      declaration.unsupported,
      "unsupported",
      CAPABILITY_KEYS
    )
  });

  return Object.freeze({
    ...metadata,
    create(config) {
      const normalizedConfig = normalizeConfig(config, metadata.drafts);
      const implementation = factory(normalizedConfig);
      if (
        implementation === null ||
        typeof implementation !== "object" ||
        Array.isArray(implementation)
      ) {
        throw new Error("adapter factory must return an object");
      }
      const implementationFields = Object.keys(implementation);
      const allowedImplementationFields = [
        "reportOptions",
        "compile",
        "validate",
        "getError"
      ];
      if (
        implementationFields.some(
          (field) => !allowedImplementationFields.includes(field)
        )
      ) {
        throw new Error(
          "adapter factory returned a field outside the public contract"
        );
      }
      if (typeof implementation.validate !== "function") {
        throw new Error("adapter validate must be a function");
      }
      if (
        Object.hasOwn(implementation, "compile") &&
        typeof implementation.compile !== "function"
      ) {
        throw new Error("adapter compile must be a function when present");
      }
      if (
        Object.hasOwn(implementation, "getError") &&
        typeof implementation.getError !== "function"
      ) {
        throw new Error("adapter getError must be a function when present");
      }
      const reporting = normalizeReportOptions(implementation.reportOptions);
      let lastValidation = null;
      let lastTarget = null;
      const preparedObjects = new WeakMap();
      function preparedSchema(schema) {
        if (schema === null || typeof schema !== "object") {
          return schema;
        }
        if (
          isPreparedSchema(
            schema,
            normalizedConfig.draft,
            normalizedConfig.formatProfile
          )
        ) {
          return schema;
        }
        const cache = preparedObjects;
        if (!cache.has(schema)) {
          cache.set(
            schema,
            schemaForFormatProfile(
              schema,
              normalizedConfig.draft,
              normalizedConfig.formatProfile
            )
          );
        }
        return cache.get(schema);
      }
      const runtime = {
        ...metadata,
        config: normalizedConfig,
        ...reporting,
        validate(target, data) {
          lastValidation = null;
          lastTarget = typeof implementation.compile === "function"
            ? target
            : preparedSchema(target);
          const result = implementation.validate(lastTarget, data);
          if (result !== true && result !== false) {
            throw new Error("adapter validate must return exactly boolean");
          }
          lastValidation = result;
          return result;
        }
      };
      if (typeof implementation.compile === "function") {
        const compileIsAsync = implementation.compile.constructor.name === "AsyncFunction";
        runtime.compileMode = compileIsAsync ? "async" : "sync";
        if (compileIsAsync) {
          runtime.compile = async (schema) =>
            implementation.compile(preparedSchema(schema));
        } else {
          runtime.compile = (schema) => {
            const target = implementation.compile(preparedSchema(schema));
            if (
              target !== null &&
              (typeof target === "object" || typeof target === "function") &&
              typeof target.then === "function"
            ) {
              throw new Error(
                "adapter compile must be declared async when it returns a Promise"
              );
            }
            return target;
          };
        }
      }
      if (typeof implementation.getError === "function") {
        runtime.getError = async (context) => {
          if (lastValidation !== false) {
            throw new Error("adapter getError may run only after validate returns false");
          }
          if (context === null || typeof context !== "object" || Array.isArray(context)) {
            throw new Error("adapter getError context must be an object");
          }
          const detail = await implementation.getError({
            schema: context.schema,
            compiled: lastTarget,
            testCase: context.testCase,
            data: context.data,
            config: normalizedConfig
          });
          if (detail === null) {
            return null;
          }
          if (typeof detail !== "string" || detail.trim().length === 0) {
            throw new Error(
              "adapter getError must resolve to a non-empty string or null"
            );
          }
          return detail;
        };
      }
      return Object.freeze(runtime);
    }
  });
}
