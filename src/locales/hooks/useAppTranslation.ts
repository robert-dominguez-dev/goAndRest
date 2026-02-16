import { useTranslation } from 'react-i18next';
import { TranslateKey, TranslationOptions } from '../types.ts';

export type TranslateFN = ReturnType<typeof useAppTranslation>;

export const useAppTranslation = () => {
  const { t } = useTranslation();
  return (key: TranslateKey, options?: TranslationOptions) => t(key, options);
};
