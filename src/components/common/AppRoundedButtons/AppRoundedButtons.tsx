import { AppRow } from '../AppRow.tsx';
import { AppRoundedButton } from '../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { Pause, Play } from 'lucide-react-native';
import { JSX } from 'react';
import { useAppThemedColors } from '../../../hooks/useAppThemedColors.ts';
import { AppView } from '../AppView.tsx';
import {
  AppRoundedButtonSizeUnion,
  roundedButtonToIconSize,
} from '../../controls/AppRoundedButton/constants.ts';

const SECONDARY_BUTTON_MIN_WIDTH = 80;
const MAIN_BUTTON_SIZE: AppRoundedButtonSizeUnion = 'l';
const MAIN_BUTTON_ICON_SIZE = roundedButtonToIconSize[MAIN_BUTTON_SIZE];

type AppRoundedButtonsProps = {
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
  onMainButtonPress: () => void;
  isRunning: boolean;
};

export const AppRoundedButtons = ({
  leftButton,
  rightButton,
  onMainButtonPress,
  isRunning,
}: AppRoundedButtonsProps) => {
  const { text } = useAppThemedColors();

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
        onPress={onMainButtonPress}
        size={MAIN_BUTTON_SIZE}
        status={'primary'}>
        {isRunning ? (
          <Pause
            size={MAIN_BUTTON_ICON_SIZE}
            color={text}
          />
        ) : (
          <Play
            size={MAIN_BUTTON_ICON_SIZE}
            color={text}
          />
        )}
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
