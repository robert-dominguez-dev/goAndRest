import {
  cancelAnimation,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ONE_SECOND_MS } from '../../../../../../constants/common.ts';
import { useEffect } from 'react';
import { RunningWorkoutPhase } from '../types.ts';
import { workoutPhaseToPulsingAnimationConfig } from '../constants.ts';

const UNLIMITED_NUMBER_OF_REPS = -1;

export type UseWorkoutPhasePulsingValueParams = {
  workoutPhase: RunningWorkoutPhase;
  from: number;
  to: number;
  enabled: boolean;
};

/**
 * A hook that toggles a value between 'from' and 'to' and back.
 * Useful for pulsing alerts, focus indicators, or "active" states.
 */
export const useWorkoutPhasePulsingValue = ({
  workoutPhase,
  from,
  to,
  enabled,
}: UseWorkoutPhasePulsingValueParams) => {
  const animatedValue = useSharedValue(from);

  useEffect(() => {
    cancelAnimation(animatedValue);

    if (enabled) {
      animatedValue.value = from;
      animatedValue.value = withRepeat(
        withTiming(to, workoutPhaseToPulsingAnimationConfig[workoutPhase]),
        UNLIMITED_NUMBER_OF_REPS,
        true,
      );
    } else {
      animatedValue.value = withTiming(from, {
        duration: ONE_SECOND_MS / 2,
      });
    }
  }, [workoutPhase, enabled, from, to, animatedValue]);

  return animatedValue;
};
