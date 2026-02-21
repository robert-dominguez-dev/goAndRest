import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { X } from 'lucide-react-native';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { RunningWorkoutScreenFooter } from './components/RunningWorkoutScreenFooter.tsx';
import { useEndRunningWorkoutPopUp } from './hooks/useEndRunningWorkoutPopUp.tsx';
import { useWorkoutTimer } from '../../../../../hooks/useWorkoutTimer.ts';
import { getNumber } from '../../../../../helpers/getNumber.ts';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';
import { workoutPhaseToColorStatus } from './constants.ts';
import { AppColorUnion } from '../../../../../types/ui.ts';

const footerElement = <RunningWorkoutScreenFooter />;

export const RunningWorkoutScreen = () => {
  const t = useAppTranslation();

  const { currentState } = useWorkoutTimer();

  const { popUp, openEndWorkoutPopUp } = useEndRunningWorkoutPopUp();

  const headerTitle: string =
    currentState?.workoutName || t('screens.runningWorkoutScreen.title');

  const backgroundColorStatus: AppColorUnion | undefined =
    currentState?.currentPhase
      ? workoutPhaseToColorStatus[currentState.currentPhase]
      : undefined;

  return (
    <>
      <AppScreenLayout
        backgroundColorStatus={backgroundColorStatus}
        headerTitle={headerTitle}
        footer={footerElement}
        HeaderAccessoryLeftIconComponent={X}
        onHeaderAccessoryLeftPress={openEndWorkoutPopUp}>
        <AppTimeView seconds={getNumber(currentState?.phaseRemainingSeconds)} />
      </AppScreenLayout>
      {popUp}
    </>
  );
};
