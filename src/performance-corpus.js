export function derivePerformanceCorpus({ mode, intersection, cases }) {
  if (mode !== "quick" && mode !== "full") {
    throw new Error("performance corpus mode must be quick or full");
  }
  if (
    intersection === null ||
    typeof intersection !== "object" ||
    !Array.isArray(intersection.caseIds) ||
    !Array.isArray(intersection.setupEntries) ||
    !Array.isArray(cases)
  ) {
    throw new Error("performance corpus requires an intersection and suite cases");
  }
  return {
    caseIds: intersection.caseIds,
    setupEntries: intersection.setupEntries,
    metadata: null
  };
}
