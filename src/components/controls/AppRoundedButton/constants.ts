import { AppGradientColorUnion } from '../../../constants/colors.ts';
import { AppColorUnion } from '../../../types/ui.ts';

export enum AppRoundedButtonSize {
  m = 100,
  s = 60,
}

export type AppRoundedButtonSizeUnion = keyof typeof AppRoundedButtonSize;

export const gradientToStandardColorStatus: Record<
  AppGradientColorUnion,
  AppColorUnion
> = {
  primary: 'primary',
  negative: 'negative',
  grayscale: 'backgroundAlt',
};
