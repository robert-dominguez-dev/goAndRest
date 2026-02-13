import { AppStoredWorkout } from '../types.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GO_AND_REST_WORKOUTS_STORAGE_KEY = 'GO_AND_REST_WORKOUTS';

export const updateAppWorkoutsInStorage = (workouts: AppStoredWorkout[]) =>
  AsyncStorage.setItem(
    GO_AND_REST_WORKOUTS_STORAGE_KEY,
    JSON.stringify(workouts),
  );
