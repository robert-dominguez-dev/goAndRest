import { AppRoundedButtonProps } from '../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { AppIconName } from '../../AppIcon.tsx';

export type GetPlayButtonCommonPropsParams = {
  onPlay: () => void;
  onPause?: () => void;
  isRunning: boolean;
};

export const getPlayButtonCommonProps = ({
  onPlay,
  onPause,
  isRunning,
}: GetPlayButtonCommonPropsParams) => {
  const handlePress: AppRoundedButtonProps['onPress'] = isRunning
    ? onPause
    : onPlay;

  const iconName: AppIconName = isRunning ? 'Pause' : 'Play';

  return { handlePress, iconName };
};
