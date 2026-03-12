import { workoutPhaseToTimerColorStatus } from './constants.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { memo } from 'react';
import { RunningWorkoutContentParams } from './types.ts';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';
import { useWindowDimensions } from 'react-native';
import { RunningWorkoutCounter } from './components/RunningWorkoutCounter.tsx';
import { AppSize } from '../../../../../types/ui.ts';
import { RunningWorkoutLandscapeFooter } from './components/RunningWorkoutLandscapeFooter.tsx';

const _RunningWorkoutLandscapeContent = ({
  currentState: {
    currentPhase,
    phaseRemainingMs,
    currentSeries,
    currentRound,
    workoutConfig: { series, rounds },
  },
}: RunningWorkoutContentParams) => {
  const { height } = useWindowDimensions();

  const fontSizeOverride = height * 0.75;

  const phaseColorStatus = workoutPhaseToTimerColorStatus[currentPhase];

  return (
    <AppView
      grow
      alignItems={'center'}>
      <AppView
        grow
        position={'absolute'}
        justifyContent={'center'}>
        <AppTimeView
          colorStatus={phaseColorStatus}
          fontSizeOverride={fontSizeOverride}
          msLeft={phaseRemainingMs}
        />
      </AppView>
      <AppView
        position={'absolute'}
        bottom={AppSize.m}>
        <RunningWorkoutCounter
          currentSeries={currentSeries}
          currentRound={currentRound}
          totalSeries={series}
          totalRounds={rounds}
        />
      </AppView>
      <AppView
        grow
        gap={'m'}
        position={'absolute'}
        height={fontSizeOverride}
        top={0}
        right={-AppSize.m}
        justifyContent={'center'}
        alignItems={'center'}>
        <RunningWorkoutLandscapeFooter />
      </AppView>
    </AppView>
  );
};

export const RunningWorkoutLandscapeContent = memo(
  _RunningWorkoutLandscapeContent,
);
