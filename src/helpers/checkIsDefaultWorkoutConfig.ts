import { AppWorkoutConfig } from '../contexts/AppWorkoutsProvider/types.ts';
import { defaultWorkoutConfig } from '../contexts/AppWorkoutsProvider/constants.ts';

export const checkIsDefaultWorkoutConfig = (
  workoutConfig: AppWorkoutConfig | undefined,
): boolean =>
  !!workoutConfig &&
  defaultWorkoutConfig.work === workoutConfig.work &&
  defaultWorkoutConfig.rest === workoutConfig.rest &&
  defaultWorkoutConfig.recovery === workoutConfig.recovery &&
  defaultWorkoutConfig.series === workoutConfig.series &&
  defaultWorkoutConfig.rounds === workoutConfig.rounds;
