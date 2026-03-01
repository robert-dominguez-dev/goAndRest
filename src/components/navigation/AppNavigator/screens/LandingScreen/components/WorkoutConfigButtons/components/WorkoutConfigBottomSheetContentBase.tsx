import { AppText } from '../../../../../../../common/AppText/AppText.tsx';
import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  WORKOUT_CONFIG_SLIDER_RADIUS,
  WorkoutConfigCircularSlider,
  WorkoutConfigCircularSliderProps,
} from './WorkoutConfigCircularSlider.tsx';
import { memo } from 'react';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../../../constants/common.ts';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';

const INFO_TEXT_PADDING = WORKOUT_CONFIG_SLIDER_RADIUS / 1.5;

export type WorkoutConfigBottomSheetContentBaseProps = Pick<
  WorkoutConfigCircularSliderProps,
  | 'valueFormatter'
  | 'onChange'
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
  description,
  value,
  valueFormatter,
  minValue,
  maxValue,
  step,
  labelEveryNSteps,
}: WorkoutConfigBottomSheetContentBaseProps) => {
  const t = useAppTranslation();

  const valueFormatted: string = valueFormatter?.(value) ?? String(value);

  return (
    <GestureHandlerRootView>
      <AppView
        gap={'l'}
        paddingVertical={'m'}
        alignItems={'center'}>
        <AppView gap={'xxs'}>
          <AppText
            grow={false}
            textAlign={'center'}
            numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
            {description}
          </AppText>
          <AppText
            grow={false}
            textAlign={'center'}
            numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
            {t('common.pressAnywhere')}
          </AppText>
        </AppView>
        <AppText
          grow={false}
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
          valueFormatter={valueFormatter}>
          <AppView paddingHorizontal={INFO_TEXT_PADDING}></AppView>
        </WorkoutConfigCircularSlider>
      </AppView>
    </GestureHandlerRootView>
  );
};

export const WorkoutConfigBottomSheetContentBase = memo(
  WorkoutConfigBottomSheetContentBaseComponent,
);
