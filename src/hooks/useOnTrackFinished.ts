import { useTrackPlayerEvents } from 'react-native-track-player';
import { Event } from 'react-native-track-player/lib/src/constants/Event';

export const useOnTrackFinished = (
  soundKey: string,
  onFinished: (() => void) | (() => Promise<void>),
) =>
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    if (!event.lastTrack) {
      return undefined;
    }

    if (event.lastTrack.id === soundKey) {
      onFinished();
    }
  });
