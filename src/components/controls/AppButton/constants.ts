import { AppGradientColorUnion } from '../../../types/ui.ts';
import { AppButtonDisabledDependentProps } from './types.ts';

export const appButtonStatusToEnabledBackgroundColorStatus: Record<
  AppGradientColorUnion,
  AppButtonDisabledDependentProps['backgroundColorStatus']
> = {
  primary: 'primary',
  secondary: 'secondary',
  negative: 'negative',
};

export const appButtonStatusToDisabledProps: Record<
  AppGradientColorUnion,
  Pick<
    AppButtonDisabledDependentProps,
    'textColorStatus' | 'backgroundColorStatus'
  >
> = {
  primary: {
    textColorStatus: 'primary',
    backgroundColorStatus: 'primaryLight',
  },
  secondary: {
    textColorStatus: 'secondary',
    backgroundColorStatus: 'secondaryLight',
  },
  negative: {
    textColorStatus: 'negative',
    backgroundColorStatus: 'negativeLight',
  },
};
