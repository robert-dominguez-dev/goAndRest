import { clamp } from 'lodash';
import {
  WorkoutTimerComputedState,
  WorkoutTimerPersistedState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { calculateStickyShiftInMs } from './calculateStickyShiftInMs.ts';

export const calculateSkipState = (
  persistedState: WorkoutTimerPersistedState,
  computedState: WorkoutTimerComputedState,
  msToSkip: number,
): WorkoutTimerPersistedState => {
  const { totalElapsedMs, totalDurationMs, phaseRemainingMs, phaseElapsedMs } =
    computedState;

  const msToShift = calculateStickyShiftInMs({
    msToSkip,
    phaseRemainingMs,
    phaseElapsedMs,
  });

  const targetElapsed = clamp(totalElapsedMs + msToShift, 0, totalDurationMs);

  const actualShiftMs: number = targetElapsed - totalElapsedMs;

  return {
    ...persistedState,
    totalPausedTime: persistedState.totalPausedTime - actualShiftMs,
  };
};
