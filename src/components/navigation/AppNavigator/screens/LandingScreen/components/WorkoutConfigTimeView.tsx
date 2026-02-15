import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppTimeView } from '../../../../../common/AppTimeView.tsx';
import { Control, useWatch } from 'react-hook-form';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { countTotalWorkoutTime } from '../helpers/countTotalWorkoutTime.ts';

type WorkoutConfigTimeViewProps = {
  control: Control<AppWorkout>;
};

export const WorkoutConfigTimeView = ({
  control,
}: WorkoutConfigTimeViewProps) => {
  const workoutConfig = useWatch<AppWorkout>({
    control,
  });

  const totalWorkoutTime = countTotalWorkoutTime(workoutConfig);

  return (
    <AppView
      grow
      alignItems={'center'}
      justifyContent={'center'}>
      <AppTimeView seconds={totalWorkoutTime} />
    </AppView>
  );
};
