import {AppTranslations} from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const en = {
  common: {
    gender: {
      male: 'Male',
      female: 'Female',
    },
    role: {
      user: 'Sage',
      admin: 'Grandmaster',
    },
  },
  loginScreen: {
    title: 'Who’s Right?',
    loginButtonLabel: 'Login Sage',
    registerButtonLabel: 'Create Sage',
    loginBottomSheet: {
      title: 'Login Sage',
      nameInputLabel: "Enter Sage's name",
      passwordInputLabel: 'Enter password',
      positiveButtonLabel: 'Login',
    },
    registerBottomSheet: {
      title: 'Create Sage',
      nameInputLabel: 'Name your Sage',
      passwordInputLabel: 'Create a new password',
      repeatPasswordInputLabel: 'Enter the created password for verification',
      genderInputLabel: "Select Sage's gender",
      avatarInputLabel: "Select your Sage's appearance",
      positiveButtonLabel: 'Create Sage',
      passwordsDoNotMatch: "Probably a typo, the passwords don't match.",
    },
  },
  landingScreen: {
    title: 'Welcome',
    createGameButton: 'Create game',
    joinGameButton: 'Join game',
    sageBottomSheet: {
      title: 'Settings',
      sage: {
        name: 'Name',
        role: 'Role',
        gender: 'Gender',
        elo: 'Elo',
      },
      logOutButtonLabel: 'Log Out Sage',
      deleteButtonLabel: 'Delete Sage',
    },
    deleteSagePopUp: {
      title: 'Really?',
      description:
        'If you delete your sage, you will lose all of their history including their elo rating. Do you still want to delete them?',
      primaryButtonLabel: 'Get rid of them',
      secondaryButtonLabel: "Don't delete",
    },
    createGameBottomSheet: {
      title: 'Create a game',
      roundsNumberLabel: 'Select number of rounds',
      initialNumberOfSilverPiecesLabel:
        'Select number of pieces of silver to start ({{value}})',
      timeLimitLabel: 'Enter time limit per question (in seconds)',
      colorPickerLabel: 'Choose your color',
      createGameButtonLabel: 'Create game',
    },
    joinGameBottomSheet: {
      title: 'Join a game',
      hostUsernameLabel: 'Enter the name of the presiding sage',
      colorPickerLabel: 'Choose your color',
      joinGameButtonLabel: 'Join the game',
      userIsAlsoHostRuleMessage: 'You cannot join your own game',
      gameNotFoundRuleMessage: 'Sage {{value}} did not create any game.',
    },
  },
  lobbyScreen: {
    title: 'Gathering',
    descriptionParts: {
      wait: 'Wait',
      afterWait: 'until the presiding sage starts the game',
    },
    enabledButtonLabel: 'Start Game',
    disabledButtonLabel: 'Wait for Others First',
    exitLobbyPopUp: {
      title: 'Leaving?',
      description:
        'If you leave the gathering, you can rejoin until the game starts.',
      primaryButtonLabel: 'Leave',
      secondaryButtonLabel: 'Stay',
    },
    exitLobbyAsHostPopUp: {
      title: 'Leaving the game?',
      description:
        'You started this game, so if you leave, the game will end before it even starts.',
      primaryButtonLabel: 'Leave game',
      secondaryButtonLabel: 'Continue playing',
    },
    exitRunningPopUp: {
      title: 'You are in the game',
      description:
        'Your wizard is part of a running game, do you want to continue or leave the game?',
      primaryButtonLabel: 'Continue',
      secondaryButtonLabel: 'Exit',
    },
  },
  gameBoardScreen: {
    exitGamePopUp: {
      title: 'Are you leaving?',
      description:
        "If you leave the game, you will not be able to join again. Also, whoever leaves early loses. We're sorry...",
      primaryButtonLabel: 'Leave',
      secondaryButtonLabel: 'Stay',
    },
    exitGameAsHostPopUp: {
      title: 'Are you leaving the game?',
      description:
        'You started this game, so if you leave, the game will end for everyone else. Are you sure you want to leave the game?',
      primaryButtonLabel: 'Quit game',
      secondaryButtonLabel: 'Continue playing',
    },
    exitNotFoundGamePopUp: {
      title: 'Game ended',
      description:
        'The game you are in has ended. Either the game mastermind has left, or you are the last one left.',
    },
    questionSelectionScreen: {
      title: 'Question selection',
      description: 'The question is chosen by',
      enabledButtonLabel: 'Confirm topic selection',
      disabledButtonLabel: 'Select topic first',
      questionSelectionBottomSheet: {
        title: 'Select question',
        noQuestionsFoundInCategory:
          'No questions found in this category, please choose another one.',
        enabledButtonLabel: 'Select question',
      },
      waitingForQuestionSelectionBottomSheet: {
        title: 'Wait...',
        descriptionParts: {
          beforeUsername: 'Once the sage',
          afterUsername:
            'selects a question, you will be shown a time limit and the option to answer',
        },
      },
    },
    answeringScreen: {
      title: 'Answering',
      questionAnsweringBottomSheet: {
        title: 'Enter your answer in time',
        category: 'Category:',
        enabledButtonLabel: 'Confirm answer',
      },
      waitingForQuestionAnsweringBottomSheet: {
        title: 'Wait...',
        description:
          'Once all wise men have answered, you will be shown the option to bet silver pieces on the person you trust the most in this question.',
      },
    },
    bettingScreen: {
      title: 'Betting',
      descriptionParts: {
        before: 'Choose a sage',
        after: 'who you want to bet on',
      },
      bettingBottomSheet: {
        title: 'Bet on',
        titleHimself: 'Bet on yourself',
        descriptionParts: {
          beforeUsername: 'How many pieces of silver would you bet that',
          afterUsername: 'wrote the most accurate answer?',
        },
        descriptionHimself:
          'How many pieces of silver do you want to bet on you writing the most accurate answer?',
        enabledButtonLabel: 'Bet {{value}} pieces of silver',
      },
      doNotBetButtonLabel: 'Do not bet this round',
      waitingForBettingBottomSheet: {
        title: 'Wait...',
        description:
          'Once all the wise men have finished betting, you will see the results.',
      },
      waitingForBettingWithNoSilverPiecesBottomSheet: {
        title: 'Wait...',
        description:
          "Your pockets aren't that deep right now, so you don't have anything to bet, but you still have to wait for the other wise men to bet.",
      },
    },
    evaluationScreen: {
      title: 'Evaluation',
      titleWinner: 'Congratulations!',
      descriptionParts: {
        beforeCorrectAnswer: 'The correct answer is',
        afterCorrectAnswer: 'and most accurately answered',
        afterCorrectAnswerWinner: 'and you answered most accurately',
      },
      underEvaluationDescription:
        '...now wait for the host sage to start the next round',
      enabledButtonLabel: 'Start next round',
      enabledLastEvaluationButtonLabel: 'Show game results',
      columns: {
        name: 'Name',
        answer: 'Answer',
        bets: 'Bets',
        movements: 'Movements',
      },
    },
    gameResultsScreen: {
      title: 'Game Results',
      winnerDescriptionParts: {
        before: 'Congratulations,',
        after: 'you won this game!',
      },
      eloTitle: 'Overall ELO Rating',
      enabledButtonLabel: 'Leave happy',
    },
  },
  questionCategories: {
    bible: 'Bible',
    history: 'History',
    earth: 'Earth',
    universe: 'Universe',
    technology: 'Technology',
  },
  rules: {
    required:
      'Where there is nothing, even death does not take, but we need this field.',
    max: 'Take a little away. Maximum value is {{value}}.',
    min: 'Add a little. Minimum value is {{value}}.',
    maxLength: 'Delete something. Maximum number of characters is {{value}}.',
    minLength: 'Add something. Minimum number of characters is {{value}}.',
    isNumber: 'We suspect that "{{value}}" is not a number.',
    username: 'Please use only letters, numbers or underscores.',
    password: 'No, no spaces...',
  },
  errors: {
    unknown: "Hmm... Something is wrong, but we don't know what.",
    database:
      "The database said: 'Nope!' Aren't you trying to save the same thing twice?",
    badAuthorization:
      "We've got you mixed up... Try logging out and logging in again.",
    itemNotFound:
      "Unfortunately, we didn't find something we were supposed to find...",
    noFreshQuestionsInCategory:
      "We don't have any questions in this category that haven't already been answered by a wise person. Please choose another one.",
    gameIsFull: 'The game is already full.',
    userAlreadyExists: 'A user with that name already exists.',
    wrongCredentials:
      'Something is wrong... The username or password is incorrect.',
  },
  fillFirst: 'Fill in first',
  selectFirst: 'Select first',
  continue: 'Continue',
  ok: 'Ok',
  cancel: 'Cancel',
  me: 'Me',
  and: 'and',
} as const satisfies AppTranslations;
