import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { constants as fsConstants } from "node:fs";
import {
  access,
  lstat,
  mkdir,
  open,
  readFile,
  readdir,
  realpath,
  rename,
  unlink,
  writeFile
} from "node:fs/promises";
import os from "node:os";
import { builtinModules } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { canonicalJson, loadSuite, sha256 } from "./suite.js";
import {
  adapterRegistry,
  getColdExecutionRegistryParticipants,
  getSetupRegistryParticipants,
  getRegistryRoundOrder,
  rotateRoundOrder
} from "./adapter-registry.js";
import {
  draftIds,
  formatProfiles,
  getParticipants
} from "./matrix.js";
import { getResultsRoot } from "./paths.js";
import {
  performanceIdentitySha256
} from "./intersection.js";
import {
  createPerformanceEligibilityPolicy,
  defaultEligibilityThresholdPercent,
  parseEligibilityThresholdPercent
} from "./eligibility.js";
import { reconcileDiagnosticPhaseResult } from "./diagnostic.js";

const benchmarksRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workerPath = path.join(benchmarksRoot, "src", "worker.js");
export const sampleContractVersion = 23;
export const sampleCacheIdentityVersion = 16;
const sampleCheckpointNamespace = `granular-samples-v${sampleCacheIdentityVersion}`;
const checkpointEnvelopeVersion = 1;
const hashPattern = /^[a-f0-9]{64}$/;
export const performancePhases = Object.freeze([
  "setup",
  "execution",
  "cold-execution"
]);

function participantsForPhase(draft, phase) {
  if (phase === "setup") {
    return getSetupRegistryParticipants(draft);
  }
  if (phase === "cold-execution") {
    return getColdExecutionRegistryParticipants(draft);
  }
  if (phase === "execution") {
    return getParticipants(draft);
  }
  throw new Error(`unsupported benchmark phase: ${phase}`);
}

function phaseTimingPrefix(phase) {
  if (phase === "cold-execution") {
    return "coldExecution";
  }
  return phase;
}
export const measurementSourcePaths = Object.freeze([
  "src/adapter-api.js",
  "src/adapter-registry.js",
  "src/benchmark.js",
  "src/capabilities.js",
  "src/conformance.js",
  "src/diagnostic.js",
  "src/eligibility.js",
  "src/formats.js",
  "src/integrity.js",
  "src/intersection.js",
  "src/matrix.js",
  "src/performance-corpus.js",
  "src/schema-profile.js",
  "src/suite.js",
  "src/worker.js"
]);
const memoryBudget = Object.freeze({
    maxRssGrowthBytes: 512 * 1024 * 1024,
    maxHeapGrowthBytes: 256 * 1024 * 1024,
    sustainedGrowthPasses: 50,
    minimumGrowthBytesPerPass: 1024 * 1024,
    sustainedGrowthPressureRatio: 0.5
});

const sharedBenchmarkMode = Object.freeze({
  setupWarmupMinimumMilliseconds: 100,
  setupTargetMilliseconds: 250,
  setupMinimumSampleMilliseconds: 175,
  coldExecutionWarmupMinimumMilliseconds: 100,
  coldExecutionTargetMilliseconds: 250,
  coldExecutionMinimumSampleMilliseconds: 175,
  executionWarmupMinimumMilliseconds: 100,
  executionTargetMilliseconds: 250,
  executionMinimumSampleMilliseconds: 175,
  workerDeadlineMilliseconds: 30 * 60 * 1000,
  controllerDeadlineMilliseconds: 4 * 60 * 60 * 1000,
  maxWallMilliseconds: 4 * 60 * 60 * 1000,
  completeCorpusPasses: true,
  checksumRequired: true,
  workerConcurrency: 1,
  memoryBudget
});

export const benchmarkModes = Object.freeze({
  full: Object.freeze({
    mode: "full",
    rounds: 6,
    ...sharedBenchmarkMode
  }),
  quick: Object.freeze({
    mode: "quick",
    rounds: 1,
    ...sharedBenchmarkMode
  })
});

export function getBenchmarkMode(mode = "full") {
  const config = benchmarkModes[mode];
  if (config === undefined) {
    throw new Error(`benchmark mode must be full or quick: ${mode}`);
  }
  return config;
}

export function controllerDeadlineMillisecondsFromEnvironment(
  mode = "full",
  environment = process.env
) {
  const configured = environment.BENCHMARK_CONTROLLER_DEADLINE_MILLISECONDS;
  if (configured === undefined || configured === "") {
    return getBenchmarkMode(mode).controllerDeadlineMilliseconds;
  }
  if (!/^\d+$/.test(configured)) {
    throw new Error("benchmark controller deadline must be an integer number of milliseconds");
  }
  const milliseconds = Number(configured);
  if (milliseconds < 3 * 60 * 1000 || milliseconds > 4 * 60 * 60 * 1000) {
    throw new Error("benchmark controller deadline must be from 3 minutes to 4 hours");
  }
  return milliseconds;
}

export const benchmarkConstants = benchmarkModes.full;

export function createBenchmarkContract(
  mode = "full",
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent
) {
  const config = getBenchmarkMode(mode);
  const eligibilityPolicy = createPerformanceEligibilityPolicy(
    parseEligibilityThresholdPercent(eligibilityThresholdPercent)
  );
  return Object.freeze({
  sampleContractVersion,
  drafts: draftIds,
  formatProfiles,
  participantsByDraft: Object.fromEntries(
    draftIds.map((draft) => [
      draft,
      {
        setup: getSetupRegistryParticipants(draft).map(({ id }) => id),
        execution: getParticipants(draft).map(({ id }) => id),
        "cold-execution": getColdExecutionRegistryParticipants(draft).map(({ id }) => id)
      }
    ])
  ),
  performanceEligibility: eligibilityPolicy,
  rounds: config.rounds,
  phases: Object.freeze({
    setup: Object.freeze({
      warmupMinimumMilliseconds: config.setupWarmupMinimumMilliseconds,
      targetSampleMilliseconds: config.setupTargetMilliseconds,
      minimumSampleMilliseconds: config.setupMinimumSampleMilliseconds
    }),
    execution: Object.freeze({
      warmupMinimumMilliseconds: config.executionWarmupMinimumMilliseconds,
      targetSampleMilliseconds: config.executionTargetMilliseconds,
      minimumSampleMilliseconds: config.executionMinimumSampleMilliseconds
    }),
    "cold-execution": Object.freeze({
      warmupMinimumMilliseconds: config.coldExecutionWarmupMinimumMilliseconds,
      targetSampleMilliseconds: config.coldExecutionTargetMilliseconds,
      minimumSampleMilliseconds: config.coldExecutionMinimumSampleMilliseconds
    })
  }),
  completeCorpusPasses: config.completeCorpusPasses,
  checksumRequired: config.checksumRequired,
  workerConcurrency: config.workerConcurrency
  });
}

export const benchmarkContract = createBenchmarkContract("full");

export function createBenchmarkContractHash(
  options = {}
) {
  const legacyMemoryBudget = Object.hasOwn(options, "maxRssGrowthBytes")
    ? options
    : null;
  const mode = legacyMemoryBudget === null ? options.mode ?? "full" : "full";
  const eligibilityThresholdPercent =
    options.eligibilityThresholdPercent ??
    defaultEligibilityThresholdPercent;
  const effectiveMemoryBudget =
    legacyMemoryBudget ?? options.memoryBudget ?? getBenchmarkMode(mode).memoryBudget;
  return digest(
    JSON.stringify({
      ...createBenchmarkContract(mode, eligibilityThresholdPercent),
      memoryBudget: effectiveMemoryBudget
    })
  );
}

export const benchmarkContractSha256 = createBenchmarkContractHash();

