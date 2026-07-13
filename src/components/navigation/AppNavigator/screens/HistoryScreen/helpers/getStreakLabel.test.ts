import { getStreakLabel } from './getStreakLabel.ts';
import { TranslateFN } from '../../../../../../locales/hooks/useAppTranslation.ts';

const t = ((key: string) => key) as unknown as TranslateFN;

describe('getStreakLabel', () => {
  it('returns the streakNone key when streak is 0', () => {
    expect(getStreakLabel(0, t)).toBe('screens.historyScreen.streakNone');
  });

  it('returns the streakNone key when streak is negative', () => {
    expect(getStreakLabel(-5, t)).toBe('screens.historyScreen.streakNone');
  });

  it('returns the "one" plural form key for a streak of 1', () => {
    expect(getStreakLabel(1, t)).toBe('screens.historyScreen.streakDays.one');
  });

  it('returns the "few" plural form key for a streak of 3', () => {
    expect(getStreakLabel(3, t)).toBe('screens.historyScreen.streakDays.few');
  });

  it('returns the "many" plural form key for a streak of 10', () => {
    expect(getStreakLabel(10, t)).toBe(
      'screens.historyScreen.streakDays.many',
    );
  });
});
