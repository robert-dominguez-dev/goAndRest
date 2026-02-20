import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { characterVariantSettingAtom } from '../../../../../../../contexts/atoms.ts';
import { CommonSettingItem } from '../CommonSettingItem.tsx';
import { workoutCharacterVariants } from '../../constants.tsx';
import { getCharacterVariantSettingValueProps } from '../../helpers/getCharacterVariantSettingValueProps.ts';

const CharacterVariantSettingItemComponent = () => {
  const t = useAppTranslation();

  return (
    <CommonSettingItem
      title={t(
        'screens.settingsScreen.feedbackSection.items.characterVariant.label',
      )}
      description={t(
        'screens.settingsScreen.feedbackSection.items.characterVariant.description',
      )}
      itemValues={workoutCharacterVariants}
      atom={characterVariantSettingAtom}
      getProps={getCharacterVariantSettingValueProps}
    />
  );
};

export const CharacterVariantSettingItem = memo(
  CharacterVariantSettingItemComponent,
);
