import { clamp } from 'lodash';
import { ONE_SECOND_MS } from '../constants/common.ts';
import {
  WorkoutTimerComputedState,
  WorkoutTimerPersistedState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { calculateStickyShiftInSeconds } from './calculateStickyShiftInSeconds.ts';

export const calculateSkipState = (
  persistedState: WorkoutTimerPersistedState,
  computedState: WorkoutTimerComputedState,
  secondsToSkip: number,
): WorkoutTimerPersistedState => {
  const {
    totalElapsedSeconds,
    totalDurationSeconds,
    phaseRemainingSeconds,
    phaseElapsedSeconds,
  } = computedState;

  const secondsToShift = calculateStickyShiftInSeconds({
    secondsToSkip,
    phaseRemainingSeconds,
    phaseElapsedSeconds,
  });

  const targetElapsed = clamp(
    totalElapsedSeconds + secondsToShift,
    0,
    totalDurationSeconds,
  );

  const actualShiftMs: number =
    (targetElapsed - totalElapsedSeconds) * ONE_SECOND_MS;

  return {
    ...persistedState,
    totalPausedTime: persistedState.totalPausedTime - actualShiftMs,
  };
};
