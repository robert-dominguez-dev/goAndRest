import React, { memo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import {
  AppCircularSliderTicks,
  AppCircularSliderTicksProps,
} from './AppCircularSliderTicks.tsx';

export type AppCircularSliderTicksCommonProps = Pick<
  AppCircularSliderTicksProps,
  'radius' | 'strokeWidth' | 'step' | 'valueFormatter'
>;

export type AppCircularSliderBaseProps = AppCircularSliderTicksCommonProps & {
  maxValue: number;
  theta: SharedValue<number>;
  size: number;
  center: number;
  circumference: number;
  trackColor: string;
  filledTrackColor: string;
  labelEveryNSteps?: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AppCircularSliderBaseComponent = ({
  maxValue,
  step,
  strokeWidth,
  size,
  radius,
  circumference,
  labelEveryNSteps,
  valueFormatter,
  center,
  trackColor,
  filledTrackColor,
  theta,
}: AppCircularSliderBaseProps) => {
  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset:
      circumference - (theta.value / (2 * Math.PI)) * circumference,
  }));

  return (
    <View
      style={{ width: size, height: size }}
      collapsable={false}>
      <Svg
        width={size}
        height={size}>
        {!!labelEveryNSteps && (
          <AppCircularSliderTicks
            center={center}
            totalRange={maxValue}
            step={step}
            trackColor={trackColor}
            strokeWidth={strokeWidth}
            radius={radius}
            labelEveryNSteps={labelEveryNSteps}
            valueFormatter={valueFormatter}
          />
        )}
        <G transform={`rotate(-90, ${center}, ${center})`}>
          {/* Track background */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill={'none'}
          />
          {/* Active track part */}
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            stroke={filledTrackColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            animatedProps={animatedCircleProps}
            strokeLinecap={'round'}
            fill={'none'}
          />
        </G>
      </Svg>
    </View>
  );
};

export const AppCircularSliderBase = memo(AppCircularSliderBaseComponent);
