import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import { AppTimeView } from '../../../../../../../common/AppTimeView.tsx';
import { Control, useWatch } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { countTotalWorkoutTime } from '../../../helpers/countTotalWorkoutTime.ts';

type WorkoutConfigTimeViewProps = {
  control: Control<AppWorkoutFieldValues>;
};

export const WorkoutConfigTimeView = ({
  control,
}: WorkoutConfigTimeViewProps) => {
  const workoutConfig = useWatch<AppWorkoutFieldValues>({
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
