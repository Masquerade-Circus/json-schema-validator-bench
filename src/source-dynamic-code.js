import { createHash } from "node:crypto";
import {
  lstat,
  readFile,
  readdir,
  realpath,
  stat
} from "node:fs/promises";
import path from "node:path";

import ts from "typescript";

import {
  classifyInlineNodeShellCommand,
  classifyShellWrapperArguments,
  inlineNodeArgumentIndex,
  isNodeCommand,
  isShellCommand
} from "./node-inline-semantics.js";

export const sourceDynamicCodeDetectorVersion = 5;

const executableExtensions = new Set([
  ".js",
  ".cjs",
  ".mjs",
  ".jsx",
  ".ts",
  ".cts",
  ".mts",
  ".tsx"
]);
const documentationExtensions = new Set([".md", ".markdown", ".rst", ".txt"]);
const dataExtensions = new Set([".csv", ".json", ".json5", ".toml", ".xml", ".yaml", ".yml"]);
const knownBinaryExtensions = new Set([
  ".avif",
  ".bmp",
  ".eot",
  ".gif",
  ".gz",
  ".ico",
  ".jpeg",
  ".jpg",
  ".pdf",
  ".png",
  ".tar",
  ".ttf",
  ".webp",
  ".woff",
  ".woff2",
  ".zip"
]);
const vmMethods = new Set([
  "Script",
  "compileFunction",
  "runInContext",
  "runInNewContext",
  "runInThisContext"
]);
const webAssemblyMethods = new Set([
  "Module",
  "compile",
  "compileStreaming",
  "instantiate",
  "instantiateStreaming"
]);
const childMethods = new Set([
  "spawn",
  "spawnSync",
  "execFile",
  "execFileSync",
  "exec",
  "execSync",
  "fork"
]);
export const sourceDynamicCodeDetectorContractSha256 = sha256(JSON.stringify({
  sourceDynamicCodeDetectorVersion,
  executableExtensions: [...executableExtensions],
  vmMethods: [...vmMethods],
  webAssemblyMethods: [...webAssemblyMethods],
  childMethods: [...childMethods],
  opaqueExtensions: [".node", ".wasm"]
}));