export function estimatePerformanceBudget({
  mode = "full",
  rounds = getBenchmarkMode(mode).rounds,
  warmupMilliseconds = getBenchmarkMode(mode).setupWarmupMinimumMilliseconds,
  targetMilliseconds = getBenchmarkMode(mode).setupTargetMilliseconds
} = {}) {
  const setupScopes = draftIds.reduce(
      (total, draft) => total + getSetupRegistryParticipants(draft).length,
      0
    );
  const coldExecutionScopes =
    formatProfiles.length *
    draftIds.reduce(
      (total, draft) => total + getColdExecutionRegistryParticipants(draft).length,
      0
    );
  const executionScopes =
    formatProfiles.length *
    draftIds.reduce(
      (total, draft) => total + getParticipants(draft).length,
      0
    );
  const samples = rounds * (setupScopes + coldExecutionScopes + executionScopes);
  return {
    setupScopes,
    coldExecutionScopes,
    executionScopes,
    samples,
    timedMilliseconds: samples * (warmupMilliseconds + targetMilliseconds)
  };
}

export function memoryBudgetFromEnvironment(environment = process.env) {
  const fields = [
    ["maxRssGrowthBytes", "BENCHMARK_MAX_RSS_GROWTH_BYTES"],
    ["maxHeapGrowthBytes", "BENCHMARK_MAX_HEAP_GROWTH_BYTES"],
    ["sustainedGrowthPasses", "BENCHMARK_SUSTAINED_GROWTH_PASSES"],
    ["minimumGrowthBytesPerPass", "BENCHMARK_MIN_GROWTH_BYTES_PER_PASS"],
    ["sustainedGrowthPressureRatio", "BENCHMARK_SUSTAINED_GROWTH_PRESSURE_RATIO"]
  ];
  const budget = {};
  for (const [field, variable] of fields) {
    const fallback = benchmarkConstants.memoryBudget[field];
    const value = Object.hasOwn(environment, variable)
      ? Number(environment[variable])
      : fallback;
    if (
      !Number.isFinite(value) ||
      value <= 0 ||
      (field === "sustainedGrowthPasses" && !Number.isInteger(value)) ||
      (field === "sustainedGrowthPressureRatio" && value > 1)
    ) {
      throw new Error(`${variable} must be a positive finite number`);
    }
    budget[field] = value;
  }
  return budget;
}

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function assertConfinedNonSymlinkPath(
  targetPath,
  allowedRoot,
  { allowMissing = false } = {}
) {
  const resolvedRoot = path.resolve(allowedRoot);
  const resolvedTarget = path.resolve(targetPath);
  if (
    resolvedTarget !== resolvedRoot &&
    !resolvedTarget.startsWith(`${resolvedRoot}${path.sep}`)
  ) {
    throw new Error(`path escapes its allowed root: ${resolvedTarget}`);
  }
  const rootDetails = await lstat(resolvedRoot);
  if (rootDetails.isSymbolicLink() || !rootDetails.isDirectory()) {
    throw new Error(`allowed root must be a real directory: ${resolvedRoot}`);
  }
  const realRoot = await realpath(resolvedRoot);
  let current = resolvedRoot;
  const segments = path.relative(resolvedRoot, resolvedTarget)
    .split(path.sep)
    .filter((segment) => segment.length > 0);
  for (const segment of segments) {
    current = path.join(current, segment);
    let details;
    try {
      details = await lstat(current);
    } catch (error) {
      if (allowMissing && error?.code === "ENOENT") {
        return;
      }
      throw error;
    }
    if (details.isSymbolicLink()) {
      throw new Error(`symbolic links are forbidden in confined paths: ${current}`);
    }
  }
  const realTarget = await realpath(resolvedTarget);
  if (
    realTarget !== realRoot &&
    !realTarget.startsWith(`${realRoot}${path.sep}`)
  ) {
    throw new Error(`real path escapes its allowed root: ${realTarget}`);
  }
}

function unsafeCachePath(message, cause = null) {
  const error = new Error(`unsafe benchmark cache path: ${message}`);
  error.code = "UNSAFE_CACHE_PATH";
  if (cause !== null) {
    error.cause = cause;
  }
  return error;
}

export async function assertConfinedCachePath(
  targetPath,
  { allowMissing = false } = {}
) {
  try {
    await assertConfinedNonSymlinkPath(
      targetPath,
      path.join(benchmarksRoot, ".cache"),
      { allowMissing }
    );
  } catch (error) {
    throw unsafeCachePath(error.message, error);
  }
}

export async function prepareConfinedCacheDirectory(directoryPath) {
  await assertConfinedCachePath(directoryPath, { allowMissing: true });
  await mkdir(directoryPath, { recursive: true });
  await assertConfinedCachePath(directoryPath);
  return directoryPath;
}

export async function prepareConfinedCacheOutput(outputPath) {
  await assertConfinedCachePath(outputPath, { allowMissing: true });
  await prepareConfinedCacheDirectory(path.dirname(outputPath));
  await assertConfinedCachePath(outputPath, { allowMissing: true });
  return outputPath;
}

