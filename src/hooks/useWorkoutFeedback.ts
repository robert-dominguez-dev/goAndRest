import { useEffect, useRef } from 'react';
import {
  RunningWorkoutPhase,
  WorkoutTimerState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { ONE_SECOND_MS } from '../constants/common.ts';
import { triggerHapticFeedback } from '../components/controls/helpers/triggerHapticFeedback.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

const COUNTDOWN_THRESHOLD_SECONDS = 5;

const MIDDLE_PHASE_HAPTIC_FEEDBACK_THRESHOLD_SECONDS =
  COUNTDOWN_THRESHOLD_SECONDS * 3;

const workoutPhaseToHapticFeedback: Record<
  RunningWorkoutPhase,
  HapticFeedbackTypes
> = {
  [RunningWorkoutPhase.WARMUP]: HapticFeedbackTypes.impactMedium,
  [RunningWorkoutPhase.WORK]: HapticFeedbackTypes.impactHeavy,
  [RunningWorkoutPhase.REST]: HapticFeedbackTypes.impactLight,
  [RunningWorkoutPhase.RECOVERY]: HapticFeedbackTypes.impactLight,
  [RunningWorkoutPhase.COOLDOWN]: HapticFeedbackTypes.impactLight,
};

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
      triggerHapticFeedback(workoutPhaseToHapticFeedback[currentPhase]);
      lastPhaseRef.current = currentPhase;
    }

    const remainingSeconds = Math.ceil(phaseRemainingMs / ONE_SECOND_MS);
    const elapsedSeconds = Math.ceil(phaseElapsedMs / ONE_SECOND_MS);
    const totalSeconds = remainingSeconds + elapsedSeconds;

    const secondInTheMiddle = Math.ceil(totalSeconds / 2);

    const isInTheMiddle: boolean =
      totalSeconds >= MIDDLE_PHASE_HAPTIC_FEEDBACK_THRESHOLD_SECONDS &&
      secondInTheMiddle === remainingSeconds;

    const isInCountdownRange: boolean =
      remainingSeconds >= 1 && remainingSeconds <= COUNTDOWN_THRESHOLD_SECONDS;

    if (isInCountdownRange || isInTheMiddle) {
      const isFirstFeedbackInCurrentSecond =
        remainingSeconds !== lastSecondRef.current;

      if (isFirstFeedbackInCurrentSecond) {
        const hapticFeedback: HapticFeedbackTypes = isInTheMiddle
          ? HapticFeedbackTypes.impactMedium
          : HapticFeedbackTypes.impactLight;

        triggerHapticFeedback(hapticFeedback);

        lastSecondRef.current = remainingSeconds;
      }
    } else {
      lastSecondRef.current = undefined;
    }
  }, [currentPhase, phaseRemainingMs, isRunning]);
};
