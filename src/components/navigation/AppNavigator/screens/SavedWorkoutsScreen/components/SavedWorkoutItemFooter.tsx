import { AppStoredWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppDivider } from '../../../../../common/AppDivider.tsx';
import { SavedWorkoutItemFooterButton } from './SavedWorkoutItemFooterButton.tsx';

export const SAVED_WORKOUT_HEADER_AND_FOOTER_HEIGHT = 56;

export type SavedWorkoutItemFooterProps = {
  workout: AppStoredWorkout;
  onStart: (workout: AppStoredWorkout) => void;
  onDelete: (workout: AppStoredWorkout) => void;
};

export const SavedWorkoutItemFooter = ({
  workout,
  onStart,
  onDelete,
}: SavedWorkoutItemFooterProps) => {
  const t = useAppTranslation();

  return (
    <AppRow height={SAVED_WORKOUT_HEADER_AND_FOOTER_HEIGHT}>
      <SavedWorkoutItemFooterButton
        label={t(
          'screens.savedWorkoutsScreen.existingWorkoutItem.deleteButtonLabel',
        )}
        iconName={'Trash2'}
        backgroundColorStatus={'negative'}
        onPress={() => onDelete(workout)}
      />
      <AppDivider isVertical />
      <SavedWorkoutItemFooterButton
        label={t(
          'screens.savedWorkoutsScreen.existingWorkoutItem.startButtonLabel',
        )}
        iconName={'Play'}
        backgroundColorStatus={'primary'}
        onPress={() => onStart(workout)}
      />
    </AppRow>
  );
};
