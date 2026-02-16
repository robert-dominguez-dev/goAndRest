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
      brake: {
        label: 'Rest after round',
        description:
          'Longer rest period after completing all series in a round.',
      },
    },
  },
  screens: {
    landingScreen: {
      title: 'Default workout',
      removeStoredWorkoutPopUp: {
        title: 'Delete Workout',
        description:
          'Are you sure you want to delete the "{{value}}" workout? This action cannot be undone.',
        positiveButtonLabel: 'Delete',
        negativeButtonLabel: 'Cancel',
      },
      saveWorkoutBottomSheet: {
        title: 'Save Workout',
        description: 'Name your workout and choose an icon.',
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
