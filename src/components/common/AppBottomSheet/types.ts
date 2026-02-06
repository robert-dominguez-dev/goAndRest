import { ReactNode } from 'react';
import {
  AppBottomSheetContentProps,
  BottomSheetSubmitButtonProps,
} from './components/AppBottomSheetContent.tsx';
import { AppButtonProps } from '../../controls/AppButton/AppButton.tsx';

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
  'onClose' | 'bottomSheetSubmitButtonProps' | 'scrollable'
> &
  BottomSheetHeaderProps & {
    isVisible: boolean;
    bottomSheetContent: ReactNode;
  };

export type AppBottomSheetWithOpenElementProps = Pick<
  AppButtonProps,
  'isPending' | 'disabled' | 'status' | 'enabledLabel' | 'disabledLabel'
> &
  Partial<Pick<AppBottomSheetProps, 'onClose' | 'scrollable'>> & {
    closeable?: boolean;
    bottomSheetTitle: string;
    bottomSheetContent: ReactNode;
    bottomSheetSubmitButtonProps?: BottomSheetSubmitButtonProps;
  };
