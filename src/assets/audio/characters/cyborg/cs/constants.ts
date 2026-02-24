import { Countdown, WorkoutSounds } from '../../../../types.ts';
import { RunningWorkoutPhase } from '../../../../../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { loadSound } from '../../../../helpers/loadSound.ts';

export const cyborgCs: WorkoutSounds = {
  [RunningWorkoutPhase.WARMUP]: [loadSound(require('./cyborg_cs_warmup.mp3'))],
  [RunningWorkoutPhase.WORK]: [loadSound(require('./cyborg_cs_work.mp3'))],
  [RunningWorkoutPhase.REST]: [loadSound(require('./cyborg_cs_rest.mp3'))],
  [RunningWorkoutPhase.RECOVERY]: [
    loadSound(require('./cyborg_cs_recovery.mp3')),
  ],
  [RunningWorkoutPhase.COOLDOWN]: [
    loadSound(require('./cyborg_cs_cooldown.mp3')),
  ],
  [Countdown.Ten]: loadSound(require('./cyborg_cs_10.mp3')),
  [Countdown.Nine]: loadSound(require('./cyborg_cs_9.mp3')),
  [Countdown.Eight]: loadSound(require('./cyborg_cs_8.mp3')),
  [Countdown.Seven]: loadSound(require('./cyborg_cs_7.mp3')),
  [Countdown.Six]: loadSound(require('./cyborg_cs_6.mp3')),
  [Countdown.Five]: loadSound(require('./cyborg_cs_5.mp3')),
  [Countdown.Four]: loadSound(require('./cyborg_cs_4.mp3')),
  [Countdown.Three]: loadSound(require('./cyborg_cs_3.mp3')),
  [Countdown.Two]: loadSound(require('./cyborg_cs_2.mp3')),
  [Countdown.One]: loadSound(require('./cyborg_cs_1.mp3')),
  half: [loadSound(require('./cyborg_cs_half.mp3'))],
  finish: [loadSound(require('./cyborg_cs_finish.mp3'))],
};
