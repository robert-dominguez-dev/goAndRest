import { memo } from 'react';
import { useAtomValue } from 'jotai';
import { AppRoundedButtons } from '../../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { useFormContext } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { heldWorkoutIdentityAtom } from '../../../../../../../contexts/atoms.ts';
import { SaveWorkoutButton } from './components/SaveWorkoutButton.tsx';
import { useStartWorkout } from '../../../../../hooks/useStartWorkout.ts';
import { ResetDefaultButton } from './components/ResetDefaultButton.tsx';
import { buildLandingStartWorkout } from './helpers/buildLandingStartWorkout.ts';

const resetButtonElement = <ResetDefaultButton />;
const saveButtonElement = <SaveWorkoutButton />;

const LandingScreenFooterComponent = () => {
  const { getValues } = useFormContext<AppWorkoutFieldValues>();

  const heldWorkoutIdentity = useAtomValue(heldWorkoutIdentityAtom);

  const startWorkout = useStartWorkout();

  const handleStartWorkout = () =>
    startWorkout(buildLandingStartWorkout(getValues(), heldWorkoutIdentity));

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
