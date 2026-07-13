import { getSameConfigStoredWorkouts } from './getSameConfigStoredWorkouts.ts';
import { AppStoredWorkout, AppWorkoutConfig } from '../types.ts';

const baseDate = new Date('2024-01-01T00:00:00.000Z');

const baseConfig: AppWorkoutConfig = {
  work: 20,
  rest: 10,
  series: 3,
  rounds: 2,
  recovery: 15,
};

const differentConfig: AppWorkoutConfig = {
  work: 30,
  rest: 10,
  series: 3,
  rounds: 2,
  recovery: 15,
};

const workoutA: AppStoredWorkout = {
  id: 'a',
  meta: { name: 'Workout A', createdAt: baseDate },
  config: baseConfig,
};

const workoutB: AppStoredWorkout = {
  id: 'b',
  meta: { name: 'Workout B', createdAt: baseDate },
  config: baseConfig,
};

const workoutC: AppStoredWorkout = {
  id: 'c',
  meta: { name: 'Workout C', createdAt: baseDate },
  config: differentConfig,
};

describe('getSameConfigStoredWorkouts', () => {
  it('returns an empty array when there is no match', () => {
    expect(getSameConfigStoredWorkouts([workoutC], baseConfig)).toEqual([]);
  });

  it('returns the single matching workout', () => {
    expect(
      getSameConfigStoredWorkouts([workoutA, workoutC], baseConfig),
    ).toEqual([workoutA]);
  });

  it('returns all matching workouts with different names but the same config', () => {
    expect(
      getSameConfigStoredWorkouts([workoutA, workoutB, workoutC], baseConfig),
    ).toEqual([workoutA, workoutB]);
  });

  it('excludes workouts with a different config', () => {
    const result = getSameConfigStoredWorkouts(
      [workoutA, workoutB, workoutC],
      baseConfig,
    );

    expect(result).not.toContain(workoutC);
  });
});
