import { AppView } from '../AppView.tsx';
import { AppBottomSheetContent } from './components/AppBottomSheetContent.tsx';
import { AppKeyboardAvoidingView } from '../AppKeyboardAvoidingView.tsx';
import { AppBottomSheetProps } from './types.ts';
import { FILL_CONTAINER_DIMENSION } from '../../../constants/common.ts';

export const AppBottomSheetStatic = ({
  onClose,
  closeable,
  bottomSheetTitle,
  bottomSheetHeaderOverride,
  bottomSheetContent,
  bottomSheetSubmitButtonProps,
  scrollable,
}: Omit<AppBottomSheetProps, 'isVisible'>) => (
  <AppView
    height={FILL_CONTAINER_DIMENSION}
    width={FILL_CONTAINER_DIMENSION}
    position={'absolute'}
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
);
