import { RunningWorkoutPhase } from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
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

export type ExtendedWorkoutSoundFilePath = {
  short?: string;
  standard: string[];
};

export type WorkoutSoundFilePaths = Record<
  RunningWorkoutPhase,
  ExtendedWorkoutSoundFilePath
> &
  Record<Countdown, string> & {
    half: ExtendedWorkoutSoundFilePath;
    finish: ExtendedWorkoutSoundFilePath;
  };

export type WorkoutSoundPathsByLanguage = Record<
  SupportedLanguageCode,
  WorkoutSoundFilePaths
>;

export type WorkoutSoundKey = keyof WorkoutSoundFilePaths;
