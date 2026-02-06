import { checkIsFirst } from './checkIsFirst';

describe('isFirst', () => {
  test('should return true if the index is 0', () => {
    const result = checkIsFirst(0);
    expect(result).toBe(true);
  });

  test('should return false if the index is greater than 0', () => {
    const result = checkIsFirst(1);
    expect(result).toBe(false);
  });

  test('should return false if the index is negative', () => {
    const result = checkIsFirst(-1);
    expect(result).toBe(false);
  });
});
