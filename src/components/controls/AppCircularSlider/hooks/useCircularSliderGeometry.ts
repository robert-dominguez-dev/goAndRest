import { cancelAnimation, Easing, useAnimatedReaction, useSharedValue, withTiming, } from 'react-native-reanimated';
import { countValueToAngleWorklet } from '../helpers/countValueToAngleWorklet.ts';
import { ONE_SECOND_MS } from '../../../../constants/common.ts';

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
    () => ({ v: value, running: isRunning }),
    (next, prev) => {
      const targetAngle = 2 * Math.PI;

      const currentAngle = countValueToAngleWorklet({
        value: next.v,
        maxValue,
      });

      const remainingTimeMs: number = (maxValue - next.v) * ONE_SECOND_MS;

      if (next.running) {
        /**
         * Detect a time users skip greater than 1s or the start of a new phase (v === 0).
         */
        const hasSkippedOrStartedNewPhase: boolean =
          !!prev && Math.abs(next.v - prev.v) > 1;

        const isNewPhase = next.v === 0;

        if (isNewPhase || hasSkippedOrStartedNewPhase || !prev?.running) {
          /**
           * If the timer just started, a phase changed, or a manual skip occurred,
           * reset the animation and restart the smooth transition to the end.
           */
          cancelAnimation(theta);
          theta.value = currentAngle;

          if (next.v < maxValue) {
            theta.value = withTiming(targetAngle, {
              duration: remainingTimeMs,
              easing: Easing.linear,
            });
          }
        }

        /**
         * For regular ticks (hasSkippedOrStartedNewPhase === false), we do nothing.
         * This allows the existing withTiming animation to run smoothly without interruption.
         */
      } else {
        /**
         * MANUAL SYNC FOR PAUSE STATE:
         * When the timer is paused, we bypass the animation and sync theta
         * directly with the external value (useful for manual scrubbing/skipping).
         */
        cancelAnimation(theta);
        if (next.v !== prev?.v) {
          theta.value = currentAngle;
        }
      }
    },
    [isRunning, maxValue, value],
  );

  return {
    size,
    center,
    circumference,
    theta,
  };
};
