type AppWorkoutMetaData = {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type AppWorkoutConfig = {
  work: number;
  rest: number;
  series: number;
  rounds: number;
  brake: number;
};

export type AppStoredWorkout = {
  id: string;
  meta: AppWorkoutMetaData;
  config: AppWorkoutConfig;
};

export type AppWorkoutFieldValues = AppWorkoutConfig & { workoutName: string };
