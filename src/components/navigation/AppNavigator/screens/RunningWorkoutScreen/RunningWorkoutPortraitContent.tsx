import { workoutPhaseToTimerColorStatus } from './constants.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppCircularIndicator } from '../../../../controls/AppCircularSlider/components/AppCircularIndicator.tsx';
import { useAppThemedColors } from '../../../../../hooks/useAppThemedColors.ts';
import { RunningWorkoutIndicatorsContent } from './components/RunningWorkoutIndicatorsContent.tsx';
import { RunningWorkoutCounter } from './components/RunningWorkoutCounter.tsx';
import { memo } from 'react';
import { RunningWorkoutContentParams } from './types.ts';
import { RunningWorkoutPulsingBackgroundCircle } from './components/RunningWorkoutPulsingBackgroundCircle.tsx';
import { usePortraitIndicatorSizes } from './hooks/usePortraitIndicatorSizes.ts';
import { useIsTablet } from '../../../../../hooks/useIsTablet.ts';
import { FlexStyle } from 'react-native';

const FONT_SIZE_SCALE = 0.6;

const _RunningWorkoutPortraitContent = ({
  currentState,
  isRunning,
}: RunningWorkoutContentParams) => {
  const appColors = useAppThemedColors();

  const { strokeWidth, outerRadius, innerRadius, pulsingBackgroundSize } =
    usePortraitIndicatorSizes();

  const isTablet = useIsTablet();

  const justifyContent: FlexStyle['justifyContent'] = isTablet
    ? 'center'
    : undefined;

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

  const timeFontSize = Math.round(outerRadius * FONT_SIZE_SCALE);

  return (
    <AppView
      grow
      paddingBottom={'l'}
      gap={'m'}
      alignItems={'center'}
      justifyContent={justifyContent}>
      <AppView
        grow
        justifyContent={'center'}>
        <AppCircularIndicator
          isRunning={isRunning}
          value={totalElapsedMs}
          filledTrackColor={appColors.text}
          radius={outerRadius}
          strokeWidth={strokeWidth}
          maxValue={totalDurationMs}>
          <AppCircularIndicator
            isRunning={isRunning}
            value={phaseElapsedMs}
            filledTrackColor={phaseColor}
            radius={innerRadius}
            strokeWidth={strokeWidth}
            maxValue={maxValue}>
            <RunningWorkoutPulsingBackgroundCircle
              size={pulsingBackgroundSize}
              workoutPhase={currentPhase}
              enabled={isRunning}
            />
            <RunningWorkoutIndicatorsContent
              currentPhase={currentPhase}
              phaseRemainingMs={phaseRemainingMs}
              totalElapsedMs={totalElapsedMs}
              timeFontSize={timeFontSize}
              padding={strokeWidth * 2}
            />
          </AppCircularIndicator>
        </AppCircularIndicator>
      </AppView>
      <AppView
        grow
        justifyContent={'center'}>
        <RunningWorkoutCounter
          currentSeries={currentSeries}
          currentRound={currentRound}
          totalSeries={series}
          totalRounds={rounds}
        />
      </AppView>
    </AppView>
  );
};

export const RunningWorkoutPortraitContent = memo(
  _RunningWorkoutPortraitContent,
);
