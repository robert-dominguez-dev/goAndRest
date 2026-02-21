import { WorkoutTimerState } from '../types.ts';

export const checkIsWorkoutTimerRunning = (
  currentState: WorkoutTimerState | null,
): boolean =>
  !!currentState && !currentState?.isPaused && !currentState?.isFinished;
