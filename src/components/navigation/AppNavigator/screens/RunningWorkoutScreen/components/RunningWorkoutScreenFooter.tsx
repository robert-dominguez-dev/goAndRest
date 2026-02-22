import { memo } from 'react';
import { AppRoundedButtons } from '../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { RunningWorkoutSkipButton } from './RunningWorkoutSkipButton.tsx';
import { useWorkoutTimer } from '../../../../../../hooks/useWorkoutTimer.ts';
import { ONE_SECOND_MS } from '../../../../../../constants/common.ts';

const SKIP_SECONDS = 15;
const SKIP_MS = SKIP_SECONDS * ONE_SECOND_MS;

const RunningWorkoutScreenFooterComponent = () => {
  const { resume, pause, skip, isRunning } = useWorkoutTimer();

  const prevButtonElement = (
    <RunningWorkoutSkipButton
      onPress={() => skip(-SKIP_MS)}
      direction={'left'}
      value={SKIP_SECONDS}
    />
  );

  const nextButtonElement = (
    <RunningWorkoutSkipButton
      onPress={() => skip(SKIP_MS)}
      direction={'right'}
      value={SKIP_SECONDS}
    />
  );

  return (
    <AppRoundedButtons
      isRunning={isRunning}
      onPlay={resume}
      onPause={() => pause()}
      leftButton={prevButtonElement}
      rightButton={nextButtonElement}
    />
  );
};

export const RunningWorkoutScreenFooter = memo(
  RunningWorkoutScreenFooterComponent,
);
