import { fileURLToPath } from "node:url";
import path from "node:path";

export const benchmarksRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

export function getResultsRoot(environment = process.env) {
  const configured = environment.BENCHMARK_RESULTS_ROOT;
  if (typeof configured !== "string") {
    return path.join(benchmarksRoot, "results");
  }
  const resolved = path.resolve(configured);
  const cacheRoot = path.join(benchmarksRoot, ".cache");
  if (!resolved.startsWith(`${cacheRoot}${path.sep}`)) {
    throw new Error("benchmark staging results must stay inside the project .cache");
  }
  return resolved;
}
