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
    pressAnywhere: 'Klikni kamkoliv pro potvrzení 👇 ',
    adNotAvailablePopUp: {
      title: 'Reklama není dostupná',
      description: 'Zkus to prosím později.',
    },
  },
  screens: {
    landingScreen: {
      title: 'Nový trénink',
      selectStoredWorkoutButtonLabel: 'Vybrat z uložených',
      lastRunningWorkoutButtonLabel: 'Opakovat poslední',
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
        label: 'Časovač',
        items: {
          keepTimerInBackground: {
            label: 'Běh časovače na pozadí',
            description: 'Časovač zůstane aktivní i po opuštění aplikace.',
          },
          warmup: {
            label: 'Příprava',
            description:
              'Čas před zahájením tréninku, určený k zaujetí výchozí pozice, případně i ke krátkému rozcvičení.',
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
              'Výběr typu zvukových signálů pro klíčové momenty během tréninku (např. oznámení o polovině, odpočet, začátek nové fáze).',
            items: {
              voice: 'Standardní hlasy',
              character: 'Premium hlasy',
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
              briefMale: 'Dušan (stručný) ',
              briefFemale: 'Šárka (stručná)',
              calmMale: 'Tomáš (klidný)',
              calmFemale: 'Anna (klidná)',
            },
          },
          characterVariant: {
            label: 'Postava',
            description: 'Vyber si postavu, která tě bude provázet tréninkem.',
            items: {
              warrior: 'Válečník',
              shieldmaiden: 'Štítonoška',
              cyborg: 'Kyborg',
              wizard: 'Čaroděj',
            },
            premiumBottomSheet: {
              title: 'Aktivuj prémiový hlas!',
              description:
                'Chceš nastavit prémiový hlas k časovači? Klepni na něj, zhlédni krátké video a máš ho odemčený na 7 dní úplně zdarma.\n\nIkonou ▷ vpravo si můžeš přehrát ukázku. 👉',
              daysRemaining: {
                lessThanOne: '< 1 den',
                one: '{{value}} den',
                few: '{{value}} dny',
                many: '{{value}} dní',
              },
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
          countdown: {
            label: 'Odpočet konce fáze',
            description:
              'Počet sekund před koncem každé fáze (cvičení, pauza atd.), kdy tě na každou vteřinu upozorní vybraný signál (zvuk, hlas, vibrace).',
            items: {
              '10': 'Posledních 10 s',
              '5': 'Posledních 5 s',
              '3': 'Poslední 3 s',
              '0': 'Bez odpočtu',
            },
          },
          vibrations: {
            label: 'Vibrace',
            description:
              'Aktivace vibračních signálů pro klíčové momenty během tréninku (např. oznámení o polovině, odpočet, začátek nové fáze).',
          },
        },
      },
    },
    runningWorkoutScreen: {
      title: 'Vlastní',
      endWorkoutPopUp: {
        title: 'Ukončení tréninku',
        description: 'Opravdu chceš ukončit trénink?',
        positiveButtonLabel: 'Ukončit',
        negativeButtonLabel: 'Zpět',
      },
      totalElapsedTime: 'Celkem',
      descriptionTexts: {
        round: 'Kolo',
        set: 'Série',
      },
    },
    savedWorkoutsScreen: {
      title: 'Uložené tréninky',
      existingWorkoutItem: {
        totalTime: 'Celkový čas',
        startButtonLabel: 'Start',
        deleteButtonLabel: 'Smazat',
      },
    },
    finishedWorkoutScreen: {
      title: {
        default: 'Trénink dokončen!',
        byVoice: {
          coachMale: 'Výborně! Je to tam!',
          coachFemale: 'Výborně! Je to tam!',
          briefMale: 'Pecka! Máme hotovo!',
          briefFemale: 'Pecka! Máme hotovo!',
          calmMale: 'Pěkně! Krásná práce',
          calmFemale: 'Pěkně! Krásná práce',
        },
        byCharacter: {
          warrior: 'Bitva vybojována!',
          shieldmaiden: 'Bitva vybojována!',
          cyborg: 'Proces dokončen',
          wizard: 'Dobrá práce, dítě!',
        },
      },
      description: {
        default: 'Skvělá práce. Máš za sebou další kvalitní trénink.',
        byVoice: {
          coachMale: 'Dnes to byl špičkový výkon. Jen tak dál!',
          coachFemale: 'Dnes to byl špičkový výkon. Jen tak dál!',
          briefMale:
            'Dobře ty! Máš to za sebou, teď si jdi pořádně odpočinout.',
          briefFemale:
            'Dobře ty! Máš to za sebou, teď si jdi pořádně odpočinout.',
          calmMale:
            'Užij si ten klid a dojem z celého cvičení. Byl to dobře využitý čas.',
          calmFemale:
            'Užij si ten klid a dojem z celého cvičení. Byl to dobře využitý čas.',
        },
        byCharacter: {
          warrior:
            'Tak to byla řež. Není nad pořádný nářez! Jen tak dál, bojovníku!',
          shieldmaiden:
            'Tak to byla řež. Není nad pořádný nářez! Jen tak dál, bojovníku!',
          cyborg:
            'Hardwarové limity posunuty. Systémová integrita na maximu. Software aktualizován na nejnovější verzi.',
          wizard:
            'Tvá vůle a vytrvalost dnes potvrdily, že jsi mnohem víc než pouhá hmota.',
        },
      },
      stats: {
        totalTime: {
          default: 'Celkový čas',
          byVoice: {
            coachMale: 'Celkový čas dnešní dřiny',
            coachFemale: 'Celkový čas dnešní dřiny',
            briefMale: 'Celkově odmakáno',
            briefFemale: 'Celkově odmakáno',
            calmMale: 'Celkový čas v pohybu',
            calmFemale: 'Celkový čas v pohybu',
          },
          byCharacter: {
            warrior: 'Celkový čas dnešní bitvy',
            shieldmaiden: 'Celkový čas dnešní bitvy',
            cyborg: 'Celková délka procesu',
            wizard: 'Celková doba námahy v časoprostoru',
          },
        },
      },
      buttonLabel: {
        default: 'Hotovo',
        byVoice: {
          coachMale: 'Hotovo',
          coachFemale: 'Hotovo',
          briefMale: 'Hotovo',
          briefFemale: 'Hotovo',
          calmMale: 'Hotovo',
          calmFemale: 'Hotovo',
        },
        byCharacter: {
          warrior: 'Hotovo',
          shieldmaiden: 'Hotovo',
          cyborg: 'Hotovo',
          wizard: 'Hotovo',
        },
      },
      ratingRequest:
        'Endorfiny v žilách? 🔥 Využij vlnu energie a ohodnoť Go&Rest! 💪 Zabere ti to 10 vteřin a nám to strašně pomůže aplikaci dál zlepšovat.',
      ratingRequestThankYou:
        'Skvělé, díky moc! ♥️ Tvoje podpora pro nás hodně znamená.',
      ratingRequestSorry:
        'To nás mrzí!️ Na aplikaci ale neustále makáme a vylepšujeme ji 🛠, tak snad ti příští trénink sedne líp.',
    },
    disclaimerScreen: {
      title: 'Vítej v Go&Rest',
      description:
        'Vstupem do této aplikace a jejím užíváním bereš na vědomí, že veškeré aktivity provádíš na vlastní odpovědnost a riziko. Provozovatel aplikace nenese žádnou odpovědnost za následky plynoucí z jejího užívání. Pokud s těmito podmínkami nesouhlasíš, prosím, aplikaci dál nepoužívej a smaž ji – bez souhlasu ji bohužel nelze používat. Souhlasíš-li se všemi body níže, potvrď svůj souhlas stisknutím tlačítka {{value}} a užij si aplikaci naplno.',
      subTitle: 'Právní informace',
      sections: {
        first: {
          title: '1. Omezení odpovědnosti',
          description:
            'V maximálním rozsahu povoleném rozhodným právem nese výhradní odpovědnost za užívání aplikace uživatel. Provozovatel ani budoucí vlastníci práv nenesou odpovědnost za jakékoli zdravotní následky, úrazy či materiální škody spojené s užíváním obsahu aplikace.',
        },
        second: {
          title: '2. Zdravotní prohlášení',
          description:
            'Uživatel potvrzuje, že je v dobrém zdravotním stavu a jeho fyzická aktivita byla schválena lékařem. Aplikace není náhradou za odbornou lékařskou péči. Při jakýchkoli potížích ihned přestaňte aplikaci používat.',
        },
        third: {
          title: '3. Umělecká nadsázka',
          description:
            'Veškerý audio obsah a postavy v aplikaci jsou fiktivní. Jejich výroky jsou projevem umělecké nadsázky, slouží výhradně k motivaci a nesmí být interpretovány jako odborné rady nebo pokyny k překonávání fyzických limitů přes práh bolesti.',
        },
        fourth: {
          title: '4. Souhlas s užíváním',
          description:
            'Vstupem do aplikace a jejím užíváním potvrzujete, že jste se s těmito podmínkami seznámili, rozumíte jim a v plném rozsahu je přijímáte bez ohledu na případné změny v osobě provozovatele.',
        },
      },
      buttonLabel: 'Souhlasím a chci začít',
    },
  },
} as const satisfies AppTranslations;
