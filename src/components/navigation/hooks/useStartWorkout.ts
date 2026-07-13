import { useWorkoutTimer } from '../../../hooks/useWorkoutTimer.ts';
import { AppWorkoutFieldValues } from '../../../contexts/AppWorkoutsProvider/types.ts';
import { useRootStackNavigation } from './useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../AppNavigator/types.ts';
import { stopAndResetTrackPlayer } from '../../../hooks/useInitiateWorkoutSounds/helpers/stopAndResetTrackPlayer.ts';

export const useStartWorkout = () => {
  const { start } = useWorkoutTimer();

  const navigation = useRootStackNavigation();

  return (appWorkout: AppWorkoutFieldValues) => {
    void stopAndResetTrackPlayer();
    start(appWorkout);
    navigation.reset({
      routes: [{ name: AppNavigatorScreen.RunningWorkoutScreen }],
    });
  };
};
