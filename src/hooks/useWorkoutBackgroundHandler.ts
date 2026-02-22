import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAtomValue } from 'jotai';
import { keepTimerInBackgroundSettingAtom } from '../contexts/atoms';
import { noop } from '../helpers/noop.ts';

type UseWorkoutBackgroundHandlerParams = {
  pause: (isPausedBySystem: boolean) => void;
  resume: () => void;
};

/**
 * Hook to handle application state changes (background/foreground).
 * Automatically pauses the workout if background execution is disabled in settings.
 */
export const useWorkoutBackgroundHandler = ({
  pause,
  resume,
}: UseWorkoutBackgroundHandlerParams) => {
  const keepTimerInBackground = useAtomValue(keepTimerInBackgroundSettingAtom);

  useEffect(() => {
    if (keepTimerInBackground) {
      return undefined;
    }

    if (AppState.currentState === 'active' && isPausedBySystem) {
      resume();
    }

    /**
     * Handles app state changes.
     * Logic: If the background timer is disabled and the app moves to background, pause the workout.
     */
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (keepTimerInBackground) {
        return undefined;
      }

      const appStatusToHandler: Record<AppStateStatus, () => void> = {
        active: resume,
        background: () => pause(true),
        inactive: () => pause(true),
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
  }, [pause, resume, keepTimerInBackground]);
};
