import { useAppSelectionBottomSheet } from '../../../../../common/AppSelectionBottomSheet/hooks/useAppSelectionBottomSheet.tsx';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import {
  appLanguages,
  SupportedLanguageCode,
} from '../../../../../../contexts/AppLanguageProvider/constants.ts';
import { AppSelectionBottomSheetItemData } from '../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItem.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { getAppLanguageSettingValueProps } from '../helpers/getAppLanguageSettingValueProps.ts';
import { AppSelectionBottomSheetItemText } from '../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';

export const useLanguageSettingsBottomSheet = () => {
  const t = useAppTranslation();

  const { bottomSheet, handleOpen } = useAppSelectionBottomSheet();

  const { language: selectedLanguage, changeLanguage } = useAppLanguage();

  const items = appLanguages.map<
    AppSelectionBottomSheetItemData<SupportedLanguageCode>
  >(language => {
    const { labelTranslateKey, flagEmoji } =
      getAppLanguageSettingValueProps(language);

    return {
      label: t(labelTranslateKey),
      value: language,
      selected: language === selectedLanguage,
      accessoryLeft: <AppSelectionBottomSheetItemText label={flagEmoji} />,
    };
  });

  const openLanguageSettingsBottomSheet = () =>
    handleOpen({
      items,
      onSelect: changeLanguage,
    });

  return { bottomSheet, openLanguageSettingsBottomSheet };
};
