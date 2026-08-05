import { appendFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const eventPath = process.env.IMPLEMENTATION_EVIDENCE_EVENTS;
const dependencyRoots = JSON.parse(
  process.env.IMPLEMENTATION_EVIDENCE_DEPENDENCY_ROOTS ?? "[]"
).map((root) => pathToFileURL(root).href);
const processIdentity = process.env.IMPLEMENTATION_EVIDENCE_PROCESS_IDENTITY ?? "standalone";
const rootProcess = process.env.IMPLEMENTATION_EVIDENCE_PROPAGATED !== "1";

export async function resolve(specifier, context, nextResolve) {
  if (!specifier.startsWith("data:")) {
    return nextResolve(specifier, context);
  }
  const attribution = typeof context.parentURL === "string" && (
    context.parentURL.includes("/node_modules/") ||
    dependencyRoots.some((root) => context.parentURL === root || context.parentURL.startsWith(`${root}/`))
  )
    ? "dependency"
    : "runner";
  const event = (outcome) => appendFileSync(
    eventPath,
    `${JSON.stringify({
      event: "mechanism",
      mechanism: "data-import",
      outcome,
      attribution,
      phase: process.env.IMPLEMENTATION_EVIDENCE_PHASE ?? "adapter-import",
      processIdentity,
      rootProcess,
      pid: process.pid,
      threadId: "loader"
    })}\n`,
    { encoding: "utf8" }
  );
  event("attempted");
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    event("failed");
    throw error;
  }
}
