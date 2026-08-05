import assert from "node:assert/strict";
import { readFile, readdir, rm, writeFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { adapterRegistry } from "../src/adapter-registry.js";
import {
  captureSourceEvidence,
  loadSourceEvidenceSync,
  sourceEvidenceVersion,
  validateSourceEvidence
} from "../src/source-evidence.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const temporaryRoot = path.join(projectRoot, "tmp", "source-evidence-tests");

test.afterEach(async () => {
  await rm(temporaryRoot, { recursive: true, force: true });
});

test("source evidence publishes one yes/no authority and keeps other owners separate", async () => {
  const { artifact } = await captureSourceEvidence({
    projectRoot,
    resultsRoot: temporaryRoot,
    definitions: adapterRegistry,
    generatedAt: "2026-08-05T00:00:00.000Z"
  });

  assert.equal(artifact.sourceEvidenceVersion, sourceEvidenceVersion);
  assert.deepEqual(Object.keys(artifact.validators).sort(), [
    "ajv",
    "cfworker-json-schema",
    "djv",
    "hyperjump",
    "json-schema-library",
    "jsonschema",
    "redocly-ajv",
    "schema-shield",
    "schemasafe",
    "z-schema"
  ]);
  assert.equal(artifact.validators.ajv.dynamicCode, "yes");
  assert.equal(artifact.validators.schemasafe.dynamicCode, "yes");
  assert.equal(artifact.validators.hyperjump.dynamicCode, "no");
  assert.deepEqual(
    artifact.validators.ajv.companions.map(({ packageName }) => packageName),
    ["ajv-draft-04", "ajv-formats"]
  );
  assert.deepEqual(
    artifact.validators["redocly-ajv"].companions.map(({ packageName }) =>
      packageName
    ),
    ["ajv-formats"]
  );
  assert.equal(artifact.cache.packageIdentities, 13);
  assert.equal(artifact.cache.reusedWithinCapture, 1);
  assert.deepEqual(
    Object.values(artifact.validators).reduce(
      (counts, { dynamicCode }) => ({
        ...counts,
        [dynamicCode]: counts[dynamicCode] + 1
      }),
      { yes: 0, no: 0 }
    ),
    { yes: 4, no: 6 }
  );

  for (const [validator, evidence] of Object.entries(artifact.validators)) {
    assert.ok(["yes", "no"].includes(evidence.dynamicCode), validator);
    assert.equal(evidence.primary.ownerType, "primary");
    assert.equal(evidence.primary.authority, "controls-verdict");
    assert.ok(Array.isArray(evidence.companions));
    assert.ok(evidence.companions.every((companion) =>
      companion.ownerType === "companion" &&
      companion.authority === "controls-verdict" &&
      typeof companion.packageName === "string" &&
      typeof companion.identitySha256 === "string"
    ));
    assert.ok(Array.isArray(evidence.transitives));
    assert.ok(evidence.transitives.every((dependency) =>
      dependency.ownerType === "transitive" &&
        dependency.authority === "excluded" &&
        dependency.scanStatus === "excluded" &&
        typeof dependency.packageName === "string" &&
        typeof dependency.version === "string" &&
        Object.hasOwn(dependency, "identitySha256") === false
    ));
    assert.ok(Array.isArray(evidence.adapters));
    assert.ok(evidence.adapters.every((adapter) =>
      adapter.owner?.type === "adapter" && ["yes", "no"].includes(adapter.value)
    ));
    assert.deepEqual(
      Object.keys(evidence.scopes).sort(),
      [...adapterRegistry.find(({ id }) => id === validator).drafts].sort()
    );
    assert.ok(Object.values(evidence.scopes).every(
      (scope) => scope.dynamicCode === evidence.dynamicCode
    ));
    const owned = [evidence.primary, ...evidence.companions]
      .flatMap(({ identitySha256 }) => artifact.packages[identitySha256].findings);
    assert.equal(evidence.dynamicCode, owned.length > 0 ? "yes" : "no");
    assert.equal(
      Object.hasOwn(evidence.runtimeObservation ?? {}, "value"),
      false,
      `${validator} source evidence must not contain runtime authority`
    );
  }

  const raw = await readFile(path.join(temporaryRoot, "source-evidence.json"), "utf8");
  assert.deepEqual(JSON.parse(raw), artifact);
  assert.equal(
    /\"(?:bindingTrace|source|content|payload|code|command|secret|secrets|password|token|credential|credentials)\"\s*:/.test(raw),
    false
  );
});

test("source evidence rejects stale identities and values outside yes/no", async () => {
  const { artifact } = await captureSourceEvidence({
    projectRoot,
    resultsRoot: temporaryRoot,
    definitions: adapterRegistry,
    generatedAt: "2026-08-05T00:00:00.000Z"
  });
  const loaded = loadSourceEvidenceSync({ projectRoot, resultsRoot: temporaryRoot });
  assert.equal(loaded.diagnostic, null);
  assert.deepEqual(loaded.artifact, artifact);

  const legacy = structuredClone(artifact);
  legacy.validators.ajv.dynamicCode = "limited";
  assert.throws(
    () => validateSourceEvidence(legacy, loaded.context),
    /dynamic code must be yes or no/
  );

  for (const field of [
    "bindingTrace",
    "source",
    "content",
    "payload",
    "code",
    "command",
    "secret",
    "token"
  ]) {
    const internalFinding = structuredClone(artifact);
    const target = Object.values(internalFinding.packages).find(
      ({ findings }) => findings.length > 0
    ).findings[0];
    target[field] = field === "bindingTrace" ? ["internal"] : "internal";
    assert.throws(
      () => validateSourceEvidence(internalFinding, loaded.context),
      /source finding .* contains unsupported fields/,
      field
    );
  }

  const stale = structuredClone(artifact);
  stale.packageLockSha256 = "0".repeat(64);
  assert.throws(
    () => validateSourceEvidence(stale, loaded.context),
    /source evidence is stale/
  );

  const packageIdentity = Object.keys(artifact.packages)[0];
  const stalePackageBytes = structuredClone(artifact);
  stalePackageBytes.packages[packageIdentity].provenance.packageBytesSha256 =
    "f".repeat(64);
  assert.throws(
    () => validateSourceEvidence(stalePackageBytes, loaded.context),
    /cache identity is invalid/
  );

  const staleOwnership = structuredClone(artifact);
  staleOwnership.validators.ajv.primary.ownerType = "companion";
  assert.throws(
    () => validateSourceEvidence(staleOwnership, loaded.context),
    /package ownership is invalid|ownership is invalid/
  );

  const stalePackageParser = structuredClone(artifact);
  stalePackageParser.packages[packageIdentity].provenance.parser.version =
    "0.0.0-stale";
  assert.throws(
    () => validateSourceEvidence(stalePackageParser, loaded.context),
    /cache identity is invalid/
  );

  const staleParser = structuredClone(artifact);
  staleParser.parser.version = "0.0.0-stale";
  await writeFile(
    path.join(temporaryRoot, "source-evidence.json"),
    `${JSON.stringify(staleParser)}\n`,
    "utf8"
  );
  const recaptured = await captureSourceEvidence({
    projectRoot,
    resultsRoot: temporaryRoot,
    definitions: adapterRegistry,
    generatedAt: "2026-08-05T00:00:01.000Z"
  });
  assert.equal(recaptured.artifact.cache.previousArtifactRejected, true);
  assert.equal(recaptured.artifact.cache.reusedPreviousPackages, 0);
  assert.equal(recaptured.artifact.cache.reusedWithinCapture, 1);
  assert.equal(recaptured.artifact.parser.version, "6.0.3");
});

test("published results contain no bindingTrace fields", async () => {
  const resultsRoot = path.join(projectRoot, "results");
  const files = (await readdir(resultsRoot, { recursive: true }))
    .filter((name) => name.endsWith(".json") || name.endsWith(".md"));
  const contaminated = [];
  for (const name of files) {
    if (/\"bindingTrace\"\s*:/.test(await readFile(path.join(resultsRoot, name), "utf8"))) {
      contaminated.push(name);
    }
  }
  assert.deepEqual(contaminated, []);
});
