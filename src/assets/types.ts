import { RunningWorkoutPhase } from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import Sound from 'react-native-sound';
import { SupportedLanguageCode } from '../contexts/AppLanguageProvider/constants.ts';

export enum Countdown {
  Ten = 10,
  Nine = 9,
  Eight = 8,
  Seven = 7,
  Six = 6,
  Five = 5,
  Four = 4,
  Three = 3,
  Two = 2,
  One = 1,
}

type WorkoutSoundObject<T> = Record<RunningWorkoutPhase, T[]> &
  Record<Countdown, T> & {
    half: T[];
    finish: T[];
  };

export type WorkoutSoundFileNames = WorkoutSoundObject<string>;

export type WorkoutSoundPathsByLanguage = Record<
  SupportedLanguageCode,
  WorkoutSoundFileNames
>;

export type WorkoutSounds = WorkoutSoundObject<Sound | undefined>;

export type WorkoutSoundKey = keyof WorkoutSounds;
