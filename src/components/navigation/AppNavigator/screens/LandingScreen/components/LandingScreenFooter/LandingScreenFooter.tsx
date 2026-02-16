import { JSX, memo } from 'react';
import { AppRoundedButtons } from '../../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { useRootStackNavigation } from '../../../../../hooks/useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../../../../types.ts';
import { useAppWorkouts } from '../../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { useFormContext } from 'react-hook-form';
import { AppWorkout } from '../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { RemoveExistingWorkoutButton } from './components/RemoveExistingWorkoutButton.tsx';
import { SaveWorkoutButton } from './components/SaveWorkoutButton.tsx';

const LandingScreenFooterComponent = () => {
  const { selectedStoredWorkout, removeWorkout, setRunningWorkout } =
    useAppWorkouts();

  const { getValues } = useFormContext<AppWorkout>();

  const navigation = useRootStackNavigation();

  const onStartWorkout = () => {
    setRunningWorkout(getValues());
    navigation.navigate(AppNavigatorScreen.RunningWorkoutScreen);
  };

  const deleteButtonElement: JSX.Element | undefined = selectedStoredWorkout ? (
    <RemoveExistingWorkoutButton
      onRemove={() => removeWorkout(selectedStoredWorkout.id)}
      workoutName={selectedStoredWorkout.meta.name}
    />
  ) : undefined;

  const saveButtonElement = <SaveWorkoutButton />;

  return (
    <AppRoundedButtons
      isRunning={false}
      onMainButtonPress={onStartWorkout}
      leftButton={deleteButtonElement}
      rightButton={saveButtonElement}
    />
  );
};

export const LandingScreenFooter = memo(LandingScreenFooterComponent);
