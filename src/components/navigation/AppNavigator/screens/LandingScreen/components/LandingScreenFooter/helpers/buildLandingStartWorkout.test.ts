import { buildLandingStartWorkout } from './buildLandingStartWorkout.ts';
import {
  AppWorkoutFieldValues,
  HeldWorkoutIdentity,
} from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';

const values: AppWorkoutFieldValues = {
  work: 20,
  rest: 10,
  series: 3,
  rounds: 2,
  recovery: 15,
  workoutName: '',
  savedWorkoutId: undefined,
};

const heldWorkoutIdentity: HeldWorkoutIdentity = {
  savedWorkoutId: 'held-id',
  name: 'Ranní',
};

describe('buildLandingStartWorkout', () => {
  it('adds savedWorkoutId and workoutName from the held workout identity', () => {
    expect(buildLandingStartWorkout(values, heldWorkoutIdentity)).toEqual({
      ...values,
      savedWorkoutId: 'held-id',
      workoutName: 'Ranní',
    });
  });

  it('clears savedWorkoutId and workoutName when there is no held workout', () => {
    expect(buildLandingStartWorkout(values, null)).toEqual({
      ...values,
      savedWorkoutId: undefined,
      workoutName: '',
    });
  });

  it('keeps the config values from values unchanged', () => {
    const result = buildLandingStartWorkout(values, heldWorkoutIdentity);

    expect(result.work).toBe(values.work);
    expect(result.rest).toBe(values.rest);
    expect(result.series).toBe(values.series);
    expect(result.rounds).toBe(values.rounds);
    expect(result.recovery).toBe(values.recovery);
  });
});
