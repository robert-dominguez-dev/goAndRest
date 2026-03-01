import React, { JSX } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { AppView } from '../../common/AppView/AppView.tsx';
import { useLayout } from '../../../hooks/useLayout.ts';
import { scheduleOnRN } from 'react-native-worklets';
import {
  AppCircularSliderBase,
  AppCircularSliderBaseProps,
  AppCircularSliderTicksCommonProps,
} from './components/AppCircularSliderBase.tsx';
import { useCircularSliderGeometry } from './hooks/useCircularSliderGeometry.ts';
import { countValueToAngleWorklet } from './helpers/countValueToAngleWorklet.ts';
import { GestureResponderEvent, Pressable } from 'react-native';
import { AppRoundedButtonSize } from '../AppRoundedButton/constants.ts';
import { sizes } from '../../../constants/ui.ts';
import { pressedInCircleGuard } from '../../../helpers/pressedInCircleGuard.ts';
import { preventDefaultHandler } from '../../../helpers/preventDefaultHandler.ts';

const TOTAL_THUMB_BUTTON_SIZE =
  sizes.defaultBorderWidth * 2 + AppRoundedButtonSize.xs;

const fallbackThumbElement = (
  <AppView
    width={40}
    height={40}
    borderRadius={20}
    backgroundColorStatus={'backgroundAlt'}
  />
);

export type AppCircularSliderProps = AppCircularSliderTicksCommonProps &
  Pick<AppCircularSliderBaseProps, 'labelEveryNSteps' | 'children' | 'step'> & {
    minValue: number;
    maxValue: number;
    value: number;
    onChange: (value: number) => void;
    thumbElement: JSX.Element;
    filledTrackColor?: string;
    trackColor?: string;
    onConfirm: () => void;
  };

export const AppCircularSlider = ({
  radius,
  strokeWidth,
  minValue,
  maxValue,
  value,
  onChange,
  thumbElement,
  children,
  labelEveryNSteps,
  valueFormatter,
  onConfirm,
  step = 1,
  filledTrackColor = 'black',
  trackColor = '#00000060',
}: AppCircularSliderProps) => {
  const containerPadding = TOTAL_THUMB_BUTTON_SIZE - strokeWidth;

  const { size, center, circumference, theta } = useCircularSliderGeometry({
    value,
    radius,
    strokeWidth,
    maxValue,
    padding: containerPadding,
    isRunning: false,
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

  const handleContainerPress = (event: GestureResponderEvent) =>
    pressedInCircleGuard(event, {
      radius: size / 2,
      onInsidePress: () => preventDefaultHandler(event),
      onOutsidePress: onConfirm,
    });

  const contentSize = size - TOTAL_THUMB_BUTTON_SIZE * 2;
  const contentRadius = contentSize / 2;

  const handleContentPress = (event: GestureResponderEvent) =>
    pressedInCircleGuard(event, {
      radius: contentRadius,
      onInsidePress: onConfirm,
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Pressable onPress={handleContainerPress}>
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
          filledTrackColor={filledTrackColor}>
          {/* Thumb with wrapper */}
          <Animated.View
            style={[
              animatedStyles,
              {
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <AppView onLayout={handleLayout}>
              {thumbElement ? thumbElement : fallbackThumbElement}
            </AppView>
          </Animated.View>
          <Pressable
            onPress={handleContentPress}
            style={{
              borderRadius: contentRadius,
              width: contentSize,
              height: contentSize,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            {children}
          </Pressable>
        </AppCircularSliderBase>
      </Pressable>
    </GestureDetector>
  );
};
