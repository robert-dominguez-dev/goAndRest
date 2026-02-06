import { getAppSize } from './getAppSize.ts';
import { AppSize } from '../types/ui.ts';

describe('getAppSize', () => {
  test('returns the correct AppSize value for a valid AppSizeUnion key', () => {
    expect(getAppSize('xxs')).toBe(AppSize.xxs);
    expect(getAppSize('xs')).toBe(AppSize.xs);
    expect(getAppSize('m')).toBe(AppSize.m);
    expect(getAppSize('3xl')).toBe(AppSize['3xl']);
  });

  test('returns undefined if sizeUnion is null or undefined and no fallback is provided', () => {
    expect(getAppSize(undefined)).toBeUndefined();
    expect(getAppSize(null as any)).toBeUndefined();
  });

  test('returns the fallback if sizeUnion is null or undefined and a fallback is provided', () => {
    expect(getAppSize(undefined, AppSize.m)).toBe(AppSize.m);
    expect(getAppSize(null as any, AppSize.xxl)).toBe(AppSize.xxl);
  });

  test('ignores the fallback if sizeUnion is valid', () => {
    expect(getAppSize('l', AppSize.m)).toBe(AppSize.l);
    expect(getAppSize('s', AppSize.xxl)).toBe(AppSize.s);
  });
});
