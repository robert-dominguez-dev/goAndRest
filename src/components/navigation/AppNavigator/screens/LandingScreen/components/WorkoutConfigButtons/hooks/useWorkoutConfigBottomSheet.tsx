import { AppWorkoutConfigKey, workoutSettingsButtonConfigMap, } from '../../../constants.ts';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { AppWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { Controller, useFormContext } from 'react-hook-form';
import { AppBottomSheetProps } from '../../../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { AppText } from '../../../../../../../common/AppText/AppText.tsx';
import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { X } from 'lucide-react-native';
import { WorkoutConfigCircularSlider } from '../components/WorkoutConfigCircularSlider.tsx';
import { WorkoutConfigBottomSheetFormattedValue } from '../components/WorkoutConfigBottomSheetFormattedValue.tsx';
import { AppIconAndLabel } from '../../../../../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { AppRow } from '../../../../../../../common/AppRow.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../../../constants/common.ts';
import { useAppBottomSheet } from '../../../../../../../common/AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { useRef } from 'react';

export const useWorkoutConfigBottomSheet = (name: AppWorkoutConfigKey) => {
  const t = useAppTranslation();

  const { control, getValues, setValue } = useFormContext<AppWorkout>();

  const lastValueRef = useRef<number>(null);

  const handleTakeLastValueSnapshot = () => {
    lastValueRef.current = getValues(name);
  };

  const handleClearLastValueSnapshot = () => {
    lastValueRef.current = null;
  };

  const handleRevertChanges = () => {
    if (lastValueRef.current !== null) {
      setValue(name, lastValueRef.current);
    }
    handleClearLastValueSnapshot();
  };

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

  const renderContent: AppBottomSheetProps['renderContent'] = ({ onClose }) => {
    const handleConfirm = () => {
      handleClearLastValueSnapshot();
      onClose();
    };

    return (
      <AppView
        gap={'l'}
        paddingBottom={'m'}
        alignItems={'center'}>
        <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {t(descriptionKey)}
        </AppText>
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
                onConfirm={handleConfirm}
              />
            )}
          />
        </GestureHandlerRootView>
      </AppView>
    );
  };

  const iconAndTitleElement = (
    <AppView>
      <AppRow
        gap={'s'}
        alignItems={'center'}>
        <AppIconAndLabel
          label={t(labelKey)}
          IconComponent={IconComponent}
          category={'header'}
        />
      </AppRow>
    </AppView>
  );

  const { bottomSheet, handleOpen } = useAppBottomSheet();

  const openWorkoutConfigBottomSheet = () => {
    handleTakeLastValueSnapshot();
    handleOpen({
      renderContent,
      title: iconAndTitleElement,
      backgroundColorStatus,
      AccessoryRightIconComponent: X,
      onAccessoryRightPress: handleRevertChanges,
    });
  };

  return { bottomSheet, openWorkoutConfigBottomSheet };
};
