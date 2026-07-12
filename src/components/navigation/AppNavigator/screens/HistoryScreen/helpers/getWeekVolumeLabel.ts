import { TranslateFN } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { getCountPluralForm } from '../../../../../../locales/helpers/getCountPluralForm.ts';

const WEEK_VOLUME_TRANSLATE_KEY_PREFIX = 'screens.historyScreen.weekVolume';

export const getWeekVolumeLabel = (
  min: number,
  count: number,
  t: TranslateFN,
): string =>
  t(
    getSplitTranslateKey(
      WEEK_VOLUME_TRANSLATE_KEY_PREFIX,
      getCountPluralForm(count),
    ),
    { min, count, value: String(count) },
  );
