import {
  OpenAppBottomSheetParams,
  useAppBottomSheet,
} from '../components/common/AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { useLastValueSnapshot } from '../components/navigation/AppNavigator/screens/LandingScreen/components/WorkoutConfigButtons/hooks/useLastValueSnapshot.tsx';

type UseSliderBottomSheetParams = {
  getValue: () => number;
  setValue: (value: number) => void;
};

export const useSliderBottomSheet = ({
  getValue,
  setValue,
}: UseSliderBottomSheetParams) => {
  const { takeSnapshot, clearSnapshot, revertChanges } =
    useLastValueSnapshot(setValue);

  const { bottomSheet, handleOpen, handleClose } = useAppBottomSheet();

  const confirm = () => {
    clearSnapshot();
    handleClose();
  };

  const revert = () => {
    revertChanges();
    handleClose();
  };

  const open = (params: OpenAppBottomSheetParams) => {
    takeSnapshot(getValue());
    handleOpen(params);
  };

  return { bottomSheet, open, confirm, revert };
};
