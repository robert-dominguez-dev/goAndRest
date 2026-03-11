import TrackPlayer, { AddTrack } from 'react-native-track-player';

import { APP_NAME } from '../constants/common.ts';
import { SILENCE_SOUND_KEY, SILENCE_SOUND_TRACK, } from '../assets/constants/common.ts';

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
    await TrackPlayer.load(track);
    await TrackPlayer.play();

    /**
     * If this is a countdown sound, we add a silence track after it
     * to ensure that the ducking stays active before the next sound starts playing.
     * We ensure only one silence track is in the queue at a time.
     */
    if (isCountdown) {
      const queue = await TrackPlayer.getQueue();
      const hasSilence = queue.some(t => t.id === SILENCE_SOUND_KEY);

      if (!hasSilence) {
        await TrackPlayer.add(SILENCE_SOUND_TRACK);
      }
    }
  } catch (error) {
    console.error('Audio playback error:', error);
  }
};
