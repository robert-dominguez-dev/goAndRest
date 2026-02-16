import { Save } from 'lucide-react-native';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { AppSize } from '../../../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { useAppWorkouts } from '../../../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { useFormContext, useFormState } from 'react-hook-form';
import { AppWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { composeWorkoutToStore } from '../../../helpers/composeWorkoutToStore.ts';
import { SaveWorkoutBottomSheet } from './SaveWorkoutBottomSheet.tsx';
import { useIsVisible } from '../../../../../../../common/AppBottomSheet/hooks/useIsVisible.ts';

export const SaveWorkoutButton = () => {
  const { text } = useAppThemedColors();

  const { isVisible, onOpen, onClose } = useIsVisible();

  const { selectedStoredWorkout, storeWorkout } = useAppWorkouts();

  const { control, handleSubmit, reset } = useFormContext<AppWorkout>();

  const { isDirty } = useFormState({ control });

  const handleAddWorkout = (workout: AppWorkout) => {
    const workoutToStore = composeWorkoutToStore(
      workout,
      selectedStoredWorkout,
    );

    storeWorkout(workoutToStore);
    reset(workout);
    onClose();
  };

  return (
    <>
      <AppRoundedButton
        onPress={onOpen}
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
        onClose={onClose}
        onConfirm={handleSubmit(handleAddWorkout)}
      />
    </>
  );
};
