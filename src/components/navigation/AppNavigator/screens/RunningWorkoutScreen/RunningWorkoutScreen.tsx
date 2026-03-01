import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { LucideIcon, Volume2, VolumeX, X } from 'lucide-react-native';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { RunningWorkoutScreenFooter } from './components/RunningWorkoutScreenFooter.tsx';
import { useEndRunningWorkoutPopUp } from './hooks/useEndRunningWorkoutPopUp.tsx';
import { useWorkoutTimer } from '../../../../../hooks/useWorkoutTimer.ts';
import { workoutPhaseToTimerColorStatus } from './constants.ts';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppCircularIndicator } from '../../../../controls/AppCircularSlider/components/AppCircularIndicator.tsx';
import { useAppThemedColors } from '../../../../../hooks/useAppThemedColors.ts';
import { RunningWorkoutPulsingBackground } from './components/RunningWorkoutPulsingBackground.tsx';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { RunningWorkoutIndicatorsContent } from './components/RunningWorkoutIndicatorsContent.tsx';
import { useWorkoutFeedback } from '../../../../../hooks/useWorkoutFeedback.ts';
import { FinishedWorkoutScreen } from '../FinishedWorkoutScreen/FinishedWorkoutScreen.tsx';
import { isMutedAtom } from '../../../../../contexts/atoms.ts';
import { useAtom } from 'jotai';
import TrackPlayer from 'react-native-track-player';
import { RunningWorkoutCounter } from './components/RunningWorkoutCounter.tsx';

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

export const RunningWorkoutScreen = ({
  navigation,
}: RunningWorkoutScreenProps) => {
  const t = useAppTranslation();

  const [isMuted, setIsMuted] = useAtom(isMutedAtom);

  const appColors = useAppThemedColors();

  const { popUp, openEndWorkoutPopUp } = useEndRunningWorkoutPopUp();

  const handleFinish = () =>
    navigation.reset({
      routes: [
        {
          name: AppNavigatorScreen.FinishedWorkoutScreen,
        },
      ],
    });

  const { currentState, isRunning } = useWorkoutTimer(handleFinish);

  useWorkoutFeedback({
    isRunning,
    currentPhase: currentState?.currentPhase,
    phaseRemainingMs: currentState?.phaseRemainingMs,
    phaseElapsedMs: currentState?.phaseElapsedMs,
  });

  if (!currentState) {
    return <FinishedWorkoutScreen />;
  }

  const {
    workoutName,
    currentPhase,
    totalElapsedMs,
    totalDurationMs,
    phaseRemainingMs,
    phaseElapsedMs,
    currentSeries,
    currentRound,
    workoutConfig: { series, rounds },
  } = currentState;

  const headerTitle: string =
    workoutName || t('screens.runningWorkoutScreen.title');

  const phaseColorStatus = workoutPhaseToTimerColorStatus[currentPhase];
  const phaseColor = appColors[phaseColorStatus];

  const maxValue = phaseRemainingMs + phaseElapsedMs;

  const VolumeIconComponent: LucideIcon = isMuted ? VolumeX : Volume2;

  const toggleMuted = () =>
    setIsMuted(prev => {
      const shouldBeMuted = !prev;
      const volume: number = shouldBeMuted ? 0 : 1;
      void TrackPlayer.setVolume(volume);
      return shouldBeMuted;
    });

  return (
    <>
      <AppScreenLayout
        headerTitle={headerTitle}
        footer={footerElement}
        HeaderAccessoryLeftIconComponent={X}
        onHeaderAccessoryLeftPress={openEndWorkoutPopUp}
        HeaderAccessoryRightIconComponent={VolumeIconComponent}
        onHeaderAccessoryRightPress={toggleMuted}>
        <AppView
          gap={'l'}
          alignItems={'center'}
          justifyContent={'center'}>
          <RunningWorkoutCounter
            currentSeries={currentSeries}
            currentRound={currentRound}
            totalSeries={series}
            totalRounds={rounds}
          />
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
