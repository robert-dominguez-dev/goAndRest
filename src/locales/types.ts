import { NestedKeys } from '../types/magic.ts';
import { TOptionsBase } from 'i18next';

export type AppTranslations = {
  common: {};
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
  };
};

export type TranslateKey = NestedKeys<AppTranslations>;

type DefaultTranslationParams = { value: string };

export type TranslationOptions = Pick<TOptionsBase, 'count' | 'returnObjects'> &
  Record<string, string | number> &
  DefaultTranslationParams;
