import { memo } from 'react';
import { AppRoundedButtons } from '../../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { useFormContext } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { SaveWorkoutButton } from './components/SaveWorkoutButton.tsx';
import { useStartWorkout } from '../../../../../hooks/useStartWorkout.ts';
import { ResetDefaultButton } from './components/ResetDefaultButton.tsx';

const resetButtonElement = <ResetDefaultButton />;
const saveButtonElement = <SaveWorkoutButton />;

const LandingScreenFooterComponent = () => {
  const { getValues } = useFormContext<AppWorkoutFieldValues>();

  const startWorkout = useStartWorkout();

  const handleStartWorkout = () => startWorkout(getValues());

  return (
    <AppRoundedButtons
      isRunning={false}
      onPlay={handleStartWorkout}
      leftButton={resetButtonElement}
      rightButton={saveButtonElement}
    />
  );
};

export const LandingScreenFooter = memo(LandingScreenFooterComponent);
