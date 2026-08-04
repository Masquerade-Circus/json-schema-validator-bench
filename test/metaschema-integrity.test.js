import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageRoot = new URL("../node_modules/schema-shield/", import.meta.url);
const manifestUrl = new URL("meta-schemas/manifest.json", packageRoot);

test("SchemaShield built-in metaschemas match the locked package manifest", async () => {
  const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));
  const packageLock = JSON.parse(
    await readFile(new URL("../package-lock.json", import.meta.url), "utf8")
  );
  const installed = JSON.parse(
    await readFile(new URL("package.json", packageRoot), "utf8")
  );
  const locked = packageLock.packages["node_modules/schema-shield"];

  assert.equal(installed.version, "1.4.0");
  assert.equal(installed.version, locked.version);
  assert.equal(installed.license, "Apache-2.0");
  assert.equal(manifest.resources.length, 19);

  for (const entry of manifest.resources) {
    const source = await readFile(
      new URL(`meta-schemas/${entry.localPath}`, packageRoot)
    );
    assert.equal(
      createHash("sha256").update(source).digest("hex"),
      entry.sha256,
      entry.localPath
    );
    assert.match(entry.commit, /^[a-f0-9]{40}$/, entry.localPath);
    assert.equal(typeof entry.uri, "string", entry.localPath);
  }
});
