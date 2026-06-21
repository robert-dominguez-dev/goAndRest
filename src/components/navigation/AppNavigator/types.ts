export enum AppNavigatorScreen {
  LandingScreen = 'LandingScreen',
  SettingsScreen = 'SettingsScreen',
  RunningWorkoutScreen = 'RunningWorkoutScreen',
  FinishedWorkoutScreen = 'FinishedWorkoutScreen',
  SavedWorkoutsScreen = 'SavedWorkoutsScreen',
  DevScreen = 'DevScreen',
}

export type AppNavigatorScreenParams = {
  [AppNavigatorScreen.LandingScreen]: undefined;
  [AppNavigatorScreen.SettingsScreen]: undefined;
  [AppNavigatorScreen.RunningWorkoutScreen]: undefined;
  [AppNavigatorScreen.FinishedWorkoutScreen]: undefined;
  [AppNavigatorScreen.SavedWorkoutsScreen]: undefined;
  [AppNavigatorScreen.DevScreen]: undefined;
};
