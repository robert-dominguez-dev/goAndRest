import { composeLastWorkoutButtonLabel } from './composeLastWorkoutButtonLabel.ts';
import { TranslateFN } from '../../../../../../../../locales/hooks/useAppTranslation.ts';

const t = ((key: string) => key) as unknown as TranslateFN;

describe('composeLastWorkoutButtonLabel', () => {
  it('appends the workout name to the prefix when defined', () => {
    expect(composeLastWorkoutButtonLabel('Leg day', t)).toBe(
      'screens.landingScreen.lastRunningWorkoutButtonLabel: Leg day',
    );
  });

  it('returns just the prefix when workoutName is undefined', () => {
    expect(composeLastWorkoutButtonLabel(undefined, t)).toBe(
      'screens.landingScreen.lastRunningWorkoutButtonLabel',
    );
  });
});
