import { SupportedLanguageCode } from '../../../contexts/AppLanguageProvider/types.ts';

export const appLanguageCodeToFlagEmoji: Record<SupportedLanguageCode, string> =
  {
    [SupportedLanguageCode.cs]: '🇨🇿',
    [SupportedLanguageCode.sk]: '🇸🇰',
    [SupportedLanguageCode.en]: '🇬🇧',
  };
