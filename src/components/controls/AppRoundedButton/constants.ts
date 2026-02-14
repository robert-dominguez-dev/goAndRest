import { AppSize } from '../../../types/ui.ts';

export enum AppRoundedButtonSize {
  l = 100,
  m = 80,
  s = 60,
  xs = 48,
}

export type AppRoundedButtonSizeUnion = keyof typeof AppRoundedButtonSize;

export type AppRoundedButtonBorderRadiusLevel = 'small' | 'full';

export const roundedButtonToIconSize: Record<
  AppRoundedButtonSizeUnion,
  number
> = {
  xs: AppSize.m,
  s: AppSize.ml,
  m: AppSize.l,
  l: 40,
};
