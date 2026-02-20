import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenProp } from '../../types/common.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { safeParseAppWorkouts } from './helpers/safeParseAppWorkouts.ts';
import { AppStoredWorkout } from './types.ts';
import {
  GO_AND_REST_WORKOUTS_STORAGE_KEY,
  updateAppWorkoutsInStorage,
} from './helpers/updateAppWorkoutsInStorage.ts';
import { getUpdatedWorkouts } from './helpers/getUpdatedWorkouts.ts';

type AppWorkoutsContextProps = {
  storeWorkout: (workout: AppStoredWorkout) => void;
  removeWorkout: (workoutId: string) => void;
  storedWorkouts: AppStoredWorkout[];
};

const AppWorkoutsContext = createContext<AppWorkoutsContextProps | undefined>(
  undefined,
);

export const AppWorkoutsProvider = ({ children }: ChildrenProp) => {
  const [storedWorkouts, setStoredWorkouts] = useState<AppStoredWorkout[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(GO_AND_REST_WORKOUTS_STORAGE_KEY).then(
      storedWorkouts => {
        const storedWorkoutsParsed = safeParseAppWorkouts(storedWorkouts);
        setStoredWorkouts(storedWorkoutsParsed);
      },
    );
  }, []);

  const storeWorkout = (workout: AppStoredWorkout) => {
    setStoredWorkouts(prevWorkouts => {
      const updatedWorkouts = getUpdatedWorkouts(prevWorkouts, workout);
      void updateAppWorkoutsInStorage(updatedWorkouts);
      return updatedWorkouts;
    });
  };

  const removeWorkout = (workoutId: string) => {
    setStoredWorkouts(prevWorkouts => {
      const filteredWorkouts: AppStoredWorkout[] = prevWorkouts.filter(
        workout => workout.id !== workoutId,
      );
      void updateAppWorkoutsInStorage(filteredWorkouts);
      return filteredWorkouts;
    });
  };

  return (
    <AppWorkoutsContext.Provider
      value={{
        storedWorkouts,
        storeWorkout,
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
