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
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const valueFormatted: string = valueFormatter?.(value) ?? String(value);

  return (
    <GestureHandlerRootView>
      <AppView
        gap={'l'}
        paddingBottom={'m'}
        alignItems={'center'}>
        <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {description}
        </AppText>
        <AppText
          category={'header'}
          textAlign={'center'}
          fontSizeOverride={'3xl'}>
          {valueFormatted}
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
    </GestureHandlerRootView>
  );
};

export const WorkoutConfigBottomSheetContentBase = memo(
  WorkoutConfigBottomSheetContentBaseComponent,
);
