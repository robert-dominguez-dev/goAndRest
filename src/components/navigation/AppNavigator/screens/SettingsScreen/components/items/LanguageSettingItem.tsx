import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { memo } from 'react';
import { useLanguageSettingBottomSheet } from '../../hooks/useLanguageSettingBottomSheet.tsx';
import {
  APP_BOTTOM_SHEET_ICON_LABEL_GAP_UNION,
  AppSelectionBottomSheetItemText,
} from '../../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';
import { AppRow } from '../../../../../../common/AppRow.tsx';
import { getAppLanguageSettingValueProps } from '../../helpers/getAppLanguageSettingValueProps.ts';

const LanguageSettingItemComponent = () => {
  const t = useAppTranslation();

  const { language } = useAppLanguage();

  const { labelTranslateKey, flagEmoji } =
    getAppLanguageSettingValueProps(language);

  const { bottomSheet, openLanguageSettingsBottomSheet } =
    useLanguageSettingBottomSheet();

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

export const LanguageSettingItem = memo(LanguageSettingItemComponent);
