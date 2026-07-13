import { checkIsDefaultWorkoutConfig } from './checkIsDefaultWorkoutConfig.ts';
import { defaultWorkoutConfig } from '../contexts/AppWorkoutsProvider/constants.ts';
import { AppWorkoutConfig } from '../contexts/AppWorkoutsProvider/types.ts';

describe('checkIsDefaultWorkoutConfig', () => {
  it('returns false for undefined', () => {
    expect(checkIsDefaultWorkoutConfig(undefined)).toBe(false);
  });

  it('returns true for the exact default workout config', () => {
    expect(checkIsDefaultWorkoutConfig(defaultWorkoutConfig)).toBe(true);
  });

  it('returns true for a copy of the default workout config', () => {
    expect(checkIsDefaultWorkoutConfig({ ...defaultWorkoutConfig })).toBe(
      true,
    );
  });

  type TestCase = {
    description: string;
    overrides: Partial<AppWorkoutConfig>;
  };

  const testCases: TestCase[] = [
    { description: 'differing work', overrides: { work: 1 } },
    { description: 'differing rest', overrides: { rest: 1 } },
    { description: 'differing recovery', overrides: { recovery: 1 } },
    { description: 'differing series', overrides: { series: 1 } },
    { description: 'differing rounds', overrides: { rounds: 1 } },
  ];

  it.each(testCases)(
    'returns false for $description',
    ({ overrides }) => {
      const changedConfig = { ...defaultWorkoutConfig, ...overrides };

      expect(checkIsDefaultWorkoutConfig(changedConfig)).toBe(false);
    },
  );
});
