import { memo } from 'react';
import { AppRoundedButtons } from '../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { RunningWorkoutSkipButton } from './RunningWorkoutSkipButton.tsx';
import { useWorkoutTimer } from '../../../../../../hooks/useWorkoutTimer.ts';

const SKIP_SECONDS = 15;

const RunningWorkoutScreenFooterComponent = () => {
  const { resume, pause, skip, currentState } = useWorkoutTimer();

  const prevButtonElement = (
    <RunningWorkoutSkipButton
      onPress={() => skip(-SKIP_SECONDS)}
      direction={'left'}
      value={SKIP_SECONDS}
    />
  );

  const nextButtonElement = (
    <RunningWorkoutSkipButton
      onPress={() => skip(SKIP_SECONDS)}
      direction={'right'}
      value={SKIP_SECONDS}
    />
  );

  const isRunning: boolean =
    !!currentState && !currentState?.isPaused && !currentState?.isFinished;

  return (
    <AppRoundedButtons
      isRunning={isRunning}
      onPlay={resume}
      onPause={pause}
      leftButton={prevButtonElement}
      rightButton={nextButtonElement}
    />
  );
};

export const RunningWorkoutScreenFooter = memo(
  RunningWorkoutScreenFooterComponent,
);
