import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './components/navigation/AppNavigator/AppNavigator.tsx';
import { AppThemeProvider } from './contexts/AppThemeProvider.tsx';
import { AppWorkoutsProvider } from './contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { I18nextProvider } from 'react-i18next';
import { appI18NextConfig } from './locales/constants.ts';
import { AppLanguageProvider } from './contexts/AppLanguageProvider/AppLanguageProvider.tsx';

export const App = () => (
  <I18nextProvider i18n={appI18NextConfig}>
    <AppLanguageProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <AppThemeProvider>
            <AppWorkoutsProvider>
              <AppNavigator />
            </AppWorkoutsProvider>
          </AppThemeProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </AppLanguageProvider>
  </I18nextProvider>
);
