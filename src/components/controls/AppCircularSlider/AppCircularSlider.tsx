import React, { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ChildrenProp } from '../../../types/common.ts';
import { AppSize } from '../../../types/ui.ts';
import { AppView } from '../../common/AppView/AppView.tsx';
import { useLayout } from '../../../hooks/useLayout.ts';
import { scheduleOnRN } from 'react-native-worklets';
import {
  AppCircularSliderTicks,
  AppCircularSliderTicksProps,
} from './components/AppCircularSliderTicks.tsx';

const fallbackThumbElement = (
  <AppView
    width={40}
    height={40}
    borderRadius={20}
    backgroundColorStatus={'backgroundAlt'}
  />
);

type AppCircularSliderProps = Partial<ChildrenProp> &
  Pick<
    AppCircularSliderTicksProps,
    'radius' | 'strokeWidth' | 'step' | 'labelEveryNSteps' | 'valueFormatter'
  > & {
    minValue: number;
    maxValue: number;
    value: number;
    onChange: (value: number) => void;
    thumbElement: JSX.Element;
    filledTrackColor?: string;
    trackColor?: string;
  };

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const AppCircularSlider = ({
  radius,
  strokeWidth,
  minValue,
  maxValue,
  step,
  value,
  onChange,
  thumbElement,
  children,
  labelEveryNSteps,
  valueFormatter,
  filledTrackColor = 'black',
  trackColor = '#00000060',
}: AppCircularSliderProps) => {
  /**
   * Total component size (diameter + line thickness + thumb offset)...
   */
  const knobSize = strokeWidth + AppSize.m;
  const size = radius * 2 + Math.max(strokeWidth, knobSize);
  const center = size / 2;
  const circumference = radius * 2 * Math.PI;

  /**
   * VISUAL CALCULATION
   * Percentage is calculated against 0 -> maxValue so the visual start is always 0.
   */
  const valueToAngle = (val: number) => {
    'worklet';
    const percentage = val / maxValue;
    return percentage * 2 * Math.PI;
  };

  const theta = useSharedValue(valueToAngle(value));

  /**
   * Sync with external `value` prop...
   */
  useAnimatedReaction(
    () => value,
    nextValue => {
      theta.value = valueToAngle(nextValue);
    },
  );

  const panGesture = Gesture.Pan().onUpdate(event => {
    const x = event.x - center;
    const y = event.y - center;

    let angle = Math.atan2(y, x) + Math.PI / 2;

    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    const currentAngle = theta.value;

    /**
     * FIXED STOP LOGIC
     */
    const diff = angle - currentAngle;

    if (Math.abs(diff) > Math.PI) {
      if (currentAngle > Math.PI && angle < Math.PI) {
        angle = 2 * Math.PI;
      } else if (currentAngle < Math.PI && angle > Math.PI) {
        angle = 0;
      }
    }

    /**
     * LOGICAL BOUNDARIES
     * We calculate steps based on 0 -> maxValue, but clamp the result to [minValue, maxValue].
     */
    const totalSteps = maxValue / step;
    const currentStep = Math.round((angle / (2 * Math.PI)) * totalSteps);

    const normalizedValue = Math.min(
      maxValue,
      Math.max(minValue, currentStep * step),
    );

    const steppedAngle = valueToAngle(normalizedValue);

    if (normalizedValue !== value) {
      theta.value = steppedAngle;
      scheduleOnRN(onChange, normalizedValue);
    }
  });

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset:
      circumference - (theta.value / (2 * Math.PI)) * circumference,
  }));

  const { handleLayout, layout } = useLayout();

  const animatedStyles = useAnimatedStyle(() => {
    const x = center + radius * Math.sin(theta.value);
    const y = center - radius * Math.cos(theta.value);

    return {
      left: x - (layout?.width ?? 0) / 2,
      top: y - (layout?.height ?? 0) / 2,
    };
  });

  return (
    <View
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <GestureDetector gesture={panGesture}>
        <View style={{ width: size, height: size }}>
          <Svg
            width={size}
            height={size}>
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
      </GestureDetector>
      {/* Center content */}
      <View
        style={{
          ...StyleSheet.absoluteFill,
          pointerEvents: 'box-none',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 0,
        }}>
        {children}
      </View>
      {/* Thumb with wrapper */}
      <Animated.View
        style={[
          animatedStyles,
          {
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
        pointerEvents={'none'}>
        <AppView onLayout={handleLayout}>
          {thumbElement ? thumbElement : fallbackThumbElement}
        </AppView>
      </Animated.View>
    </View>
  );
};
