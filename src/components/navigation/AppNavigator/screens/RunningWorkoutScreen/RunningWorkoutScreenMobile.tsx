import { useEndRunningWorkoutPopUp } from './hooks/useEndRunningWorkoutPopUp.tsx';
import { appOrientationToChangeIconName } from './constants.tsx';
import { RunningWorkoutScreenLayout } from './RunningWorkoutScreenLayout.tsx';
import { RunningWorkoutScreenCommonProps } from './types.ts';
import { useAppOrientation } from '../../../../../hooks/useAppOrientation.tsx';

export const RunningWorkoutScreenMobile = ({
  onFinish,
}: RunningWorkoutScreenCommonProps) => {
  const { appOrientation, toggleOrientation, changeToPortrait } =
    useAppOrientation(true);

  const { popUp, openEndWorkoutPopUp } =
    useEndRunningWorkoutPopUp(changeToPortrait);

  const headerAccessoryRightIconName =
    appOrientationToChangeIconName[appOrientation];

  return (
    <>
      <RunningWorkoutScreenLayout
        orientation={appOrientation}
        headerAccessoryRightIconName={headerAccessoryRightIconName}
        onHeaderAccessoryRightPress={toggleOrientation}
        onHeaderAccessoryLeftPress={openEndWorkoutPopUp}
        onFinish={onFinish}
      />
      {popUp}
    </>
  );
};
