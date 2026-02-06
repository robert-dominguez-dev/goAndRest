import { Modal } from 'react-native';
import { AppView } from '../AppView.tsx';
import { AppBottomSheetContent } from './components/AppBottomSheetContent.tsx';
import { AppKeyboardAvoidingView } from '../AppKeyboardAvoidingView.tsx';
import { useIsFocused } from '@react-navigation/native';
import { AppBottomSheetProps } from './types.ts';

export const AppBottomSheet = ({
  isVisible,
  onClose,
  closeable,
  bottomSheetTitle,
  bottomSheetHeaderOverride,
  bottomSheetContent,
  bottomSheetSubmitButtonProps,
  scrollable,
}: AppBottomSheetProps) => {
  const isFocused = useIsFocused();

  const visible = isVisible && isFocused;

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType={'slide'}>
      <AppView
        grow
        justifyContent={'flex-end'}>
        <AppKeyboardAvoidingView>
          <AppBottomSheetContent
            title={bottomSheetTitle}
            headerOverride={bottomSheetHeaderOverride}
            closeable={closeable}
            bottomSheetSubmitButtonProps={bottomSheetSubmitButtonProps}
            onClose={onClose}
            scrollable={scrollable}>
            {bottomSheetContent}
          </AppBottomSheetContent>
        </AppKeyboardAvoidingView>
      </AppView>
    </Modal>
  );
};
