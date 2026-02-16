import { memo } from 'react';
import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import {
  AppCircularSlider,
  AppCircularSliderProps,
} from '../../../../../../../controls/AppCircularSlider/AppCircularSlider.tsx';
import { getOnPressWithHapticFeedback } from '../../../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { AppSize } from '../../../../../../../../types/ui.ts';
import { WorkoutConfigCircularSliderConfirmButton } from './WorkoutConfigCircularSliderConfirmButton.tsx';

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
      <WorkoutConfigCircularSliderConfirmButton onPress={onConfirm} />
    </AppCircularSlider>
  );
};

export const WorkoutConfigCircularSlider = memo(
  WorkoutConfigCircularSliderComponent,
);
