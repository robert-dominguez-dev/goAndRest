import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { appWorkoutConfigKeys } from '../constants.ts';
import { JSX, memo } from 'react';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { useFormContext } from 'react-hook-form';
import { WorkoutConfigButton } from './WorkoutConfigButton.tsx';

const _WorkoutConfigButtons = () => {
  const { control, resetField } = useFormContext<AppWorkout>();

  const workoutConfigButtonElements = appWorkoutConfigKeys.map<JSX.Element>(
    key => (
      <WorkoutConfigButton
        key={key}
        name={key}
        control={control}
        resetField={resetField}
      />
    ),
  );

  return <AppView gap={'s'}>{workoutConfigButtonElements}</AppView>;
};

export const WorkoutConfigButtons = memo(_WorkoutConfigButtons);
