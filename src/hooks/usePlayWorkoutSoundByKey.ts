import { WorkoutSoundKey } from '../assets/types.ts';
import { useAtomValue } from 'jotai';
import { workoutSoundFilePathsAtom } from '../contexts/atoms.ts';
import { sample } from 'lodash';
import TrackPlayer from 'react-native-track-player';

export const usePlayWorkoutSoundByKey = () => {
  const workoutSoundPaths = useAtomValue(workoutSoundFilePathsAtom);

  return async (soundKey: WorkoutSoundKey) => {
    if (!workoutSoundPaths) {
      return undefined;
    }

    const oneOrMoreFilePaths = workoutSoundPaths[soundKey];

    const filePath: string | undefined = Array.isArray(oneOrMoreFilePaths)
      ? sample(oneOrMoreFilePaths)
      : oneOrMoreFilePaths;

    if (!filePath) {
      return undefined;
    }

    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: soundKey,
      url: filePath,
      title: soundKey.toString(),
      artist: '',
    });
    await TrackPlayer.play();
  };
};
