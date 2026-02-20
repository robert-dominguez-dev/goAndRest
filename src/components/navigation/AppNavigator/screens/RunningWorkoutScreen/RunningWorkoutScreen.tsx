import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { X } from 'lucide-react-native';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { RunningWorkoutScreenFooter } from './components/RunningWorkoutScreenFooter.tsx';
import { useEndRunningWorkoutPopUp } from './hooks/useEndRunningWorkoutPopUp.tsx';
import { useWorkoutTimer } from '../../../../../hooks/useWorkoutTimer.ts';
import { getNumber } from '../../../../../helpers/getNumber.ts';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';

const footerElement = <RunningWorkoutScreenFooter />;

export const RunningWorkoutScreen = () => {
  const t = useAppTranslation();

  const { currentState } = useWorkoutTimer();

  const headerTitle: string =
    currentState?.workoutName || t('screens.runningWorkoutScreen.title');

  const { popUp, handleEndWorkout } = useEndRunningWorkoutPopUp();

  return (
    <>
      <AppScreenLayout
        headerTitle={headerTitle}
        footer={footerElement}
        HeaderAccessoryLeftIconComponent={X}
        onHeaderAccessoryLeftPress={handleEndWorkout}>
        <AppText category={'header'}>{currentState?.currentPhase}</AppText>
        <AppTimeView seconds={getNumber(currentState?.phaseRemainingSeconds)} />
      </AppScreenLayout>
      {popUp}
    </>
  );
};
