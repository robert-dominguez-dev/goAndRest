import { Pressable, PressableProps } from 'react-native';
import { getOnPressWithHapticFeedback } from '../helpers/getOnPressWithHapticFeedback.ts';
import {
  AppRoundedButtonUI,
  AppRoundedButtonUIProps,
} from './AppRoundedButtonUI.tsx';

export type AppRoundedButtonProps = Pick<PressableProps, 'onPress'> &
  Omit<AppRoundedButtonUIProps, 'pressed'>;

export const AppRoundedButton = ({
  onPress,
  ...props
}: AppRoundedButtonProps) => (
  <Pressable
    onPress={getOnPressWithHapticFeedback(onPress)}
    disabled={props.disabled}>
    {({ pressed }) => (
      <AppRoundedButtonUI
        {...props}
        pressed={pressed}
      />
    )}
  </Pressable>
);
