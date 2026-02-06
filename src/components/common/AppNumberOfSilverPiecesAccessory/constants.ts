import { AppAccessorySizeUnion } from './types.ts';
import { AppDimensions, AppTextCategoryUnion } from '../../../types/ui.ts';
import { sizes } from '../../../constants/ui.ts';

export const accessorySizeUnionToDimensions: Record<
  AppAccessorySizeUnion,
  AppDimensions
> = {
  small: {
    width: sizes.tinySilverPieceWidth,
    height: sizes.tinySilverPieceHeight,
  },
  medium: {
    width: sizes.smallSilverPieceWidth,
    height: sizes.smallSilverPieceHeight,
  },
  large: {
    width: sizes.bigSilverPieceWidth,
    height: sizes.bigSilverPieceHeight,
  },
};

export const accessorySizeUnionToTextCategory: Record<
  AppAccessorySizeUnion,
  AppTextCategoryUnion
> = {
  small: 'title',
  medium: 'subHeader',
  large: 'header',
};
