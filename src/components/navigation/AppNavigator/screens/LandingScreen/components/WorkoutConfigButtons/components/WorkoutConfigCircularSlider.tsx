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
import { AppText } from '../../../../../../../common/AppText/AppText.tsx';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

const SLIDER_RADIUS = 160;

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
> & { onConfirm: () => void };

const WorkoutConfigCircularSliderComponent = ({
  value,
  onChange,
  minValue,
  maxValue,
  step,
  labelEveryNSteps,
  valueFormatter,
  onConfirm,
}: WorkoutConfigCircularSliderProps) => {
  const { slider } = useAppThemedColors();

  const valueFormatted: string = valueFormatter?.(value) ?? String(value);

  return (
    <AppCircularSlider
      radius={SLIDER_RADIUS}
      strokeWidth={AppSize.l}
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
      onConfirm={onConfirm}
      thumbElement={thumbElement}>
      <AppText
        grow={false}
        category={'header'}
        textAlign={'center'}
        fontSizeOverride={'3xl'}>
        {valueFormatted}
      </AppText>
    </AppCircularSlider>
  );
};

export const WorkoutConfigCircularSlider = memo(
  WorkoutConfigCircularSliderComponent,
);
