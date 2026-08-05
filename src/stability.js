export const VALIDATION_STABILITY_CHECKS = 3;

export function checkValidationStability(validate) {
  const expected = validate(1);
  for (let repetition = 2; repetition <= VALIDATION_STABILITY_CHECKS; repetition += 1) {
    const observed = validate(repetition);
    if (observed !== expected) {
      return { stable: false, expected, observed, repetition };
    }
  }
  return { stable: true, observed: expected };
}
