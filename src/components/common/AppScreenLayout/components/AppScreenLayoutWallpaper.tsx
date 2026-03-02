import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppThemedGradientColors } from '../../../../hooks/useAppThemedGradientColors.ts';
import { ChildrenProp } from '../../../../types/common.ts';
import { AppView } from '../../AppView/AppView.tsx';

export type AppScreenLayoutBackgroundOverlayProps = ChildrenProp;

export const AppScreenLayoutBackgroundOverlay = ({
  children,
}: AppScreenLayoutBackgroundOverlayProps) => {
  const appLinearGradientColors = useAppThemedGradientColors();

  return (
    <AppView {...StyleSheet.absoluteFill}>
      {children}
      <LinearGradient
        colors={appLinearGradientColors.semiTransparent}
        style={StyleSheet.absoluteFill}
      />
    </AppView>
  );
};
