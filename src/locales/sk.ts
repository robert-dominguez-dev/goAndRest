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
    paywall: {
      title: 'Go&Rest Premium',
      subtitleFree: 'Odomkni všetko. Raz a navždy.',
      subtitlePremium: 'Máš odomknuté všetko. Vďaka za podporu! ♥️',
      benefitHistory: 'História tréningov',
      benefitChart: 'Graf, ako sa mení tvoja náročnosť v čase',
      benefitVoices: 'Všetky prémiové hlasy a postavy — navždy',
      benefitNoAds: 'Žiadne reklamy',
      benefitBackup: 'Záloha dát do súboru (JSON)',
      buyButton: 'Kúpiť navždy — {{priceString}}',
      oneTimeNote: 'Jednorazová platba. Žiadne predplatné.',
      restore: 'Obnoviť predchádzajúci nákup',
      activeState: 'PREMIUM AKTÍVNY ✓',
      charSheetUnlock: 'Odomknúť všetko navždy — {{priceString}}',
      errorPopUp: {
        title: 'Nákup sa nepodaril',
        description: 'Skús to prosím znova neskôr.',
      },
      restoreNotFoundPopUp: {
        title: 'Nenašli sme nákup',
        description: 'Na tomto účte sme nenašli žiadny predchádzajúci nákup.',
      },
    },
  },
  screens: {
    landingScreen: {
      title: 'Nový tréning',
      selectStoredWorkoutButtonLabel: 'Vybrať z uložených',
      lastRunningWorkoutButtonLabel: 'Opakovať posledný',
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
      proBannerSubtitle: 'Všetko navždy, bez reklám — {{priceString}}',
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
                'Chceš prémiový hlas k časovaču? Klikni naň, pozri si krátke video a odomkneš ho na 7 dní zadarmo — alebo si dole odomkni všetko navždy.\n\nIkonou ▷ vpravo si prehráš ukážku. 👉',
              descriptionPremium:
                'Máš Premium — všetky postavy sú odomknuté natrvalo.',
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
        'Odomkni si príbeh svojich tréningov — graf času a náročnosti, kalendár a zálohu dát.',
      premiumOverlayUnlock: 'Odomknúť — {{priceString}}',
      weekTitle: 'Tento týždeň',
      streakNone: 'bez streaku',
      streakDays: {
        one: '{{count}} deň v rade',
        few: '{{count}} dni v rade',
        many: '{{count}} dní v rade',
      },
      weekVolume: {
        one: '{{min}} min · {{count}} tréning',
        few: '{{min}} min · {{count}} tréningy',
        many: '{{min}} min · {{count}} tréningov',
      },
      chartTitle: 'Čas a náročnosť v čase',
      legendTime: 'Čas',
      legendDifficulty: 'Náročnosť',
      chartEmpty: 'Ohodnoť pár tréningov škálou a uvidíš tu svoj vývoj.',
      recentTitle: 'Posledné tréningy',
      rounds: {
        one: '{{count}} kolo',
        few: '{{count}} kolá',
        many: '{{count}} kôl',
      },
      listEmpty: 'Zatiaľ žiadny tréning. Po dokončení sa sem uloží.',
      detailTotalTime: 'Celkový čas',
      detailDifficulty: 'Náročnosť',
      detailRoundsTile: 'kôl',
      detailMinutesTile: 'min',
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
      description: {
        default: 'Skvelá práca. Máš za sebou ďalší kvalitný tréning.',
        byVoice: {
          coachMale: 'Dnes to bol špičkový výkon. Len tak ďalej!',
          coachFemale: 'Dnes to bol špičkový výkon. Len tak ďalej!',
          briefMale:
            'Dobre ty! Máš to za sebou, teraz si choď poriadne oddýchnuť.',
          briefFemale:
            'Dobre ty! Máš to za sebou, teraz si choď poriadne oddýchnuť.',
          calmMale:
            'Uži si ten pokoj a dojem z celého cvičenia. Bol to dobre využitý čas.',
          calmFemale:
            'Uži si ten pokoj a dojem z celého cvičenia. Bol to dobre využitý čas.',
        },
        byCharacter: {
          warrior:
            'Tak to bola rež. Niet nad poriadny nárez! Len tak ďalej, bojovník!',
          shieldmaiden:
            'Tak to bola rež. Niet nad poriadny nárez! Len tak ďalej, bojovník!',
          cyborg:
            'Hardvérové limity posunuté. Systémová integrita na maxime. Softvér aktualizovaný na novú verziu.',
          wizard:
            'Tvoja vôľa a vytrvalosť dnes potvrdili, že si oveľa viac než len pouhá hmota.',
        },
      },
      stats: {
        totalTime: {
          default: 'Celkový čas',
          byVoice: {
            coachMale: 'Celkový čas dnešnej driny',
            coachFemale: 'Celkový čas dnešnej driny',
            briefMale: 'Celkovo odmakané',
            briefFemale: 'Celkovo odmakané',
            calmMale: 'Celkový čas v pohybe',
            calmFemale: 'Celkový čas v pohybu',
          },
          byCharacter: {
            warrior: 'Celkový čas dnešnej bitky',
            shieldmaiden: 'Celkový čas dnešnej bitky',
            cyborg: 'Celková dĺžka procesu',
            wizard: 'Celková doba námahy v časopriestore',
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
        'Endorfíny v žilách? 🔥 Využi vlnu energie a ohodnoť Go&Rest! 💪 Zaberie ti to 10 sekúnd a nám to strašne pomôže aplikáciu ďalej zlepšovať.',
      ratingRequestThankYou:
        'Skvelé, ďakujeme veľmi pekne! ♥️ Tvoja podpora pre nás veľa znamená.',
      ratingRequestSorry:
        'To nás mrzí! Na aplikácii ale neustále makáme a vylepšujeme ju 🛠️, tak snáď ti budúci tréning sadne lepšie.',
      rpePopupTitle: 'Aké náročné to bolo?',
      rpePopupDescription:
        'Vyber podľa toho, koľko ťa tréning stál fyzických síl.',
      difficultyLabel: 'Náročnosť',
      streakStart: 'Začni streak!',
      weekTileLabel: 'tento týždeň · {{min}} min',
      historyLinkPremium: 'História a vývoj náročnosti',
      historyLinkFree: 'História, kalendár a vývoj náročnosti',
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
