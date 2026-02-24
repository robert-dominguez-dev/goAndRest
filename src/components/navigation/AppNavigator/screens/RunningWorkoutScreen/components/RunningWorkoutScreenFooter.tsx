import { memo } from 'react';
import { AppRoundedButtons } from '../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { RunningWorkoutSkipButton } from './RunningWorkoutSkipButton.tsx';
import { useWorkoutTimer } from '../../../../../../hooks/useWorkoutTimer.ts';
import { ONE_SECOND_MS } from '../../../../../../constants/common.ts';
import { clearWorkoutSoundsQueue } from '../../../../../../hooks/useInitiateWorkoutSounds/helpers/clearWorkoutSoundsQueue.ts';
import { useHandleAppInBackgroundDuringWorkout } from '../../../../../../hooks/useHandleAppInBackgroundDuringWorkout.ts';

const SKIP_SECONDS = 15;
const SKIP_MS = SKIP_SECONDS * ONE_SECOND_MS;

const RunningWorkoutScreenFooterComponent = () => {
  const { resume, pause, skip, isRunning } = useWorkoutTimer();

  useHandleAppInBackgroundDuringWorkout(pause);

  const handlePause = async () => {
    await clearWorkoutSoundsQueue();
    pause();
  };

  const skipBackward = async () => {
    await clearWorkoutSoundsQueue();
    skip(-SKIP_MS);
  };

  const skipForward = async () => {
    await clearWorkoutSoundsQueue();
    skip(SKIP_MS);
  };

  const prevButtonElement = (
    <RunningWorkoutSkipButton
      onPress={skipBackward}
      direction={'left'}
      value={SKIP_SECONDS}
    />
  );

  const nextButtonElement = (
    <RunningWorkoutSkipButton
      onPress={skipForward}
      direction={'right'}
      value={SKIP_SECONDS}
    />
  );

  return (
    <AppRoundedButtons
      isRunning={isRunning}
      onPlay={resume}
      onPause={handlePause}
      leftButton={prevButtonElement}
      rightButton={nextButtonElement}
    />
  );
};

export const RunningWorkoutScreenFooter = memo(
  RunningWorkoutScreenFooterComponent,
);
