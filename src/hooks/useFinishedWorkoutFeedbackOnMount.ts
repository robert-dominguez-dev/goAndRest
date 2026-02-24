import { useEffect, useRef } from 'react';
import { useAppVibrations } from './useAppVibrations.ts';
import { getWorkoutSoundByKey } from '../helpers/getWorkoutSoundByKey.ts';

export const useFinishedWorkoutFeedbackOnMount = () => {
  const { vibrate, stopVibration } = useAppVibrations();

  const didAlreadyMakeFeedbackRef = useRef<boolean>(false);

  useEffect(() => {
    if (didAlreadyMakeFeedbackRef.current) {
      return undefined;
    }

    vibrate('WORKOUT_FINISH');

    const halfSound = getWorkoutSoundByKey('finish');
    halfSound?.play();

    didAlreadyMakeFeedbackRef.current = true;

    return () => {
      stopVibration();
      halfSound?.stop();
    };
  }, []);
};
