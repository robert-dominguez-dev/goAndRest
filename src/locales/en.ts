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
    adNotAvailablePopUp: {
      title: 'Ad not available',
      description:
        'You may have personalized ads turned off. Enable them in Settings → Other and try again.',
    },
    adLoading: 'Preparing ad…',
    rpe: {
      easy: 'Breezy',
      moderate: 'Steady',
      solid: 'Sweaty',
      hard: 'Burning',
      max: 'Brutal',
    },
    paywall: {
      title: 'Go&Rest Premium',
      subtitleFree: 'Unlock everything. Once and for good.',
      subtitlePremium:
        'You have everything unlocked. Thanks for the support! ♥️',
      benefitHistory: 'Workout history',
      benefitChart: 'Chart showing how your intensity changes over time',
      benefitVoices: 'All premium voices and characters — forever',
      benefitNoAds: 'No ads',
      benefitBackup: 'Data backup to a file (JSON)',
      buyButton: 'Buy forever — {{priceString}}',
      oneTimeNote: 'One-time payment. No subscription.',
      restore: 'Restore previous purchase',
      activeState: 'PREMIUM ACTIVE ✓',
      charSheetUnlock: 'Unlock everything forever — {{priceString}}',
      errorPopUp: {
        title: 'Purchase failed',
        description: 'Please try again later.',
      },
      restoreNotFoundPopUp: {
        title: 'No purchase found',
        description: 'We could not find any previous purchase on this account.',
      },
    },
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
      proBannerSubtitle: 'Everything forever, no ads — {{priceString}}',
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
              character: 'Premium Voices',
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
            premiumBottomSheet: {
              title: 'Unlock a premium voice!',
              titlePremium: 'Choose a character',
              description:
                'Want to set a premium voice for your timer? Tap it, watch a short video, and unlock it free for 7 days.\n\nUse the ▷ icon on the right to hear a preview. 👉',
              descriptionPremium:
                'You have Premium — every character is unlocked forever.',
              daysRemaining: {
                lessThanOne: '< 1 day',
                one: '{{value}} day',
                few: '{{value}} days',
                many: '{{value}} days',
              },
              extendPopUp: {
                title: 'Extend activation?',
                description:
                  'This voice is active for {{value}}. Watch an ad to reset it to a fresh 7 days.',
                selectOnlyButtonLabel: 'Just select',
                extendButtonLabel: 'Extend',
              },
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
      backupSection: {
        label: 'Backup & restore',
        items: {
          backupData: {
            label: 'Back up data',
            description:
              'Save your workout history and settings to a file (JSON).',
            exportValue: 'Export',
          },
          restoreData: {
            label: 'Restore from backup',
            description: 'Load a previously saved backup from a file.',
            importValue: 'Import',
          },
        },
        restoreSheet: {
          title: 'Restore from backup',
          warning:
            'Restoring will overwrite the current data in the app. This action cannot be undone.',
          rowDate: 'Backup date',
          rowWorkouts: 'Number of saved workouts',
          rowLog: 'Number of history entries',
          rowPeriod: 'History entries period',
          dateUnknown: 'unknown',
          confirm: 'Restore',
          invalidPopUp: {
            title: 'Invalid file',
            description: 'The backup file could not be loaded.',
          },
        },
      },
      otherSection: {
        label: 'Other',
        items: {
          personalizedAds: {
            label: 'Type of ads',
            description:
              'Affects ad relevance, and sometimes whether ads show at all. Tap to change the setting.',
            status: {
              personalized: 'Personalized',
              general: 'General',
              limited: 'Limited',
              off: 'Off',
              unknown: 'Not set',
            },
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
    historyScreen: {
      title: 'History',
      premiumOverlayTitle: 'History is a Premium feature',
      premiumOverlayDescription:
        'Unlock the story of your workouts — a time and difficulty chart, calendar and data backup.',
      premiumOverlayUnlock: 'Unlock — {{priceString}}',
      weekTitle: 'This week',
      streakNone: 'no streak',
      streakDays: {
        one: '{{count}} day streak',
        few: '{{count}} days streak',
        many: '{{count}} days streak',
      },
      weekVolume: {
        one: '{{min}} min · {{count}} workout',
        few: '{{min}} min · {{count}} workouts',
        many: '{{min}} min · {{count}} workouts',
      },
      chartTitle: 'Time and difficulty over time',
      legendTime: 'Time',
      legendDifficulty: 'Difficulty',
      chartEmpty: 'Rate a few workouts and you will see your progress here.',
      recentTitle: 'Recent workouts',
      rounds: {
        one: '{{count}} round',
        few: '{{count}} rounds',
        many: '{{count}} rounds',
      },
      listEmpty: 'No workouts yet. They will appear here once you finish one.',
      detailTotalTime: 'Total Time',
      detailDifficulty: 'Difficulty',
      detailRoundsTile: 'rounds',
      detailMinutesTile: 'min',
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
      ratingRequest:
        'Endorphins kicking in? 🔥 Put that energy to good use and rate Go&Rest! 💪 It only takes 10 seconds and helps us a ton to keep improving the app.',
      ratingRequestThankYou: 'Thank you! ♥️ Your support means a lot to us.',
      ratingRequestSorry:
        'Sorry to hear that!️ We are constantly working on updates and improvements 🛠, so hopefully your next workout feels much better.',
      rpePopupTitle: 'How hard was it?',
      rpePopupDescription:
        'Pick the one that matches how much physical effort it took.',
      difficultyLabel: 'Difficulty',
      streakStart: 'Start a streak!',
      weekTileLabel: 'this week · {{min}} min',
      historyLinkPremium: 'History and difficulty trends',
      historyLinkFree: 'History, calendar and difficulty trends',
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
