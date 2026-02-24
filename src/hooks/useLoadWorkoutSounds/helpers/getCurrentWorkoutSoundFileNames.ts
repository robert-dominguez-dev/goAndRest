import {
  WorkoutCharacterVariant,
  WorkoutSoundFeedback,
  WorkoutSoundVariant,
  WorkoutVoiceVariant,
} from '../../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { WorkoutSoundFileNames } from '../../../assets/types.ts';
import { SupportedLanguageCode } from '../../../contexts/AppLanguageProvider/constants.ts';
import { appFeedbackEntityToSoundFileNamesByLanguage } from '../../../assets/constants.ts';

export const getCurrentWorkoutSoundFileNames = (
  soundFeedback: WorkoutSoundFeedback,
  soundVariant: WorkoutSoundVariant,
  voiceVariant: WorkoutVoiceVariant,
  characterVariant: WorkoutCharacterVariant,
  language: SupportedLanguageCode,
): WorkoutSoundFileNames | undefined => {
  switch (soundFeedback) {
    case WorkoutSoundFeedback.none: {
      return undefined;
    }
    case WorkoutSoundFeedback.sound: {
      return appFeedbackEntityToSoundFileNamesByLanguage[soundVariant]?.[
        language
      ];
    }
    case WorkoutSoundFeedback.voice: {
      return appFeedbackEntityToSoundFileNamesByLanguage[voiceVariant]?.[
        language
      ];
    }
    case WorkoutSoundFeedback.character: {
      return appFeedbackEntityToSoundFileNamesByLanguage[characterVariant]?.[
        language
      ];
    }
    default: {
      return soundFeedback satisfies never;
    }
  }
};
