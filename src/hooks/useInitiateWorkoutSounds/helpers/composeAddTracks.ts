import { WorkoutSoundFilePaths } from '../../../assets/types.ts';
import { AddTrack } from 'react-native-track-player';
import { composeAddTrack } from './composeAddTrack.ts';
import { getSoundTrackUrl } from './getSoundTrackUrl.ts';

export const composeAddTracks = (paths: WorkoutSoundFilePaths): AddTrack[] =>
  Object.entries(paths).reduce<AddTrack[]>(
    (acc, [soundKey, oneOrMoreFilePaths]) => {
      const url = getSoundTrackUrl(oneOrMoreFilePaths);

      if (url) {
        const track = composeAddTrack(soundKey, url);
        acc.push(track);
      }

      return acc;
    },
    [],
  );
