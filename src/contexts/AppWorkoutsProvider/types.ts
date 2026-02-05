export enum AppWorkoutBlockType {
  WORK = 'WORK',
  REST = 'REST',
  PREP = 'PREP',
}

type AppWorkoutBlock = {
  type: AppWorkoutBlockType;
  name: string;
  rounds: number;
};

export type AppWorkout = {
  id: string;
  name: string;
  description?: string;
  blocks: AppWorkoutBlock[];
  createdAt: Date;
  updatedAt: Date;
};
