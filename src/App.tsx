import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './components/navigation/AppNavigator/AppNavigator.tsx';
import { AppThemeProvider } from './contexts/AppThemeProvider.tsx';
import { AppWorkoutsProvider } from './contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';

export const App = () => (
  <NavigationContainer>
    <SafeAreaProvider>
      <AppThemeProvider>
        <AppWorkoutsProvider>
          <AppNavigator />
        </AppWorkoutsProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  </NavigationContainer>
);
