import {AppTranslations} from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const cs = {
  common: {
    gender: {
      male: 'Muž',
      female: 'Žena',
    },
    role: {
      user: 'Mudrc',
      admin: 'Velmistr',
    },
  },
  loginScreen: {
    title: 'Kdo ví?',
    loginButtonLabel: 'Přihlásit mudrce',
    registerButtonLabel: 'Vytvořit mudrce',
    loginBottomSheet: {
      title: 'Přihlášení mudrce',
      nameInputLabel: 'Zadej jméno mudrce',
      passwordInputLabel: 'Zadej heslo',
      positiveButtonLabel: 'Přihlásit',
    },
    registerBottomSheet: {
      title: 'Tvorba mudrce',
      nameInputLabel: 'Pojmenuj svého mudrce',
      passwordInputLabel: 'Vytvoř si nové heslo',
      repeatPasswordInputLabel: 'Zadej vytvořené heslo pro kontrolu',
      genderInputLabel: 'Vyber pohlaví mudrce',
      avatarInputLabel: 'Vyber svému mudrci vizáž',
      positiveButtonLabel: 'Vytvořit mudrce',
      passwordsDoNotMatch: 'Asi překlep, hesla se neshodují.',
    },
  },
  landingScreen: {
    title: 'Vítej',
    createGameButton: 'Vytvořit hru',
    joinGameButton: 'Připojit se ke hře',
    sageBottomSheet: {
      title: 'Nastavení',
      sage: {
        name: 'Jméno',
        role: 'Role',
        gender: 'Pohlaví',
        elo: 'Elo',
      },
      logOutButtonLabel: 'Odhlásit mudrce',
      deleteButtonLabel: 'Smazat mudrce',
    },
    deleteSagePopUp: {
      title: 'Opravdu?',
      description:
        'Pokud svého mudrce smažeš, přijdeš o celou jeho historii včetně elo hodnocení. I přesto jej chceš smazat?',
      primaryButtonLabel: 'Pryč s ním',
      secondaryButtonLabel: 'Nemazat',
    },
    createGameBottomSheet: {
      title: 'Tvorba hry',
      roundsNumberLabel: 'Vyber počet kol',
      initialNumberOfSilverPiecesLabel:
        'Vyber počet kousků stříbra do začátku ({{value}})',
      timeLimitLabel: 'Zadej časový limit na jednu otázku (v sekundách)',
      colorPickerLabel: 'Vyber si svoji barvu',
      createGameButtonLabel: 'Vytvořit hru',
    },
    joinGameBottomSheet: {
      title: 'Připojení ke hře',
      hostUsernameLabel: 'Zadej jméno předsedajícího mudrce',
      colorPickerLabel: 'Vyber si svoji barvu',
      joinGameButtonLabel: 'Připojit se ke hře',
      userIsAlsoHostRuleMessage: 'Nemůžeš se připojit do vlastní hry',
      gameNotFoundRuleMessage: 'Mudrc {{value}} nevytvořil žádnou hru.',
    },
  },
  lobbyScreen: {
    title: 'Shromažďování',
    descriptionParts: {
      wait: 'Počkej',
      afterWait: 'až předsedající mudrc zahájí hru',
    },
    enabledButtonLabel: 'Začít hru',
    disabledButtonLabel: 'Nejprve počkej na ostatní',
    exitLobbyPopUp: {
      title: 'Odcházíš?',
      description:
        'Pokud odejdeš ze shromažďování, můžeš se znovu připojit, dokud hra nezačne.',
      primaryButtonLabel: 'Odejít',
      secondaryButtonLabel: 'Zůstat',
    },
    exitLobbyAsHostPopUp: {
      title: 'Ukončuješ hru?',
      description:
        'Ty jsi tuto hru založil, takže pokud odejdeš, hra skončí ještě dřív, než začala.',
      primaryButtonLabel: 'Ukončit hru',
      secondaryButtonLabel: 'Hrát dál',
    },
    exitRunningPopUp: {
      title: 'Jsi ve hře',
      description:
        'Tvůj mudrc je součástí běžící hry, chceš pokračovat, nebo hru opustit?',
      primaryButtonLabel: 'Pokračovat',
      secondaryButtonLabel: 'Odejít',
    },
  },
  gameBoardScreen: {
    exitGamePopUp: {
      title: 'Odcházíš?',
      description:
        'Pokud odejdeš ze hry, tak se už nebudeš moci připojit. Zároveň kdo odejde předčasně, prohrál. Je nám líto...',
      primaryButtonLabel: 'Odejít',
      secondaryButtonLabel: 'Zůstat',
    },
    exitGameAsHostPopUp: {
      title: 'Ukončuješ hru?',
      description:
        'Ty jsi tuto hru založil, takže pokud odejdeš, hra skončí i pro všechny ostatní. Opravdu chceš hru ukončit?',
      primaryButtonLabel: 'Ukončit hru',
      secondaryButtonLabel: 'Hrát dál',
    },
    exitNotFoundGamePopUp: {
      title: 'Hra byla ukončena',
      description:
        'Hra, které jsi součástí, byla ukončena. Buď odešel pořádající mudrc, nebo jsi tu zůstal jako poslední.',
    },
    questionSelectionScreen: {
      title: 'Výběr otázky',
      description: 'Otázku vybírá',
      enabledButtonLabel: 'Potvrdit výběr tématu',
      disabledButtonLabel: 'Nejprve vyber téma',
      questionSelectionBottomSheet: {
        title: 'Vyber otázku',
        noQuestionsFoundInCategory:
          'V této kategorii nebyly nalezeny žádné otázky, vyber si jinou.',
        enabledButtonLabel: 'Vybrat otázku',
      },
      waitingForQuestionSelectionBottomSheet: {
        title: 'Čekej...',
        descriptionParts: {
          beforeUsername: 'Jakmile mudrc',
          afterUsername:
            'vybere otázku, zobrazí se ti časový limit a možnost odpovědět.',
        },
      },
    },
    answeringScreen: {
      title: 'Odpovídání',
      questionAnsweringBottomSheet: {
        title: 'Zadej včas odpověď ',
        category: 'Kategorie:',
        enabledButtonLabel: 'Potvrdit odpověď',
      },
      waitingForQuestionAnsweringBottomSheet: {
        title: 'Čekej...',
        description:
          'Jakmile odpoví všichni mudrci, zobrazí se ti možnost vsadit kousky stříbra na toho, komu v této otázce nejvíce důvěřuješ.',
      },
    },
    bettingScreen: {
      title: 'Sázení',
      descriptionParts: {
        before: 'Vyber mudrce',
        after: 'na kterého chceš vsadit',
      },
      bettingBottomSheet: {
        title: 'Vsadit na',
        titleHimself: 'Vsadit na sebe',
        descriptionParts: {
          beforeUsername: 'Kolik kousků stříbra chceš vsadit na to, že',
          afterUsername: 'napsal nejpřesnější odpověď?',
        },
        descriptionHimself:
          'Kolik kousků stříbra chceš vsadit na to, žes ty napsal nejpřesnější odpověď?',
        enabledButtonLabel: 'Vsadit {{value}} kousků stříbra',
      },
      doNotBetButtonLabel: 'Toto kolo nevsázet',
      waitingForBettingBottomSheet: {
        title: 'Čekej...',
        description:
          'Jakmile dokončí sázky všichni mudrci, zobrazí se ti vyhodnocení.',
      },
      waitingForBettingWithNoSilverPiecesBottomSheet: {
        title: 'Čekej...',
        description:
          'Momentálně máš trochu hlouběji do kapsy, takže nemáš co vsadit, ale i tak musíš počkat, než si vsadí ostatní mudrci.',
      },
    },
    evaluationScreen: {
      title: 'Vyhodnocení',
      titleWinner: 'Gratulujeme!',
      descriptionParts: {
        beforeCorrectAnswer: 'Správná odpověď je',
        afterCorrectAnswer: 'a nejpřesněji odpověděl',
        afterCorrectAnswerWinner: 'a ty jsi odpověděl nejpřesněji',
      },
      underEvaluationDescription:
        '...nyní počkej, až předsedající mudrc zahájí další kolo',
      enabledButtonLabel: 'Zahájit další kolo',
      enabledLastEvaluationButtonLabel: 'Zobrazit výsledky hry',
      columns: {
        name: 'Jméno',
        answer: 'Odpověď',
        bets: 'Sázky',
        movements: 'Pohyby',
      },
    },
    gameResultsScreen: {
      title: 'Výsledky hry',
      winnerDescriptionParts: {
        before: 'Gratulujeme,',
        after: 'tuto hru jsi vyhrál!',
      },
      eloTitle: 'Celkové ELO hodnocení',
      enabledButtonLabel: 'Spokojeně odejít',
    },
  },
  questionCategories: {
    bible: 'Bible',
    history: 'Historie',
    earth: 'Zěmě',
    universe: 'Vesmír',
    technology: 'Technologie',
  },
  rules: {
    required: 'Kde nic není, ani smrt nebere, ale tohle pole potřebujeme.',
    max: 'Trochu uber. Maximální hodnota je {{value}}.',
    min: 'Trochu přidej. Minimální hodnota je {{value}}.',
    maxLength: 'Něco smaž. Maximální počet znaků je {{value}}.',
    minLength: 'Něco připiš. Minimální počet znaků je {{value}}.',
    isNumber: 'Máme podezření, že "{{value}}" není číslo.',
    username: 'Poprosíme jen písmena, čísla nebo podtržítko.',
    password: 'Nene, žádné mezery...',
  },
  errors: {
    unknown: 'Hmm... Něco je špatně, ale nevíme co.',
    database: 'Něco něco databáze... Nezkoušíš třeba uložit 2x stejnou věc?',
    badAuthorization:
      'Nějak tě máme rozmazaně... Zkus se odhlásit a znovu přihlásit.',
    itemNotFound: 'Žel, něco, co jsme měli najít, jsme nenašli...',
    noFreshQuestionsInCategory:
      'V této kategorii už nemáme žádnou otázku, kterou by některý mudrc již nezodpověděl. Vyber jinou.',
    gameIsFull: 'Ve hře již je maximální počet hráčů.',
    userAlreadyExists: 'Mudrc s tímto jménem již existuje.',
    wrongCredentials: 'Něco tu nehraje... Jméno nebo heslo je špatně.',
  },
  fillFirst: 'Najprve vyplň',
  selectFirst: 'Nejprve vyber',
  continue: 'Pokračovat',
  ok: 'Ok',
  cancel: 'Zrušit',
  me: 'Já',
  and: 'a',
} as const satisfies AppTranslations;
