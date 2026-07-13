import { WorkoutHistoryEntry } from '../../../contexts/workoutHistory/types.ts';

export enum AppNavigatorScreen {
  LandingScreen = 'LandingScreen',
  SettingsScreen = 'SettingsScreen',
  RunningWorkoutScreen = 'RunningWorkoutScreen',
  FinishedWorkoutScreen = 'FinishedWorkoutScreen',
  SavedWorkoutsScreen = 'SavedWorkoutsScreen',
  HistoryScreen = 'HistoryScreen',
  HistoryDetailScreen = 'HistoryDetailScreen',
  PaywallScreen = 'PaywallScreen',
  DevScreen = 'DevScreen',
}

export type AppNavigatorScreenParams = {
  [AppNavigatorScreen.LandingScreen]: undefined;
  [AppNavigatorScreen.SettingsScreen]: undefined;
  [AppNavigatorScreen.RunningWorkoutScreen]: undefined;
  [AppNavigatorScreen.FinishedWorkoutScreen]: undefined;
  [AppNavigatorScreen.SavedWorkoutsScreen]: undefined;
  [AppNavigatorScreen.HistoryScreen]: undefined;
  [AppNavigatorScreen.HistoryDetailScreen]: { entry: WorkoutHistoryEntry };
  [AppNavigatorScreen.PaywallScreen]: undefined;
  [AppNavigatorScreen.DevScreen]: undefined;
};
