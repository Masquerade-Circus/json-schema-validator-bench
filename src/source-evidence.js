import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import ts from "typescript";

import { adapterRegistry } from "./adapter-registry.js";
import { getResultsRoot } from "./paths.js";
import {
  scanValidatorSourceDynamicCode,
  sourceDynamicCodeDetectorContractSha256,
  sourceDynamicCodeDetectorVersion
} from "./source-dynamic-code.js";

export const sourceEvidenceVersion = 2;
export const sourceOwnershipPolicyVersion = 1;

const hashPattern = /^[a-f0-9]{64}$/;
const sourceValues = new Set(["yes", "no"]);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function canonicalJson(value) {
  if (
    value === null ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string"
  ) {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(",")}]`;
  }
  return `{${Object.keys(value).sort().map((key) =>
    `${JSON.stringify(key)}:${canonicalJson(value[key])}`
  ).join(",")}}`;
}

function assertObject(value, field) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${field} must be an object`);
  }
}

function assertHash(value, field) {
  if (typeof value !== "string" || !hashPattern.test(value)) {
    throw new Error(`${field} must be a SHA-256 hash`);
  }
}

function assertNoSourcePayload(value, field = "source evidence") {
  if (Array.isArray(value)) {
    for (const entry of value) {
      assertNoSourcePayload(entry, field);
    }
    return;
  }
  if (value === null || typeof value !== "object") {
    return;
  }
  for (const [key, entry] of Object.entries(value)) {
    if (
      [
        "bindingTrace",
        "source",
        "content",
        "payload",
        "code",
        "command",
        "secret",
        "secrets",
        "password",
        "token",
        "credential",
        "credentials"
      ].includes(key)
    ) {
      throw new Error(`${field} must not contain generated or distributed source text`);
    }
    assertNoSourcePayload(entry, field);
  }
}

const publicSourceFindingFields = Object.freeze([
  "mechanism",
  "operation",
  "owner",
  "relativePath",
  "line",
  "column",
  "representation",
  "reachableFromEntrypoint",
  "fileSha256"
]);

function validateSourceFinding(finding, field) {
  assertObject(finding, field);
  if (
    Object.keys(finding).length !== publicSourceFindingFields.length ||
    publicSourceFindingFields.some((name) => !Object.hasOwn(finding, name))
  ) {
    throw new Error(`${field} contains unsupported fields`);
  }
  assertObject(finding.owner, `${field} owner`);
  if (
    Object.keys(finding.owner).length !== 3 ||
    ["type", "package", "version"].some(
      (name) => !Object.hasOwn(finding.owner, name)
    ) ||
    [finding.mechanism, finding.operation, finding.relativePath,
      finding.representation, finding.owner.type, finding.owner.package,
      finding.owner.version].some(
      (value) => typeof value !== "string" || value.length === 0
    ) ||
    !Number.isSafeInteger(finding.line) ||
    finding.line < 1 ||
    !Number.isSafeInteger(finding.column) ||
    finding.column < 1 ||
    typeof finding.reachableFromEntrypoint !== "boolean"
  ) {
    throw new Error(`${field} is invalid`);
  }
  assertHash(finding.fileSha256, `${field} file identity`);
}

export function createSourceEvidenceContext({
  projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
} = {}) {
  const packageLockSha256 = sha256(
    readFileSync(path.join(projectRoot, "package-lock.json"))
  );
  return Object.freeze({
    packageLockSha256,
    detectorContractSha256: sourceDynamicCodeDetectorContractSha256,
    parser: Object.freeze({ name: "typescript", version: ts.version }),
    sourceContractSha256: sha256(canonicalJson({
      sourceEvidenceVersion,
      sourceDynamicCodeDetectorVersion,
      detectorContractSha256: sourceDynamicCodeDetectorContractSha256,
      ownershipPolicyVersion: sourceOwnershipPolicyVersion,
      parser: { name: "typescript", version: ts.version }
    }))
  });
}

