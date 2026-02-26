import { WorkoutSoundKey } from '../assets/types.ts';
import { useAtomValue } from 'jotai';
import { workoutSoundFilePathsAtom } from '../contexts/atoms.ts';
import TrackPlayer from 'react-native-track-player';
import { getSoundTrackUrl } from './useInitiateWorkoutSounds/helpers/getSoundTrackUrl.ts';
import { composeAddTrack } from './useInitiateWorkoutSounds/helpers/composeAddTrack.ts';

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

    const track = composeAddTrack(soundKey, url);

    try {
      await TrackPlayer.add(track);
      await TrackPlayer.play();
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };
};
