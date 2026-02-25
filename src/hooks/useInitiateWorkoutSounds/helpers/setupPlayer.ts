import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  IOSCategory,
  IOSCategoryOptions,
} from 'react-native-track-player';
import { Event } from 'react-native-track-player/lib/src/constants/Event';
import { stopAndResetTrackPlayer } from './stopAndResetTrackPlayer.ts';

export const PlaybackService = async function () {
  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () =>
    stopAndResetTrackPlayer()
      .then(() => console.log('Queue reset after playback.'))
      .catch(error => console.error('Auto-reset error:', error)),
  );
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
};

export const setupPlayer = async () => {
  try {
    /**
     * We just try to call this to find out,
     * if the player is already initialized.
     * If not, we get an error...
     */
    await TrackPlayer.getActiveTrackIndex();
  } catch {
    await TrackPlayer.setupPlayer({
      iosCategory: IOSCategory.Playback,
      iosCategoryOptions: [
        IOSCategoryOptions.MixWithOthers,
        IOSCategoryOptions.DuckOthers,
      ],
    });

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [Capability.Play, Capability.Stop],
    });
  }
};
