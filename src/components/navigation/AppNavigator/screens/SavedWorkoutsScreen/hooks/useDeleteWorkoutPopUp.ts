import { useAppPopUp } from '../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';
import { AppStoredWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useRootStackNavigation } from '../../../../hooks/useRootStackNavigation.ts';

export const useDeleteWorkoutPopUp = () => {
  const t = useAppTranslation();

  const navigation = useRootStackNavigation();

  const { storedWorkouts, removeWorkout } = useAppWorkouts();

  const { popUp, handleOpen } = useAppPopUp();

  const handleDeleteWorkout = (workout: AppStoredWorkout): void =>
    handleOpen({
      title: t('screens.landingScreen.removeStoredWorkoutPopUp.title'),
      description: t(
        'screens.landingScreen.removeStoredWorkoutPopUp.description',
        { value: workout.meta.name },
      ),
      primaryButtonProps: {
        label: t(
          'screens.landingScreen.removeStoredWorkoutPopUp.positiveButtonLabel',
        ),
        onPress: () => {
          removeWorkout(workout.id);
          if (storedWorkouts.length <= 1) {
            navigation.goBack();
          }
        },
        backgroundColorStatus: 'negative',
      },
      secondaryButtonProps: {
        label: t(
          'screens.landingScreen.removeStoredWorkoutPopUp.negativeButtonLabel',
        ),
        backgroundColorStatus: 'backgroundAlt',
      },
    });

  return {
    popUp,
    handleDeleteWorkout,
  };
};
