import { readFileSync } from "node:fs";

let manifest = null;
const cache = new Map();

export function loadMetaschemas(draft) {
  manifest ??= JSON.parse(
    readFileSync(new URL("../metaschemas/manifest.json", import.meta.url), "utf8")
  );
  if (!cache.has(draft)) {
    cache.set(
      draft,
      manifest.files
        .filter((entry) => entry.draft === draft)
        .map((entry) => ({
          ...entry,
          schema: JSON.parse(
            readFileSync(
              new URL(`../metaschemas/${entry.path}`, import.meta.url),
              "utf8"
            )
          )
        }))
    );
  }
  return cache.get(draft);
}
