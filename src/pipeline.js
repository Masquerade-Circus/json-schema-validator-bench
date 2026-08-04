import { cp, lstat, mkdir, readFile, readdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

import { runChildProcess } from "./child-process.js";
import {
  defaultEligibilityThresholdPercent,
  parseEligibilityThresholdPercent
} from "./eligibility.js";
import { adapterRegistry } from "./adapter-registry.js";
import {
  assertConfinedCachePath,
  createBenchmarkCohortIdentity
} from "./benchmark.js";
import {
  assertCompatibleDiagnosticBaseline,
  createSampleRuntimeProvenance
} from "./diagnostic.js";
import { performanceIdentitySha256 } from "./intersection.js";
import { canonicalJson, sha256 } from "./suite.js";
import {
  draftIds,
  formatProfiles,
  getParticipants
} from "./matrix.js";

const benchmarksRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = path.join(benchmarksRoot, "src", "cli.js");

export const pipelineCommands = Object.freeze([
  "preflight",
  "suite-ensure",
  "harness",
  "smoke",
  "conformance",
  "setup",
  "execution",
  "cold-execution",
  "report"
]);
export const pipelineUsage =
  "Usage: npm run benchmark -- [--quick] [--validator <canonical-id>] [--bench <setup|execution|cold>] [--controller-deadline-minutes <3-240>] [--eligibility-threshold-percent <0-100>]";
const benchCommands = Object.freeze({
  setup: "setup",
  execution: "execution",
  cold: "cold-execution"
});
const eligibilityThresholdCommands = new Set([
  "conformance",
  "setup",
  "cold-execution",
  "execution",
  "report"
]);

export function parsePipelineArguments(args) {
  if (!Array.isArray(args)) {
    throw new Error("benchmark pipeline arguments must be an array");
  }
  let mode = "full";
  let controllerDeadlineMilliseconds = null;
  let eligibilityThresholdPercent = defaultEligibilityThresholdPercent;
  let eligibilityThresholdConfigured = false;
  let validator = null;
  let bench = null;
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--quick" && mode === "full") {
      mode = "quick";
      continue;
    }
    if (
      argument === "--validator" &&
      validator === null &&
      typeof args[index + 1] === "string"
    ) {
      const candidate = args[index + 1];
      if (!adapterRegistry.some(({ id }) => id === candidate)) {
        throw new Error(
          `--validator requires one canonical adapter registry ID: ${candidate}`
        );
      }
      validator = candidate;
      index += 1;
      continue;
    }
    if (argument === "--validator") {
      throw new Error("--validator must appear exactly once with one canonical adapter registry ID");
    }
    if (
      argument === "--bench" &&
      bench === null &&
      typeof args[index + 1] === "string" &&
      Object.hasOwn(benchCommands, args[index + 1])
    ) {
      bench = args[index + 1];
      index += 1;
      continue;
    }
    if (argument === "--bench") {
      throw new Error(
        "--bench must appear exactly once with one value: setup, execution, or cold"
      );
    }
    if (
      argument === "--controller-deadline-minutes" &&
      controllerDeadlineMilliseconds === null &&
      typeof args[index + 1] === "string"
    ) {
      const minutes = args[index + 1];
      if (!/^\d+$/.test(minutes)) {
        throw new Error("benchmark controller deadline must be an integer from 3 to 240 minutes");
      }
      const parsedMinutes = Number(minutes);
      if (parsedMinutes < 3 || parsedMinutes > 240) {
        throw new Error("benchmark controller deadline must be an integer from 3 to 240 minutes");
      }
      controllerDeadlineMilliseconds = parsedMinutes * 60 * 1000;
      index += 1;
      continue;
    }
    if (
      argument === "--eligibility-threshold-percent" &&
      eligibilityThresholdConfigured === false
    ) {
      eligibilityThresholdPercent = parseEligibilityThresholdPercent(
        args[index + 1]
      ).percent;
      eligibilityThresholdConfigured = true;
      index += 1;
      continue;
    }
    throw new Error(
      `benchmark pipeline arguments are invalid. ${pipelineUsage}`
    );
  }
  return {
    mode,
    controllerDeadlineMilliseconds,
    eligibilityThresholdPercent,
    validator,
    bench
  };
}

