import { AppView } from '../../../../../common/AppView.tsx';
import { AppButton } from '../../../../../controls/AppButton/AppButton.tsx';
import { Dumbbell, Pause, Repeat, Wind, Zap } from 'lucide-react-native';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { WorkoutSettingsSecondsButton } from './WorkoutSettingsSecondsButton.tsx';

export const WorkoutSettingsButtons = () => {
  const {
    selectedWorkout: {
      config: { prep, work, rest, rounds, cooldown },
    },
  } = useAppWorkouts();

  return (
    <AppView gap={'s'}>
      <WorkoutSettingsSecondsButton
        label={'PREP'}
        seconds={prep}
        backgroundColorStatus={'yellow'}
        IconComponent={Zap}
      />
      <WorkoutSettingsSecondsButton
        label={'WORK'}
        seconds={work}
        backgroundColorStatus={'negative'}
        IconComponent={Dumbbell}
      />
      <WorkoutSettingsSecondsButton
        label={'REST'}
        seconds={rest}
        backgroundColorStatus={'primary'}
        IconComponent={Pause}
      />
      <AppButton
        label={'ROUNDS'}
        value={`${rounds}x`}
        backgroundColorStatus={'backgroundAlt'}
        IconComponent={Repeat}
      />
      <WorkoutSettingsSecondsButton
        label={'COOLDOWN'}
        seconds={cooldown}
        backgroundColorStatus={'yellowDark'}
        IconComponent={Wind}
      />
    </AppView>
  );
};
