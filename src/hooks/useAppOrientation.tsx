import { useCallback, useEffect, useState } from 'react';
import Orientation, {
  OrientationType,
  useOrientationChange,
} from 'react-native-orientation-locker';
import { handleAppOrientation } from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/helpers/handleAppOrientation.tsx';
import { AppOrientation } from '../types/common.ts';

export const useAppOrientation = (shouldKeepOrientationLocked?: boolean) => {
  const [appOrientation, setAppOrientation] =
    useState<AppOrientation>('PORTRAIT');

  const changeToPortrait = () => {
    if (shouldKeepOrientationLocked) {
      Orientation.lockToPortrait();
    }
    setAppOrientation('PORTRAIT');
  };

  const changeToLandscape = () => {
    if (shouldKeepOrientationLocked) {
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

  useOrientationChange(orientation => {
    if (shouldKeepOrientationLocked) {
      return undefined;
    }
    handleOrientationChange(orientation);
  });

  useEffect(() => {
    if (shouldKeepOrientationLocked) {
      return undefined;
    }
    Orientation.getOrientation(handleOrientationChange);
  }, [handleOrientationChange]);

  return {
    appOrientation,
    toggleOrientation,
    changeToPortrait,
    changeToLandscape,
  };
};
