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

export const RunningWorkoutScreen = () => {
  const t = useAppTranslation();

  const { popUp, handleEndWorkout } = useEndRunningWorkoutPopUp();

  const { resume, pause, skip, currentState } = useWorkoutTimer();

  const isRunning: boolean =
    !!currentState && !currentState?.isPaused && !currentState?.isFinished;

  const footerElement = (
    <RunningWorkoutScreenFooter
      isRunning={isRunning}
      onPlay={resume}
      onPause={pause}
      onSkip={skip}
    />
  );

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
        onHeaderAccessoryLeftPress={handleEndWorkout}>
        <AppTimeView seconds={getNumber(currentState?.phaseRemainingSeconds)} />
      </AppScreenLayout>
      {popUp}
    </>
  );
};
