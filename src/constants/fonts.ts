import { AppSize, AppTextCategoryUnion } from '../types/ui.ts';
import { IS_ANDROID } from './common.ts';

enum FontName {
  Bangers = 'Bangers-Regular',
  Montserrat = 'Montserrat-Medium',
  MontserratThin = 'Montserrat-Regular',
  MontserratBold = 'Montserrat-Bold',
  MontserratBlack = 'Montserrat-Black',
}

type FontCategoryStyle = {
  fontFamily: FontName;
  fontSize: AppSize;
  lineHeight?: AppSize;
  minHeight?: AppSize;
  paddingRight?: AppSize;
};

export const fontCategoryStyles: Record<
  AppTextCategoryUnion,
  FontCategoryStyle
> = {
  header: {
    fontFamily: FontName.Bangers,
    fontSize: AppSize.l,
    lineHeight: AppSize.xl,
    minHeight: AppSize.xl,
    paddingRight: IS_ANDROID ? undefined : AppSize.xs,
  },
  subHeader: {
    fontFamily: FontName.Bangers,
    fontSize: AppSize.ml,
    lineHeight: AppSize.l,
    minHeight: AppSize.l,
    paddingRight: IS_ANDROID ? undefined : AppSize.xs,
  },
  title: {
    fontFamily: FontName.Bangers,
    fontSize: AppSize.m,
    lineHeight: AppSize.ml,
    minHeight: AppSize.ml,
    paddingRight: IS_ANDROID ? undefined : AppSize.xxs,
  },
  log: {
    fontFamily: FontName.Bangers,
    fontSize: AppSize.m,
    lineHeight: AppSize.m,
    minHeight: AppSize.m,
    paddingRight: AppSize.xxs,
  },
  content: {
    fontFamily: FontName.Montserrat,
    fontSize: AppSize.m,
  },
  contentBold: {
    fontFamily: FontName.MontserratBold,
    fontSize: AppSize.m,
  },
};
