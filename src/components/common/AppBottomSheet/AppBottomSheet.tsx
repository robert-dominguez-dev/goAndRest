import { Modal, Pressable } from 'react-native';
import { ALL_SUPPORTED_ORIENTATIONS } from '../../../constants/common.ts';
import {
  AppBottomSheetContent,
  AppBottomSheetContentProps,
} from './components/AppBottomSheetContent.tsx';
import { AppKeyboardAvoidingView } from '../AppKeyboardAvoidingView.tsx';
import { JSX } from 'react';
import { getOnPressWithHapticFeedbackConditionally } from '../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';

export type AppBottomSheetRenderContentProps = Pick<
  AppBottomSheetContentProps,
  'onClose'
>;

export type AppBottomSheetProps = Pick<
  AppBottomSheetContentProps,
  | 'title'
  | 'onClose'
  | 'scrollable'
  | 'backgroundColorStatus'
  | 'accessoryRightIconName'
  | 'onAccessoryRightPress'
  | 'onBottomSheetPress'
> & {
  renderContent: (params: AppBottomSheetRenderContentProps) => JSX.Element;
  onOverlayPress?: () => void;
  hidden?: boolean;
};

export const AppBottomSheet = ({
  onClose,
  renderContent,
  title,
  scrollable,
  backgroundColorStatus,
  accessoryRightIconName,
  onAccessoryRightPress,
  onOverlayPress,
  onBottomSheetPress,
  hidden,
}: AppBottomSheetProps) => {
  const contentElement = renderContent({ onClose });

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={!hidden}
      animationType={'slide'}
      supportedOrientations={ALL_SUPPORTED_ORIENTATIONS}>
      <Pressable
        onPress={getOnPressWithHapticFeedbackConditionally(onOverlayPress)}
        style={{ flex: 1, justifyContent: 'flex-end' }}>
        <AppKeyboardAvoidingView>
          <AppBottomSheetContent
            title={title}
            onClose={onClose}
            onBottomSheetPress={onBottomSheetPress}
            scrollable={scrollable}
            backgroundColorStatus={backgroundColorStatus}
            accessoryRightIconName={accessoryRightIconName}
            onAccessoryRightPress={onAccessoryRightPress}>
            {contentElement}
          </AppBottomSheetContent>
        </AppKeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};
