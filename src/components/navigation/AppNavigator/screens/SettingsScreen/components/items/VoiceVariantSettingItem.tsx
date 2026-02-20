import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { voiceVariantSettingAtom } from '../../../../../../../contexts/atoms.ts';
import { CommonSettingItem } from '../CommonSettingItem.tsx';
import { workoutVoiceVariants } from '../../constants.tsx';
import { getVoiceVariantSettingValueProps } from '../../helpers/getVoiceVariantSettingValueProps.ts';

const VoiceVariantSettingItemComponent = () => {
  const t = useAppTranslation();

  return (
    <CommonSettingItem
      title={t(
        'screens.settingsScreen.feedbackSection.items.voiceVariant.label',
      )}
      description={t(
        'screens.settingsScreen.feedbackSection.items.voiceVariant.description',
      )}
      itemValues={workoutVoiceVariants}
      atom={voiceVariantSettingAtom}
      getProps={getVoiceVariantSettingValueProps}
    />
  );
};

export const VoiceVariantSettingItem = memo(VoiceVariantSettingItemComponent);
