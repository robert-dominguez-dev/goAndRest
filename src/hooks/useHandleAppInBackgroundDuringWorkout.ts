import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAtomValue } from 'jotai';
import { keepTimerInBackgroundSettingAtom } from '../contexts/atoms';
import { noop } from '../helpers/noop.ts';
import { stopAndResetTrackPlayer } from './useInitiateWorkoutSounds/helpers/stopAndResetTrackPlayer.ts';

/**
 * Hook to handle application state changes (background/foreground).
 * Automatically pauses the workout if background execution is disabled in settings.
 */
export const useHandleAppInBackgroundDuringWorkout = (pause: () => void) => {
  const keepTimerInBackground = useAtomValue(keepTimerInBackgroundSettingAtom);

  useEffect(() => {
    /**
     * Handles app state changes.
     * Logic: If the background timer is disabled and the app moves to background, pause the workout.
     */
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const handleInactiveState = () => {
        void stopAndResetTrackPlayer();

        if (!keepTimerInBackground) {
          pause();
        }
      };

      const appStatusToHandler: Record<AppStateStatus, () => void> = {
        background: handleInactiveState,
        inactive: handleInactiveState,
        active: noop,
        unknown: noop,
        extension: noop,
      };

      appStatusToHandler[nextAppState]();
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [pause, keepTimerInBackground]);
};
