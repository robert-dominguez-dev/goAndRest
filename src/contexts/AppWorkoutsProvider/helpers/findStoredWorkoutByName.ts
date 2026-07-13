import { AppStoredWorkout } from '../types.ts';

export const findStoredWorkoutByName = (
  storedWorkouts: AppStoredWorkout[],
  name: string,
): AppStoredWorkout | undefined => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return undefined;
  }

  return storedWorkouts.find(
    storedWorkout => storedWorkout.meta.name.trim() === trimmedName,
  );
};
