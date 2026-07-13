import type { AppWorkoutConfig } from '../AppWorkoutsProvider/types.ts';

export type WorkoutHistoryEntry = {
  id: string;
  date: number;
  sec: number;
  rounds: number;
  rpe: number | null;
  config?: AppWorkoutConfig;
  savedWorkoutId?: string;
  name?: string;
};
