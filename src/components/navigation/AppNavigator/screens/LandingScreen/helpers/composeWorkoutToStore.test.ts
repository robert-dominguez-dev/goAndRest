import { composeWorkoutToStore } from './composeWorkoutToStore';
import {
  AppStoredWorkout,
  AppWorkout,
} from '../../../../../../contexts/AppWorkoutsProvider/types';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

type TestCase = {
  description: string;
  input: {
    runningWorkout: AppWorkout;
    selectedStoredWorkout: AppStoredWorkout | null;
  };
  expected: (result: AppStoredWorkout) => void;
};

const fixedDate = new Date('2024-01-01T00:00:00.000Z');

describe('composeWorkoutToStore function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(fixedDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const baseConfig = {
    work: 20,
    rest: 5,
    series: 3,
    rounds: 3,
    brake: 15,
  };

  const runningWorkout: AppWorkout = {
    name: 'Workout Name',
    ...baseConfig,
  };

  const storedWorkout: AppStoredWorkout = {
    id: 'existing-id',
    meta: {
      name: 'Old Name',
      description: 'desc',
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
    },
    config: {
      work: 1,
      rest: 1,
      series: 1,
      rounds: 1,
      brake: 1,
    },
  };

  const testCases: TestCase[] = [
    {
      description: 'creates new workout when selectedStoredWorkout is null',
      input: {
        runningWorkout,
        selectedStoredWorkout: null,
      },
      expected: result => {
        expect(uuidv4).toHaveBeenCalledTimes(1);
        expect(result.id).toBe('mocked-uuid');
        expect(result.meta.name).toBe('Workout Name');
        expect(result.meta.createdAt).toEqual(fixedDate);
        expect(result.config).toEqual(baseConfig);
      },
    },
    {
      description: 'updates existing workout when selectedStoredWorkout exists',
      input: {
        runningWorkout,
        selectedStoredWorkout: storedWorkout,
      },
      expected: result => {
        expect(uuidv4).not.toHaveBeenCalled();
        expect(result.id).toBe('existing-id');
        expect(result.meta.name).toBe('Workout Name');
        expect(result.meta.createdAt).toEqual(storedWorkout.meta.createdAt);
        expect(result.meta.updatedAt).toEqual(fixedDate);
        expect(result.config).toEqual(baseConfig);
      },
    },
  ];

  it.each(testCases)('$description', ({ input, expected }) => {
    (uuidv4 as jest.Mock).mockReturnValue('mocked-uuid');

    const result = composeWorkoutToStore(
      input.runningWorkout,
      input.selectedStoredWorkout,
    );

    expected(result);
  });
});
