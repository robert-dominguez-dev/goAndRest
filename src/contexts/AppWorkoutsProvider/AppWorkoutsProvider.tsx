import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenProp } from '../../types/common.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { safeParseAppWorkouts } from './helpers/safeParseAppWorkouts.ts';
import { AppWorkout } from './types.ts';
import {
  GO_AND_REST_WORKOUTS_STORAGE_KEY,
  updateAppWorkoutsInStorage,
} from './helpers/updateAppWorkoutsInStorage.ts';
import { defaultWorkoutConfig } from './constants.ts';

type AppWorkoutsContextProps = {
  selectedWorkout: AppWorkout;
  setSelectedWorkout: (workout: AppWorkout) => void;
  workouts: AppWorkout[];
  addWorkout: (workout: AppWorkout) => void;
  removeWorkout: (workoutId: string) => void;
};

const AppWorkoutsContext = createContext<AppWorkoutsContextProps | undefined>(
  undefined,
);

export const AppWorkoutsProvider = ({ children }: ChildrenProp) => {
  const [workouts, setWorkouts] = useState<AppWorkout[]>([]);

  const [selectedWorkout, setSelectedWorkout] =
    useState<AppWorkout>(defaultWorkoutConfig);

  useEffect(() => {
    AsyncStorage.getItem(GO_AND_REST_WORKOUTS_STORAGE_KEY).then(
      storedWorkouts => setWorkouts(safeParseAppWorkouts(storedWorkouts)),
    );
  }, []);

  const addWorkout = (workout: AppWorkout) =>
    setWorkouts(prevWorkouts => {
      const currentWorkouts: AppWorkout[] = [workout, ...prevWorkouts];
      void updateAppWorkoutsInStorage(currentWorkouts);
      return currentWorkouts;
    });

  const removeWorkout = (workoutId: string) =>
    setWorkouts(prevWorkouts => {
      const filteredWorkouts: AppWorkout[] = prevWorkouts.filter(
        workout => workout.id !== workoutId,
      );
      void updateAppWorkoutsInStorage(filteredWorkouts);
      return filteredWorkouts;
    });

  return (
    <AppWorkoutsContext.Provider
      value={{
        selectedWorkout,
        setSelectedWorkout,
        workouts,
        addWorkout,
        removeWorkout,
      }}>
      {children}
    </AppWorkoutsContext.Provider>
  );
};

export const useAppWorkouts = () => {
  const context = useContext(AppWorkoutsContext);
  if (!context) {
    throw new Error(
      `${useAppWorkouts.name} must be used within a ${AppWorkoutsProvider.name}`,
    );
  }
  return context;
};
