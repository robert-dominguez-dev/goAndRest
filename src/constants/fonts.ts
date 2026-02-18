import { AppSize, AppTextCategoryUnion } from '../types/ui.ts';
import { IS_ANDROID } from './common.ts';

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
  lineHeight?: AppSize;
  minHeight?: AppSize;
  paddingRight?: AppSize;
};

export const fontCategoryStyles: Record<
  AppTextCategoryUnion,
  FontCategoryStyle
> = {
  header: {
    fontFamily: FontName.BarlowCondensedExtraBold,
    fontSize: 36,
    lineHeight: AppSize.xl,
    minHeight: AppSize.xl,
    paddingRight: IS_ANDROID ? undefined : AppSize.xs,
  },
  subHeader: {
    fontFamily: FontName.BarlowCondensedBold,
    fontSize: AppSize.ml,
    lineHeight: AppSize.l,
    minHeight: AppSize.l,
    paddingRight: IS_ANDROID ? undefined : AppSize.xs,
  },
  title: {
    fontFamily: FontName.BarlowCondensedSemiBold,
    fontSize: AppSize.m,
    lineHeight: AppSize.ml,
    minHeight: AppSize.ml,
    paddingRight: IS_ANDROID ? undefined : AppSize.xxs,
  },
  content: {
    fontFamily: FontName.BarlowCondensedRegular,
    fontSize: 20,
  },
};
