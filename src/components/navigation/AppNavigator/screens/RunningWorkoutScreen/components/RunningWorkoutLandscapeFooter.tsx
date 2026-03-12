import { memo } from 'react';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { getPlayButtonCommonProps } from '../../../../../common/AppRoundedButtons/helpers/getPlayButtonCommonProps.tsx';
import { useRunningWorkoutControls } from '../hooks/useRunningWorkoutControls.tsx';
import { Pressable } from 'react-native';
import {
  LANDSCAPE_SKIP_BUTTON_ICON_SIZE,
  RunningWorkoutLandscapeSkipButton,
} from './RunningWorkoutLandscapeSkipButton.tsx';

const RunningWorkoutLandscapeFooterComponent = () => {
  const { text } = useAppThemedColors();

  const { pause, resume, skipForward, skipBackward, isRunning } =
    useRunningWorkoutControls();

  const { handlePress, IconComponent } = getPlayButtonCommonProps({
    onPlay: resume,
    onPause: pause,
    isRunning,
  });

  return (
    <>
      <RunningWorkoutLandscapeSkipButton
        onPress={skipBackward}
        direction={'left'}
      />
      <Pressable onPress={handlePress}>
        <IconComponent
          size={LANDSCAPE_SKIP_BUTTON_ICON_SIZE}
          color={text}
        />
      </Pressable>
      <RunningWorkoutLandscapeSkipButton
        onPress={skipForward}
        direction={'right'}
      />
    </>
  );
};

export const RunningWorkoutLandscapeFooter = memo(
  RunningWorkoutLandscapeFooterComponent,
);
