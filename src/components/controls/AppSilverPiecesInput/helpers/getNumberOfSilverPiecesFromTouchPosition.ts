import { AppSilverPiecesInputSpecificProps } from '../types.ts';

import { AppSize } from '../../../../types/ui.ts';
import { checkIsValidNumber } from '../../../../helpers/checkIsValidNumber.ts';

type GetNumberOfSilverPiecesFromTouchPositionParams =
  Required<AppSilverPiecesInputSpecificProps> & {
    touchOffsetX: number | undefined;
    layoutWidth: number | undefined;
    paddingLeft?: number;
  };

export const getNumberOfSilverPiecesFromTouchPosition = ({
  minValue,
  maxValue,
  layoutWidth,
  touchOffsetX,
  paddingLeft = AppSize.m,
}: GetNumberOfSilverPiecesFromTouchPositionParams) => {
  if (!layoutWidth || !checkIsValidNumber(touchOffsetX)) {
    return undefined;
  }

  const stepWidth = layoutWidth / maxValue;
  const touchOffsetXEvaluated = touchOffsetX - paddingLeft;
  const numberOfSilverPieces = Math.ceil(touchOffsetXEvaluated / stepWidth);

  const isUnderMinValue = numberOfSilverPieces <= minValue;

  if (isUnderMinValue) {
    return minValue;
  }

  const isOverMaxValue = numberOfSilverPieces >= maxValue;

  if (isOverMaxValue) {
    return maxValue;
  }

  return numberOfSilverPieces;
};
