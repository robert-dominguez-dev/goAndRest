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
import { useAppThemedColors } from '../../../hooks/useAppThemedColors.ts';

const fallbackThumbElement = (
  <AppView
    width={40}
    height={40}
    borderRadius={20}
    backgroundColorStatus={'backgroundAlt'}
  />
);

type AppCircularSliderProps = Partial<ChildrenProp> & {
  radius: number;
  strokeWidth: number;
  minValue: number;
  maxValue: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  thumbElement: JSX.Element;
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
}: AppCircularSliderProps) => {
  const { text, backgroundAlt } = useAppThemedColors();

  /**
   * Total component size (diameter + line thickness + thumb offset)...
   */
  const knobSize = strokeWidth + AppSize.m;
  const size = radius * 2 + Math.max(strokeWidth, knobSize);
  const center = size / 2;
  const circumference = radius * 2 * Math.PI;

  const valueToAngle = (val: number) => {
    'worklet';
    const percentage = (val - minValue) / (maxValue - minValue);
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
     * When in the upper section (near the 12 o'clock position), we monitor for
     * drastic changes in angle to prevent "flipping" between min and max values.
     * One full rotation equals 2*PI (~6.28) radians. If the delta between the
     * current and new angle exceeds PI (~3.14), the user is attempting to
     * cross the mechanical stop.
     */
    const diff = angle - currentAngle;

    if (Math.abs(diff) > Math.PI) {
      /**
       * MAX to MIN stop...
       */
      if (currentAngle > Math.PI && angle < Math.PI) {
        /**
         * Stays at the end...
         */
        angle = 2 * Math.PI;
      } else if (currentAngle < Math.PI && angle > Math.PI) {
        /**
         * MIN to MAX stop, stays at the start...
         */
        angle = 0;
      }
    }

    const totalSteps = (maxValue - minValue) / step;
    const currentStep = Math.round((angle / (2 * Math.PI)) * totalSteps);
    const normalizedValue = Math.min(
      maxValue,
      Math.max(minValue, minValue + currentStep * step),
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
            <G
              rotation={'-90'}
              origin={`${center}, ${center}`}>
              {/* Track background */}
              <Circle
                cx={center}
                cy={center}
                r={radius}
                stroke={text}
                strokeWidth={strokeWidth}
                fill={'none'}
              />
              {/* Active track part */}
              <AnimatedCircle
                cx={center}
                cy={center}
                r={radius}
                stroke={backgroundAlt}
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
