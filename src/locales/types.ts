import { NestedKeys } from '../types/magic.ts';
import { TOptionsBase } from 'i18next';
import { AppWorkoutConfigKey } from '../components/navigation/AppNavigator/screens/LandingScreen/constants.ts';
import { SupportedLanguageCode } from '../contexts/AppLanguageProvider/constants.ts';
import {
  WorkoutCharacterVariant,
  WorkoutCountdownVariant,
  WorkoutSoundFeedback,
  WorkoutSoundVariant,
  WorkoutVoiceVariant,
} from '../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';

type WorkoutConfigItemTexts = {
  label: string;
  description: string;
};

type WorkoutConfigTexts = Record<AppWorkoutConfigKey, WorkoutConfigItemTexts>;

type SettingsItemTexts = WorkoutConfigItemTexts;

type SettingsItemSubItems<TItemsKey extends string | number> = {
  items: Record<TItemsKey, string>;
};

type TextsByCoachVariant = {
  default: string;
  byVoice: Record<WorkoutVoiceVariant, string>;
  byCharacter: Record<WorkoutCharacterVariant, string>;
};

type PopUpTexts = {
  title: string;
  description: string;
  positiveButtonLabel: string;
  negativeButtonLabel: string;
};

type SaveWorkoutBottomSheetTexts = Omit<PopUpTexts, 'negativeButtonLabel'> & {
  inputLabel: string;
  invalidButtonLabel: string;
};

export type AppTranslations = {
  common: {
    ok: string;
    workoutConfig: WorkoutConfigTexts;
    pressAnywhere: string;
    adNotAvailablePopUp: {
      title: string;
      description: string;
    };
    adLoading: string;
  };
  screens: {
    landingScreen: {
      title: string;
      selectStoredWorkoutButtonLabel: string;
      lastRunningWorkoutButtonLabel: string;
      removeStoredWorkoutPopUp: PopUpTexts;
      resetWorkoutPopUp: PopUpTexts;
      saveWorkoutBottomSheet: SaveWorkoutBottomSheetTexts;
      rules: {
        required: string;
        minLength: string;
        maxLength: string;
      };
    };
    settingsScreen: {
      title: string;
      appearanceSection: {
        label: string;
        items: {
          language: SettingsItemTexts &
            SettingsItemSubItems<SupportedLanguageCode>;
          theme: SettingsItemTexts;
        };
      };
      workoutSection: {
        label: string;
        items: {
          keepTimerInBackground: SettingsItemTexts;
          warmup: SettingsItemTexts;
          cooldown: SettingsItemTexts;
        };
      };
      feedbackSection: {
        label: string;
        items: {
          soundFeedback: SettingsItemTexts &
            SettingsItemSubItems<WorkoutSoundFeedback>;
          voiceVariant: SettingsItemTexts &
            SettingsItemSubItems<WorkoutVoiceVariant>;
          characterVariant: SettingsItemTexts &
            SettingsItemSubItems<WorkoutCharacterVariant> & {
              premiumBottomSheet: {
                title: string;
                description: string;
                daysRemaining: {
                  lessThanOne: string;
                  one: string;
                  few: string;
                  many: string;
                };
                extendPopUp: {
                  title: string;
                  description: string;
                  selectOnlyButtonLabel: string;
                  extendButtonLabel: string;
                };
              };
            };
          soundVariant: SettingsItemTexts &
            SettingsItemSubItems<WorkoutSoundVariant>;
          countdown: SettingsItemTexts &
            SettingsItemSubItems<WorkoutCountdownVariant>;
          vibrations: SettingsItemTexts;
        };
      };
    };
    runningWorkoutScreen: {
      title: string;
      endWorkoutPopUp: PopUpTexts;
      totalElapsedTime: string;
      descriptionTexts: {
        round: string;
        set: string;
      };
    };
    savedWorkoutsScreen: {
      title: string;
      existingWorkoutItem: {
        totalTime: string;
        startButtonLabel: string;
        deleteButtonLabel: string;
      };
    };
    finishedWorkoutScreen: {
      title: TextsByCoachVariant;
      description: TextsByCoachVariant;
      stats: {
        totalTime: TextsByCoachVariant;
      };
      buttonLabel: TextsByCoachVariant;
      ratingRequest: string;
      ratingRequestThankYou: string;
      ratingRequestSorry: string;
    };
    disclaimerScreen: {
      title: string;
      description: string;
      subTitle: string;
      sections: {
        first: { title: string; description: string };
        second: { title: string; description: string };
        third: { title: string; description: string };
        fourth: { title: string; description: string };
      };
      buttonLabel: string;
    };
  };
};

export type TranslateKey = NestedKeys<AppTranslations>;

type DefaultTranslationParams = { value: string };

export type TranslationOptions = Pick<TOptionsBase, 'count' | 'returnObjects'> &
  Record<string, string | number> &
  DefaultTranslationParams;
