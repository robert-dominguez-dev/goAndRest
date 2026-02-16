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
        label: 'Pauza',
        description: 'Krátky čas na regeneráciu medzi sériami.',
      },
      series: {
        label: 'Počet sérií',
        description:
          'Počet opakovaní cvičenia (a páuz medzi nimi) v jednom kole.',
      },
      rounds: {
        label: 'Počet kôl',
        description:
          'Celkový počet kôl v tréningu. Každé kolo môže obsahovať niekoľko sérií.',
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
      removeStoredWorkoutPopUp: {
        title: 'Vymazať',
        description:
          'Naozaj chceš vymazať tréning "{{value}}"? Táto akcia sa nedá vrátiť späť.',
        positiveButtonLabel: 'Vymazať',
        negativeButtonLabel: 'Zrušiť',
      },
      saveWorkoutBottomSheet: {
        title: 'Uloženie tréningu',
        description: 'Pomenuj svoj tréning a vyber ikonu.',
        inputLabel: 'Názov tréningu',
        positiveButtonLabel: 'Uložiť tréning',
        invalidButtonLabel: 'Najprv vyplň',
      },
      rules: {
        required: 'Meno musíš vyplniť...',
        minLength: 'Meno musí obsahovať aspoň {{value}} znaky.',
        maxLength: 'Meno nesmie obsahovať viac ako {{value}} znakov.',
      },
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
