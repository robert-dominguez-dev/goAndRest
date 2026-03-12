import { AppRow } from '../AppRow.tsx';
import { AppRoundedButton } from '../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { JSX } from 'react';
import { useAppThemedColors } from '../../../hooks/useAppThemedColors.ts';
import { AppView } from '../AppView/AppView.tsx';
import {
  AppRoundedButtonSizeUnion,
  roundedButtonToIconSize,
} from '../../controls/AppRoundedButton/constants.ts';
import {
  getPlayButtonCommonProps,
  GetPlayButtonCommonPropsParams,
} from './helpers/getPlayButtonCommonProps.tsx';

const SECONDARY_BUTTON_MIN_WIDTH = 80;
const MAIN_BUTTON_SIZE: AppRoundedButtonSizeUnion = 'l';
const MAIN_BUTTON_ICON_SIZE = roundedButtonToIconSize[MAIN_BUTTON_SIZE];

export type AppRoundedButtonsProps = GetPlayButtonCommonPropsParams & {
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
};

export const AppRoundedButtons = ({
  leftButton,
  rightButton,
  onPlay,
  onPause,
  isRunning,
}: AppRoundedButtonsProps) => {
  const { text } = useAppThemedColors();

  const { handlePress, IconComponent } = getPlayButtonCommonProps({
    onPlay,
    onPause,
    isRunning,
  });

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
