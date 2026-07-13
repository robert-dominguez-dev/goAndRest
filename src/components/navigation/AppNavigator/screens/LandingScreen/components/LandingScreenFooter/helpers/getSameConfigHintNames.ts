import { AppStoredWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';

export const MAX_HINT_NAMES = 3;

export const getSameConfigHintNames = (
  sameConfigWorkouts: AppStoredWorkout[],
): { names: string[]; hasMore: boolean } => ({
  names: sameConfigWorkouts
    .slice(0, MAX_HINT_NAMES)
    .map(workout => workout.meta.name),
  hasMore: sameConfigWorkouts.length > MAX_HINT_NAMES,
});
