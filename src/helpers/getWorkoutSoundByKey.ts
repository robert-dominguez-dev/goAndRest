import { WorkoutSoundKey } from '../assets/types.ts';
import { cyborgCs } from '../assets/audio/characters/cyborg/cs/constants.ts';
import { sample } from 'lodash';
import Sound from 'react-native-sound';

export const getWorkoutSoundByKey = (
  soundKey: WorkoutSoundKey,
): Sound | undefined => {
  const oneOrMoreSounds = cyborgCs[soundKey];

  return Array.isArray(oneOrMoreSounds)
    ? sample(oneOrMoreSounds)
    : oneOrMoreSounds;
};
