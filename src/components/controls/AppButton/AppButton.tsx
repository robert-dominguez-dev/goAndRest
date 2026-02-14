import { Pressable, PressableProps } from 'react-native';

import { AppButtonUI, AppButtonUIProps } from './components/AppButtonUI.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { ACTIVE_OPACITY, PRESSED_OPACITY } from '../../../constants/ui.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

export type AppButtonProps = Pick<PressableProps, 'onPress' | 'disabled'> &
  Pick<
    AppButtonUIProps,
    'label' | 'value' | 'backgroundColorStatus' | 'IconComponent'
  >;

export const AppButton = ({
  label,
  value,
  onPress,
  disabled,
  IconComponent,
  backgroundColorStatus = 'primary',
}: AppButtonProps) => (
  <Pressable
    onPress={getOnPressWithHapticFeedbackConditionally(
      onPress,
      HapticFeedbackTypes.selection,
    )}
    disabled={disabled}>
    {({ pressed }) => {
      const opacity: number = pressed ? PRESSED_OPACITY : ACTIVE_OPACITY;
      return (
        <AppButtonUI
          label={label}
          value={value}
          opacity={opacity}
          backgroundColorStatus={backgroundColorStatus}
          IconComponent={IconComponent}
          textColorStatus={'text'}
        />
      );
    }}
  </Pressable>
);
