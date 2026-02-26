import { useEffect, useRef } from 'react';
import {
  RunningWorkoutPhase,
  WorkoutTimerState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { ONE_SECOND_MS } from '../constants/common.ts';
import { useAppVibrations } from './useAppVibrations.ts';
import { usePlayWorkoutSoundByKey } from './usePlayWorkoutSoundByKey.ts';
import { countdownSettingAtom } from '../contexts/atoms.ts';
import { useAtomValue } from 'jotai';

type UseWorkoutFeedbackParams = Partial<
  Pick<
    WorkoutTimerState,
    'currentPhase' | 'phaseElapsedMs' | 'phaseRemainingMs'
  >
> & {
  isRunning: boolean;
};

export const useWorkoutFeedback = ({
  currentPhase,
  phaseRemainingMs,
  phaseElapsedMs,
  isRunning,
}: UseWorkoutFeedbackParams) => {
  const countdownFrom = useAtomValue(countdownSettingAtom);

  const { vibrate } = useAppVibrations();

  const playWorkoutSoundByKey = usePlayWorkoutSoundByKey();

  const lastPhaseRef = useRef<RunningWorkoutPhase | undefined>(undefined);
  const lastSecondRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const hasInvalidInput = (!isRunning ||
      !currentPhase ||
      !phaseRemainingMs ||
      !phaseElapsedMs) satisfies boolean;

    if (hasInvalidInput) {
      return undefined;
    }

    if (currentPhase !== lastPhaseRef.current) {
      vibrate('PHASE_START');
      void playWorkoutSoundByKey(currentPhase);
      lastPhaseRef.current = currentPhase;
    }

    const remainingSeconds = Math.ceil(phaseRemainingMs / ONE_SECOND_MS);
    const elapsedSeconds = Math.ceil(phaseElapsedMs / ONE_SECOND_MS);
    const totalSeconds = remainingSeconds + elapsedSeconds;

    const secondInTheMiddle = Math.ceil(totalSeconds / 2);

    const phaseInMiddleFeedbackThreshold = Math.max(30, countdownFrom * 3);

    const isEligibleForMiddleFeedback: boolean =
      totalSeconds >= phaseInMiddleFeedbackThreshold &&
      secondInTheMiddle === remainingSeconds;

    const isInCountdownRange: boolean =
      remainingSeconds >= 1 && remainingSeconds <= countdownFrom;

    if (isInCountdownRange || isEligibleForMiddleFeedback) {
      const isFirstFeedbackInCurrentSecond =
        remainingSeconds !== lastSecondRef.current;

      if (isFirstFeedbackInCurrentSecond) {
        if (isInCountdownRange) {
          vibrate('COUNTDOWN');
          void playWorkoutSoundByKey(remainingSeconds);
        }

        if (isEligibleForMiddleFeedback) {
          vibrate('HALF_OF_PHASE');
          void playWorkoutSoundByKey('half');
        }

        lastSecondRef.current = remainingSeconds;
      }
    } else {
      lastSecondRef.current = undefined;
    }
  }, [currentPhase, phaseRemainingMs, isRunning, countdownFrom]);
};