export async function writeConfinedCacheOutput(outputPath, contents) {
  await prepareConfinedCacheOutput(outputPath);
  try {
    const details = await lstat(outputPath);
    if (details.isSymbolicLink()) {
      throw unsafeCachePath(`output is a symbolic link: ${outputPath}`);
    }
    throw unsafeCachePath(`output already exists: ${outputPath}`);
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
  await assertConfinedCachePath(path.dirname(outputPath));
  let handle;
  try {
    handle = await open(
      outputPath,
      fsConstants.O_CREAT |
        fsConstants.O_EXCL |
        fsConstants.O_NOFOLLOW |
        fsConstants.O_WRONLY,
      0o600
    );
    await handle.writeFile(contents);
  } catch (error) {
    throw unsafeCachePath(`exclusive output creation failed: ${outputPath}`, error);
  } finally {
    await handle?.close();
  }
  await assertConfinedCachePath(outputPath);
  const written = await lstat(outputPath);
  if (!written.isFile() || written.isSymbolicLink()) {
    throw unsafeCachePath(`written output is not a regular file: ${outputPath}`);
  }
}

async function readConfinedCacheOutput(outputPath) {
  await assertConfinedCachePath(outputPath);
  return readFile(outputPath, "utf8");
}

async function unlinkConfinedCacheOutput(outputPath) {
  await assertConfinedCachePath(outputPath);
  await unlink(outputPath);
}

async function addPathToHash(
  hash,
  absolutePath,
  label,
  includeFile = () => true
) {
  const details = await lstat(absolutePath);
  if (details.isSymbolicLink()) {
    throw new Error(`runtime fingerprint rejects symbolic links: ${absolutePath}`);
  }
  if (details.isDirectory()) {
    const entries = await readdir(absolutePath, { withFileTypes: true });
    const sortedEntries = entries.sort((left, right) => {
      if (left.name < right.name) {
        return -1;
      }
      if (left.name > right.name) {
        return 1;
      }
      return 0;
    });
    for (const entry of sortedEntries) {
      await addPathToHash(
        hash,
        path.join(absolutePath, entry.name),
        `${label}/${entry.name}`,
        includeFile
      );
    }
    return;
  }
  if (!details.isFile() || !includeFile(absolutePath)) {
    return;
  }
  hash.update(`${label}\0`);
  hash.update(await readFile(absolutePath));
  hash.update("\0");
}

async function hashProjectPaths(relativePaths, projectRoot = benchmarksRoot) {
  const hash = createHash("sha256");
  for (const relativePath of relativePaths) {
    await addPathToHash(
      hash,
      path.join(projectRoot, relativePath),
      relativePath
    );
  }
  return hash.digest("hex");
}

export function createMeasurementSourceIdentity(projectRoot = benchmarksRoot) {
  return hashProjectPaths(measurementSourcePaths, projectRoot);
}

const nodeBuiltinModules = new Set(
  builtinModules.flatMap((name) => [name, name.startsWith("node:") ? name.slice(5) : `node:${name}`])
);

function packageNameFromSpecifier(specifier) {
  if (nodeBuiltinModules.has(specifier)) {
    return null;
  }
  if (
    specifier.startsWith("node:") ||
    path.isAbsolute(specifier) ||
    specifier.includes("\\") ||
    specifier.split("/").some((segment) => segment === "" || segment === "." || segment === "..")
  ) {
    throw new Error(`invalid module specifier in adapter source: ${specifier}`);
  }
  if (specifier.startsWith("@")) {
    const packageName = specifier.split("/").slice(0, 2).join("/");
    if (!/^@[^/]+\/[^/]+$/.test(packageName)) {
      throw new Error(`invalid scoped package specifier in adapter source: ${specifier}`);
    }
    return packageName;
  }
  return specifier.split("/")[0];
}

function collectStaticRequireSpecifiers(source, sourcePath) {
  const specifiers = [];
  const length = source.length;

  function skipTrivia(start) {
    let index = start;
    while (index < length) {
      if (/\s/.test(source[index])) {
        index += 1;
        continue;
      }
      if (source.startsWith("//", index)) {
        const newline = source.indexOf("\n", index + 2);
        return newline === -1 ? length : skipTrivia(newline + 1);
      }
      if (source.startsWith("/*", index)) {
        const end = source.indexOf("*/", index + 2);
        if (end === -1) {
          throw new Error(`unterminated comment in adapter source: ${sourcePath}`);
        }
        index = end + 2;
        continue;
      }
      break;
    }
    return index;
  }

  function skipQuoted(start, quote) {
    let index = start + 1;
    while (index < length) {
      if (source[index] === "\\") {
        index += 2;
        continue;
      }
      if (source[index] === quote) {
        return index + 1;
      }
      index += 1;
    }
    throw new Error(`unterminated string in adapter source: ${sourcePath}`);
  }

  for (let index = 0; index < length;) {
    if (source.startsWith("//", index) || source.startsWith("/*", index)) {
      index = skipTrivia(index);
      continue;
    }
    if (source[index] === '"' || source[index] === "'" || source[index] === "`") {
      index = skipQuoted(index, source[index]);
      continue;
    }
    if (
      source.startsWith("require", index) &&
      !/[A-Za-z0-9_$]/.test(source[index - 1] ?? "") &&
      !/[A-Za-z0-9_$]/.test(source[index + 7] ?? "") &&
      source[index - 1] !== "."
    ) {
      let cursor = skipTrivia(index + 7);
      if (source[cursor] !== "(") {
        index += 7;
        continue;
      }
      cursor = skipTrivia(cursor + 1);
      const quote = source[cursor];
      if (quote !== '"' && quote !== "'") {
        throw new Error(`dynamic require is forbidden in adapter source: ${sourcePath}`);
      }
      const valueStart = cursor + 1;
      const valueEnd = skipQuoted(cursor, quote) - 1;
      const specifier = source.slice(valueStart, valueEnd);
      if (specifier.includes("\\")) {
        throw new Error(`escaped require specifiers are forbidden in adapter source: ${sourcePath}`);
      }
      cursor = skipTrivia(valueEnd + 1);
      if (source[cursor] !== ")") {
        throw new Error(`dynamic require is forbidden in adapter source: ${sourcePath}`);
      }
      specifiers.push(specifier);
      index = cursor + 1;
      continue;
    }
    index += 1;
  }
  return specifiers;
}

async function collectAdapterSources(entryPath, sourceRoot, files, packages) {
  const resolved = path.extname(entryPath).length === 0
    ? `${entryPath}.js`
    : entryPath;
  if (files.has(resolved)) {
    return;
  }
  if (resolved !== sourceRoot && !resolved.startsWith(`${sourceRoot}${path.sep}`)) {
    throw new Error(`adapter import escapes benchmark source: ${resolved}`);
  }
  const details = await lstat(resolved);
  if (details.isSymbolicLink() || !details.isFile()) {
    throw new Error(`adapter source must be a regular non-symlink file: ${resolved}`);
  }
  files.add(resolved);
  const source = await readFile(resolved, "utf8");
  const importPattern = /(?:\b(?:import|export)\s+(?:[^"']*?\s+from\s+)?|\bimport\(\s*)["']([^"']+)["']/g;
  const specifiers = [
    ...[...source.matchAll(importPattern)].map((match) => match[1]),
    ...collectStaticRequireSpecifiers(source, resolved)
  ];
  for (const specifier of specifiers) {
    if (specifier.startsWith(".")) {
      await collectAdapterSources(
        path.resolve(path.dirname(resolved), specifier),
        sourceRoot,
        files,
        packages
      );
      continue;
    }
    const packageName = packageNameFromSpecifier(specifier);
    if (packageName !== null) {
      packages.add(packageName);
    }
  }
}

export async function hashAdapterRuntimeSources(
  entryPath,
  sourceRoot = path.join(benchmarksRoot, "src")
) {
  await assertConfinedNonSymlinkPath(entryPath, sourceRoot);
  const files = new Set();
  const packages = new Set();
  await collectAdapterSources(entryPath, sourceRoot, files, packages);
  const hash = createHash("sha256");
  for (const filePath of [...files].sort()) {
    await addPathToHash(hash, filePath, path.relative(sourceRoot, filePath));
  }
  return Object.freeze({
    sha256: hash.digest("hex"),
    packages: Object.freeze([...packages].sort())
  });
}

async function resolveInstalledPackage(
  packageName,
  fromManifestPath = null,
  projectRoot = benchmarksRoot
) {
  let current = fromManifestPath === null
    ? projectRoot
    : path.dirname(fromManifestPath);
  while (
    current === projectRoot ||
    current.startsWith(`${projectRoot}${path.sep}`)
  ) {
    const packageRoot = path.join(current, "node_modules", packageName);
    const manifestPath = path.join(packageRoot, "package.json");
    try {
      await assertConfinedNonSymlinkPath(manifestPath, projectRoot);
      const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
      if (manifest.name !== packageName) {
        throw new Error(`installed package name mismatch for ${packageName}`);
      }
      return { root: packageRoot, manifest, manifestPath };
    } catch (error) {
      if (error?.code !== "ENOENT") {
        throw error;
      }
    }
    if (current === projectRoot) {
      break;
    }
    current = path.dirname(current);
  }
  const error = new Error(`installed package is missing: ${packageName}`);
  error.code = "MODULE_NOT_FOUND";
  throw error;
}

async function addRuntimePackageTreeToHash(hash, packageRoot, label) {
  async function visit(current, relative) {
    const details = await lstat(current);
    if (details.isSymbolicLink()) {
      throw new Error(`runtime package rejects symbolic links: ${current}`);
    }
    if (details.isDirectory()) {
      if (relative !== "" && path.basename(current) === "node_modules") {
        return;
      }
      const entries = await readdir(current, { withFileTypes: true });
      entries.sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0);
      for (const entry of entries) {
        await visit(
          path.join(current, entry.name),
          relative === "" ? entry.name : `${relative}/${entry.name}`
        );
      }
      return;
    }
    if (!details.isFile()) {
      return;
    }
    hash.update(`${label}/${relative}\0`);
    hash.update(await readFile(current));
    hash.update("\0");
  }
  await visit(packageRoot, "");
}

export async function hashRuntimePackageBytes(
  packageRoot,
  allowedRoot = benchmarksRoot
) {
  await assertConfinedNonSymlinkPath(packageRoot, allowedRoot);
  const hash = createHash("sha256");
  await addRuntimePackageTreeToHash(hash, packageRoot, "package");
  return hash.digest("hex");
}

async function hashInstalledPackageClosure(packageNames, projectRoot = benchmarksRoot) {
  const hash = createHash("sha256");
  const visited = new Set();
  const lockPath = path.join(projectRoot, "package-lock.json");
  await assertConfinedNonSymlinkPath(lockPath, projectRoot);
  const lock = JSON.parse(await readFile(lockPath, "utf8"));
  if (lock.lockfileVersion !== 3 || lock.packages === null || typeof lock.packages !== "object") {
    throw new Error("runtime package identity requires a package-lock v3 package inventory");
  }
  async function visitPackage(packageName, fromManifestPath = null) {
    const resolved = await resolveInstalledPackage(
      packageName,
      fromManifestPath,
      projectRoot
    );
    const canonicalRoot = await realpath(resolved.root);
    if (visited.has(canonicalRoot)) {
      return;
    }
    visited.add(canonicalRoot);
    const lockKey = path.relative(projectRoot, resolved.root).split(path.sep).join("/");
    const lockEntry = lock.packages[lockKey];
    if (
      lockEntry === null ||
      typeof lockEntry !== "object" ||
      lockEntry.version !== resolved.manifest.version
    ) {
      throw new Error(`package lock identity mismatch for ${packageName}`);
    }
    hash.update(`lock/${packageName}/${lockKey}\0`);
    hash.update(canonicalJson(lockEntry));
    hash.update("\0");
    await addRuntimePackageTreeToHash(hash, resolved.root, packageName);
    const dependencies = new Set([
      ...Object.keys(resolved.manifest.dependencies ?? {}),
      ...Object.keys(resolved.manifest.optionalDependencies ?? {}),
      ...Object.keys(resolved.manifest.peerDependencies ?? {})
    ]);
    for (const dependency of [...dependencies].sort()) {
      try {
        await visitPackage(dependency, resolved.manifestPath);
      } catch (error) {
        if (
          Object.hasOwn(resolved.manifest.optionalDependencies ?? {}, dependency) &&
          error?.code === "MODULE_NOT_FOUND"
        ) {
          continue;
        }
        throw error;
      }
    }
  }
  for (const packageName of [...packageNames].sort()) {
    await visitPackage(packageName);
  }
  return hash.digest("hex");
}

async function hashLocalRuntimeAssets(draft, projectRoot = benchmarksRoot) {
  const root = path.join(projectRoot, "metaschemas");
  let manifest;
  try {
    manifest = JSON.parse(
      await readFile(path.join(root, "manifest.json"), "utf8")
    );
  } catch (error) {
    if (error?.code === "ENOENT") {
      return null;
    }
    throw error;
  }
  const entries = manifest.files.filter((entry) => entry.draft === draft);
  const hash = createHash("sha256");
  hash.update(canonicalJson(entries));
  for (const entry of entries) {
    await addPathToHash(
      hash,
      path.join(root, entry.path),
      `metaschemas/${entry.path}`
    );
  }
  return hash.digest("hex");
}

export async function createValidatorRuntimeIdentity({
  validator,
  draft,
  projectRoot = benchmarksRoot
}) {
  if (!adapterRegistry.some(({ id }) => id === validator)) {
    throw new Error(`unknown validator runtime identity: ${String(validator)}`);
  }
  const sourceIdentity = await hashAdapterRuntimeSources(
    path.join(projectRoot, "src", "adapters", `${validator}.js`),
    path.join(projectRoot, "src")
  );
  const packageNames = new Set(sourceIdentity.packages);
  const packageRuntimeSha256 = await hashInstalledPackageClosure(
    packageNames,
    projectRoot
  );
  const localRuntimeAssetsSha256 = await hashLocalRuntimeAssets(
    draft,
    projectRoot
  );
  const identity = {
    adapterSourcesSha256: sourceIdentity.sha256,
    packageRuntimeSha256,
    localRuntimeAssetsSha256
  };
  return Object.freeze({
    ...identity,
    hash: digest(canonicalJson(identity))
  });
}

const workerBooleanFlags = new Set([
  "--always-opt",
  "--jitless",
  "--no-opt",
  "--no-turbo-inlining",
  "--predictable",
  "--turbo-fast-api-calls"
]);
const workerValueFlags = new Set([
  "--max-old-space-size",
  "--max-semi-space-size",
  "--random-seed",
  "--stack-size"
]);

export function effectiveWorkerExecArgv(execArgv = process.execArgv) {
  const effective = [];
  for (let index = 0; index < execArgv.length; index += 1) {
    const argument = execArgv[index];
    if (workerBooleanFlags.has(argument)) {
      effective.push(argument);
      continue;
    }
    const separator = argument.indexOf("=");
    const flag = separator === -1 ? argument : argument.slice(0, separator);
    if (!workerValueFlags.has(flag)) {
      continue;
    }
    const value = separator === -1 ? execArgv[index + 1] : argument.slice(separator + 1);
    if (typeof value !== "string" || !/^\d+$/.test(value)) {
      throw new Error(`worker runtime flag requires a numeric value: ${flag}`);
    }
    effective.push(`${flag}=${value}`);
    if (separator === -1) {
      index += 1;
    }
  }
  return effective;
}

export function createRuntimeEnvironmentIdentity({
  versions = process.versions,
  execArgv = effectiveWorkerExecArgv(),
  platform = process.platform,
  architecture = process.arch,
  operatingSystemType = os.type(),
  operatingSystemRelease = os.release(),
  endianness = os.endianness(),
  cpuModels = os.cpus().map(({ model }) => model),
  totalMemory = os.totalmem(),
  nodeOptions = process.env.NODE_OPTIONS ?? null,
  uvThreadpoolSize = process.env.UV_THREADPOOL_SIZE ?? null
} = {}) {
  return {
    versions: Object.fromEntries(
      Object.entries(versions).sort(([left], [right]) => {
        if (left < right) {
          return -1;
        }
        if (left > right) {
          return 1;
        }
        return 0;
      })
    ),
    execArgv: [...execArgv],
    platform,
    architecture,
    operatingSystemType,
    operatingSystemRelease,
    endianness,
    cpuModels: [...cpuModels],
    totalMemory,
    nodeOptions,
    uvThreadpoolSize
  };
}

export async function createBenchmarkCohortIdentity({
  mode = "full",
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent,
  packageLockSha256,
  npmSnapshotLockSha256,
  suiteLockSha256,
  memoryBudget = memoryBudgetFromEnvironment(),
  runtimeEnvironment = createRuntimeEnvironmentIdentity()
}) {
  const threshold = parseEligibilityThresholdPercent(
    eligibilityThresholdPercent
  ).percent;
  for (const [field, value] of Object.entries({
    packageLockSha256,
    npmSnapshotLockSha256,
    suiteLockSha256
  })) {
    if (!hashPattern.test(value)) {
      throw new Error(`benchmark cohort ${field} must be a SHA-256 hash`);
    }
  }
  const validatorRuntimeSha256 = {};
  for (const definition of adapterRegistry) {
    for (const draft of definition.drafts) {
      validatorRuntimeSha256[`${draft}/${definition.id}`] =
        (
          await createValidatorRuntimeIdentity({
            validator: definition.id,
            draft
          })
        ).hash;
    }
  }
  return Object.freeze({
    cohortIdentityVersion: 3,
    benchmarkMode: mode,
    rounds: getBenchmarkMode(mode).rounds,
    benchmarkContractSha256: createBenchmarkContractHash({
      mode,
      memoryBudget,
      eligibilityThresholdPercent: threshold
    }),
    eligibilityThresholdPercent: threshold,
    sharedHarnessSha256: await createMeasurementSourceIdentity(),
    packageLockSha256,
    npmSnapshotLockSha256,
    suiteLockSha256,
    runtimeEnvironment,
    validatorRuntimeSha256
  });
}

export async function createSampleCacheContext({ request = null, ...overrides } = {}) {
  const sharedHarnessSha256 =
    overrides.sharedHarnessSha256 ??
    await createMeasurementSourceIdentity();
  const suiteLockSha256 =
    overrides.suiteLockSha256 ??
    digest(await readFile(path.join(benchmarksRoot, "suite-lock.json")));
  const validatorRuntimeSha256 =
    overrides.validatorRuntimeSha256 ??
    (await createValidatorRuntimeIdentity({
      validator: request?.validator,
      draft: request?.draft
    })).hash;
  const runtimeEnvironmentSha256 =
    overrides.runtimeEnvironmentSha256 ??
    digest(
      canonicalJson(
        overrides.runtimeEnvironment ?? createRuntimeEnvironmentIdentity()
      )
    );
  for (const [field, value] of Object.entries({
    sharedHarnessSha256,
    suiteLockSha256,
    validatorRuntimeSha256,
    runtimeEnvironmentSha256
  })) {
    if (!hashPattern.test(value)) {
      throw new Error(`sample cache context ${field} must be a SHA-256 hash`);
    }
  }
  return Object.freeze({
    sharedHarnessSha256,
    suiteLockSha256,
    validatorRuntimeSha256,
    runtimeEnvironmentSha256
  });
}

const defaultSampleCacheContextPromises = new Map();
const defaultValidatorRuntimeIdentityPromises = new Map();
let defaultSharedHarnessSha256Promise = null;
let defaultSuiteLockSha256Promise = null;
let defaultRuntimeEnvironmentSha256 = null;

function getDefaultSampleCacheContext(request) {
  const key = `${request.validator}/${request.draft}`;
  if (!defaultSampleCacheContextPromises.has(key)) {
    const validatorKey = key;
    if (!defaultValidatorRuntimeIdentityPromises.has(validatorKey)) {
      defaultValidatorRuntimeIdentityPromises.set(
        validatorKey,
        createValidatorRuntimeIdentity({
          validator: request.validator,
          draft: request.draft
        })
      );
    }
    defaultSharedHarnessSha256Promise ??=
      createMeasurementSourceIdentity();
    defaultSuiteLockSha256Promise ??= readFile(
      path.join(benchmarksRoot, "suite-lock.json")
    ).then(digest);
    defaultRuntimeEnvironmentSha256 ??= digest(
      canonicalJson(createRuntimeEnvironmentIdentity())
    );
    defaultSampleCacheContextPromises.set(
      key,
      Promise.all([
        defaultSharedHarnessSha256Promise,
        defaultSuiteLockSha256Promise,
        defaultValidatorRuntimeIdentityPromises.get(validatorKey)
      ]).then(([sharedHarnessSha256, suiteLockSha256, validatorRuntime]) =>
        Object.freeze({
          sharedHarnessSha256,
          suiteLockSha256,
          validatorRuntimeSha256: validatorRuntime.hash,
          runtimeEnvironmentSha256: defaultRuntimeEnvironmentSha256
        })
      )
    );
  }
  return defaultSampleCacheContextPromises.get(key);
}

export function createSampleCacheIdentity({
  request,
  intersectionHash,
  benchmarkContractHash,
  cacheContext
}) {
  if (
    !hashPattern.test(intersectionHash) ||
    !hashPattern.test(benchmarkContractHash)
  ) {
    throw new Error("sample cache identity requires contract and intersection hashes");
  }
  if (cacheContext === null || typeof cacheContext !== "object") {
    throw new Error("sample cache identity requires a cache context");
  }
  const normalizedCacheContext = {
    sharedHarnessSha256: cacheContext.sharedHarnessSha256,
    suiteLockSha256: cacheContext.suiteLockSha256,
    validatorRuntimeSha256: cacheContext.validatorRuntimeSha256,
    runtimeEnvironmentSha256: cacheContext.runtimeEnvironmentSha256
  };
  for (const [field, value] of Object.entries(normalizedCacheContext)) {
    if (hashPattern.test(value)) {
      continue;
    }
    throw new Error(`sample cache identity context ${field} is invalid`);
  }
  const identity = {
    identityVersion: sampleCacheIdentityVersion,
    sampleContractVersion,
    benchmarkContractSha256: benchmarkContractHash,
    intersectionSha256: intersectionHash,
    cacheContext: normalizedCacheContext,
    scope: {
      mode: request.benchmarkMode ?? "full",
      phase: request.phase,
      draft: request.draft,
      formatProfile: request.formatProfile,
      validator: request.validator,
      round: request.round
    }
  };
  return Object.freeze({
    identity: Object.freeze(identity),
    hash: digest(canonicalJson(identity))
  });
}

function isValidPhaseScope(phase, formatProfile) {
  return phase === "setup"
    ? formatProfile === null
    : formatProfiles.includes(formatProfile);
}

function phaseScopeRoot(resultsRoot, draft, formatProfile, phase) {
  return phase === "setup"
    ? path.join(resultsRoot, draft)
    : path.join(resultsRoot, draft, "profiles", formatProfile);
}

export function verifyBenchmarkArtifacts({
  manifest,
  loadedManifest,
  intersectionRaw,
  intersection,
  intersectionHash,
  artifactHash,
  sourceReportHashes
}) {
  if (manifest.manifestSha256 !== loadedManifest.manifestSha256) {
    throw new Error("suite manifest hash differs from the loaded suite");
  }
  if (digest(intersectionRaw) !== artifactHash) {
    throw new Error("intersection artifact hash does not match its sidecar");
  }
  if (performanceIdentitySha256(intersection) !== intersectionHash) {
    throw new Error("performance identity hash does not match its sidecar");
  }
  for (const [key, hashes] of sourceReportHashes) {
    if (hashes.actual !== hashes.expected) {
      throw new Error(`stale conformance report hash: ${key}`);
    }
  }
}

export async function loadBenchmarkArtifacts({
  draft,
  formatProfile,
  phase,
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent
}) {
  if (
    !draftIds.includes(draft) ||
    !isValidPhaseScope(phase, formatProfile) ||
    !performancePhases.includes(phase)
  ) {
    throw new Error("benchmark artifact draft, format profile, and phase are required");
  }
  const lock = JSON.parse(
    await readFile(path.join(benchmarksRoot, "suite-lock.json"), "utf8")
  );
  const suite = await loadSuite({ lock, writeManifest: false });
  const manifest = JSON.parse(
    await readFile(
      path.join(getResultsRoot(), "suite-manifest.json"),
      "utf8"
    )
  );
  const scopeRoot = phaseScopeRoot(getResultsRoot(), draft, formatProfile, phase);
  const intersectionRaw = await readFile(
    path.join(scopeRoot, "intersections", `${phase}.json`),
    "utf8"
  );
  const intersectionHash = (
    await readFile(
      path.join(scopeRoot, "intersections", `${phase}.sha256`),
      "utf8"
    )
  ).trim();
  const artifactHash = (
    await readFile(
      path.join(scopeRoot, "intersections", `${phase}.artifact.sha256`),
      "utf8"
    )
  ).trim();
  const intersection = JSON.parse(intersectionRaw);
  if (
    intersection.phase !== phase ||
    intersection.suite.commit !== suite.manifest.commit ||
    intersection.suite.tree !== suite.manifest.tree ||
    intersection.suite.manifestSha256 !== suite.manifest.manifestSha256
  ) {
    throw new Error("intersection suite metadata is stale");
  }

  const sourceReportHashes = new Map();
  for (const [key, expected] of Object.entries(intersection.sourceReports)) {
    const [draft, validator] = key.split("/");
    const raw = await readFile(
      path.join(
        getResultsRoot(),
        draft,
        "conformance",
        `${validator}.json`
      )
    );
    sourceReportHashes.set(key, { expected, actual: sha256(raw) });
  }
  verifyBenchmarkArtifacts({
    manifest,
    loadedManifest: suite.manifest,
    intersectionRaw,
    intersection,
    intersectionHash,
    artifactHash,
    sourceReportHashes
  });
  const expectedEligibilityPolicy = createPerformanceEligibilityPolicy(
    parseEligibilityThresholdPercent(eligibilityThresholdPercent)
  );
  if (
    canonicalJson(intersection.performanceIdentity.policy) !==
    canonicalJson(expectedEligibilityPolicy)
  ) {
    throw new Error("intersection eligibility threshold is incompatible with this run");
  }
  return { suite, manifest, intersection, intersectionHash, artifactHash };
}

async function loadBenchmarkScopeMetadata({
  draft,
  formatProfile,
  phase,
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent
}) {
  if (
    !draftIds.includes(draft) ||
    !isValidPhaseScope(phase, formatProfile) ||
    !performancePhases.includes(phase)
  ) {
    throw new Error("benchmark scope draft, format profile, and phase are required");
  }
  const manifest = JSON.parse(
    await readFile(
      path.join(getResultsRoot(), "suite-manifest.json"),
      "utf8"
    )
  );
  const scopeRoot = phaseScopeRoot(
    getResultsRoot(),
    draft,
    formatProfile,
    phase
  );
  const intersectionRaw = await readFile(
    path.join(scopeRoot, "intersections", `${phase}.json`),
    "utf8"
  );
  const intersectionHash = (
    await readFile(
      path.join(scopeRoot, "intersections", `${phase}.sha256`),
      "utf8"
    )
  ).trim();
  const artifactHash = (
    await readFile(
      path.join(
        scopeRoot,
        "intersections",
        `${phase}.artifact.sha256`
      ),
      "utf8"
    )
  ).trim();
  const intersection = JSON.parse(intersectionRaw);
  if (
    digest(intersectionRaw) !== artifactHash ||
    performanceIdentitySha256(intersection) !== intersectionHash ||
    intersection.phase !== phase ||
    intersection.suite.commit !== manifest.commit ||
    intersection.suite.tree !== manifest.tree ||
    intersection.suite.manifestSha256 !== manifest.manifestSha256
  ) {
    throw new Error("benchmark scope metadata is stale");
  }
  const expectedEligibilityPolicy = createPerformanceEligibilityPolicy(
    parseEligibilityThresholdPercent(eligibilityThresholdPercent)
  );
  if (
    canonicalJson(intersection.performanceIdentity.policy) !==
    canonicalJson(expectedEligibilityPolicy)
  ) {
    throw new Error("benchmark scope eligibility threshold is incompatible");
  }
  for (const [key, expected] of Object.entries(intersection.sourceReports)) {
    const [reportDraft, validator] = key.split("/");
    const raw = await readFile(
      path.join(
        getResultsRoot(),
        reportDraft,
        "conformance",
        `${validator}.json`
      )
    );
    if (sha256(raw) !== expected) {
      throw new Error(`stale conformance report hash: ${key}`);
    }
  }
  return { intersection, intersectionHash, artifactHash };
}

function spawnWorker(request) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [...effectiveWorkerExecArgv(), workerPath, JSON.stringify(request)],
      {
      cwd: benchmarksRoot,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"]
      }
    );
    let stdout = "";
    let stderr = "";
    let outputOverflow = false;
    const heartbeat = setInterval(() => {
      process.stderr.write(
        `${JSON.stringify({ event: "sample-heartbeat", phase: request.phase, draft: request.draft, formatProfile: request.formatProfile, validator: request.validator, round: request.round })}\n`
      );
    }, 10_000);
    heartbeat.unref();
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      if (stdout.length + chunk.length > 16 * 1024) {
        outputOverflow = true;
        return;
      }
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      if (stderr.length < 16 * 1024) {
        stderr += chunk.slice(0, 16 * 1024 - stderr.length);
      }
    });
    child.once("error", (error) => {
      clearInterval(heartbeat);
      reject(error);
    });
    child.once("close", async (code) => {
      clearInterval(heartbeat);
      if (code !== 0) {
        reject(
          new Error(
            `benchmark worker failed with code ${code}: ${stderr.trim()}`
          )
        );
        return;
      }
      try {
        if (outputOverflow) {
          throw new Error("benchmark worker stdout exceeded 16 KiB");
        }
        const acknowledgement = JSON.parse(stdout);
        if (acknowledgement.event !== "sample-complete") {
          throw new Error("benchmark worker returned an invalid acknowledgement");
        }
        resolve(JSON.parse(await readConfinedCacheOutput(request.outputPath)));
      } catch (error) {
        reject(
          new Error(
            `benchmark worker returned invalid JSON: ${error.message}; stdout=${stdout}`
          )
        );
      }
    });
  });
}

