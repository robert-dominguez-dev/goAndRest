import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { appWorkoutConfigKeys } from '../constants.ts';
import { JSX, memo } from 'react';
import { WorkoutConfigButtonWithSheet } from './WorkoutConfigButtonWithSheet.tsx';

const _WorkoutConfigButtons = () => {
  const workoutConfigButtonElements = appWorkoutConfigKeys.map<JSX.Element>(
    key => (
      <WorkoutConfigButtonWithSheet
        key={key}
        name={key}
      />
    ),
  );

  return <AppView gap={'s'}>{workoutConfigButtonElements}</AppView>;
};

export const WorkoutConfigButtons = memo(_WorkoutConfigButtons);
