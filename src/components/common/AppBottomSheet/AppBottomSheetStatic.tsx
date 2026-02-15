import { AppView } from '../AppView/AppView.tsx';
import { AppBottomSheetContent } from './components/AppBottomSheetContent.tsx';
import { AppKeyboardAvoidingView } from '../AppKeyboardAvoidingView.tsx';
import { AppBottomSheetProps } from './types.ts';
import { FILL_CONTAINER_DIMENSION } from '../../../constants/common.ts';

export const AppBottomSheetStatic = ({
  onClose,
  closeable,
  bottomSheetTitle,
  bottomSheetContent,
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
        closeable={closeable}
        onClose={onClose}
        scrollable={scrollable}>
        {bottomSheetContent}
      </AppBottomSheetContent>
    </AppKeyboardAvoidingView>
  </AppView>
);
