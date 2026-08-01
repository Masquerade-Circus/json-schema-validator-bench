const singleSchemaKeywords = [
  "additionalItems",
  "additionalProperties",
  "contains",
  "contentSchema",
  "else",
  "if",
  "items",
  "not",
  "propertyNames",
  "unevaluatedItems",
  "unevaluatedProperties",
  "then"
];
const schemaArrayKeywords = ["allOf", "anyOf", "oneOf", "prefixItems"];
const schemaMapKeywords = [
  "$defs",
  "definitions",
  "dependentSchemas",
  "dependencies",
  "patternProperties",
  "properties"
];
const preparedProfiles = new WeakMap();

function removeFormats(schema) {
  if (typeof schema === "boolean" || schema === null || typeof schema !== "object") {
    return;
  }
  delete schema.format;
  for (const keyword of singleSchemaKeywords) {
    const child = schema[keyword];
    if (keyword === "items" && Array.isArray(child)) {
      for (const item of child) {
        removeFormats(item);
      }
    } else {
      removeFormats(child);
    }
  }
  for (const keyword of schemaArrayKeywords) {
    if (Array.isArray(schema[keyword])) {
      for (const child of schema[keyword]) {
        removeFormats(child);
      }
    }
  }
  for (const keyword of schemaMapKeywords) {
    const children = schema[keyword];
    if (children !== null && typeof children === "object" && !Array.isArray(children)) {
      for (const child of Object.values(children)) {
        if (keyword !== "dependencies" || !Array.isArray(child)) {
          removeFormats(child);
        }
      }
    }
  }
}

export function prepareSchemaForFormatProfile(schema, draft, formatProfile) {
  if (formatProfile !== "base" && formatProfile !== "format-assertion") {
    throw new Error(`unknown format profile: ${formatProfile}`);
  }
  if (
    formatProfile === "base" &&
    (draft === "draft2019-09" || draft === "draft2020-12")
  ) {
    removeFormats(schema);
  }
  if (schema !== null && typeof schema === "object") {
    preparedProfiles.set(schema, `${draft}/${formatProfile}`);
  }
  return schema;
}

export function isPreparedSchema(schema, draft, formatProfile) {
  return (
    schema !== null &&
    typeof schema === "object" &&
    preparedProfiles.get(schema) === `${draft}/${formatProfile}`
  );
}

export function schemaForFormatProfile(schema, draft, formatProfile) {
  if (schema === null || typeof schema !== "object") {
    return schema;
  }
  const clone = structuredClone(schema);
  prepareSchemaForFormatProfile(clone, draft, formatProfile);
  return clone;
}
