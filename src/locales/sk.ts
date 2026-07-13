import { AppTranslations } from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const sk = {
  common: {
    ok: 'Ok',
    chartEmpty: 'Zatiaľ žiadne dáta na zobrazenie grafu.',
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
    pressAnywhere: 'Klikni kamkoľvek pre potvrdenie 👇',
    adNotAvailablePopUp: {
      title: 'Reklama nie je dostupná',
      description:
        'Je možné, že máš vypnuté personalizované reklamy. Zapni si ich v Nastaveniach → Ostatné a skús to znova.',
    },
    adLoading: 'Pripravujeme reklamu…',
    rpe: {
      easy: 'Pohoda',
      moderate: 'Rozcvička',
      solid: 'Fuška',
      hard: 'Drina',
      max: 'Zabíjačka',
    },
    workoutOutcome: {
      totalTime: 'Odcvičené',
      difficulty: 'Náročnosť',
    },
    paywall: {
      title: 'Go&Rest Premium',
      subtitleFree: 'Odomkni všetko jedným nákupom.',
      subtitlePremium: 'Máš odomknuté všetko. Vďaka za podporu! ♥️',
      benefitHistory: 'História tréningov',
      benefitChart: 'Graf, ako sa mení tvoja náročnosť v čase',
      benefitVoices: 'Všetky prémiové hlasy a postavy',
      benefitNoAds: 'Žiadne reklamy',
      benefitBackup: 'Záloha dát do súboru (JSON)',
      buyButton: 'Kúpiť Premium — {{priceString}}',
      oneTimeNote: 'Jednorazová platba. Žiadne predplatné.',
      restore: 'Obnoviť predchádzajúci nákup',
      activeState: 'PREMIUM AKTÍVNY ✓',
      charSheetUnlock: 'Odomknúť všetko — {{priceString}}',
      errorPopUp: {
        title: 'Nákup sa nepodaril',
        description: 'Skús to prosím znova neskôr.',
      },
      restoreNotFoundPopUp: {
        title: 'Nenašli sme nákup',
        description: 'Na tomto účte sme nenašli žiadny predchádzajúci nákup.',
      },
      successPopUp: {
        title: 'Premium aktívny ✓',
        description: 'Vďaka za podporu! Máš odomknuté všetko.',
      },
      pendingPopUp: {
        title: 'Platba sa spracúva',
        description:
          'Nákup prebehol, ale aktivácia ešte nie je hotová. Skús to o chvíľu cez „Obnoviť predchádzajúci nákup".',
      },
      processing: 'Spracúvame…',
    },
  },
  screens: {
    landingScreen: {
      title: 'Nový tréning',
      selectStoredWorkoutButtonLabel: 'Vybrať z uložených',
      lastRunningWorkoutButtonLabel: 'Opakovať posledný',
      savedWorkoutSubtitle: 'Uložený tréning',
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
        duplicateNameDescription:
          'Tréning „{{name}}" už existuje. Môžeš ho prepísať, alebo zvoliť iný názov.',
        overwriteButtonLabel: 'Prepísať',
        renameButtonLabel: 'Premenovať',
        sameConfigHint: 'Rovnaké nastavenie už máš uložené ako {{names}}.',
        sameConfigHintAndMore: 'a ďalšie',
      },
      rules: {
        required: 'Meno musíš vyplniť...',
        minLength: 'Meno musí obsahovať aspoň {{value}} znaky.',
        maxLength: 'Meno nesmie obsahovať viac ako {{value}} znakov.',
      },
    },
    settingsScreen: {
      title: 'Nastavenia',
      proBannerSubtitle: 'Všetko odomknuté, bez reklám — {{priceString}}',
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
        label: 'Časovač',
        items: {
          keepTimerInBackground: {
            label: 'Beh časovača na pozadí',
            description: 'Časovač zostane aktívny aj po opustení aplikácie',
          },
          warmup: {
            label: 'Príprava',
            description:
              'Čas pred zahájením tréningu, určený na zaujatie východiskovej pozície, prípadne aj na krátke rozcvičenie.',
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
            label: 'Zvuková odozva',
            description:
              'Výber typu zvukových signálov pre kľúčové momenty počas tréningu (napr. oznámenie o polovici, odpočet, začiatok novej fázy).',
            items: {
              voice: 'Štandardné hlasy',
              character: 'Premium hlasy',
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
              briefMale: 'Dušan (stručný)',
              briefFemale: 'Šárka (stručná)',
              calmMale: 'Adam (pokojný)',
              calmFemale: 'Nina (pokojná)',
            },
          },
          characterVariant: {
            label: 'Postava',
            description: 'Vyber si postavu, ktorá ťa bude sprevádzať tréningom',
            items: {
              warrior: 'Bojovník',
              shieldmaiden: 'Štítonoska',
              cyborg: 'Kyborg',
              wizard: 'Čarodejník',
            },
            premiumBottomSheet: {
              title: 'Aktivuj prémiový hlas!',
              titlePremium: 'Vyber postavu',
              description:
                'Chceš prémiový hlas k časovaču? Klikni naň, pozri si krátke video a odomkneš ho na 7 dní zadarmo — alebo si dole odomkni všetko.\n\nIkonou ▷ vpravo si prehráš ukážku. 👉',
              descriptionPremium: 'Máš Premium — všetky postavy sú odomknuté.',
              daysRemaining: {
                lessThanOne: '< 1 deň',
                one: '{{value}} deň',
                few: '{{value}} dni',
                many: '{{value}} dní',
              },
              extendPopUp: {
                title: 'Predĺžiť aktiváciu?',
                description:
                  'Tento hlas je aktívny ešte {{value}}. Pozretím reklamy mu aktiváciu znova nastavíš na 7 dní.',
                selectOnlyButtonLabel: 'Len vybrať',
                extendButtonLabel: 'Predĺžiť',
              },
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
          countdown: {
            label: 'Odpočítavanie konca fázy',
            description:
              'Počet sekúnd pred koncom každej fázy (cvičenie, pauza atď.), kedy ťa každú sekundu upozorní vybraný signál (zvuk, hlas, vibrácie).',
            items: {
              '10': 'Posledných 10 s',
              '5': 'Posledných 5 s',
              '3': 'Posledné 3 s',
              '0': 'Bez odpočítavania',
            },
          },
          vibrations: {
            label: 'Vibrácie',
            description:
              'Aktivácia vibračných signálov pre kľúčové momenty počas tréningu (napr. oznámenie o polovici, odpočet, začiatok novej fázy).',
          },
        },
      },
      backupSection: {
        label: 'Záloha a obnova',
        items: {
          backupData: {
            label: 'Zálohovať dáta',
            description:
              'Ulož históriu tréningov a nastavenia do súboru (JSON).',
            exportValue: 'Export',
          },
          restoreData: {
            label: 'Obnoviť zo zálohy',
            description: 'Načítaj skôr uloženú zálohu zo súboru.',
            importValue: 'Import',
          },
        },
        restoreSheet: {
          title: 'Obnoviť zo zálohy',
          warning:
            'Obnovením prepíšeš aktuálne dáta v aplikácii. Túto akciu nemožno vrátiť späť.',
          rowDate: 'Dátum zálohy',
          rowWorkouts: 'Počet uložených tréningov',
          rowLog: 'Počet záznamov v histórii',
          rowPeriod: 'Obdobie záznamov v histórii',
          dateUnknown: 'neznáme',
          confirm: 'Obnoviť',
          invalidPopUp: {
            title: 'Neplatný súbor',
            description: 'Súbor zálohy sa nepodarilo načítať.',
          },
        },
      },
      otherSection: {
        label: 'Ostatné',
        items: {
          personalizedAds: {
            label: 'Typ reklám',
            description:
              'Ovplyvňuje relevanciu reklám a niekedy aj možnosť ich zobrazenia. Klepnutím možno nastavenie zmeniť.',
            status: {
              personalized: 'Personalizované',
              general: 'Všeobecné',
              limited: 'Obmedzené',
              off: 'Vypnuté',
              unknown: 'Nenastavené',
            },
          },
        },
      },
    },
    runningWorkoutScreen: {
      title: 'Vlastný',
      endWorkoutPopUp: {
        title: 'Ukončenie tréningu',
        description: 'Naozaj chceš ukončiť tréning?',
        positiveButtonLabel: 'Ukončiť',
        negativeButtonLabel: 'Späť',
      },
      totalElapsedTime: 'Celkom',
      descriptionTexts: {
        round: 'Kolo',
        set: 'Séria',
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
    historyScreen: {
      title: 'História',
      premiumOverlayTitle: 'História je súčasť Premium',
      premiumOverlayDescription:
        'Odomkni si príbeh svojich tréningov — graf času a náročnosti a zálohu dát.',
      premiumOverlayUnlock: 'Odomknúť — {{priceString}}',
      weekTitle: 'Tento týždeň',
      streakNone: 'bez streaku',
      streakDays: {
        one: 'deň v rade',
        few: 'dni v rade',
        many: 'dní v rade',
      },
      weekVolume: {
        one: '{{min}} min · {{count}} tréning',
        few: '{{min}} min · {{count}} tréningy',
        many: '{{min}} min · {{count}} tréningov',
      },
      chartTitle: 'Vývoj času',
      chartSubtitle: 'Koľko času si tento týždeň na tréningoch strávil.',
      recentTitle: 'Posledné tréningy',
      rounds: {
        one: '{{count}} kolo',
        few: '{{count}} kolá',
        many: '{{count}} kôl',
      },
      listEmpty: 'Zatiaľ žiadny tréning. Po dokončení sa sem uloží.',
      detailConfigTitle: 'Nastavenie tréningu',
      detailDifficultyChartTitle: 'Náročnosť v čase',
      detailDifficultyChartSubtitle: 'Tréningy s rovnakým nastavením',
      detailDifficultyChartSubtitleNamed: 'Rovnaký tréning „{{name}}“',
      detailSave: 'Uložiť tréning',
    },
    finishedWorkoutScreen: {
      title: {
        default: 'Tréning dokončený!',
        byVoice: {
          coachMale: 'Výborne! Je to tam!',
          coachFemale: 'Výborne! Je to tam!',
          briefMale: 'Pecka! Máme hotovo!',
          briefFemale: 'Pecka! Máme hotovo!',
          calmMale: 'Pekne! Krásna práca',
          calmFemale: 'Pekne! Krásna práca',
        },
        byCharacter: {
          warrior: 'Bitka vybojovaná!',
          shieldmaiden: 'Bitka vybojovaná!',
          cyborg: 'Proces dokončený',
          wizard: 'Dobrá práca, dieťa!',
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
        'Endorfíny v žilách? 🔥 Využi vlnu energie a ohodnoť Go&Rest! 💪 Zaberie ti to 10 sekúnd a nám to strašne pomôže aplikáciu ďalej zlepšovať.',
      ratingRequestThankYou:
        'Skvelé, ďakujeme veľmi pekne! ♥️ Tvoja podpora pre nás veľa znamená.',
      ratingRequestSorry:
        'To nás mrzí! Na aplikácii ale neustále makáme a vylepšujeme ju 🛠️, tak snáď ti budúci tréning sadne lepšie.',
      rpePopupTitle: 'Aké náročné to bolo?',
      rpePopupDescription:
        'Vyber podľa toho, koľko ťa tréning stál fyzických síl.',
      thisWorkoutTitle: 'Tento tréning',
      overallProgressTitle: 'Celkový vývoj',
      historyLink: 'Zobraziť celú históriu',
    },
    disclaimerScreen: {
      title: 'Vitaj v Go&Rest',
      description:
        'Vstupom do tejto aplikácie a jej používaním berieš na vedomie, že všetky aktivity vykonávaš na vlastnú zodpovednosť a riziko. Prevádzkovateľ aplikácie nenesie žiadnu zodpovednosť za následky plynúce z jej používania. Pokiaľ s týmito podmienkami nesúhlasíš, prosím, aplikáciu ďalej nepoužívaj a vymaž ju – bez súhlasu ju bohužiaľ nie je možné používať. Ak súhlasíš so všetkými bodmi nižšie, potvrď svoj súhlas stlačením tlačidla {{value}} a uži si aplikáciu naplno.',
      subTitle: 'Právne informácie',
      sections: {
        first: {
          title: '1. Obmedzenie zodpovednosti',
          description:
            'V maximálnom rozsahu povolenom rozhodným právom nesie výhradnú zodpovednosť za používanie aplikácie používateľ. Prevádzkovateľ ani budúci vlastníci práv nenesú zodpovednosť za akékoľvek zdravotné následky, úrazy či materiálne škody spojené s používaním obsahu aplikácie.',
        },
        second: {
          title: '2. Zdravotné vyhlásenie',
          description:
            'Používateľ potvrdzuje, že je v dobrom zdravotnom stave a jeho fyzická aktivita bola schválená lekárom. Aplikácia nie je náhradou za odbornú lekársku starostlivosť. Pri akýchkoľvek ťažkostiach ihneď prestaňte aplikáciu používať.',
        },
        third: {
          title: '3. Umelecká nadsádzka',
          description:
            'Všetok audio obsah a postavy v aplikácii sú fiktívne. Ich výroky sú prejavom umeleckej nadsádzky, slúžia výhradne na motiváciu a nesmú byť interpretované ako odborné rady alebo pokyny na prekonávanie fyzických limitov cez prah bolesti.',
        },
        fourth: {
          title: '4. Súhlas s používaním',
          description:
            'Vstupom do aplikácie a jej používaním potvrdzujete, že ste sa s týmito podmienkami oboznámili, rozumiete im a v plnom rozsahu ich prijímate bez ohľadu na prípadné zmeny v osobe prevádzkovateľa.',
        },
      },
      buttonLabel: 'Súhlasím a chcem začať',
    },
  },
} as const satisfies AppTranslations;
