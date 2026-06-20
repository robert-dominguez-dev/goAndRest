import {
  checkIsCharacterActive,
  getCharacterActivationDaysRemaining,
  PREMIUM_CHARACTER_ACTIVATION_DURATION_MS,
} from './checkIsCharacterActive.ts';
import { WorkoutCharacterVariant } from '../../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { PremiumCharacterActivations } from '../types.ts';

const now = new Date('2026-06-20T00:00:00.000Z').getTime();

describe('checkIsCharacterActive', () => {
  type TestCase = {
    description: string;
    activations: PremiumCharacterActivations;
    expectedOutput: boolean;
  };

  const testCases: TestCase[] = [
    {
      description: 'returns false when character was never activated',
      activations: {},
      expectedOutput: false,
    },
    {
      description: 'returns true when activated less than 7 days ago',
      activations: { [WorkoutCharacterVariant.wizard]: now - 1000 },
      expectedOutput: true,
    },
    {
      description: 'returns false when activation expired exactly 7 days ago',
      activations: {
        [WorkoutCharacterVariant.wizard]:
          now - PREMIUM_CHARACTER_ACTIVATION_DURATION_MS,
      },
      expectedOutput: false,
    },
    {
      description: 'returns false when activated more than 7 days ago',
      activations: {
        [WorkoutCharacterVariant.wizard]:
          now - PREMIUM_CHARACTER_ACTIVATION_DURATION_MS - 1000,
      },
      expectedOutput: false,
    },
  ];

  it.each(testCases)('$description', ({ activations, expectedOutput }) => {
    expect(
      checkIsCharacterActive(activations, WorkoutCharacterVariant.wizard, now),
    ).toBe(expectedOutput);
  });
});

describe('getCharacterActivationDaysRemaining', () => {
  type TestCase = {
    description: string;
    activations: PremiumCharacterActivations;
    expectedOutput: number | null;
  };

  const testCases: TestCase[] = [
    {
      description: 'returns null when character was never activated',
      activations: {},
      expectedOutput: null,
    },
    {
      description: 'returns null when activation has expired',
      activations: {
        [WorkoutCharacterVariant.wizard]:
          now - PREMIUM_CHARACTER_ACTIVATION_DURATION_MS,
      },
      expectedOutput: null,
    },
    {
      description: 'returns remaining days when activation is still valid',
      activations: {
        [WorkoutCharacterVariant.wizard]: now - 2 * 24 * 60 * 60 * 1000,
      },
      expectedOutput: 5,
    },
  ];

  it.each(testCases)('$description', ({ activations, expectedOutput }) => {
    expect(
      getCharacterActivationDaysRemaining(
        activations,
        WorkoutCharacterVariant.wizard,
        now,
      ),
    ).toBe(expectedOutput);
  });
});
