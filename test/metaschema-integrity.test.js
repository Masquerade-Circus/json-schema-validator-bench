import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const manifestUrl = new URL("../metaschemas/manifest.json", import.meta.url);

test("versioned metaschema snapshots match their pinned source manifest", async () => {
  const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));
  const packageLock = JSON.parse(
    await readFile(new URL("../package-lock.json", import.meta.url), "utf8")
  );
  assert.equal(manifest.version, 2);
  assert.equal(manifest.defaultSource, "ajv");
  assert.deepEqual(Object.keys(manifest.sources), ["ajv", "@redocly/ajv"]);
  for (const [packageName, source] of Object.entries(manifest.sources)) {
    const packagePath = `node_modules/${packageName}`;
    const locked = packageLock.packages[packagePath];
    const installed = JSON.parse(
      await readFile(new URL(`../${packagePath}/package.json`, import.meta.url), "utf8")
    );
    assert.equal(source.package, packageName);
    assert.equal(source.version, locked.version);
    assert.equal(source.version, installed.version);
    assert.equal(source.integrity, locked.integrity);
    assert.equal(source.license, locked.license);
    assert.equal(source.license, installed.license);
    assert.equal(
      (
        await readFile(
          new URL(`../metaschemas/${source.noticePath}`, import.meta.url),
          "utf8"
        )
      ).trimEnd(),
      (
        await readFile(new URL(`../${packagePath}/LICENSE`, import.meta.url), "utf8")
      ).trimEnd()
    );
  }
  assert.equal(manifest.files.length, 18);

  for (const entry of manifest.files) {
    const snapshot = await readFile(
      new URL(`../metaschemas/${entry.path}`, import.meta.url)
    );
    const sourceName = entry.source ?? manifest.defaultSource;
    const source = await readFile(
      new URL(`../node_modules/${sourceName}/${entry.sourcePath}`, import.meta.url)
    );
    assert.deepEqual(snapshot, source, entry.path);
    assert.equal(
      createHash("sha256").update(snapshot).digest("hex"),
      entry.sha256,
      entry.path
    );
    assert.match(entry.sourcePath, /^lib\/refs\//, entry.path);
    assert.equal(typeof entry.uri, "string", entry.path);
    assert.equal(Array.isArray(entry.aliases), true, entry.path);
  }
});
