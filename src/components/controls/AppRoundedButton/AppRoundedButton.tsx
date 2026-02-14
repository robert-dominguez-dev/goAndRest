import { Pressable, PressableProps } from 'react-native';
import { getOnPressWithHapticFeedbackConditionally } from '../helpers/getOnPressWithHapticFeedbackConditionally.ts';
import {
  AppRoundedButtonUI,
  AppRoundedButtonUIProps,
} from './AppRoundedButtonUI.tsx';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

export type AppRoundedButtonProps = Pick<PressableProps, 'onPress'> &
  Omit<AppRoundedButtonUIProps, 'pressed'>;

export const AppRoundedButton = ({
  onPress,
  ...props
}: AppRoundedButtonProps) => (
  <Pressable
    onPress={getOnPressWithHapticFeedbackConditionally(
      onPress,
      HapticFeedbackTypes.selection,
    )}
    disabled={props.disabled}>
    {({ pressed }) => (
      <AppRoundedButtonUI
        {...props}
        pressed={pressed}
      />
    )}
  </Pressable>
);
