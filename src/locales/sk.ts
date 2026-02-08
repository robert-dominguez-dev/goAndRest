import { AppTranslations } from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const sk = {
  common: {
    workoutConfig: {
      prep: 'Príprava',
      work: 'Cvičenie',
      rest: 'Oddych',
      rounds: 'Počet kôl',
      cooldown: 'Relax',
    },
  },
  screens: {
    landingScreen: {
      title: 'Tréningy',
    },
    settingsScreen: {
      title: 'Nastavenia',
      items: {
        languagePicker: {
          title: 'Jazyk',
        },
        themePicker: {
          title: 'Tmavý režim',
        },
      },
    },
  },
} as const satisfies AppTranslations;
