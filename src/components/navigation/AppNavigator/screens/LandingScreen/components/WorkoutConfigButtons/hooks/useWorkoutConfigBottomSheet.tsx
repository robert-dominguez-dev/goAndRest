import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../../../constants.ts';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { useFormContext } from 'react-hook-form';
import { AppBottomSheetProps } from '../../../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { useAppBottomSheet } from '../../../../../../../common/AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { WorkoutConfigBottomSheetContent } from '../components/WorkoutConfigBottomSheetContent.tsx';
import { WorkoutConfigBottomSheetIconAndTitle } from '../components/WorkoutConfigBottomSheetIconAndTitle.tsx';
import { useLastValueSnapshot } from './useLastValueSnapshot.tsx';

export const useWorkoutConfigBottomSheet = (name: AppWorkoutConfigKey) => {
  const t = useAppTranslation();

  const { control, getValues, setValue } =
    useFormContext<AppWorkoutFieldValues>();

  const { takeSnapshot, clearSnapshot, revertChanges } = useLastValueSnapshot(
    value => setValue(name, value),
  );

  const { labelKey, backgroundColorStatus, IconComponent } =
    workoutSettingsButtonConfigMap[name];

  const renderContent: AppBottomSheetProps['renderContent'] = ({ onClose }) => (
    <WorkoutConfigBottomSheetContent
      name={name}
      control={control}
      onConfirm={clearSnapshot}
      onClose={onClose}
    />
  );

  const { bottomSheet, handleOpen } = useAppBottomSheet();

  const openWorkoutConfigBottomSheet = () => {
    takeSnapshot(getValues(name));
    handleOpen({
      renderContent,
      backgroundColorStatus,
      onAccessoryRightPress: revertChanges,
      title: (
        <WorkoutConfigBottomSheetIconAndTitle
          label={t(labelKey)}
          IconComponent={IconComponent}
        />
      ),
    });
  };

  return { bottomSheet, openWorkoutConfigBottomSheet };
};
