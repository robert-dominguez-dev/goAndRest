import { AppScreenLayout, AppScreenLayoutProps, } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { X } from 'lucide-react-native';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { useEndRunningWorkoutPopUp } from './hooks/useEndRunningWorkoutPopUp.tsx';
import { useWorkoutTimer } from '../../../../../hooks/useWorkoutTimer.ts';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { useWorkoutFeedback } from '../../../../../hooks/useWorkoutFeedback.ts';
import { FinishedWorkoutScreen } from '../FinishedWorkoutScreen/FinishedWorkoutScreen.tsx';
import { useMemo, useState } from 'react';
import { useWallpaperElement } from './hooks/useWallpaperElement.tsx';
import { getRunningWorkoutName } from './helpers/getRunningWorkoutName.ts';
import Orientation from 'react-native-orientation-locker';
import { handleAppOrientation } from './helpers/handleAppOrientation.tsx';
import {
  appOrientationToChangeIcon,
  appOrientationToRunningWorkoutContentComponent,
  appOrientationToRunningWorkoutFooterElement,
  appOrientationToRunningWorkoutPaddingTop,
} from './constants.tsx';
import { AppOrientation } from '../../../../../types/common.ts';
import { RunningWorkoutLandscapeTitle } from './RunningWorkoutLandscapeTitle.tsx';

type RunningWorkoutScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.RunningWorkoutScreen
>;

export const RunningWorkoutScreen = ({
  navigation,
}: RunningWorkoutScreenProps) => {
  const t = useAppTranslation();

  const [appOrientation, setAppOrientation] =
    useState<AppOrientation>('PORTRAIT');

  const changeToPortrait = () => {
    Orientation.lockToPortrait();
    setAppOrientation('PORTRAIT');
  };

  const changeToLandscape = () => {
    Orientation.lockToLandscape();
    setAppOrientation('LANDSCAPE');
  };

  const { popUp, openEndWorkoutPopUp } = useEndRunningWorkoutPopUp({
    onChangeToPortrait: changeToPortrait,
    onChangeToLandscape: changeToLandscape,
  });

  const handleOpenEndWorkoutPopUp = () => {};

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

  const wallpaperElement = useWallpaperElement();

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

  const toggleOrientation = () =>
    Orientation.getOrientation(currentOrientation =>
      handleAppOrientation({
        orientation: currentOrientation,
        onIsPortrait: changeToLandscape,
        onIsLandscape: changeToPortrait,
      }),
    );

  const HeaderAccessoryRightIconComponent =
    appOrientationToChangeIcon[appOrientation];

  const ContentComponent =
    appOrientationToRunningWorkoutContentComponent[appOrientation];

  const maybeFooterElement =
    appOrientationToRunningWorkoutFooterElement[appOrientation];

  const contentPaddingTop =
    appOrientationToRunningWorkoutPaddingTop[appOrientation];

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
    appOrientationToRunningWorkoutHeaderElement[appOrientation];

  return (
    <>
      <AppScreenLayout
        headerTitle={headerTitleEvaluated}
        footer={maybeFooterElement}
        HeaderAccessoryLeftIconComponent={X}
        onHeaderAccessoryLeftPress={openEndWorkoutPopUp}
        HeaderAccessoryRightIconComponent={HeaderAccessoryRightIconComponent}
        onHeaderAccessoryRightPress={toggleOrientation}
        backgroundOverlayElement={wallpaperElement}
        contentPaddingTopOverride={contentPaddingTop}>
        <ContentComponent
          currentState={currentState}
          isRunning={isRunning}
        />
      </AppScreenLayout>
      {popUp}
    </>
  );
};
