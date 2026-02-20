import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { soundVariantSettingAtom } from '../../../../../../../contexts/atoms.ts';
import { CommonSettingItem } from '../CommonSettingItem.tsx';
import { workoutSoundVariants } from '../../constants.tsx';
import { getSoundVariantSettingValueProps } from '../../helpers/getSoundVariantSettingValueProps.ts';

const SoundVariantSettingItemComponent = () => {
  const t = useAppTranslation();

  return (
    <CommonSettingItem
      title={t(
        'screens.settingsScreen.feedbackSection.items.soundVariant.label',
      )}
      description={t(
        'screens.settingsScreen.feedbackSection.items.soundVariant.description',
      )}
      itemValues={workoutSoundVariants}
      atom={soundVariantSettingAtom}
      getProps={getSoundVariantSettingValueProps}
    />
  );
};

export const SoundVariantSettingItem = memo(SoundVariantSettingItemComponent);
