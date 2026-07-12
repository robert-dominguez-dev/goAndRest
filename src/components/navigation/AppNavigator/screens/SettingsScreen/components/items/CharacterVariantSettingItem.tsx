import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { characterVariantSettingAtom } from '../../../../../../../contexts/atoms.ts';
import { useAtomValue } from 'jotai';
import { useAppLanguage } from '../../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { getCharacterVariantSettingValueProps } from '../../helpers/getCharacterVariantSettingValueProps.ts';
import { AppSelectionBottomSheetItemText } from '../../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';
import { SettingsItem } from '../SettingsItem.tsx';
import { usePremiumCharacterBottomSheet } from '../../../../../../common/PremiumCharacterBottomSheet/hooks/usePremiumCharacterBottomSheet.tsx';

type CharacterVariantSettingItemProps = {
  onUnlockAllPress: () => void;
};

const CharacterVariantSettingItemComponent = ({
  onUnlockAllPress,
}: CharacterVariantSettingItemProps) => {
  const t = useAppTranslation();

  const { language } = useAppLanguage();

  const selectedValue = useAtomValue(characterVariantSettingAtom);

  const { bottomSheet, openBottomSheet } =
    usePremiumCharacterBottomSheet(onUnlockAllPress);

  const { labelTranslateKey, imageProps } =
    getCharacterVariantSettingValueProps(selectedValue, language);

  const accessoryRight = (
    <AppSelectionBottomSheetItemText
      label={t(labelTranslateKey)}
      textColorStatus={'premium'}
      imageProps={imageProps}
    />
  );

  return (
    <>
      <SettingsItem
        title={t(
          'screens.settingsScreen.feedbackSection.items.characterVariant.label',
        )}
        description={t(
          'screens.settingsScreen.feedbackSection.items.characterVariant.description',
        )}
        onPress={openBottomSheet}
        accessoryRight={accessoryRight}
      />
      {bottomSheet}
    </>
  );
};

export const CharacterVariantSettingItem = memo(
  CharacterVariantSettingItemComponent,
);
