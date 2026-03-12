import { workoutPhaseToTimerColorStatus } from './constants.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppCircularIndicator } from '../../../../controls/AppCircularSlider/components/AppCircularIndicator.tsx';
import { useAppThemedColors } from '../../../../../hooks/useAppThemedColors.ts';
import { RunningWorkoutIndicatorsContent } from './components/RunningWorkoutIndicatorsContent.tsx';
import { RunningWorkoutCounter } from './components/RunningWorkoutCounter.tsx';
import { memo } from 'react';
import { AppSize } from '../../../../../types/ui.ts';
import { getMaxCircularIndicatorRadius } from '../../../../../helpers/getMaxCircularIndicatorRadius.ts';
import { RunningWorkoutContentParams } from './types.ts';
import { RunningWorkoutPulsingBackgroundCircle } from './components/RunningWorkoutPulsingBackgroundCircle.tsx';

const INDICATOR_STROKE_WIDTH = 16;
const INDICATORS_GAP = 8;

const MAX_WORKOUT_CONFIG_SLIDER_RADIUS = getMaxCircularIndicatorRadius({
  strokeWidth: INDICATOR_STROKE_WIDTH,
  paddingTotal: AppSize.sm * 2,
});

const OUTER_INDICATOR_RADIUS = Math.min(168, MAX_WORKOUT_CONFIG_SLIDER_RADIUS);

const INNER_INDICATOR_RADIUS =
  OUTER_INDICATOR_RADIUS - INDICATOR_STROKE_WIDTH - INDICATORS_GAP;

const PULSING_BACKGROUND_SIZE =
  (INNER_INDICATOR_RADIUS - INDICATOR_STROKE_WIDTH) * 2;

const _RunningWorkoutPortraitContent = ({
  currentState,
  isRunning,
}: RunningWorkoutContentParams) => {
  const appColors = useAppThemedColors();

  const {
    currentPhase,
    totalElapsedMs,
    totalDurationMs,
    phaseRemainingMs,
    phaseElapsedMs,
    currentSeries,
    currentRound,
    workoutConfig: { series, rounds },
  } = currentState;

  const phaseColorStatus = workoutPhaseToTimerColorStatus[currentPhase];
  const phaseColor = appColors[phaseColorStatus];

  const maxValue = phaseRemainingMs + phaseElapsedMs;

  return (
    <AppView
      gap={'m'}
      alignItems={'center'}
      justifyContent={'center'}>
      <AppCircularIndicator
        isRunning={isRunning}
        value={totalElapsedMs}
        filledTrackColor={appColors.text}
        radius={OUTER_INDICATOR_RADIUS}
        strokeWidth={INDICATOR_STROKE_WIDTH}
        maxValue={totalDurationMs}>
        <AppCircularIndicator
          isRunning={isRunning}
          value={phaseElapsedMs}
          filledTrackColor={phaseColor}
          radius={INNER_INDICATOR_RADIUS}
          strokeWidth={INDICATOR_STROKE_WIDTH}
          maxValue={maxValue}>
          <RunningWorkoutPulsingBackgroundCircle
            size={PULSING_BACKGROUND_SIZE}
            workoutPhase={currentPhase}
            enabled={isRunning}
          />
          <RunningWorkoutIndicatorsContent
            currentPhase={currentPhase}
            phaseRemainingMs={phaseRemainingMs}
            totalElapsedMs={totalElapsedMs}
          />
        </AppCircularIndicator>
      </AppCircularIndicator>
      <RunningWorkoutCounter
        currentSeries={currentSeries}
        currentRound={currentRound}
        totalSeries={series}
        totalRounds={rounds}
      />
    </AppView>
  );
};

export const RunningWorkoutPortraitContent = memo(
  _RunningWorkoutPortraitContent,
);
