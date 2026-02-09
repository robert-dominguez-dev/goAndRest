import { Dumbbell } from 'lucide-react-native';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { ExistingWorkoutButton } from './ExistingWorkoutButton.tsx';
import { memo } from 'react';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { EXISTING_WORKOUT_BUTTON_ICON_SIZE } from '../constants.ts';

const _ExistingWorkoutButtons = () => {
  const { text } = useAppThemedColors();

  const { workouts, selectedWorkout, setSelectedWorkout } = useAppWorkouts();

  return workouts.map(workout => {
    const isSelected = workout.id === selectedWorkout?.id;

    const handlePress = () => setSelectedWorkout(workout);

    return (
      <ExistingWorkoutButton
        key={workout.id}
        onPress={handlePress}
        isSelected={isSelected}>
        <Dumbbell
          color={text}
          size={EXISTING_WORKOUT_BUTTON_ICON_SIZE}
        />
      </ExistingWorkoutButton>
    );
  });
};

export const ExistingWorkoutButtons = memo(_ExistingWorkoutButtons);
