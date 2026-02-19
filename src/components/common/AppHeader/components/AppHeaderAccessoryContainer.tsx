import { AppView, AppViewProps } from '../../AppView/AppView.tsx';
import { sizes } from '../../../../constants/ui.ts';
import { Pressable } from 'react-native';
import { getOnPressWithHapticFeedbackConditionally } from '../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';

export type AppHeaderAccessoryContainerProps = Pick<
  AppViewProps,
  'children' | 'alignItems'
> & { onPress?: () => void };

export const AppHeaderAccessoryContainer = ({
  children,
  alignItems,
  onPress,
}: AppHeaderAccessoryContainerProps) => (
  <Pressable onPress={getOnPressWithHapticFeedbackConditionally(onPress)}>
    <AppView
      grow
      width={sizes.headerAccessoryWidth}
      justifyContent={'center'}
      alignItems={alignItems}>
      {children}
    </AppView>
  </Pressable>
);
