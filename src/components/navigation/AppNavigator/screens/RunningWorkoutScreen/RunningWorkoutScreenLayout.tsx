import { AppScreenLayout, AppScreenLayoutProps, } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { useWorkoutTimer } from '../../../../../hooks/useWorkoutTimer.ts';
import { useWorkoutFeedback } from '../../../../../hooks/useWorkoutFeedback.ts';
import { FinishedWorkoutScreen } from '../FinishedWorkoutScreen/FinishedWorkoutScreen.tsx';
import { JSX, useMemo } from 'react';
import { getRunningWorkoutName } from './helpers/getRunningWorkoutName.ts';
import {
  appOrientationToRunningWorkoutContentComponent,
  appOrientationToRunningWorkoutFooterElement,
  appOrientationToRunningWorkoutPaddingTop,
} from './constants.tsx';
import { AppOrientation } from '../../../../../types/common.ts';
import { RunningWorkoutLandscapeTitle } from './RunningWorkoutLandscapeTitle.tsx';
import { RunningWorkoutLandscapePulsingBackground } from './components/RunningWorkoutLandscapePulsingBackground.tsx';

export type RunningWorkoutScreenLayoutProps = Pick<
  AppScreenLayoutProps,
  | 'headerAccessoryRightIconName'
  | 'onHeaderAccessoryRightPress'
  | 'onHeaderAccessoryLeftPress'
> & {
  orientation: AppOrientation;
  onFinish: () => void;
};

export const RunningWorkoutScreenLayout = ({
  orientation,
  headerAccessoryRightIconName,
  onHeaderAccessoryRightPress,
  onHeaderAccessoryLeftPress,
  onFinish,
}: RunningWorkoutScreenLayoutProps) => {
  const t = useAppTranslation();

  const { currentState, isRunning } = useWorkoutTimer(onFinish);

  useWorkoutFeedback({
    isRunning,
    currentPhase: currentState?.currentPhase,
    phaseRemainingMs: currentState?.phaseRemainingMs,
    phaseElapsedMs: currentState?.phaseElapsedMs,
  });

  const headerTitle = useMemo(
    () =>
      getRunningWorkoutName({
        workoutName: currentState?.workoutName,
        workoutConfig: currentState?.workoutConfig,
        t,
      }),
    [currentState?.workoutName, currentState?.workoutConfig],
  );

  if (!currentState) {
    return <FinishedWorkoutScreen />;
  }

  const ContentComponent =
    appOrientationToRunningWorkoutContentComponent[orientation];

  const maybeFooterElement =
    appOrientationToRunningWorkoutFooterElement[orientation];

  const contentPaddingTop =
    appOrientationToRunningWorkoutPaddingTop[orientation];

  const appOrientationToRunningWorkoutHeaderElement: Record<
    AppOrientation,
    AppScreenLayoutProps['headerTitle']
  > = {
    PORTRAIT: headerTitle,
    LANDSCAPE: (
      <RunningWorkoutLandscapeTitle
        headerTitle={headerTitle}
        currentState={currentState}
      />
    ),
  };

  const headerTitleEvaluated =
    appOrientationToRunningWorkoutHeaderElement[orientation];

  const appOrientationToBackgroundElement: Record<
    AppOrientation,
    JSX.Element | undefined
  > = {
    PORTRAIT: undefined,
    LANDSCAPE: (
      <RunningWorkoutLandscapePulsingBackground
        currentPhase={currentState.currentPhase}
        phaseElapsedMs={currentState.phaseElapsedMs}
        phaseRemainingMs={currentState.phaseRemainingMs}
        enabled={isRunning}
      />
    ),
  };

  const backgroundOverlayElement =
    appOrientationToBackgroundElement[orientation];

  return (
    <AppScreenLayout
      headerTitle={headerTitleEvaluated}
      footer={maybeFooterElement}
      headerAccessoryLeftIconName={'X'}
      onHeaderAccessoryLeftPress={onHeaderAccessoryLeftPress}
      headerAccessoryRightIconName={headerAccessoryRightIconName}
      onHeaderAccessoryRightPress={onHeaderAccessoryRightPress}
      backgroundOverlayElement={backgroundOverlayElement}
      contentPaddingTopOverride={contentPaddingTop}>
      <ContentComponent
        currentState={currentState}
        isRunning={isRunning}
      />
    </AppScreenLayout>
  );
};
