import { roundedButtonToIconSize } from '../../../../../controls/AppRoundedButton/constants.ts';
import {
  RunningWorkoutSkipButtonUI,
  RunningWorkoutSkipButtonUIProps,
} from './RunningWorkoutSkipButtonUI.tsx';
import { Pressable } from 'react-native';
import { getPressableOpacity } from '../../../../../controls/helpers/getPressableOpacity.ts';
import { getOnPressWithHapticFeedback } from '../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { SKIP_SECONDS } from '../hooks/useRunningWorkoutControls.tsx';
import { useGetTabletScaledNumber } from '../../../../../../hooks/useGetTabletScaledNumber.ts';

export const LANDSCAPE_SKIP_BUTTON_ICON_SIZE = roundedButtonToIconSize.m;
export const LANDSCAPE_SKIP_BUTTON_SIZE = LANDSCAPE_SKIP_BUTTON_ICON_SIZE * 2;

type RunningWorkoutLandscapeSkipButtonProps = Pick<
  RunningWorkoutSkipButtonUIProps,
  'direction'
> & {
  onPress: () => void;
};

export const RunningWorkoutLandscapeSkipButton = ({
  direction,
  onPress,
}: RunningWorkoutLandscapeSkipButtonProps) => {
  const getTabletScaledNumber = useGetTabletScaledNumber();

  const offsetBaseSize = getTabletScaledNumber(12);

  return (
    <Pressable
      onPress={getOnPressWithHapticFeedback(onPress)}
      style={{
        position: 'relative',

        height: getTabletScaledNumber(LANDSCAPE_SKIP_BUTTON_SIZE),
        width: getTabletScaledNumber(LANDSCAPE_SKIP_BUTTON_SIZE),
      }}>
      {({ pressed }) => {
        const opacity = getPressableOpacity({
          pressed,
          disabled: false,
        });

        return (
          <RunningWorkoutSkipButtonUI
            opacity={opacity}
            direction={direction}
            value={SKIP_SECONDS}
            iconSize={LANDSCAPE_SKIP_BUTTON_ICON_SIZE}
            offsetBaseSize={offsetBaseSize}
          />
        );
      }}
    </Pressable>
  );
};
