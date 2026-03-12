import { AppRoundedButton } from '../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import {
  RunningWorkoutSkipButtonUI,
  RunningWorkoutSkipButtonUIProps,
} from './RunningWorkoutSkipButtonUI.tsx';
import { AppSize } from '../../../../../../types/ui.ts';

type RunningWorkoutSkipButtonProps = Omit<
  RunningWorkoutSkipButtonUIProps,
  'iconSize' | 'opacity'
> & {
  onPress: () => void;
};

export const RunningWorkoutSkipButton = ({
  value,
  direction,
  onPress,
}: RunningWorkoutSkipButtonProps) => (
  <AppRoundedButton
    onPress={onPress}
    size={'s'}
    status={'grayscale'}>
    <RunningWorkoutSkipButtonUI
      value={value}
      direction={direction}
      iconSize={AppSize.ml}
    />
  </AppRoundedButton>
);
