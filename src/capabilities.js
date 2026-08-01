import { ADAPTER_CAPABILITIES } from "./adapter-api.js";
import { analyzeSchemaCapabilities } from "./suite.js";

export const CAPABILITIES = ADAPTER_CAPABILITIES;

export const capabilityKeys = Object.freeze(Object.values(CAPABILITIES));

export function detectSchemaCapabilities(schema) {
  const analyzed = analyzeSchemaCapabilities(schema);
  const capabilities = [];
  const evidence = {};
  if (analyzed.externalRefs.length > 0) {
    capabilities.push(CAPABILITIES.EXTERNAL_SCHEMA_RESOURCES);
    evidence[CAPABILITIES.EXTERNAL_SCHEMA_RESOURCES] = analyzed.externalRefs;
  }
  return { capabilities, evidence };
}

export function unsupportedCapabilities(declared, detected) {
  if (
    !Array.isArray(declared) ||
    detected === null ||
    typeof detected !== "object" ||
    Array.isArray(detected) ||
    !Array.isArray(detected.capabilities) ||
    detected.evidence === null ||
    typeof detected.evidence !== "object" ||
    Array.isArray(detected.evidence)
  ) {
    throw new Error("declared capabilities and detected analysis are required");
  }
  for (const capability of [...declared, ...detected.capabilities]) {
    if (!capabilityKeys.includes(capability)) {
      throw new Error(`unknown adapter capability: ${String(capability)}`);
    }
  }
  return capabilityKeys
    .filter(
      (capability) =>
        declared.includes(capability) && detected.capabilities.includes(capability)
    )
    .map((capability) => {
      const values = detected.evidence[capability];
      if (
        !Array.isArray(values) ||
        values.some((value) => typeof value !== "string" || value.length === 0)
      ) {
        throw new Error(`capability evidence is invalid: ${capability}`);
      }
      return { capability, evidence: values.join(", ") };
    });
}
