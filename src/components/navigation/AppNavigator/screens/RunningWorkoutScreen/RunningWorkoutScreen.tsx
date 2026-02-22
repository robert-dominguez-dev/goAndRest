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
import { AppCircularSliderBase } from '../../../../controls/AppCircularSlider/components/AppCircularSliderBase.tsx';
import { useCircularSliderGeometry } from '../../../../controls/AppCircularSlider/hooks/useCircularSliderGeometry.ts';
import { formatTimerTime } from '../../../../../helpers/formatTimerTime.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';

const INDICATOR_RADIUS = 160;
const INDICATOR_STROKE_WIDTH = 16;

const footerElement = <RunningWorkoutScreenFooter />;

export const RunningWorkoutScreen = () => {
  const t = useAppTranslation();

  const { currentState, isRunning } = useWorkoutTimer(() =>
    console.log('FINISH'),
  );

  const { popUp, openEndWorkoutPopUp } = useEndRunningWorkoutPopUp();

  const headerTitle: string =
    currentState?.workoutName || t('screens.runningWorkoutScreen.title');

  const backgroundColorStatus: AppColorUnion | undefined =
    currentState?.currentPhase
      ? workoutPhaseToColorStatus[currentState.currentPhase]
      : undefined;

  const phaseRemainingMs = getNumber(currentState?.phaseRemainingMs);
  const phaseElapsedMs = getNumber(currentState?.phaseElapsedMs);

  const maxValue = phaseRemainingMs + phaseElapsedMs;

  const { size, center, circumference, theta } = useCircularSliderGeometry({
    value: phaseElapsedMs,
    radius: INDICATOR_RADIUS,
    strokeWidth: INDICATOR_STROKE_WIDTH,
    isRunning,
    maxValue,
  });

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
          <AppCircularSliderBase
            size={size}
            center={center}
            circumference={circumference}
            theta={theta}
            trackColor={'#FFFFFF'}
            filledTrackColor={'#444444'}
            radius={INDICATOR_RADIUS}
            strokeWidth={INDICATOR_STROKE_WIDTH}
            maxValue={maxValue}
            step={1}
            valueFormatter={formatTimerTime}>
            <AppView
              width={size - INDICATOR_STROKE_WIDTH * 4}
              height={size - INDICATOR_STROKE_WIDTH * 4}
              backgroundColorStatus={backgroundColorStatus}
              borderRadius={size / 2}
              alignItems={'center'}
              justifyContent={'center'}>
              <AppText
                grow={false}
                category={'header'}>
                {currentState?.currentPhase}
              </AppText>
              <AppTimeView msLeft={phaseRemainingMs} />
              <AppTimeView
                fontSizeOverride={20}
                msLeft={getNumber(currentState?.totalElapsedMs)}
              />
            </AppView>
          </AppCircularSliderBase>
        </AppView>
      </AppScreenLayout>
      {popUp}
    </>
  );
};
