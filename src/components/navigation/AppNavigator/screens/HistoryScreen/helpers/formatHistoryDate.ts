import { format, Locale } from 'date-fns';
import { cs, enUS, sk } from 'date-fns/locale';
import { SupportedLanguageCode } from '../../../../../../contexts/AppLanguageProvider/constants.ts';

const dateFnsLocaleByAppLanguage: Record<SupportedLanguageCode, Locale> = {
  [SupportedLanguageCode.cs]: cs,
  [SupportedLanguageCode.sk]: sk,
  [SupportedLanguageCode.en]: enUS,
};

export const formatHistoryListDate = (
  date: number,
  language: SupportedLanguageCode,
): string =>
  format(new Date(date), 'd. MMMM', {
    locale: dateFnsLocaleByAppLanguage[language],
  });

export const formatHistoryDetailDate = (
  date: number,
  language: SupportedLanguageCode,
): string =>
  format(new Date(date), 'd. MMMM yyyy', {
    locale: dateFnsLocaleByAppLanguage[language],
  });

export const formatHistoryAxisDate = (
  date: number,
  language: SupportedLanguageCode,
): string =>
  format(new Date(date), 'd.M.', {
    locale: dateFnsLocaleByAppLanguage[language],
  });
