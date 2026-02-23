import { useEffect, useRef } from 'react';
import { useAppVibrations, VibrationPattern } from './useAppVibrations.ts';

export const useVibrateOnMount = (duration: VibrationPattern) => {
  const { vibrate, stopVibration } = useAppVibrations();

  const didAlreadyVibrateRef = useRef<boolean>(false);

  useEffect(() => {
    if (didAlreadyVibrateRef.current) {
      return undefined;
    }

    vibrate(duration);
    didAlreadyVibrateRef.current = true;

    return () => {
      stopVibration();
    };
  }, []);
};
