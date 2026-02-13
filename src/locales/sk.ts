import { AppTranslations } from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const sk = {
  common: {
    workoutConfig: {
      prep: {
        label: 'Príprava',
        description:
          'Čas pred začiatkom každého kola. Priprav sa na nadchádzajúci interval.',
      },
      work: {
        label: 'Cvičenie',
        description: 'Doba aktívneho cvičenia v každom kole.',
      },
      rest: {
        label: 'Oddych',
        description: 'Čas na regeneráciu po každom intervale cvičenia.',
      },
      rounds: {
        label: 'Počet kôl',
        description:
          'Toľkokrát sa zopakuje cyklus prípravy, cvičenia a oddychu.',
      },
      cooldown: {
        label: 'Relax',
        description: 'Čas na upokojenie a zníženie tepu po tréningu.',
      },
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
    runningWorkoutScreen: {
      title: 'Tréning',
    },
  },
} as const satisfies AppTranslations;
