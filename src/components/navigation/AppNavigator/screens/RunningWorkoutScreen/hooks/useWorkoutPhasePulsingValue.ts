import {
  cancelAnimation,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ONE_SECOND_MS } from '../../../../../../constants/common.ts';
import { useEffect } from 'react';
import { WithTimingConfig } from 'react-native-reanimated/src/animation/timing.ts';

const UNLIMITED_NUMBER_OF_REPS = -1;

export type UseWorkoutPhasePulsingValueParams = {
  from?: number;
  to?: number;
  enabled: boolean;
  timingConfig?: WithTimingConfig;
};

/**
 * A hook that toggles a value between 'from' and 'to' and back.
 * Useful for pulsing alerts, focus indicators, or "active" states.
 */
export const useWorkoutPhasePulsingValue = ({
  enabled,
  timingConfig,
  from = 0.05,
  to = 0.3,
}: UseWorkoutPhasePulsingValueParams) => {
  const animatedValue = useSharedValue(from);

  useEffect(() => {
    cancelAnimation(animatedValue);

    if (enabled) {
      animatedValue.value = from;
      animatedValue.value = withRepeat(
        withTiming(to, timingConfig),
        UNLIMITED_NUMBER_OF_REPS,
        true,
      );
    } else {
      animatedValue.value = withTiming(from, {
        duration: ONE_SECOND_MS / 2,
      });
    }
  }, [timingConfig, enabled, from, to, animatedValue]);

  return animatedValue;
};
