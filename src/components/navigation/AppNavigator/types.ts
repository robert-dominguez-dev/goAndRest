export enum AppNavigatorScreen {
  LandingScreen = 'LandingScreen',
  SettingsScreen = 'SettingsScreen',
  RunningWorkoutScreen = 'RunningWorkoutScreen',
  SavedWorkoutsScreen = 'SavedWorkoutsScreen',
}

export type AppNavigatorScreenParams = {
  [AppNavigatorScreen.LandingScreen]: undefined;
  [AppNavigatorScreen.SettingsScreen]: undefined;
  [AppNavigatorScreen.RunningWorkoutScreen]: undefined;
  [AppNavigatorScreen.SavedWorkoutsScreen]: undefined;
};
