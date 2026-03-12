import { memo } from 'react';
import { AppRoundedButtons } from '../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { RunningWorkoutSkipButton } from './RunningWorkoutSkipButton.tsx';
import {
  SKIP_SECONDS,
  useRunningWorkoutControls,
} from '../hooks/useRunningWorkoutControls.tsx';

const RunningWorkoutPortraitFooterComponent = () => {
  const { pause, resume, skipForward, skipBackward, isRunning } =
    useRunningWorkoutControls();

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
      onPause={pause}
      leftButton={prevButtonElement}
      rightButton={nextButtonElement}
    />
  );
};

export const RunningWorkoutPortraitFooter = memo(
  RunningWorkoutPortraitFooterComponent,
);
