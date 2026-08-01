import {
  compareCanonicalAdapters,
  getCompileRegistryParticipants,
  getRegistryRoundOrder,
  registryMetadata
} from "./adapters/index.js";

export const draftIds = Object.freeze([
  "draft4",
  "draft6",
  "draft7",
  "draft2019-09",
  "draft2020-12"
]);

export const formatProfiles = Object.freeze(["base", "format-assertion"]);
export const draftDialectUris = Object.freeze({
  draft4: "http://json-schema.org/draft-04/schema#",
  draft6: "http://json-schema.org/draft-06/schema#",
  draft7: "http://json-schema.org/draft-07/schema#",
  "draft2019-09": "https://json-schema.org/draft/2019-09/schema",
  "draft2020-12": "https://json-schema.org/draft/2020-12/schema"
});
export const validators = registryMetadata;
const validatorsById = new Map(
  validators.map((validator) => [validator.id, validator])
);

export function compareValidatorIds(leftId, rightId) {
  const left = validatorsById.get(leftId);
  const right = validatorsById.get(rightId);
  if (left === undefined || right === undefined) {
    throw new Error(
      `unknown benchmark validator: ${left === undefined ? leftId : rightId}`
    );
  }
  return compareCanonicalAdapters(left, right);
}

export function sortValidatorIds(ids) {
  return [...ids].sort(compareValidatorIds);
}

export function sortParticipantsByName(participants) {
  return [...participants].sort(compareCanonicalAdapters);
}

export function getDraft(draft) {
  if (!draftIds.includes(draft)) {
    throw new Error(`unknown benchmark draft: ${draft}`);
  }
  return draft;
}

export function getParticipants(draft) {
  getDraft(draft);
  return sortParticipantsByName(
    validators.filter((validator) => validator.drafts.includes(draft))
  );
}

export function getCompileParticipants(draft) {
  getDraft(draft);
  return sortParticipantsByName(getCompileRegistryParticipants(draft));
}

export function getRoundOrder(options) {
  getDraft(options.draft);
  return getRegistryRoundOrder(options);
}

export function getSupportClaim(validatorId, draft) {
  if (
    validatorId === "schema-shield" &&
    (draft === "draft2019-09" || draft === "draft2020-12")
  ) {
    return "experimental-observed";
  }
  return "declared";
}
