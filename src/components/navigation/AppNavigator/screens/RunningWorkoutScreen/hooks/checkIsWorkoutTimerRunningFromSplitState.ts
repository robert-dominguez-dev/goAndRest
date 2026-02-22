import {
  WorkoutTimerComputedState,
  WorkoutTimerPersistedState,
} from '../types.ts';
import { checkIsWorkoutTimerRunning } from './checkIsWorkoutTimerRunning.ts';

export const checkIsWorkoutTimerRunningFromSplitState = (
  persistedState: WorkoutTimerPersistedState | null,
  computedState: WorkoutTimerComputedState | null,
): boolean =>
  !!persistedState &&
  checkIsWorkoutTimerRunning({
    isPaused: persistedState.isPaused,
    isFinished: !!computedState?.isFinished,
  });
