import { AppTranslations } from './types.ts';

import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

import { en } from './en.ts';
import { cs } from './cs.ts';
import { sk } from './sk.ts';

import { getDeviceLanguageCode } from './helpers/getDeviceLanguageCode.ts';
import { SupportedLanguageCode } from '../contexts/AppLanguageProvider/types.ts';

const resources: Record<
  SupportedLanguageCode,
  { translation: AppTranslations }
> = {
  [SupportedLanguageCode.cs]: { translation: cs },
  [SupportedLanguageCode.sk]: { translation: sk },
  [SupportedLanguageCode.en]: { translation: en },
};

export const appLanguageCode = getDeviceLanguageCode();

i18next.use(initReactI18next).init({
  resources,
  lng: appLanguageCode,
  interpolation: {
    /**
     * React does escape itself.
     */
    escapeValue: false,
  },
});

export const appI18NextConfig = i18next;
