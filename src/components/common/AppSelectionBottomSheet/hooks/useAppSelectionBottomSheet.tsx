import { JSX, useState } from 'react';
import {
  AppSelectionBottomSheet,
  AppSelectionBottomSheetProps,
} from '../AppSelectionBottomSheet.tsx';

type UseAppSelectionBottomSheetParams<TValue> = Omit<
  AppSelectionBottomSheetProps<TValue>,
  'onClose'
>;

export const useAppSelectionBottomSheet = () => {
  const [bottomSheet, setBottomSheet] = useState<JSX.Element | null>(null);

  const handleOpen = <TValue,>(
    params: UseAppSelectionBottomSheetParams<TValue>,
  ) =>
    setBottomSheet(
      <AppSelectionBottomSheet
        {...params}
        onClose={() => setBottomSheet(null)}
      />,
    );

  return { bottomSheet, handleOpen };
};
