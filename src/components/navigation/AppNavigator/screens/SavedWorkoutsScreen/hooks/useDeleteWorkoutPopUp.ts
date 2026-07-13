import { useAppPopUp } from '../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';
import { AppStoredWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useRootStackNavigation } from '../../../../hooks/useRootStackNavigation.ts';
import { useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { heldWorkoutIdentityAtom } from '../../../../../../contexts/atoms.ts';

export const useDeleteWorkoutPopUp = () => {
  const t = useAppTranslation();

  const [workoutToDelete, setWorkoutToDelete] = useState<
    AppStoredWorkout | undefined
  >(undefined);

  const navigation = useRootStackNavigation();

  const { storedWorkouts, removeWorkout } = useAppWorkouts();

  const heldWorkoutIdentity = useAtomValue(heldWorkoutIdentityAtom);
  const setHeldWorkoutIdentity = useSetAtom(heldWorkoutIdentityAtom);

  const { popUp, onOpen } = useAppPopUp({
    title: t('screens.landingScreen.removeStoredWorkoutPopUp.title'),
    description: t(
      'screens.landingScreen.removeStoredWorkoutPopUp.description',
      { value: workoutToDelete?.meta.name ?? '' },
    ),
    primaryButtonProps: {
      label: t(
        'screens.landingScreen.removeStoredWorkoutPopUp.positiveButtonLabel',
      ),
      onPress: () => {
        if (workoutToDelete) {
          removeWorkout(workoutToDelete.id);

          if (workoutToDelete.id === heldWorkoutIdentity?.savedWorkoutId) {
            setHeldWorkoutIdentity(null);
          }
        }

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

  const handleDeleteWorkout = (workout: AppStoredWorkout) => {
    setWorkoutToDelete(workout);
    onOpen();
  };

  return {
    popUp,
    handleDeleteWorkout,
  };
};
