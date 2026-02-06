import { AppView, AppViewProps } from './AppView.tsx';
import LinearGradient from 'react-native-linear-gradient';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { AppGradientColorUnion } from '../../constants/colors.ts';
import { useAppThemedGradientColors } from '../../hooks/useAppThemedGradientColors.ts';

export type AppViewWithGradientBorderProps = Omit<AppViewProps, 'margin'> & {
  gradientBorderColorStatus: AppGradientColorUnion;
};

export const AppViewWithGradientBorder = ({
  children,
  gradientBorderColorStatus,
  ...appViewProps
}: AppViewWithGradientBorderProps) => {
  const appLinearGradientColors = useAppThemedGradientColors();

  const linearGradientStyle: ViewStyle = {
    borderRadius: appViewProps.borderRadius,
  };

  return (
    <LinearGradient
      colors={appLinearGradientColors[gradientBorderColorStatus]}
      style={linearGradientStyle}>
      <AppView
        margin={'xxs'}
        alignItems={'center'}
        justifyContent={'center'}
        {...appViewProps}>
        {children}
      </AppView>
    </LinearGradient>
  );
};
