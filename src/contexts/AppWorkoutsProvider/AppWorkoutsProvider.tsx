import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenProp } from '../../types/common.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { safeParseAppWorkouts } from './helpers/safeParseAppWorkouts.ts';
import { AppWorkout } from './types.ts';
import {
  GO_AND_REST_WORKOUTS_STORAGE_KEY,
  updateAppWorkoutsInStorage,
} from './helpers/updateAppWorkoutsInStorage.ts';

type AppWorkoutsContextProps = {
  workouts: AppWorkout[];
  addWorkout: (workout: AppWorkout) => void;
  removeWorkout: (workoutId: string) => void;
  selectedWorkout: AppWorkout | null;
  setSelectedWorkout: (workout: AppWorkout | null) => void;
  isRunning: boolean;
  startWorkout: () => void;
  stopWorkout: () => void;
};

const AppWorkoutsContext = createContext<AppWorkoutsContextProps | undefined>(
  undefined,
);

export const AppWorkoutsProvider = ({ children }: ChildrenProp) => {
  const [workouts, setWorkouts] = useState<AppWorkout[]>([]);

  const [selectedWorkout, setSelectedWorkout] = useState<AppWorkout | null>(
    null,
  );

  const [isRunning, setIsRunning] = useState<boolean>(false);

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

  const removeWorkout = (workoutId: string) => {
    setWorkouts(prevWorkouts => {
      const filteredWorkouts: AppWorkout[] = prevWorkouts.filter(
        workout => workout.id !== workoutId,
      );
      void updateAppWorkoutsInStorage(filteredWorkouts);
      return filteredWorkouts;
    });

    setSelectedWorkout(prev => {
      if (prev?.id === workoutId) {
        return null;
      }
      return prev;
    });
  };

  const startWorkout = () => setIsRunning(true);

  const stopWorkout = () => setIsRunning(false);

  return (
    <AppWorkoutsContext.Provider
      value={{
        workouts,
        addWorkout,
        removeWorkout,
        selectedWorkout,
        setSelectedWorkout,
        isRunning,
        startWorkout,
        stopWorkout,
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
