import {
  OpenAppBottomSheetParams,
  useAppBottomSheet,
} from '../components/common/AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { useLastValueSnapshot } from '../components/navigation/AppNavigator/screens/LandingScreen/components/WorkoutConfigButtons/hooks/useLastValueSnapshot.tsx';

type UseSliderBottomSheetParams = {
  getDuration: () => number;
  setDuration: (value: number) => void;
};

export const useSliderBottomSheet = ({
  getDuration,
  setDuration,
}: UseSliderBottomSheetParams) => {
  const { takeSnapshot, clearSnapshot, revertChanges } =
    useLastValueSnapshot(setDuration);

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
    takeSnapshot(getDuration());
    handleOpen(params);
  };

  return { bottomSheet, open, confirm, revert };
};
