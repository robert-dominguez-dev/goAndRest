import { TranslateFN } from '../../../locales/hooks/useAppTranslation.ts';
import { getSplitTranslateKey } from '../../../locales/helpers/getSplitTranslateKey.ts';

const DAYS_REMAINING_TRANSLATE_KEY_PREFIX =
  'screens.settingsScreen.feedbackSection.items.characterVariant.premiumBottomSheet.daysRemaining';

export const getDaysRemainingLabel = (
  daysRemaining: number | null,
  t: TranslateFN,
): string | undefined => {
  if (daysRemaining === null) {
    return undefined;
  }

  if (daysRemaining === 0) {
    return t(
      getSplitTranslateKey(DAYS_REMAINING_TRANSLATE_KEY_PREFIX, 'lessThanOne'),
    );
  }

  if (daysRemaining === 1) {
    return t(getSplitTranslateKey(DAYS_REMAINING_TRANSLATE_KEY_PREFIX, 'one'), {
      value: String(daysRemaining),
    });
  }

  if (daysRemaining >= 2 && daysRemaining <= 4) {
    return t(getSplitTranslateKey(DAYS_REMAINING_TRANSLATE_KEY_PREFIX, 'few'), {
      value: String(daysRemaining),
    });
  }

  return t(getSplitTranslateKey(DAYS_REMAINING_TRANSLATE_KEY_PREFIX, 'many'), {
    value: String(daysRemaining),
  });
};
