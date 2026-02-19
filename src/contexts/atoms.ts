import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const numberAsyncStorage = createJSONStorage<number>(() => AsyncStorage);

export const warmupSettingsAtom = atomWithStorage<number>(
  'WARMUP_SETTINGS_DURATION',
  0,
  numberAsyncStorage,
);

export const cooldownSettingsAtom = atomWithStorage<number>(
  'COOLDOWN_SETTINGS_DURATION',
  0,
  numberAsyncStorage,
);

const booleanAsyncStorage = createJSONStorage<boolean>(() => AsyncStorage);

export const keepTimerInBackgroundSettingsAtom = atomWithStorage<boolean>(
  'TIMER_IN_BACKGROUND_SETTINGS_DURATION',
  true,
  booleanAsyncStorage,
);

export const vibrationsSettingsAtom = atomWithStorage<boolean>(
  'VIBRATIONS_SETTINGS_DURATION',
  true,
  booleanAsyncStorage,
);

const stringAsyncStorage = createJSONStorage<string>(() => AsyncStorage);

export const soundsSettingsAtom = atomWithStorage<string>(
  'SOUNDS_SETTINGS_DURATION',
  'Karel',
  stringAsyncStorage,
);
