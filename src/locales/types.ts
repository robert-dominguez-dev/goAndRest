import { NestedKeys } from '../types/magic.ts';
import { TOptionsBase } from 'i18next';

export type AppTranslations = {
  common: {
    gender: {
      male: string;
      female: string;
    };
    role: {
      user: string;
      admin: string;
    };
  };
  loginScreen: {
    title: string;
    loginButtonLabel: string;
    registerButtonLabel: string;
    loginBottomSheet: {
      title: string;
      nameInputLabel: string;
      passwordInputLabel: string;
      positiveButtonLabel: string;
    };
    registerBottomSheet: {
      title: string;
      nameInputLabel: string;
      passwordInputLabel: string;
      repeatPasswordInputLabel: string;
      genderInputLabel: string;
      avatarInputLabel: string;
      positiveButtonLabel: string;
      passwordsDoNotMatch: string;
    };
  };
  landingScreen: {
    title: string;
    createGameButton: string;
    joinGameButton: string;
    sageBottomSheet: {
      title: string;
      sage: {
        name: string;
        role: string;
        gender: string;
        elo: string;
      };
      logOutButtonLabel: string;
      deleteButtonLabel: string;
    };
    deleteSagePopUp: {
      title: string;
      description: string;
      primaryButtonLabel: string;
      secondaryButtonLabel: string;
    };
    createGameBottomSheet: {
      title: string;
      roundsNumberLabel: string;
      initialNumberOfSilverPiecesLabel: string;
      timeLimitLabel: string;
      colorPickerLabel: string;
      createGameButtonLabel: string;
    };
    joinGameBottomSheet: {
      title: string;
      hostUsernameLabel: string;
      colorPickerLabel: string;
      joinGameButtonLabel: string;
      userIsAlsoHostRuleMessage: string;
      gameNotFoundRuleMessage: string;
    };
  };
  lobbyScreen: {
    title: string;
    descriptionParts: {
      wait: string;
      afterWait: string;
    };
    enabledButtonLabel: string;
    disabledButtonLabel: string;
    exitLobbyPopUp: {
      title: string;
      description: string;
      primaryButtonLabel: string;
      secondaryButtonLabel: string;
    };
    exitLobbyAsHostPopUp: {
      title: string;
      description: string;
      primaryButtonLabel: string;
      secondaryButtonLabel: string;
    };
    exitRunningPopUp: {
      title: string;
      description: string;
      primaryButtonLabel: string;
      secondaryButtonLabel: string;
    };
  };
  gameBoardScreen: {
    exitGamePopUp: {
      title: string;
      description: string;
      primaryButtonLabel: string;
      secondaryButtonLabel: string;
    };
    exitGameAsHostPopUp: {
      title: string;
      description: string;
      primaryButtonLabel: string;
      secondaryButtonLabel: string;
    };
    exitNotFoundGamePopUp: {
      title: string;
      description: string;
    };
    questionSelectionScreen: {
      title: string;
      description: string;
      enabledButtonLabel: string;
      disabledButtonLabel: string;
      questionSelectionBottomSheet: {
        title: string;
        noQuestionsFoundInCategory: string;
        enabledButtonLabel: string;
      };
      waitingForQuestionSelectionBottomSheet: {
        title: string;
        descriptionParts: {
          beforeUsername: string;
          afterUsername: string;
        };
      };
    };
    answeringScreen: {
      title: string;
      questionAnsweringBottomSheet: {
        title: string;
        category: string;
        enabledButtonLabel: string;
      };
      waitingForQuestionAnsweringBottomSheet: {
        title: string;
        description: string;
      };
    };
    bettingScreen: {
      title: string;
      descriptionParts: {
        before: string;
        after: string;
      };
      bettingBottomSheet: {
        title: string;
        titleHimself: string;
        descriptionParts: {
          beforeUsername: string;
          afterUsername: string;
        };
        descriptionHimself: string;
        enabledButtonLabel: string;
      };
      doNotBetButtonLabel: string;
      waitingForBettingBottomSheet: {
        title: string;
        description: string;
      };
      waitingForBettingWithNoSilverPiecesBottomSheet: {
        title: string;
        description: string;
      };
    };
    evaluationScreen: {
      title: string;
      titleWinner: string;
      descriptionParts: {
        beforeCorrectAnswer: string;
        afterCorrectAnswer: string;
        afterCorrectAnswerWinner: string;
      };
      underEvaluationDescription: string;
      enabledButtonLabel: string;
      enabledLastEvaluationButtonLabel: string;
      columns: {
        name: string;
        answer: string;
        bets: string;
        movements: string;
      };
    };
    gameResultsScreen: {
      title: string;
      winnerDescriptionParts: {
        before: string;
        after: string;
      };
      eloTitle: string;
      enabledButtonLabel: string;
    };
  };
  questionCategories: {
    bible: string;
    history: string;
    earth: string;
    universe: string;
    technology: string;
  };
  rules: {
    required: string;
    max: string;
    min: string;
    maxLength: string;
    minLength: string;
    isNumber: string;
    username: string;
    password: string;
  };
  errors: {
    unknown: string;
    database: string;
    badAuthorization: string;
    itemNotFound: string;
    noFreshQuestionsInCategory: string;
    gameIsFull: string;
    userAlreadyExists: string;
    wrongCredentials: string;
  };
  fillFirst: string;
  selectFirst: string;
  continue: string;
  ok: string;
  cancel: string;
  me: string;
  and: string;
};

export type TranslateKey = NestedKeys<AppTranslations>;

type DefaultTranslationParams = { value: string };

export type TranslationOptions = Pick<TOptionsBase, 'count' | 'returnObjects'> &
  Record<string, string | number> &
  DefaultTranslationParams;
