import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  WorkoutCharacterVariant,
  WorkoutCountdownVariant,
  WorkoutSoundFeedback,
  WorkoutSoundVariant,
  WorkoutVoiceVariant,
} from '../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { AsyncStorageKey } from './constants.ts';
import {
  WorkoutTimerComputedState,
  WorkoutTimerPersistedState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { atom } from 'jotai';
import { WorkoutSoundFilePaths } from '../assets/types.ts';
import { AppWorkoutConfig, AppWorkoutFieldValues, } from './AppWorkoutsProvider/types.ts';
import { defaultWorkoutConfig } from './AppWorkoutsProvider/constants.ts';
import { ONE_SECOND_MS } from '../constants/common.ts';

const createAsyncAtom = <T>(key: string, defaultValue: T) =>
  atomWithStorage(
    key,
    defaultValue,
    createJSONStorage<T>(() => AsyncStorage),
    { getOnInit: true },
  );

export const warmupSettingAtom = createAsyncAtom<number>(
  AsyncStorageKey.WARMUP_DURATION_SETTING,
  10 * ONE_SECOND_MS,
);

export const cooldownSettingAtom = createAsyncAtom<number>(
  AsyncStorageKey.COOLDOWN_DURATION_SETTING,
  0,
);

export const countdownSettingAtom = createAsyncAtom<WorkoutCountdownVariant>(
  AsyncStorageKey.COUNTDOWN_DURATION_SETTING,
  WorkoutCountdownVariant.five,
);

export const keepTimerInBackgroundSettingAtom = createAsyncAtom<boolean>(
  AsyncStorageKey.TIMER_IN_BACKGROUND_SETTING,
  true,
);

export const vibrationsSettingAtom = createAsyncAtom<boolean>(
  AsyncStorageKey.VIBRATIONS_SETTING,
  true,
);

export const soundFeedbackSettingAtom = createAsyncAtom<WorkoutSoundFeedback>(
  AsyncStorageKey.SOUND_FEEDBACK_SETTING,
  WorkoutSoundFeedback.voice,
);

export const voiceVariantSettingAtom = createAsyncAtom<WorkoutVoiceVariant>(
  AsyncStorageKey.VOICE_VARIANT_SETTING,
  WorkoutVoiceVariant.coachFemale,
);

export const characterVariantSettingAtom =
  createAsyncAtom<WorkoutCharacterVariant>(
    AsyncStorageKey.CHARACTER_VARIANT_SETTING,
    WorkoutCharacterVariant.wizard,
  );

export const soundVariantSettingAtom = createAsyncAtom<WorkoutSoundVariant>(
  AsyncStorageKey.SOUND_VARIANT_SETTING,
  WorkoutSoundVariant.beep,
);

export const runningWorkoutStateAtom =
  createAsyncAtom<WorkoutTimerPersistedState | null>(
    AsyncStorageKey.APP_RUNNING_WORKOUT_STATE,
    null,
  );

export const lastRunningWorkoutAtom =
  createAsyncAtom<AppWorkoutFieldValues | null>(
    AsyncStorageKey.LAST_RUNNING_WORKOUT,
    null,
  );

export const lastDefaultWorkoutConfigAtom = createAsyncAtom<AppWorkoutConfig>(
  AsyncStorageKey.LAST_DEFAULT_WORKOUT_CONFIG,
  defaultWorkoutConfig,
);

export const computedWorkoutStateAtom = atom<WorkoutTimerComputedState | null>(
  null,
);

export const finishedWorkoutStatsAtom = atom<WorkoutTimerPersistedState | null>(
  null,
);

export const workoutSoundFilePathsAtom = atom<WorkoutSoundFilePaths | null>(
  null,
);

export const playingPreviewAtom = atom<string | null>(null);

export const isMutedAtom = atom<boolean>(false);

export const isDisclaimerInfoAgreedAtom = createAsyncAtom<boolean>(
  AsyncStorageKey.APP_DISCLAIMER_AGREED,
  false,
);

export const starsRatedAtom = createAsyncAtom<number | null>(
  AsyncStorageKey.STARS_RATED,
  null,
);

export const finishedWorkoutsCountAtom = createAsyncAtom<number>(
  AsyncStorageKey.FINISHED_WORKOUTS_COUNT,
  0,
);
