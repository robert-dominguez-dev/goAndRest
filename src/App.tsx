import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppThemeProvider } from './contexts/AppThemeProvider.tsx';
import { AppWorkoutsProvider } from './contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { I18nextProvider } from 'react-i18next';
import { appI18NextConfig } from './locales/constants.ts';
import { AppLanguageProvider } from './contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import 'react-native-get-random-values';
import { Suspense } from 'react';
import { AppStatusBar } from './components/common/AppStatusBar.tsx';
import { AppNavigators } from './components/navigation/AppNavigators.tsx';
import { AppOrientationLocker } from './components/common/AppOrientationLocker.tsx';
import { useNavigationAnalytics } from './components/navigation/hooks/useNavigationAnalytics.ts';
import { PremiumCharacterActivationGuard } from './components/common/PremiumCharacterActivationGuard.tsx';
import { usePremiumSync } from './contexts/premium/hooks/usePremiumSync.ts';
import { HistoryPaywallOverlay } from './components/common/HistoryPaywallOverlay.tsx';
import { AppNavigatorScreen } from './components/navigation/AppNavigator/types.ts';

export const App = () => {
  const { navigationRef, onReady, onStateChange } = useNavigationAnalytics();
  usePremiumSync();

  const goToPaywall = () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(AppNavigatorScreen.PaywallScreen);
    }
  };

  return (
    <I18nextProvider i18n={appI18NextConfig}>
      <AppOrientationLocker orientation={'PORTRAIT'} />
      <AppLanguageProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={onReady}
          onStateChange={onStateChange}>
          <SafeAreaProvider>
            <Suspense fallback={null}>
              <AppThemeProvider>
                <AppWorkoutsProvider>
                  <AppStatusBar />
                  <PremiumCharacterActivationGuard />
                  <AppNavigators />
                  <HistoryPaywallOverlay onUnlockPress={goToPaywall} />
                </AppWorkoutsProvider>
              </AppThemeProvider>
            </Suspense>
          </SafeAreaProvider>
        </NavigationContainer>
      </AppLanguageProvider>
    </I18nextProvider>
  );
};
