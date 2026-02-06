import { SupportedLanguageCode } from '../../contexts/AppLanguageProvider/types.ts';

const supportedLanguageCodes = new Set<string>(
  Object.values(SupportedLanguageCode),
);

export const checkIsSupportedAppLanguage = (
  languageCode: string,
): languageCode is SupportedLanguageCode =>
  supportedLanguageCodes.has(languageCode);
