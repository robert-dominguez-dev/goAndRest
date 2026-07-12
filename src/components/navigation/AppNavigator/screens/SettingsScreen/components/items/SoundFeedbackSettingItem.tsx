import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { JSX, memo, useCallback } from 'react';
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
import { useIsPremium } from '../../../../../../../contexts/premium/hooks/useIsPremium.ts';

type SoundFeedbackSettingItemProps = {
  onUnlockAllPress: () => void;
};

const SoundFeedbackSettingItemComponent = ({
  onUnlockAllPress,
}: SoundFeedbackSettingItemProps) => {
  const t = useAppTranslation();

  const soundFeedback = useAtomValue(soundFeedbackSettingAtom);

  const isPremium = useIsPremium();

  const soundFeedbackToVariantItem: Record<
    WorkoutSoundFeedback,
    JSX.Element | undefined
  > = {
    [WorkoutSoundFeedback.voice]: <VoiceVariantSettingItem />,
    [WorkoutSoundFeedback.character]: (
      <CharacterVariantSettingItem onUnlockAllPress={onUnlockAllPress} />
    ),
    [WorkoutSoundFeedback.sound]: <SoundVariantSettingItem />,
    [WorkoutSoundFeedback.none]: undefined,
  };

  const maybeVariantSettingsItemElement =
    soundFeedbackToVariantItem[soundFeedback];

  const { bottomSheet } = usePremiumSoundFeedbackGuard(onUnlockAllPress);

  const getProps = useCallback(
    (value: WorkoutSoundFeedback) =>
      getSoundFeedbackSettingValueProps(value, isPremium),
    [isPremium],
  );

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
        getProps={getProps}
      />
      {maybeVariantSettingsItemElement}
      {bottomSheet}
    </>
  );
};

export const SoundFeedbackSettingItem = memo(SoundFeedbackSettingItemComponent);
