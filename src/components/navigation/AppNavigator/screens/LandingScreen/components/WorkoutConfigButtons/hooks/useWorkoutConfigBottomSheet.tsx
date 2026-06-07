import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../../../constants.ts';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import {
  AppWorkoutConfig,
  AppWorkoutFieldValues,
} from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { useForm, useFormContext } from 'react-hook-form';
import { WorkoutConfigBottomSheetContent } from '../components/WorkoutConfigBottomSheetContent.tsx';
import { WorkoutConfigBottomSheetIconAndTitle } from '../components/WorkoutConfigBottomSheetIconAndTitle.tsx';
import { useAtom } from 'jotai';
import { lastDefaultWorkoutConfigAtom } from '../../../../../../../../contexts/atoms.ts';
import { LocalWorkoutConfigFormValues } from '../../../types.ts';
import { useAppBottomSheet } from '../../../../../../../common/AppBottomSheet/hooks/useAppBottomSheet.tsx';

export const useWorkoutConfigBottomSheet = (name: AppWorkoutConfigKey) => {
  const t = useAppTranslation();

  const [lastDefaultWorkoutConfig, setLastDefaultWorkoutConfig] = useAtom(
    lastDefaultWorkoutConfigAtom,
  );

  const { getValues: getContextValues, setValue: setContextValue } =
    useFormContext<AppWorkoutFieldValues>();

  const { control, getValues, setValue } =
    useForm<LocalWorkoutConfigFormValues>();

  const { bottomSheet, handleOpen, handleClose } = useAppBottomSheet();

  const { labelKey, backgroundColorStatus, iconName } =
    workoutSettingsButtonConfigMap[name];

  const renderContent = () => (
    <WorkoutConfigBottomSheetContent
      name={name}
      control={control}
    />
  );

  const confirm = () => {
    const localValue = getValues('configValue');

    const newDefaultConfig: AppWorkoutConfig = {
      ...lastDefaultWorkoutConfig,
      [name]: localValue,
    };

    setContextValue(name, localValue);
    void setLastDefaultWorkoutConfig(newDefaultConfig);
    handleClose();
  };

  const revert = () => {
    setValue('configValue', getContextValues(name));
    handleClose();
  };

  const openWorkoutConfigBottomSheet = () =>
    handleOpen({
      renderContent,
      backgroundColorStatus,
      onBottomSheetPress: confirm,
      onOverlayPress: revert,
      title: (
        <WorkoutConfigBottomSheetIconAndTitle
          label={t(labelKey)}
          iconName={iconName}
        />
      ),
    });

  return { bottomSheet, openWorkoutConfigBottomSheet };
};
