import { AppSize } from '../../../types/ui.ts';

export enum AppRoundedButtonSize {
  l = 100,
  m = 80,
  s = 60,
}

export type AppRoundedButtonSizeUnion = keyof typeof AppRoundedButtonSize;

export type AppRoundedButtonBorderRadiusLevel = 'small' | 'full';

export const roundedButtonToIconSize: Record<
  AppRoundedButtonSizeUnion,
  number
> = {
  s: AppSize.ml,
  m: AppSize.l,
  l: 40,
};
