import { AppRow } from '../AppRow.tsx';
import {
  AppRoundedButton,
  AppRoundedButtonProps,
} from '../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { LucideIcon, Pause, Play } from 'lucide-react-native';
import { JSX } from 'react';
import { useAppThemedColors } from '../../../hooks/useAppThemedColors.ts';
import { AppView } from '../AppView/AppView.tsx';
import {
  AppRoundedButtonSizeUnion,
  roundedButtonToIconSize,
} from '../../controls/AppRoundedButton/constants.ts';

const SECONDARY_BUTTON_MIN_WIDTH = 80;
const MAIN_BUTTON_SIZE: AppRoundedButtonSizeUnion = 'l';
const MAIN_BUTTON_ICON_SIZE = roundedButtonToIconSize[MAIN_BUTTON_SIZE];

export type AppRoundedButtonsProps = {
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
  onPlay: () => void;
  onPause?: () => void;
  isRunning: boolean;
};

export const AppRoundedButtons = ({
  leftButton,
  rightButton,
  onPlay,
  onPause,
  isRunning,
}: AppRoundedButtonsProps) => {
  const { text } = useAppThemedColors();

  const handlePress: AppRoundedButtonProps['onPress'] = isRunning
    ? onPause
    : onPlay;

  const IconComponent: LucideIcon = isRunning ? Pause : Play;

  return (
    <AppRow alignItems={'center'}>
      <AppView
        grow
        minWidth={SECONDARY_BUTTON_MIN_WIDTH}
        alignItems={'center'}
        justifyContent={'center'}>
        {leftButton}
      </AppView>
      <AppRoundedButton
        onPress={handlePress}
        size={MAIN_BUTTON_SIZE}
        status={'primary'}>
        <IconComponent
          size={MAIN_BUTTON_ICON_SIZE}
          color={text}
        />
      </AppRoundedButton>
      <AppView
        grow
        minWidth={SECONDARY_BUTTON_MIN_WIDTH}
        alignItems={'center'}
        justifyContent={'center'}>
        {rightButton}
      </AppView>
    </AppRow>
  );
};
