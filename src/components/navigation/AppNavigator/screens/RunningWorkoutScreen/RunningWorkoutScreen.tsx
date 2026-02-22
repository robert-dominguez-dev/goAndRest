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
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppCircularIndicator } from '../../../../controls/AppCircularSlider/components/AppCircularIndicator.tsx';
import { WorkoutTimerState } from './types.ts';
import { useAppThemedColors } from '../../../../../hooks/useAppThemedColors.ts';
import { RunningWorkoutPulsingBackground } from './components/RunningWorkoutPulsingBackground.tsx';
import { JSX } from 'react';

const INDICATOR_STROKE_WIDTH = 16;

const OUTER_INDICATOR_RADIUS = 160;
const INNER_INDICATOR_RADIUS = 136;

const PULSING_BACKGROUND_SIZE =
  (INNER_INDICATOR_RADIUS - INDICATOR_STROKE_WIDTH) * 2;

const footerElement = <RunningWorkoutScreenFooter />;

export const RunningWorkoutScreen = () => {
  const t = useAppTranslation();

  const appColors = useAppThemedColors();

  const { currentState, isRunning } = useWorkoutTimer(() =>
    console.log('FINISH'),
  );

  const {
    workoutName,
    currentPhase,
    totalElapsedMs: totalElapsedMsUnsafe,
    totalDurationMs: totalDurationMsUnsafe,
    phaseRemainingMs: phaseRemainingMsUnsafe,
    phaseElapsedMs: phaseElapsedMsUnsafe,
  }: Partial<WorkoutTimerState> = currentState || {};

  const { popUp, openEndWorkoutPopUp } = useEndRunningWorkoutPopUp();

  const headerTitle: string =
    workoutName || t('screens.runningWorkoutScreen.title');

  const phaseColorStatus: AppColorUnion | undefined = currentPhase
    ? workoutPhaseToColorStatus[currentPhase]
    : undefined;

  const phaseColor: string = phaseColorStatus
    ? appColors[phaseColorStatus]
    : appColors.border;

  const totalElapsedMs = getNumber(totalElapsedMsUnsafe);
  const totalDurationMs = getNumber(totalDurationMsUnsafe);
  const phaseRemainingMs = getNumber(phaseRemainingMsUnsafe);
  const phaseElapsedMs = getNumber(phaseElapsedMsUnsafe);

  const maxValue = phaseRemainingMs + phaseElapsedMs;

  const backgroundOverlayElement: JSX.Element | undefined = currentPhase ? (
    <RunningWorkoutPulsingBackground
      size={PULSING_BACKGROUND_SIZE}
      workoutPhase={currentPhase}
      enabled={isRunning}
    />
  ) : undefined;

  return (
    <>
      <AppScreenLayout
        headerTitle={headerTitle}
        footer={footerElement}
        HeaderAccessoryLeftIconComponent={X}
        onHeaderAccessoryLeftPress={openEndWorkoutPopUp}>
        <AppView
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
              {backgroundOverlayElement}
              <AppText
                grow={false}
                category={'header'}>
                {currentState?.currentPhase}
              </AppText>
              <AppTimeView
                fontSizeOverride={80}
                msLeft={phaseRemainingMs}
              />
              <AppTimeView
                fontSizeOverride={32}
                msLeft={getNumber(currentState?.totalElapsedMs)}
              />
            </AppCircularIndicator>
          </AppCircularIndicator>
        </AppView>
      </AppScreenLayout>
      {popUp}
    </>
  );
};
