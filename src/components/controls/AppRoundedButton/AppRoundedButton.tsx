import { Pressable, PressableProps } from 'react-native';
import { getOnPressWithHapticFeedback } from '../helpers/getOnPressWithHapticFeedback.ts';
import { ACTIVE_OPACITY, PRESSED_OPACITY } from '../../../constants/ui.ts';
import { AppView } from '../../common/AppView.tsx';
import { ChildrenProp } from '../../../types/common.ts';
import {
  AppViewWithGradientBorder,
  AppViewWithGradientBorderProps,
} from '../../common/AppViewWithGradientBorder.tsx';
import {
  AppRoundedButtonSize,
  AppRoundedButtonSizeUnion,
} from './constants.ts';

type AppRoundedButtonProps = Pick<PressableProps, 'onPress' | 'disabled'> &
  ChildrenProp & {
    status: AppViewWithGradientBorderProps['gradientBorderColorStatus'];
    size: AppRoundedButtonSizeUnion;
  };

export const AppRoundedButton = ({
  onPress,
  disabled,
  status,
  size,
  children,
}: AppRoundedButtonProps) => {
  return (
    <Pressable
      onPress={getOnPressWithHapticFeedback(onPress)}
      disabled={disabled}>
      {({ pressed }) => {
        const opacity: number = pressed ? PRESSED_OPACITY : ACTIVE_OPACITY;
        const buttonSize = AppRoundedButtonSize[size];
        const borderRadius = buttonSize / 2;

        return (
          <AppViewWithGradientBorder
            width={buttonSize}
            height={buttonSize}
            borderRadius={borderRadius}
            opacity={opacity}
            gradientBorderColorStatus={status}>
            <AppView
              width={buttonSize}
              height={buttonSize}
              borderRadius={borderRadius}
              backgroundColorStatus={'primary'}
              alignItems={'center'}
              justifyContent={'center'}>
              {children}
            </AppView>
          </AppViewWithGradientBorder>
        );
      }}
    </Pressable>
  );
};
