import { useCallback, useEffect, useState } from 'react';
import Orientation, {
  OrientationType,
  useOrientationChange,
} from 'react-native-orientation-locker';
import { handleAppOrientation } from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/helpers/handleAppOrientation.tsx';
import { AppOrientation } from '../types/common.ts';

export const useAppOrientation = (shouldLockOrientationOnChange?: boolean) => {
  const [appOrientation, setAppOrientation] =
    useState<AppOrientation>('PORTRAIT');

  const changeToPortrait = () => {
    if (shouldLockOrientationOnChange) {
      Orientation.lockToPortrait();
    }
    setAppOrientation('PORTRAIT');
  };

  const changeToLandscape = () => {
    if (shouldLockOrientationOnChange) {
      Orientation.lockToLandscape();
    }
    setAppOrientation('LANDSCAPE');
  };

  const toggleOrientation = () =>
    Orientation.getOrientation(currentOrientation =>
      handleAppOrientation({
        orientation: currentOrientation,
        onIsPortrait: changeToLandscape,
        onIsLandscape: changeToPortrait,
      }),
    );

  const handleOrientationChange = useCallback(
    (orientation: OrientationType) =>
      handleAppOrientation({
        orientation: orientation,
        onIsPortrait: changeToPortrait,
        onIsLandscape: changeToLandscape,
      }),
    [],
  );

  useOrientationChange(handleOrientationChange);

  useEffect(
    () => Orientation.getOrientation(handleOrientationChange),
    [handleOrientationChange],
  );

  return {
    appOrientation,
    toggleOrientation,
    changeToPortrait,
    changeToLandscape,
  };
};
