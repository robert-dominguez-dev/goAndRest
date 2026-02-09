import { Pressable, PressableProps } from 'react-native';
import { getOnPressWithHapticFeedback } from '../helpers/getOnPressWithHapticFeedback.ts';
import {
  AppRoundedButtonUI,
  AppRoundedButtonUIProps,
} from './AppRoundedButtonUI.tsx';

export type AppRoundedButtonProps = Pick<
  PressableProps,
  'onPress' | 'disabled'
> &
  Omit<AppRoundedButtonUIProps, 'pressed'>;

export const AppRoundedButton = ({
  onPress,
  disabled,
  ...props
}: AppRoundedButtonProps) => (
  <Pressable
    onPress={getOnPressWithHapticFeedback(onPress)}
    disabled={disabled}>
    {({ pressed }) => (
      <AppRoundedButtonUI
        {...props}
        pressed={pressed}
      />
    )}
  </Pressable>
);
