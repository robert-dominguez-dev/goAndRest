import {
  Countdown,
  WorkoutSoundFileNames,
  WorkoutSoundPathsByLanguage,
} from '../../../types.ts';
import { RunningWorkoutPhase } from '../../../../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { SupportedLanguageCode } from '../../../../contexts/AppLanguageProvider/constants.ts';

const cyborgCs: WorkoutSoundFileNames = {
  [RunningWorkoutPhase.WARMUP]: ['cyborg_cs_warmup.mp3'],
  [RunningWorkoutPhase.WORK]: ['cyborg_cs_work.mp3'],
  [RunningWorkoutPhase.REST]: ['cyborg_cs_rest.mp3'],
  [RunningWorkoutPhase.RECOVERY]: ['cyborg_cs_recovery.mp3'],
  [RunningWorkoutPhase.COOLDOWN]: ['cyborg_cs_cooldown.mp3'],
  [Countdown.Ten]: 'cyborg_cs_10.mp3',
  [Countdown.Nine]: 'cyborg_cs_9.mp3',
  [Countdown.Eight]: 'cyborg_cs_8.mp3',
  [Countdown.Seven]: 'cyborg_cs_7.mp3',
  [Countdown.Six]: 'cyborg_cs_6.mp3',
  [Countdown.Five]: 'cyborg_cs_5.mp3',
  [Countdown.Four]: 'cyborg_cs_4.mp3',
  [Countdown.Three]: 'cyborg_cs_3.mp3',
  [Countdown.Two]: 'cyborg_cs_2.mp3',
  [Countdown.One]: 'cyborg_cs_1.mp3',
  half: ['cyborg_cs_half.mp3'],
  finish: ['cyborg_cs_finish.mp3'],
};

export const cyborgSoundFileNamesByLanguage: WorkoutSoundPathsByLanguage = {
  [SupportedLanguageCode.cs]: cyborgCs,
  [SupportedLanguageCode.en]: cyborgCs,
  [SupportedLanguageCode.sk]: cyborgCs,
};
