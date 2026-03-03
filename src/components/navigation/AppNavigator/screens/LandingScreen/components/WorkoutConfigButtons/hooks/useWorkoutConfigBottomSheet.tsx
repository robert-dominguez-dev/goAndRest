import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../../../constants.ts';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import {
  AppWorkoutConfig,
  AppWorkoutFieldValues,
} from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { useFormContext } from 'react-hook-form';
import { WorkoutConfigBottomSheetContent } from '../components/WorkoutConfigBottomSheetContent.tsx';
import { WorkoutConfigBottomSheetIconAndTitle } from '../components/WorkoutConfigBottomSheetIconAndTitle.tsx';
import { useSliderBottomSheet } from '../../../../../../../../hooks/useSliderBottomSheet.tsx';
import { useAtom } from 'jotai';
import { lastDefaultWorkoutConfigAtom } from '../../../../../../../../contexts/atoms.ts';

export const useWorkoutConfigBottomSheet = (name: AppWorkoutConfigKey) => {
  const t = useAppTranslation();

  const [lastDefaultWorkoutConfig, setLastDefaultWorkoutConfig] = useAtom(
    lastDefaultWorkoutConfigAtom,
  );

  const { control, getValues, setValue } =
    useFormContext<AppWorkoutFieldValues>();

  const getValue = () => getValues(name);

  const { bottomSheet, open, confirm, revert } = useSliderBottomSheet({
    getValue,
    setValue: value => setValue(name, value),
  });

  const { labelKey, backgroundColorStatus, IconComponent } =
    workoutSettingsButtonConfigMap[name];

  const renderContent = () => (
    <WorkoutConfigBottomSheetContent
      name={name}
      control={control}
    />
  );

  const handleConfirm = () => {
    confirm();

    const newDefaultConfig: AppWorkoutConfig = {
      ...lastDefaultWorkoutConfig,
      [name]: getValue(),
    };

    void setLastDefaultWorkoutConfig(newDefaultConfig);
  };

  const openWorkoutConfigBottomSheet = () =>
    open({
      renderContent,
      backgroundColorStatus,
      onBottomSheetPress: handleConfirm,
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
