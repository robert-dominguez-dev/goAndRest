import { AppSilverPiecesInputSpecificProps } from '../types.ts';
import { getIsValidNumber } from '../../../../shared/utils/getIsValidNumber.ts';
import { AppSize } from '../../../../types/ui.ts';

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
  if (!layoutWidth || !getIsValidNumber(touchOffsetX)) {
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
