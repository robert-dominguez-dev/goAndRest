import { AppView, AppViewProps } from '../../AppView.tsx';
import { sizes } from '../../../../constants/ui.ts';
import { Pressable, PressableProps } from 'react-native';
import { getOnPressWithHapticFeedback } from '../../../controls/helpers/getOnPressWithHapticFeedback.ts';

export type AppHeaderAccessoryContainerProps = Pick<
  AppViewProps,
  'children' | 'alignItems'
> &
  Pick<PressableProps, 'onPress'>;

export const AppHeaderAccessoryContainer = ({
  children,
  alignItems,
  onPress,
}: AppHeaderAccessoryContainerProps) => (
  <Pressable onPress={getOnPressWithHapticFeedback(onPress)}>
    <AppView
      width={sizes.headerAccessoryWidth}
      justifyContent={'center'}
      alignItems={alignItems}>
      {children}
    </AppView>
  </Pressable>
);
