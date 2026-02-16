import { Save } from 'lucide-react-native';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { AppSize } from '../../../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { useAppWorkouts } from '../../../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { useFormContext, useFormState } from 'react-hook-form';
import { AppWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { SaveWorkoutBottomSheet } from './SaveWorkoutBottomSheet.tsx';
import { useIsVisible } from '../../../../../../../common/AppBottomSheet/hooks/useIsVisible.ts';
import { composeWorkoutToStore } from '../../../helpers/composeWorkoutToStore.ts';
import { useAppPopUp } from '../../../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';

export const SaveWorkoutButton = () => {
  const { text } = useAppThemedColors();

  const { isVisible, onOpen, onClose } = useIsVisible();

  const { selectedStoredWorkout, storeWorkout } = useAppWorkouts();

  const { control, handleSubmit, reset, resetField } =
    useFormContext<AppWorkout>();

  const { isDirty } = useFormState({ control });

  const handleSaveWorkout = (workout: AppWorkout) => {
    const workoutToStore = composeWorkoutToStore(
      workout,
      selectedStoredWorkout,
    );

    storeWorkout(workoutToStore);
    reset(workout);
    onClose();
  };

  const handleCloseAndRevertChanges = () => {
    resetField('name');
    onClose();
  };

  const handleSave = handleSubmit(handleSaveWorkout);

  const { onOpen: openPopUp, popUpElement } = useAppPopUp({
    title: 'Uložení změn',
    description: 'Chcete uložit provedené změny do stávajícího tréninku?',
    primaryButtonProps: {
      label: 'Uložit',
      onPress: handleSave,
    },
    secondaryButtonProps: {
      label: 'Zavřít',
      backgroundColorStatus: 'transparent',
    },
  });

  const handlePress = selectedStoredWorkout ? openPopUp : onOpen;

  return (
    <>
      <AppRoundedButton
        onPress={handlePress}
        disabled={!isDirty}
        size={'s'}
        status={'grayscale'}>
        <Save
          size={AppSize.ml}
          color={text}
        />
      </AppRoundedButton>
      <SaveWorkoutBottomSheet
        control={control}
        isVisible={isVisible}
        onClose={handleCloseAndRevertChanges}
        onSave={handleSave}
      />
      {popUpElement}
    </>
  );
};
