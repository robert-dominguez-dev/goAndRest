import { WorkoutSoundKey } from '../assets/types.ts';

import { sample } from 'lodash';
import Sound from 'react-native-sound';
import { useAtomValue } from 'jotai';
import { workoutLoadedSoundsAtom } from '../contexts/atoms.ts';

export const useGetWorkoutSoundByKey = () => {
  const workoutLoadedSounds = useAtomValue(workoutLoadedSoundsAtom);

  return (soundKey: WorkoutSoundKey): Sound | undefined => {
    if (!workoutLoadedSounds) {
      return undefined;
    }

    const oneOrMoreSounds = workoutLoadedSounds[soundKey];
    return Array.isArray(oneOrMoreSounds)
      ? sample(oneOrMoreSounds)
      : oneOrMoreSounds;
  };
};
