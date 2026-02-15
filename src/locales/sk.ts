import { AppTranslations } from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const sk = {
  common: {
    ok: 'Ok',
    workoutConfig: {
      work: {
        label: 'Cvičenie',
        description: 'Doba aktívneho cvičenia v každej sérii.',
      },
      rest: {
        label: 'Odpočinok',
        description: 'Krátky čas na regeneráciu medzi sériami.',
      },
      series: {
        label: 'Počet sérií',
        description:
          'Počet opakovaní dvojice cvičenie/odpočinok v rámci jedného kola.',
      },
      rounds: {
        label: 'Počet kôl',
        description:
          'Celkový počet dokončených kol v tréninku. Každé kolo může mít několik sérií.',
      },
      brake: {
        label: 'Pauza medzi kolami',
        description:
          'Dlhšia doba odpočinku po dokončení všetkých sérií v kole.',
      },
    },
  },
  screens: {
    landingScreen: {
      title: 'Predvolený tréning',
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
      title: 'Predvolený tréning',
    },
  },
} as const satisfies AppTranslations;
