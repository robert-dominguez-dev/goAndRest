import { TranslateFN } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { getCountPluralForm } from '../../../../../../locales/helpers/getCountPluralForm.ts';

const ROUNDS_TRANSLATE_KEY_PREFIX = 'screens.historyScreen.rounds';

export const getRoundsLabel = (rounds: number, t: TranslateFN): string =>
  t(
    getSplitTranslateKey(
      ROUNDS_TRANSLATE_KEY_PREFIX,
      getCountPluralForm(rounds),
    ),
    { count: rounds, value: String(rounds) },
  );
