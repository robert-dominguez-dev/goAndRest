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
    /**
     * Watch value, running state, AND maxValue to detect phase changes.
     */
    () => ({ v: value, running: isRunning, max: maxValue }),
    (next, prev) => {
      const targetAngle = 2 * Math.PI;
      const currentAngle = countValueToAngleWorklet({
        value: next.v,
        maxValue: next.max,
      });

      const remainingTimeMs: number = (next.max - next.v) * ONE_SECOND_MS;

      if (next.running) {
        /**
         * 1. Detect manual skip (> 1s)
         * 2. Detect phase change (maxValue changed)
         * 3. Detect the start of new phase (v === 0)
         * 4. Detect resume (!prev.running)
         */
        const hasSkipped: boolean = !!prev && Math.abs(next.v - prev.v) > 1;
        const hasPhaseChanged: boolean = !!prev && next.max !== prev.max;
        const isNewPhase: boolean = next.v === 0;
        const isResuming: boolean = !!prev && !prev.running;

        if (isNewPhase || hasSkipped || hasPhaseChanged || isResuming) {
          cancelAnimation(theta);

          /**
           * We only snap to currentAngle if it's a hard jump or new phase.
           * On RESUME, we leave `theta.value` where it is visually to prevent jumping back.
           */
          if (isNewPhase || hasSkipped || hasPhaseChanged) {
            theta.value = currentAngle;
          }

          if (next.v < next.max) {
            theta.value = withTiming(targetAngle, {
              duration: remainingTimeMs,
              easing: Easing.linear,
            });
          }
        }
      } else {
        /**
         * MANUAL SYNC FOR PAUSE STATE:
         * Stop animation and snap to exact position for scrubbing/skipping.
         */
        cancelAnimation(theta);
        if (next.v !== prev?.v || next.max !== prev?.max) {
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
