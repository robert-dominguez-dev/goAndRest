import {AppTranslations} from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const sk = {
  common: {
    gender: {
      male: 'Muž',
      female: 'Žena',
    },
    role: {
      user: 'Mudrc',
      admin: 'Veľmajster',
    },
  },
  loginScreen: {
    title: 'Kto vie?',
    loginButtonLabel: 'Prihlásiť mudrca',
    registerButtonLabel: 'Vytvoriť mudrca',
    loginBottomSheet: {
      title: 'Prihlásenie mudrca',
      nameInputLabel: 'Zadaj meno mudrca',
      passwordInputLabel: 'Zadaj heslo',
      positiveButtonLabel: 'Prihlásiť',
    },
    registerBottomSheet: {
      title: 'Tvorba mudrca',
      nameInputLabel: 'Pomenuj svojho mudrca',
      passwordInputLabel: 'Vytvor si nové heslo',
      repeatPasswordInputLabel: 'Zadaj vytvorené heslo pre kontrolu',
      genderInputLabel: 'Vyber pohlavia mudrca',
      avatarInputLabel: 'Vyber svojmu mudrcovi vizáž',
      positiveButtonLabel: 'Vytvoriť mudrca',
      passwordsDoNotMatch: 'Asi preklep, heslá sa nezhodujú.',
    },
  },
  landingScreen: {
    title: 'Vítaj',
    createGameButton: 'Vytvoriť hru',
    joinGameButton: 'Pripojiť sa k hre',
    sageBottomSheet: {
      title: 'Nastavenia',
      sage: {
        name: 'Meno',
        role: 'Rola',
        gender: 'Pohlavie',
        elo: 'Elo',
      },
      logOutButtonLabel: 'Odhlásiť mudrcov',
      deleteButtonLabel: 'Zmazať mudrcov',
    },
    deleteSagePopUp: {
      title: 'Naozaj?',
      description:
        'Ak svojho mudrca zmažeš, prídeš o celú jeho históriu vrátane elo hodnotenia. Aj napriek tomu ho chceš zmazať?',
      primaryButtonLabel: 'Preč s ním',
      secondaryButtonLabel: 'Nemazať',
    },
    createGameBottomSheet: {
      title: 'Tvorba hry',
      roundsNumberLabel: 'Vyber počet kôl',
      initialNumberOfSilverPiecesLabel:
        'Vyber počet kúskov striebra do začiatku ({{value}})',
      timeLimitLabel: 'Zadaj časový limit na jednu otázku (v sekundách)',
      colorPickerLabel: 'Vyber si svoju farbu',
      createGameButtonLabel: 'Vytvoriť hru',
    },
    joinGameBottomSheet: {
      title: 'Pripojenie k hre',
      hostUsernameLabel: 'Zadaj meno predsedajúceho mudrca',
      colorPickerLabel: 'Vyber si svoju farbu',
      joinGameButtonLabel: 'Pripojiť sa k hre',
      userIsAlsoHostRuleMessage: 'Nemôžeš sa pripojiť do vlastnej hry',
      gameNotFoundRuleMessage: 'Mudrc {{value}} nevytvoril žiadnu hru.',
    },
  },
  lobbyScreen: {
    title: 'Zhromaždenie',
    descriptionParts: {
      wait: 'Počkaj',
      afterWait: 'až predsedajúci mudrc začne hru',
    },
    enabledButtonLabel: 'Spustiť hru',
    disabledButtonLabel: 'Najskôr počkaj na ostatných',
    exitLobbyPopUp: {
      title: 'Odchádzaš?',
      description:
        'Ak odídeš zo zhromažďovania, môžeš sa znovu pripojiť, kým hra nezačne.',
      primaryButtonLabel: 'Odísť',
      secondaryButtonLabel: 'Zostať',
    },
    exitLobbyAsHostPopUp: {
      title: 'Ukončuješ hru?',
      description:
        'Ty si túto hru založil, takže ak odídeš, hra skončí ešte skôr, než začala.',
      primaryButtonLabel: 'Ukončiť hru',
      secondaryButtonLabel: 'Hrať ďalej',
    },
    exitRunningPopUp: {
      title: 'Si v hre',
      description:
        'Tvoj mudrc je súčasťou bežiacej hry, chceš pokračovať, alebo hru opustiť?',
      primaryButtonLabel: 'Pokračovať',
      secondaryButtonLabel: 'Odísť',
    },
  },
  gameBoardScreen: {
    exitGamePopUp: {
      title: 'Odchádzaš?',
      description:
        'Ak odídeš z hry, tak sa už nebudeš môcť pripojiť. Zároveň kto odíde predčasne, prehral. Je nám ľúto...',
      primaryButtonLabel: 'Odísť',
      secondaryButtonLabel: 'Zostať',
    },
    exitGameAsHostPopUp: {
      title: 'Ukončuješ hru?',
      description:
        'Ty si túto hru založil, takže ak odídeš, hra skončí aj pre všetkých ostatných. Naozaj chceš hru ukončiť?',
      primaryButtonLabel: 'Ukončiť hru',
      secondaryButtonLabel: 'Hrať ďalej',
    },
    exitNotFoundGamePopUp: {
      title: 'Hra bola ukončená',
      description:
        'Hra, ktorej si súčasťou, bola ukončená. Buď odišiel usporiadajúci mudrc, alebo si tu zostal ako posledný.',
    },
    questionSelectionScreen: {
      title: 'Výber otázky',
      description: 'Otázku vyberá',
      enabledButtonLabel: 'Potvrdiť výber témy',
      disabledButtonLabel: 'Najprv vyber tému',
      questionSelectionBottomSheet: {
        title: 'Vyber otázku',
        noQuestionsFoundInCategory:
          'V tejto kategórii neboli nájdené žiadne otázky, vyber si inú.',
        enabledButtonLabel: 'Vybrať otázku',
      },
      waitingForQuestionSelectionBottomSheet: {
        title: 'Čakaj...',
        descriptionParts: {
          beforeUsername: 'Akonáhle mudrc',
          afterUsername:
            'vyberie otázku, zobrazí sa ti časový limit a možnosť odpovedať.',
        },
      },
    },
    answeringScreen: {
      title: 'Odpovedanie',
      questionAnsweringBottomSheet: {
        title: 'Zadaj včas odpoveď ',
        category: 'Kategória:',
        enabledButtonLabel: 'Potvrdiť odpoveď',
      },
      waitingForQuestionAnsweringBottomSheet: {
        title: 'Čakaj...',
        description:
          'Akonáhle odpovie všetci mudrci, zobrazí sa ti možnosť staviť kúsky striebra na toho, komu v tejto otázke najviac dôveruješ.',
      },
    },
    bettingScreen: {
      title: 'Stávkovanie',
      descriptionParts: {
        before: 'Vyber mudrca',
        after: 'na ktorého chceš staviť',
      },
      bettingBottomSheet: {
        title: 'Staviť na',
        titleHimself: 'Staviť na seba',
        descriptionParts: {
          beforeUsername: 'Koľko kúskov striebra chceš staviť na to, že',
          afterUsername: 'napísal najpresnejšiu odpoveď?',
        },
        descriptionHimself:
          'Koľko kúskov striebra chceš staviť na to, že si ty napísal najpresnejšiu odpoveď?',
        enabledButtonLabel: 'Vsadiť {{value}} kúskov striebra',
      },
      doNotBetButtonLabel: 'Toto kolo nevsádzať',
      waitingForBettingBottomSheet: {
        title: 'Čakaj...',
        description:
          'Akonáhle dokončia stávky všetci mudrci, zobrazí sa ti vyhodnotenie.',
      },
      waitingForBettingWithNoSilverPiecesBottomSheet: {
        title: 'Čakaj...',
        description:
          'Momentálne máš trochu hlbšie do vrecka, takže nemáš čo staviť, ale aj tak musíš počkať, kým si stavia ostatní mudrci.',
      },
    },
    evaluationScreen: {
      title: 'Vyhodnotenie',
      titleWinner: 'Gratulujeme!',
      descriptionParts: {
        beforeCorrectAnswer: 'Správna odpoveď je',
        afterCorrectAnswer: 'a najpresnejšie odpovedal',
        afterCorrectAnswerWinner: 'a ty si odpovedal najpresnejšie',
      },
      underEvaluationDescription:
        '...teraz počkaj, až predsedajúci mudrc začne ďalšie kolo',
      enabledButtonLabel: 'Začať ďalšie kolo',
      enabledLastEvaluationButtonLabel: 'Zobraziť výsledky hry',
      columns: {
        name: 'Meno',
        answer: 'Odpoveď',
        bets: 'Stávky',
        movements: 'Pohyby',
      },
    },
    gameResultsScreen: {
      title: 'Výsledky hry',
      winnerDescriptionParts: {
        before: 'Gratulujeme,',
        after: 'túto hru si vyhral!',
      },
      eloTitle: 'Celkové ELO hodnotenie',
      enabledButtonLabel: 'Spokojne odísť',
    },
  },
  questionCategories: {
    bible: 'Bible',
    history: 'História',
    earth: 'Krajina',
    universe: 'Vesmír',
    technology: 'Technológia',
  },
  rules: {
    required: 'Kde nič nie je, ani smrť neberie, ale toto pole potrebujeme.',
    max: 'Trochu uber. Maximálna hodnota je {{value}}.',
    min: 'Trochu pridaj. Minimálna hodnota je {{value}}.',
    maxLength: 'Niečo smaž. Maximálny počet znakov je {{value}}.',
    minLength: 'Niečo pripíš. Minimálny počet znakov je {{value}}.',
    isNumber: 'Máme podozrenie, že "{{value}}" nie je číslo.',
    username: 'Poprosíme len písmená, čísla alebo podčiarknutie.',
    password: 'Nie, žiadne medzery...',
  },
  errors: {
    unknown: 'Hmm... Niečo je zle, ale nevieme čo.',
    database: 'Niečo niečo databázy... Neskúšaš treba uložiť 2x rovnakú vec?',
    badAuthorization:
      'Nejako ťa máme rozmazane... Skús sa odhlásiť a znovu prihlásiť.',
    itemNotFound: 'Žial, niečo, čo sme mali nájsť, sme nenašli...',
    noFreshQuestionsInCategory:
      'V tejto kategórii už nemáme žiadnu otázku, ktorú by niektorý mudrc už nezodpovedal. Vyber inú.',
    gameIsFull: 'V hre už je maximálny počet hráčov.',
    userAlreadyExists: 'Mudrc s týmto menom už existuje.',
    wrongCredentials: 'Niečo tu nehrá... Meno alebo heslo je zle.',
  },
  fillFirst: 'Najprv vyplň',
  selectFirst: 'Najprv vyber',
  continue: 'Pokračovať',
  ok: 'Ok',
  cancel: 'Zrušiť',
  me: 'Ja',
  and: 'a',
} as const satisfies AppTranslations;
