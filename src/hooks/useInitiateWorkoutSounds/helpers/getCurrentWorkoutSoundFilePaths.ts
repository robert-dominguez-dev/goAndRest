import {
  WorkoutCharacterVariant,
  WorkoutSoundFeedback,
  WorkoutSoundVariant,
  WorkoutVoiceVariant,
} from '../../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { WorkoutSoundFilePaths } from '../../../assets/types.ts';
import { SupportedLanguageCode } from '../../../contexts/AppLanguageProvider/constants.ts';
import { appFeedbackEntityToSoundFileNamesByLanguage } from '../../../assets/constants.ts';

export const getCurrentWorkoutSoundFilePaths = (
  soundFeedback: WorkoutSoundFeedback,
  soundVariant: WorkoutSoundVariant,
  voiceVariant: WorkoutVoiceVariant,
  characterVariant: WorkoutCharacterVariant,
  language: SupportedLanguageCode,
): WorkoutSoundFilePaths | null => {
  switch (soundFeedback) {
    case WorkoutSoundFeedback.none: {
      return null;
    }
    case WorkoutSoundFeedback.sound: {
      return (
        appFeedbackEntityToSoundFileNamesByLanguage[soundVariant]?.[language] ||
        null
      );
    }
    case WorkoutSoundFeedback.voice: {
      return (
        appFeedbackEntityToSoundFileNamesByLanguage[voiceVariant]?.[language] ||
        null
      );
    }
    case WorkoutSoundFeedback.character: {
      return (
        appFeedbackEntityToSoundFileNamesByLanguage[characterVariant]?.[
          language
        ] || null
      );
    }
    default: {
      return soundFeedback satisfies never;
    }
  }
};
