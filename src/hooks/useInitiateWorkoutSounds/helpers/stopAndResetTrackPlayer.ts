import TrackPlayer from 'react-native-track-player';

export const stopAndResetTrackPlayer = () =>
  TrackPlayer.stop()
    .then(() => TrackPlayer.reset())
    .then(() => console.log('Stop and reset successful.'))
    .catch(error => console.error('Stop and reset error:', error));
