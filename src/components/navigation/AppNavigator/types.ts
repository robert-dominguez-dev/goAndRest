export enum AppNavigatorScreen {
  LandingScreen = 'LandingScreen',
  RunningWorkoutScreen = 'RunningWorkoutScreen',
  WorkoutCreationScreen = 'WorkoutCreationScreen',
}

export type AppNavigatorScreenParams = {
  [AppNavigatorScreen.LandingScreen]: undefined;
  [AppNavigatorScreen.RunningWorkoutScreen]: undefined;
  [AppNavigatorScreen.WorkoutCreationScreen]: undefined;
};
