async function prepare(runtime, schema) {
  return typeof runtime.setup === "function"
    ? await runtime.setup(structuredClone(schema))
    : structuredClone(schema);
}

function expectedPair(type) {
  return type === "integer" ? [true, false] : [false, true];
}

function observePair(runtime, target) {
  return [runtime.validate(target, 1), runtime.validate(target, "1")];
}

function samePair(left, right) {
  return left[0] === right[0] && left[1] === right[1];
}

export async function runIsolationControl({
  adapter,
  baseConfig,
  rootSchema,
  resource,
  control
}) {
  const types = {
    aa: ["integer", "integer"],
    bb: ["string", "string"],
    aba: ["integer", "string"],
    bab: ["string", "integer"]
  }[control];
  if (!Array.isArray(types)) {
    throw new Error(`unsupported isolation control: ${control}`);
  }

  try {
    const first = adapter.create(
      { ...baseConfig, resources: [resource(types[0])] },
      { deferReportOptions: true }
    );
    const firstTarget = await prepare(first, rootSchema);
    const initial = observePair(first, firstTarget);
    if (!samePair(initial, expectedPair(types[0]))) {
      return {
        status: "inconclusive",
        diagnostic: `${control.toUpperCase()} initial canary returned ${initial.join("/")}`
      };
    }

    const second = adapter.create(
      { ...baseConfig, resources: [resource(types[1])] },
      { deferReportOptions: true }
    );
    const secondTarget = await prepare(second, rootSchema);
    const secondObserved = observePair(second, secondTarget);
    if (!samePair(secondObserved, expectedPair(types[1]))) {
      return {
        status: "inconclusive",
        diagnostic: `${control.toUpperCase()} second canary returned ${secondObserved.join("/")}`
      };
    }

    const repeatedTarget = await prepare(first, rootSchema);
    const repeated = observePair(first, repeatedTarget);
    if (!samePair(initial, repeated)) {
      return {
        status: "changed",
        diagnostic: `${control.toUpperCase()} changed from ${initial.join("/")} to ${repeated.join("/")}`
      };
    }
    return { status: "passed", diagnostic: null };
  } catch (error) {
    return {
      status: "threw",
      diagnostic: `${control.toUpperCase()} threw: ${error?.message ?? String(error)}`
    };
  }
}
