import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { SupportedLanguageCode } from '../../../../../../../contexts/AppLanguageProvider/types.ts';
import { getOnPressWithHapticFeedback } from '../../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';
import { AppEmojiButton } from '../../../../../../common/AppEmojiButton.tsx';
import { AppRow } from '../../../../../../common/AppRow.tsx';
import { memo } from 'react';
import { useAppSelectionBottomSheet } from '../../../../../../common/AppSelectionBottomSheet/hooks/useAppSelectionBottomSheet.tsx';

const appLanguageCodeToFlagEmoji: Record<SupportedLanguageCode, string> = {
  [SupportedLanguageCode.cs]: '🇨🇿',
  [SupportedLanguageCode.sk]: '🇸🇰',
  [SupportedLanguageCode.en]: '🇬🇧',
};

const LanguageSettingsItemComponent = () => {
  const t = useAppTranslation();

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

  const accessoryRight = <AppRow gap={'sm'}>{flags}</AppRow>;

  const { bottomSheet, handleOpen } = useAppSelectionBottomSheet();

  return (
    <SettingsItem
      title={t('screens.settingsScreen.appearanceSection.items.language.label')}
      description={t(
        'screens.settingsScreen.appearanceSection.items.language.description',
      )}
      onPress={() => console.log('PRESSED')}
      accessoryRight={accessoryRight}
    />
  );
};

export const LanguageSettingsItem = memo(LanguageSettingsItemComponent);