export function sampleCheckpointPath(request, options = {}) {
  const mode = options.mode ?? request.benchmarkMode ?? "full";
  const config = getBenchmarkMode(mode);
  const checkpointRoot =
    options.checkpointRoot ??
    path.join(
      benchmarksRoot,
      ".cache",
      sampleCheckpointNamespace,
      mode
    );
  if (!hashPattern.test(options.sampleIdentityHash)) {
    throw new Error("sample checkpoint path requires a cache identity hash");
  }
  const resolvedCheckpointRoot = path.resolve(checkpointRoot);
  const cacheRoot = path.join(benchmarksRoot, ".cache");
  if (!resolvedCheckpointRoot.startsWith(`${cacheRoot}${path.sep}`)) {
    throw new Error("sample checkpoint root must stay inside the project .cache");
  }
  if (
    !performancePhases.includes(request.phase) ||
    !draftIds.includes(request.draft) ||
    !isValidPhaseScope(request.phase, request.formatProfile) ||
    !Number.isInteger(request.round) ||
    request.round < 1 ||
    request.round > config.rounds
  ) {
    throw new Error("invalid granular sample identity");
  }
  const participants = participantsForPhase(request.draft, request.phase);
  if (!participants.some(({ id }) => id === request.validator)) {
    throw new Error("validator does not participate in the granular sample scope");
  }
  return path.join(
    resolvedCheckpointRoot,
    options.sampleIdentityHash,
    request.phase,
    request.draft,
    request.formatProfile ?? "draft",
    request.validator,
    `round-${request.round}.json`
  );
}

