import { AppWorkoutConfig } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { RunningWorkoutScreenLayoutProps } from './RunningWorkoutScreenLayout.tsx';

export enum RunningWorkoutPhase {
  WARMUP = 'WARMUP',
  WORK = 'WORK',
  REST = 'REST',
  RECOVERY = 'RECOVERY',
  COOLDOWN = 'COOLDOWN',
}

export type AppRunningWorkoutConfig = AppWorkoutConfig & {
  warmup: number;
  cooldown: number;
};

/**
 * Persisted state part needed for leaving the app...
 */
export type WorkoutTimerPersistedState = {
  workoutConfig: AppRunningWorkoutConfig;
  workoutName: string;
  startedAt: number;
  totalPausedTime: number;
  pausedAt: number | null;
  isPaused: boolean;
};

/**
 * Dynamic state part changing every second...
 */
export type WorkoutTimerComputedState = {
  currentPhase: RunningWorkoutPhase;
  currentRound: number;
  currentSeries: number;
  phaseRemainingMs: number;
  phaseElapsedMs: number;
  totalElapsedMs: number;
  totalDurationMs: number;
  isFinished: boolean;
};

export type WorkoutTimerState = WorkoutTimerPersistedState &
  WorkoutTimerComputedState;

export type RunningWorkoutContentParams = {
  currentState: WorkoutTimerState;
  isRunning: boolean;
};

export type RunningWorkoutScreenCommonProps = Pick<
  RunningWorkoutScreenLayoutProps,
  'onFinish'
>;
