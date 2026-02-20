import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { memo } from 'react';
import { useLanguageSettingsBottomSheet } from '../../hooks/useLanguageSettingsBottomSheet.tsx';
import { appLanguageCodeToFlagEmoji, appLanguageCodeToLabelTranslateKey, } from '../../constants.tsx';
import { SettingsItemValueText } from '../SettingsItemValueText.tsx';
import { AppRow } from '../../../../../../common/AppRow.tsx';

const LanguageSettingsItemComponent = () => {
  const t = useAppTranslation();

  const { language } = useAppLanguage();

  const flagEmoji = appLanguageCodeToFlagEmoji[language];
  const labelTranslateKey = appLanguageCodeToLabelTranslateKey[language];

  const { bottomSheet, openLanguageSettingsBottomSheet } =
    useLanguageSettingsBottomSheet();

  const accessoryRight = (
    <AppRow
      gap={'sm'}
      alignItems={'center'}>
      <SettingsItemValueText label={flagEmoji} />
      <SettingsItemValueText label={t(labelTranslateKey)} />
    </AppRow>
  );

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
        accessoryRight={accessoryRight}
      />
      {bottomSheet}
    </>
  );
};

export const LanguageSettingsItem = memo(LanguageSettingsItemComponent);
