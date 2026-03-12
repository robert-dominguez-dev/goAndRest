import { memo, useEffect } from 'react';
import { AppRow } from '../../../../../common/AppRow.tsx';
import {
  RunningWorkoutPulsingBackground,
  RunningWorkoutPulsingBackgroundProps,
} from './RunningWorkoutPulsingBackground.tsx';
import {
  workoutPhaseToPulsingAnimationConfig,
  workoutPhaseToTimerColorStatus,
} from '../constants.tsx';
import { WorkoutTimerState } from '../types.ts';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ONE_SECOND_MS } from '../../../../../../constants/common.ts';
import { usePrevious } from '../../../../../../hooks/usePrevious.ts';

const SKIP_THRESHOLD_MS = 2000;

const countPercents = (phaseElapsedMs: number, totalPhaseMs: number) =>
  (phaseElapsedMs / totalPhaseMs) * 100;

type RunningWorkoutLandscapePulsingBackgroundProps = Pick<
  WorkoutTimerState,
  'currentPhase' | 'phaseElapsedMs' | 'phaseRemainingMs'
> &
  Pick<RunningWorkoutPulsingBackgroundProps, 'enabled'>;

const RunningWorkoutLandscapePulsingBackgroundComponent = ({
  currentPhase,
  phaseElapsedMs,
  phaseRemainingMs,
  enabled,
}: RunningWorkoutLandscapePulsingBackgroundProps) => {
  const animatedPercentage = useSharedValue(0);

  const backgroundColorStatus = workoutPhaseToTimerColorStatus[currentPhase];

  const prevPhaseElapsedMs = usePrevious(phaseElapsedMs);

  useEffect(() => {
    const totalPhaseMs = phaseRemainingMs + phaseElapsedMs;
    const msDelta = Math.abs(phaseElapsedMs - (prevPhaseElapsedMs ?? 0));

    if (!enabled || msDelta > SKIP_THRESHOLD_MS) {
      animatedPercentage.value = countPercents(phaseElapsedMs, totalPhaseMs);
    }

    /**
     * The animation duration is 1 second,
     * so we need to count in advance...
     */
    const elapsedPercentsClamped = countPercents(
      phaseElapsedMs + ONE_SECOND_MS,
      totalPhaseMs,
    );

    animatedPercentage.value = withTiming(elapsedPercentsClamped, {
      duration: ONE_SECOND_MS,
      easing: Easing.linear,
    });
  }, [phaseElapsedMs, phaseRemainingMs, animatedPercentage]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${animatedPercentage.value}%`,
  }));

  return (
    <AppRow grow>
      <Animated.View style={animatedProgressStyle}>
        <RunningWorkoutPulsingBackground
          backgroundColorStatus={backgroundColorStatus}
          enabled={enabled}
          timingConfig={workoutPhaseToPulsingAnimationConfig[currentPhase]}
          from={0.5}
          to={0.7}
        />
      </Animated.View>
      <AppRow
        grow
        opacity={0.1}
        backgroundColorStatus={backgroundColorStatus}
      />
    </AppRow>
  );
};

export const RunningWorkoutLandscapePulsingBackground = memo(
  RunningWorkoutLandscapePulsingBackgroundComponent,
);
