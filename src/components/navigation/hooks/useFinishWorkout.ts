import { useWorkoutTimer } from '../../../hooks/useWorkoutTimer.ts';
import { useRootStackNavigation } from './useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../AppNavigator/types.ts';
import { stopAndResetTrackPlayer } from '../../../hooks/useInitiateWorkoutSounds/helpers/stopAndResetTrackPlayer.ts';

export const useFinishWorkout = () => {
  const { stop } = useWorkoutTimer();

  const navigation = useRootStackNavigation();

  return () => {
    void stopAndResetTrackPlayer();
    stop();
    navigation.reset({
      routes: [{ name: AppNavigatorScreen.LandingScreen }],
    });
  };
};
