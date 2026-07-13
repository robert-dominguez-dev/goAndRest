import { checkIsHeldWorkoutConfig } from './checkIsHeldWorkoutConfig.ts';
import { AppStoredWorkout, AppWorkoutConfig } from '../types.ts';

const config: AppWorkoutConfig = {
  work: 30,
  rest: 15,
  series: 3,
  rounds: 4,
  recovery: 60,
};

const heldWorkout: AppStoredWorkout = {
  id: 'held-1',
  meta: { name: 'Ranní HIIT', createdAt: new Date(0) },
  config,
};

const heldIdentity = { savedWorkoutId: 'held-1', name: 'Ranní HIIT' };

describe('checkIsHeldWorkoutConfig', () => {
  it('returns false when nothing is held', () => {
    expect(checkIsHeldWorkoutConfig(null, config, [heldWorkout])).toBe(false);
  });

  it('returns false when the held workout is no longer stored', () => {
    expect(checkIsHeldWorkoutConfig(heldIdentity, config, [])).toBe(false);
  });

  it('keeps the hold when the config signature is unchanged', () => {
    expect(checkIsHeldWorkoutConfig(heldIdentity, { ...config }, [heldWorkout])).toBe(
      true,
    );
  });

  it('drops the hold when a config value differs', () => {
    expect(
      checkIsHeldWorkoutConfig(
        heldIdentity,
        { ...config, work: 45 },
        [heldWorkout],
      ),
    ).toBe(false);
  });
});
