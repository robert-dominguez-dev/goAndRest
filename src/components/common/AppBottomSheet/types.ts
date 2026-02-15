import { ReactNode } from 'react';
import { AppBottomSheetContentProps } from './components/AppBottomSheetContent.tsx';

export type AppBottomSheetProps = Pick<
  AppBottomSheetContentProps,
  | 'onClose'
  | 'scrollable'
  | 'backgroundColorStatus'
  | 'AccessoryRightIconComponent'
> & {
  isVisible: boolean;
  closeable?: boolean;
  bottomSheetTitle: AppBottomSheetContentProps['title'];
  bottomSheetContent: ReactNode;
};
