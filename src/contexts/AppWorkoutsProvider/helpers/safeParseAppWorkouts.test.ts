import { safeParseAppWorkouts } from './safeParseAppWorkouts';
import { AppWorkout, AppWorkoutBlockType } from '../types';

type TestCase = {
  description: string;
  input: string | null;
  expectedOutput: AppWorkout[];
};

const validWorkout: AppWorkout = {
  id: 'workout-1',
  name: 'Workout 1',
  blocks: [{ type: AppWorkoutBlockType.WORK, name: 'Work', rounds: 1 }],
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-02T00:00:00.000Z'),
};

const testCases: TestCase[] = [
  { description: 'null returns []', input: null, expectedOutput: [] },
  { description: 'empty string returns []', input: '', expectedOutput: [] },
  {
    description: 'non-array JSON returns []',
    input: JSON.stringify({ id: 'x' }),
    expectedOutput: [],
  },
  {
    description: 'filters out items missing id',
    input: JSON.stringify([
      {
        name: 'Missing id',
        blocks: [{ type: AppWorkoutBlockType.WORK, name: 'Work', rounds: 1 }],
      },
      validWorkout,
    ]),
    expectedOutput: [validWorkout],
  },
  {
    description: 'filters out items with empty blocks',
    input: JSON.stringify([
      { id: 'no-blocks', name: 'No blocks', blocks: [] },
      validWorkout,
    ]),
    expectedOutput: [validWorkout],
  },
  {
    description: 'filters out items where blocks is not an array',
    input: JSON.stringify([
      { id: 'bad', name: 'Bad', blocks: {} },
      validWorkout,
    ]),
    expectedOutput: [validWorkout],
  },
  {
    description: 'keeps all items that have id and non-empty blocks',
    input: JSON.stringify([
      validWorkout,
      {
        id: 'workout-2',
        name: 'Workout 2',
        blocks: [{ type: AppWorkoutBlockType.REST, name: 'Rest', rounds: 1 }],
        createdAt: new Date('2026-01-03T00:00:00.000Z'),
        updatedAt: new Date('2026-01-04T00:00:00.000Z'),
      },
    ]),
    expectedOutput: [
      validWorkout,
      {
        id: 'workout-2',
        name: 'Workout 2',
        blocks: [{ type: AppWorkoutBlockType.REST, name: 'Rest', rounds: 1 }],
        createdAt: new Date('2026-01-03T00:00:00.000Z'),
        updatedAt: new Date('2026-01-04T00:00:00.000Z'),
      },
    ],
  },
];

describe('safeParseAppWorkouts', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    const result = safeParseAppWorkouts(input);
    expect(result).toEqual(expectedOutput);
  });
});
