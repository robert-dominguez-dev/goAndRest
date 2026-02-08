import { AppRow } from '../AppRow.tsx';
import { AppRoundedButton } from '../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { Pause, Play } from 'lucide-react-native';
import { JSX } from 'react';
import { useAppThemedColors } from '../../../hooks/useAppThemedColors.ts';
import { AppView } from '../AppView.tsx';

const MAIN_BUTTON_ICON_SIZE = 40;
const SECONDARY_BUTTON_MIN_WIDTH = 80;

type AppRoundedButtonsProps = {
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
  onMainButtonPress: () => void;
  isPlaying: boolean;
};

export const AppRoundedButtons = ({
  leftButton,
  rightButton,
  onMainButtonPress,
  isPlaying,
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
        size={'m'}
        status={'primary'}>
        {isPlaying ? (
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
