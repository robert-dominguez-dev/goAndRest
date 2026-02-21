import {
  cancelAnimation,
  Easing,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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

  const theta = useSharedValue(0);

  useAnimatedReaction(
    () => ({ running: isRunning, v: value }),
    (next, prev) => {
      // 1. VÝPOČET CÍLE
      const targetAngle = 2 * Math.PI;
      const currentAngle = (next.v / maxValue) * (2 * Math.PI);
      const remainingTimeMs = (maxValue - next.v) * 1000;

      // 2. DETEKCE SKOKU (Tlačítko Skip nebo Reset)
      // Pokud se hodnota změnila o víc než 0.5s oproti předchozí,
      // znamená to, že se s timerem pohnulo manuálně.
      const hasJumped = prev && Math.abs(next.v - prev.v) > 0.5;

      if (next.v === 0 || hasJumped) {
        cancelAnimation(theta);
        theta.value = currentAngle; // Okamžitě skočíme na novou pozici

        if (next.running) {
          // A hned odpálíme novou animaci do konce z téhle pozice
          theta.value = withTiming(targetAngle, {
            duration: remainingTimeMs,
            easing: Easing.linear,
          });
        }
        return;
      }

      // 3. START PŘI PAUZE -> RUN
      if (next.running && !prev?.running) {
        theta.value = withTiming(targetAngle, {
          duration: remainingTimeMs,
          easing: Easing.linear,
        });
      }

      // 4. STOP PŘI RUN -> PAUZA
      if (!next.running && prev?.running) {
        cancelAnimation(theta);
        theta.value = currentAngle; // Ukotvíme to na přesné hodnotě z JS
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
