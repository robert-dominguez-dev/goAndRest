import { AppTranslations } from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const en = {
  common: {
    workoutConfig: {
      prep: 'Prep',
      work: 'Work',
      rest: 'Rest',
      rounds: 'Rounds',
      cooldown: 'Cooldown',
    },
  },
  screens: {
    landingScreen: {
      title: 'Workouts',
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
  },
} as const satisfies AppTranslations;
