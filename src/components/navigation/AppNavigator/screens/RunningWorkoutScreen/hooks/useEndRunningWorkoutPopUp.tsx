import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppPopUp } from '../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';
import { useWorkoutTimer } from '../../../../../../hooks/useWorkoutTimer.ts';
import { useFinishWorkout } from '../../../../hooks/useFinishWorkout.ts';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { useRef } from 'react';
import { handleAppOrientation } from '../helpers/handleAppOrientation.tsx';

type UseEndRunningWorkoutPopUpParams = {
  onChangeToPortrait: () => void;
  onChangeToLandscape: () => void;
};

export const useEndRunningWorkoutPopUp = ({
  onChangeToPortrait,
  onChangeToLandscape,
}: UseEndRunningWorkoutPopUpParams) => {
  const t = useAppTranslation();

  const { resume, pause } = useWorkoutTimer();

  const finishWorkout = useFinishWorkout();

  const lastOrientationRef = useRef<OrientationType>(undefined);

  const resumeOrientation = () =>
    Orientation.getOrientation(currentOrientation => {
      const prevOrientation = lastOrientationRef.current;

      const shouldResumeOrientation = (!!prevOrientation &&
        currentOrientation !== prevOrientation) satisfies boolean;

      if (!shouldResumeOrientation) {
        return undefined;
      }

      handleAppOrientation({
        orientation: prevOrientation,
        onIsPortrait: onChangeToPortrait,
        onIsLandscape: onChangeToLandscape,
      });
    });

  const { popUp, onOpen } = useAppPopUp({
    title: t('screens.runningWorkoutScreen.endWorkoutPopUp.title'),
    description: t('screens.runningWorkoutScreen.endWorkoutPopUp.description'),
    primaryButtonProps: {
      label: t(
        'screens.runningWorkoutScreen.endWorkoutPopUp.positiveButtonLabel',
      ),
      onPress: finishWorkout,
      backgroundColorStatus: 'negative',
    },
    secondaryButtonProps: {
      label: t(
        'screens.runningWorkoutScreen.endWorkoutPopUp.negativeButtonLabel',
      ),
      backgroundColorStatus: 'backgroundAlt',
      onPress: () => {
        resume();
        /**
         * For fluent orientation change animation...
         */
        setTimeout(resumeOrientation, 100);
      },
    },
  });

  const openEndWorkoutPopUp = () =>
    Orientation.getOrientation(currentOrientation => {
      lastOrientationRef.current = currentOrientation;
      onChangeToPortrait();
      pause();
      onOpen();
    });

  return { popUp, openEndWorkoutPopUp };
};
