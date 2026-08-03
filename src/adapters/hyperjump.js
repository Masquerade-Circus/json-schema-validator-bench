import { createHash } from "node:crypto";

import { addUriSchemePlugin } from "@hyperjump/browser";
import "@hyperjump/json-schema/formats";
import * as Draft4 from "@hyperjump/json-schema/draft-04";
import * as Draft6 from "@hyperjump/json-schema/draft-06";
import * as Draft7 from "@hyperjump/json-schema/draft-07";
import * as Draft201909 from "@hyperjump/json-schema/draft-2019-09";
import * as Draft202012 from "@hyperjump/json-schema/draft-2020-12";

import { defineAdapter } from "../adapter-api.js";

function createImplementation({ draft, formatProfile, resources }) {
  function forbidNetwork(uri) {
    const error = new Error(`network access forbidden: ${uri}`);
    error.code = "NETWORK_ACCESS_FORBIDDEN";
    throw error;
  }
  addUriSchemePlugin("http", { retrieve: forbidNetwork });
  addUriSchemePlugin("https", { retrieve: forbidNetwork });
  const { api, dialect } = {
    draft4: {
      api: Draft4,
      dialect: "http://json-schema.org/draft-04/schema#"
    },
    draft6: {
      api: Draft6,
      dialect: "http://json-schema.org/draft-06/schema#"
    },
    draft7: {
      api: Draft7,
      dialect: "http://json-schema.org/draft-07/schema#"
    },
    "draft2019-09": {
      api: Draft201909,
      dialect: "https://json-schema.org/draft/2019-09/schema"
    },
    "draft2020-12": {
      api: Draft202012,
      dialect: "https://json-schema.org/draft/2020-12/schema"
    }
  }[draft];
  const validateFormat =
    formatProfile === "format-assertion" ||
    draft === "draft4" ||
    draft === "draft6" ||
    draft === "draft7";
  api.setShouldValidateFormat(validateFormat);
  const uniqueResources = new Map();
  for (const resource of resources) {
    if (typeof resource.canonicalUri === "string") {
      uniqueResources.set(resource.canonicalUri, resource);
    }
  }
  for (const resource of uniqueResources.values()) {
    // Hyperjump rejects duplicate public registrations. Internal dialect entries and
    // reused harness URIs therefore require removal before the requested register.
    if (api.hasSchema(resource.canonicalUri)) {
      api.unregisterSchema(resource.canonicalUri);
    }
    api.registerSchema(
      resource.schema,
      resource.canonicalUri,
      resource.dialect ?? dialect
    );
  }

  return {
    reportOptions: {
      draft,
      formatProfile,
      validateFormat,
      network: "forbidden"
    },
    async setup(schema) {
      const objectSchema =
        schema !== null && typeof schema === "object" && !Array.isArray(schema);
      const id = objectSchema ? schema.$id ?? schema.id : null;
      const uri =
        typeof id === "string" && /^https?:/.test(id)
          ? id.split("#")[0]
          : `https://benchmark.invalid/hyperjump/${createHash("sha256")
              .update(JSON.stringify(schema))
              .digest("hex")}`;
      if (api.hasSchema(uri)) {
        api.unregisterSchema(uri);
      }
      api.registerSchema(schema, uri, dialect);
      return await api.validate(uri);
    },
    validate(target, data) {
      return target(data).valid;
    },
    getError({ target, data }) {
      const detail = target(data, "BASIC");
      return detail.valid ? null : JSON.stringify(detail);
    }
  };
}

export const adapter = defineAdapter(
  {
    id: "hyperjump",
    packageName: "@hyperjump/json-schema",
    displayName: "Hyperjump",
    drafts: ["draft4", "draft6", "draft7", "draft2019-09", "draft2020-12"],
    unsupported: [],
    implementation: {
      api: "reusable-async",
      isolation: "module-global-unavailable",
      dynamicCode: "not-observed"
    }
  },
  createImplementation
);
