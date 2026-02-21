import { useCallback } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { usePreciseInterval } from './usePreciseInterval';
import {
  computedWorkoutStateAtom,
  cooldownSettingAtom,
  runningWorkoutStateAtom,
  warmupSettingAtom,
} from '../contexts/atoms.ts';
import {
  WorkoutTimerPersistedState,
  WorkoutTimerState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { calculateCurrentWorkoutState } from '../helpers/calculateCurrentWorkoutState.ts';
import { getNumber } from '../helpers/getNumber.ts';
import { useWorkoutBackgroundHandler } from './useWorkoutBackgroundHandler.ts';
import { AppWorkoutFieldValues } from '../contexts/AppWorkoutsProvider/types.ts';
import { calculateSkipState } from '../helpers/calculateSkipState.ts';

export const useWorkoutTimer = () => {
  const warmupSetting = useAtomValue(warmupSettingAtom);
  const cooldownSetting = useAtomValue(cooldownSettingAtom);

  const [persistedState, setPersistedState] = useAtom(runningWorkoutStateAtom);
  const [computedState, setComputedState] = useAtom(computedWorkoutStateAtom);

  const stop = useCallback(() => {
    void setPersistedState(null);
    setComputedState(null);
  }, [setPersistedState]);

  const updateComputedState = useCallback(() => {
    if (!persistedState) {
      return undefined;
    }

    const newComputedState = calculateCurrentWorkoutState(persistedState);

    setComputedState(newComputedState);

    if (newComputedState.isFinished) {
      stop();
    }
  }, [persistedState, setPersistedState, stop]);

  const isTimerRunning: boolean =
    !!persistedState && !persistedState.isPaused && !computedState?.isFinished;

  usePreciseInterval(updateComputedState, isTimerRunning, [
    updateComputedState,
  ]);

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
    if (!persistedState) {
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
    if (!persistedState || !persistedState.pausedAt) {
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
    (seconds: number) => {
      console.log({
        seconds,
        persistedState,
        computedState,
      });
      if (!persistedState || !computedState) {
        return undefined;
      }

      const nextPersistedState = calculateSkipState(
        persistedState,
        computedState,
        seconds,
      );

      void setPersistedState(nextPersistedState);
      setComputedState(calculateCurrentWorkoutState(nextPersistedState));
    },
    [persistedState, computedState, setPersistedState],
  );

  const currentState: WorkoutTimerState | null =
    persistedState && computedState
      ? { ...persistedState, ...computedState }
      : null;

  useWorkoutBackgroundHandler(pause);

  return {
    currentState,
    start,
    pause,
    resume,
    stop,
    skip,
  };
};
