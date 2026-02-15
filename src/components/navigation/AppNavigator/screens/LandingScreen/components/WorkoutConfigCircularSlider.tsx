import { memo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import {
  AppCircularSlider,
  AppCircularSliderProps,
} from '../../../../../controls/AppCircularSlider/AppCircularSlider.tsx';
import { getOnPressWithHapticFeedback } from '../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { AppRoundedButton } from '../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { AppSize } from '../../../../../../types/ui.ts';
import { Save } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { ACTIVE_OPACITY, PRESSED_OPACITY, } from '../../../../../../constants/ui.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

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
  const { slider, text } = useAppThemedColors();

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
      <Pressable
        onPress={getOnPressWithHapticFeedback(
          onConfirm,
          HapticFeedbackTypes.selection,
        )}>
        {({ pressed }) => {
          const opacity: number = pressed ? PRESSED_OPACITY : ACTIVE_OPACITY;
          return (
            <AppView
              width={SLIDER_RADIUS}
              height={SLIDER_RADIUS}
              borderRadius={SLIDER_RADIUS / 2}
              justifyContent={'center'}
              alignItems={'center'}>
              <Save
                opacity={opacity}
                color={text}
                size={AppSize.xl}
              />
            </AppView>
          );
        }}
      </Pressable>
    </AppCircularSlider>
  );
};

export const WorkoutConfigCircularSlider = memo(
  WorkoutConfigCircularSliderComponent,
);
