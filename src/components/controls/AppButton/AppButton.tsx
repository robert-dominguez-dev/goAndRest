import { Pressable } from 'react-native';

import { AppButtonUI, AppButtonUIProps } from './components/AppButtonUI.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';
import { getPressableOpacity } from '../helpers/getPressableOpacity.ts';

export type AppButtonProps = Pick<
  AppButtonUIProps,
  | 'label'
  | 'value'
  | 'backgroundColorStatus'
  | 'borderColorStatus'
  | 'borderStyle'
  | 'IconComponent'
  | 'category'
> & { onPress?: () => void; disabled?: boolean };

export const AppButton = ({
  label,
  value,
  onPress,
  disabled,
  IconComponent,
  borderColorStatus,
  borderStyle,
  category = 'subHeader',
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
          borderColorStatus={borderColorStatus}
          borderStyle={borderStyle}
          IconComponent={IconComponent}
          category={category}
          textColorStatus={'text'}
        />
      );
    }}
  </Pressable>
);
