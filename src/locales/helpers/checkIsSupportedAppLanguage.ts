import { SupportedLanguageCode } from '../../contexts/AppLanguageProvider/constants.ts';

const supportedLanguageCodes = new Set<string>(
  Object.values(SupportedLanguageCode),
);

export const checkIsSupportedAppLanguage = (
  languageCode: string,
): languageCode is SupportedLanguageCode =>
  supportedLanguageCodes.has(languageCode);
