import {
  WorkoutCharacterVariant,
  WorkoutVoiceVariant,
} from '../SettingsScreen/constants.tsx';
import { TranslateKey } from '../../../../../locales/types.ts';

type FinishedWorkoutScreenTranslateKeys = {
  titleKey: TranslateKey;
  buttonLabelKey: TranslateKey;
};

export const defaultFinishWorkoutScreenTranslateKeys: FinishedWorkoutScreenTranslateKeys =
  {
    titleKey: 'screens.finishedWorkoutScreen.title.default',
    buttonLabelKey: 'screens.finishedWorkoutScreen.buttonLabel.default',
  };

export const voiceVariantToFinishWorkoutScreenTranslateKeys: Record<
  WorkoutVoiceVariant,
  FinishedWorkoutScreenTranslateKeys
> = {
  [WorkoutVoiceVariant.coachFemale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.coachFemale',
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byVoice.coachFemale',
  },
  [WorkoutVoiceVariant.coachMale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.coachMale',
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byVoice.coachMale',
  },
  [WorkoutVoiceVariant.briefFemale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.briefFemale',
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byVoice.briefFemale',
  },
  [WorkoutVoiceVariant.briefMale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.briefMale',
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byVoice.briefMale',
  },
  [WorkoutVoiceVariant.calmFemale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.calmFemale',
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byVoice.calmFemale',
  },
  [WorkoutVoiceVariant.calmMale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.calmMale',
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byVoice.calmMale',
  },
};

export const characterVariantToFinishWorkoutScreenTranslateKeys: Record<
  WorkoutCharacterVariant,
  FinishedWorkoutScreenTranslateKeys
> = {
  [WorkoutCharacterVariant.warrior]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byCharacter.warrior',
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byCharacter.warrior',
  },
  [WorkoutCharacterVariant.shieldmaiden]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byCharacter.shieldmaiden',
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byCharacter.shieldmaiden',
  },
  [WorkoutCharacterVariant.cyborg]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byCharacter.cyborg',
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byCharacter.cyborg',
  },
  [WorkoutCharacterVariant.wizard]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byCharacter.wizard',
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byCharacter.wizard',
  },
};
