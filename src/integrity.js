import { createHash } from "node:crypto";
import { types } from "node:util";

const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const getPrototypeOf = Object.getPrototypeOf;
const isExtensible = Object.isExtensible;
const isSealed = Object.isSealed;
const isFrozen = Object.isFrozen;
const hasOwn = Object.hasOwn;
const ownKeys = Reflect.ownKeys;
const stringify = JSON.stringify;
const objectIs = Object.is;
const isNaNNumber = Number.isNaN;
const toStringValue = String;
const bigintToString = BigInt.prototype.toString;
const dateGetTime = Date.prototype.getTime;
const mapEntries = Map.prototype.entries;
const mapIteratorNext = getPrototypeOf(new Map().entries()).next;
const setValues = Set.prototype.values;
const setIteratorNext = getPrototypeOf(new Set().values()).next;
const Uint8ArrayClass = Uint8Array;
const symbolDescriptionGetter = getOwnPropertyDescriptor(
  Symbol.prototype,
  "description"
).get;
const regexpSourceGetter = getOwnPropertyDescriptor(
  RegExp.prototype,
  "source"
).get;
const regexpFlagsGetter = getOwnPropertyDescriptor(
  RegExp.prototype,
  "flags"
).get;
const typedArrayPrototype = getPrototypeOf(Uint8ArrayClass.prototype);
const typedArrayByteOffsetGetter = getOwnPropertyDescriptor(
  typedArrayPrototype,
  "byteOffset"
).get;
const typedArrayByteLengthGetter = getOwnPropertyDescriptor(
  typedArrayPrototype,
  "byteLength"
).get;
const typedArrayBufferGetter = getOwnPropertyDescriptor(
  typedArrayPrototype,
  "buffer"
).get;
const dataViewByteOffsetGetter = getOwnPropertyDescriptor(
  DataView.prototype,
  "byteOffset"
).get;
const dataViewByteLengthGetter = getOwnPropertyDescriptor(
  DataView.prototype,
  "byteLength"
).get;
const dataViewBufferGetter = getOwnPropertyDescriptor(
  DataView.prototype,
  "buffer"
).get;

function detectorFailure(message, cause) {
  const error = new Error(`integrity detector failed: ${message}`);
  error.code = "INTEGRITY_DETECTOR_FAILURE";
  error.cause = cause;
  return error;
}

export function semanticDifferenceForKey(difference) {
  function normalize(value) {
    if (Array.isArray(value)) {
      return value.map((entry) => normalize(entry));
    }
    if (value === null || typeof value !== "object") {
      return value;
    }
    const normalized = {};
    for (const [key, entry] of Object.entries(value)) {
      if (key !== "identity") {
        normalized[key] = normalize(entry);
      }
    }
    return normalized;
  }
  return normalize(difference);
}

