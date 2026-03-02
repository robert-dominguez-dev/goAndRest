import { StatusBar } from 'react-native';
import { memo } from 'react';
import { AppTheme } from '../../types/common.ts';
import { StatusBarStyle } from 'react-native/Libraries/Components/StatusBar/StatusBar';
import { useAppTheme } from '../../contexts/AppThemeProvider.tsx';

const appThemeToStatusBarContentColor: Record<AppTheme, StatusBarStyle> = {
  [AppTheme.light]: 'dark-content',
  [AppTheme.dark]: 'light-content',
};

const AppStatusBarComponent = () => {
  const { theme } = useAppTheme();

  const barStyle = appThemeToStatusBarContentColor[theme];

  return (
    <StatusBar
      barStyle={barStyle}
      translucent={true}
      backgroundColor={'transparent'}
    />
  );
};

export const AppStatusBar = memo(AppStatusBarComponent);
