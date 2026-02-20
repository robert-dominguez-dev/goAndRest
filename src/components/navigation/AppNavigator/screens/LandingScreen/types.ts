import { AppButtonProps } from '../../../../controls/AppButton/AppButton.tsx';
import { Control } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppWorkoutConfigKey } from './constants.ts';

export type WorkoutConfigButtonProps = Pick<AppButtonProps, 'disabled'> & {
  control: Control<AppWorkoutFieldValues>;
  name: AppWorkoutConfigKey;
  onPress: () => void;
};
