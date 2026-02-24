import TrackPlayer from 'react-native-track-player';

export const clearWorkoutSoundsQueue = async () => {
  try {
    const queue = await TrackPlayer.getQueue();

    if (queue.length) {
      await TrackPlayer.stop();
      const indices = queue.map((_, i) => i);
      await TrackPlayer.remove(indices);
    }
  } catch (error) {
    console.error('Queue cleaning error:', error);
  }
};
