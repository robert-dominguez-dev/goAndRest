import { WorkoutTimerState } from '../types.ts';

export const checkIsWorkoutTimerRunning = (
  currentState: Pick<WorkoutTimerState, 'isPaused' | 'isFinished'> | null,
): boolean =>
  !!currentState && !currentState?.isPaused && !currentState?.isFinished;
