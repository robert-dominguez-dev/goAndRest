import TrackPlayer, { AddTrack } from 'react-native-track-player';

import { APP_NAME } from '../constants/common.ts';

export type PlaySoundParams = { soundKey: string; url: string };

export const playSound = async ({ soundKey, url }: PlaySoundParams) => {
  const track: AddTrack = {
    url,
    id: soundKey,
    title: soundKey.toString(),
    artist: APP_NAME,
  };

  try {
    await TrackPlayer.add(track);
    await TrackPlayer.play();
  } catch (error) {
    console.error('Audio playback error:', error);
  }
};
