import { Modal } from 'react-native';
import { AppView } from '../AppView/AppView.tsx';
import {
  AppBottomSheetContent,
  AppBottomSheetContentProps,
} from './components/AppBottomSheetContent.tsx';
import { AppKeyboardAvoidingView } from '../AppKeyboardAvoidingView.tsx';
import { useIsFocused } from '@react-navigation/native';
import { JSX } from 'react';

type AppBottomSheetRenderContentParams = Pick<
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
  closeable?: boolean;
  renderContent: (params: AppBottomSheetRenderContentParams) => JSX.Element;
};

export const AppBottomSheet = ({
  onClose,
  renderContent,
  closeable,
  title,
  scrollable,
  backgroundColorStatus,
  AccessoryRightIconComponent,
  onAccessoryRightPress,
}: AppBottomSheetProps) => {
  const isFocused = useIsFocused();

  const contentElement = renderContent({ onClose });

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={isFocused}
      animationType={'slide'}>
      <AppView
        grow
        justifyContent={'flex-end'}>
        <AppKeyboardAvoidingView>
          <AppBottomSheetContent
            title={title}
            closeable={closeable}
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
