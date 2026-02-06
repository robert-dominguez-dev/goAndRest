import { useTranslation } from 'react-i18next';
import { TranslateKey, TranslationOptions } from '../types.ts';

export const useAppTranslation = () => {
  const { t } = useTranslation();
  return (key: TranslateKey, options?: TranslationOptions) => t(key, options);
};
