import { AppGradientColorUnion } from '../../../constants/colors.ts';
import { AppColorUnion } from '../../../types/ui.ts';

export const appButtonStatusToBackgroundColorStatus: Record<
  AppGradientColorUnion,
  AppColorUnion
> = {
  primary: 'primary',
  secondary: 'secondary',
  negative: 'negative',
};
