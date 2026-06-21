import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import { AppTimeView } from '../../../../../../../common/AppTimeView.tsx';
import { Control, useWatch } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { countTotalWorkoutTime } from '../../../helpers/countTotalWorkoutTime.ts';
import { useGetTabletScaledNumber } from '../../../../../../../../hooks/useGetTabletScaledNumber.ts';
import { useDevScreenEasterEggHandler } from '../../../../../../hooks/useDevScreenEasterEggHandler.ts';

export type WorkoutConfigTimeViewProps = {
  control: Control<AppWorkoutFieldValues>;
};

export const WorkoutConfigTimeView = ({
  control,
}: WorkoutConfigTimeViewProps) => {
  const getTabletScaledNumber = useGetTabletScaledNumber();

  const workoutConfig = useWatch<AppWorkoutFieldValues>({
    control,
  });

  const totalWorkoutTime = countTotalWorkoutTime(workoutConfig);

  const devScreenEasterEggHandler = useDevScreenEasterEggHandler();

  return (
    <AppView
      grow
      alignItems={'center'}
      justifyContent={'center'}
      onTouchStart={devScreenEasterEggHandler}>
      <AppTimeView
        fontSizeOverride={getTabletScaledNumber(100)}
        msLeft={totalWorkoutTime}
      />
    </AppView>
  );
};
