import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  IOSCategory,
  IOSCategoryOptions,
} from 'react-native-track-player';
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
    /**
     * Be aware, this is also set at native level in the AppDelegate.m file for iOS.
     * If you change it here, make sure to change it there as well.
     */
    await TrackPlayer.setupPlayer({
      iosCategory: IOSCategory.Playback,
      iosCategoryOptions: [
        IOSCategoryOptions.DuckOthers,
        IOSCategoryOptions.MixWithOthers,
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
