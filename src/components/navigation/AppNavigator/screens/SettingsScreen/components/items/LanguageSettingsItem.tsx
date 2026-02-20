import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { memo } from 'react';
import { useLanguageSettingsBottomSheet } from '../../hooks/useLanguageSettingsBottomSheet.tsx';
import {
  APP_BOTTOM_SHEET_ICON_LABEL_GAP_UNION,
  AppSelectionBottomSheetItemText,
} from '../../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';
import { AppRow } from '../../../../../../common/AppRow.tsx';
import { getAppLanguageSettingValueProps } from '../../helpers/getAppLanguageSettingValueProps.ts';

const LanguageSettingsItemComponent = () => {
  const t = useAppTranslation();

  const { language } = useAppLanguage();

  const { labelTranslateKey, flagEmoji } =
    getAppLanguageSettingValueProps(language);

  const { bottomSheet, openLanguageSettingsBottomSheet } =
    useLanguageSettingsBottomSheet();

  const accessoryRight = (
    <AppRow
      gap={APP_BOTTOM_SHEET_ICON_LABEL_GAP_UNION}
      alignItems={'center'}>
      <AppSelectionBottomSheetItemText label={flagEmoji} />
      <AppSelectionBottomSheetItemText label={t(labelTranslateKey)} />
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