export function runtimeDependencyClosure(packageLock, rootPackages) {
  assertObject(packageLock, "package lock");
  assertObject(packageLock.packages, "package lock packages");
  if (!Array.isArray(rootPackages) || rootPackages.some((name) => typeof name !== "string")) {
    throw new Error("source root packages must be an array of package names");
  }
  const owned = new Set(rootPackages);
  const transitives = new Set();
  const pending = [...rootPackages];
  while (pending.length > 0) {
    const packageName = pending.shift();
    const entry = packageLock.packages[`node_modules/${packageName}`];
    if (entry === null || typeof entry !== "object") {
      throw new Error(`source package lock entry is absent: ${packageName}`);
    }
    for (const dependency of Object.keys({
      ...(entry.dependencies ?? {}),
      ...(entry.optionalDependencies ?? {})
    }).sort()) {
      if (owned.has(dependency) || transitives.has(dependency)) {
        continue;
      }
      if (packageLock.packages[`node_modules/${dependency}`] === undefined) {
        throw new Error(`source transitive package lock entry is absent: ${dependency}`);
      }
      transitives.add(dependency);
      pending.push(dependency);
    }
  }
  return [...transitives].sort();
}

function validatePackageResult(result, identity, artifact, ownerType) {
  assertObject(result, `source package ${identity}`);
  assertObject(result.cache, `source package ${identity} cache`);
  if (result.cache.identitySha256 !== identity) {
    throw new Error(`source package ${identity} cache identity differs from its key`);
  }
  if (!sourceValues.has(result.value)) {
    throw new Error(`source package ${identity} dynamic code must be yes or no`);
  }
  if (!Array.isArray(result.findings)) {
    throw new Error(`source package ${identity} findings must be an array`);
  }
  for (const [index, finding] of result.findings.entries()) {
    validateSourceFinding(finding, `source finding ${identity}/${index}`);
  }
  assertObject(result.owner, `source package ${identity} owner`);
  if (result.owner.type !== ownerType) {
    throw new Error(`source package ${identity} ownership is invalid`);
  }
  assertObject(result.provenance, `source package ${identity} provenance`);
  assertHash(
    result.provenance.packageBytesSha256,
    `source package ${identity} package bytes`
  );
  assertHash(
    result.provenance.ownershipPolicySha256,
    `source package ${identity} ownership policy`
  );
  const expectedOwnershipPolicySha256 = sha256(canonicalJson({
    ownerType,
    packageName: result.owner.package,
    ownershipPolicyVersion: sourceOwnershipPolicyVersion
  }));
  const expectedIdentity = sha256(canonicalJson({
    packageBytesSha256: result.provenance.packageBytesSha256,
    packageLockSha256: result.provenance.packageLockSha256,
    detectorContractSha256: result.provenance.detectorContractSha256,
    parser: result.provenance.parser,
    ownershipPolicySha256: result.provenance.ownershipPolicySha256
  }));
  if (
    result.provenance.ownershipPolicySha256 !== expectedOwnershipPolicySha256 ||
    identity !== expectedIdentity
  ) {
    throw new Error(`source package ${identity} cache identity is invalid`);
  }
  if (
    result.provenance.packageLockSha256 !== artifact.packageLockSha256 ||
    result.provenance.detectorContractSha256 !== artifact.detectorContractSha256 ||
    canonicalJson(result.provenance.parser) !== canonicalJson(artifact.parser)
  ) {
    throw new Error(`source package ${identity} provenance is stale`);
  }
  if (result.value !== (result.findings.length > 0 ? "yes" : "no")) {
    throw new Error(`source package ${identity} verdict differs from its findings`);
  }
}

