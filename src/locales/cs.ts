import { AppTranslations } from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const cs = {
  common: {
    ok: 'Ok',
    workoutConfig: {
      prep: {
        label: 'Příprava',
        description:
          'Čas před začátkem každého kola. Připrav se na nadcházející interval.',
      },
      work: {
        label: 'Cvičení',
        description: 'Doba aktivního cvičení v každém kole.',
      },
      rest: {
        label: 'Odpočinek',
        description: 'Čas na regeneraci po každém intervalu cvičení.',
      },
      rounds: {
        label: 'Počet kol',
        description:
          'Tolikrát se zopakuje cyklus přípravy, cvičení a odpočinku.',
      },
      cooldown: {
        label: 'Relax',
        description:
          'Čas na uklidnění a snížení tepu po dokončení celého tréninku.',
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
