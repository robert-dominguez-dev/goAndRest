import { ReactNode } from 'react';
import { AppBottomSheetContentProps } from './components/AppBottomSheetContent.tsx';

type BottomSheetHeaderProps =
  | {
      closeable?: boolean;
      bottomSheetTitle: string;
      bottomSheetHeaderOverride?: never;
    }
  | {
      closeable?: never;
      bottomSheetTitle?: never;
      bottomSheetHeaderOverride: AppBottomSheetContentProps['headerOverride'];
    };

export type AppBottomSheetProps = Pick<
  AppBottomSheetContentProps,
  | 'onClose'
  | 'bottomSheetSubmitButtonProps'
  | 'scrollable'
  | 'backgroundColorStatus'
> &
  BottomSheetHeaderProps & {
    isVisible: boolean;
    bottomSheetContent: ReactNode;
  };