export function validateSourceEvidence(artifact, context = null) {
  assertObject(artifact, "source evidence");
  if (artifact.sourceEvidenceVersion !== sourceEvidenceVersion) {
    throw new Error("source evidence version is incompatible");
  }
  if (artifact.detectorVersion !== sourceDynamicCodeDetectorVersion) {
    throw new Error("source dynamic code detector version is incompatible");
  }
  if (artifact.ownershipPolicyVersion !== sourceOwnershipPolicyVersion) {
    throw new Error("source ownership policy version is incompatible");
  }
  for (const [value, field] of [
    [artifact.packageLockSha256, "source package lock identity"],
    [artifact.detectorContractSha256, "source detector contract identity"],
    [artifact.sourceContractSha256, "source evidence contract identity"]
  ]) {
    assertHash(value, field);
  }
  if (typeof artifact.generatedAt !== "string" || Number.isNaN(Date.parse(artifact.generatedAt))) {
    throw new Error("source evidence generatedAt must be an ISO timestamp");
  }
  assertObject(artifact.parser, "source evidence parser");
  if (artifact.parser.name !== "typescript" || typeof artifact.parser.version !== "string") {
    throw new Error("source evidence parser is invalid");
  }
  if (
    context !== null &&
    (
      artifact.packageLockSha256 !== context.packageLockSha256 ||
      artifact.detectorContractSha256 !== context.detectorContractSha256 ||
      artifact.sourceContractSha256 !== context.sourceContractSha256 ||
      canonicalJson(artifact.parser) !== canonicalJson(context.parser)
    )
  ) {
    throw new Error("source evidence is stale");
  }
  assertObject(artifact.packages, "source evidence packages");
  assertObject(artifact.validators, "source evidence validators");
  assertObject(artifact.cache, "source evidence cache");
  for (const field of [
    "packageIdentities",
    "reusedPackages",
    "reusedPreviousPackages",
    "reusedWithinCapture"
  ]) {
    if (!Number.isSafeInteger(artifact.cache[field]) || artifact.cache[field] < 0) {
      throw new Error(`source evidence cache ${field} is invalid`);
    }
  }
  if (
    typeof artifact.cache.previousArtifactRejected !== "boolean" ||
    artifact.cache.packageIdentities !== Object.keys(artifact.packages).length ||
    artifact.cache.reusedPackages !==
      artifact.cache.reusedPreviousPackages + artifact.cache.reusedWithinCapture
  ) {
    throw new Error("source evidence cache summary is invalid");
  }
  const referencedPackages = new Set();
  for (const [validator, evidence] of Object.entries(artifact.validators)) {
    assertObject(evidence, `source validator ${validator}`);
    if (!sourceValues.has(evidence.dynamicCode)) {
      throw new Error(`source validator ${validator} dynamic code must be yes or no`);
    }
    if (
      evidence.primary === null ||
      typeof evidence.primary !== "object" ||
      Array.isArray(evidence.primary)
    ) {
      throw new Error(`source validator ${validator} primary package is invalid`);
    }
    for (const field of ["companions", "transitives", "adapters"]) {
      if (!Array.isArray(evidence[field])) {
        throw new Error(`source validator ${validator} ${field} must be an array`);
      }
    }
    assertObject(evidence.scopes, `source validator ${validator} scopes`);
    if (
      Object.keys(evidence.scopes).length === 0 ||
      Object.values(evidence.scopes).some((scope) => {
        assertObject(scope, `source validator ${validator} scope`);
        return scope.dynamicCode !== evidence.dynamicCode;
      })
    ) {
      throw new Error(`source validator ${validator} scopes are invalid`);
    }
    const ownerReferences = [evidence.primary, ...evidence.companions];
    for (const reference of ownerReferences) {
      assertObject(reference, `source validator ${validator} package reference`);
      const { identitySha256: identity, ownerType } = reference;
      assertHash(identity, `source validator ${validator} package reference`);
      if (
        !["primary", "companion"].includes(ownerType) ||
        reference.authority !== "controls-verdict" ||
        typeof reference.packageName !== "string" ||
        typeof reference.version !== "string"
      ) {
        throw new Error(`source validator ${validator} package ownership is invalid`);
      }
      const packageResult = artifact.packages[identity];
      if (packageResult === undefined) {
        throw new Error(`source validator ${validator} package evidence is absent`);
      }
      validatePackageResult(packageResult, identity, artifact, ownerType);
      if (
        packageResult.owner.package !== reference.packageName ||
        packageResult.owner.version !== reference.version
      ) {
        throw new Error(`source validator ${validator} package identity is invalid`);
      }
      referencedPackages.add(identity);
    }
    for (const transitive of evidence.transitives) {
      assertObject(transitive, `source validator ${validator} transitive package`);
      if (
        transitive.ownerType !== "transitive" ||
        transitive.authority !== "excluded" ||
        transitive.scanStatus !== "excluded" ||
        Object.hasOwn(transitive, "identitySha256") ||
        typeof transitive.packageName !== "string" ||
        typeof transitive.version !== "string"
      ) {
        throw new Error(`source validator ${validator} transitive ownership is invalid`);
      }
    }
    for (const adapter of evidence.adapters) {
      assertObject(adapter, `source validator ${validator} adapter`);
      if (!sourceValues.has(adapter.value) || !Array.isArray(adapter.findings)) {
        throw new Error(`source validator ${validator} adapter evidence is invalid`);
      }
      for (const [index, finding] of adapter.findings.entries()) {
        validateSourceFinding(
          finding,
          `source finding ${validator}/adapter/${index}`
        );
      }
      if (adapter.owner?.type !== "adapter") {
        throw new Error(`source validator ${validator} adapter ownership is invalid`);
      }
    }
    const ownedFindingCount = ownerReferences.reduce(
      (total, { identitySha256 }) =>
        total + artifact.packages[identitySha256].findings.length,
      0
    );
    if (evidence.dynamicCode !== (ownedFindingCount > 0 ? "yes" : "no")) {
      throw new Error(`source validator ${validator} verdict exceeds its owned findings`);
    }
  }
  if (
    Object.keys(artifact.packages).length !== referencedPackages.size ||
    Object.keys(artifact.packages).some((identity) => !referencedPackages.has(identity))
  ) {
    throw new Error("source package evidence contains unreferenced identities");
  }
  assertNoSourcePayload(artifact);
  return artifact;
}

