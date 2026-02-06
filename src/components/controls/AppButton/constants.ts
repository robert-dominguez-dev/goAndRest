import { AppButtonDisabledDependentProps } from './types.ts';
import { AppGradientColorUnion } from '../../../constants/colors.ts';

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
    backgroundColorStatus: 'primaryMuted',
  },
  secondary: {
    textColorStatus: 'secondary',
    backgroundColorStatus: 'secondaryMuted',
  },
  negative: {
    textColorStatus: 'negative',
    backgroundColorStatus: 'negativeMuted',
  },
};
