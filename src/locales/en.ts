import { AppTranslations } from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const en = {
  common: {
    workoutConfig: {
      prep: {
        label: 'Preparation',
        description:
          'Time before each round starts. Get ready for the upcoming work interval.',
      },
      work: {
        label: 'Work',
        description: 'Active exercise time in each round.',
      },
      rest: {
        label: 'Rest',
        description: 'Recovery time after each work interval.',
      },
      rounds: {
        label: 'Rounds',
        description:
          'Number of times the preparation, work, and rest cycle repeats.',
      },
      cooldown: {
        label: 'Cooldown',
        description:
          'Time to recover and lower your heart rate after the workout.',
      },
    },
  },
  screens: {
    landingScreen: {
      title: 'Default workout',
    },
    settingsScreen: {
      title: 'Settings',
      items: {
        languagePicker: {
          title: 'Language',
        },
        themePicker: {
          title: 'Dark mode',
        },
      },
    },
    runningWorkoutScreen: {
      title: 'Default workout',
    },
  },
} as const satisfies AppTranslations;
