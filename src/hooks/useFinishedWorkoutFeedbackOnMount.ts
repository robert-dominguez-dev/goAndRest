import { useEffect, useRef } from 'react';
import { useAppVibrations } from './useAppVibrations.ts';
import { usePlayWorkoutSoundByKey } from './usePlayWorkoutSoundByKey.ts';

export const useFinishedWorkoutFeedbackOnMount = () => {
  const { vibrate, stopVibration } = useAppVibrations();

  const playWorkoutSoundByKey = usePlayWorkoutSoundByKey();

  const didAlreadyMakeFeedbackRef = useRef<boolean>(false);

  useEffect(() => {
    if (didAlreadyMakeFeedbackRef.current) {
      return undefined;
    }

    vibrate('WORKOUT_FINISH');
    void playWorkoutSoundByKey('finish');

    didAlreadyMakeFeedbackRef.current = true;

    return () => {
      stopVibration();
    };
  }, []);
};
