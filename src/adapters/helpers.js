import { readFileSync } from "node:fs";

import { ADAPTER_DRAFTS } from "../adapter-api.js";

export function packageMetadata(name) {
  const metadata = JSON.parse(
    readFileSync(
      new URL(
        `../../node_modules/${name}/package.json`,
        import.meta.url
      ),
      "utf8"
    )
  );
  return {
    packageName: name,
    version: metadata.version,
    license: metadata.license,
    engines: metadata.engines ?? null
  };
}

export function assertDraft(draft, allowed = ADAPTER_DRAFTS) {
  if (!allowed.includes(draft)) {
    throw new Error(`unsupported draft: ${draft}`);
  }
}

export function assertFormatProfile(formatProfile) {
  if (formatProfile !== "base" && formatProfile !== "format-assertion") {
    throw new Error(`unsupported format profile: ${formatProfile}`);
  }
}

export function resourceIdentifiers(resource) {
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
  return { canonicalUri, aliases };
}

export function firstError(error) {
  if (error === null || error === undefined) {
    return null;
  }
  if (typeof error === "string") {
    return { message: error };
  }
  return {
    name: error.name ?? null,
    message: error.message ?? String(error),
    code: error.code ?? null,
    keyword: error.keyword ?? null,
    instancePath:
      error.instancePath ?? error.instanceLocation ?? error.path ?? null,
    schemaPath:
      error.schemaPath ?? error.keywordLocation ?? error.property ?? null
  };
}