export function createIntegrityTracker(root) {
  const objectIds = new WeakMap();
  const symbolIds = new Map();
  let nextIdentity = 1;
  let baselineHash;
  let baselineDiagnostic;

  function objectIdentity(value) {
    if (!objectIds.has(value)) {
      objectIds.set(value, nextIdentity);
      nextIdentity += 1;
    }
    return objectIds.get(value);
  }

  function symbolIdentity(value) {
    if (!symbolIds.has(value)) {
      symbolIds.set(value, nextIdentity);
      nextIdentity += 1;
    }
    return symbolIds.get(value);
  }

  function updateSymbol(hash, value) {
    const globalKey = Symbol.keyFor(value);
    const description = symbolDescriptionGetter.call(value);
    hash.update(
      `symbol:${symbolIdentity(value)}:${stringify(globalKey ?? null)}:${stringify(description ?? null)};`
    );
  }

  function updatePrimitive(hash, value) {
    const type = typeof value;
    if (value === null) {
      hash.update("null;");
      return true;
    }
    if (type === "undefined") {
      hash.update("undefined;");
      return true;
    }
    if (type === "symbol") {
      updateSymbol(hash, value);
      return true;
    }
    if (type === "number") {
      const encoded = isNaNNumber(value)
        ? "NaN"
        : value === Number.POSITIVE_INFINITY
          ? "+Infinity"
          : value === Number.NEGATIVE_INFINITY
            ? "-Infinity"
            : objectIs(value, -0)
              ? "-0"
              : toStringValue(value);
      hash.update(`number:${encoded};`);
      return true;
    }
    if (type === "bigint") {
      hash.update(`bigint:${bigintToString.call(value)};`);
      return true;
    }
    if (type === "boolean" || type === "string") {
      hash.update(`${type}:${stringify(value)};`);
      return true;
    }
    return false;
  }

  function updateDescriptor(hash, descriptor, seen) {
    hash.update(
      `descriptor:${descriptor.enumerable === true ? 1 : 0}:${descriptor.configurable === true ? 1 : 0}:`
    );
    if (hasOwn(descriptor, "value")) {
      hash.update(`data:${descriptor.writable === true ? 1 : 0}:`);
      updateValue(hash, descriptor.value, seen);
      return;
    }
    hash.update("accessor:get:");
    updateValue(hash, descriptor.get, seen);
    hash.update("set:");
    updateValue(hash, descriptor.set, seen);
  }

  function updateInternalSlots(hash, value, seen) {
    if (types.isMap(value)) {
      hash.update("map[");
      const iterator = mapEntries.call(value);
      while (true) {
        const step = mapIteratorNext.call(iterator);
        if (step.done) {
          break;
        }
        const [key, entry] = step.value;
        updateValue(hash, key, seen);
        updateValue(hash, entry, seen);
      }
      hash.update("];");
      return;
    }
    if (types.isSet(value)) {
      hash.update("set[");
      const iterator = setValues.call(value);
      while (true) {
        const step = setIteratorNext.call(iterator);
        if (step.done) {
          break;
        }
        updateValue(hash, step.value, seen);
      }
      hash.update("];");
      return;
    }
    if (types.isDate(value)) {
      hash.update(`date:${dateGetTime.call(value)};`);
      return;
    }
    if (types.isRegExp(value)) {
      hash.update(
        `regexp:${regexpSourceGetter.call(value)}:${regexpFlagsGetter.call(value)}:${getOwnPropertyDescriptor(value, "lastIndex")?.value};`
      );
      return;
    }
    if (types.isAnyArrayBuffer(value)) {
      hash.update("array-buffer:");
      hash.update(new Uint8ArrayClass(value));
      hash.update(";");
      return;
    }
    if (types.isTypedArray(value)) {
      const byteOffset = typedArrayByteOffsetGetter.call(value);
      const byteLength = typedArrayByteLengthGetter.call(value);
      const buffer = typedArrayBufferGetter.call(value);
      hash.update(`typed-array:${byteOffset}:${byteLength}:`);
      hash.update(new Uint8ArrayClass(buffer, byteOffset, byteLength));
      hash.update(";");
      return;
    }
    if (types.isDataView(value)) {
      const byteOffset = dataViewByteOffsetGetter.call(value);
      const byteLength = dataViewByteLengthGetter.call(value);
      const buffer = dataViewBufferGetter.call(value);
      hash.update(`data-view:${byteOffset}:${byteLength}:`);
      hash.update(new Uint8ArrayClass(buffer, byteOffset, byteLength));
      hash.update(";");
    }
  }

  function updateValue(hash, value, seen) {
    if (updatePrimitive(hash, value)) {
      return;
    }
    const type = typeof value;
    if (type !== "object" && type !== "function") {
      hash.update(`unsupported:${type};`);
      return;
    }
    const identity = objectIdentity(value);
    if (seen.has(value)) {
      hash.update(`reference:${identity};`);
      return;
    }
    seen.add(value);
    hash.update(`${type}:${identity}:`);
    if (types.isProxy(value)) {
      hash.update("proxy-opaque;");
      return;
    }
    hash.update(
      `state:${isExtensible(value) ? 1 : 0}:${isSealed(value) ? 1 : 0}:${isFrozen(value) ? 1 : 0}:prototype:`
    );
    updateValue(hash, getPrototypeOf(value), seen);
    updateInternalSlots(hash, value, seen);
    const keys = ownKeys(value);
    hash.update(`properties:${keys.length}:`);
    for (const key of keys) {
      if (typeof key === "symbol") {
        updateSymbol(hash, key);
      } else {
        hash.update(`key:${stringify(key)};`);
      }
      const descriptor = getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined) {
        hash.update("missing-descriptor;");
      } else {
        updateDescriptor(hash, descriptor, seen);
      }
    }
  }

  function capture(value) {
    const hash = createHash("sha256");
    updateValue(hash, value, new Set());
    return hash.digest("hex");
  }

  function diagnosticValue(value) {
    if (value === null) {
      return { type: "null", value: null };
    }
    const type = typeof value;
    if (type === "undefined") {
      return { type: "undefined" };
    }
    if (type === "number") {
      return {
        type,
        value: isNaNNumber(value)
          ? "NaN"
          : objectIs(value, -0)
            ? "-0"
            : toStringValue(value)
      };
    }
    if (type === "bigint") {
      return { type, value: bigintToString.call(value) };
    }
    if (type === "boolean" || type === "string") {
      return { type, value };
    }
    if (type === "symbol") {
      return {
        type,
        identity: symbolIdentity(value),
        globalKey: Symbol.keyFor(value) ?? null,
        description: symbolDescriptionGetter.call(value) ?? null
      };
    }
    return { type, identity: objectIdentity(value) };
  }

  function propertyPath(parent, key) {
    if (typeof key === "symbol") {
      return `${parent}[Symbol(${symbolDescriptionGetter.call(key) ?? ""})]`;
    }
    if (/^(0|[1-9][0-9]*)$/.test(key)) {
      return `${parent}[${key}]`;
    }
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
      ? `${parent}.${key}`
      : `${parent}[${stringify(key)}]`;
  }

  function diagnosticDescriptor(descriptor) {
    if (hasOwn(descriptor, "value")) {
      return {
        descriptorType: "data",
        configurable: descriptor.configurable === true,
        enumerable: descriptor.enumerable === true,
        writable: descriptor.writable === true,
        value: diagnosticValue(descriptor.value)
      };
    }
    return {
      descriptorType: "accessor",
      configurable: descriptor.configurable === true,
      enumerable: descriptor.enumerable === true,
      get: diagnosticValue(descriptor.get),
      set: diagnosticValue(descriptor.set)
    };
  }

  function diagnosticSnapshot(value) {
    const entries = new Map();
    const seen = new Set();
    function visit(current, currentPath) {
      if (
        current === null ||
        (typeof current !== "object" && typeof current !== "function")
      ) {
        entries.set(currentPath, diagnosticValue(current));
        return;
      }
      if (seen.has(current)) {
        entries.set(`${currentPath}[[Reference]]`, diagnosticValue(current));
        return;
      }
      seen.add(current);
      if (types.isProxy(current)) {
        entries.set(`${currentPath}[[Proxy]]`, { opaque: true });
        return;
      }
      entries.set(`${currentPath}[[State]]`, {
        extensible: isExtensible(current),
        sealed: isSealed(current),
        frozen: isFrozen(current),
        prototype: diagnosticValue(getPrototypeOf(current))
      });
      for (const key of ownKeys(current)) {
        const nextPath = propertyPath(currentPath, key);
        const descriptor = getOwnPropertyDescriptor(current, key);
        if (descriptor === undefined) {
          entries.set(nextPath, { descriptorType: "missing" });
          continue;
        }
        entries.set(nextPath, diagnosticDescriptor(descriptor));
        if (hasOwn(descriptor, "value")) {
          const nested = descriptor.value;
          if (
            nested !== null &&
            (typeof nested === "object" || typeof nested === "function")
          ) {
            visit(nested, nextPath);
          }
        }
      }
    }
    visit(value, "$");
    return entries;
  }

  function firstDifference(before, after, baselineHashValue, currentHashValue) {
    for (const [path, previous] of before) {
      if (!after.has(path)) {
        return { path, kind: "removed", before: previous, after: null };
      }
      const current = after.get(path);
      if (stringify(previous) !== stringify(current)) {
        return { path, kind: "changed", before: previous, after: current };
      }
    }
    for (const [path, current] of after) {
      if (!before.has(path)) {
        return { path, kind: "added", before: null, after: current };
      }
    }
    return {
      path: "$",
      kind: "hash-changed",
      before: { hash: baselineHashValue },
      after: { hash: currentHashValue }
    };
  }

  try {
    baselineHash = capture(root);
    baselineDiagnostic = diagnosticSnapshot(root);
  } catch (error) {
    throw detectorFailure("baseline capture failed", error);
  }

  return {
    verify(value = root) {
      try {
        const currentHash = capture(value);
        const unchanged = currentHash === baselineHash;
        return {
          unchanged,
          baselineHash,
          currentHash,
          detectorError: null,
          difference: unchanged
            ? null
            : firstDifference(
                baselineDiagnostic,
                diagnosticSnapshot(value),
                baselineHash,
                currentHash
              )
        };
      } catch (error) {
        return {
          unchanged: false,
          baselineHash,
          currentHash: null,
          detectorError: error,
          difference: null
        };
      }
    },
    release() {
      baselineHash = null;
      baselineDiagnostic = null;
      symbolIds.clear();
    }
  };
}
