import { NestedKeys } from '../types/magic.ts';
import { TOptionsBase } from 'i18next';
import { AppWorkoutConfigKey } from '../components/navigation/AppNavigator/screens/LandingScreen/constants.ts';

type WorkoutConfigItemTexts = {
  label: string;
  description: string;
};

type WorkoutConfigTexts = Record<AppWorkoutConfigKey, WorkoutConfigItemTexts>;

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
      items: {
        languagePicker: {
          title: string;
        };
        themePicker: {
          title: string;
        };
      };
    };
    runningWorkoutScreen: {
      title: string;
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
