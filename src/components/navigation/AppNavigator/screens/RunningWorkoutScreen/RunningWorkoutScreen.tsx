import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { X } from 'lucide-react-native';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { RunningWorkoutScreenFooter } from './components/RunningWorkoutScreenFooter.tsx';
import { useEndRunningWorkoutPopUp } from './hooks/useEndRunningWorkoutPopUp.tsx';
import { useWorkoutTimer } from '../../../../../hooks/useWorkoutTimer.ts';
import { workoutPhaseToColorStatus } from './constants.ts';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppCircularIndicator } from '../../../../controls/AppCircularSlider/components/AppCircularIndicator.tsx';
import { useAppThemedColors } from '../../../../../hooks/useAppThemedColors.ts';
import { RunningWorkoutPulsingBackground } from './components/RunningWorkoutPulsingBackground.tsx';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { RunningWorkoutIndicatorsContent } from './components/RunningWorkoutIndicatorsContent.tsx';

const INDICATOR_STROKE_WIDTH = 16;

const OUTER_INDICATOR_RADIUS = 168;
const INNER_INDICATOR_RADIUS = 144;

const PULSING_BACKGROUND_SIZE =
  (INNER_INDICATOR_RADIUS - INDICATOR_STROKE_WIDTH) * 2;

const footerElement = <RunningWorkoutScreenFooter />;

type RunningWorkoutScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.RunningWorkoutScreen
>;

export const RunningWorkoutScreen = ({}: RunningWorkoutScreenProps) => {
  const t = useAppTranslation();

  const appColors = useAppThemedColors();

  const { popUp, openEndWorkoutPopUp } = useEndRunningWorkoutPopUp();

  const { currentState, isRunning } = useWorkoutTimer(() =>
    console.log('FINISH'),
  );

  if (!currentState) {
    /**
     * To be implemented: Button to navigate back...
     */
    return null;
  }

  const {
    workoutName,
    currentPhase,
    totalElapsedMs,
    totalDurationMs,
    phaseRemainingMs,
    phaseElapsedMs,
  } = currentState;

  const headerTitle: string =
    workoutName || t('screens.runningWorkoutScreen.title');

  const phaseColorStatus = workoutPhaseToColorStatus[currentPhase];
  const phaseColor = appColors[phaseColorStatus];

  const maxValue = phaseRemainingMs + phaseElapsedMs;

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
              <RunningWorkoutPulsingBackground
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
        </AppView>
      </AppScreenLayout>
      {popUp}
    </>
  );
};
