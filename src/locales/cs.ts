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
      description:
        'Je možné, že máš vypnuté personalizované reklamy. Zapni je v Nastavení → Ostatní a zkus to znovu.',
    },
    adLoading: 'Připravujeme reklamu…',
    rpe: {
      easy: 'Pohoda',
      moderate: 'Zahřívačka',
      solid: 'Fuška',
      hard: 'Dřina',
      max: 'Zabijačka',
    },
    workoutOutcome: {
      totalTime: 'Odcvičeno',
      difficulty: 'Náročnost',
    },
    paywall: {
      title: 'Go&Rest Premium',
      subtitleFree: 'Odemkni vše jedním nákupem.',
      subtitlePremium: 'Máš odemčeno vše. Díky za podporu! ♥️',
      benefitHistory: 'Historie tréninků',
      benefitChart: 'Graf, jak se mění tvoje náročnost v čase',
      benefitVoices: 'Všechny prémiové hlasy a postavy',
      benefitNoAds: 'Žádné reklamy',
      benefitBackup: 'Záloha dat do souboru (JSON)',
      buyButton: 'Koupit Premium — {{priceString}}',
      oneTimeNote: 'Jednorázová platba. Žádné předplatné.',
      restore: 'Obnovit dřívější nákup',
      activeState: 'PREMIUM AKTIVNÍ ✓',
      charSheetUnlock: 'Odemknout vše — {{priceString}}',
      errorPopUp: {
        title: 'Nákup se nezdařil',
        description: 'Zkus to prosím znovu později.',
      },
      restoreNotFoundPopUp: {
        title: 'Nenašli jsme nákup',
        description: 'Na tomto účtu jsme nenašli žádný předchozí nákup.',
      },
      successPopUp: {
        title: 'Premium aktivní ✓',
        description: 'Díky za podporu! Máš odemčeno vše.',
      },
      pendingPopUp: {
        title: 'Platba se zpracovává',
        description:
          'Nákup proběhl, ale aktivace ještě není hotová. Zkus to za chvíli přes „Obnovit dřívější nákup".',
      },
      processing: 'Zpracováváme…',
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
      proBannerSubtitle: 'Vše odemčené, bez reklam — {{priceString}}',
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
              titlePremium: 'Vyber postavu',
              description:
                'Chceš prémiový hlas k časovači? Klepni na něj, zhlédni krátké video a odemkneš ho na 7 dní zdarma — nebo si dole odemkni vše.\n\nIkonou ▷ vpravo si přehraješ ukázku. 👉',
              descriptionPremium:
                'Máš Premium — všechny postavy jsou odemčené.',
              daysRemaining: {
                lessThanOne: '< 1 den',
                one: '{{value}} den',
                few: '{{value}} dny',
                many: '{{value}} dní',
              },
              extendPopUp: {
                title: 'Prodloužit aktivaci?',
                description:
                  'Tenhle hlas máš aktivní ještě {{value}}. Zhlédnutím reklamy mu aktivaci nastavíš znovu na 7 dní.',
                selectOnlyButtonLabel: 'Jen vybrat',
                extendButtonLabel: 'Prodloužit',
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
      backupSection: {
        label: 'Záloha a obnova',
        items: {
          backupData: {
            label: 'Zálohovat data',
            description:
              'Ulož historii tréninků a nastavení do souboru (JSON).',
            exportValue: 'Export',
          },
          restoreData: {
            label: 'Obnovit ze zálohy',
            description: 'Načti dřív uloženou zálohu ze souboru.',
            importValue: 'Import',
          },
        },
        restoreSheet: {
          title: 'Obnovit ze zálohy',
          warning:
            'Obnovením přepíšeš aktuální data v aplikaci. Tuto akci nelze vzít zpět.',
          rowDate: 'Datum zálohy',
          rowWorkouts: 'Počet uložených tréninků',
          rowLog: 'Počet záznamů v historii',
          rowPeriod: 'Období záznamů v historii',
          dateUnknown: 'neznámé',
          confirm: 'Obnovit',
          invalidPopUp: {
            title: 'Neplatný soubor',
            description: 'Soubor zálohy se nepodařilo načíst.',
          },
        },
      },
      otherSection: {
        label: 'Ostatní',
        items: {
          personalizedAds: {
            label: 'Typ reklam',
            description:
              'Ovlivňuje relevanci reklam a někdy i možnost jejich zobrazení. Klepnutím lze nastavení změnit.',
            status: {
              personalized: 'Personalizované',
              general: 'Obecné',
              limited: 'Omezené',
              off: 'Vypnuté',
              unknown: 'Nenastaveno',
            },
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
    historyScreen: {
      title: 'Historie',
      premiumOverlayTitle: 'Historie je součást Premium',
      premiumOverlayDescription:
        'Odemkni si příběh svých tréninků — graf času a náročnosti a zálohu dat.',
      premiumOverlayUnlock: 'Odemknout — {{priceString}}',
      weekTitle: 'Tento týden',
      streakNone: 'bez streaku',
      streakDays: {
        one: 'den v řadě',
        few: 'dny v řadě',
        many: 'dní v řadě',
      },
      weekVolume: {
        one: '{{min}} min · {{count}} trénink',
        few: '{{min}} min · {{count}} tréninky',
        many: '{{min}} min · {{count}} tréninků',
      },
      chartTitle: 'Vývoj času',
      chartSubtitle: 'Kolik času jsi tento týden na trénincích strávil.',
      chartEmpty: 'Ohodnoť pár tréninků škálou a uvidíš tu svůj vývoj.',
      recentTitle: 'Poslední tréninky',
      rounds: {
        one: '{{count}} kolo',
        few: '{{count}} kola',
        many: '{{count}} kol',
      },
      listEmpty: 'Zatím žádný trénink. Po dokončení se sem uloží.',
      detailConfigTitle: 'Nastavení tréninku',
      detailDifficultyChartTitle: 'Náročnost v čase',
      detailDifficultyChartSubtitle: 'Tréninky se stejným nastavením',
      detailDifficultyChartSubtitleNamed: 'Stejný trénink „{{name}}“',
      detailDifficultyChartEmpty:
        'Zatím není s čím porovnávat — dokonči víc stejných tréninků.',
      detailSave: 'Uložit',
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
      rpePopupTitle: 'Jak náročné to bylo?',
      rpePopupDescription:
        'Vyber podle toho, kolik tě trénink stál fyzických sil.',
      thisWorkoutTitle: 'Tento trénink',
      overallProgressTitle: 'Celkový vývoj',
      historyLink: 'Zobrazit celou historii',
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