export function pipelineCommandsForBench(bench = null) {
  if (bench === null) {
    return pipelineCommands;
  }
  if (!Object.hasOwn(benchCommands, bench)) {
    throw new Error("bench selector must be setup, execution, or cold");
  }
  return Object.freeze([
    "preflight",
    "suite-ensure",
    "harness",
    "smoke",
    "conformance",
    benchCommands[bench],
    "report"
  ]);
}

function runCliCommand(
  command,
  mode,
  resultsRoot,
  runContext,
  controllerDeadlineMilliseconds,
  eligibilityThresholdPercent,
  validator,
  bench
) {
  return runChildProcess(
    process.execPath,
    [cliPath, command, ...(mode === "quick" ? ["--quick"] : [])],
    {
      cwd: benchmarksRoot,
      env: {
        ...process.env,
        BENCHMARK_RESULTS_ROOT: resultsRoot,
        BENCHMARK_PIPELINE_STARTED_AT: runContext.startedAt,
        BENCHMARK_VALIDATOR: validator ?? "",
        BENCHMARK_SELECTED_BENCH: bench ?? "",
        BENCHMARK_CONTROLLER_DEADLINE_MILLISECONDS:
          controllerDeadlineMilliseconds === null
            ? ""
            : String(controllerDeadlineMilliseconds),
        ...(eligibilityThresholdCommands.has(command)
          ? {
              BENCHMARK_ELIGIBILITY_THRESHOLD_PERCENT:
                eligibilityThresholdPercent
            }
          : {})
      },
      streamOutput: true
    }
  );
}

