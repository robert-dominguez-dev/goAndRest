import { useWorkoutTimer } from '../../../hooks/useWorkoutTimer.ts';
import { AppWorkoutFieldValues } from '../../../contexts/AppWorkoutsProvider/types.ts';
import { useRootStackNavigation } from './useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../AppNavigator/types.ts';
import { clearAndResetTrackPlayer } from '../../../hooks/useInitiateWorkoutSounds/helpers/clearAndResetTrackPlayer.ts';

export const useStartWorkout = () => {
  const { start } = useWorkoutTimer();

  const navigation = useRootStackNavigation();

  return (appWorkout: AppWorkoutFieldValues) => {
    void clearAndResetTrackPlayer();
    start(appWorkout);
    navigation.reset({
      routes: [{ name: AppNavigatorScreen.RunningWorkoutScreen }],
    });
  };
};
