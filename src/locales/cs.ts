import { AppTranslations } from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const cs = {
  common: {
    workoutConfig: {
      prep: 'Příprava',
      work: 'Cvičení',
      rest: 'Odpočinek',
      rounds: 'Počet kol',
      cooldown: 'Relax',
    },
  },
  screens: {
    landingScreen: {
      title: 'Tréninky',
    },
    settingsScreen: {
      title: 'Nastavení',
      items: {
        languagePicker: {
          title: 'Jazyk',
        },
        themePicker: {
          title: 'Tmavý režim',
        },
      },
    },
    runningWorkoutScreen: {
      title: 'Trénink',
    },
  },
} as const satisfies AppTranslations;
