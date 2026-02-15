import { AppTranslations } from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const cs = {
  common: {
    ok: 'Ok',
    workoutConfig: {
      work: {
        label: 'Cvičení',
        description: 'Doba aktivního cvičení v každé sérii.',
      },
      rest: {
        label: 'Odpočinek',
        description: 'Krátký čas na regeneraci mezi sériemi.',
      },
      series: {
        label: 'Počet sérií',
        description:
          'Počet opakování dvojice cvičení/odpočinek v rámci jednoho kola.',
      },
      rounds: {
        label: 'Počet kol',
        description:
          'Celkový počet dokončených kol v tréninku. Každé kolo může mít několik sérií.',
      },
      brake: {
        label: 'Pauza mezi koly',
        description: 'Delší doba odpočinku po dokončení všech sérií v kole.',
      },
    },
  },
  screens: {
    landingScreen: {
      title: 'Výchozí trénink',
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
      title: 'Výchozí trénink',
    },
  },
} as const satisfies AppTranslations;
