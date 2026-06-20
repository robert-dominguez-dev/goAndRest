import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { JSX, memo } from 'react';
import { soundFeedbackSettingAtom } from '../../../../../../../contexts/atoms.ts';
import { getSoundFeedbackSettingValueProps } from '../../helpers/getSoundFeedbackSettingValueProps.ts';
import { CommonSettingItem } from '../CommonSettingItem.tsx';
import {
  WorkoutSoundFeedback,
  workoutSoundFeedbacks,
} from '../../constants.tsx';
import { useAtomValue } from 'jotai';
import { VoiceVariantSettingItem } from './VoiceVariantSettingItem.tsx';
import { CharacterVariantSettingItem } from './CharacterVariantSettingItem.tsx';
import { SoundVariantSettingItem } from './SoundVariantSettingItem.tsx';
import { usePremiumSoundFeedbackGuard } from '../../hooks/usePremiumSoundFeedbackGuard.tsx';

const soundFeedbackToVariantItem: Record<
  WorkoutSoundFeedback,
  JSX.Element | undefined
> = {
  [WorkoutSoundFeedback.voice]: <VoiceVariantSettingItem />,
  [WorkoutSoundFeedback.character]: <CharacterVariantSettingItem />,
  [WorkoutSoundFeedback.sound]: <SoundVariantSettingItem />,
  [WorkoutSoundFeedback.none]: undefined,
};

const SoundFeedbackSettingItemComponent = () => {
  const t = useAppTranslation();

  const soundFeedback = useAtomValue(soundFeedbackSettingAtom);

  const maybeVariantSettingsItemElement =
    soundFeedbackToVariantItem[soundFeedback];

  const { bottomSheet } = usePremiumSoundFeedbackGuard();

  return (
    <>
      <CommonSettingItem
        title={t(
          'screens.settingsScreen.feedbackSection.items.soundFeedback.label',
        )}
        description={t(
          'screens.settingsScreen.feedbackSection.items.soundFeedback.description',
        )}
        itemValues={workoutSoundFeedbacks}
        atom={soundFeedbackSettingAtom}
        getProps={getSoundFeedbackSettingValueProps}
      />
      {maybeVariantSettingsItemElement}
      {bottomSheet}
    </>
  );
};

export const SoundFeedbackSettingItem = memo(SoundFeedbackSettingItemComponent);
