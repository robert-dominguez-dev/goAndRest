import { useWorkoutTimer } from '../../../hooks/useWorkoutTimer.ts';
import { useRootStackNavigation } from './useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../AppNavigator/types.ts';
import { clearAndResetTrackPlayer } from '../../../hooks/useInitiateWorkoutSounds/helpers/clearAndResetTrackPlayer.ts';

export const useFinishWorkout = () => {
  const { stop } = useWorkoutTimer();

  const navigation = useRootStackNavigation();

  return () => {
    void clearAndResetTrackPlayer();
    stop();
    navigation.reset({
      routes: [{ name: AppNavigatorScreen.LandingScreen }],
    });
  };
};
