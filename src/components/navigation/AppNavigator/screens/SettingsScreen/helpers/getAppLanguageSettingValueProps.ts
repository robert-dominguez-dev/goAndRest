import { SupportedLanguageCode } from '../../../../../../contexts/AppLanguageProvider/constants.ts';
import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { SettingValueProps } from '../types.ts';

const appLanguageCodeToFlagEmoji: Record<SupportedLanguageCode, string> = {
  [SupportedLanguageCode.cs]: '🇨🇿',
  [SupportedLanguageCode.sk]: '🇸🇰',
  [SupportedLanguageCode.en]: '🇬🇧',
};

type LanguageSettingValueProps = Pick<
  SettingValueProps,
  'labelTranslateKey'
> & { flagEmoji: string };

export const getAppLanguageSettingValueProps = (
  language: SupportedLanguageCode,
): LanguageSettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.appearanceSection.items.language.items',
    language,
  );

  const flagEmoji = appLanguageCodeToFlagEmoji[language];

  return { labelTranslateKey, flagEmoji };
};
