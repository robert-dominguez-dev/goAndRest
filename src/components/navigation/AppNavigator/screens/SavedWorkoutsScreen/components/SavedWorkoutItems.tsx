import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import {
  MORE_THAN_THIRD_WIDTH_PERCENTS,
  SavedWorkoutItem,
} from './SavedWorkoutItem.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppStoredWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { useStartWorkout } from '../../../../hooks/useStartWorkout.ts';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { JSX } from 'react';
import { useIsTabletAndLandscape } from '../../../../../../hooks/useIsTabletAndLandscape.ts';

type SavedWorkoutItemsProps = {
  onDeleteWorkout: (workout: AppStoredWorkout) => void;
};

export const SavedWorkoutItems = ({
  onDeleteWorkout,
}: SavedWorkoutItemsProps) => {
  const { storedWorkouts } = useAppWorkouts();

  const startWorkout = useStartWorkout();

  const isTabletLandscape = useIsTabletAndLandscape();

  const handleStartWorkout = async ({
    config,
    meta: { name },
  }: AppStoredWorkout) => startWorkout({ workoutName: name, ...config });

  const workoutItems = storedWorkouts.map<JSX.Element>(workout => (
    <SavedWorkoutItem
      key={workout.id}
      workout={workout}
      onStart={handleStartWorkout}
      onDelete={onDeleteWorkout}
    />
  ));

  if (isTabletLandscape) {
    const isEven = workoutItems.length % 2 === 0;

    const workoutItemsEvaluated: JSX.Element[] = isEven
      ? workoutItems
      : [
          ...workoutItems,
          <AppView
            key={'empty-view'}
            grow
            flexBasis={0}
            minWidth={MORE_THAN_THIRD_WIDTH_PERCENTS}
          />,
        ];

    return (
      <AppRow
        gap={'m'}
        flexWrap={'wrap'}>
        {workoutItemsEvaluated}
      </AppRow>
    );
  }

  return <AppView gap={'m'}>{workoutItems}</AppView>;
};
