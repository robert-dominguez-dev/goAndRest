import {
  ACTIVE_OPACITY,
  INACTIVE_OPACITY,
  PRESSED_OPACITY,
} from '../../../../constants/ui.ts';
import {
  AppRoundedButtonBorderRadiusLevel,
  AppRoundedButtonSize,
  AppRoundedButtonSizeUnion,
} from '../constants.ts';
import { gradientToStandardColorStatus } from '../../../../constants/colors.ts';
import { AppViewWithGradientBorderProps } from '../../../common/AppViewWithGradientBorder.tsx';
import { AppViewProps } from '../../../common/AppView/AppView.tsx';

const borderRadiusLevelToDivider: Record<
  AppRoundedButtonBorderRadiusLevel,
  number
> = {
  small: 6,
  full: 2,
};

export type GetAppRoundedButtonUIPropsParams = {
  pressed: boolean;
  disabled?: boolean;
  status: AppViewWithGradientBorderProps['gradientBorderColorStatus'];
  size: AppRoundedButtonSizeUnion;
  borderRadiusLevel?: AppRoundedButtonBorderRadiusLevel;
};

export const getAppRoundedButtonUIProps = ({
  pressed,
  disabled,
  status,
  size,
  borderRadiusLevel = 'full',
}: GetAppRoundedButtonUIPropsParams) => {
  const opacity: number = disabled
    ? INACTIVE_OPACITY
    : pressed
    ? PRESSED_OPACITY
    : ACTIVE_OPACITY;

  const buttonSize = AppRoundedButtonSize[size];

  const borderRadiusDivider = borderRadiusLevelToDivider[borderRadiusLevel];
  const borderRadius = buttonSize / borderRadiusDivider;

  const backgroundColorStatus = gradientToStandardColorStatus[status];

  return {
    width: buttonSize,
    height: buttonSize,
    backgroundColorStatus,
    borderRadius,
    opacity,
  } satisfies Pick<
    AppViewProps,
    'width' | 'height' | 'backgroundColorStatus' | 'borderRadius' | 'opacity'
  >;
};
