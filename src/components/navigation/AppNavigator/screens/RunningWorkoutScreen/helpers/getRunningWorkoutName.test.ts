import { getRunningWorkoutName } from './getRunningWorkoutName.ts';
import {
  DEFAULT_WORKOUT_NAME,
  defaultWorkoutConfig,
} from '../../../../../../contexts/AppWorkoutsProvider/constants.ts';
import { TranslateFN } from '../../../../../../locales/hooks/useAppTranslation.ts';

const t = ((key: string) => key) as unknown as TranslateFN;

describe('getRunningWorkoutName', () => {
  it('returns the workoutName when it is defined', () => {
    expect(
      getRunningWorkoutName({
        workoutName: 'My workout',
        workoutConfig: defaultWorkoutConfig,
        t,
      }),
    ).toBe('My workout');
  });

  it('returns DEFAULT_WORKOUT_NAME when workoutName is empty and config is the default one', () => {
    expect(
      getRunningWorkoutName({
        workoutName: '',
        workoutConfig: defaultWorkoutConfig,
        t,
      }),
    ).toBe(DEFAULT_WORKOUT_NAME);
  });

  it('returns the translated title when workoutName is empty and config is not the default one', () => {
    expect(
      getRunningWorkoutName({
        workoutName: '',
        workoutConfig: { ...defaultWorkoutConfig, work: 1 },
        t,
      }),
    ).toBe('screens.runningWorkoutScreen.title');
  });

  it('returns the translated title when workoutName is empty and config is undefined', () => {
    expect(
      getRunningWorkoutName({
        workoutName: undefined,
        workoutConfig: undefined,
        t,
      }),
    ).toBe('screens.runningWorkoutScreen.title');
  });
});
