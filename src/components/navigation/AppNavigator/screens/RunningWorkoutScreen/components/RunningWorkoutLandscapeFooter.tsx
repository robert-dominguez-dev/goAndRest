import { memo } from 'react';
import { getPlayButtonCommonProps } from '../../../../../common/AppRoundedButtons/helpers/getPlayButtonCommonProps.tsx';
import { useRunningWorkoutControls } from '../hooks/useRunningWorkoutControls.tsx';
import { Pressable } from 'react-native';
import {
  LANDSCAPE_SKIP_BUTTON_ICON_SIZE,
  RunningWorkoutLandscapeSkipButton,
} from './RunningWorkoutLandscapeSkipButton.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';

const RunningWorkoutLandscapeFooterComponent = () => {
  const { pause, resume, skipForward, skipBackward, isRunning } =
    useRunningWorkoutControls();

  const { handlePress, iconName } = getPlayButtonCommonProps({
    onPlay: resume,
    onPause: pause,
    isRunning,
  });

  return (
    <AppView
      gap={'m'}
      alignItems={'center'}
      justifyContent={'center'}>
      <RunningWorkoutLandscapeSkipButton
        onPress={skipBackward}
        direction={'left'}
      />
      <Pressable onPress={handlePress}>
        <AppIcon
          name={iconName}
          size={LANDSCAPE_SKIP_BUTTON_ICON_SIZE}
        />
      </Pressable>
      <RunningWorkoutLandscapeSkipButton
        onPress={skipForward}
        direction={'right'}
      />
    </AppView>
  );
};

export const RunningWorkoutLandscapeFooter = memo(
  RunningWorkoutLandscapeFooterComponent,
);
