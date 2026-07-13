import { findStoredWorkoutByName } from './findStoredWorkoutByName.ts';
import { AppStoredWorkout } from '../types.ts';

const baseDate = new Date('2024-01-01T00:00:00.000Z');

const workoutA: AppStoredWorkout = {
  id: 'a',
  meta: {
    name: 'Workout A',
    createdAt: baseDate,
  },
  config: {
    work: 20,
    rest: 5,
    series: 3,
    rounds: 3,
    recovery: 15,
  },
};

const workoutB: AppStoredWorkout = {
  id: 'b',
  meta: {
    name: 'Workout B',
    createdAt: baseDate,
  },
  config: {
    work: 30,
    rest: 10,
    series: 4,
    rounds: 4,
    recovery: 10,
  },
};

const storedWorkouts: AppStoredWorkout[] = [workoutA, workoutB];

describe('findStoredWorkoutByName', () => {
  it('returns the workout with a matching name', () => {
    expect(findStoredWorkoutByName(storedWorkouts, 'Workout B')).toBe(workoutB);
  });

  it('matches when the input name has surrounding whitespace', () => {
    expect(findStoredWorkoutByName(storedWorkouts, '  Workout A  ')).toBe(
      workoutA,
    );
  });

  it('matches when the stored name has surrounding whitespace', () => {
    const workoutWithSpaces: AppStoredWorkout = {
      ...workoutA,
      meta: { ...workoutA.meta, name: '  Workout A  ' },
    };

    expect(findStoredWorkoutByName([workoutWithSpaces], 'Workout A')).toBe(
      workoutWithSpaces,
    );
  });

  it('returns undefined when there is no match', () => {
    expect(
      findStoredWorkoutByName(storedWorkouts, 'Nonexistent Workout'),
    ).toBeUndefined();
  });

  it('is case-sensitive', () => {
    expect(
      findStoredWorkoutByName(storedWorkouts, 'workout a'),
    ).toBeUndefined();
  });

  it('returns undefined for an empty string', () => {
    expect(findStoredWorkoutByName(storedWorkouts, '')).toBeUndefined();
  });

  it('returns undefined for a whitespace-only string', () => {
    expect(findStoredWorkoutByName(storedWorkouts, '   ')).toBeUndefined();
  });
});
