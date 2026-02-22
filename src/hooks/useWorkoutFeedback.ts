import { useEffect, useRef } from 'react';
import {
  RunningWorkoutPhase,
  WorkoutTimerState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { ONE_SECOND_MS } from '../constants/common.ts';
import { Vibration } from 'react-native';

const COUNTDOWN_THRESHOLD_SECONDS = 10;

const MIDDLE_PHASE_HAPTIC_FEEDBACK_THRESHOLD_SECONDS =
  COUNTDOWN_THRESHOLD_SECONDS * 3;

const LONG_VIBRATION_DURATION = 800;
const MIDDLE_VIBRATION_DURATION = 500;
const SHORT_VIBRATION_DURATION = 200;

const workoutPhaseToVibrationDuration: Record<RunningWorkoutPhase, number> = {
  [RunningWorkoutPhase.WARMUP]: MIDDLE_VIBRATION_DURATION,
  [RunningWorkoutPhase.WORK]: LONG_VIBRATION_DURATION,
  [RunningWorkoutPhase.REST]: MIDDLE_VIBRATION_DURATION,
  [RunningWorkoutPhase.RECOVERY]: MIDDLE_VIBRATION_DURATION,
  [RunningWorkoutPhase.COOLDOWN]: MIDDLE_VIBRATION_DURATION,
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
      Vibration.vibrate(workoutPhaseToVibrationDuration[currentPhase]);
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
        const vibrationDuration: number = isInTheMiddle
          ? MIDDLE_VIBRATION_DURATION
          : SHORT_VIBRATION_DURATION;

        Vibration.vibrate(vibrationDuration);
        lastSecondRef.current = remainingSeconds;
      }
    } else {
      lastSecondRef.current = undefined;
    }
  }, [currentPhase, phaseRemainingMs, isRunning]);
};
