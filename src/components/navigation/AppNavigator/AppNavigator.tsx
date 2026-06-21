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
import { runningWorkoutStateAtom } from '../../../contexts/atoms.ts';
import { calculateCurrentWorkoutState } from '../../../helpers/calculateCurrentWorkoutState.ts';
import { FinishedWorkoutScreen } from './screens/FinishedWorkoutScreen/FinishedWorkoutScreen.tsx';
import { useInitiateWorkoutSounds } from '../../../hooks/useInitiateWorkoutSounds/useInitiateWorkoutSounds.ts';

const Stack = createNativeStackNavigator<AppNavigatorScreenParams, string>();

const AppNavigatorComponent = () => {
  useInitiateWorkoutSounds();

  const persistedState = useAtomValue(runningWorkoutStateAtom);

  const isTimerExisting: boolean =
    !!persistedState &&
    !calculateCurrentWorkoutState(persistedState).isFinished;

  const initialRouteName: AppNavigatorScreen = isTimerExisting
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
      />
      <Stack.Screen
        name={AppNavigatorScreen.RunningWorkoutScreen}
        component={RunningWorkoutScreen}
      />
      <Stack.Screen
        name={AppNavigatorScreen.FinishedWorkoutScreen}
        component={FinishedWorkoutScreen}
      />
      <Stack.Screen
        name={AppNavigatorScreen.SavedWorkoutsScreen}
        component={SavedWorkoutsScreen}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = memo(AppNavigatorComponent);
