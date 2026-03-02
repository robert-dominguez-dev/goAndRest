import { memo } from 'react';
import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import {
  AppCircularSlider,
  AppCircularSliderProps,
} from '../../../../../../../controls/AppCircularSlider/AppCircularSlider.tsx';
import { getOnPressWithHapticFeedback } from '../../../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { AppSize } from '../../../../../../../../types/ui.ts';
import { AppRoundedButtonUI } from '../../../../../../../controls/AppRoundedButton/AppRoundedButtonUI.tsx';
import { Pressable } from 'react-native';
import { preventDefaultHandler } from '../../../../../../../../helpers/preventDefaultHandler.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';
import { getMaxCircularIndicatorRadius } from '../../../../../../../../helpers/getMaxCircularIndicatorRadius.ts';

const STROKE_WIDTH = AppSize.l;

const MAX_WORKOUT_CONFIG_SLIDER_RADIUS = getMaxCircularIndicatorRadius({
  strokeWidth: STROKE_WIDTH,
  paddingTotal: AppSize.sm * 2,
});

export const WORKOUT_CONFIG_SLIDER_RADIUS = Math.min(
  160,
  MAX_WORKOUT_CONFIG_SLIDER_RADIUS,
);

const thumbElement = (
  <Pressable onPress={preventDefaultHandler}>
    <AppRoundedButtonUI
      pressed={false}
      size={'xs'}
      status={'slider'}>
      <AppView />
    </AppRoundedButtonUI>
  </Pressable>
);

export type WorkoutConfigCircularSliderProps = Pick<
  AppCircularSliderProps,
  | 'value'
  | 'onChange'
  | 'minValue'
  | 'maxValue'
  | 'step'
  | 'labelEveryNSteps'
  | 'valueFormatter'
  | 'children'
>;

const WorkoutConfigCircularSliderComponent = ({
  value,
  onChange,
  minValue,
  maxValue,
  step,
  labelEveryNSteps,
  valueFormatter,
  children,
}: WorkoutConfigCircularSliderProps) => {
  const { slider } = useAppThemedColors();

  return (
    <AppCircularSlider
      radius={WORKOUT_CONFIG_SLIDER_RADIUS}
      strokeWidth={STROKE_WIDTH}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      filledTrackColor={slider}
      labelEveryNSteps={labelEveryNSteps}
      valueFormatter={valueFormatter}
      value={value}
      onChange={getOnPressWithHapticFeedback(
        onChange,
        HapticFeedbackTypes.clockTick,
      )}
      thumbElement={thumbElement}>
      {children}
    </AppCircularSlider>
  );
};

export const WorkoutConfigCircularSlider = memo(
  WorkoutConfigCircularSliderComponent,
);
