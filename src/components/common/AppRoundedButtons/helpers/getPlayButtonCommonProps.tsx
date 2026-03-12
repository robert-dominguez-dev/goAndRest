import { AppRoundedButtonProps } from '../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { LucideIcon, Pause, Play } from 'lucide-react-native';

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

  const IconComponent: LucideIcon = isRunning ? Pause : Play;

  return { handlePress, IconComponent };
};
