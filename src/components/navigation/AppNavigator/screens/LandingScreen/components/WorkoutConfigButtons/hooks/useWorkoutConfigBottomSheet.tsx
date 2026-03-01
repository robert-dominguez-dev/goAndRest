import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../../../constants.ts';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { useFormContext } from 'react-hook-form';
import { WorkoutConfigBottomSheetContent } from '../components/WorkoutConfigBottomSheetContent.tsx';
import { WorkoutConfigBottomSheetIconAndTitle } from '../components/WorkoutConfigBottomSheetIconAndTitle.tsx';
import { useSliderBottomSheet } from '../../../../../../../../hooks/useSliderBottomSheet.tsx';

export const useWorkoutConfigBottomSheet = (name: AppWorkoutConfigKey) => {
  const t = useAppTranslation();

  const { control, getValues, setValue } =
    useFormContext<AppWorkoutFieldValues>();

  const { bottomSheet, open, confirm, revert } = useSliderBottomSheet({
    getDuration: () => getValues(name),
    setDuration: value => setValue(name, value),
  });

  const { labelKey, backgroundColorStatus, IconComponent } =
    workoutSettingsButtonConfigMap[name];

  const renderContent = () => (
    <WorkoutConfigBottomSheetContent
      name={name}
      control={control}
    />
  );
  const openWorkoutConfigBottomSheet = () =>
    open({
      renderContent,
      backgroundColorStatus,
      onBottomSheetPress: confirm,
      onOverlayPress: revert,
      title: (
        <WorkoutConfigBottomSheetIconAndTitle
          label={t(labelKey)}
          IconComponent={IconComponent}
        />
      ),
    });

  return { bottomSheet, openWorkoutConfigBottomSheet };
};
