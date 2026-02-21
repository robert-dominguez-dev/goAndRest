import { useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { countValueToAngleWorklet } from '../helpers/countValueToAngleWorklet.ts';

type UseCircularSliderGeometryParams = {
  value: number;
  maxValue: number;
  radius: number;
  strokeWidth: number;
  padding: number;
};

export const useCircularSliderGeometry = ({
  value,
  maxValue,
  radius,
  strokeWidth,
  padding,
}: UseCircularSliderGeometryParams) => {
  /**
   * Total component size (diameter + line thickness + thumb offset)...
   */
  const size: number = radius * 2 + strokeWidth + padding;
  const center = size / 2;
  const circumference = radius * 2 * Math.PI;

  const theta = useSharedValue(countValueToAngleWorklet({ value, maxValue }));

  /**
   * Sync with external `value` prop...
   */
  useAnimatedReaction(
    () => value,
    (nextValue, prevValue) => {
      if (nextValue !== prevValue) {
        theta.value = countValueToAngleWorklet({ value: nextValue, maxValue });
      }
    },
    [value, maxValue],
  );

  return {
    size,
    center,
    circumference,
    theta,
  };
};
