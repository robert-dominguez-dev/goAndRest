import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavigatorScreen, AppNavigatorScreenParams } from './types.ts';

import { memo } from 'react';
import {
  commonAppNavigationOptions,
  ROOT_STACK_NAVIGATOR_ID,
} from '../constants.ts';
import { LandingScreen } from './screens/LandingScreen/LandingScreen.tsx';
import { WorkoutCreationScreen } from './screens/WorkoutCreationScreen/WorkoutCreationScreen.tsx';
import { RunningWorkoutScreen } from './screens/RunningWorkoutScreen/RunningWorkoutScreen.tsx';
import { SettingsScreen } from './screens/SettingsScreen/SettingsScreen.tsx';

const Stack = createNativeStackNavigator<AppNavigatorScreenParams, string>();

const _AppNavigator = () => (
  <Stack.Navigator
    id={ROOT_STACK_NAVIGATOR_ID}
    screenOptions={commonAppNavigationOptions}>
    <Stack.Screen
      name={AppNavigatorScreen.LandingScreen}
      component={LandingScreen}
    />
    <Stack.Screen
      name={AppNavigatorScreen.SettingsScreen}
      component={SettingsScreen}
      options={{
        presentation: 'pageSheet',
        sheetGrabberVisible: false,
      }}
    />
    <Stack.Screen
      name={AppNavigatorScreen.WorkoutCreationScreen}
      component={WorkoutCreationScreen}
      options={{
        presentation: 'pageSheet',
        sheetGrabberVisible: false,
      }}
    />
    <Stack.Screen
      name={AppNavigatorScreen.RunningWorkoutScreen}
      component={RunningWorkoutScreen}
    />
  </Stack.Navigator>
);

export const AppNavigator = memo(_AppNavigator);
