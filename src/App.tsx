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

export const App = () => (
  <I18nextProvider i18n={appI18NextConfig}>
    <AppOrientationLocker orientation={'PORTRAIT'} />
    <AppLanguageProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <Suspense fallback={null}>
            <AppThemeProvider>
              <AppWorkoutsProvider>
                <AppStatusBar />
                <AppNavigators />
              </AppWorkoutsProvider>
            </AppThemeProvider>
          </Suspense>
        </SafeAreaProvider>
      </NavigationContainer>
    </AppLanguageProvider>
  </I18nextProvider>
);
