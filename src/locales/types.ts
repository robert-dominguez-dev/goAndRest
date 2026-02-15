import { NestedKeys } from '../types/magic.ts';
import { TOptionsBase } from 'i18next';

type WorkoutConfigTexts = {
  label: string;
  description: string;
};

export type AppTranslations = {
  common: {
    ok: string;
    workoutConfig: {
      prep: WorkoutConfigTexts;
      work: WorkoutConfigTexts;
      rest: WorkoutConfigTexts;
      rounds: WorkoutConfigTexts;
      cooldown: WorkoutConfigTexts;
    };
  };
  screens: {
    landingScreen: {
      title: string;
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
  };
};

export type TranslateKey = NestedKeys<AppTranslations>;

type DefaultTranslationParams = { value: string };

export type TranslationOptions = Pick<TOptionsBase, 'count' | 'returnObjects'> &
  Record<string, string | number> &
  DefaultTranslationParams;
