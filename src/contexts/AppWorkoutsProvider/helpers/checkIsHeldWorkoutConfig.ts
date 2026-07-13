import { getWorkoutConfigSignature } from '../../workoutHistory/helpers/getWorkoutConfigSignature.ts';
import {
  AppStoredWorkout,
  AppWorkoutConfig,
  HeldWorkoutIdentity,
} from '../types.ts';

// Whether the held workout still matches the given config. A config change
// only drops the held identity when the signature actually differs - saving
// the same values keeps the held (saved) workout as the landing context.
export const checkIsHeldWorkoutConfig = (
  heldWorkoutIdentity: HeldWorkoutIdentity | null,
  config: AppWorkoutConfig,
  storedWorkouts: AppStoredWorkout[],
): boolean => {
  if (!heldWorkoutIdentity) {
    return false;
  }

  const heldWorkout = storedWorkouts.find(
    workout => workout.id === heldWorkoutIdentity.savedWorkoutId,
  );

  if (!heldWorkout) {
    return false;
  }

  return (
    getWorkoutConfigSignature(heldWorkout.config) ===
    getWorkoutConfigSignature(config)
  );
};
