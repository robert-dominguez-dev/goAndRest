import { useEffect, useRef } from 'react';
import {
  RunningWorkoutPhase,
  WorkoutTimerState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { ONE_SECOND_MS } from '../constants/common.ts';
import { useAppVibrations, VibrationPattern } from './useAppVibrations.ts';

const COUNTDOWN_THRESHOLD_SECONDS = 5;

const MIDDLE_PHASE_HAPTIC_FEEDBACK_THRESHOLD_SECONDS = Math.max(
  30,
  COUNTDOWN_THRESHOLD_SECONDS * 3,
);

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
  const { vibrate } = useAppVibrations();

  const lastPhaseRef = useRef<RunningWorkoutPhase | undefined>(currentPhase);
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
      lastPhaseRef.current = currentPhase;
    }

    const remainingSeconds = Math.ceil(phaseRemainingMs / ONE_SECOND_MS);
    const elapsedSeconds = Math.ceil(phaseElapsedMs / ONE_SECOND_MS);
    const totalSeconds = remainingSeconds + elapsedSeconds;

    const secondInTheMiddle = Math.ceil(totalSeconds / 2);

    const isInMiddle: boolean =
      totalSeconds >= MIDDLE_PHASE_HAPTIC_FEEDBACK_THRESHOLD_SECONDS &&
      secondInTheMiddle === remainingSeconds;

    const isInCountdownRange: boolean =
      remainingSeconds >= 1 && remainingSeconds <= COUNTDOWN_THRESHOLD_SECONDS;

    if (isInCountdownRange || isInMiddle) {
      const isFirstFeedbackInCurrentSecond =
        remainingSeconds !== lastSecondRef.current;

      if (isFirstFeedbackInCurrentSecond) {
        const vibrationPattern: VibrationPattern = isInMiddle
          ? 'HALF_OF_PHASE'
          : 'COUNTDOWN';

        vibrate(vibrationPattern);
        lastSecondRef.current = remainingSeconds;
      }
    } else {
      lastSecondRef.current = undefined;
    }
  }, [currentPhase, phaseRemainingMs, isRunning]);
};
