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

  // Celková velikost komponenty (průměr + tloušťka čáry + rezerva na knob)
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

  // Synchronizace s externí hodnotou (controlled component)
  useAnimatedReaction(
    () => value,
    nextValue => {
      theta.value = valueToAngle(nextValue);
    },
  );

  const panGesture = Gesture.Pan().onUpdate(event => {
    const x = event.x - center;
    const y = event.y - center;

    // Výpočet úhlu (0 až 2*PI)
    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;

    const currentAngle = theta.value;

    // --- LOGIKA PEVNÉ ZARÁŽKY ---
    // Pokud jsme v horní části (kolem 12. hodiny), kontrolujeme drastické změny úhlu.
    // Jedna otočka má 6.28 (2*PI) radiánů.
    // Pokud je rozdíl mezi starým a novým úhlem větší než PI (3.14),
    // znamená to, že se uživatel snaží přeskočit zarážku.

    const diff = angle - currentAngle;

    if (Math.abs(diff) > Math.PI) {
      // Pokud se snažíme přeskočit z MAX do MIN (pohyb vpřed přes zarážku)
      if (currentAngle > Math.PI && angle < Math.PI) {
        angle = 2 * Math.PI; // Zůstaň na konci
      }
      // Pokud se snažíme přeskočit z MIN do MAX (pohyb vzad přes zarážku)
      else if (currentAngle < Math.PI && angle > Math.PI) {
        angle = 0; // Zůstaň na začátku
      }
    }
    // ----------------------------

    const totalSteps = (maxValue - minValue) / step;
    const currentStep = Math.round((angle / (2 * Math.PI)) * totalSteps);
    const normalizedValue = Math.min(
      maxValue,
      Math.max(minValue, minValue + currentStep * step),
    );

    // Výpočet úhlu odpovídajícího přesné krokované hodnotě pro plynulé zarážky
    const steppedAngle = valueToAngle(normalizedValue);

    if (normalizedValue !== value) {
      theta.value = steppedAngle; // Aktualizujeme sharedValue pro plynulost
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
      left: x - (layout?.width ?? 0) / 2, // polovina šířky tvojí komponenty
      top: y - (layout?.height ?? 0) / 2, // polovina výšky tvojí komponenty
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
              {/* Pozadí stopy */}
              <Circle
                cx={center}
                cy={center}
                r={radius}
                stroke={text}
                strokeWidth={strokeWidth}
                fill={'none'}
              />
              {/* Aktivní část */}
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
            {/* Knoflík (Táhlo) */}
          </Svg>
        </View>
      </GestureDetector>
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
          {thumbElement ? (
            thumbElement
          ) : (
            <AppView
              width={40}
              height={40}
              borderRadius={20}
              backgroundColorStatus={'backgroundAlt'}
            />
          )}
        </AppView>
      </Animated.View>
    </View>
  );
};
