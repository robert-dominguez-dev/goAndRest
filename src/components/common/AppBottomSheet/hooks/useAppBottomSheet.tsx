import { JSX, useState } from 'react';
import { AppBottomSheet, AppBottomSheetProps } from '../AppBottomSheet.tsx';

export type OpenAppBottomSheetParams = Omit<AppBottomSheetProps, 'onClose'>;

export const useAppBottomSheet = () => {
  const [bottomSheet, setBottomSheet] = useState<JSX.Element | null>(null);

  const handleClose = () => setBottomSheet(null);

  const handleOpen = (params: OpenAppBottomSheetParams) =>
    setBottomSheet(
      <AppBottomSheet
        {...params}
        onClose={handleClose}
      />,
    );

  return { bottomSheet, handleOpen, handleClose };
};
