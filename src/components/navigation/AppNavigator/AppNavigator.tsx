import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavigatorScreen, AppNavigatorScreenParams } from './types.ts';

import { memo } from 'react';
import {
  commonAppNavigationOptions,
  ROOT_STACK_NAVIGATOR_ID,
} from '../constants.ts';
import { LandingScreen } from './screens/LandingScreen/LandingScreen.tsx';
import { SavedWorkoutsScreen } from './screens/SavedWorkoutsScreen/SavedWorkoutsScreen.tsx';
import { RunningWorkoutScreen } from './screens/RunningWorkoutScreen/RunningWorkoutScreen.tsx';
import { SettingsScreen } from './screens/SettingsScreen/SettingsScreen.tsx';
import { useAtomValue } from 'jotai';
import {
  computedWorkoutStateAtom,
  runningWorkoutStateAtom,
} from '../../../contexts/atoms.ts';
import { checkIsWorkoutTimerRunningFromSplitState } from './screens/RunningWorkoutScreen/hooks/checkIsWorkoutTimerRunningFromSplitState.ts';

const Stack = createNativeStackNavigator<AppNavigatorScreenParams, string>();

const AppNavigatorComponent = () => {
  const persistedState = useAtomValue(runningWorkoutStateAtom);
  const computedState = useAtomValue(computedWorkoutStateAtom);

  const isTimerRunning = checkIsWorkoutTimerRunningFromSplitState(
    persistedState,
    computedState,
  );

  const initialRouteName: AppNavigatorScreen = isTimerRunning
    ? AppNavigatorScreen.RunningWorkoutScreen
    : AppNavigatorScreen.LandingScreen;

  return (
    <Stack.Navigator
      id={ROOT_STACK_NAVIGATOR_ID}
      initialRouteName={initialRouteName}
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
        name={AppNavigatorScreen.RunningWorkoutScreen}
        component={RunningWorkoutScreen}
      />
      <Stack.Screen
        name={AppNavigatorScreen.SavedWorkoutsScreen}
        component={SavedWorkoutsScreen}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = memo(AppNavigatorComponent);
