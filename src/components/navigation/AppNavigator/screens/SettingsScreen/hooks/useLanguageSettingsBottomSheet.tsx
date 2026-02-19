import { useAppSelectionBottomSheet } from '../../../../../common/AppSelectionBottomSheet/hooks/useAppSelectionBottomSheet.tsx';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { SupportedLanguageCode } from '../../../../../../contexts/AppLanguageProvider/types.ts';
import { AppSelectionBottomSheetItemData } from '../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItem.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppSelectionBottomSheetItemText } from '../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemTextProps.tsx';
import {
  appLanguageCodeToFlagEmoji,
  appLanguageCodeToLabelTranslateKey,
  appLanguages,
} from '../constants.tsx';

export const useLanguageSettingsBottomSheet = () => {
  const t = useAppTranslation();

  const { bottomSheet, handleOpen } = useAppSelectionBottomSheet();

  const { language: selectedLanguage, changeLanguage } = useAppLanguage();

  const items = appLanguages.reduce<
    AppSelectionBottomSheetItemData<SupportedLanguageCode>[]
  >((acc, language) => {
    const flagEmoji = appLanguageCodeToFlagEmoji[language];
    const labelTranslateKey = appLanguageCodeToLabelTranslateKey[language];

    acc.push({
      label: t(labelTranslateKey),
      value: language,
      selected: language === selectedLanguage,
      accessoryLeft: (
        <AppSelectionBottomSheetItemText>
          {flagEmoji}
        </AppSelectionBottomSheetItemText>
      ),
    });

    return acc;
  }, []);

  const openLanguageSettingsBottomSheet = () =>
    handleOpen({
      items,
      onSelect: changeLanguage,
    });

  return { bottomSheet, openLanguageSettingsBottomSheet };
};
