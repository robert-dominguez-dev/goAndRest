import { NestedKeys } from '../types/magic.ts';
import { TOptionsBase } from 'i18next';
import { AppWorkoutConfigKey } from '../components/navigation/AppNavigator/screens/LandingScreen/constants.ts';
import { SupportedLanguageCode } from '../contexts/AppLanguageProvider/constants.ts';
import {
  WorkoutCharacterVariant,
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

type SettingsItemSubItems<TItemsKey extends string> = {
  items: Record<TItemsKey, string>;
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
  };
  screens: {
    landingScreen: {
      title: string;
      selectStoredWorkoutButtonLabel: string;
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
            SettingsItemSubItems<WorkoutCharacterVariant>;
          soundVariant: SettingsItemTexts &
            SettingsItemSubItems<WorkoutSoundVariant>;
          vibrations: SettingsItemTexts;
        };
      };
    };
    runningWorkoutScreen: {
      title: string;
      endWorkoutPopUp: PopUpTexts;
      totalElapsedTime: string;
    };
    savedWorkoutsScreen: {
      title: string;
      existingWorkoutItem: {
        totalTime: string;
        startButtonLabel: string;
        deleteButtonLabel: string;
      };
    };
  };
};

export type TranslateKey = NestedKeys<AppTranslations>;

type DefaultTranslationParams = { value: string };

export type TranslationOptions = Pick<TOptionsBase, 'count' | 'returnObjects'> &
  Record<string, string | number> &
  DefaultTranslationParams;