export async function prepareDiagnosticBaseline({
  mode,
  validator,
  eligibilityThresholdPercent,
  resultsRoot,
  bench = null
}) {
  const canonicalResults = path.join(benchmarksRoot, "results");
  await assertNoSymlinksInTree(canonicalResults);
  let baselineIndex = null;
  let baselineEnvironment = null;
  try {
    baselineIndex = JSON.parse(
      await readFile(path.join(canonicalResults, "index.json"), "utf8")
    );
    baselineEnvironment = JSON.parse(
      await readFile(path.join(canonicalResults, "environment.json"), "utf8")
    );
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
  const [packageLock, npmSnapshotLock, suiteLock] = await Promise.all([
    readFile(path.join(benchmarksRoot, "package-lock.json")),
    readFile(path.join(benchmarksRoot, "npm-snapshot-lock.json")),
    readFile(path.join(benchmarksRoot, "suite-lock.json"))
  ]);
  const currentCohortIdentity = await createBenchmarkCohortIdentity({
    mode,
    eligibilityThresholdPercent,
    packageLockSha256: sha256(packageLock),
    npmSnapshotLockSha256: sha256(npmSnapshotLock),
    suiteLockSha256: sha256(suiteLock)
  });
  assertCompatibleDiagnosticBaseline({
    mode,
    validator,
    validatorIds: adapterRegistry.map(({ id }) => id),
    baselineIndex,
    baselineEnvironment,
    currentCohortIdentity
  });
  await assertCompleteDiagnosticBaseline({
    mode,
    resultsRoot: canonicalResults,
    environment: baselineEnvironment,
    index: baselineIndex
  });
  await assertConfinedCachePath(resultsRoot, { allowMissing: true });
  try {
    await lstat(resultsRoot);
    throw new Error(`diagnostic destination already exists: ${resultsRoot}`);
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
  await cp(canonicalResults, resultsRoot, { recursive: true });
  await assertNoSymlinksInTree(resultsRoot);
  await assertConfinedCachePath(resultsRoot);
  return { baselineIndex, baselineEnvironment, currentCohortIdentity };
}

export async function assertNoSymlinksInTree(root) {
  const details = await lstat(root);
  if (details.isSymbolicLink()) {
    throw new Error(`symbolic links are forbidden in diagnostic baselines: ${root}`);
  }
  if (details.isFile()) {
    return;
  }
  if (!details.isDirectory()) {
    throw new Error(`diagnostic baseline entries must be regular files or directories: ${root}`);
  }
  const entries = await readdir(root);
  for (const entry of entries) {
    await assertNoSymlinksInTree(path.join(root, entry));
  }
}

export async function assertCompleteDiagnosticBaseline({
  mode,
  resultsRoot,
  environment,
  index
}) {
  const runLabel = mode === "quick" ? "full Quick benchmark" : "full benchmark";
  try {
    await assertNoSymlinksInTree(resultsRoot);
    if (
      environment === null ||
      typeof environment !== "object" ||
      environment.hashes === null ||
      typeof environment.hashes !== "object" ||
      environment.cohortIdentity === null ||
      typeof environment.cohortIdentity !== "object" ||
      !Number.isInteger(environment.cohortIdentity.rounds) ||
      environment.cohortIdentity.rounds < 1 ||
      index === null ||
      typeof index !== "object" ||
      index.resultsVersion !== 14
    ) {
      throw new Error("baseline index or hash inventory is absent");
    }
    const expectedHashes = environment.hashes;
    const sampleResults = [];
    const suiteManifestRaw = await readFile(
      path.join(resultsRoot, "suite-manifest.json")
    );
    if (sha256(suiteManifestRaw) !== expectedHashes.suiteManifest) {
      throw new Error("suite manifest hash mismatch");
    }
    const expectedConformanceCount = draftIds.reduce(
      (total, draft) => total + getParticipants(draft).length,
      0
    );
    if (
      expectedHashes.conformance === null ||
      typeof expectedHashes.conformance !== "object" ||
      Object.keys(expectedHashes.conformance).length !== expectedConformanceCount
    ) {
      throw new Error("conformance hash inventory is incomplete");
    }
    if (
      expectedHashes.performance === null ||
      typeof expectedHashes.performance !== "object" ||
      Object.keys(expectedHashes.performance).length !==
        draftIds.length * (formatProfiles.length + 1)
    ) {
      throw new Error("performance hash inventory is incomplete");
    }
    for (const draft of draftIds) {
      for (const { id } of getParticipants(draft)) {
        const reportRaw = await readFile(
          path.join(resultsRoot, draft, "conformance", `${id}.json`)
        );
        if (sha256(reportRaw) !== expectedHashes.conformance?.[`${draft}/${id}`]) {
          throw new Error(`conformance report hash mismatch: ${draft}/${id}`);
        }
      }
      for (const [scope, formatProfile, phases, phaseRoot] of [
        [
          `${draft}/setup`,
          null,
          ["setup"],
          path.join(resultsRoot, draft)
        ],
        ...formatProfiles.map((profile) => [
          `${draft}/${profile}`,
          profile,
          ["execution", "cold-execution"],
          path.join(resultsRoot, draft, "profiles", profile)
        ])
      ]) {
        const expectedPerformance = expectedHashes.performance?.[scope];
        if (expectedPerformance === null || typeof expectedPerformance !== "object") {
          throw new Error(`performance hash inventory is absent: ${scope}`);
        }
        for (const phase of phases) {
          const [sampleRaw, intersectionHashRaw, artifactHashRaw, intersectionRaw] =
            await Promise.all([
              readFile(path.join(phaseRoot, phase, "samples.json"), "utf8"),
              readFile(
                path.join(phaseRoot, "intersections", `${phase}.sha256`),
                "utf8"
              ),
              readFile(
                path.join(
                  phaseRoot,
                  "intersections",
                  `${phase}.artifact.sha256`
                ),
                "utf8"
              ),
              readFile(
                path.join(phaseRoot, "intersections", `${phase}.json`),
                "utf8"
              )
            ]);
          const result = JSON.parse(sampleRaw);
          sampleResults.push(result);
          const intersection = JSON.parse(intersectionRaw);
          const expectedHash = expectedPerformance.intersections?.[phase];
          const expectedArtifactHash =
            expectedPerformance.intersectionArtifacts?.[phase];
          const sampleHashKey =
            phase === "cold-execution"
              ? "coldExecutionSamples"
              : `${phase}Samples`;
          const expectedSampleHash = expectedPerformance[sampleHashKey];
          const observedHash = intersectionHashRaw.trim();
          const observedArtifactHash = artifactHashRaw.trim();
          const expectedSampleCount = (result.participantOrderByRound ?? [])
            .reduce(
              (total, entry) => total + (entry.validators?.length ?? 0),
              0
            );
          const expectedRounds = environment.cohortIdentity.rounds;
          const observedRounds = (result.participantOrderByRound ?? [])
            .map(({ round }) => round);
          const roundsAreComplete = result.emptyReason === null
            ? observedRounds.length === expectedRounds &&
              observedRounds.every((round, index) => round === index + 1)
            : observedRounds.length === 0;
          if (
            result.benchmarkMode !== mode ||
            result.benchmarkVersion !== 14 ||
            result.phase !== phase ||
            result.draft !== draft ||
            result.formatProfile !== formatProfile ||
            result.intersectionSha256 !== expectedHash ||
            observedHash !== expectedHash ||
            performanceIdentitySha256(intersection) !== expectedHash ||
            intersection.intersectionVersion !== 12 ||
            intersection.performanceIdentity?.performanceIdentityVersion !== 8 ||
            observedArtifactHash !== expectedArtifactHash ||
            sha256(intersectionRaw) !== expectedArtifactHash ||
            sha256(sampleRaw) !== expectedSampleHash ||
            !roundsAreComplete ||
            !Array.isArray(result.samples) ||
            result.samples.length !== expectedSampleCount ||
            result.samples.some(
              (sample) =>
                !/^[a-f0-9]{64}$/.test(sample.validatorRuntimeSha256)
            )
          ) {
            throw new Error(`${scope}/${phase} is incomplete or incompatible`);
          }
        }
      }
    }
    if (
      canonicalJson(environment.sampleRuntimeProvenance) !==
      canonicalJson(createSampleRuntimeProvenance(sampleResults))
    ) {
      throw new Error("sample runtime provenance is inconsistent");
    }
    const mutationIndex = index.mutationDocuments ?? null;
    const mutationHashes = expectedHashes.mutationDocuments ?? null;
    if ((mutationIndex === null) !== (mutationHashes === null)) {
      throw new Error("mutation inventory index and hashes disagree");
    }
    if (mutationIndex !== null) {
      if (mutationIndex.manifest !== "mutations/index.json") {
        throw new Error("mutation inventory path is invalid");
      }
      const manifestRaw = await readFile(
        path.join(resultsRoot, mutationIndex.manifest),
        "utf8"
      );
      if (sha256(manifestRaw) !== mutationHashes.manifest) {
        throw new Error("mutation inventory hash mismatch");
      }
      const manifest = JSON.parse(manifestRaw);
      if (
        !Array.isArray(manifest.documents) ||
        manifest.documents.length !== mutationIndex.count ||
        manifest.mutationReportVersion !== mutationIndex.mutationReportVersion
      ) {
        throw new Error("mutation inventory is incomplete");
      }
      const declaredDocuments = mutationHashes.documents;
      if (
        declaredDocuments === null ||
        typeof declaredDocuments !== "object" ||
        Object.keys(declaredDocuments).length !== manifest.documents.length
      ) {
        throw new Error("mutation document hash inventory is incomplete");
      }
      const resolvedResultsRoot = path.resolve(resultsRoot);
      const resolvedMutationRoot = path.join(resolvedResultsRoot, "mutations");
      const seenDocuments = new Set();
      for (const document of manifest.documents) {
        const relativePath = document?.relativePath;
        const target = path.resolve(resultsRoot, relativePath ?? "");
        if (
          typeof relativePath !== "string" ||
          !relativePath.startsWith("mutations/") ||
          !target.startsWith(`${resolvedMutationRoot}${path.sep}`) ||
          seenDocuments.has(relativePath)
        ) {
          throw new Error("mutation document identity is invalid");
        }
        seenDocuments.add(relativePath);
        const expectedDocumentHash = declaredDocuments[relativePath];
        if (
          document.sha256 !== expectedDocumentHash ||
          sha256(await readFile(target)) !== expectedDocumentHash
        ) {
          throw new Error(`mutation document hash mismatch: ${relativePath}`);
        }
      }
    }
  } catch (error) {
    throw new Error(
      `Diagnostic refresh requires a complete compatible publication. Run the ${runLabel} first. ${error.message}`,
      { cause: error }
    );
  }
}

export async function runPipeline({
  mode = "full",
  controllerDeadlineMilliseconds = null,
  eligibilityThresholdPercent = defaultEligibilityThresholdPercent,
  validator = null,
  bench = null,
  prepareBaseline = prepareDiagnosticBaseline,
  runCommand = runCliCommand,
  writeProgress = (event) => process.stderr.write(`${JSON.stringify(event)}\n`)
} = {}) {
  if (mode !== "full" && mode !== "quick") {
    throw new Error("pipeline mode must be full or quick");
  }
  const normalizedEligibilityThreshold = parseEligibilityThresholdPercent(
    eligibilityThresholdPercent
  ).percent;
  const commands = pipelineCommandsForBench(bench);
  const started = Date.now();
  const runContext = { startedAt: new Date(started).toISOString() };
  writeProgress({
    event: "pipeline-context",
    mode,
    controllerDeadlineMilliseconds,
    eligibilityThresholdPercent: normalizedEligibilityThreshold,
    validator,
    bench
  });
  const runRoot = path.join(
    benchmarksRoot,
    ".cache",
    `pipeline-${mode}-${process.pid}-${started}`
  );
  const resultsRoot = path.join(runRoot, "results");
  await mkdir(runRoot, { recursive: true });
  if (validator !== null || bench !== null) {
    await prepareBaseline({
      mode,
      validator,
      eligibilityThresholdPercent: normalizedEligibilityThreshold,
      resultsRoot,
      bench
    });
  }
  for (let index = 0; index < commands.length; index += 1) {
    const command = commands[index];
    const stageStarted = Date.now();
    writeProgress({
      event: "pipeline-checkpoint",
      status: "start",
      step: index + 1,
      total: commands.length,
      command
    });
    await runCommand(
      command,
      mode,
      resultsRoot,
      runContext,
      controllerDeadlineMilliseconds,
      normalizedEligibilityThreshold,
      validator,
      bench
    );
    writeProgress({
      event: "pipeline-checkpoint",
      status: "complete",
      step: index + 1,
      total: commands.length,
      command,
      stageDurationMilliseconds: Date.now() - stageStarted,
      elapsedMilliseconds: Date.now() - started
    });
  }
  return { durationMilliseconds: Date.now() - started };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  if (process.argv.length === 3 && process.argv[2] === "--help") {
    process.stdout.write(`${pipelineUsage}\n`);
  } else {
    let parsed = null;
    try {
      parsed = parsePipelineArguments(process.argv.slice(2));
    } catch (error) {
      process.stderr.write(`${error.stack ?? error.message}\n`);
      process.exitCode = 1;
    }
    const pipeline = parsed === null ? null : runPipeline(parsed);
    pipeline
      ?.then((result) => {
        process.stdout.write(
          `${JSON.stringify({ event: "pipeline-complete", mode: parsed.mode, ...result })}\n`
        );
      })
      .catch((error) => {
        process.stderr.write(`${error.stack ?? error.message}\n`);
        process.exitCode = 1;
      });
  }
}
