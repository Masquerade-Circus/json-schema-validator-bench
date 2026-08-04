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

function assertAdapterImplementation(implementation) {
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
    "setup",
    "validate",
    "getError"
  ];
  if (Object.hasOwn(implementation, "compile")) {
    throw new Error("adapter compile is forbidden; expose setup instead");
  }
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
    Object.hasOwn(implementation, "setup") &&
    typeof implementation.setup !== "function"
  ) {
    throw new Error("adapter setup must be a function when present");
  }
  if (
    Object.hasOwn(implementation, "getError") &&
    typeof implementation.getError !== "function"
  ) {
    throw new Error("adapter getError must be a function when present");
  }
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
  const declarationFields = Object.keys(declaration);
  const requiredDeclarationFields = [
    "displayName",
    "drafts",
    "id",
    "packageName",
    "unsupported"
  ];
  const allowedDeclarationFields = [
    ...requiredDeclarationFields,
    "implementation",
    "supportClaims"
  ];
  if (
    requiredDeclarationFields.some((field) => !Object.hasOwn(declaration, field)) ||
    declarationFields.some((field) => !allowedDeclarationFields.includes(field))
  ) {
    throw new Error("adapter declaration fields differ from the public contract");
  }
  const drafts = uniqueKnownStrings(declaration.drafts, "drafts", ADAPTER_DRAFTS);
  const implementationMetadata = Object.hasOwn(declaration, "implementation")
    ? declaration.implementation
    : {
        api: "N/A",
        isolation: "N/A",
        dynamicCode: "N/A"
      };
  if (
    implementationMetadata === null ||
    typeof implementationMetadata !== "object" ||
    Array.isArray(implementationMetadata) ||
    Object.keys(implementationMetadata).some(
      (field) => !["api", "isolation", "dynamicCode"].includes(field)
    )
  ) {
    throw new Error("adapter implementation metadata must be an object");
  }
  const implementation = Object.freeze({
    api: nonEmptyString(implementationMetadata.api, "implementation.api"),
    isolation: nonEmptyString(
      implementationMetadata.isolation,
      "implementation.isolation"
    ),
    dynamicCode: nonEmptyString(
      implementationMetadata.dynamicCode,
      "implementation.dynamicCode"
    )
  });
  const declaredSupportClaims = Object.hasOwn(declaration, "supportClaims")
    ? declaration.supportClaims
    : {};
  if (
    declaredSupportClaims === null ||
    typeof declaredSupportClaims !== "object" ||
    Array.isArray(declaredSupportClaims) ||
    Object.keys(declaredSupportClaims).some((draft) => !drafts.includes(draft))
  ) {
    throw new Error("adapter support claims must use declared drafts");
  }
  const supportClaims = Object.freeze(
    Object.fromEntries(
      drafts.map((draft) => [
        draft,
        Object.hasOwn(declaredSupportClaims, draft)
          ? nonEmptyString(
              declaredSupportClaims[draft],
              `supportClaims.${draft}`
            )
          : "declared"
      ])
    )
  );
  const metadata = Object.freeze({
    id: nonEmptyString(declaration.id, "id"),
    packageName: nonEmptyString(declaration.packageName, "packageName"),
    displayName: nonEmptyString(declaration.displayName, "displayName"),
    drafts,
    unsupported: uniqueKnownStrings(
      declaration.unsupported,
      "unsupported",
      CAPABILITY_KEYS
    ),
    implementation,
    supportClaims
  });

  return Object.freeze({
    ...metadata,
    prepareColdExecution(config) {
      const normalizedConfig = normalizeConfig(config, metadata.drafts);
      let implementation = null;
      return Object.freeze({
        execute(schema, data) {
          implementation = factory(normalizedConfig);
          if (typeof implementation.setup !== "function") {
            return implementation.validate(schema, data);
          }
          if (implementation.setup.constructor.name === "AsyncFunction") {
            return implementation
              .setup(schema)
              .then((target) => implementation.validate(target, data));
          }
          const target = implementation.setup(schema);
          if (
            target !== null &&
            (typeof target === "object" || typeof target === "function") &&
            typeof target.then === "function"
          ) {
            throw new Error(
              "adapter setup must be declared async when it returns a Promise"
            );
          }
          return implementation.validate(target, data);
        },
        complete(observed) {
          assertAdapterImplementation(implementation);
          normalizeReportOptions(implementation.reportOptions);
          if (observed !== true && observed !== false) {
            throw new Error("adapter validate must return exactly boolean");
          }
          return observed;
        }
      });
    },
    create(config, { deferReportOptions = false } = {}) {
      if (typeof deferReportOptions !== "boolean") {
        throw new Error("adapter deferReportOptions must be boolean");
      }
      const normalizedConfig = normalizeConfig(config, metadata.drafts);
      const implementation = factory(normalizedConfig);
      assertAdapterImplementation(implementation);
      let reporting = null;
      function getReporting() {
        reporting ??= normalizeReportOptions(implementation.reportOptions);
        return reporting;
      }
      if (!deferReportOptions) {
        getReporting();
      }
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
        validate(target, data) {
          lastValidation = null;
          lastTarget = typeof implementation.setup === "function"
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
      Object.defineProperties(runtime, {
        reportOptions: {
          enumerable: true,
          get() {
            return getReporting().reportOptions;
          }
        },
        reportOptionsSha256: {
          enumerable: true,
          get() {
            return getReporting().reportOptionsSha256;
          }
        }
      });
      if (typeof implementation.setup === "function") {
        const setupIsAsync = implementation.setup.constructor.name === "AsyncFunction";
        runtime.setupMode = setupIsAsync ? "async" : "sync";
        if (setupIsAsync) {
          runtime.setup = async (schema) =>
            implementation.setup(preparedSchema(schema));
        } else {
          runtime.setup = (schema) => {
            const target = implementation.setup(preparedSchema(schema));
            if (
              target !== null &&
              (typeof target === "object" || typeof target === "function") &&
              typeof target.then === "function"
            ) {
              throw new Error(
                "adapter setup must be declared async when it returns a Promise"
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
            target: lastTarget,
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
