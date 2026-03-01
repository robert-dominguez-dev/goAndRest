import { WorkoutSoundKey } from '../assets/types.ts';
import { useAtomValue } from 'jotai';
import { workoutSoundFilePathsAtom } from '../contexts/atoms.ts';
import { getSoundTrackUrl } from './useInitiateWorkoutSounds/helpers/getSoundTrackUrl.ts';
import { playSound } from '../helpers/playSound.ts';

export const usePlayWorkoutSoundByKey = () => {
  const workoutSoundPaths = useAtomValue(workoutSoundFilePathsAtom);

  return async (soundKey: WorkoutSoundKey, isPreferredShort?: boolean) => {
    if (!workoutSoundPaths) {
      return undefined;
    }

    const oneOrStructuredFilePaths = workoutSoundPaths[soundKey];

    const url = getSoundTrackUrl(oneOrStructuredFilePaths, isPreferredShort);

    if (!url) {
      return undefined;
    }

    await playSound({
      soundKey: soundKey.toString(),
      url,
    });
  };
};
