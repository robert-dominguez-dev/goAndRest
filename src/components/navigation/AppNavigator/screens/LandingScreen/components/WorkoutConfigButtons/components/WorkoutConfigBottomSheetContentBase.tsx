import { AppBottomSheetRenderContentProps } from '../../../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { AppText } from '../../../../../../../common/AppText/AppText.tsx';
import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  WorkoutConfigCircularSlider,
  WorkoutConfigCircularSliderProps,
} from './WorkoutConfigCircularSlider.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../../../constants/common.ts';
import { memo } from 'react';
import { Pressable } from 'react-native';
import { getPressableOpacity } from '../../../../../../../controls/helpers/getPressableOpacity.ts';
import { getOnPressWithHapticFeedback } from '../../../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

export type WorkoutConfigBottomSheetContentBaseProps =
  AppBottomSheetRenderContentProps &
    Pick<
      WorkoutConfigCircularSliderProps,
      | 'valueFormatter'
      | 'onChange'
      | 'onConfirm'
      | 'minValue'
      | 'maxValue'
      | 'step'
      | 'labelEveryNSteps'
    > & {
      description: string;
      value: number;
    };

const WorkoutConfigBottomSheetContentBaseComponent = ({
  onChange,
  onConfirm,
  onClose,
  description,
  value,
  valueFormatter,
  minValue,
  maxValue,
  step,
  labelEveryNSteps,
}: WorkoutConfigBottomSheetContentBaseProps) => {
  const handleConfirm = () =>
    getOnPressWithHapticFeedback(() => {
      onConfirm();
      onClose();
    }, HapticFeedbackTypes.selection)(undefined);

  return (
    <GestureHandlerRootView>
      <Pressable onPress={handleConfirm}>
        {({ pressed }) => {
          const opacity = getPressableOpacity({
            pressed,
            disabled: false,
          });

          return (
            <AppView
              opacity={opacity}
              gap={'l'}
              paddingBottom={'m'}
              alignItems={'center'}>
              <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
                {description}
              </AppText>
              <WorkoutConfigCircularSlider
                value={value}
                onChange={onChange}
                minValue={minValue}
                maxValue={maxValue}
                step={step}
                labelEveryNSteps={labelEveryNSteps}
                valueFormatter={valueFormatter}
                onConfirm={handleConfirm}
              />
            </AppView>
          );
        }}
      </Pressable>
    </GestureHandlerRootView>
  );
};

export const WorkoutConfigBottomSheetContentBase = memo(
  WorkoutConfigBottomSheetContentBaseComponent,
);