export function validateGranularSample({
  request,
  sample,
  intersectionHash,
  benchmarkContractHash,
  sampleIdentityHash = null,
  mode = request.benchmarkMode ?? "full"
}) {
  const config = getBenchmarkMode(mode);
  const effectiveContractHash =
    benchmarkContractHash ?? createBenchmarkContractHash({ mode });
  const participant = participantsForPhase(request.draft, request.phase)
    .find(({ id }) => id === request.validator);
  if (
    participant === null ||
    typeof participant !== "object" ||
    sample?.sampleContractVersion !== sampleContractVersion ||
    sample.benchmarkMode !== mode ||
    sample.benchmarkContractSha256 !== effectiveContractHash ||
    sample.phase !== request.phase ||
    sample.draft !== request.draft ||
    sample.formatProfile !== request.formatProfile ||
    sample.validator !== request.validator ||
    sample.round !== request.round ||
    sample.intersectionSha256 !== intersectionHash ||
    !hashPattern.test(sample.validatorRuntimeSha256) ||
    (hashPattern.test(request.validatorRuntimeSha256) &&
      sample.validatorRuntimeSha256 !== request.validatorRuntimeSha256) ||
    !hashPattern.test(sample.sampleCacheIdentitySha256) ||
    (sampleIdentityHash !== null &&
      sample.sampleCacheIdentitySha256 !== sampleIdentityHash)
  ) {
    throw new Error(
      "granular sample identity, contract, or intersection hash is invalid"
    );
  }
  if (Object.hasOwn(sample, "mutations")) {
    throw new Error(`${request.phase} sample must not include mutation metadata`);
  }
  for (const point of ["start", "end", "peak"]) {
    for (const field of ["rss", "heapUsed", "heapTotal", "external"]) {
      if (
        !Number.isFinite(sample.memory?.[point]?.[field]) ||
        sample.memory[point][field] < 0
      ) {
        throw new Error(
          `granular sample memory telemetry is invalid: ${point}.${field}`
        );
      }
    }
  }
  if (
    !Number.isFinite(sample.operations) ||
    sample.operations <= 0 ||
    !Number.isFinite(sample.seconds) ||
    sample.seconds <= 0 ||
    !Number.isFinite(sample.throughput) ||
    sample.throughput <= 0
  ) {
    throw new Error("granular sample performance fields are invalid");
  }
  const prefix = phaseTimingPrefix(request.phase);
  const corpusSize =
    request.phase === "setup"
      ? sample.corpusSetupEntries
      : sample.corpusCases;
  if (
    sample.warmupMinimumMilliseconds !==
      config[`${prefix}WarmupMinimumMilliseconds`] ||
    sample.warmupMilliseconds <
      config[`${prefix}WarmupMinimumMilliseconds`] ||
    sample.targetSampleMilliseconds !==
      config[`${prefix}TargetMilliseconds`] ||
    sample.minimumSampleMilliseconds !==
      config[`${prefix}MinimumSampleMilliseconds`] ||
    (!sample.singlePassExceededTarget &&
      sample.actualElapsedMilliseconds <
        config[`${prefix}MinimumSampleMilliseconds`]) ||
    !Number.isInteger(sample.passes) ||
    sample.passes < 1 ||
    !Number.isInteger(corpusSize) ||
    corpusSize < 1 ||
    sample.operations !== corpusSize * sample.passes
  ) {
    throw new Error("granular sample timing or corpus contract is invalid");
  }
  return sample;
}

