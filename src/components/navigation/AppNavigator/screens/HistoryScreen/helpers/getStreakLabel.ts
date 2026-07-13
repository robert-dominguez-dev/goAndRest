import { TranslateFN } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { getCountPluralForm } from '../../../../../../locales/helpers/getCountPluralForm.ts';

const STREAK_DAYS_TRANSLATE_KEY_PREFIX = 'screens.historyScreen.streakDays';

export const getStreakLabel = (streak: number, t: TranslateFN): string => {
  if (streak <= 0) {
    return t('screens.historyScreen.streakNone');
  }

  return t(
    getSplitTranslateKey(
      STREAK_DAYS_TRANSLATE_KEY_PREFIX,
      getCountPluralForm(streak),
    ),
  );
};
