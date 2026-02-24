import { WorkoutSounds } from '../../../assets/types.ts';

export const releaseWorkoutSounds = (
  workoutSounds: WorkoutSounds | null,
): void => {
  if (!workoutSounds) {
    return undefined;
  }

  Object.values(workoutSounds).forEach(oneOrMoreSounds => {
    if (Array.isArray(oneOrMoreSounds)) {
      oneOrMoreSounds.forEach(sound => sound?.release());
    } else {
      oneOrMoreSounds?.release();
    }
  });
};
