import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { memo } from 'react';
import { useLanguageSettingsBottomSheet } from '../../hooks/useLanguageSettingsBottomSheet.tsx';
import { appLanguageCodeToLabelTranslateKey } from '../../constants.tsx';
import { SettingsItemValueText } from '../SettingsItemValueText.tsx';

const LanguageSettingsItemComponent = () => {
  const t = useAppTranslation();

  const { language } = useAppLanguage();

  const labelTranslateKey = appLanguageCodeToLabelTranslateKey[language];

  const { bottomSheet, openLanguageSettingsBottomSheet } =
    useLanguageSettingsBottomSheet();

  return (
    <>
      <SettingsItem
        title={t(
          'screens.settingsScreen.appearanceSection.items.language.label',
        )}
        description={t(
          'screens.settingsScreen.appearanceSection.items.language.description',
        )}
        onPress={openLanguageSettingsBottomSheet}
        accessoryRight={
          <SettingsItemValueText>{t(labelTranslateKey)}</SettingsItemValueText>
        }
      />
      {bottomSheet}
    </>
  );
};

export const LanguageSettingsItem = memo(LanguageSettingsItemComponent);
