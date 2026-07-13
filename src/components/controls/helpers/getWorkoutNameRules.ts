import { RegisterOptions } from 'react-hook-form';
import { TranslateFN } from '../../../locales/hooks/useAppTranslation.ts';

const MIN_LENGTH = 3;
const MAX_LENGTH = 20;

export const getWorkoutNameRules = (t: TranslateFN) =>
  ({
    required: t('screens.landingScreen.rules.required'),
    minLength: {
      value: MIN_LENGTH,
      message: t('screens.landingScreen.rules.minLength', {
        value: String(MIN_LENGTH),
      }),
    },
    maxLength: {
      value: MAX_LENGTH,
      message: t('screens.landingScreen.rules.maxLength', {
        value: String(MAX_LENGTH),
      }),
    },
    validate: (value: string | number | undefined) =>
      String(value ?? '').trim().length >= MIN_LENGTH ||
      t('screens.landingScreen.rules.minLength', {
        value: String(MIN_LENGTH),
      }),
  } satisfies RegisterOptions);
