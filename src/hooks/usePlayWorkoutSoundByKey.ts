import { WorkoutSoundKey } from '../assets/types.ts';
import { useAtomValue } from 'jotai';
import { isMutedAtom, workoutSoundFilePathsAtom } from '../contexts/atoms.ts';
import { getSoundTrackUrl } from './useInitiateWorkoutSounds/helpers/getSoundTrackUrl.ts';
import { playSound, PlaySoundParams } from '../helpers/playSound.ts';

type PlayWorkoutSoundByKeyParams = Pick<PlaySoundParams, 'isCountdown'> & {
  soundKey: WorkoutSoundKey;
  isPreferredShort?: boolean;
};

export const usePlayWorkoutSoundByKey = () => {
  const workoutSoundPaths = useAtomValue(workoutSoundFilePathsAtom);
  const isMuted = useAtomValue(isMutedAtom);

  return async ({
    soundKey,
    isPreferredShort,
    isCountdown,
  }: PlayWorkoutSoundByKeyParams) => {
    if (!workoutSoundPaths || isMuted) {
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
      isCountdown,
    });
  };
};
