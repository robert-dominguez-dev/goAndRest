import { checkIsNullish } from './checkIsNullish.ts';

describe('checkIsNullish', () => {
  test('returns true for null and undefined', () => {
    expect(checkIsNullish(null)).toBe(true);
    expect(checkIsNullish(undefined)).toBe(true);
  });

  test('returns false for other falsy values', () => {
    expect(checkIsNullish(0)).toBe(false);
    expect(checkIsNullish(false)).toBe(false);
    expect(checkIsNullish('')).toBe(false);
    expect(checkIsNullish(NaN)).toBe(false);
  });

  test('returns false for truthy values', () => {
    expect(checkIsNullish(42)).toBe(false);
    expect(checkIsNullish('hello')).toBe(false);
    expect(checkIsNullish(true)).toBe(false);
    expect(checkIsNullish([])).toBe(false);
    expect(checkIsNullish({})).toBe(false);
  });
});
