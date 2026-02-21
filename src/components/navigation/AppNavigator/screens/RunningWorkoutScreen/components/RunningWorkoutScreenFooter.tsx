import { memo } from 'react';
import {
  AppRoundedButtons,
  AppRoundedButtonsProps,
} from '../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { RunningWorkoutSkipButton } from './RunningWorkoutSkipButton.tsx';

const SKIP_SECONDS = 15;

type RunningWorkoutScreenFooterProps = Pick<
  AppRoundedButtonsProps,
  'isRunning' | 'onPlay' | 'onPause'
> & {
  onSkip: (seconds: number) => void;
};

const RunningWorkoutScreenFooterComponent = ({
  isRunning,
  onPlay,
  onPause,
  onSkip,
}: RunningWorkoutScreenFooterProps) => {
  const prevButtonElement = (
    <RunningWorkoutSkipButton
      onPress={() => onSkip(-SKIP_SECONDS)}
      direction={'left'}
      value={SKIP_SECONDS}
    />
  );

  const nextButtonElement = (
    <RunningWorkoutSkipButton
      onPress={() => onSkip(SKIP_SECONDS)}
      direction={'right'}
      value={SKIP_SECONDS}
    />
  );

  return (
    <AppRoundedButtons
      isRunning={isRunning}
      onPlay={onPlay}
      onPause={onPause}
      leftButton={prevButtonElement}
      rightButton={nextButtonElement}
    />
  );
};

export const RunningWorkoutScreenFooter = memo(
  RunningWorkoutScreenFooterComponent,
);
