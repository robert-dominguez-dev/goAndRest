import { AppRow } from '../../../../../common/AppRow.tsx';
import { SupportedLanguageCode } from '../../../../../../contexts/AppLanguageProvider/types.ts';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { AppEmojiButton } from '../../../../../common/AppEmojiButton.tsx';
import { getOnPressWithHapticFeedback } from '../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

const appLanguageCodeToFlagEmoji: Record<SupportedLanguageCode, string> = {
  [SupportedLanguageCode.cs]: '🇨🇿',
  [SupportedLanguageCode.sk]: '🇸🇰',
  [SupportedLanguageCode.en]: '🇬🇧',
};

export const AppLanguagePicker = () => {
  const { language: selectedLanguage, changeLanguage } = useAppLanguage();

  const flags = Object.values(SupportedLanguageCode).map(language => {
    const flagEmoji = appLanguageCodeToFlagEmoji[language];
    const isSelected = language === selectedLanguage;
    const handlePress = () =>
      getOnPressWithHapticFeedback(
        changeLanguage,
        HapticFeedbackTypes.selection,
      )(language);

    return (
      <AppEmojiButton
        key={language}
        emoji={flagEmoji}
        isSelected={isSelected}
        onPress={handlePress}
      />
    );
  });

  return <AppRow gap={'s'}>{flags}</AppRow>;
};
