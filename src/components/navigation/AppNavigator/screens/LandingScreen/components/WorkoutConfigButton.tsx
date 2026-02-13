import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../constants.ts';
import { memo } from 'react';
import { AppButton } from '../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { Control, useWatch } from 'react-hook-form';
import { AppBottomSheet } from '../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { useIsVisible } from '../../../../../common/AppBottomSheet/hooks/useIsVisible.ts';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { BottomSheetSubmitButtonProps } from '../../../../../common/AppBottomSheet/components/AppBottomSheetContent.tsx';

type WorkoutConfigButtonProps = {
  control: Control<AppWorkout>;
  name: AppWorkoutConfigKey;
};

const _WorkoutConfigButton = ({ control, name }: WorkoutConfigButtonProps) => {
  const t = useAppTranslation();

  const { isVisible, handleOpen, handleClose } = useIsVisible();

  const value = useWatch({
    control,
    name,
  });

  const {
    labelKey,
    descriptionKey,
    backgroundColorStatus,
    IconComponent,
    min,
    max,
    valueFormatter,
  } = workoutSettingsButtonConfigMap[name];

  const label = t(labelKey);
  const description = t(descriptionKey);

  const valueFormatted = valueFormatter(value);

  const bottomSheetContent = (
    <AppView>
      <AppText numberOfLines={0}>{description}</AppText>
    </AppView>
  );

  const bottomSheetSubmitButtonProps: BottomSheetSubmitButtonProps = {
    label: 'Potvrdit',
    backgroundColorStatus: 'primary',
    onPress: handleClose,
    value: valueFormatted,
  };

  return (
    <>
      <AppButton
        label={label}
        value={valueFormatted}
        backgroundColorStatus={backgroundColorStatus}
        IconComponent={IconComponent}
        onPress={handleOpen}
      />
      <AppBottomSheet
        closeable
        scrollable={false}
        isVisible={isVisible}
        bottomSheetTitle={label}
        bottomSheetContent={bottomSheetContent}
        backgroundColorStatus={backgroundColorStatus}
        bottomSheetSubmitButtonProps={bottomSheetSubmitButtonProps}
        onClose={handleClose}
      />
    </>
  );
};

export const WorkoutConfigButton = memo(_WorkoutConfigButton);
