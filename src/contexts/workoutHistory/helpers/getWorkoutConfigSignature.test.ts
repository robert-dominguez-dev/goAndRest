import { getWorkoutConfigSignature } from './getWorkoutConfigSignature.ts';
import type { AppWorkoutConfig } from '../../AppWorkoutsProvider/types.ts';

const baseConfig: AppWorkoutConfig = {
  work: 20,
  rest: 10,
  series: 3,
  rounds: 2,
  recovery: 15,
};

describe('getWorkoutConfigSignature', () => {
  it('returns the expected string format for a known config', () => {
    expect(getWorkoutConfigSignature(baseConfig)).toBe('20-10-15-3-2');
  });

  it('produces identical signatures for identical configs', () => {
    expect(getWorkoutConfigSignature(baseConfig)).toBe(
      getWorkoutConfigSignature({ ...baseConfig }),
    );
  });

  type TestCase = {
    description: string;
    overrides: Partial<AppWorkoutConfig>;
  };

  const testCases: TestCase[] = [
    { description: 'differing work', overrides: { work: 30 } },
    { description: 'differing rest', overrides: { rest: 20 } },
    { description: 'differing recovery', overrides: { recovery: 25 } },
    { description: 'differing series', overrides: { series: 4 } },
    { description: 'differing rounds', overrides: { rounds: 3 } },
  ];

  it.each(testCases)(
    'produces a different signature for $description',
    ({ overrides }) => {
      const changedConfig = { ...baseConfig, ...overrides };

      expect(getWorkoutConfigSignature(changedConfig)).not.toBe(
        getWorkoutConfigSignature(baseConfig),
      );
    },
  );
});
