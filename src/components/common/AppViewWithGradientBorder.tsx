import { AppGradientColorUnion } from '../../types/ui.ts';
import { AppView, AppViewProps } from './AppView.tsx';
import LinearGradient from 'react-native-linear-gradient';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { appLinearGradientColors } from '../../constants/colors.ts';

export type AppViewWithGradientBorderProps = Omit<AppViewProps, 'margin'> & {
  gradientBorderColorStatus: AppGradientColorUnion;
};

export const AppViewWithGradientBorder = ({
  children,
  gradientBorderColorStatus,
  ...appViewProps
}: AppViewWithGradientBorderProps) => {
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
