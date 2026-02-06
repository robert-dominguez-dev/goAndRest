import {
  AppGradientColors,
  appLinearGradientColorsDark,
  appLinearGradientColorsLight,
} from '../constants/colors.ts';
import { useAppTheme } from '../contexts/AppThemeProvider.tsx';
import { AppTheme } from '../types/common.ts';

const appGradientColors: Record<AppTheme, AppGradientColors> = {
  [AppTheme.light]: appLinearGradientColorsLight,
  [AppTheme.dark]: appLinearGradientColorsDark,
};

export const useAppThemedGradientColors = () => {
  const { theme } = useAppTheme();
  return appGradientColors[theme];
};
