import { AppSize, AppTextCategoryUnion } from '../types/ui.ts';

enum FontName {
  BarlowCondensedLight = 'BarlowCondensed-Light',
  BarlowCondensedRegular = 'BarlowCondensed-Regular',
  BarlowCondensedMedium = 'BarlowCondensed-Medium',
  BarlowCondensedSemiBold = 'BarlowCondensed-SemiBold',
  BarlowCondensedBold = 'BarlowCondensed-Bold',
  BarlowCondensedExtraBold = 'BarlowCondensed-ExtraBold',
  BarlowCondensedBlack = 'BarlowCondensed-Black',
}

type FontCategoryStyle = {
  fontFamily: FontName;
  fontSize: number;
  lineHeight?: number;
};

export const fontCategoryStyles: Record<
  AppTextCategoryUnion,
  FontCategoryStyle
> = {
  header: {
    fontFamily: FontName.BarlowCondensedBlack,
    fontSize: 36,
    lineHeight: 40,
  },
  subHeader: {
    fontFamily: FontName.BarlowCondensedBlack,
    fontSize: AppSize.ml,
  },
  title: {
    fontFamily: FontName.BarlowCondensedBlack,
    fontSize: 20,
  },
  contentBold: {
    fontFamily: FontName.BarlowCondensedSemiBold,
    fontSize: 18,
  },
  content: {
    fontFamily: FontName.BarlowCondensedRegular,
    fontSize: 18,
  },
};
