import { workoutPhaseToTimerColorStatus } from './constants.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { memo } from 'react';
import { RunningWorkoutContentParams } from './types.ts';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';
import { RunningWorkoutCounter } from './components/RunningWorkoutCounter.tsx';
import { AppSize } from '../../../../../types/ui.ts';
import { RunningWorkoutLandscapeFooter } from './components/RunningWorkoutLandscapeFooter.tsx';
import { FILL_CONTAINER_DIMENSION } from '../../../../../constants/common.ts';
import { useLayout } from '../../../../../hooks/useLayout.ts';

const _RunningWorkoutLandscapeContent = ({
  currentState: {
    currentPhase,
    phaseRemainingMs,
    currentSeries,
    currentRound,
    workoutConfig: { series, rounds },
  },
}: RunningWorkoutContentParams) => {
  const { handleLayout, layout } = useLayout();

  const fontSizeOverride = layout?.height;

  const phaseColorStatus = workoutPhaseToTimerColorStatus[currentPhase];

  return (
    <AppView
      height={FILL_CONTAINER_DIMENSION}
      alignItems={'center'}>
      <AppView
        grow
        onLayout={handleLayout}
        justifyContent={'center'}>
        <AppTimeView
          colorStatus={phaseColorStatus}
          fontSizeOverride={fontSizeOverride}
          msLeft={phaseRemainingMs}
        />
      </AppView>
      <AppView bottom={AppSize.m}>
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
