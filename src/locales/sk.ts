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
      recovery: {
        label: 'Pauza medzi kolami',
        description:
          'Dlhšia doba odpočinku po dokončení všetkých sérií v kole.',
      },
    },
  },
  screens: {
    landingScreen: {
      title: 'Nový tréning',
      selectStoredWorkoutButtonLabel: 'Vybrať uložený tréning',
      removeStoredWorkoutPopUp: {
        title: 'Vymazať',
        description:
          'Naozaj chceš vymazať tréning "{{value}}"? Táto akcia sa nedá vrátiť späť.',
        positiveButtonLabel: 'Vymazať',
        negativeButtonLabel: 'Zrušiť',
      },
      resetWorkoutPopUp: {
        title: 'Zrušenie zmien',
        description:
          'Naozaj chceš zrušiť vykonané zmeny a vrátiť hodnoty do východiskového nastavenia?',
        positiveButtonLabel: 'Áno',
        negativeButtonLabel: 'Nie',
      },
      saveWorkoutBottomSheet: {
        title: 'Uloženie tréningu',
        description:
          'Pomenuj svoj tréning. Pod týmto názvom ho neskôr nájdeš medzi uloženými tréningami.',
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
      appearanceSection: {
        label: 'Vzhľad',
        items: {
          language: {
            label: 'Jazyk',
            description:
              'V tomto jazyku budú zobrazované texty a prehrávané zvuky.',
            items: {
              cs: 'Čeština',
              en: 'Angličtina',
              sk: 'Slovenčina',
            },
          },
          theme: {
            label: 'Tmavý režim',
            description:
              'Prepne vzhľad aplikácie do tmavých farieb šetriacich oči aj batériu.',
          },
        },
      },
      workoutSection: {
        label: 'Tréning',
        items: {
          keepTimerInBackground: {
            label: 'Beh časovača na pozadí',
            description: 'Časovač zostane aktívny aj po opustení aplikácie',
          },
          warmup: {
            label: 'Rozohriatie',
            description: 'Čas pred začiatkom tréningu určený na rozcvičku.',
          },
          cooldown: {
            label: 'Vydýchanie',
            description:
              'Čas po skončení tréningu určený na upokojenie svalov a dychu.',
          },
        },
      },
      feedbackSection: {
        label: 'Zvuky a vibrácie',
        items: {
          soundFeedback: {
            label: 'Zvuková odezva',
            description:
              'Spôsob, akým ťa bude aplikácia upozorňovať počas tréningu (napr. oznámenie o polovici, odpočet, začiatok novej fázy)',
            items: {
              voice: 'Štandardné hlasy',
              character: 'Zábavné hlasy',
              sound: 'Zvukové signály',
              none: 'Bez zvuku',
            },
          },
          voiceVariant: {
            label: 'Typ hlasu',
            description: 'Vyber si hlas, ktorý ťa bude sprevádzať tréningom',
            items: {
              coachMale: 'Marek (tréner)',
              coachFemale: 'Lucia (trénerka)',
              friendMale: 'Jano (kamarát)',
              friendFemale: 'Zuzka (kamarátka)',
              calmMale: 'Adam (pokojný)',
              calmFemale: 'Nina (pokojná)',
            },
          },
          characterVariant: {
            label: 'Postava',
            description: 'Vyber si postavu, ktorá ťa bude sprevádzať tréningom',
            items: {
              warrior: 'Bojovník',
              cyborg: 'Kyborg',
              wizard: 'Čarodejník',
            },
          },
          soundVariant: {
            label: 'Typ signálu',
            description:
              'Zvuk, ktorý počuješ pri štarte, odpočte a ďalších udalostiach počas tréningu.',
            items: {
              beep: 'Pípnutie',
              bell: 'Zvon',
              whistle: 'Hvizd',
              drum: 'Bubon',
              snap: 'Lusknutie',
            },
          },
          vibrations: {
            label: 'Vibrácie',
            description: 'Používať vibrácie v rámci celej aplikácie.',
          },
        },
      },
    },
    runningWorkoutScreen: {
      title: 'Tréning',
      endWorkoutPopUp: {
        title: 'Ukončenie tréningu',
        description: 'Naozaj chceš ukončiť tréning?',
        positiveButtonLabel: 'Ukončiť',
        negativeButtonLabel: 'Pokračovať',
      },
    },
    savedWorkoutsScreen: {
      title: 'Uložené tréningy',
      existingWorkoutItem: {
        totalTime: 'Celkový čas',
        startButtonLabel: 'Štart',
        deleteButtonLabel: 'Zmazať',
      },
    },
  },
} as const satisfies AppTranslations;
