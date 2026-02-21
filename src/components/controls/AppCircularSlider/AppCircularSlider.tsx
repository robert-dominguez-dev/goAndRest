import React, { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ChildrenProp } from '../../../types/common.ts';
import { AppSize } from '../../../types/ui.ts';
import { AppView } from '../../common/AppView/AppView.tsx';
import { useLayout } from '../../../hooks/useLayout.ts';
import { scheduleOnRN } from 'react-native-worklets';
import {
  AppCircularSliderBase,
  AppCircularSliderTicksCommonProps,
} from './components/AppCircularSliderBase.tsx';
import { useCircularSliderGeometry } from './hooks/useCircularSliderGeometry.ts';
import { countValueToAngleWorklet } from './helpers/countValueToAngleWorklet.ts';

const THUMB_OFFSET = AppSize.m;

const fallbackThumbElement = (
  <AppView
    width={40}
    height={40}
    borderRadius={20}
    backgroundColorStatus={'backgroundAlt'}
  />
);

export type AppCircularSliderProps = AppCircularSliderTicksCommonProps &
  Partial<ChildrenProp> & {
    minValue: number;
    maxValue: number;
    value: number;
    onChange: (value: number) => void;
    thumbElement: JSX.Element;
    filledTrackColor?: string;
    trackColor?: string;
  };

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
  const { size, center, circumference, theta } = useCircularSliderGeometry({
    value,
    radius,
    strokeWidth,
    maxValue,
    padding: THUMB_OFFSET * 2,
  });

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

    const steppedAngle = countValueToAngleWorklet({
      value: normalizedValue,
      maxValue,
    });

    if (normalizedValue !== value) {
      theta.value = steppedAngle;
      scheduleOnRN(onChange, normalizedValue);
    }
  });

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
        <AppCircularSliderBase
          size={size}
          circumference={circumference}
          radius={radius}
          center={center}
          maxValue={maxValue}
          step={step}
          theta={theta}
          labelEveryNSteps={labelEveryNSteps}
          strokeWidth={strokeWidth}
          valueFormatter={valueFormatter}
          trackColor={trackColor}
          filledTrackColor={filledTrackColor}
        />
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