function persistablePackageResult(result) {
  return {
    value: result.value,
    findings: result.findings.map(persistableSourceFinding),
    owner: {
      type: result.owner.type,
      package: result.owner.package,
      version: result.owner.version,
      bundledAttribution: result.owner.bundledAttribution
    },
    inventory: {
      files: result.inventory.files,
      executableFiles: result.inventory.executableFiles,
      declarationFiles: result.inventory.declarationFiles,
      sourceMaps: result.inventory.sourceMaps,
      symlinks: result.inventory.symlinks,
      classifications: result.inventory.classifications,
      sourceRepresentations: result.inventory.sourceRepresentations
    },
    provenance: {
      packageBytesSha256: result.provenance.packageBytesSha256,
      packageLockSha256: result.provenance.packageLockSha256,
      detectorContractSha256: result.provenance.detectorContractSha256,
      ownershipPolicySha256: result.provenance.ownershipPolicySha256,
      parser: {
        name: result.provenance.parser.name,
        version: result.provenance.parser.version
      },
      packageRootWasSymlink: result.provenance.packageRootWasSymlink,
      entrypoints: result.provenance.entrypoints
    },
    cache: { identitySha256: result.cache.identitySha256 }
  };
}

function persistableSourceFinding(finding) {
  return {
    mechanism: finding.mechanism,
    operation: finding.operation,
    owner: {
      type: finding.owner.type,
      package: finding.owner.package,
      version: finding.owner.version
    },
    relativePath: finding.relativePath,
    line: finding.line,
    column: finding.column,
    representation: finding.representation,
    reachableFromEntrypoint: finding.reachableFromEntrypoint,
    fileSha256: finding.fileSha256
  };
}

function persistableAdapterResult(result) {
  return {
    value: result.value,
    findings: result.findings.map(persistableSourceFinding),
    owner: {
      type: result.owner.type,
      package: result.owner.package,
      version: result.owner.version,
      bundledAttribution: result.owner.bundledAttribution
    }
  };
}

