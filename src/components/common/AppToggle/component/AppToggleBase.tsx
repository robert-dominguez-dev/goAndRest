import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';

const TRACK_WIDTH = 64;
const TRACK_HEIGHT = 30;
const TRACK_PADDING = 2;

const BOTH_SIDES_PADDING = TRACK_PADDING * 2;

const THUMB_WIDTH = 42;
const THUMB_HEIGHT = TRACK_HEIGHT - BOTH_SIDES_PADDING;

const SLIDE_WIDTH = TRACK_WIDTH - THUMB_WIDTH - BOTH_SIDES_PADDING;

export type AppToggleBaseProps = {
  value: boolean;
};

export const AppToggleBase = ({ value }: AppToggleBaseProps) => {
  const { backgroundAlt, background, primary } = useAppThemedColors();

  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 200 });
  }, [value]);

  const animatedTrackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [backgroundAlt, primary],
    );
    return { backgroundColor };
  });

  const animatedThumbStyle = useAnimatedStyle(() => {
    const translateX = progress.value * SLIDE_WIDTH;
    return {
      transform: [{ translateX }],
    };
  });

  const trackStyle: ViewStyle = {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    padding: TRACK_PADDING,
    justifyContent: 'center',
  };

  const thumbStyle: ViewStyle = {
    backgroundColor: background,
    borderRadius: THUMB_HEIGHT / 2,
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: TRACK_PADDING },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 3,
  };

  return (
    <Animated.View style={[trackStyle, animatedTrackStyle]}>
      <Animated.View style={[thumbStyle, animatedThumbStyle]} />
    </Animated.View>
  );
};
