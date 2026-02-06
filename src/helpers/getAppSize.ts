import { AppSize, AppSizeUnion } from '../types/ui.ts';

import { checkIsValidNumber } from './checkIsValidNumber.ts';
import { checkIsNullish } from './checkIsNullish.ts';

export const getAppSize = (
  sizeUnion: AppSizeUnion | undefined,
  fallback?: AppSize,
): AppSize | undefined => {
  if (checkIsNullish(sizeUnion)) {
    return fallback;
  }

  if (checkIsValidNumber(sizeUnion)) {
    return sizeUnion;
  }

  return AppSize[sizeUnion];
};
