import { AppView, AppViewProps } from './AppView/AppView.tsx';
import LinearGradient from 'react-native-linear-gradient';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { AppGradientColorUnion } from '../../constants/colors.ts';
import { useAppThemedGradientColors } from '../../hooks/useAppThemedGradientColors.ts';
import { AppSize } from '../../types/ui.ts';

export const GRADIENT_BORDER_WIDTH = AppSize.xxs;

export type AppViewWithGradientBorderProps = Omit<AppViewProps, 'margin'> & {
  gradientBorderColorStatus: AppGradientColorUnion;
};

export const AppViewWithGradientBorder = ({
  children,
  gradientBorderColorStatus,
  opacity,
  ...appViewProps
}: AppViewWithGradientBorderProps) => {
  const appLinearGradientColors = useAppThemedGradientColors();

  const linearGradientStyle: ViewStyle = {
    opacity,
    borderRadius: appViewProps.borderRadius,
  };

  return (
    <LinearGradient
      colors={appLinearGradientColors[gradientBorderColorStatus]}
      style={linearGradientStyle}>
      <AppView
        margin={GRADIENT_BORDER_WIDTH}
        alignItems={'center'}
        justifyContent={'center'}
        {...appViewProps}>
        {children}
      </AppView>
    </LinearGradient>
  );
};
