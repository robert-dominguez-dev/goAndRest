import TrackPlayer from 'react-native-track-player';

export const clearAndResetTrackPlayer = () =>
  TrackPlayer.stop()
    .then(() => TrackPlayer.reset())
    .catch(error => console.error('Clean and reset error:', error));
