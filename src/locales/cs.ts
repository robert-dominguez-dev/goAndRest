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
      recovery: {
        label: 'Pauza mezi koly',
        description: 'Delší přestávka po dokončení všech sérií v kole.',
      },
    },
  },
  screens: {
    landingScreen: {
      title: 'Nový trénink',
      selectStoredWorkoutButtonLabel: 'Vybrat uložený trénink',
      removeStoredWorkoutPopUp: {
        title: 'Smazání',
        description:
          'Opravdu chceš smazat trénink "{{value}}"? Tuto akci nelze vzít zpět.',
        positiveButtonLabel: 'Smazat',
        negativeButtonLabel: 'Zrušit',
      },
      resetWorkoutPopUp: {
        title: 'Zrušení změn',
        description:
          'Opravdu chceš zrušit provedené změny a vrátit hodnoty do výchozího nastavení?',
        positiveButtonLabel: 'Ano',
        negativeButtonLabel: 'Ne',
      },
      saveWorkoutBottomSheet: {
        title: 'Uložení tréninku',
        description:
          'Pojmenuj svůj trénink. Pod tímto názvem jej později najdeš mezi uloženými tréninky.',
        inputLabel: 'Název tréninku',
        positiveButtonLabel: 'Uložit trénink',
        invalidButtonLabel: 'Nejprve vyplň',
      },
      rules: {
        required: 'Jméno musíš vyplnit...',
        minLength: 'Jméno musí obsahovat alespoň {{value}} znaky.',
        maxLength: 'Jméno nesmí obsahovat více než {{value}} znaků.',
      },
    },
    settingsScreen: {
      title: 'Nastavení',
      appearanceSection: {
        label: 'Vzhled',
        items: {
          language: {
            label: 'Jazyk',
            description:
              'V tomto jazyce budou zobrazovány texty a přehrávány zvuky.',
            items: {
              cs: 'Čeština',
              en: 'Angličtina',
              sk: 'Slovenština',
            },
          },
          theme: {
            label: 'Tmavý režim',
            description:
              'Přepne vzhled aplikace do tmavých barev šetřících oči i baterii.',
          },
        },
      },
      workoutSection: {
        label: 'Trénink',
        items: {
          keepTimerInBackground: {
            label: 'Běh časovače na pozadí',
            description: 'Časovač zůstane aktivní i po opuštění aplikace.',
          },
          warmup: {
            label: 'Rozehřátí',
            description: 'Čas před začátkem tréninku určený k rozcvičení.',
          },
          cooldown: {
            label: 'Vydýchání',
            description:
              'Čas po skončení tréninku určený ke zklidnění svalů a dechu.',
          },
        },
      },
      feedbackSection: {
        label: 'Zvuky a vibrace',
        items: {
          soundFeedback: {
            label: 'Zvuková odezva',
            description:
              'Způsob, jakým tě bude aplikace upozorňovat během tréninku (např. oznámení o polovině, odpočet, začátek nové fáze).',
            items: {
              voice: 'Standardní hlasy',
              character: 'Zábavné hlasy',
              sound: 'Zvukové signály',
              none: 'Bez zvuku',
            },
          },
          voiceVariant: {
            label: 'Typ hlasu',
            description: 'Vyber si hlas, který tě bude provázet tréninkem.',
            items: {
              coachMale: 'Martin (trenér)',
              coachFemale: 'Petra (trenérka)',
              friendMale: 'Honza (kámoš)',
              friendFemale: 'Katka (kámoška)',
              calmMale: 'Tomáš (klidný)',
              calmFemale: 'Anna (klidná)',
            },
          },
          characterVariant: {
            label: 'Postava',
            description: 'Vyber si postavu, která tě bude provázet tréninkem.',
            items: {
              warrior: 'Válečník',
              cyborg: 'Kyborg',
              wizard: 'Čaroděj',
            },
          },
          soundVariant: {
            label: 'Typ signálu',
            description:
              'Zvuk, který uslyšíš při startu, odpočtu a dalších událostech během tréninku.',
            items: {
              beep: 'Pípnutí',
              bell: 'Zvon',
              whistle: 'Hvizd',
              drum: 'Buben',
              snap: 'Lusknutí',
            },
          },
          vibrations: {
            label: 'Vibrace',
            description: 'Používat vibrace v rámci celé aplikace.',
          },
        },
      },
    },
    runningWorkoutScreen: {
      title: 'Trénink',
      endWorkoutPopUp: {
        title: 'Ukončení tréninku',
        description: 'Opravdu chceš ukončit trénink?',
        positiveButtonLabel: 'Ukončit',
        negativeButtonLabel: 'Pokračovat',
      },
      totalElapsedTime: 'Celkem',
    },
    savedWorkoutsScreen: {
      title: 'Uložené tréninky',
      existingWorkoutItem: {
        totalTime: 'Celkový čas',
        startButtonLabel: 'Start',
        deleteButtonLabel: 'Smazat',
      },
    },
  },
} as const satisfies AppTranslations;
