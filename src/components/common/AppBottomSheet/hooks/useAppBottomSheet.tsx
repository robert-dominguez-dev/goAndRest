import { useState } from 'react';
import { AppBottomSheet, AppBottomSheetProps } from '../AppBottomSheet.tsx';

export type OpenAppBottomSheetParams = Omit<
  AppBottomSheetProps,
  'onClose' | 'hidden'
>;

export const useAppBottomSheet = () => {
  const [params, setParams] = useState<OpenAppBottomSheetParams | null>(null);
  const [hidden, setHidden] = useState(false);

  const handleClose = () => setParams(null);

  const handleOpen = (newParams: OpenAppBottomSheetParams) => {
    setHidden(false);
    setParams(newParams);
  };

  const bottomSheet = params ? (
    <AppBottomSheet
      {...params}
      hidden={hidden}
      onClose={handleClose}
    />
  ) : null;

  return {
    bottomSheet,
    handleOpen,
    handleClose,
    setHidden,
    isOpen: params !== null,
  };
};
