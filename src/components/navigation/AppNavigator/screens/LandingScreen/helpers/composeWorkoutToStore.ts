import {
  AppStoredWorkout,
  AppWorkout,
} from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { v4 as uuidv4 } from 'uuid';

export const composeWorkoutToStore = (
  { name, ...workoutConfig }: AppWorkout,
  selectedStoredWorkout: AppStoredWorkout | null,
): AppStoredWorkout =>
  selectedStoredWorkout
    ? {
        ...selectedStoredWorkout,
        meta: {
          ...selectedStoredWorkout.meta,
          updatedAt: new Date(),
        },
        config: workoutConfig,
      }
    : {
        id: uuidv4(),
        meta: {
          name,
          createdAt: new Date(),
        },
        config: workoutConfig,
      };
