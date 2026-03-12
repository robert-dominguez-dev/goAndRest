import TrackPlayer from 'react-native-track-player';

export const stopAndResetTrackPlayer = async () => {
  try {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    console.log('Stop and reset successful.');
  } catch (error) {
    console.error('Stop and reset error:', error);
  }
};
