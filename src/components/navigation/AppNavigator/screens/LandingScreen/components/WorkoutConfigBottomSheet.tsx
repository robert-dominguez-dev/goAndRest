import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../constants.ts';
import { memo } from 'react';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { Control, Controller } from 'react-hook-form';
import { AppBottomSheet } from '../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { X } from 'lucide-react-native';
import {
  WorkoutConfigCircularSlider,
  WorkoutConfigCircularSliderProps,
} from './WorkoutConfigCircularSlider.tsx';
import { WorkoutConfigBottomSheetFormattedValue } from './WorkoutConfigBottomSheetFormattedValue.tsx';
import { AppButtonIconAndLabel } from '../../../../../controls/AppButton/components/AppButtonIconAndLabel.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';

type WorkoutConfigBottomSheetProps = Pick<
  WorkoutConfigCircularSliderProps,
  'onConfirm'
> & {
  name: AppWorkoutConfigKey;
  control: Control<AppWorkout>;
  isVisible: boolean;
  onClose: () => void;
};

const _WorkoutConfigBottomSheet = ({
  name,
  control,
  isVisible,
  onClose,
  onConfirm,
}: WorkoutConfigBottomSheetProps) => {
  const t = useAppTranslation();

  const {
    labelKey,
    descriptionKey,
    backgroundColorStatus,
    IconComponent,
    min,
    max,
    step,
    labelEveryNSteps,
    valueFormatter,
  } = workoutSettingsButtonConfigMap[name];

  const bottomSheetContent = (
    <AppView
      gap={'l'}
      paddingBottom={'m'}
      alignItems={'center'}>
      <AppText numberOfLines={0}>{t(descriptionKey)}</AppText>
      <WorkoutConfigBottomSheetFormattedValue
        control={control}
        name={name}
        valueFormatter={valueFormatter}
      />
      <GestureHandlerRootView>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <WorkoutConfigCircularSlider
              value={field.value}
              onChange={field.onChange}
              minValue={min}
              maxValue={max}
              step={step}
              labelEveryNSteps={labelEveryNSteps}
              valueFormatter={valueFormatter}
              onConfirm={onConfirm}
            />
          )}
        />
      </GestureHandlerRootView>
    </AppView>
  );

  const iconAndTitleElement = (
    <AppView>
      <AppRow
        gap={'s'}
        alignItems={'center'}>
        <AppButtonIconAndLabel
          label={t(labelKey)}
          IconComponent={IconComponent}
        />
      </AppRow>
    </AppView>
  );

  return (
    <AppBottomSheet
      closeable
      scrollable={false}
      bottomSheetTitle={iconAndTitleElement}
      isVisible={isVisible}
      bottomSheetContent={bottomSheetContent}
      backgroundColorStatus={backgroundColorStatus}
      AccessoryRightIconComponent={X}
      onClose={onClose}
    />
  );
};

export const WorkoutConfigBottomSheet = memo(_WorkoutConfigBottomSheet);
