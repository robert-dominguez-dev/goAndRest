import {
  Countdown,
  WorkoutSoundFileNames,
  WorkoutSounds,
} from '../../../assets/types.ts';
import { RunningWorkoutPhase } from '../../../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { loadSound } from '../../../assets/helpers/loadSound.ts';

export const getLoadedCurrentWorkoutSounds = (
  currentWorkoutSoundFileNames: WorkoutSoundFileNames | undefined,
): WorkoutSounds | null =>
  currentWorkoutSoundFileNames
    ? {
        [RunningWorkoutPhase.WARMUP]:
          currentWorkoutSoundFileNames.WARMUP.map(loadSound),
        [RunningWorkoutPhase.WORK]:
          currentWorkoutSoundFileNames.WORK.map(loadSound),
        [RunningWorkoutPhase.REST]:
          currentWorkoutSoundFileNames.REST.map(loadSound),
        [RunningWorkoutPhase.RECOVERY]:
          currentWorkoutSoundFileNames.RECOVERY.map(loadSound),
        [RunningWorkoutPhase.COOLDOWN]:
          currentWorkoutSoundFileNames.COOLDOWN.map(loadSound),
        [Countdown.Ten]: loadSound(currentWorkoutSoundFileNames[Countdown.Ten]),
        [Countdown.Nine]: loadSound(
          currentWorkoutSoundFileNames[Countdown.Nine],
        ),
        [Countdown.Eight]: loadSound(
          currentWorkoutSoundFileNames[Countdown.Eight],
        ),
        [Countdown.Seven]: loadSound(
          currentWorkoutSoundFileNames[Countdown.Seven],
        ),
        [Countdown.Six]: loadSound(currentWorkoutSoundFileNames[Countdown.Six]),
        [Countdown.Five]: loadSound(
          currentWorkoutSoundFileNames[Countdown.Five],
        ),
        [Countdown.Four]: loadSound(
          currentWorkoutSoundFileNames[Countdown.Four],
        ),
        [Countdown.Three]: loadSound(
          currentWorkoutSoundFileNames[Countdown.Three],
        ),
        [Countdown.Two]: loadSound(currentWorkoutSoundFileNames[Countdown.Two]),
        [Countdown.One]: loadSound(currentWorkoutSoundFileNames[Countdown.One]),
        half: currentWorkoutSoundFileNames.half.map(loadSound),
        finish: currentWorkoutSoundFileNames.finish.map(loadSound),
      }
    : null;
