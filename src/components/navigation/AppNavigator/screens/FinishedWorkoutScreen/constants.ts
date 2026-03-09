import {
  WorkoutCharacterVariant,
  WorkoutVoiceVariant,
} from '../SettingsScreen/constants.tsx';
import { TranslateKey } from '../../../../../locales/types.ts';

type FinishedWorkoutScreenTranslateKeys = {
  titleKey: TranslateKey;
  descriptionKey: TranslateKey;
  stats: {
    totalTimeKey: TranslateKey;
  };
  buttonLabelKey: TranslateKey;
};

export const defaultFinishWorkoutScreenTranslateKeys: FinishedWorkoutScreenTranslateKeys =
  {
    titleKey: 'screens.finishedWorkoutScreen.title.default',
    descriptionKey: 'screens.finishedWorkoutScreen.description.default',
    stats: {
      totalTimeKey: 'screens.finishedWorkoutScreen.stats.totalTime.default',
    },
    buttonLabelKey: 'screens.finishedWorkoutScreen.buttonLabel.default',
  };

export const voiceVariantToFinishWorkoutScreenTranslateKeys: Record<
  WorkoutVoiceVariant,
  FinishedWorkoutScreenTranslateKeys
> = {
  [WorkoutVoiceVariant.coachFemale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.coachFemale',
    descriptionKey:
      'screens.finishedWorkoutScreen.description.byVoice.coachFemale',
    stats: {
      totalTimeKey:
        'screens.finishedWorkoutScreen.stats.totalTime.byVoice.coachFemale',
    },
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byVoice.coachFemale',
  },
  [WorkoutVoiceVariant.coachMale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.coachMale',
    descriptionKey:
      'screens.finishedWorkoutScreen.description.byVoice.coachMale',
    stats: {
      totalTimeKey:
        'screens.finishedWorkoutScreen.stats.totalTime.byVoice.coachMale',
    },
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byVoice.coachMale',
  },
  [WorkoutVoiceVariant.briefFemale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.briefFemale',
    descriptionKey:
      'screens.finishedWorkoutScreen.description.byVoice.briefFemale',
    stats: {
      totalTimeKey:
        'screens.finishedWorkoutScreen.stats.totalTime.byVoice.briefFemale',
    },
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byVoice.briefFemale',
  },
  [WorkoutVoiceVariant.briefMale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.briefMale',
    descriptionKey:
      'screens.finishedWorkoutScreen.description.byVoice.briefMale',
    stats: {
      totalTimeKey:
        'screens.finishedWorkoutScreen.stats.totalTime.byVoice.briefMale',
    },
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byVoice.briefMale',
  },
  [WorkoutVoiceVariant.calmFemale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.calmFemale',
    descriptionKey:
      'screens.finishedWorkoutScreen.description.byVoice.calmFemale',
    stats: {
      totalTimeKey:
        'screens.finishedWorkoutScreen.stats.totalTime.byVoice.calmFemale',
    },
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byVoice.calmFemale',
  },
  [WorkoutVoiceVariant.calmMale]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byVoice.calmMale',
    descriptionKey:
      'screens.finishedWorkoutScreen.description.byVoice.calmMale',
    stats: {
      totalTimeKey:
        'screens.finishedWorkoutScreen.stats.totalTime.byVoice.calmMale',
    },
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
    descriptionKey:
      'screens.finishedWorkoutScreen.description.byCharacter.warrior',
    stats: {
      totalTimeKey:
        'screens.finishedWorkoutScreen.stats.totalTime.byCharacter.warrior',
    },
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byCharacter.warrior',
  },
  [WorkoutCharacterVariant.shieldmaiden]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byCharacter.shieldmaiden',
    descriptionKey:
      'screens.finishedWorkoutScreen.description.byCharacter.shieldmaiden',
    stats: {
      totalTimeKey:
        'screens.finishedWorkoutScreen.stats.totalTime.byCharacter.shieldmaiden',
    },
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byCharacter.shieldmaiden',
  },
  [WorkoutCharacterVariant.cyborg]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byCharacter.cyborg',
    descriptionKey:
      'screens.finishedWorkoutScreen.description.byCharacter.cyborg',
    stats: {
      totalTimeKey:
        'screens.finishedWorkoutScreen.stats.totalTime.byCharacter.cyborg',
    },
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byCharacter.cyborg',
  },
  [WorkoutCharacterVariant.wizard]: {
    titleKey: 'screens.finishedWorkoutScreen.title.byCharacter.wizard',
    descriptionKey:
      'screens.finishedWorkoutScreen.description.byCharacter.wizard',
    stats: {
      totalTimeKey:
        'screens.finishedWorkoutScreen.stats.totalTime.byCharacter.wizard',
    },
    buttonLabelKey:
      'screens.finishedWorkoutScreen.buttonLabel.byCharacter.wizard',
  },
};
