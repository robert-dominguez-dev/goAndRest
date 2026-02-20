import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  WorkoutCharacterVariant,
  WorkoutSoundFeedback,
  WorkoutSoundVariant,
  WorkoutVoiceVariant,
} from '../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { AsyncStorageKey } from './constants.ts';
import { WorkoutTimerPersistedState } from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';

const createAsyncAtom = <T>(key: string, defaultValue: T) =>
  atomWithStorage(
    key,
    defaultValue,
    createJSONStorage<T>(() => AsyncStorage),
  );

export const warmupSettingAtom = createAsyncAtom<number>(
  AsyncStorageKey.WARMUP_DURATION_SETTING,
  0,
);

export const cooldownSettingAtom = createAsyncAtom<number>(
  AsyncStorageKey.COOLDOWN_DURATION_SETTING,
  0,
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
  WorkoutSoundFeedback.character,
);

export const voiceVariantSettingAtom = createAsyncAtom<WorkoutVoiceVariant>(
  AsyncStorageKey.VOICE_VARIANT_SETTING,
  WorkoutVoiceVariant.coachFemale,
);

export const characterVariantSettingAtom =
  createAsyncAtom<WorkoutCharacterVariant>(
    AsyncStorageKey.CHARACTER_VARIANT_SETTING,
    WorkoutCharacterVariant.warrior,
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
