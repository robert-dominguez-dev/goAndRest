import { RunningWorkoutPhase } from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import Sound from 'react-native-sound';

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

export type WorkoutSounds = Record<RunningWorkoutPhase, Sound[]> &
  Record<Countdown, Sound> & {
    half: Sound[];
    finish: Sound[];
  };

export type WorkoutSoundKey = keyof WorkoutSounds;
