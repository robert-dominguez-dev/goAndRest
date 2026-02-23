import {
  WorkoutCharacterVariant,
  WorkoutSoundFeedback,
  WorkoutVoiceVariant,
} from '../AppNavigator/screens/SettingsScreen/constants.tsx';
import { useAtomValue } from 'jotai';
import {
  characterVariantSettingAtom,
  soundFeedbackSettingAtom,
  voiceVariantSettingAtom,
} from '../../../contexts/atoms.ts';

type UseBySoundFeedbackSettingsParams<TValue> = Record<
  WorkoutVoiceVariant,
  TValue
> &
  Record<WorkoutCharacterVariant, TValue> & {
    defaultValue: TValue;
  };

export const useBySoundFeedbackSettings = <TValue>({
  defaultValue,
  ...voiceAndCharacterVariants
}: UseBySoundFeedbackSettingsParams<TValue>) => {
  const soundFeedback = useAtomValue(soundFeedbackSettingAtom);
  const voiceVariant = useAtomValue(voiceVariantSettingAtom);
  const characterVariant = useAtomValue(characterVariantSettingAtom);

  switch (soundFeedback) {
    case WorkoutSoundFeedback.sound:
    case WorkoutSoundFeedback.none: {
      return defaultValue;
    }
    case WorkoutSoundFeedback.voice: {
      return voiceAndCharacterVariants[voiceVariant];
    }
    case WorkoutSoundFeedback.character: {
      return voiceAndCharacterVariants[characterVariant];
    }
    default: {
      return soundFeedback satisfies never;
    }
  }
};
