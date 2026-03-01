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
        description: 'Active exercise duration in each series.',
      },
      rest: {
        label: 'Rest',
        description: 'Short recovery time between series.',
      },
      series: {
        label: 'Series',
        description:
          'Number of exercise repetitions (and breaks between them) within one round.',
      },
      rounds: {
        label: 'Rounds',
        description:
          'Total number of rounds in the workout. Each round can include several series.',
      },
      recovery: {
        label: 'Rest after round',
        description:
          'Longer rest period after completing all series in a round.',
      },
    },
    pressAnywhere: 'Click anywhere to confirm 👇',
  },
  screens: {
    landingScreen: {
      title: 'New Workout',
      selectStoredWorkoutButtonLabel: 'Select Stored Workout',
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
            label: 'Warm-up',
            description:
              'Time before the workout starts, intended for stretching.',
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
              friendMale: 'Jake (buddy)',
              friendFemale: 'Emma (buddy)',
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
          vibrations: {
            label: 'Vibrations',
            description:
              'Enable vibration alerts for key moments during a workout (e.g., halfway mark, countdown, start of a new phase).',
          },
        },
      },
    },
    runningWorkoutScreen: {
      title: 'Workout',
      endWorkoutPopUp: {
        title: 'Finish Workout',
        description: 'Are you sure you want to end your workout?',
        positiveButtonLabel: 'End Workout',
        negativeButtonLabel: 'Continue',
      },
      totalElapsedTime: 'Total',
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
          friendMale: 'Top! We did it!',
          friendFemale: 'Top! We did it!',
          calmMale: 'Nice! Beautiful work',
          calmFemale: 'Nice! Beautiful work',
        },
        byCharacter: {
          warrior: 'Battle Fought!',
          cyborg: 'Process Complete',
          wizard: 'Well done, child!',
        },
      },
      description: {
        default: "Great job. You've finished another solid workout.",
        byVoice: {
          coachMale: 'That was a top-tier performance today. Keep it up!',
          coachFemale: 'That was a top-tier performance today. Keep it up!',
          friendMale: "Nice! You're done, now go get some proper rest.",
          friendFemale: "Nice! You're done, now go get some proper rest.",
          calmMale:
            'Enjoy the stillness and the feeling of the session. It was time well spent.',
          calmFemale:
            'Enjoy the stillness and the feeling of the session. It was time well spent.',
        },
        byCharacter: {
          warrior:
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
            friendMale: 'Total time crushed',
            friendFemale: 'Total time crushed',
            calmMale: 'Total time in motion',
            calmFemale: 'Total time in motion',
          },
          byCharacter: {
            warrior: "Total time of today's battle",
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
          friendMale: 'Done',
          friendFemale: 'Done',
          calmMale: 'Done',
          calmFemale: 'Done',
        },
        byCharacter: {
          warrior: 'Done',
          cyborg: 'Done',
          wizard: 'Done',
        },
      },
    },
  },
} as const satisfies AppTranslations;
