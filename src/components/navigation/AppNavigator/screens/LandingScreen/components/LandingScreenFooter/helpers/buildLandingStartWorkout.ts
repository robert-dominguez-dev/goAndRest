import {
  AppWorkoutFieldValues,
  HeldWorkoutIdentity,
} from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';

export const buildLandingStartWorkout = (
  values: AppWorkoutFieldValues,
  heldWorkoutIdentity: HeldWorkoutIdentity | null,
): AppWorkoutFieldValues => ({
  ...values,
  savedWorkoutId: heldWorkoutIdentity?.savedWorkoutId,
  workoutName: heldWorkoutIdentity?.name ?? '',
});
