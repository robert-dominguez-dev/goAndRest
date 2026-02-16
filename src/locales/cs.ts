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
        description: 'Doba aktivní části každé série.',
      },
      rest: {
        label: 'Pauza',
        description: 'Krátká přestávka pro regeneraci mezi sériemi.',
      },
      series: {
        label: 'Počet sérií',
        description:
          'Počet opakování cvičení (a pauz mezi nimi) v jednom kole.',
      },
      rounds: {
        label: 'Počet kol',
        description:
          'Celkový počet kol v tréninku. Každé kolo může obsahovat několik sérií.',
      },
      brake: {
        label: 'Pauza mezi koly',
        description: 'Delší přestávka po dokončení všech sérií v kole.',
      },
    },
  },
  screens: {
    landingScreen: {
      title: 'Výchozí trénink',
      removeStoredWorkoutPopUp: {
        title: 'Smazání',
        description:
          'Opravdu chceš smazat konfiguraci "{{value}}"? Tuto akci nelze vzít zpět.',
        positiveButtonLabel: 'Smazat',
        negativeButtonLabel: 'Zrušit',
      },
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