export async function captureSourceEvidence({
  projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  resultsRoot = getResultsRoot(),
  definitions = adapterRegistry,
  generatedAt = new Date().toISOString()
} = {}) {
  const context = createSourceEvidenceContext({ projectRoot });
  const packageLock = JSON.parse(
    await readFile(path.join(projectRoot, "package-lock.json"), "utf8")
  );
  const artifactPath = path.join(resultsRoot, "source-evidence.json");
  const cache = new Map();
  const previousCacheIdentities = new Set();
  let previousArtifactRejected = false;
  try {
    const previousRaw = await readFile(artifactPath, "utf8");
    try {
      const previous = validateSourceEvidence(JSON.parse(previousRaw), context);
      for (const result of Object.values(previous.packages)) {
        cache.set(result.cache.identitySha256, result);
        previousCacheIdentities.add(result.cache.identitySha256);
      }
    } catch {
      previousArtifactRejected = true;
    }
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
  const packages = {};
  const validators = {};
  let reusedPackages = 0;
  let reusedPreviousPackages = 0;
  let reusedWithinCapture = 0;
  for (const definition of [...definitions].sort((left, right) =>
    left.id.localeCompare(right.id)
  )) {
    const familyPackages = [definition.packageName, ...definition.additionalPackages];
    const transitivePackages = runtimeDependencyClosure(packageLock, familyPackages);
    const result = await scanValidatorSourceDynamicCode({
      projectRoot,
      primaryPackage: definition.packageName,
      companionPackages: definition.additionalPackages,
      adapterPaths: [`src/adapters/${definition.id}.js`],
      cache
    });
    const packageComponents = [
      result.components.primary,
      ...result.components.companions
    ];
    for (const component of packageComponents) {
      const identity = component.cache.identitySha256;
      if (component.cache.reused === true) {
        reusedPackages += 1;
        if (previousCacheIdentities.has(identity)) {
          reusedPreviousPackages += 1;
        } else {
          reusedWithinCapture += 1;
        }
      }
      packages[identity] ??= persistablePackageResult(component);
    }
    validators[definition.id] = {
      packageName: definition.packageName,
      dynamicCode: result.value,
      primary: {
        identitySha256: result.components.primary.cache.identitySha256,
        packageName: result.components.primary.owner.package,
        version: result.components.primary.owner.version,
        ownerType: "primary",
        authority: "controls-verdict"
      },
      companions: result.components.companions.map((component) => ({
        identitySha256: component.cache.identitySha256,
        packageName: component.owner.package,
        version: component.owner.version,
        ownerType: "companion",
        authority: "controls-verdict"
      })),
      transitives: transitivePackages.map((packageName) => ({
        packageName,
        version: packageLock.packages[`node_modules/${packageName}`].version,
        ownerType: "transitive",
        authority: "excluded",
        scanStatus: "excluded"
      })),
      adapters: result.components.adapters.map(persistableAdapterResult),
      scopes: Object.fromEntries(
        definition.drafts.map((draft) => [draft, { dynamicCode: result.value }])
      )
    };
  }
  const artifact = validateSourceEvidence({
    sourceEvidenceVersion,
    detectorVersion: sourceDynamicCodeDetectorVersion,
    detectorContractSha256: context.detectorContractSha256,
    ownershipPolicyVersion: sourceOwnershipPolicyVersion,
    sourceContractSha256: context.sourceContractSha256,
    packageLockSha256: context.packageLockSha256,
    parser: context.parser,
    generatedAt,
    cache: {
      packageIdentities: Object.keys(packages).length,
      reusedPackages,
      reusedPreviousPackages,
      reusedWithinCapture,
      previousArtifactRejected
    },
    packages,
    validators
  }, context);
  await mkdir(resultsRoot, { recursive: true });
  const stagedPath = `${artifactPath}.staged-${process.pid}`;
  await writeFile(stagedPath, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
  await rename(stagedPath, artifactPath);
  return { artifact, artifactPath };
}

export function loadSourceEvidenceSync({
  projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  resultsRoot = null
} = {}) {
  const context = createSourceEvidenceContext({ projectRoot });
  try {
    return {
      artifact: validateSourceEvidence(
        JSON.parse(readFileSync(path.join(resultsRoot ?? getResultsRoot(), "source-evidence.json"), "utf8")),
        context
      ),
      context,
      diagnostic: null
    };
  } catch (error) {
    return { artifact: null, context, diagnostic: error?.message ?? String(error) };
  }
}