function checkpointCorruption(message, cause = null) {
  const error = new Error(`granular checkpoint is corrupt: ${message}`);
  error.code = "CHECKPOINT_CORRUPT";
  if (cause !== null) {
    error.cause = cause;
  }
  return error;
}

async function resolveSampleIdentity({
  request,
  intersectionHash,
  benchmarkContractHash,
  cacheContext
}) {
  const effectiveCacheContext =
    cacheContext ?? await getDefaultSampleCacheContext(request);
  return createSampleCacheIdentity({
    request,
    intersectionHash,
    benchmarkContractHash,
    cacheContext: effectiveCacheContext
  });
}

export async function readSampleCheckpoint({
  request,
  intersectionHash,
  benchmarkContractHash,
  checkpointRoot,
  cacheContext,
  mode = request.benchmarkMode ?? "full"
}) {
  const effectiveContractHash =
    benchmarkContractHash ?? createBenchmarkContractHash({ mode });
  const sampleIdentity = await resolveSampleIdentity({
    request: { ...request, benchmarkMode: mode },
    intersectionHash,
    benchmarkContractHash: effectiveContractHash,
    cacheContext
  });
  const checkpoint = sampleCheckpointPath(request, {
    checkpointRoot,
    mode,
    sampleIdentityHash: sampleIdentity.hash
  });
  await assertConfinedNonSymlinkPath(
    checkpoint,
    path.join(benchmarksRoot, ".cache"),
    { allowMissing: true }
  );
  let envelope;
  try {
    envelope = JSON.parse(await readFile(checkpoint, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") {
      return null;
    }
    throw checkpointCorruption("JSON is malformed", error);
  }
  if (
    envelope === null ||
    typeof envelope !== "object" ||
    Array.isArray(envelope) ||
    envelope.checkpointEnvelopeVersion !== checkpointEnvelopeVersion ||
    envelope.sampleCacheIdentitySha256 !== sampleIdentity.hash ||
    envelope.sampleCacheIdentity === null ||
    typeof envelope.sampleCacheIdentity !== "object" ||
    Array.isArray(envelope.sampleCacheIdentity) ||
    digest(canonicalJson(envelope.sampleCacheIdentity)) !== sampleIdentity.hash ||
    !hashPattern.test(envelope.sampleSha256) ||
    envelope.sample === null ||
    typeof envelope.sample !== "object" ||
    Array.isArray(envelope.sample)
  ) {
    throw checkpointCorruption("envelope identity or shape is invalid");
  }
  if (digest(canonicalJson(envelope.sample)) !== envelope.sampleSha256) {
    throw checkpointCorruption("sample checksum is invalid");
  }
  try {
    return validateGranularSample({
      request: {
        ...request,
        validatorRuntimeSha256:
          sampleIdentity.identity.cacheContext.validatorRuntimeSha256
      },
      sample: envelope.sample,
      intersectionHash,
      benchmarkContractHash: effectiveContractHash,
      sampleIdentityHash: sampleIdentity.hash,
      mode
    });
  } catch (error) {
    throw checkpointCorruption(error.message, error);
  }
}

export async function publishSampleCheckpoint({
  request,
  sample,
  intersectionHash,
  benchmarkContractHash,
  checkpointRoot,
  cacheContext,
  mode = request.benchmarkMode ?? "full"
}) {
  const effectiveContractHash =
    benchmarkContractHash ?? createBenchmarkContractHash({ mode });
  const sampleIdentity = await resolveSampleIdentity({
    request: { ...request, benchmarkMode: mode },
    intersectionHash,
    benchmarkContractHash: effectiveContractHash,
    cacheContext
  });
  validateGranularSample({
    request: {
      ...request,
      validatorRuntimeSha256:
        sampleIdentity.identity.cacheContext.validatorRuntimeSha256
    },
    sample,
    intersectionHash,
    benchmarkContractHash: effectiveContractHash,
    sampleIdentityHash: sampleIdentity.hash,
    mode
  });
  const existing = await readSampleCheckpoint({
    request,
    intersectionHash,
    benchmarkContractHash: effectiveContractHash,
    checkpointRoot,
    cacheContext,
    mode
  });
  if (existing !== null) {
    return { sample: existing, skipped: true };
  }
  const checkpoint = sampleCheckpointPath(request, {
    checkpointRoot,
    mode,
    sampleIdentityHash: sampleIdentity.hash
  });
  await assertConfinedNonSymlinkPath(
    checkpoint,
    path.join(benchmarksRoot, ".cache"),
    { allowMissing: true }
  );
  await mkdir(path.dirname(checkpoint), { recursive: true });
  await assertConfinedNonSymlinkPath(
    path.dirname(checkpoint),
    path.join(benchmarksRoot, ".cache")
  );
  const staged = `${checkpoint}.staged-${process.pid}-${Date.now()}`;
  const envelope = {
    checkpointEnvelopeVersion,
    sampleCacheIdentitySha256: sampleIdentity.hash,
    sampleCacheIdentity: sampleIdentity.identity,
    sampleSha256: digest(canonicalJson(sample)),
    sample
  };
  await writeFile(staged, `${JSON.stringify(envelope)}\n`, { flag: "wx" });
  try {
    await rename(staged, checkpoint);
  } catch (error) {
    try {
      await unlink(staged);
    } catch (cleanupError) {
      if (cleanupError?.code !== "ENOENT") {
        error.cleanupError = cleanupError;
      }
    }
    throw error;
  }
  return { sample, skipped: false };
}

export async function runBenchmarkSample({
  phase,
  draft,
  formatProfile,
  validator,
  round,
  memoryBudget = memoryBudgetFromEnvironment(),
  checkpointRoot,
  mode = "full",
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent,
  sampleExecutor = spawnWorker
}) {
  const config = getBenchmarkMode(mode);
  const normalizedEligibilityThreshold = parseEligibilityThresholdPercent(
    eligibilityThresholdPercent
  ).percent;
  const identity = {
    phase,
    draft,
    formatProfile,
    validator,
    round,
    benchmarkMode: mode,
    eligibilityThresholdPercent: normalizedEligibilityThreshold
  };
  const benchmarkContractHash = createBenchmarkContractHash({
    mode,
    memoryBudget,
    eligibilityThresholdPercent: normalizedEligibilityThreshold
  });
  const cacheContext = await getDefaultSampleCacheContext(identity);
  const effectiveCheckpointRoot =
    checkpointRoot ??
    path.join(
      benchmarksRoot,
      ".cache",
      sampleCheckpointNamespace,
      mode
    );
  const { intersectionHash } = await loadBenchmarkScopeMetadata({
    draft,
    formatProfile,
    phase,
    eligibilityThresholdPercent: normalizedEligibilityThreshold
  });
  const sampleIdentity = createSampleCacheIdentity({
    request: identity,
    intersectionHash,
    benchmarkContractHash,
    cacheContext
  });
  sampleCheckpointPath(identity, {
    checkpointRoot: effectiveCheckpointRoot,
    mode,
    sampleIdentityHash: sampleIdentity.hash
  });
  const existing = await readSampleCheckpoint({
    request: identity,
    intersectionHash,
    benchmarkContractHash,
    checkpointRoot: effectiveCheckpointRoot,
    cacheContext,
    mode
  });
  if (existing !== null) {
    return { sample: existing, skipped: true };
  }
  const pendingRoot = path.join(benchmarksRoot, ".cache", "pending-samples");
  await prepareConfinedCacheDirectory(pendingRoot);
  const outputPath = path.join(
    pendingRoot,
    `${phase}-${draft}-${formatProfile ?? "draft"}-${validator}-${round}-${process.pid}-${Date.now()}.json`
  );
  await prepareConfinedCacheOutput(outputPath);
  const request = {
    ...identity,
    deadline: Date.now() + config.workerDeadlineMilliseconds,
    intersectionSha256: intersectionHash,
    benchmarkContractSha256: benchmarkContractHash,
    sampleCacheIdentitySha256: sampleIdentity.hash,
    validatorRuntimeSha256: cacheContext.validatorRuntimeSha256,
    workerExecArgv: effectiveWorkerExecArgv(),
    benchmarkMode: mode,
    rounds: config.rounds,
    timing: {
      warmupMinimumMilliseconds: config[`${phaseTimingPrefix(phase)}WarmupMinimumMilliseconds`],
      targetSampleMilliseconds: config[`${phaseTimingPrefix(phase)}TargetMilliseconds`],
      minimumSampleMilliseconds: config[`${phaseTimingPrefix(phase)}MinimumSampleMilliseconds`]
    },
    memoryBudget,
    outputPath
  };
  const sample = await sampleExecutor(request);
  const published = await publishSampleCheckpoint({
    request: identity,
    sample,
    intersectionHash,
    benchmarkContractHash,
    checkpointRoot: effectiveCheckpointRoot,
    cacheContext,
    mode
  });
  if (sampleExecutor === spawnWorker) {
    await unlinkConfinedCacheOutput(outputPath);
  }
  return published;
}

async function writePhaseResults({ phase, draft, formatProfile, result }) {
  const scopeLabel = formatProfile ?? "draft";
  const runRoot = path.join(
    benchmarksRoot,
    ".cache",
    `run-${phase}-${draft}-${scopeLabel}-${process.pid}-${Date.now()}`
  );
  const stagedRoot = path.join(runRoot, phase);
  await mkdir(stagedRoot, { recursive: true });
  await writeFile(
    path.join(stagedRoot, "samples.json"),
    `${JSON.stringify(result, null, 2)}\n`
  );

  const targetRoot = path.join(
    phaseScopeRoot(getResultsRoot(), draft, formatProfile, phase),
    phase
  );
  await mkdir(path.dirname(targetRoot), { recursive: true });
  try {
    await access(targetRoot);
    await rename(targetRoot, path.join(runRoot, `previous-${phase}`));
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
  await rename(stagedRoot, targetRoot);
}

export async function runBenchmarkPhase(
  phase,
  {
    mode = "full",
    eligibilityThresholdPercent = defaultEligibilityThresholdPercent,
    validator = null,
    sampleExecutor = spawnWorker
  } = {}
) {
  if (!performancePhases.includes(phase)) {
    throw new Error(`unsupported benchmark phase: ${phase}`);
  }
  const config = getBenchmarkMode(mode);
  const started = Date.now();
  const controllerDeadline =
    started + controllerDeadlineMillisecondsFromEnvironment(mode);
  const scopes = [];

  for (const draft of draftIds) {
    const scopeProfiles = phase === "setup" ? [null] : formatProfiles;
    for (const formatProfile of scopeProfiles) {
      const scopeStarted = Date.now();
      const { intersection, intersectionHash } = await loadBenchmarkScopeMetadata({
        draft,
        formatProfile,
        phase,
        eligibilityThresholdPercent
      });
      const participants = intersection.participants.map(({ id }) => id);
      const samples = [];
      const participantOrderByRound = [];
      if (intersection.emptyReason === null) {
        for (let round = 1; round <= config.rounds; round += 1) {
          const eligible = new Set(participants);
          const canonicalOrder = getRegistryRoundOrder({ draft, phase, round: 1 })
            .filter((validator) => eligible.has(validator));
          const validatorOrder = rotateRoundOrder(canonicalOrder, round);
          participantOrderByRound.push({ round, validators: validatorOrder });
          const validatorsToRun = validator === null
            ? validatorOrder
            : validatorOrder.filter((candidate) => candidate === validator);
          for (const sampleValidator of validatorsToRun) {
            if (Date.now() > controllerDeadline) {
              const error = new Error(
                `${phase} benchmark exceeded the cooperative controller deadline`
              );
              error.code = "COOPERATIVE_DEADLINE_EXCEEDED";
              throw error;
            }
            const identity = {
              phase,
              validator: sampleValidator,
              draft,
              formatProfile,
              round
            };
            const { sample, skipped } = await runBenchmarkSample({
              ...identity,
              mode,
              eligibilityThresholdPercent,
              sampleExecutor
            });
            if (
              sample.phase !== phase ||
              sample.validator !== sampleValidator ||
              sample.draft !== draft ||
              sample.formatProfile !== formatProfile ||
              sample.round !== round
            ) {
              throw new Error(
                "benchmark worker response does not match its request"
              );
            }
            if (skipped) {
              process.stderr.write(
                `${JSON.stringify({ event: "sample-resumed", ...identity })}\n`
              );
            }
            samples.push(sample);
          }
        }
      }
      const scopeEnded = Date.now();
      if (validator !== null) {
        const previousResult = JSON.parse(
          await readFile(
            path.join(
              phaseScopeRoot(getResultsRoot(), draft, formatProfile, phase),
              phase,
              "samples.json"
            ),
            "utf8"
          )
        );
        const result = reconcileDiagnosticPhaseResult({
          previousResult,
          validator,
          freshSamples: samples,
          startedAt: new Date(scopeStarted).toISOString(),
          endedAt: new Date(scopeEnded).toISOString()
        });
        if (
          canonicalJson(result.participants) !== canonicalJson(participants) ||
          result.benchmarkMode !== mode ||
          result.intersectionSha256 !== intersectionHash ||
          canonicalJson(result.participantOrderByRound) !==
            canonicalJson(participantOrderByRound)
        ) {
          throw new Error(
            `diagnostic ${phase} baseline is incompatible with ${draft}/${formatProfile}; run the full ${mode === "quick" ? "Quick " : ""}benchmark first`
          );
        }
        await writePhaseResults({ phase, draft, formatProfile, result });
        scopes.push(result);
        continue;
      }
      const result = {
        benchmarkVersion: 11,
        phase,
        draft,
        formatProfile,
        startedAt: new Date(scopeStarted).toISOString(),
        endedAt: new Date(scopeEnded).toISOString(),
        durationMilliseconds: scopeEnded - scopeStarted,
        benchmarkMode: mode,
        constants: config,
        performanceEligibility: intersection.eligibility.policy,
        intersectionSha256: intersectionHash,
        performanceCorpus: null,
        emptyReason: intersection.emptyReason,
        participants,
        participantOrderByRound,
        samples
      };
      await writePhaseResults({ phase, draft, formatProfile, result });
      scopes.push(result);
    }
  }

  return {
    benchmarkVersion: 11,
    phase,
    startedAt: new Date(started).toISOString(),
    endedAt: new Date().toISOString(),
    durationMilliseconds: Date.now() - started,
    scopes
  };
}
