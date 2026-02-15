import { AppButtonProps } from '../../../../controls/AppButton/AppButton.tsx';
import { Control } from 'react-hook-form';
import { AppWorkout } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppWorkoutConfigKey } from './constants.ts';

export type WorkoutConfigButtonProps = Pick<AppButtonProps, 'disabled'> & {
  control: Control<AppWorkout>;
  name: AppWorkoutConfigKey;
  onPress: () => void;
};
