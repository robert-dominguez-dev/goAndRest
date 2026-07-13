import { getSameConfigHintNames } from './getSameConfigHintNames.ts';
import { AppStoredWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';

const baseDate = new Date('2024-01-01T00:00:00.000Z');

const config = {
  work: 20,
  rest: 10,
  series: 3,
  rounds: 2,
  recovery: 15,
};

const createWorkout = (id: string, name: string): AppStoredWorkout => ({
  id,
  meta: { name, createdAt: baseDate },
  config,
});

describe('getSameConfigHintNames', () => {
  it('returns no names and hasMore false when there are no workouts', () => {
    expect(getSameConfigHintNames([])).toEqual({ names: [], hasMore: false });
  });

  it('returns a single name and hasMore false for one workout', () => {
    const workouts = [createWorkout('a', 'Ranní')];

    expect(getSameConfigHintNames(workouts)).toEqual({
      names: ['Ranní'],
      hasMore: false,
    });
  });

  it('returns all names and hasMore false for exactly three workouts', () => {
    const workouts = [
      createWorkout('a', 'Ranní'),
      createWorkout('b', 'Večerní'),
      createWorkout('c', 'Kruhový'),
    ];

    expect(getSameConfigHintNames(workouts)).toEqual({
      names: ['Ranní', 'Večerní', 'Kruhový'],
      hasMore: false,
    });
  });

  it('returns the first three names and hasMore true for four or more workouts', () => {
    const workouts = [
      createWorkout('a', 'Ranní'),
      createWorkout('b', 'Večerní'),
      createWorkout('c', 'Kruhový'),
      createWorkout('d', 'HIIT'),
    ];

    expect(getSameConfigHintNames(workouts)).toEqual({
      names: ['Ranní', 'Večerní', 'Kruhový'],
      hasMore: true,
    });
  });
});
