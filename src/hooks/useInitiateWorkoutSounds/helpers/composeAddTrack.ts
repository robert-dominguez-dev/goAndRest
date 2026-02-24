import { WorkoutSoundKey } from '../../../assets/types.ts';
import { AddTrack } from 'react-native-track-player';
import { APP_NAME } from '../../../constants/common.ts';

export const composeAddTrack = (
  soundKey: WorkoutSoundKey,
  url: string,
): AddTrack => ({
  url,
  id: soundKey,
  title: soundKey.toString(),
  artist: APP_NAME,
});
