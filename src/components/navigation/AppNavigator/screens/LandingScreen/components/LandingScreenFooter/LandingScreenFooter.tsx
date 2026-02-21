import { memo } from 'react';
import { AppRoundedButtons } from '../../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { useRootStackNavigation } from '../../../../../hooks/useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../../../../types.ts';
import { useFormContext } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { SaveWorkoutButton } from './components/SaveWorkoutButton.tsx';
import { useWorkoutTimer } from '../../../../../../../hooks/useWorkoutTimer.ts';

const saveButtonElement = <SaveWorkoutButton />;

const LandingScreenFooterComponent = () => {
  const { start } = useWorkoutTimer();

  const { getValues } = useFormContext<AppWorkoutFieldValues>();

  const navigation = useRootStackNavigation();

  const onStartWorkout = () => {
    start(getValues());
    navigation.navigate(AppNavigatorScreen.RunningWorkoutScreen);
  };

  return (
    <AppRoundedButtons
      isRunning={false}
      onPlay={onStartWorkout}
      rightButton={saveButtonElement}
    />
  );
};

export const LandingScreenFooter = memo(LandingScreenFooterComponent);
