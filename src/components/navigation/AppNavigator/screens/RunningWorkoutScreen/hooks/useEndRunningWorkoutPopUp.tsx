import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppPopUp } from '../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';
import { useRootStackNavigation } from '../../../../hooks/useRootStackNavigation.ts';
import { useWorkoutTimer } from '../../../../../../hooks/useWorkoutTimer.ts';
import { AppNavigatorScreen } from '../../../types.ts';

export const useEndRunningWorkoutPopUp = () => {
  const t = useAppTranslation();

  const navigation = useRootStackNavigation();

  const { resume, pause, stop } = useWorkoutTimer();

  const handleStop = () => {
    stop();
    navigation.reset({
      routes: [{ name: AppNavigatorScreen.LandingScreen }],
    });
  };

  const { popUp, onOpen } = useAppPopUp({
    title: t('screens.runningWorkoutScreen.endWorkoutPopUp.title'),
    description: t('screens.runningWorkoutScreen.endWorkoutPopUp.description'),
    primaryButtonProps: {
      label: t(
        'screens.runningWorkoutScreen.endWorkoutPopUp.positiveButtonLabel',
      ),
      onPress: handleStop,
      backgroundColorStatus: 'negative',
    },
    secondaryButtonProps: {
      label: t(
        'screens.runningWorkoutScreen.endWorkoutPopUp.negativeButtonLabel',
      ),
      backgroundColorStatus: 'backgroundAlt',
      onPress: resume,
    },
  });

  const openEndWorkoutPopUp = () => {
    pause();
    onOpen();
  };

  return { popUp, openEndWorkoutPopUp };
};
