import { AppStoredWorkout, AppWorkoutConfig } from '../types.ts';
import { getWorkoutConfigSignature } from '../../workoutHistory/helpers/getWorkoutConfigSignature.ts';

export const getSameConfigStoredWorkouts = (
  storedWorkouts: AppStoredWorkout[],
  config: AppWorkoutConfig,
): AppStoredWorkout[] => {
  const signature = getWorkoutConfigSignature(config);

  return storedWorkouts.filter(
    storedWorkout =>
      getWorkoutConfigSignature(storedWorkout.config) === signature,
  );
};
