import { AppRoundedButton } from '../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import {
  RunningWorkoutSkipButtonUI,
  RunningWorkoutSkipButtonUIProps,
} from './RunningWorkoutSkipButtonUI.tsx';
import { AppSize } from '../../../../../../types/ui.ts';
import { useGetTabletScaledNumber } from '../../../../../../hooks/useGetTabletScaledNumber.ts';
import { SECONDARY_BUTTON_MIN_WIDTH } from '../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';

type RunningWorkoutSkipButtonProps = Omit<
  RunningWorkoutSkipButtonUIProps,
  'iconSize' | 'opacity' | 'offsetBaseSize'
> & {
  onPress: () => void;
};

export const RunningWorkoutSkipButton = ({
  value,
  direction,
  onPress,
}: RunningWorkoutSkipButtonProps) => {
  const getTabletScaledNumber = useGetTabletScaledNumber();

  const offsetBaseSize = getTabletScaledNumber(SECONDARY_BUTTON_MIN_WIDTH / 7);

  return (
    <AppRoundedButton
      onPress={onPress}
      size={'s'}
      status={'grayscale'}>
      <RunningWorkoutSkipButtonUI
        value={value}
        direction={direction}
        offsetBaseSize={offsetBaseSize}
        iconSize={AppSize.ml}
      />
    </AppRoundedButton>
  );
};
