import { checkIsEnumMember } from './checkIsEnumMember.ts';
import { AppTheme } from '../types/common.ts';

export const checkIsAppTheme = (theme: string | undefined | null) =>
  checkIsEnumMember(AppTheme, theme);
