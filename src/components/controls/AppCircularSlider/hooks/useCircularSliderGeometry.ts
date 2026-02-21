import {
  cancelAnimation,
  Easing,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { countValueToAngleWorklet } from '../helpers/countValueToAngleWorklet.ts';

type UseCircularSliderGeometryParams = {
  value: number;
  maxValue: number;
  radius: number;
  strokeWidth: number;
  padding?: number;
  isRunning: boolean;
};

export const useCircularSliderGeometry = ({
  value,
  maxValue,
  radius,
  strokeWidth,
  isRunning,
  padding = 0,
}: UseCircularSliderGeometryParams) => {
  /**
   * Total component size (diameter + line thickness + thumb offset)...
   */
  const size: number = radius * 2 + strokeWidth + padding;
  const center = size / 2;
  const circumference = radius * 2 * Math.PI;

  const theta = useSharedValue(countValueToAngleWorklet({ value, maxValue }));

  useAnimatedReaction(
    () => ({ v: value, running: isRunning, max: maxValue }),
    (next, prev) => {
      const targetAngle = 2 * Math.PI;

      const currentAngle = countValueToAngleWorklet({
        value: next.v,
        maxValue: next.max,
      });

      cancelAnimation(theta);

      const hasChanged = prev?.v !== next.v || prev?.max !== next.max;

      if (hasChanged) {
        theta.value = currentAngle;
      }

      /**
       * Animating only from 0 to max...
       */
      if (next.running && next.v < next.max) {
        theta.value = withTiming(targetAngle, {
          duration: next.max - next.v,
          easing: Easing.linear,
        });
      }
    },
    [value, isRunning, maxValue],
  );

  return {
    size,
    center,
    circumference,
    theta,
  };
};
