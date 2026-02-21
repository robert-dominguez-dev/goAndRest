import { getUpdatedWorkouts } from './getUpdatedWorkouts.ts';
import { AppStoredWorkout } from '../types.ts';

type TestCase = {
  description: string;
  input: {
    prevWorkouts: AppStoredWorkout[];
    workout: AppStoredWorkout;
  };
  expectedOutput: AppStoredWorkout[];
};

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

const updatedWorkoutA: AppStoredWorkout = {
  id: 'a',
  meta: {
    name: 'Workout A Updated',
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  config: {
    work: 25,
    rest: 5,
    series: 5,
    rounds: 5,
    recovery: 20,
  },
};

const testCases: TestCase[] = [
  {
    description: 'adds workout to beginning when id does not exist',
    input: {
      prevWorkouts: [workoutA],
      workout: workoutB,
    },
    expectedOutput: [workoutB, workoutA],
  },
  {
    description: 'replaces workout when id exists at index 0',
    input: {
      prevWorkouts: [workoutA, workoutB],
      workout: updatedWorkoutA,
    },
    expectedOutput: [updatedWorkoutA, workoutB],
  },
  {
    description: 'replaces workout when id exists at later index',
    input: {
      prevWorkouts: [workoutB, workoutA],
      workout: updatedWorkoutA,
    },
    expectedOutput: [workoutB, updatedWorkoutA],
  },
  {
    description: 'adds workout to empty array',
    input: {
      prevWorkouts: [],
      workout: workoutA,
    },
    expectedOutput: [workoutA],
  },
];

describe('getUpdatedWorkouts function', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    expect(getUpdatedWorkouts(input.prevWorkouts, input.workout)).toEqual(
      expectedOutput,
    );
  });
});
