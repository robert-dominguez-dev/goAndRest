import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppPopUp } from '../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';
import { useRootStackNavigation } from '../../../../hooks/useRootStackNavigation.ts';

export const useEndRunningWorkoutPopUp = () => {
  const t = useAppTranslation();

  const navigation = useRootStackNavigation();

  const { popUp, handleOpen } = useAppPopUp();

  const handleEndWorkout = () =>
    handleOpen({
      title: t('screens.runningWorkoutScreen.endWorkoutPopUp.title'),
      description: t(
        'screens.runningWorkoutScreen.endWorkoutPopUp.description',
      ),
      primaryButtonProps: {
        label: t(
          'screens.runningWorkoutScreen.endWorkoutPopUp.positiveButtonLabel',
        ),
        onPress: navigation.goBack,
        backgroundColorStatus: 'negative',
      },
      secondaryButtonProps: {
        label: t(
          'screens.runningWorkoutScreen.endWorkoutPopUp.negativeButtonLabel',
        ),
        backgroundColorStatus: 'backgroundAlt',
      },
    });

  return { popUp, handleEndWorkout };
};
