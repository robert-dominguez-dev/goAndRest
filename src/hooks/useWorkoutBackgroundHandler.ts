import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAtomValue } from 'jotai';
import { keepTimerInBackgroundSettingAtom } from '../contexts/atoms';

/**
 * Hook to handle application state changes (background/foreground).
 * Automatically pauses the workout if background execution is disabled in settings.
 */
export const useWorkoutBackgroundHandler = (pause: () => void) => {
  const keepTimerInBackground = useAtomValue(keepTimerInBackgroundSettingAtom);

  useEffect(() => {
    /**
     * Handles app state changes.
     * Logic: If the background timer is disabled and the app moves to background, pause the workout.
     */
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (!keepTimerInBackground && nextAppState === 'background') {
        pause();
      }
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
