import { memo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import {
  AppCircularSlider,
  AppCircularSliderProps,
} from '../../../../../controls/AppCircularSlider/AppCircularSlider.tsx';
import { getOnPressWithHapticFeedback } from '../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { AppRoundedButton } from '../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { Check } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { AppSize } from '../../../../../../types/ui.ts';
import { roundedButtonToIconSize } from '../../../../../controls/AppRoundedButton/constants.ts';

const SLIDER_RADIUS = 160;

const thumbElement = (
  <AppRoundedButton
    size={'xs'}
    status={'slider'}>
    <AppView />
  </AppRoundedButton>
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

const _WorkoutConfigCircularSlider = ({
  value,
  onChange,
  minValue,
  maxValue,
  step,
  labelEveryNSteps,
  valueFormatter,
  onConfirm,
}: WorkoutConfigCircularSliderProps) => {
  const { text, slider } = useAppThemedColors();

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
      onChange={getOnPressWithHapticFeedback(onChange)}
      thumbElement={thumbElement}>
      <AppRoundedButton
        onPress={onConfirm}
        status={'primary'}
        size={'m'}>
        <Check
          size={roundedButtonToIconSize.m}
          color={text}
        />
      </AppRoundedButton>
    </AppCircularSlider>
  );
};

export const WorkoutConfigCircularSlider = memo(_WorkoutConfigCircularSlider);
