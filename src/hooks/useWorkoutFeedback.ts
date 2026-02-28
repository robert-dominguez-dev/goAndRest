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
import clamp from 'lodash/clamp';

const CONSIDERED_SHORT_PHASE_DURATION_THRESHOLD = 10;
const PHASE_DURATION_TO_MAX_COUNTDOWN_DURATION_OFFSET = 3;
const MIN_PHASE_DURATION_TO_HAVE_MIDDLE_FEEDBACK = 30;

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

    const remainingSeconds = Math.ceil(phaseRemainingMs / ONE_SECOND_MS);
    const elapsedSeconds = Math.ceil(phaseElapsedMs / ONE_SECOND_MS);
    const totalSeconds = remainingSeconds + elapsedSeconds;

    const isShortPhase =
      totalSeconds < CONSIDERED_SHORT_PHASE_DURATION_THRESHOLD;

    if (currentPhase !== lastPhaseRef.current) {
      vibrate('PHASE_START');
      void playWorkoutSoundByKey(currentPhase, isShortPhase);
      lastPhaseRef.current = currentPhase;
    }

    const exactSecondInTheMiddle = Math.ceil(totalSeconds / 2);

    const countdownFromEvaluated = clamp(
      totalSeconds - PHASE_DURATION_TO_MAX_COUNTDOWN_DURATION_OFFSET,
      0,
      countdownFrom,
    );

    const phaseInMiddleFeedbackThreshold = Math.max(
      MIN_PHASE_DURATION_TO_HAVE_MIDDLE_FEEDBACK,
      countdownFromEvaluated * 3,
    );

    const isEligibleForMiddleFeedback: boolean =
      currentPhase === RunningWorkoutPhase.WORK &&
      totalSeconds >= phaseInMiddleFeedbackThreshold &&
      exactSecondInTheMiddle === remainingSeconds;

    const isInCountdownRange: boolean =
      remainingSeconds >= 1 && remainingSeconds <= countdownFromEvaluated;

    if (isInCountdownRange || isEligibleForMiddleFeedback) {
      const isFirstFeedbackInCurrentSecond =
        remainingSeconds !== lastSecondRef.current;

      if (isFirstFeedbackInCurrentSecond) {
        if (isInCountdownRange) {
          vibrate('COUNTDOWN');
          void playWorkoutSoundByKey(remainingSeconds, isShortPhase);
        }

        if (isEligibleForMiddleFeedback) {
          vibrate('HALF_OF_PHASE');
          void playWorkoutSoundByKey('half', isShortPhase);
        }

        lastSecondRef.current = remainingSeconds;
      }
    } else {
      lastSecondRef.current = undefined;
    }
  }, [
    currentPhase,
    phaseRemainingMs,
    phaseElapsedMs,
    isRunning,
    countdownFrom,
  ]);
};
