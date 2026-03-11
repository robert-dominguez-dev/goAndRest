import TrackPlayer, { AddTrack } from 'react-native-track-player';

import { APP_NAME } from '../constants/common.ts';
import { SILENCE_SOUND_TRACK } from '../assets/constants/common.ts';

export type PlaySoundParams = {
  soundKey: string;
  url: string;
  isCountdown?: boolean;
};

export const playSound = async ({
  soundKey,
  url,
  isCountdown,
}: PlaySoundParams) => {
  const track: AddTrack = {
    url,
    id: soundKey,
    title: soundKey.toString(),
    artist: APP_NAME,
  };

  try {
    await TrackPlayer.removeUpcomingTracks();
    await TrackPlayer.load(track);
    await TrackPlayer.play();

    if (isCountdown) {
      await TrackPlayer.add(SILENCE_SOUND_TRACK);
    }
  } catch (error) {
    console.error('Audio playback error:', error);
  }
};
