import { useAtomValue } from 'jotai';
import {
  characterVariantSettingAtom,
  soundFeedbackSettingAtom,
  voiceVariantSettingAtom,
} from '../../../../../../contexts/atoms.ts';
import { WorkoutSoundFeedback } from '../../SettingsScreen/constants.tsx';
import { SettingValueProps } from '../../SettingsScreen/types.ts';
import { getBottomSheetItemMiniImageProps } from '../../SettingsScreen/helpers/getBottomSheetItemMiniImageProps.ts';

export const useAvatarImageProps = (
  size?: number,
): SettingValueProps['imageProps'] | undefined => {
  const soundFeedback = useAtomValue(soundFeedbackSettingAtom);
  const voiceVariant = useAtomValue(voiceVariantSettingAtom);
  const characterVariant = useAtomValue(characterVariantSettingAtom);

  const feedbackToVariant = {
    none: undefined,
    sound: undefined,
    character: characterVariant,
    voice: voiceVariant,
  } satisfies Record<WorkoutSoundFeedback, unknown>;

  const variant = feedbackToVariant[soundFeedback];

  return variant ? getBottomSheetItemMiniImageProps(variant, size) : undefined;
};
