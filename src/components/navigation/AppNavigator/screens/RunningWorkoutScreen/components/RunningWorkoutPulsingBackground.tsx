import {
  useWorkoutPhasePulsingValue,
  UseWorkoutPhasePulsingValueParams,
} from '../hooks/useWorkoutPhasePulsingValue.ts';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { RunningWorkoutPhase } from '../types.ts';
import { workoutPhaseToTimerColorStatus } from '../constants.ts';

type RunningWorkoutPulsingBackgroundProps = Pick<
  UseWorkoutPhasePulsingValueParams,
  'workoutPhase' | 'enabled'
> & {
  workoutPhase: RunningWorkoutPhase;
  size: number;
  enabled: boolean;
};

export const RunningWorkoutPulsingBackground = ({
  workoutPhase,
  size,
  enabled,
}: RunningWorkoutPulsingBackgroundProps) => {
  const appColors = useAppThemedColors();

  const pulsingOpacity = useWorkoutPhasePulsingValue({
    workoutPhase,
    enabled,
    from: 0.05,
    to: 0.3,
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: pulsingOpacity.value,
  }));

  const staticStyle: ViewStyle = {
    position: 'absolute',
    borderRadius: '50%',
    width: size,
    height: size,
    backgroundColor: appColors[workoutPhaseToTimerColorStatus[workoutPhase]],
  };

  return <Animated.View style={[staticStyle, animatedStyle]} />;
};
