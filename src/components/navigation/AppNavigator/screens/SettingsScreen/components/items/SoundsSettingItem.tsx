import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { AppSelectionBottomSheetItemText } from '../../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';
import { useSoundFeedbackSettingBottomSheet } from '../../hooks/useSoundFeedbackSettingBottomSheet.tsx';
import { useAtomValue } from 'jotai';
import { soundFeedbackSettingAtom } from '../../../../../../../contexts/atoms.ts';
import { getSoundFeedbackSettingValueProps } from '../../helpers/getSoundFeedbackSettingValueProps.ts';

const SoundsSettingItemComponent = () => {
  const t = useAppTranslation();

  const selectedValue = useAtomValue(soundFeedbackSettingAtom);

  const { bottomSheet, openLanguageSettingsBottomSheet } =
    useSoundFeedbackSettingBottomSheet();

  const { labelTranslateKey, IconComponent } =
    getSoundFeedbackSettingValueProps(selectedValue);

  const accessoryRight = (
    <AppSelectionBottomSheetItemText
      label={t(labelTranslateKey)}
      IconComponent={IconComponent}
    />
  );

  return (
    <>
      <SettingsItem
        title={t(
          'screens.settingsScreen.feedbackSection.items.soundFeedback.label',
        )}
        description={t(
          'screens.settingsScreen.feedbackSection.items.soundFeedback.description',
        )}
        onPress={openLanguageSettingsBottomSheet}
        accessoryRight={accessoryRight}
      />
      {bottomSheet}
    </>
  );
};

export const SoundsSettingItem = memo(SoundsSettingItemComponent);
