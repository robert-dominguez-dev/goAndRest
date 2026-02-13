import { AppStoredWorkout } from '../types.ts';

const NON_EXISTING_WORKOUT_INDEX = -1;

export const getUpdatedWorkouts = (
  prevWorkouts: AppStoredWorkout[],
  workout: AppStoredWorkout,
): AppStoredWorkout[] => {
  const indexOfWorkout = prevWorkouts.findIndex(
    prevWorkout => prevWorkout.id === workout.id,
  );

  if (indexOfWorkout === NON_EXISTING_WORKOUT_INDEX) {
    return [workout, ...prevWorkouts];
  }

  const arrayStart = prevWorkouts.slice(0, indexOfWorkout);
  const arrayEnd = prevWorkouts.slice(indexOfWorkout + 1);

  return [...arrayStart, workout, ...arrayEnd];
};
