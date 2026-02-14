import { JSX, memo } from 'react';
import { Save, Trash } from 'lucide-react-native';
import { AppRoundedButtons } from '../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { AppRoundedButton } from '../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { useRootStackNavigation } from '../../../../hooks/useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../../../types.ts';
import { AppSize } from '../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { useFormContext, useFormState } from 'react-hook-form';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { composeWorkoutToStore } from '../helpers/composeWorkoutToStore.ts';

const _LandingScreenFooter = () => {
  const { text } = useAppThemedColors();

  const {
    selectedStoredWorkout,
    storeWorkout,
    removeWorkout,
    setRunningWorkout,
  } = useAppWorkouts();

  const { control, handleSubmit, getValues, reset } =
    useFormContext<AppWorkout>();

  const { isDirty } = useFormState({ control });

  const navigation = useRootStackNavigation();

  const onStartWorkout = () => {
    setRunningWorkout(getValues());
    navigation.navigate(AppNavigatorScreen.RunningWorkoutScreen);
  };

  const handleAddWorkout = (workout: AppWorkout) => {
    const workoutToStore = composeWorkoutToStore(
      workout,
      selectedStoredWorkout,
    );

    storeWorkout(workoutToStore);
    reset(workout);
  };

  const deleteButtonElement: JSX.Element | undefined = selectedStoredWorkout ? (
    <AppRoundedButton
      onPress={() => removeWorkout(selectedStoredWorkout.id)}
      size={'s'}
      status={'negative'}>
      <Trash
        size={AppSize.ml}
        color={text}
      />
    </AppRoundedButton>
  ) : undefined;

  const saveButtonElement = (
    <AppRoundedButton
      onPress={handleSubmit(handleAddWorkout)}
      disabled={!isDirty}
      size={'s'}
      status={'grayscale'}>
      <Save
        size={AppSize.ml}
        color={text}
      />
    </AppRoundedButton>
  );

  return (
    <AppRoundedButtons
      isRunning={false}
      onMainButtonPress={onStartWorkout}
      leftButton={deleteButtonElement}
      rightButton={saveButtonElement}
    />
  );
};

export const LandingScreenFooter = memo(_LandingScreenFooter);
