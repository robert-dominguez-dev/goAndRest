import { Dumbbell } from 'lucide-react-native';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { ExistingWorkoutButton } from './ExistingWorkoutButton.tsx';
import { memo } from 'react';

const _ExistingWorkoutButtons = () => {
  const { workouts, selectedWorkout, setSelectedWorkout } = useAppWorkouts();

  return workouts.map(workout => {
    const isSelected = workout.id === selectedWorkout?.id;

    const handlePress = () => setSelectedWorkout(workout);

    return (
      <ExistingWorkoutButton
        key={workout.id}
        onPress={handlePress}
        isSelected={isSelected}>
        <Dumbbell color={'white'} />
      </ExistingWorkoutButton>
    );
  });
};

export const ExistingWorkoutButtons = memo(_ExistingWorkoutButtons);
