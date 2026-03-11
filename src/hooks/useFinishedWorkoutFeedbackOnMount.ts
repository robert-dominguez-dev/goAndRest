import { useEffect, useRef } from 'react';
import { useAppVibrations } from './useAppVibrations.ts';
import { usePlayWorkoutSoundByKey } from './usePlayWorkoutSoundByKey.ts';
import { useAtomValue } from 'jotai';
import { runningWorkoutStateAtom } from '../contexts/atoms.ts';

export const useFinishedWorkoutFeedbackOnMount = () => {
  const persistedState = useAtomValue(runningWorkoutStateAtom);

  const { vibrate, stopVibration } = useAppVibrations();

  const playWorkoutSoundByKey = usePlayWorkoutSoundByKey();

  const didAlreadyMakeFeedbackRef = useRef<boolean>(false);

  useEffect(() => {
    /**
     * It's mount also on running workout screen,
     * so we need an additional check,
     * that the `persistedState` is null...
     */
    if (didAlreadyMakeFeedbackRef.current || !!persistedState) {
      return undefined;
    }

    vibrate('WORKOUT_FINISH');
    void playWorkoutSoundByKey({ soundKey: 'finish' });

    didAlreadyMakeFeedbackRef.current = true;

    return () => {
      stopVibration();
    };
  }, []);
};
