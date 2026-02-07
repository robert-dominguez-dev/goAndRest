import { AppTranslations } from './types.ts';

/**
 * You can define params like this: %{param}.
 */
export const en = {
  common: {},
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