export class SourceDynamicCodeError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = "SourceDynamicCodeError";
    this.code = code;
    this.details = Object.freeze({ ...details });
  }
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function canonicalJson(value) {
  if (value === null || typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(",")}]`;
  }
  return `{${Object.keys(value).sort().map((key) =>
    `${JSON.stringify(key)}:${canonicalJson(value[key])}`
  ).join(",")}}`;
}

function isInside(root, candidate) {
  return candidate === root || candidate.startsWith(`${root}${path.sep}`);
}

function safeRelative(root, candidate, code = "SOURCE_PATH_ESCAPE") {
  const relativePath = path.relative(root, candidate);
  if (
    relativePath === "" ||
    (!relativePath.startsWith("..") && !path.isAbsolute(relativePath))
  ) {
    return relativePath.split(path.sep).join("/");
  }
  throw new SourceDynamicCodeError(code, "source path escapes its ownership root", {
    relativePath: relativePath.split(path.sep).join("/")
  });
}

function isDeclarationFile(relativePath) {
  return /\.d\.(?:ts|cts|mts)$/.test(relativePath);
}

function scriptKind(filePath) {
  if (filePath.endsWith(".tsx")) {
    return ts.ScriptKind.TSX;
  }
  if (filePath.endsWith(".jsx")) {
    return ts.ScriptKind.JSX;
  }
  if (filePath.endsWith(".ts") || filePath.endsWith(".cts") || filePath.endsWith(".mts")) {
    return ts.ScriptKind.TS;
  }
  return filePath.endsWith(".json") ? ts.ScriptKind.JSON : ts.ScriptKind.JS;
}

function decodeSource(content, relativePath) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(content);
  } catch {
    throw new SourceDynamicCodeError(
      "SOURCE_ENCODING_INVALID",
      "distributed source is not valid UTF-8",
      { relativePath }
    );
  }
}

function flattenManifestPaths(value, paths = []) {
  if (typeof value === "string") {
    if (value.startsWith("./") || !value.includes(":")) {
      paths.push(value.replace(/^\.\//, ""));
    }
    return paths;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      flattenManifestPaths(entry, paths);
    }
    return paths;
  }
  if (value !== null && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      if (["types", "typings"].includes(key)) {
        continue;
      }
      flattenManifestPaths(entry, paths);
    }
  }
  return paths;
}

function manifestEntrypoints(manifest) {
  const candidates = [];
  for (const field of ["exports", "main", "module", "bin"]) {
    flattenManifestPaths(manifest[field], candidates);
  }
  if (typeof manifest.browser === "string") {
    flattenManifestPaths(manifest.browser, candidates);
  } else if (manifest.browser !== null && typeof manifest.browser === "object") {
    for (const replacement of Object.values(manifest.browser)) {
      if (typeof replacement === "string" && replacement.startsWith("./")) {
        candidates.push(replacement.slice(2));
      }
    }
  }
  if (candidates.length === 0) {
    candidates.push("index.js");
  }
  return [...new Set(candidates.filter((candidate) =>
    typeof candidate === "string" &&
    candidate.length > 0 &&
    candidate !== "." &&
    !candidate.startsWith("node:") &&
    !isDeclarationFile(candidate) &&
    !dataExtensions.has(path.extname(candidate).toLowerCase()) &&
    !documentationExtensions.has(path.extname(candidate).toLowerCase()) &&
    !knownBinaryExtensions.has(path.extname(candidate).toLowerCase())
  ))].sort();
}

async function resolvePackage(projectRoot, packageName) {
  if (
    typeof packageName !== "string" ||
    !/^(?:@[^/]+\/)?[^/]+$/.test(packageName)
  ) {
    throw new SourceDynamicCodeError("SOURCE_PACKAGE_INVALID", "package name is invalid");
  }
  const logicalRoot = path.join(projectRoot, "node_modules", packageName);
  const projectRealRoot = await realpath(projectRoot);
  let packageRealRoot;
  let logicalDetails;
  try {
    logicalDetails = await lstat(logicalRoot);
    packageRealRoot = await realpath(logicalRoot);
  } catch (error) {
    throw new SourceDynamicCodeError("SOURCE_PACKAGE_MISSING", "installed package is missing", {
      packageName,
      cause: error?.code ?? "UNKNOWN"
    });
  }
  if (!isInside(projectRealRoot, packageRealRoot)) {
    throw new SourceDynamicCodeError(
      "SOURCE_PACKAGE_ESCAPE",
      "installed package resolves outside the project root",
      { packageName }
    );
  }
  const manifestPath = path.join(packageRealRoot, "package.json");
  let manifestRaw;
  try {
    manifestRaw = await readFile(manifestPath, "utf8");
  } catch (error) {
    throw new SourceDynamicCodeError(
      error?.code === "ENOENT"
        ? "SOURCE_PACKAGE_MANIFEST_MISSING"
        : "SOURCE_PACKAGE_MANIFEST_READ_ERROR",
      "installed package manifest cannot be read",
      { packageName, cause: error?.code ?? "UNKNOWN" }
    );
  }
  let manifest;
  try {
    manifest = JSON.parse(manifestRaw);
  } catch {
    throw new SourceDynamicCodeError(
      "SOURCE_PACKAGE_MANIFEST_INVALID",
      "installed package manifest is invalid",
      { packageName }
    );
  }
  if (manifest.name !== packageName || typeof manifest.version !== "string") {
    throw new SourceDynamicCodeError(
      "SOURCE_PACKAGE_IDENTITY_MISMATCH",
      "installed package identity does not match its manifest",
      { packageName }
    );
  }
  const lockPath = path.join(projectRoot, "package-lock.json");
  let lockRaw;
  try {
    lockRaw = await readFile(lockPath);
  } catch (error) {
    throw new SourceDynamicCodeError(
      error?.code === "ENOENT" ? "SOURCE_LOCK_MISSING" : "SOURCE_LOCK_READ_ERROR",
      "package lock cannot be read",
      { cause: error?.code ?? "UNKNOWN" }
    );
  }
  let lock;
  try {
    lock = JSON.parse(lockRaw);
  } catch {
    throw new SourceDynamicCodeError("SOURCE_LOCK_INVALID", "package lock is invalid JSON");
  }
  const lockKey = path.relative(projectRoot, logicalRoot).split(path.sep).join("/");
  const lockEntry = lock.packages?.[lockKey];
  if (
    lock.lockfileVersion !== 3 ||
    lockEntry === null ||
    typeof lockEntry !== "object" ||
    lockEntry.version !== manifest.version
  ) {
    throw new SourceDynamicCodeError(
      "SOURCE_LOCK_IDENTITY_MISMATCH",
      "installed package is not represented by the package lock",
      { packageName, version: manifest.version }
    );
  }
  return {
    logicalRoot,
    packageRealRoot,
    manifest,
    lockEntry,
    packageLockSha256: sha256(lockRaw),
    packageRootWasSymlink: logicalDetails.isSymbolicLink()
  };
}

async function inventoryPackage(packageRealRoot) {
  const files = [];
  const visitedDirectories = new Set();
  let symlinks = 0;

  async function visit(current, logicalRelative = "") {
    const logicalDetails = await lstat(current);
    if (logicalDetails.isSymbolicLink()) {
      symlinks += 1;
    }
    const currentReal = await realpath(current);
    if (!isInside(packageRealRoot, currentReal)) {
      throw new SourceDynamicCodeError(
        "SOURCE_SYMLINK_ESCAPE",
        "package symlink resolves outside the package root",
        { relativePath: logicalRelative.split(path.sep).join("/") }
      );
    }
    const details = await stat(currentReal);
    if (details.isDirectory()) {
      if (visitedDirectories.has(currentReal)) {
        return;
      }
      visitedDirectories.add(currentReal);
      const entries = await readdir(current, { withFileTypes: true });
      entries.sort((left, right) => left.name.localeCompare(right.name));
      for (const entry of entries) {
        if (entry.name === "node_modules") {
          continue;
        }
        const relativePath = logicalRelative === ""
          ? entry.name
          : path.join(logicalRelative, entry.name);
        await visit(path.join(current, entry.name), relativePath);
      }
      return;
    }
    if (!details.isFile()) {
      return;
    }
    const relativePath = logicalRelative.split(path.sep).join("/");
    const content = await readFile(currentReal);
    files.push(Object.freeze({
      absolutePath: currentReal,
      relativePath,
      content,
      sha256: sha256(content)
    }));
  }

  await visit(packageRealRoot);
  files.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
  const packageHash = createHash("sha256");
  for (const file of files) {
    packageHash.update(file.relativePath);
    packageHash.update("\0");
    packageHash.update(file.content);
    packageHash.update("\0");
  }
  return { files, symlinks, packageBytesSha256: packageHash.digest("hex") };
}

function sourceMapRecords(file, packageRoot, existingRecords) {
  let map;
  try {
    map = JSON.parse(file.content.toString("utf8"));
  } catch {
    throw new SourceDynamicCodeError("SOURCE_MAP_INVALID", "source map is not valid JSON", {
      relativePath: file.relativePath
    });
  }
  if (
    map === null ||
    typeof map !== "object" ||
    map.version !== 3 ||
    !Array.isArray(map.sources)
  ) {
    throw new SourceDynamicCodeError("SOURCE_MAP_INVALID", "source map structure is invalid", {
      relativePath: file.relativePath
    });
  }
  if (map.sourcesContent === undefined) {
    return [];
  }
  if (
    !Array.isArray(map.sourcesContent) ||
    map.sources.length !== map.sourcesContent.length
  ) {
    throw new SourceDynamicCodeError("SOURCE_MAP_INVALID", "source map sourcesContent is incomplete", {
      relativePath: file.relativePath
    });
  }
  const sourceRoot = map.sourceRoot ?? "";
  if (
    typeof sourceRoot !== "string" ||
    path.isAbsolute(sourceRoot) ||
    /^[a-zA-Z][a-zA-Z+.-]*:/.test(sourceRoot)
  ) {
    throw new SourceDynamicCodeError("SOURCE_MAP_ESCAPE", "source map sourceRoot escapes package ownership", {
      relativePath: file.relativePath
    });
  }
  const records = [];
  for (let index = 0; index < map.sources.length; index += 1) {
    const sourcePath = map.sources[index];
    const sourceContent = map.sourcesContent[index];
    if (typeof sourcePath !== "string" || typeof sourceContent !== "string") {
      throw new SourceDynamicCodeError("SOURCE_MAP_INVALID", "source map source is malformed", {
        relativePath: file.relativePath,
        sourceIndex: index
      });
    }
    const virtualWebpackSource = sourcePath.startsWith("webpack://");
    if (/^[a-zA-Z][a-zA-Z+.-]*:/.test(sourcePath) && !virtualWebpackSource) {
      throw new SourceDynamicCodeError("SOURCE_MAP_ESCAPE", "source map uses an external source URI", {
        relativePath: file.relativePath,
        sourceIndex: index
      });
    }
    if (virtualWebpackSource && !sourcePath.startsWith("webpack:///./")) {
      continue;
    }
    const relativePath = virtualWebpackSource
      ? safeRelative(
          packageRoot,
          path.resolve(packageRoot, sourcePath.slice("webpack:///./".length)),
          "SOURCE_MAP_ESCAPE"
        )
      : safeRelative(
          packageRoot,
          path.resolve(
            packageRoot,
            path.dirname(file.relativePath),
            sourceRoot,
            sourcePath
          ),
          "SOURCE_MAP_ESCAPE"
        );
    const content = Buffer.from(sourceContent);
    const contentSha256 = sha256(content);
    const existing = existingRecords.get(contentSha256);
    if (existing !== undefined) {
      existing.representations.push({
        type: "sourcemap",
        mapPath: file.relativePath,
        sourcePath: relativePath
      });
      continue;
    }
    const record = {
      relativePath,
      content: sourceContent,
      fileSha256: contentSha256,
      representation: "sourcemap",
      representations: [{
        type: "sourcemap",
        mapPath: file.relativePath,
        sourcePath: relativePath
      }],
      sourceMapGeneratedPath: file.relativePath.replace(/\.map$/, "")
    };
    existingRecords.set(contentSha256, record);
    records.push(record);
  }
  return records;
}

function createSourceRecords(inventory, packageRoot, entrypoints) {
  let declarationFiles = 0;
  const records = [];
  const existingRecords = new Map();
  const classifications = [];
  const exactEntrypoints = new Set(entrypoints.filter((entrypoint) => !entrypoint.includes("*")));
  for (const file of inventory.files) {
    if (file.relativePath.endsWith(".node")) {
      throw new SourceDynamicCodeError(
        "OPAQUE_NATIVE_ADDON",
        "native addon cannot be analyzed as distributed source",
        { relativePath: file.relativePath }
      );
    }
    if (file.relativePath.endsWith(".wasm")) {
      throw new SourceDynamicCodeError(
        "OPAQUE_WASM_MODULE",
        "WASM module cannot be analyzed as distributed source",
        { relativePath: file.relativePath }
      );
    }
    if (isDeclarationFile(file.relativePath)) {
      declarationFiles += 1;
      classifications.push({ relativePath: file.relativePath, classification: "declaration" });
      continue;
    }
    const extension = path.extname(file.relativePath).toLowerCase();
    if (file.relativePath.endsWith(".map")) {
      classifications.push({ relativePath: file.relativePath, classification: "source-map" });
      continue;
    }
    const basename = path.posix.basename(file.relativePath).toLowerCase();
    const documentedName = /^(?:changelog|changes|contributing|history|licen[cs]e|notice|readme)(?:\..*)?$/.test(
      basename
    );
    if (documentedName || documentationExtensions.has(extension)) {
      classifications.push({ relativePath: file.relativePath, classification: "documentation" });
      continue;
    }
    if (dataExtensions.has(extension)) {
      classifications.push({ relativePath: file.relativePath, classification: "data" });
      continue;
    }
    if (knownBinaryExtensions.has(extension)) {
      classifications.push({ relativePath: file.relativePath, classification: "known-binary" });
      continue;
    }
    if (
      basename === "dockerfile" ||
      /^\.(?:editorconfig|eslintignore|eslintrc.*|gitattributes|gitignore|npmignore|prettierignore)$/.test(
        basename
      ) || /^\.[a-z0-9_-]+rc(?:\..*)?$/.test(basename)
    ) {
      classifications.push({ relativePath: file.relativePath, classification: "configuration" });
      continue;
    }
    if (file.content.length === 0) {
      classifications.push({ relativePath: file.relativePath, classification: "data" });
      continue;
    }
    let text = null;
    if (executableExtensions.has(extension) || extension === "" || exactEntrypoints.has(file.relativePath)) {
      text = decodeSource(file.content, file.relativePath);
    }
    const nodeShebang = text !== null && /^#![^\r\n]*\bnode(?:\.exe)?\b/.test(text);
    const extensionlessEntrypoint = extension === "" && exactEntrypoints.has(file.relativePath);
    if (
      !executableExtensions.has(extension) &&
      !nodeShebang &&
      !exactEntrypoints.has(file.relativePath)
    ) {
      throw new SourceDynamicCodeError(
        "SOURCE_FILE_TYPE_UNCLASSIFIED",
        "distributed file type cannot be classified safely",
        { relativePath: file.relativePath }
      );
    }
    if (!executableExtensions.has(extension) && !nodeShebang && !extensionlessEntrypoint) {
      throw new SourceDynamicCodeError(
        "SOURCE_EXECUTABLE_TYPE_UNSUPPORTED",
        "manifest entrypoint uses an unsupported executable type",
        { relativePath: file.relativePath }
      );
    }
    classifications.push({ relativePath: file.relativePath, classification: "analyzed" });
    const representation =
      file.relativePath.includes(".min.") || (!text.includes("\n") && text.length > 500)
        ? "bundle"
        : "source";
    const record = {
      relativePath: file.relativePath,
      content: text,
      fileSha256: file.sha256,
      representation,
      representations: [{ type: representation, path: file.relativePath }],
      sourceMapGeneratedPath: null
    };
    records.push(record);
    existingRecords.set(file.sha256, record);
  }
  for (const file of inventory.files.filter(({ relativePath }) => relativePath.endsWith(".map"))) {
    records.push(...sourceMapRecords(file, packageRoot, existingRecords));
  }
  records.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
  classifications.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
  return { records, declarationFiles, classifications };
}

function resolveModulePath(fromPath, specifier, recordPaths) {
  if (!specifier.startsWith(".")) {
    return null;
  }
  const base = path.posix.normalize(path.posix.join(path.posix.dirname(fromPath), specifier));
  const sourceSubstitutions = specifier.endsWith(".js")
    ? [base.slice(0, -3) + ".ts", base.slice(0, -3) + ".tsx"]
    : specifier.endsWith(".mjs")
      ? [base.slice(0, -4) + ".mts"]
      : specifier.endsWith(".cjs")
        ? [base.slice(0, -4) + ".cts"]
        : [];
  for (const candidate of [
    base,
    ...sourceSubstitutions,
    ...[...executableExtensions].map((extension) => `${base}${extension}`),
    ...[...executableExtensions].map((extension) =>
      `${base}/index${extension}`
    )
  ]) {
    const normalized = path.posix.normalize(candidate);
    if (recordPaths.has(normalized)) {
      return normalized;
    }
  }
  return null;
}

function staticModuleSpecifiers(sourceFile) {
  const specifiers = [];
  function visit(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      !(ts.isImportDeclaration(node)
        ? node.importClause?.isTypeOnly === true
        : node.isTypeOnly === true) &&
      node.moduleSpecifier !== undefined &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "require" &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      specifiers.push(node.arguments[0].text);
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      specifiers.push(node.arguments[0].text);
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return specifiers;
}

function parseRecords(records) {
  return records.map((record) => {
    const sourceFile = ts.createSourceFile(
      record.relativePath,
      record.content,
      ts.ScriptTarget.Latest,
      true,
      scriptKind(record.relativePath)
    );
    const diagnostics = sourceFile.parseDiagnostics ?? [];
    if (diagnostics.length > 0) {
      const diagnostic = diagnostics[0];
      const location = sourceFile.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
      throw new SourceDynamicCodeError("SOURCE_PARSE_ERROR", "distributed source failed to parse", {
        relativePath: record.relativePath,
        line: location.line + 1,
        column: location.character + 1,
        diagnosticCode: diagnostic.code
      });
    }
    return { ...record, sourceFile };
  });
}

function reachabilityFor(records, entrypoints) {
  const recordPaths = new Set(records.map(({ relativePath }) => relativePath));
  const graph = new Map();
  for (const record of records) {
    graph.set(
      record.relativePath,
      staticModuleSpecifiers(record.sourceFile)
        .map((specifier) => resolveModulePath(record.relativePath, specifier, recordPaths))
        .filter((value) => value !== null)
    );
  }
  const roots = new Set();
  for (const entrypoint of entrypoints) {
    if (entrypoint.includes("*")) {
      const pattern = new RegExp(`^${entrypoint
        .split("*")
        .map((segment) => segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join(".*")}$`);
      for (const recordPath of recordPaths) {
        if (pattern.test(recordPath)) {
          roots.add(recordPath);
        }
      }
      if (![...recordPaths].some((recordPath) => pattern.test(recordPath))) {
        throw new SourceDynamicCodeError(
          "SOURCE_ENTRYPOINT_MISSING",
          "manifest entrypoint pattern does not resolve to analyzed source",
          { entrypoint }
        );
      }
      continue;
    }
    const resolved = resolveModulePath("root.js", `./${entrypoint}`, recordPaths) ??
      (recordPaths.has(entrypoint) ? entrypoint : null);
    if (resolved !== null) {
      roots.add(resolved);
    } else {
      throw new SourceDynamicCodeError(
        "SOURCE_ENTRYPOINT_MISSING",
        "manifest entrypoint does not resolve to analyzed source",
        { entrypoint }
      );
    }
  }
  const traceByPath = new Map();
  const queue = [...roots].map((root) => ({ current: root, trace: [root] }));
  while (queue.length > 0) {
    const { current, trace } = queue.shift();
    if (traceByPath.has(current)) {
      continue;
    }
    traceByPath.set(current, trace);
    for (const dependency of graph.get(current) ?? []) {
      queue.push({ current: dependency, trace: [...trace, dependency].slice(-7) });
    }
  }
  for (const record of records) {
    if (
      record.representation === "sourcemap" &&
      record.sourceMapGeneratedPath !== null &&
      traceByPath.has(record.sourceMapGeneratedPath)
    ) {
      traceByPath.set(
        record.relativePath,
        [...traceByPath.get(record.sourceMapGeneratedPath), record.relativePath].slice(-7)
      );
    }
  }
  return traceByPath;
}

const unknownValue = Object.freeze({ kind: "unknown" });

function value(kind, fields = {}) {
  return Object.freeze({ kind, ...fields });
}

function tracedValue(assigned, step) {
  if (assigned.kind === "unknown" || assigned.kind === "pending") {
    return assigned;
  }
  const trace = [...(assigned.trace ?? []), step]
    .filter((entry, index, all) => index === 0 || entry !== all[index - 1])
    .slice(-6);
  if (assigned.kind === "object") {
    return value("object", {
      ...assigned,
      trace,
      properties: new Map([...assigned.properties].map(([name, propertyValue]) =>
        [name, tracedValue(propertyValue, step)]))
    });
  }
  return value(assigned.kind, { ...assigned, trace });
}

function valueSignature(assigned, seen = new Set()) {
  if (seen.has(assigned)) {
    return "cycle";
  }
  seen.add(assigned);
  if (assigned.kind === "object") {
    return `object:${[...assigned.properties]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([name, propertyValue]) => `${name}=${valueSignature(propertyValue, seen)}`)
      .join(",")}`;
  }
  if (assigned.kind === "callable") {
    return `callable:${assigned.mechanism ?? ""}:${assigned.effects
      .map(({ mechanism, binding }) => `${mechanism}:${binding}`)
      .sort()
      .join(",")}:${valueSignature(assigned.returnValue, seen)}`;
  }
  return [
    assigned.kind,
    assigned.mechanism ?? "",
    assigned.namespace ?? "",
    assigned.method ?? "",
    assigned.binding ?? "",
    assigned.value ?? "",
    assigned.reason ?? ""
  ].join(":");
}

function exportedMapSignature(exportsMap) {
  return [...exportsMap]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, assigned]) => `${name}=${valueSignature(assigned)}`)
    .join("|");
}

function builtinModuleExports(specifier) {
  const exportsMap = new Map();
  if (["vm", "node:vm"].includes(specifier)) {
    exportsMap.set("default", value("namespace", { namespace: "vm" }));
    for (const method of vmMethods) {
      exportsMap.set(method, value("sink", {
        mechanism: "node:vm",
        binding: `node:vm.${method}`
      }));
    }
    return exportsMap;
  }
  if (["child_process", "node:child_process"].includes(specifier)) {
    exportsMap.set("default", value("namespace", { namespace: "child-process" }));
    for (const method of childMethods) {
      exportsMap.set(method, value("child-method", {
        method,
        binding: `node:child_process.${method}`
      }));
    }
    return exportsMap;
  }
  if (["worker_threads", "node:worker_threads"].includes(specifier)) {
    exportsMap.set("default", value("namespace", { namespace: "worker-threads" }));
    exportsMap.set("Worker", value("worker", {
      binding: "node:worker_threads.Worker"
    }));
  }
  return exportsMap;
}

function builtinValue(name) {
  if (name === "eval") {
    return value("sink", { mechanism: "eval", binding: "global eval" });
  }
  if (name === "Function") {
    return value("sink", { mechanism: "function", binding: "global Function" });
  }
  if (["global", "globalThis", "window", "self"].includes(name)) {
    return value("namespace", { namespace: "global" });
  }
  if (name === "WebAssembly") {
    return value("namespace", { namespace: "webassembly" });
  }
  if (name === "Worker") {
    return value("worker", { binding: "global Worker" });
  }
  if (name === "Blob") {
    return value("blob-constructor");
  }
  if (name === "URL") {
    return value("namespace", { namespace: "url" });
  }
  if (name === "Object") {
    return value("namespace", { namespace: "object" });
  }
  if (name === "process") {
    return value("namespace", { namespace: "process" });
  }
  if (name === "require") {
    return value("require");
  }
  if (name === "module") {
    return value("namespace", { namespace: "cjs-module" });
  }
  if (name === "exports") {
    return value("namespace", { namespace: "cjs-exports" });
  }
  return unknownValue;
}

function propertyName(node, evaluate) {
  if (node === undefined) {
    return null;
  }
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }
  if (ts.isComputedPropertyName(node)) {
    const computed = evaluate(node.expression);
    return computed.kind === "constant" ? String(computed.value) : null;
  }
  return null;
}

function functionMechanism(node) {
  if (!ts.isFunctionExpression(node) && !ts.isArrowFunction(node)) {
    return null;
  }
  const asyncFunction = node.modifiers?.some(({ kind }) => kind === ts.SyntaxKind.AsyncKeyword) ?? false;
  const generator = node.asteriskToken !== undefined;
  if (asyncFunction && generator) {
    return "async-generator-function";
  }
  if (asyncFunction) {
    return "async-function";
  }
  return generator ? "generator-function" : "function";
}

function directDeclaredNames(node, includeFunctionScopedVars = false) {
  const names = new Set();
  const addBinding = (binding) => {
    if (ts.isIdentifier(binding)) {
      names.add(binding.text);
      return;
    }
    for (const element of binding.elements ?? []) {
      if (!ts.isOmittedExpression(element)) {
        addBinding(element.name);
      }
    }
  };
  for (const parameter of node.parameters ?? []) {
    addBinding(parameter.name);
  }
  if (
    (ts.isForStatement(node) && node.initializer !== undefined &&
      ts.isVariableDeclarationList(node.initializer)) ||
    ((ts.isForInStatement(node) || ts.isForOfStatement(node)) &&
      ts.isVariableDeclarationList(node.initializer))
  ) {
    const declarationList = node.initializer;
    if ((declarationList.flags & ts.NodeFlags.BlockScoped) !== 0) {
      for (const declaration of declarationList.declarations) {
        addBinding(declaration.name);
      }
    }
  }
  const statements = ts.isSourceFile(node) || ts.isBlock(node)
    ? node.statements
    : ts.isCaseBlock(node)
      ? node.clauses.flatMap((clause) => [...clause.statements])
      : [];
  for (const statement of statements) {
    if (ts.isVariableStatement(statement)) {
      if (
        ts.isSourceFile(node) ||
        (statement.declarationList.flags & ts.NodeFlags.BlockScoped) !== 0
      ) {
        for (const declaration of statement.declarationList.declarations) {
          addBinding(declaration.name);
        }
      }
    } else if (
      (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) &&
      statement.name !== undefined
    ) {
      names.add(statement.name.text);
    } else if (ts.isImportDeclaration(statement) && statement.importClause !== undefined) {
      if (statement.importClause.name !== undefined) {
        names.add(statement.importClause.name.text);
      }
      const bindings = statement.importClause.namedBindings;
      if (bindings !== undefined) {
        if (ts.isNamespaceImport(bindings)) {
          names.add(bindings.name.text);
        } else {
          for (const element of bindings.elements) {
            names.add(element.name.text);
          }
        }
      }
    }
  }
  function collectFunctionScopedVar(current) {
    if (
      current !== node &&
      (ts.isFunctionDeclaration(current) ||
        ts.isFunctionExpression(current) ||
        ts.isArrowFunction(current) ||
        ts.isMethodDeclaration(current))
    ) {
      return;
    }
    if (
      ts.isVariableDeclarationList(current) &&
      (current.flags & ts.NodeFlags.BlockScoped) === 0
    ) {
      for (const declaration of current.declarations) {
        addBinding(declaration.name);
      }
    }
    ts.forEachChild(current, collectFunctionScopedVar);
  }
  if (includeFunctionScopedVars) {
    collectFunctionScopedVar(node);
  }
  return names;
}

function moduleResolutionFor(records, ownedPaths = new Set()) {
  const recordsByPath = new Map(records.map((record) => [record.relativePath, record]));
  const graphRecords = records.filter(({ representation }) => representation !== "sourcemap");
  const recordPaths = new Set(graphRecords.map(({ relativePath }) => relativePath));
  const resolvedByReference = new Map();

  for (const record of graphRecords) {
    function visit(node) {
      let specifier = null;
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        !(ts.isImportDeclaration(node)
          ? node.importClause?.isTypeOnly === true
          : node.isTypeOnly === true) &&
        node.moduleSpecifier !== undefined &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        specifier = node.moduleSpecifier.text;
      } else if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "require" &&
        node.arguments.length === 1 &&
        ts.isStringLiteral(node.arguments[0])
      ) {
        specifier = node.arguments[0].text;
      } else if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        node.arguments.length === 1 &&
        ts.isStringLiteral(node.arguments[0])
      ) {
        specifier = node.arguments[0].text;
      }
      if (specifier !== null && (specifier.startsWith(".") || path.posix.isAbsolute(specifier))) {
        const sourceTarget = resolveModulePath(record.relativePath, specifier, recordPaths);
        const exactTarget = path.posix.normalize(path.posix.join(
          path.posix.dirname(record.relativePath),
          specifier
        ));
        const declaredDataTarget =
          !exactTarget.startsWith("../") &&
          dataExtensions.has(path.posix.extname(exactTarget).toLowerCase());
        const resolved = sourceTarget ?? (
          ownedPaths.has(exactTarget) || declaredDataTarget ? exactTarget : null
        );
        if (resolved === null) {
          ts.forEachChild(node, visit);
          return;
        }
        resolvedByReference.set(`${record.relativePath}\0${specifier}`, Object.freeze({
          target: resolved,
          source: sourceTarget !== null
        }));
      }
      ts.forEachChild(node, visit);
    }
    visit(record.sourceFile);
  }

  return {
    target(fromPath, specifier) {
      return resolvedByReference.get(`${fromPath}\0${specifier}`)?.target ?? null;
    },
    context(record, exportsByPath, strict) {
      const graphEnabled = record.representation !== "sourcemap";
      function exportsFor(specifier) {
        const builtin = builtinModuleExports(specifier);
        if (builtin.size > 0) {
          return { target: specifier, exportsMap: builtin };
        }
        let resolution = resolvedByReference.get(`${record.relativePath}\0${specifier}`);
        if (resolution === undefined && specifier.startsWith(".")) {
          const sourceTarget = resolveModulePath(record.relativePath, specifier, recordPaths);
          const exactTarget = path.posix.normalize(path.posix.join(
            path.posix.dirname(record.relativePath),
            specifier
          ));
          if (sourceTarget !== null) {
            resolution = { target: sourceTarget, source: true };
          } else if (
            ownedPaths.has(exactTarget) ||
            dataExtensions.has(path.posix.extname(exactTarget).toLowerCase())
          ) {
            resolution = { target: exactTarget, source: false };
          }
        }
        if (resolution === undefined || !graphEnabled) {
          return { target: specifier, exportsMap: new Map() };
        }
        if (!resolution.source) {
          return {
            target: resolution.target,
            exportsMap: new Map([
              ["default", value("data")],
              ["module.exports", value("data")]
            ])
          };
        }
        return {
          target: resolution.target,
          exportsMap: exportsByPath.get(resolution.target) ?? new Map()
        };
      }

      function pending(reason) {
        return value("pending", { reason });
      }

      function importValue(specifier, importedName) {
        const { target, exportsMap } = exportsFor(specifier);
        const commonJsExports = exportsMap.get("module.exports");
        const assigned = exportsMap.get(importedName) ??
          (commonJsExports?.kind === "object"
            ? commonJsExports.properties.get(importedName)
            : null) ??
          (importedName === "default" ? exportsMap.get("module.exports") : null) ??
          (exportsMap.get("default")?.kind === "data" ? exportsMap.get("default") : null);
        return assigned === null || assigned === undefined
          ? pending(`export ${JSON.stringify(importedName)} from ${JSON.stringify(specifier)}`)
          : tracedValue(
              assigned,
              `${record.relativePath} imports ${importedName} from ${target}`
            );
      }

      function namespaceValue(specifier) {
        const { target, exportsMap } = exportsFor(specifier);
        const properties = new Map([...exportsMap]
          .filter(([name]) => name !== "module.exports")
          .map(([name, assigned]) => [
            name,
            tracedValue(assigned, `${record.relativePath} imports * from ${target}`)
          ]));
        return value("object", {
          properties,
          unresolvedReason: `namespace export from ${JSON.stringify(specifier)}`
        });
      }

      function requireValue(specifier) {
        const { target, exportsMap } = exportsFor(specifier);
        const assigned = exportsMap.get("module.exports");
        return assigned === undefined
          ? namespaceValue(specifier)
          : tracedValue(assigned, `${record.relativePath} requires ${target}`);
      }

      return Object.freeze({
        strict: strict && graphEnabled,
        importValue,
        namespaceValue,
        requireValue,
        unresolvedRelativeSpecifier(specifier) {
          if (!specifier.startsWith(".")) {
            return null;
          }
          if (resolvedByReference.has(`${record.relativePath}\0${specifier}`)) {
            return null;
          }
          const sourceTarget = resolveModulePath(record.relativePath, specifier, recordPaths);
          const exactTarget = path.posix.normalize(path.posix.join(
            path.posix.dirname(record.relativePath),
            specifier
          ));
          return sourceTarget !== null || ownedPaths.has(exactTarget) ||
            dataExtensions.has(path.posix.extname(exactTarget).toLowerCase())
            ? null
            : `relative module ${JSON.stringify(specifier)}`;
        },
        exportsFor(specifier) {
          return exportsFor(specifier).exportsMap;
        }
      });
    }
  };
}

function analyzeRecord(record, owner, reachableTrace, moduleContext = null) {
  const findings = [];
  const exported = new Map();
  const sourceFile = record.sourceFile;

  function failUnresolved(node, reason) {
    const location = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    throw new SourceDynamicCodeError(
      "SOURCE_ANALYSIS_UNRESOLVED",
      "material dynamic-code analysis could not resolve an expression",
      {
        relativePath: record.relativePath,
        line: location.line + 1,
        column: location.character + 1,
        reason
      }
    );
  }

  function addFinding(
    node,
    mechanism,
    operation,
    binding,
    confidence = "high",
    authorityTrace = []
  ) {
    const location = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    const bindingTrace = [
      ...(reachableTrace ?? [record.relativePath]),
      ...authorityTrace,
      binding
    ].filter((entry, index, all) => index === 0 || entry !== all[index - 1]).slice(-8);
    findings.push(Object.freeze({
      mechanism,
      operation,
      owner: Object.freeze({
        ...owner,
        bundledAttribution: record.representation === "bundle"
          ? "unknown"
          : owner.package
      }),
      relativePath: record.relativePath,
      line: location.line + 1,
      column: location.character + 1,
      representation: record.representation,
      representations: Object.freeze(
        record.representations.map((representation) => Object.freeze({ ...representation }))
      ),
      reachableFromEntrypoint: reachableTrace !== null,
      confidence,
      fileSha256: record.fileSha256,
      bindingTrace: Object.freeze(bindingTrace)
    }));
  }

  function createEnvironment(parent = null, declarations = []) {
    const values = new Map([...declarations].map((name) => [name, unknownValue]));
    return {
      get(name) {
        if (values.has(name)) {
          return values.get(name);
        }
        return parent === null ? builtinValue(name) : parent.get(name);
      },
      set(name, assigned) {
        values.set(name, assigned);
      },
      assign(name, assigned) {
        if (values.has(name) || parent === null) {
          values.set(name, assigned);
          return;
        }
        parent.assign(name, assigned);
      }
    };
  }

  function analyzeScope(
    scopeNode,
    parentEnvironment = null,
    functionEnvironment = null,
    functionBoundary = false
  ) {
    const isFunctionBoundary = functionBoundary || ts.isSourceFile(scopeNode);
    const environment = createEnvironment(
      parentEnvironment,
      directDeclaredNames(scopeNode, isFunctionBoundary)
    );
    const effectiveFunctionEnvironment = isFunctionBoundary
      ? environment
      : functionEnvironment ?? environment;
    const returnValues = [];
    const localExports = [];
    const scopeFindingStart = findings.length;

    function collectExport(name, assigned) {
      if (typeof name === "string" && name.length > 0) {
        exported.set(name, assigned);
      }
    }

    function bindingIdentifiers(pattern, names = []) {
      if (ts.isIdentifier(pattern)) {
        names.push(pattern.text);
        return names;
      }
      for (const element of pattern.elements ?? []) {
        if (!ts.isOmittedExpression(element)) {
          bindingIdentifiers(element.name, names);
        }
      }
      return names;
    }

    function hasModifier(node, kind) {
      return node.modifiers?.some((modifier) => modifier.kind === kind) ?? false;
    }

    function cjsExportName(node) {
      if (!ts.isPropertyAccessExpression(node) && !ts.isElementAccessExpression(node)) {
        return null;
      }
      const name = ts.isPropertyAccessExpression(node)
        ? node.name.text
        : ts.isStringLiteral(node.argumentExpression)
          ? node.argumentExpression.text
          : null;
      if (name === null) {
        return null;
      }
      if (ts.isIdentifier(node.expression) && node.expression.text === "exports") {
        return name;
      }
      if (
        ts.isIdentifier(node.expression) &&
        node.expression.text === "module" &&
        name === "exports"
      ) {
        return "module.exports";
      }
      if (
        (ts.isPropertyAccessExpression(node.expression) ||
          ts.isElementAccessExpression(node.expression)) &&
        cjsExportName(node.expression) === "module.exports"
      ) {
        return name;
      }
      return null;
    }

    function isAuthorityValue(assigned, seen = new Set()) {
      if (seen.has(assigned)) {
        return false;
      }
      seen.add(assigned);
      if (["sink", "worker", "child-method"].includes(assigned.kind)) {
        return true;
      }
      if (
        assigned.kind === "namespace" &&
        ["global", "vm", "webassembly", "child-process", "worker-threads"].includes(
          assigned.namespace
        )
      ) {
        return true;
      }
      if (assigned.kind === "callable") {
        return assigned.effects.length > 0 || isAuthorityValue(assigned.returnValue, seen);
      }
      if (assigned.kind === "object") {
        return [...assigned.properties.values()].some((propertyValue) =>
          isAuthorityValue(propertyValue, seen));
      }
      return false;
    }

    function assignProperty(node, assigned) {
      if (!ts.isPropertyAccessExpression(node) && !ts.isElementAccessExpression(node)) {
        return false;
      }
      const base = evaluate(node.expression);
      let name = null;
      if (ts.isPropertyAccessExpression(node)) {
        name = node.name.text;
      } else {
        const argument = evaluate(node.argumentExpression);
        if (argument.kind === "constant") {
          name = String(argument.value);
        }
      }
      if (base.kind === "object" && name !== null) {
        base.properties.set(name, assigned);
        if (assigned.kind === "sink") {
          addFinding(
            node,
            assigned.mechanism,
            "alias",
            assigned.binding,
            "high",
            assigned.trace ?? []
          );
        }
        return true;
      }
      if (
        base.kind === "namespace" &&
        base.namespace === "cjs-module" &&
        name === "exports"
      ) {
        collectExport("module.exports", assigned);
        collectExport("default", assigned);
        return true;
      }
      if (
        base.kind === "namespace" &&
        base.namespace === "cjs-exports" &&
        name !== null
      ) {
        collectExport(name, assigned);
        return true;
      }
      if (isAuthorityValue(assigned)) {
        failUnresolved(
          node,
          name === null
            ? "computed property assignment of a dynamic-code authority"
            : "property owner for a dynamic-code authority"
        );
      }
      return false;
    }

    function assignmentTarget(node) {
      if (
        ts.isParenthesizedExpression(node) ||
        ts.isAsExpression(node) ||
        ts.isTypeAssertionExpression(node) ||
        ts.isNonNullExpression(node)
      ) {
        return assignmentTarget(node.expression);
      }
      return node;
    }

    function valueWithDefault(assigned, initializer) {
      if (
        initializer !== undefined &&
        ["pending", "unknown"].includes(assigned.kind)
      ) {
        return evaluate(initializer);
      }
      return assigned;
    }

    function assignPatternTarget(pattern, assigned, origin) {
      const target = assignmentTarget(pattern);
      if (ts.isIdentifier(target)) {
        environment.assign(target.text, assigned);
        if (assigned.kind === "sink") {
          addFinding(
            origin,
            assigned.mechanism,
            "alias",
            assigned.binding,
            "high",
            assigned.trace ?? []
          );
        }
        return;
      }
      if (ts.isObjectLiteralExpression(target)) {
        if (assigned.kind !== "object") {
          if (isAuthorityValue(assigned) && moduleContext?.strict === true) {
            failUnresolved(origin, "object assignment pattern for a dynamic-code authority");
          }
          for (const property of target.properties) {
            if (ts.isShorthandPropertyAssignment(property)) {
              assignPatternTarget(property.name, unknownValue, property);
            } else if (ts.isPropertyAssignment(property)) {
              assignPatternTarget(property.initializer, unknownValue, property);
            } else if (ts.isSpreadAssignment(property)) {
              assignPatternTarget(property.expression, unknownValue, property);
            }
          }
          return;
        }
        const consumed = new Set();
        for (const property of target.properties) {
          if (ts.isSpreadAssignment(property)) {
            const properties = new Map([...assigned.properties].filter(([name]) =>
              !consumed.has(name)));
            assignPatternTarget(
              property.expression,
              value("object", { properties }),
              property
            );
            continue;
          }
          let name = null;
          let nestedTarget = null;
          let initializer;
          if (ts.isShorthandPropertyAssignment(property)) {
            name = property.name.text;
            nestedTarget = property.name;
            initializer = property.objectAssignmentInitializer;
          } else if (ts.isPropertyAssignment(property)) {
            name = propertyName(property.name, evaluate);
            nestedTarget = property.initializer;
            if (
              ts.isBinaryExpression(nestedTarget) &&
              nestedTarget.operatorToken.kind === ts.SyntaxKind.EqualsToken
            ) {
              initializer = nestedTarget.right;
              nestedTarget = nestedTarget.left;
            }
          }
          if (name === null || nestedTarget === null) {
            if (isAuthorityValue(assigned) && moduleContext?.strict === true) {
              failUnresolved(property, "computed object assignment pattern authority");
            }
            continue;
          }
          consumed.add(name);
          const propertyValue = valueWithDefault(
            namespaceProperty(assigned, name),
            initializer
          );
          if (
            propertyValue.kind === "pending" &&
            isAuthorityValue(assigned) &&
            moduleContext?.strict === true
          ) {
            failUnresolved(property, propertyValue.reason);
          }
          assignPatternTarget(nestedTarget, propertyValue, property);
        }
        return;
      }
      if (ts.isArrayLiteralExpression(target)) {
        if (assigned.kind !== "array") {
          if (isAuthorityValue(assigned) && moduleContext?.strict === true) {
            failUnresolved(origin, "array assignment pattern for a dynamic-code authority");
          }
          for (const element of target.elements) {
            if (!ts.isOmittedExpression(element)) {
              assignPatternTarget(
                ts.isSpreadElement(element) ? element.expression : element,
                unknownValue,
                element
              );
            }
          }
          return;
        }
        for (let index = 0; index < target.elements.length; index += 1) {
          const element = target.elements[index];
          if (ts.isOmittedExpression(element)) {
            continue;
          }
          if (ts.isSpreadElement(element)) {
            assignPatternTarget(
              element.expression,
              value("array", { values: assigned.values.slice(index) }),
              element
            );
            break;
          }
          let nestedTarget = element;
          let initializer;
          if (
            ts.isBinaryExpression(element) &&
            element.operatorToken.kind === ts.SyntaxKind.EqualsToken
          ) {
            nestedTarget = element.left;
            initializer = element.right;
          }
          assignPatternTarget(
            nestedTarget,
            valueWithDefault(assigned.values[index] ?? unknownValue, initializer),
            element
          );
        }
        return;
      }
      if (isAuthorityValue(assigned) && moduleContext?.strict === true) {
        failUnresolved(origin, "unsupported assignment pattern for a dynamic-code authority");
      }
      assignProperty(target, assigned);
    }

    function evaluate(node) {
      if (node === undefined) {
        return unknownValue;
      }
      if (
        ts.isParenthesizedExpression(node) ||
        ts.isAsExpression(node) ||
        ts.isTypeAssertionExpression(node) ||
        ts.isNonNullExpression(node) ||
        ts.isSatisfiesExpression(node) ||
        ts.isAwaitExpression(node) ||
        ts.isYieldExpression(node) ||
        ts.isPartiallyEmittedExpression(node) ||
        ts.isSpreadElement(node)
      ) {
        return evaluate(node.expression);
      }
      if (
        ts.isTypeOfExpression(node) ||
        ts.isVoidExpression(node) ||
        ts.isDeleteExpression(node)
      ) {
        evaluate(node.expression);
        return unknownValue;
      }
      if (ts.isIdentifier(node)) {
        return environment.get(node.text);
      }
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        return value("constant", { value: node.text });
      }
      if (node.kind === ts.SyntaxKind.TrueKeyword || node.kind === ts.SyntaxKind.FalseKeyword) {
        return value("constant", { value: node.kind === ts.SyntaxKind.TrueKeyword });
      }
      if (ts.isNumericLiteral(node)) {
        return value("constant", { value: Number(node.text) });
      }
      if (ts.isTemplateExpression(node)) {
        let output = node.head.text;
        for (const span of node.templateSpans) {
          const expression = evaluate(span.expression);
          if (expression.kind !== "constant") {
            return unknownValue;
          }
          output += String(expression.value) + span.literal.text;
        }
        return value("constant", { value: output });
      }
      if (ts.isArrayLiteralExpression(node)) {
        const values = node.elements.map(evaluate);
        for (let index = 0; index < values.length; index += 1) {
          if (values[index].kind === "sink") {
            addFinding(
              node.elements[index],
              values[index].mechanism,
              "alias",
              values[index].binding
            );
          }
        }
        return values.some(({ kind }) => kind === "unknown")
          ? unknownValue
          : value("array", { values });
      }
      if (ts.isObjectLiteralExpression(node)) {
        const properties = new Map();
        for (const property of node.properties) {
          if (ts.isPropertyAssignment(property)) {
            const name = propertyName(property.name, evaluate);
            if (name === null) {
              return unknownValue;
            }
            const propertyValue = evaluate(property.initializer);
            properties.set(name, propertyValue);
            if (propertyValue.kind === "sink") {
              addFinding(
                property.initializer,
                propertyValue.mechanism,
                "alias",
                propertyValue.binding
              );
            }
          } else if (ts.isMethodDeclaration(property)) {
            const name = propertyName(property.name, evaluate);
            if (name === null) {
              return unknownValue;
            }
            if (property.body !== undefined) {
              properties.set(name, summarizeFunction(property, environment));
            }
          } else if (ts.isShorthandPropertyAssignment(property)) {
            properties.set(property.name.text, environment.get(property.name.text));
          } else {
            return unknownValue;
          }
        }
        return value("object", { properties });
      }
      if (ts.isBinaryExpression(node)) {
        if (node.operatorToken.kind === ts.SyntaxKind.CommaToken) {
          evaluate(node.left);
          return evaluate(node.right);
        }
        if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
          const left = evaluate(node.left);
          const right = evaluate(node.right);
          return left.kind === "constant" && right.kind === "constant"
            ? value("constant", { value: String(left.value) + String(right.value) })
            : unknownValue;
        }
        if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
          const assigned = evaluate(node.right);
          const destructuringTarget = assignmentTarget(node.left);
          if (
            ts.isObjectLiteralExpression(destructuringTarget) ||
            ts.isArrayLiteralExpression(destructuringTarget)
          ) {
            bindPattern(destructuringTarget, assigned, node, environment, true);
            return assigned;
          }
          const exportedName = cjsExportName(node.left);
          if (exportedName !== null) {
            collectExport(exportedName, assigned);
            if (exportedName === "module.exports") {
              collectExport("default", assigned);
            }
          } else if (ts.isIdentifier(node.left)) {
            environment.assign(node.left.text, assigned);
            if (assigned.kind === "sink") {
              addFinding(node, assigned.mechanism, "alias", assigned.binding);
            }
          } else {
            assignProperty(node.left, assigned);
          }
          return assigned;
        }
        const left = evaluate(node.left);
        const right = evaluate(node.right);
        if (
          [
            ts.SyntaxKind.AmpersandAmpersandToken,
            ts.SyntaxKind.BarBarToken,
            ts.SyntaxKind.QuestionQuestionToken
          ].includes(node.operatorToken.kind)
        ) {
          return left.kind === "sink" ? left : right.kind === "sink" ? right : unknownValue;
        }
        return unknownValue;
      }
      if (ts.isConditionalExpression(node)) {
        evaluate(node.condition);
        const whenTrue = evaluate(node.whenTrue);
        const whenFalse = evaluate(node.whenFalse);
        for (const [branch, branchValue] of [
          [node.whenTrue, whenTrue],
          [node.whenFalse, whenFalse]
        ]) {
          if (branchValue.kind === "sink") {
            addFinding(branch, branchValue.mechanism, "reference", branchValue.binding);
          }
        }
        return whenTrue.kind === whenFalse.kind && whenTrue.mechanism === whenFalse.mechanism
          ? whenTrue
          : unknownValue;
      }
      if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
        return summarizeFunction(node, environment);
      }
      if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
        const base = evaluate(node.expression);
        let name;
        if (ts.isPropertyAccessExpression(node)) {
          name = node.name.text;
        } else {
          const argument = evaluate(node.argumentExpression);
          if (argument.kind !== "constant") {
            if (
              base.kind === "namespace" &&
              ["global", "vm", "webassembly", "child-process", "worker-threads"].includes(
                base.namespace
              )
            ) {
              failUnresolved(node, "computed property on a dynamic-code authority");
            }
            return unknownValue;
          }
          name = String(argument.value);
        }
        if (base.kind === "namespace" && base.namespace === "global") {
          return builtinValue(name);
        }
        if (base.kind === "namespace" && base.namespace === "cjs-module" && name === "exports") {
          return exported.get("module.exports") ?? value("object", {
            properties: new Map([...exported].filter(([exportedName]) =>
              !["default", "module.exports"].includes(exportedName)))
          });
        }
        if (base.kind === "namespace" && base.namespace === "cjs-exports") {
          return exported.get(name) ?? unknownValue;
        }
        if (base.kind === "pending") {
          return base;
        }
        if (base.kind === "array" && /^\d+$/.test(name)) {
          return base.values[Number(name)] ?? unknownValue;
        }
        if (base.kind === "object") {
          const propertyValue = base.properties.get(name);
          if (propertyValue !== undefined) {
            return propertyValue;
          }
          if (base.unresolvedReason !== undefined) {
            return value("pending", { reason: `${base.unresolvedReason}.${name}` });
          }
        }
        if (
          base.kind === "namespace" &&
          base.namespace === "object" &&
          name === "getPrototypeOf"
        ) {
          return value("object-get-prototype");
        }
        if (
          base.kind === "namespace" &&
          base.namespace === "object" &&
          name === "defineProperty"
        ) {
          return value("object-define-property");
        }
        if (base.kind === "namespace" && base.namespace === "vm" && vmMethods.has(name)) {
          return value("sink", { mechanism: "node:vm", binding: `node:vm.${name}` });
        }
        if (
          base.kind === "namespace" &&
          base.namespace === "webassembly" &&
          webAssemblyMethods.has(name)
        ) {
          return value("sink", {
            mechanism: "webassembly",
            binding: `WebAssembly.${name}`
          });
        }
        if (
          base.kind === "namespace" &&
          base.namespace === "child-process" &&
          childMethods.has(name)
        ) {
          return value("child-method", { method: name, binding: `node:child_process.${name}` });
        }
        if (
          base.kind === "namespace" &&
          base.namespace === "worker-threads" &&
          name === "Worker"
        ) {
          return value("worker", { binding: "node:worker_threads.Worker" });
        }
        if (base.kind === "namespace" && base.namespace === "process" && name === "execPath") {
          return value("constant", { value: process.execPath });
        }
        if (base.kind === "namespace" && base.namespace === "url" && name === "createObjectURL") {
          return value("url-create-object");
        }
        if (
          ["callable", "function-instance", "function-prototype"].includes(base.kind) &&
          name === "constructor"
        ) {
          return value("sink", {
            mechanism: base.mechanism,
            binding: `${base.mechanism} constructor`
          });
        }
        if (base.kind === "sink" && ["call", "apply", "bind"].includes(name)) {
          return value("sink", {
            mechanism: base.mechanism,
            binding: `${base.binding}.${name}`
          });
        }
        return unknownValue;
      }
      if (ts.isCallExpression(node)) {
        if (node.expression.kind === ts.SyntaxKind.ImportKeyword) {
          const specifier = evaluate(node.arguments[0]);
          if (specifier.kind !== "constant") {
            failUnresolved(node, "dynamic import specifier");
          }
          for (const argument of node.arguments.slice(1)) {
            const argumentValue = evaluate(argument);
            if (argumentValue.kind === "sink") {
              addFinding(
                argument,
                argumentValue.mechanism,
                "pass",
                argumentValue.binding,
                "high",
                argumentValue.trace ?? []
              );
            }
          }
          if (String(specifier.value).startsWith("data:")) {
            addFinding(node, "data-import", "load", "import(data:)");
            return unknownValue;
          }
          const resolvedSpecifier = String(specifier.value);
          const unresolved = moduleContext?.unresolvedRelativeSpecifier(
            resolvedSpecifier
          );
          if (unresolved !== null && unresolved !== undefined && moduleContext?.strict === true) {
            failUnresolved(node, unresolved);
          }
          if (
            resolvedSpecifier.startsWith(".") ||
            builtinModuleExports(resolvedSpecifier).size > 0
          ) {
            return moduleContext?.namespaceValue(resolvedSpecifier) ?? unknownValue;
          }
          return unknownValue;
        }
        const callee = evaluate(node.expression);
        if (callee.kind === "require") {
          const specifier = evaluate(node.arguments[0]);
          if (specifier.kind !== "constant") {
            failUnresolved(node, "dynamic require specifier");
          }
          if (["vm", "node:vm"].includes(specifier.value)) {
            return value("namespace", { namespace: "vm" });
          }
          if (["child_process", "node:child_process"].includes(specifier.value)) {
            return value("namespace", { namespace: "child-process" });
          }
          if (["worker_threads", "node:worker_threads"].includes(specifier.value)) {
            return value("namespace", { namespace: "worker-threads" });
          }
          if (String(specifier.value).startsWith(".")) {
            const unresolved = moduleContext?.unresolvedRelativeSpecifier(
              String(specifier.value)
            );
            if (
              unresolved !== null &&
              unresolved !== undefined &&
              moduleContext?.strict === true
            ) {
              failUnresolved(node, unresolved);
            }
            return moduleContext?.requireValue(String(specifier.value)) ?? unknownValue;
          }
          return unknownValue;
        }
        if (callee.kind === "pending") {
          if (moduleContext?.strict === true) {
            failUnresolved(node, callee.reason);
          }
          return callee;
        }
        if (callee.kind === "object-get-prototype") {
          const mechanism = functionMechanism(node.arguments[0]);
          return mechanism === null
            ? unknownValue
            : value("function-prototype", { mechanism });
        }
        if (callee.kind === "object-define-property") {
          const target = evaluate(node.arguments[0]);
          const name = evaluate(node.arguments[1]);
          const descriptor = evaluate(node.arguments[2]);
          if (
            target.kind === "namespace" &&
            target.namespace === "cjs-exports" &&
            name.kind === "constant" &&
            descriptor.kind === "object"
          ) {
            const getter = descriptor.properties.get("get");
            const assigned = getter?.kind === "callable"
              ? getter.returnValue
              : descriptor.properties.get("value") ?? unknownValue;
            collectExport(String(name.value), assigned);
          }
          return unknownValue;
        }
        if (callee.kind === "sink") {
          addFinding(
            node,
            callee.mechanism,
            "invoke",
            callee.binding,
            "high",
            callee.trace ?? []
          );
          for (const argument of node.arguments) {
            evaluate(argument);
          }
          return unknownValue;
        }
        if (callee.kind === "callable") {
          for (const effect of callee.effects) {
            addFinding(
              node,
              effect.mechanism,
              "invoke",
              effect.binding,
              "high",
              [...(callee.trace ?? []), ...(effect.trace ?? [])]
            );
          }
          for (const argument of node.arguments) {
            evaluate(argument);
          }
          const callTrace = (callee.trace ?? []).at(-1);
          return callTrace === undefined
            ? callee.returnValue
            : tracedValue(callee.returnValue, callTrace);
        }
        if (callee.kind === "child-method") {
          analyzeChildCall(node, callee);
          return unknownValue;
        }
        if (callee.kind === "url-create-object") {
          const source = evaluate(node.arguments[0]);
          return source.kind === "blob-source" ? value("data-url") : unknownValue;
        }
        for (const argument of node.arguments) {
          const argumentValue = evaluate(argument);
          if (argumentValue.kind === "sink") {
            addFinding(argument, argumentValue.mechanism, "pass", argumentValue.binding);
          }
        }
        return unknownValue;
      }
      if (ts.isNewExpression(node)) {
        const constructor = evaluate(node.expression);
        const argumentsList = node.arguments ?? [];
        if (constructor.kind === "pending") {
          if (moduleContext?.strict === true) {
            failUnresolved(node, constructor.reason);
          }
          return constructor;
        }
        if (constructor.kind === "sink") {
          addFinding(
            node,
            constructor.mechanism,
            "construct",
            constructor.binding,
            "high",
            constructor.trace ?? []
          );
          for (const argument of argumentsList) {
            evaluate(argument);
          }
          return unknownValue;
        }
        if (constructor.kind === "callable") {
          for (const effect of constructor.effects) {
            addFinding(
              node,
              effect.mechanism,
              "construct",
              effect.binding,
              "high",
              [...(constructor.trace ?? []), ...(effect.trace ?? [])]
            );
          }
          for (const argument of argumentsList) {
            evaluate(argument);
          }
          return unknownValue;
        }
        if (constructor.kind === "worker") {
          const source = evaluate(argumentsList[0]);
          const options = evaluate(argumentsList[1]);
          const evalOption = options.kind === "object"
            ? options.properties.get("eval")
            : null;
          if (options.kind === "object" && options.properties.has("eval") && evalOption.kind !== "constant") {
            failUnresolved(node, "Worker eval option");
          }
          if (argumentsList[1] !== undefined && options.kind === "unknown") {
            failUnresolved(node, "Worker options");
          }
          if (["unknown", "url-unknown"].includes(source.kind)) {
            failUnresolved(node, "Worker source");
          }
          if (
            evalOption?.value === true ||
            source.kind === "data-url" ||
            source.kind === "blob-source" ||
            (source.kind === "constant" && String(source.value).startsWith("data:"))
          ) {
            addFinding(node, "worker", "construct", constructor.binding);
          }
          return unknownValue;
        }
        if (constructor.kind === "blob-constructor") {
          const sources = evaluate(argumentsList[0]);
          return sources.kind === "array" ? value("blob-source") : unknownValue;
        }
        if (constructor.kind === "namespace" && constructor.namespace === "url") {
          const source = evaluate(argumentsList[0]);
          if (source.kind === "constant" && String(source.value).startsWith("data:")) {
            addFinding(node, "data-import", "construct", "new URL(data:)");
            return value("data-url");
          }
          return source.kind === "constant" ? source : value("url-unknown");
        }
        for (const argument of argumentsList) {
          evaluate(argument);
        }
        return unknownValue;
      }
      if (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) {
        evaluate(node.operand);
        return unknownValue;
      }
      if (
        ts.isJsxElement(node) ||
        ts.isJsxSelfClosingElement(node) ||
        ts.isJsxFragment(node) ||
        ts.isJsxExpression(node)
      ) {
        let nestedValue = unknownValue;
        function inspectJsxChild(child) {
          if (
            ts.isExpression(child) ||
            ts.isJsxElement(child) ||
            ts.isJsxSelfClosingElement(child) ||
            ts.isJsxFragment(child) ||
            ts.isJsxExpression(child)
          ) {
            const childValue = evaluate(child);
            if (childValue.kind === "sink") {
              addFinding(child, childValue.mechanism, "reference", childValue.binding);
            }
            nestedValue = childValue.kind === "sink" ? childValue : nestedValue;
            return;
          }
          ts.forEachChild(child, inspectJsxChild);
        }
        ts.forEachChild(node, inspectJsxChild);
        return nestedValue;
      }
      return unknownValue;
    }

    function analyzeChildCall(node, childMethod) {
      const evaluated = node.arguments.map(evaluate);
      if (["exec", "execSync"].includes(childMethod.method)) {
        const command = evaluated[0];
        if (command.kind !== "constant") {
          failUnresolved(node, `${childMethod.method} command`);
        }
        const classification = classifyInlineNodeShellCommand(String(command.value));
        if (classification === "ambiguous-node") {
          failUnresolved(node, `${childMethod.method} ambiguous Node inline shell command`);
        }
        if (classification === "inline-node") {
          addFinding(node, "node-inline-child", "invoke", childMethod.binding);
        }
        return;
      }
      if (childMethod.method === "fork") {
        const options = evaluated[2] ?? evaluated[1];
        if (options?.kind === "object" && options.properties.has("execArgv")) {
          const execArgv = options.properties.get("execArgv");
          if (execArgv.kind !== "array" || execArgv.values.some(({ kind }) => kind !== "constant")) {
            failUnresolved(node, "fork execArgv");
          }
          if (
            inlineNodeArgumentIndex(
              execArgv.values.map(({ value: argument }) => String(argument))
            ) !== -1
          ) {
            addFinding(node, "node-inline-child", "invoke", childMethod.binding);
          }
        }
        return;
      }
      const command = evaluated[0];
      if (command.kind !== "constant") {
        failUnresolved(node, `${childMethod.method} command`);
      }
      const commandText = String(command.value);
      const argumentsValue = evaluated[1];
      if (isShellCommand(commandText)) {
        if (
          argumentsValue.kind !== "array" ||
          argumentsValue.values.some(({ kind }) => kind !== "constant")
        ) {
          failUnresolved(node, `${childMethod.method} shell wrapper arguments`);
        }
        const classification = classifyShellWrapperArguments(
          commandText,
          argumentsValue.values.map(({ value: argument }) => String(argument))
        );
        if (classification === "ambiguous-node") {
          failUnresolved(node, `${childMethod.method} ambiguous shell wrapper`);
        }
        if (classification === "inline-node") {
          addFinding(node, "node-inline-child", "invoke", childMethod.binding);
        }
        return;
      }
      if (!isNodeCommand(commandText)) {
        return;
      }
      if (
        argumentsValue.kind !== "array" ||
        argumentsValue.values.some(({ kind }) => kind !== "constant")
      ) {
        failUnresolved(node, `${childMethod.method} Node arguments`);
      }
      if (
        inlineNodeArgumentIndex(
          argumentsValue.values.map(({ value: argument }) => String(argument))
        ) !== -1
      ) {
        addFinding(node, "node-inline-child", "invoke", childMethod.binding);
      }
    }

    function bindImport(statement) {
      const specifier = statement.moduleSpecifier.text;
      if (specifier.startsWith(".")) {
        if (statement.importClause === undefined || statement.importClause.isTypeOnly) {
          return;
        }
        if (statement.importClause.name !== undefined) {
          environment.set(
            statement.importClause.name.text,
            moduleContext?.importValue(specifier, "default") ?? unknownValue
          );
        }
        const relativeBindings = statement.importClause.namedBindings;
        if (relativeBindings === undefined) {
          return;
        }
        if (ts.isNamespaceImport(relativeBindings)) {
          environment.set(
            relativeBindings.name.text,
            moduleContext?.namespaceValue(specifier) ?? unknownValue
          );
          return;
        }
        for (const element of relativeBindings.elements) {
          if (element.isTypeOnly) {
            continue;
          }
          environment.set(
            element.name.text,
            moduleContext?.importValue(
              specifier,
              element.propertyName?.text ?? element.name.text
            ) ?? unknownValue
          );
        }
        return;
      }
      let namespace = null;
      if (["vm", "node:vm"].includes(specifier)) {
        namespace = "vm";
      } else if (["child_process", "node:child_process"].includes(specifier)) {
        namespace = "child-process";
      } else if (["worker_threads", "node:worker_threads"].includes(specifier)) {
        namespace = "worker-threads";
      }
      if (namespace === null || statement.importClause === undefined) {
        return;
      }
      if (statement.importClause.name !== undefined) {
        environment.set(statement.importClause.name.text, value("namespace", { namespace }));
      }
      const bindings = statement.importClause.namedBindings;
      if (bindings === undefined) {
        return;
      }
      if (ts.isNamespaceImport(bindings)) {
        environment.set(bindings.name.text, value("namespace", { namespace }));
        return;
      }
      for (const element of bindings.elements) {
        const imported = element.propertyName?.text ?? element.name.text;
        if (namespace === "vm" && vmMethods.has(imported)) {
          environment.set(element.name.text, value("sink", {
            mechanism: "node:vm",
            binding: `node:vm.${imported}`
          }));
        } else if (namespace === "child-process" && childMethods.has(imported)) {
          environment.set(element.name.text, value("child-method", {
            method: imported,
            binding: `node:child_process.${imported}`
          }));
        } else if (namespace === "worker-threads" && imported === "Worker") {
          environment.set(element.name.text, value("worker", {
            binding: "node:worker_threads.Worker"
          }));
        }
      }
    }

    function namespaceProperty(assigned, name) {
      if (assigned.kind === "object") {
        return assigned.properties.get(name) ?? (
          assigned.unresolvedReason === undefined
            ? unknownValue
            : value("pending", { reason: `${assigned.unresolvedReason}.${name}` })
        );
      }
      if (assigned.kind !== "namespace") {
        return unknownValue;
      }
      if (assigned.namespace === "global") {
        return builtinValue(name);
      }
      if (assigned.namespace === "vm" && vmMethods.has(name)) {
        return value("sink", {
          mechanism: "node:vm",
          binding: `node:vm.${name}`
        });
      }
      if (assigned.namespace === "child-process" && childMethods.has(name)) {
        return value("child-method", {
          method: name,
          binding: `node:child_process.${name}`
        });
      }
      if (assigned.namespace === "webassembly" && webAssemblyMethods.has(name)) {
        return value("sink", {
          mechanism: "webassembly",
          binding: `WebAssembly.${name}`
        });
      }
      if (assigned.namespace === "worker-threads" && name === "Worker") {
        return value("worker", {
          binding: "node:worker_threads.Worker"
        });
      }
      return unknownValue;
    }

    function bindPattern(
      pattern,
      assigned,
      origin,
      targetEnvironment = environment,
      assignment = false
    ) {
      if (assignment) {
        assignPatternTarget(pattern, assigned, origin);
        return;
      }
      if (ts.isIdentifier(pattern)) {
        targetEnvironment.set(pattern.text, assigned);
        if (assigned.kind === "sink") {
          addFinding(origin, assigned.mechanism, "alias", assigned.binding);
        }
        return;
      }
      if (ts.isObjectBindingPattern(pattern)) {
        for (const element of pattern.elements) {
          const name = propertyName(element.propertyName ?? element.name, evaluate);
          if (name === null) {
            if (assigned.kind === "namespace") {
              failUnresolved(element, "computed destructuring on a dynamic-code authority");
            }
            bindPattern(element.name, unknownValue, origin, targetEnvironment);
            continue;
          }
          bindPattern(
            element.name,
            namespaceProperty(assigned, name),
            origin,
            targetEnvironment
          );
        }
        return;
      }
      if (ts.isArrayBindingPattern(pattern)) {
        for (let index = 0; index < pattern.elements.length; index += 1) {
          const element = pattern.elements[index];
          if (!ts.isOmittedExpression(element)) {
            const elementValue = assigned.kind === "array"
              ? assigned.values[index] ?? unknownValue
              : unknownValue;
            bindPattern(element.name, elementValue, origin, targetEnvironment);
          }
        }
      }
    }

    function bindDeclaration(declaration) {
      const assigned = evaluate(declaration.initializer);
      const blockScoped =
        (declaration.parent.flags & ts.NodeFlags.BlockScoped) !== 0;
      bindPattern(
        declaration.name,
        assigned,
        declaration,
        blockScoped ? environment : effectiveFunctionEnvironment
      );
    }

    function summarizeFunction(node, parent) {
      const findingStart = findings.length;
      const child = createEnvironment(
        parent,
        node.parameters.flatMap(({ name }) => bindingIdentifiers(name))
      );
      const firstParameter = node.parameters[0]?.name;
      if (
        firstParameter !== undefined &&
        ts.isIdentifier(firstParameter)
      ) {
        let moduleWrapper = false;
        function inspectWrapper(current) {
          if (
            current !== node.body &&
            (ts.isFunctionDeclaration(current) ||
              ts.isFunctionExpression(current) ||
              ts.isArrowFunction(current) ||
              ts.isMethodDeclaration(current))
          ) {
            return;
          }
          if (
            ts.isPropertyAccessExpression(current) &&
            current.name.text === "exports" &&
            ts.isIdentifier(current.expression) &&
            current.expression.text === firstParameter.text
          ) {
            moduleWrapper = true;
            return;
          }
          ts.forEachChild(current, inspectWrapper);
        }
        inspectWrapper(node.body);
        if (moduleWrapper) {
          child.set(firstParameter.text, value("namespace", { namespace: "cjs-module" }));
          const secondParameter = node.parameters[1]?.name;
          if (secondParameter !== undefined && ts.isIdentifier(secondParameter)) {
            child.set(secondParameter.text, value("namespace", { namespace: "cjs-exports" }));
          }
          const thirdParameter = node.parameters[2]?.name;
          if (thirdParameter !== undefined && ts.isIdentifier(thirdParameter)) {
            child.set(thirdParameter.text, value("require"));
          }
        }
      }
      const summary = analyzeScope(node.body, child, null, true);
      const effectsByIdentity = new Map();
      for (const finding of findings.slice(findingStart)) {
        const binding = finding.bindingTrace.at(-1);
        const identity = `${finding.mechanism}\0${binding}`;
        if (!effectsByIdentity.has(identity)) {
          effectsByIdentity.set(identity, Object.freeze({
            mechanism: finding.mechanism,
            binding,
            trace: finding.bindingTrace
          }));
        }
      }
      return value("callable", {
        mechanism: functionMechanism(node),
        effects: Object.freeze([...effectsByIdentity.values()]),
        returnValue: summary.returnValue
      });
    }

    function visit(node) {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        bindImport(node);
        return;
      }
      if (ts.isExportDeclaration(node)) {
        if (node.isTypeOnly) {
          return;
        }
        if (node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
          const specifier = node.moduleSpecifier.text;
          if (node.exportClause === undefined) {
            for (const [name, assigned] of moduleContext?.exportsFor(specifier) ?? []) {
              if (
                !["default", "module.exports"].includes(name) &&
                !exported.has(name)
              ) {
                collectExport(name, tracedValue(
                  assigned,
                  `${record.relativePath} exports * from ${specifier}`
                ));
              }
            }
          } else if (ts.isNamespaceExport(node.exportClause)) {
            collectExport(
              node.exportClause.name.text,
              moduleContext?.namespaceValue(specifier) ?? unknownValue
            );
          } else {
            for (const element of node.exportClause.elements) {
              if (element.isTypeOnly) {
                continue;
              }
              collectExport(
                element.name.text,
                moduleContext?.importValue(
                  specifier,
                  element.propertyName?.text ?? element.name.text
                ) ?? unknownValue
              );
            }
          }
          return;
        }
        if (node.exportClause !== undefined && ts.isNamedExports(node.exportClause)) {
          for (const element of node.exportClause.elements) {
            if (element.isTypeOnly) {
              continue;
            }
            localExports.push({
              exportedName: element.name.text,
              localName: element.propertyName?.text ?? element.name.text
            });
          }
        }
        return;
      }
      if (ts.isVariableStatement(node)) {
        for (const declaration of node.declarationList.declarations) {
          bindDeclaration(declaration);
          if (hasModifier(node, ts.SyntaxKind.ExportKeyword)) {
            for (const name of bindingIdentifiers(declaration.name)) {
              collectExport(name, environment.get(name));
            }
          }
        }
        return;
      }
      if (ts.isVariableDeclaration(node)) {
        bindDeclaration(node);
        return;
      }
      if (ts.isClassDeclaration(node)) {
        for (const member of node.members) {
          visit(member);
        }
        const callable = value("callable", {
          mechanism: null,
          effects: Object.freeze([]),
          returnValue: unknownValue
        });
        if (node.name !== undefined) {
          environment.set(node.name.text, callable);
        }
        if (hasModifier(node, ts.SyntaxKind.ExportKeyword)) {
          if (hasModifier(node, ts.SyntaxKind.DefaultKeyword)) {
            collectExport("default", callable);
          } else if (node.name !== undefined) {
            collectExport(node.name.text, callable);
          }
        }
        return;
      }
      if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        if (node.body !== undefined) {
          const callable = summarizeFunction(node, environment);
          if (node.name !== undefined && ts.isIdentifier(node.name)) {
            environment.set(node.name.text, callable);
          }
          if (ts.isFunctionDeclaration(node) && hasModifier(node, ts.SyntaxKind.ExportKeyword)) {
            if (hasModifier(node, ts.SyntaxKind.DefaultKeyword)) {
              collectExport("default", callable);
            } else if (node.name !== undefined) {
              collectExport(node.name.text, callable);
            }
          }
        }
        return;
      }
      if (
        (ts.isForStatement(node) || ts.isForInStatement(node) || ts.isForOfStatement(node)) &&
        node !== scopeNode
      ) {
        analyzeScope(node, environment, effectiveFunctionEnvironment);
        return;
      }
      if (ts.isCatchClause(node)) {
        const catchEnvironment = createEnvironment(
          environment,
          node.variableDeclaration === undefined
            ? []
            : bindingIdentifiers(node.variableDeclaration.name)
        );
        analyzeScope(node.block, catchEnvironment, effectiveFunctionEnvironment);
        return;
      }
      if (ts.isSwitchStatement(node)) {
        evaluate(node.expression);
        analyzeScope(node.caseBlock, environment, effectiveFunctionEnvironment);
        return;
      }
      if (ts.isBlock(node) && node !== scopeNode) {
        analyzeScope(node, environment, effectiveFunctionEnvironment);
        return;
      }
      if (ts.isReturnStatement(node) || ts.isExportAssignment(node)) {
        const returned = evaluate(node.expression);
        if (ts.isReturnStatement(node)) {
          returnValues.push(returned);
        } else {
          collectExport("default", returned);
        }
        if (returned.kind === "sink") {
          addFinding(
            node,
            returned.mechanism,
            ts.isReturnStatement(node) ? "return" : "export",
            returned.binding
          );
        }
        return;
      }
      if (ts.isExpressionStatement(node)) {
        const expressionValue = evaluate(node.expression);
        if (expressionValue.kind === "sink") {
          addFinding(
            node.expression,
            expressionValue.mechanism,
            "reference",
            expressionValue.binding
          );
        }
        return;
      }
      if (ts.isCallExpression(node) || ts.isNewExpression(node) || ts.isBinaryExpression(node)) {
        evaluate(node);
        return;
      }
      ts.forEachChild(node, visit);
    }

    if (ts.isExpression(scopeNode)) {
      const expressionValue = evaluate(scopeNode);
      returnValues.push(expressionValue);
      if (expressionValue.kind === "sink") {
        addFinding(
          scopeNode,
          expressionValue.mechanism,
          "reference",
          expressionValue.binding,
          "high",
          expressionValue.trace ?? []
        );
      }
    } else if (ts.isForStatement(scopeNode)) {
      if (scopeNode.initializer !== undefined) {
        if (ts.isVariableDeclarationList(scopeNode.initializer)) {
          for (const declaration of scopeNode.initializer.declarations) {
            bindDeclaration(declaration);
          }
        } else {
          evaluate(scopeNode.initializer);
        }
      }
      evaluate(scopeNode.condition);
      evaluate(scopeNode.incrementor);
      visit(scopeNode.statement);
    } else if (ts.isForInStatement(scopeNode) || ts.isForOfStatement(scopeNode)) {
      evaluate(scopeNode.expression);
      if (ts.isVariableDeclarationList(scopeNode.initializer)) {
        for (const declaration of scopeNode.initializer.declarations) {
          bindDeclaration(declaration);
        }
      } else {
        evaluate(scopeNode.initializer);
      }
      visit(scopeNode.statement);
    } else {
      const children = ts.isSourceFile(scopeNode) || ts.isBlock(scopeNode)
        ? scopeNode.statements
        : [scopeNode];
      for (const child of children) {
        visit(child);
      }
    }
    for (const { exportedName, localName } of localExports) {
      collectExport(exportedName, environment.get(localName));
    }
    const concreteReturns = returnValues.filter(({ kind }) => kind !== "unknown");
    const firstReturn = concreteReturns[0] ?? unknownValue;
    const returnValue = concreteReturns.every((candidate) =>
      valueSignature(candidate) === valueSignature(firstReturn))
      ? firstReturn
      : unknownValue;
    return {
      returnValue,
      effects: findings.slice(scopeFindingStart)
    };
  }

  analyzeScope(sourceFile);
  return { findings, exports: exported };
}

function analyzeParsedRecords(records, owner, entrypoints, ownedPaths = new Set()) {
  const traceByPath = reachabilityFor(records, entrypoints);
  const moduleResolution = moduleResolutionFor(records, ownedPaths);
  let exportsByPath = new Map(records.map(({ relativePath }) => [relativePath, new Map()]));
  let converged = false;
  const maximumIterations = Math.max(4, records.length * 4);
  for (let iteration = 0; iteration < maximumIterations; iteration += 1) {
    const nextExportsByPath = new Map();
    for (const record of records) {
      const analysis = analyzeRecord(
        record,
        owner,
        traceByPath.get(record.relativePath) ?? null,
        moduleResolution.context(record, exportsByPath, false)
      );
      nextExportsByPath.set(record.relativePath, analysis.exports);
    }
    converged = records.every(({ relativePath }) =>
      exportedMapSignature(exportsByPath.get(relativePath)) ===
      exportedMapSignature(nextExportsByPath.get(relativePath)));
    exportsByPath = nextExportsByPath;
    if (converged) {
      break;
    }
  }
  if (!converged) {
    throw new SourceDynamicCodeError(
      "SOURCE_ANALYSIS_UNRESOLVED",
      "interfile binding graph did not converge",
      { reason: "module export fixed point" }
    );
  }
  const findings = records.flatMap((record) =>
    analyzeRecord(
      record,
      owner,
      traceByPath.get(record.relativePath) ?? null,
      moduleResolution.context(
        record,
        exportsByPath,
        traceByPath.has(record.relativePath)
      )
    ).findings
  );
  findings.sort((left, right) =>
    left.relativePath.localeCompare(right.relativePath) ||
    left.line - right.line ||
    left.column - right.column ||
    left.mechanism.localeCompare(right.mechanism)
  );
  return findings.filter((finding, index, all) =>
    all.findIndex((candidate) =>
      candidate.relativePath === finding.relativePath &&
      candidate.line === finding.line &&
      candidate.column === finding.column &&
      candidate.mechanism === finding.mechanism &&
      candidate.operation === finding.operation
    ) === index
  );
}

export async function scanPackageSourceDynamicCode({
  projectRoot,
  packageName,
  ownerType = "primary",
  cache = null
}) {
  const resolvedProjectRoot = path.resolve(projectRoot);
  let packageDetails;
  try {
    packageDetails = await resolvePackage(resolvedProjectRoot, packageName);
  } catch (error) {
    if (error instanceof SourceDynamicCodeError) {
      throw error;
    }
    throw new SourceDynamicCodeError(
      "SOURCE_FILESYSTEM_ERROR",
      "package source metadata cannot be read",
      { packageName, cause: error?.code ?? "UNKNOWN" }
    );
  }
  let inventory;
  try {
    inventory = await inventoryPackage(packageDetails.packageRealRoot);
  } catch (error) {
    if (error instanceof SourceDynamicCodeError) {
      throw error;
    }
    throw new SourceDynamicCodeError(
      "SOURCE_FILESYSTEM_ERROR",
      "installed package inventory cannot be read",
      { packageName, cause: error?.code ?? "UNKNOWN" }
    );
  }
  const ownershipPolicySha256 = sha256(canonicalJson({
    ownerType,
    packageName,
    ownershipPolicyVersion: 1
  }));
  const cacheIdentitySha256 = sha256(canonicalJson({
    packageBytesSha256: inventory.packageBytesSha256,
    packageLockSha256: packageDetails.packageLockSha256,
    detectorContractSha256: sourceDynamicCodeDetectorContractSha256,
    parser: { name: "typescript", version: ts.version },
    ownershipPolicySha256
  }));
  if (cache instanceof Map && cache.has(cacheIdentitySha256)) {
    return {
      ...cache.get(cacheIdentitySha256),
      cache: { identitySha256: cacheIdentitySha256, reused: true }
    };
  }
  const entrypoints = manifestEntrypoints(packageDetails.manifest);
  const sourceInventory = createSourceRecords(
    inventory,
    packageDetails.packageRealRoot,
    entrypoints
  );
  const parsedRecords = parseRecords(sourceInventory.records);
  const owner = {
    type: ownerType,
    package: packageName,
    version: packageDetails.manifest.version,
    bundledAttribution: "unknown"
  };
  const findings = analyzeParsedRecords(
    parsedRecords,
    owner,
    entrypoints,
    new Set(sourceInventory.classifications.map(({ relativePath }) => relativePath))
  );
  const result = Object.freeze({
    value: findings.length > 0 ? "yes" : "no",
    findings: Object.freeze(findings),
    owner: Object.freeze(owner),
    inventory: Object.freeze({
      files: inventory.files.length,
      executableFiles: sourceInventory.records.length,
      declarationFiles: sourceInventory.declarationFiles,
      sourceMaps: inventory.files.filter(({ relativePath }) => relativePath.endsWith(".map")).length,
      symlinks: inventory.symlinks,
      classifications: Object.freeze(
        sourceInventory.classifications.map((classification) => Object.freeze({ ...classification }))
      ),
      sourceRepresentations: Object.freeze(
        sourceInventory.records.map((record) => Object.freeze({
          relativePath: record.relativePath,
          fileSha256: record.fileSha256,
          representations: Object.freeze(
            record.representations.map((representation) => Object.freeze({ ...representation }))
          )
        }))
      )
    }),
    provenance: Object.freeze({
      packageBytesSha256: inventory.packageBytesSha256,
      packageLockSha256: packageDetails.packageLockSha256,
      detectorContractSha256: sourceDynamicCodeDetectorContractSha256,
      ownershipPolicySha256,
      parser: Object.freeze({ name: "typescript", version: ts.version }),
      packageRootWasSymlink: packageDetails.packageRootWasSymlink,
      entrypoints: Object.freeze(entrypoints)
    }),
    cache: Object.freeze({ identitySha256: cacheIdentitySha256, reused: false })
  });
  if (cache instanceof Map) {
    cache.set(cacheIdentitySha256, result);
  }
  return result;
}

async function scanAdapterPath(projectRoot, adapterPath) {
  const sourceRoot = path.join(projectRoot, "src");
  const sourceRootReal = await realpath(sourceRoot);
  const pending = [path.resolve(projectRoot, adapterPath)];
  const collected = new Map();

  async function resolveRelativeSource(fromPath, specifier) {
    const base = path.resolve(path.dirname(fromPath), specifier);
    for (const candidate of [
      base,
      ...[".js", ".cjs", ".mjs", ".ts", ".cts", ".mts"].map((extension) =>
        `${base}${extension}`
      ),
      ...[".js", ".cjs", ".mjs", ".ts", ".cts", ".mts"].map((extension) =>
        path.join(base, `index${extension}`)
      )
    ]) {
      try {
        const candidateReal = await realpath(candidate);
        const details = await stat(candidateReal);
        if (details.isFile()) {
          return candidateReal;
        }
      } catch (error) {
        if (error?.code !== "ENOENT") {
          throw error;
        }
      }
    }
    throw new SourceDynamicCodeError(
      "SOURCE_ADAPTER_IMPORT_MISSING",
      "adapter relative import cannot be resolved",
      { adapterPath: safeRelative(projectRoot, fromPath), specifier }
    );
  }

  while (pending.length > 0) {
    const current = pending.pop();
    const currentReal = await realpath(current);
    if (!isInside(sourceRootReal, currentReal)) {
      throw new SourceDynamicCodeError(
        "SOURCE_ADAPTER_ESCAPE",
        "adapter source resolves outside the benchmark source root",
        { adapterPath }
      );
    }
    if (collected.has(currentReal)) {
      continue;
    }
    const contentBuffer = await readFile(currentReal);
    const relativePath = safeRelative(projectRoot, currentReal);
    const content = decodeSource(contentBuffer, relativePath);
    const record = parseRecords([{
      relativePath,
      content,
      fileSha256: sha256(content),
      representation: "source",
      representations: [{ type: "source", path: relativePath }],
      sourceMapGeneratedPath: null
    }])[0];
    collected.set(currentReal, record);
    for (const specifier of staticModuleSpecifiers(record.sourceFile)) {
      if (specifier.startsWith(".")) {
        pending.push(await resolveRelativeSource(currentReal, specifier));
      }
    }
  }
  const records = [...collected.values()].sort((left, right) =>
    left.relativePath.localeCompare(right.relativePath)
  );
  let projectManifestRaw;
  try {
    projectManifestRaw = await readFile(path.join(projectRoot, "package.json"), "utf8");
  } catch (error) {
    throw new SourceDynamicCodeError(
      error?.code === "ENOENT"
        ? "SOURCE_PROJECT_MANIFEST_MISSING"
        : "SOURCE_PROJECT_MANIFEST_READ_ERROR",
      "project manifest cannot be read for adapter ownership",
      { cause: error?.code ?? "UNKNOWN" }
    );
  }
  let projectManifest;
  try {
    projectManifest = JSON.parse(projectManifestRaw);
  } catch {
    throw new SourceDynamicCodeError(
      "SOURCE_PROJECT_MANIFEST_INVALID",
      "project manifest is invalid JSON"
    );
  }
  if (
    projectManifest === null ||
    typeof projectManifest !== "object" ||
    typeof projectManifest.name !== "string" ||
    typeof projectManifest.version !== "string"
  ) {
    throw new SourceDynamicCodeError(
      "SOURCE_PROJECT_MANIFEST_INVALID",
      "project manifest lacks adapter ownership identity"
    );
  }
  const relativePath = safeRelative(projectRoot, await realpath(path.resolve(projectRoot, adapterPath)));
  const owner = {
    type: "adapter",
    package: projectManifest.name,
    version: projectManifest.version,
    bundledAttribution: "not-applicable"
  };
  const findings = analyzeParsedRecords(records, owner, [relativePath]);
  return Object.freeze({
    value: findings.length > 0 ? "yes" : "no",
    findings: Object.freeze(findings),
    owner: Object.freeze(owner)
  });
}

export async function scanValidatorSourceDynamicCode({
  projectRoot,
  primaryPackage,
  companionPackages = [],
  transitivePackages = [],
  adapterPaths = [],
  cache = null
}) {
  const primary = await scanPackageSourceDynamicCode({
    projectRoot,
    packageName: primaryPackage,
    ownerType: "primary",
    cache
  });
  const companions = [];
  for (const packageName of companionPackages) {
    companions.push(await scanPackageSourceDynamicCode({
      projectRoot,
      packageName,
      ownerType: "companion",
      cache
    }));
  }
  const transitives = [];
  for (const packageName of transitivePackages) {
    transitives.push(await scanPackageSourceDynamicCode({
      projectRoot,
      packageName,
      ownerType: "transitive",
      cache
    }));
  }
  const adapters = [];
  for (const adapterPath of adapterPaths) {
    try {
      adapters.push(await scanAdapterPath(path.resolve(projectRoot), adapterPath));
    } catch (error) {
      if (error instanceof SourceDynamicCodeError) {
        throw error;
      }
      throw new SourceDynamicCodeError(
        "SOURCE_ADAPTER_READ_ERROR",
        "adapter source cannot be read",
        { cause: error?.code ?? "UNKNOWN" }
      );
    }
  }
  const owned = [primary, ...companions];
  const findings = owned.flatMap(({ findings: componentFindings }) => componentFindings);
  return Object.freeze({
    value: findings.length > 0 ? "yes" : "no",
    findings: Object.freeze(findings),
    components: Object.freeze({
      primary,
      companions: Object.freeze(companions),
      transitives: Object.freeze(transitives),
      adapters: Object.freeze(adapters)
    })
  });
}
