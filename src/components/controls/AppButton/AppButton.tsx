import { Pressable, PressableProps } from 'react-native';

import { AppButtonUI, AppButtonUIProps } from './components/AppButtonUI.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';
import { getPressableOpacity } from '../helpers/getPressableOpacity.ts';

export type AppButtonProps = Pick<PressableProps, 'onPress'> &
  Pick<
    AppButtonUIProps,
    'label' | 'value' | 'backgroundColorStatus' | 'IconComponent'
  > & { disabled?: boolean };

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
      const opacity = getPressableOpacity({
        disabled,
        pressed,
      });

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
