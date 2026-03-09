import { AppTranslations } from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const en = {
  common: {
    ok: 'Ok',
    workoutConfig: {
      work: {
        label: 'Work',
        description: 'Active exercise duration in each set.',
      },
      rest: {
        label: 'Rest',
        description: 'Short recovery time between sets.',
      },
      series: {
        label: 'Sets',
        description:
          'Number of exercise repetitions (and breaks between them) within one round.',
      },
      rounds: {
        label: 'Rounds',
        description:
          'Total number of rounds in the workout. Each round can include several sets.',
      },
      recovery: {
        label: 'Rest after round',
        description: 'Longer rest period after completing all sets in a round.',
      },
    },
    pressAnywhere: 'Click anywhere to confirm 👇',
  },
  screens: {
    landingScreen: {
      title: 'New Workout',
      selectStoredWorkoutButtonLabel: 'Select from Saved',
      lastRunningWorkoutButtonLabel: 'Repeat Last',
      removeStoredWorkoutPopUp: {
        title: 'Delete Workout',
        description:
          'Are you sure you want to delete the "{{value}}" workout? This action cannot be undone.',
        positiveButtonLabel: 'Delete',
        negativeButtonLabel: 'Cancel',
      },
      resetWorkoutPopUp: {
        title: 'Discard Changes',
        description:
          'Are you sure you want to discard your changes and reset all values to default?',
        positiveButtonLabel: 'Yes',
        negativeButtonLabel: 'No',
      },
      saveWorkoutBottomSheet: {
        title: 'Save Workout',
        description:
          'Name your workout. You can find it under this name later among your saved workouts.',
        inputLabel: 'Workout name',
        positiveButtonLabel: 'Save workout',
        invalidButtonLabel: 'Fill in first',
      },
      rules: {
        required: 'Name is required...',
        minLength: 'Name must be at least {{value}} characters long.',
        maxLength: 'Name cannot exceed {{value}} characters.',
      },
    },
    settingsScreen: {
      title: 'Settings',
      appearanceSection: {
        label: 'Appearance',
        items: {
          language: {
            label: 'Language',
            description:
              'App text and audio cues will be played in this language.',
            items: {
              cs: 'Czech',
              en: 'English',
              sk: 'Slovak',
            },
          },
          theme: {
            label: 'Dark Mode',
            description:
              "Switch the app to a dark color scheme that's easier on your eyes and saves battery.",
          },
        },
      },
      workoutSection: {
        label: 'Timer',
        items: {
          keepTimerInBackground: {
            label: 'Background Timer',
            description: 'The timer remains active even after leaving the app',
          },
          warmup: {
            label: 'Preparation',
            description:
              'Preparation time before the workout starts, intended for getting into position or even a brief warm-up.',
          },
          cooldown: {
            label: 'Cool-down',
            description:
              'Time after the workout ends, intended for muscle and breath recovery.',
          },
        },
      },
      feedbackSection: {
        label: 'Sounds and Vibrations',
        items: {
          soundFeedback: {
            label: 'Audio feedback',
            description:
              'Select the type of audio signals for key moments during a workout (e.g., halfway mark, countdown, start of a new phase).',
            items: {
              voice: 'Standard Voices',
              character: 'Fun Voices',
              sound: 'Sound Signals',
              none: 'No Sound',
            },
          },
          voiceVariant: {
            label: 'Voice Type',
            description:
              'Choose the voice that will guide you through the workout.',
            items: {
              coachMale: 'Marcus (coach)',
              coachFemale: 'Sarah (coach)',
              briefMale: 'Dustin (brief)',
              briefFemale: 'Kate (brief)',
              calmMale: 'Noah (calm)',
              calmFemale: 'Olivia (calm)',
            },
          },
          characterVariant: {
            label: 'Character',
            description:
              'Choose the character that will guide you through the workout.',
            items: {
              warrior: 'Warrior',
              shieldmaiden: 'Shieldmaiden',
              cyborg: 'Cyborg',
              wizard: 'Wizard',
            },
          },
          soundVariant: {
            label: 'Signal Type',
            description:
              "Sound you'll hear at start, countdown and other events during workout.",
            items: {
              beep: 'Beep',
              bell: 'Bell',
              whistle: 'Whistle',
              drum: 'Drum',
              snap: 'Snap',
            },
          },
          countdown: {
            label: 'Phase end countdown',
            description:
              'Number of seconds before the end of each phase (exercise, rest, etc.) where your chosen signal (sound, voice, vibration) alerts you every second.',
            items: {
              '10': 'Last 10s',
              '5': 'Last 5s',
              '3': 'Last 3s',
              '0': 'No countdown',
            },
          },
          vibrations: {
            label: 'Vibrations',
            description:
              'Enable vibration alerts for key moments during a workout (e.g., halfway mark, countdown, start of a new phase).',
          },
        },
      },
    },
    runningWorkoutScreen: {
      title: 'Custom',
      endWorkoutPopUp: {
        title: 'Finish Workout',
        description: 'Are you sure you want to end your workout?',
        positiveButtonLabel: 'End',
        negativeButtonLabel: 'Back',
      },
      totalElapsedTime: 'Total',
      descriptionTexts: {
        round: 'Round',
        set: 'Set',
      },
    },
    savedWorkoutsScreen: {
      title: 'Saved Workouts',
      existingWorkoutItem: {
        totalTime: 'Total Time',
        startButtonLabel: 'Start',
        deleteButtonLabel: 'Delete',
      },
    },
    finishedWorkoutScreen: {
      title: {
        default: 'Workout Complete!',
        byVoice: {
          coachMale: "Great! It's done!",
          coachFemale: "Great! It's done!",
          briefMale: 'Top! We did it!',
          briefFemale: 'Top! We did it!',
          calmMale: 'Nice! Beautiful work',
          calmFemale: 'Nice! Beautiful work',
        },
        byCharacter: {
          warrior: 'Battle Fought!',
          shieldmaiden: 'Battle Fought!',
          cyborg: 'Process Complete',
          wizard: 'Well done, child!',
        },
      },
      description: {
        default: "Great job. You've finished another solid workout.",
        byVoice: {
          coachMale: 'That was a top-tier performance today. Keep it up!',
          coachFemale: 'That was a top-tier performance today. Keep it up!',
          briefMale: "Nice! You're done, now go get some proper rest.",
          briefFemale: "Nice! You're done, now go get some proper rest.",
          calmMale:
            'Enjoy the stillness and the feeling of the session. It was time well spent.',
          calmFemale:
            'Enjoy the stillness and the feeling of the session. It was time well spent.',
        },
        byCharacter: {
          warrior:
            'That was a brawl! Nothing beats a good thrashing. Keep it up, warrior!',
          shieldmaiden:
            'That was a brawl! Nothing beats a good thrashing. Keep it up, warrior!',
          cyborg:
            'Hardware limits pushed. System integrity at maximum. Software updated to new version.',
          wizard:
            'Your will and endurance have proven today that you are much more than mere matter.',
        },
      },
      stats: {
        totalTime: {
          default: 'Total Time',
          byVoice: {
            coachMale: "Total time of today's grind",
            coachFemale: "Total time of today's grind",
            briefMale: 'Total time crushed',
            briefFemale: 'Total time crushed',
            calmMale: 'Total time in motion',
            calmFemale: 'Total time in motion',
          },
          byCharacter: {
            warrior: "Total time of today's battle",
            shieldmaiden: "Total time of today's battle",
            cyborg: 'Total process length',
            wizard: 'Total duration of effort in space-time',
          },
        },
      },
      buttonLabel: {
        default: 'Done',
        byVoice: {
          coachMale: 'Done',
          coachFemale: 'Done',
          briefMale: 'Done',
          briefFemale: 'Done',
          calmMale: 'Done',
          calmFemale: 'Done',
        },
        byCharacter: {
          warrior: 'Done',
          shieldmaiden: 'Done',
          cyborg: 'Done',
          wizard: 'Done',
        },
      },
    },
    disclaimerScreen: {
      title: 'Welcome to Go&Rest',
      description:
        'By entering and using this app, you acknowledge that all activities are performed at your own risk. The provider bears no responsibility for any consequences resulting from its use. If you do not agree with these terms, please do not use the app and delete it – it cannot be used without your consent. If you agree to all the points below, confirm your agreement by pressing the {{value}} button and enjoy the app to the fullest.',
      subTitle: 'Legal Information',
      sections: {
        first: {
          title: '1. Limitation of Liability',
          description:
            "To the maximum extent permitted by applicable law, the user bears sole responsibility for the use of the application. Neither the Operator nor any future rights holders shall be held liable for any health consequences, injuries, or material damages associated with the use of the application's content.",
        },
        second: {
          title: '2. Health Warranty',
          description:
            'The user warrants they are in good physical condition and their physical activity has been cleared by a medical professional. This app is not a substitute for professional medical care. Stop using the app immediately if you experience any issues.',
        },
        third: {
          title: '3. Artistic Exaggeration',
          description:
            'All audio content and characters in the app are fictional. Statements made are artistic exaggeration for motivational purposes and must not be interpreted as professional advice or instructions to push past physical pain.',
        },
        fourth: {
          title: '4. Agreement',
          description:
            'By entering and using the app, you confirm that you have read, understood, and accepted these terms in full, regardless of any future changes in the Operator of the application.',
        },
      },
      buttonLabel: 'I agree and want to start',
    },
  },
} as const satisfies AppTranslations;
