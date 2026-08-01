import { formatProfiles } from "./matrix.js";

export const defaultEligibilityThresholdPercent = "98";
export const maximumEligibilityThresholdDecimalPlaces = 6;

function greatestCommonDivisor(left, right) {
  let a = left;
  let b = right;
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function parseEligibilityThresholdPercent(value) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(
      "eligibility threshold percent must be a decimal from 0 through 100"
    );
  }
  const decimal = /^(\d+)(?:\.(\d+))?$/.exec(value);
  if (decimal === null) {
    throw new Error(
      "eligibility threshold percent must be an ordinary decimal from 0 through 100 without signs or exponents"
    );
  }
  const fractionDigits = decimal[2] ?? "";
  if (fractionDigits.length > maximumEligibilityThresholdDecimalPlaces) {
    throw new Error(
      `eligibility threshold percent precision supports at most ${maximumEligibilityThresholdDecimalPlaces} decimal places`
    );
  }
  const integerDigits = decimal[1].replace(/^0+(?=\d)/, "");
  const normalizedFraction = fractionDigits.replace(/0+$/, "");
  const percent =
    normalizedFraction.length === 0
      ? integerDigits
      : `${integerDigits}.${normalizedFraction}`;
  const scale = 10 ** normalizedFraction.length;
  const percentNumerator =
    Number(integerDigits) * scale +
    (normalizedFraction.length === 0 ? 0 : Number(normalizedFraction));
  if (!Number.isSafeInteger(percentNumerator) || percentNumerator > 100 * scale) {
    throw new Error(
      "eligibility threshold percent must be a decimal from 0 through 100 inclusive"
    );
  }
  const ratioDenominator = 100 * scale;
  const divisor = greatestCommonDivisor(percentNumerator, ratioDenominator);
  return Object.freeze({
    percent,
    percentNumerator,
    percentDenominator: scale,
    fraction: Object.freeze({
      numerator: percentNumerator / divisor,
      denominator: ratioDenominator / divisor
    })
  });
}

export function eligibilityThresholdFromEnvironment(environment = process.env) {
  const configured = environment.BENCHMARK_ELIGIBILITY_THRESHOLD_PERCENT;
  return parseEligibilityThresholdPercent(
    configured === undefined || configured === ""
      ? defaultEligibilityThresholdPercent
      : configured
  );
}

export function createPerformanceEligibilityPolicy(
  threshold = parseEligibilityThresholdPercent(defaultEligibilityThresholdPercent)
) {
  const parsed =
    typeof threshold === "string"
      ? parseEligibilityThresholdPercent(threshold)
      : threshold;
  if (
    parsed === null ||
    typeof parsed !== "object" ||
    typeof parsed.percent !== "string" ||
    !Number.isSafeInteger(parsed.fraction?.numerator) ||
    !Number.isSafeInteger(parsed.fraction?.denominator)
  ) {
    throw new Error("eligibility threshold representation is invalid");
  }
  return Object.freeze({
    policyVersion: 3,
    scope: Object.freeze(["draft", "phase"]),
    thresholdPercent: parsed.percent,
    thresholdFraction: Object.freeze({ ...parsed.fraction }),
    exactComparison: `PASS * ${parsed.fraction.denominator} >= total * ${parsed.fraction.numerator}`,
    requiredProfiles: formatProfiles
  });
}

export function meetsEligibilityThreshold(pass, total, threshold) {
  if (!Number.isSafeInteger(pass) || pass < 0 || !Number.isSafeInteger(total) || total < 1) {
    return false;
  }
  const parsed =
    typeof threshold === "string"
      ? parseEligibilityThresholdPercent(threshold)
      : threshold;
  return (
    BigInt(pass) * BigInt(parsed.fraction.denominator) >=
    BigInt(total) * BigInt(parsed.fraction.numerator)
  );
}

export const performanceEligibilityPolicy = createPerformanceEligibilityPolicy();
