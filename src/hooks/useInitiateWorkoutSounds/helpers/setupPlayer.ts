import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  IOSCategory,
  IOSCategoryOptions,
} from 'react-native-track-player';
import { Event } from 'react-native-track-player/lib/src/constants/Event';

export const PlaybackService = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
};

export const setupPlayer = async () => {
  try {
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
