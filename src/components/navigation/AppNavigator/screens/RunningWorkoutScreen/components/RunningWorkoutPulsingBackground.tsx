import {
  useWorkoutPhasePulsingValue,
  UseWorkoutPhasePulsingValueParams,
} from '../hooks/useWorkoutPhasePulsingValue.ts';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { FILL_CONTAINER_DIMENSION } from '../../../../../../constants/common.ts';
import { AppColorUnion } from '../../../../../../types/ui.ts';

export type RunningWorkoutPulsingBackgroundProps =
  UseWorkoutPhasePulsingValueParams & {
    backgroundColorStatus: AppColorUnion;
  };

export const RunningWorkoutPulsingBackground = ({
  backgroundColorStatus,
  timingConfig,
  enabled,
  from,
  to,
}: RunningWorkoutPulsingBackgroundProps) => {
  const appColors = useAppThemedColors();

  const pulsingOpacity = useWorkoutPhasePulsingValue({
    timingConfig,
    enabled,
    from,
    to,
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: pulsingOpacity.value,
  }));

  const staticStyle: ViewStyle = {
    position: 'absolute',
    height: FILL_CONTAINER_DIMENSION,
    width: FILL_CONTAINER_DIMENSION,
    backgroundColor: appColors[backgroundColorStatus],
  };

  return <Animated.View style={[staticStyle, animatedStyle]} />;
};
