import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { SettingsItemValueText } from '../SettingsItemValueText.tsx';
import { useSoundsSettingsBottomSheet } from '../../hooks/useSoundsSettingsBottomSheet.tsx';
import { useAtomValue } from 'jotai';
import { soundsSettingsAtom } from '../../../../../../../contexts/atoms.ts';

const SoundsSettingsItemComponent = () => {
  const t = useAppTranslation();

  const selectedValue = useAtomValue(soundsSettingsAtom);

  const { bottomSheet, openLanguageSettingsBottomSheet } =
    useSoundsSettingsBottomSheet();

  return (
    <>
      <SettingsItem
        title={t('screens.settingsScreen.feedbackSection.items.sounds.label')}
        description={t(
          'screens.settingsScreen.feedbackSection.items.sounds.description',
        )}
        onPress={openLanguageSettingsBottomSheet}
        accessoryRight={<SettingsItemValueText label={selectedValue} />}
      />
      {bottomSheet}
    </>
  );
};

export const SoundsSettingsItem = memo(SoundsSettingsItemComponent);
