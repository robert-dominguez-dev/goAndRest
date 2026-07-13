import { NestedKeys } from '../types/magic.ts';
import { TOptionsBase } from 'i18next';
import { AppWorkoutConfigKey } from '../components/navigation/AppNavigator/screens/LandingScreen/constants.ts';
import { SupportedLanguageCode } from '../contexts/AppLanguageProvider/constants.ts';
import {
  WorkoutCharacterVariant,
  WorkoutCountdownVariant,
  WorkoutSoundFeedback,
  WorkoutSoundVariant,
  WorkoutVoiceVariant,
} from '../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { PersonalizedAdsStatus } from '../components/navigation/AppNavigator/screens/SettingsScreen/helpers/getPersonalizedAdsStatus.ts';

type WorkoutConfigItemTexts = {
  label: string;
  description: string;
};

type WorkoutConfigTexts = Record<AppWorkoutConfigKey, WorkoutConfigItemTexts>;

type SettingsItemTexts = WorkoutConfigItemTexts;

type SettingsItemSubItems<TItemsKey extends string | number> = {
  items: Record<TItemsKey, string>;
};

type TextsByCoachVariant = {
  default: string;
  byVoice: Record<WorkoutVoiceVariant, string>;
  byCharacter: Record<WorkoutCharacterVariant, string>;
};

type PopUpTexts = {
  title: string;
  description: string;
  positiveButtonLabel: string;
  negativeButtonLabel: string;
};

type SaveWorkoutBottomSheetTexts = Omit<PopUpTexts, 'negativeButtonLabel'> & {
  inputLabel: string;
  invalidButtonLabel: string;
};

export type AppTranslations = {
  common: {
    ok: string;
    workoutConfig: WorkoutConfigTexts;
    pressAnywhere: string;
    adNotAvailablePopUp: {
      title: string;
      description: string;
    };
    adLoading: string;
    rpe: {
      easy: string;
      moderate: string;
      solid: string;
      hard: string;
      max: string;
    };
    paywall: {
      title: string;
      subtitleFree: string;
      subtitlePremium: string;
      benefitHistory: string;
      benefitChart: string;
      benefitVoices: string;
      benefitNoAds: string;
      benefitBackup: string;
      buyButton: string;
      oneTimeNote: string;
      restore: string;
      activeState: string;
      charSheetUnlock: string;
      errorPopUp: {
        title: string;
        description: string;
      };
      restoreNotFoundPopUp: {
        title: string;
        description: string;
      };
      successPopUp: {
        title: string;
        description: string;
      };
      pendingPopUp: {
        title: string;
        description: string;
      };
      processing: string;
    };
  };
  screens: {
    landingScreen: {
      title: string;
      selectStoredWorkoutButtonLabel: string;
      lastRunningWorkoutButtonLabel: string;
      removeStoredWorkoutPopUp: PopUpTexts;
      resetWorkoutPopUp: PopUpTexts;
      saveWorkoutBottomSheet: SaveWorkoutBottomSheetTexts;
      rules: {
        required: string;
        minLength: string;
        maxLength: string;
      };
    };
    settingsScreen: {
      title: string;
      proBannerSubtitle: string;
      appearanceSection: {
        label: string;
        items: {
          language: SettingsItemTexts &
            SettingsItemSubItems<SupportedLanguageCode>;
          theme: SettingsItemTexts;
        };
      };
      workoutSection: {
        label: string;
        items: {
          keepTimerInBackground: SettingsItemTexts;
          warmup: SettingsItemTexts;
          cooldown: SettingsItemTexts;
        };
      };
      feedbackSection: {
        label: string;
        items: {
          soundFeedback: SettingsItemTexts &
            SettingsItemSubItems<WorkoutSoundFeedback>;
          voiceVariant: SettingsItemTexts &
            SettingsItemSubItems<WorkoutVoiceVariant>;
          characterVariant: SettingsItemTexts &
            SettingsItemSubItems<WorkoutCharacterVariant> & {
              premiumBottomSheet: {
                title: string;
                titlePremium: string;
                description: string;
                descriptionPremium: string;
                daysRemaining: {
                  lessThanOne: string;
                  one: string;
                  few: string;
                  many: string;
                };
                extendPopUp: {
                  title: string;
                  description: string;
                  selectOnlyButtonLabel: string;
                  extendButtonLabel: string;
                };
              };
            };
          soundVariant: SettingsItemTexts &
            SettingsItemSubItems<WorkoutSoundVariant>;
          countdown: SettingsItemTexts &
            SettingsItemSubItems<WorkoutCountdownVariant>;
          vibrations: SettingsItemTexts;
        };
      };
      backupSection: {
        label: string;
        items: {
          backupData: SettingsItemTexts & { exportValue: string };
          restoreData: SettingsItemTexts & { importValue: string };
        };
        restoreSheet: {
          title: string;
          warning: string;
          rowDate: string;
          rowWorkouts: string;
          rowLog: string;
          rowPeriod: string;
          dateUnknown: string;
          confirm: string;
          invalidPopUp: {
            title: string;
            description: string;
          };
        };
      };
      otherSection: {
        label: string;
        items: {
          personalizedAds: SettingsItemTexts & {
            status: Record<PersonalizedAdsStatus, string>;
          };
        };
      };
    };
    runningWorkoutScreen: {
      title: string;
      endWorkoutPopUp: PopUpTexts;
      totalElapsedTime: string;
      descriptionTexts: {
        round: string;
        set: string;
      };
    };
    savedWorkoutsScreen: {
      title: string;
      existingWorkoutItem: {
        totalTime: string;
        startButtonLabel: string;
        deleteButtonLabel: string;
      };
    };
    historyScreen: {
      title: string;
      premiumOverlayTitle: string;
      premiumOverlayDescription: string;
      premiumOverlayUnlock: string;
      weekTitle: string;
      streakNone: string;
      streakDays: {
        one: string;
        few: string;
        many: string;
      };
      weekVolume: {
        one: string;
        few: string;
        many: string;
      };
      chartTitle: string;
      chartSubtitle: string;
      chartEmpty: string;
      recentTitle: string;
      rounds: {
        one: string;
        few: string;
        many: string;
      };
      listEmpty: string;
      detailTotalTime: string;
      detailDifficulty: string;
      detailConfigTitle: string;
      detailDifficultyChartTitle: string;
      detailDifficultyChartSubtitle: string;
      detailDifficultyChartSubtitleNamed: string;
      detailDifficultyChartEmpty: string;
      detailSave: string;
    };
    finishedWorkoutScreen: {
      title: TextsByCoachVariant;
      stats: {
        totalTime: TextsByCoachVariant;
      };
      buttonLabel: TextsByCoachVariant;
      ratingRequest: string;
      ratingRequestThankYou: string;
      ratingRequestSorry: string;
      rpePopupTitle: string;
      rpePopupDescription: string;
      difficultyLabel: string;
      streakStart: string;
      weekTileLabel: string;
      historyLinkPremium: string;
      historyLinkFree: string;
    };
    disclaimerScreen: {
      title: string;
      description: string;
      subTitle: string;
      sections: {
        first: { title: string; description: string };
        second: { title: string; description: string };
        third: { title: string; description: string };
        fourth: { title: string; description: string };
      };
      buttonLabel: string;
    };
  };
};

export type TranslateKey = NestedKeys<AppTranslations>;

type DefaultTranslationParams = { value?: string; priceString?: string };

export type TranslationOptions = Pick<TOptionsBase, 'count' | 'returnObjects'> &
  Record<string, string | number> &
  DefaultTranslationParams;
