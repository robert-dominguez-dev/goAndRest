import { useWorkoutTimer } from '../../../hooks/useWorkoutTimer.ts';
import { AppWorkoutFieldValues } from '../../../contexts/AppWorkoutsProvider/types.ts';
import { useRootStackNavigation } from './useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../AppNavigator/types.ts';
import { stopAndResetTrackPlayer } from '../../../hooks/useInitiateWorkoutSounds/helpers/stopAndResetTrackPlayer.ts';
import { useSetAtom } from 'jotai';
import { lastRunningWorkoutAtom } from '../../../contexts/atoms.ts';

export const useStartWorkout = () => {
  const setLastRunningWorkout = useSetAtom(lastRunningWorkoutAtom);

  const { start } = useWorkoutTimer();

  const navigation = useRootStackNavigation();

  return (appWorkout: AppWorkoutFieldValues) => {
    void setLastRunningWorkout(appWorkout);
    void stopAndResetTrackPlayer();
    start(appWorkout);
    navigation.reset({
      routes: [{ name: AppNavigatorScreen.RunningWorkoutScreen }],
    });
  };
};
