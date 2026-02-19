import { Modal } from 'react-native';
import { AppView } from '../AppView/AppView.tsx';
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
> & {
  renderContent: (params: AppBottomSheetRenderContentProps) => JSX.Element;
  shouldCloseOnOverlayPress?: boolean;
};

export const AppBottomSheet = ({
  onClose,
  renderContent,
  title,
  scrollable,
  backgroundColorStatus,
  AccessoryRightIconComponent,
  onAccessoryRightPress,
  shouldCloseOnOverlayPress = !title,
}: AppBottomSheetProps) => {
  const contentElement = renderContent({ onClose });

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType={'slide'}>
      <AppView
        onTouchEnd={shouldCloseOnOverlayPress ? onClose : undefined}
        grow
        justifyContent={'flex-end'}>
        <AppKeyboardAvoidingView>
          <AppBottomSheetContent
            title={title}
            onClose={onClose}
            scrollable={scrollable}
            backgroundColorStatus={backgroundColorStatus}
            AccessoryRightIconComponent={AccessoryRightIconComponent}
            onAccessoryRightPress={onAccessoryRightPress}>
            {contentElement}
          </AppBottomSheetContent>
        </AppKeyboardAvoidingView>
      </AppView>
    </Modal>
  );
};
