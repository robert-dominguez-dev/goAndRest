import { Modal, Pressable } from 'react-native';
import {
  AppBottomSheetContent,
  AppBottomSheetContentProps,
} from './components/AppBottomSheetContent.tsx';
import { AppKeyboardAvoidingView } from '../AppKeyboardAvoidingView.tsx';
import { JSX } from 'react';

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
  | 'AccessoryRightIconComponent'
  | 'onAccessoryRightPress'
  | 'onBottomSheetPress'
> & {
  renderContent: (params: AppBottomSheetRenderContentProps) => JSX.Element;
  onOverlayPress?: () => void;
};

export const AppBottomSheet = ({
  onClose,
  renderContent,
  title,
  scrollable,
  backgroundColorStatus,
  AccessoryRightIconComponent,
  onAccessoryRightPress,
  onOverlayPress,
  onBottomSheetPress,
}: AppBottomSheetProps) => {
  const contentElement = renderContent({ onClose });

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType={'slide'}>
      <Pressable
        onPress={onOverlayPress}
        style={{ flex: 1, justifyContent: 'flex-end' }}>
        <AppKeyboardAvoidingView>
          <AppBottomSheetContent
            title={title}
            onClose={onClose}
            onBottomSheetPress={onBottomSheetPress}
            scrollable={scrollable}
            backgroundColorStatus={backgroundColorStatus}
            AccessoryRightIconComponent={AccessoryRightIconComponent}
            onAccessoryRightPress={onAccessoryRightPress}>
            {contentElement}
          </AppBottomSheetContent>
        </AppKeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};
