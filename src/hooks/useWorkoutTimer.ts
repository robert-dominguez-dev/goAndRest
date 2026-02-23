import { useCallback, useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { usePreciseInterval } from './usePreciseInterval';
import {
  computedWorkoutStateAtom,
  cooldownSettingAtom,
  finishedWorkoutStatsAtom,
  runningWorkoutStateAtom,
  warmupSettingAtom,
} from '../contexts/atoms.ts';
import {
  WorkoutTimerPersistedState,
  WorkoutTimerState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { calculateCurrentWorkoutState } from '../helpers/calculateCurrentWorkoutState.ts';
import { getNumber } from '../helpers/getNumber.ts';
import { usePauseWorkoutInBackgroundConditionally } from './usePauseWorkoutInBackgroundConditionally.ts';
import { AppWorkoutFieldValues } from '../contexts/AppWorkoutsProvider/types.ts';
import { calculateSkipState } from '../helpers/calculateSkipState.ts';

export const useWorkoutTimer = (onFinish?: () => void) => {
  const warmupSetting = useAtomValue(warmupSettingAtom);
  const cooldownSetting = useAtomValue(cooldownSettingAtom);

  const setFinishedWorkoutStats = useSetAtom(finishedWorkoutStatsAtom);

  const [persistedState, setPersistedState] = useAtom(runningWorkoutStateAtom);
  const [computedState, setComputedState] = useAtom(computedWorkoutStateAtom);

  const stop = useCallback(() => {
    void setPersistedState(null);
  }, [setPersistedState]);

  const updateComputedState = useCallback(() => {
    if (!persistedState) {
      return undefined;
    }

    const newComputedState = calculateCurrentWorkoutState(persistedState);

    setComputedState(newComputedState);

    if (newComputedState.isFinished) {
      setFinishedWorkoutStats(persistedState);
      stop();
      onFinish?.();
    }
  }, [persistedState, setPersistedState, stop]);

  const isFinished = !!computedState?.isFinished;

  /**
   * This is important at least for two reasons:
   * 1) To start the timer when the app returning from background...
   * 2) When finishing manually by skipping to the end...
   */
  useEffect(updateComputedState, [isFinished]);

  const isRunning: boolean =
    !!persistedState && !persistedState?.isPaused && !isFinished;

  usePreciseInterval(updateComputedState, isRunning, [updateComputedState]);

  const start = useCallback(
    ({ workoutName, ...workoutConfig }: AppWorkoutFieldValues) => {
      const now = Date.now();

      const newPersistedState: WorkoutTimerPersistedState = {
        workoutConfig: {
          ...workoutConfig,
          warmup: getNumber(warmupSetting),
          cooldown: getNumber(cooldownSetting),
        },
        workoutName,
        startedAt: now,
        totalPausedTime: 0,
        pausedAt: null,
        isPaused: false,
      };

      void setPersistedState(newPersistedState);
    },
    [setPersistedState, warmupSetting, cooldownSetting],
  );

  const pause = useCallback(() => {
    if (!persistedState || persistedState.isPaused) {
      return undefined;
    }

    const now = Date.now();

    void setPersistedState({
      ...persistedState,
      pausedAt: now,
      isPaused: true,
    });
  }, [persistedState, setPersistedState]);

  const resume = useCallback(() => {
    if (
      !persistedState ||
      !persistedState.isPaused ||
      !persistedState.pausedAt
    ) {
      return undefined;
    }

    const pauseDuration = Date.now() - getNumber(persistedState.pausedAt);

    void setPersistedState({
      ...persistedState,
      totalPausedTime: persistedState.totalPausedTime + pauseDuration,
      pausedAt: null,
      isPaused: false,
    });
  }, [persistedState, setPersistedState]);

  const skip = useCallback(
    (msToSkip: number) => {
      if (!persistedState) {
        return undefined;
      }

      const freshPrevComputedState =
        calculateCurrentWorkoutState(persistedState);

      const nextPersistedState = calculateSkipState(
        persistedState,
        freshPrevComputedState,
        msToSkip,
      );

      void setPersistedState(nextPersistedState);
      setComputedState(calculateCurrentWorkoutState(nextPersistedState));
    },
    [persistedState, setPersistedState],
  );

  const currentState: WorkoutTimerState | null =
    persistedState && computedState
      ? { ...persistedState, ...computedState }
      : null;

  usePauseWorkoutInBackgroundConditionally(pause);

  return {
    currentState,
    isRunning,
    start,
    pause,
    resume,
    stop,
    skip,
  };
};
