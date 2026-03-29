import { useEndRunningWorkoutPopUp } from './hooks/useEndRunningWorkoutPopUp.tsx';
import { RunningWorkoutScreenLayout } from './RunningWorkoutScreenLayout.tsx';
import { RunningWorkoutScreenCommonProps } from './types.ts';
import { useAppOrientation } from '../../../../../hooks/useAppOrientation.tsx';

export const RunningWorkoutScreenTablet = ({
  onFinish,
}: RunningWorkoutScreenCommonProps) => {
  const { appOrientation } = useAppOrientation();

  const { popUp, openEndWorkoutPopUp } = useEndRunningWorkoutPopUp();

  return (
    <>
      <RunningWorkoutScreenLayout
        orientation={appOrientation}
        onHeaderAccessoryLeftPress={openEndWorkoutPopUp}
        onFinish={onFinish}
      />
      {popUp}
    </>
  );
};
