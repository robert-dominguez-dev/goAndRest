export enum AppWorkoutBlockType {
  WORK = 'WORK',
  REST = 'REST',
  PREP = 'PREP',
}

type AppWorkoutMetaData = {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AppWorkoutConfig = {
  prep: number;
  work: number;
  rest: number;
  rounds: number;
  cooldown: number;
};

export type AppWorkout = {
  id: string;
  meta: AppWorkoutMetaData;
  config: AppWorkoutConfig;
};
