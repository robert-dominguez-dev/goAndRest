import { WorkoutSoundKey } from '../assets/types.ts';

import { sample } from 'lodash';
import Sound from 'react-native-sound';
import { useAtom, useAtomValue } from 'jotai';
import {
  lastPlayingSoundAtom,
  workoutLoadedSoundsAtom,
} from '../contexts/atoms.ts';

export const usePlayWorkoutSoundByKey = () => {
  const workoutLoadedSounds = useAtomValue(workoutLoadedSoundsAtom);

  const [lastPlayingSound, setLastPlayedSound] = useAtom(lastPlayingSoundAtom);

  return (soundKey: WorkoutSoundKey): Sound | undefined => {
    if (!workoutLoadedSounds) {
      return undefined;
    }

    lastPlayingSound?.stop();

    const oneOrMoreSounds = workoutLoadedSounds[soundKey];

    const newSound = Array.isArray(oneOrMoreSounds)
      ? sample(oneOrMoreSounds)
      : oneOrMoreSounds;

    setLastPlayedSound(newSound);

    newSound?.play();
  };
};
