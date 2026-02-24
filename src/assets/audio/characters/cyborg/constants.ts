import {
  Countdown,
  WorkoutSoundFilePaths,
  WorkoutSoundPathsByLanguage,
} from '../../../types.ts';
import { RunningWorkoutPhase } from '../../../../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { SupportedLanguageCode } from '../../../../contexts/AppLanguageProvider/constants.ts';

const cyborgCs: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: [require('./cs/cyborg_cs_warmup.mp3')],
  [RunningWorkoutPhase.WORK]: [require('./cs/cyborg_cs_work.mp3')],
  [RunningWorkoutPhase.REST]: [require('./cs/cyborg_cs_rest.mp3')],
  [RunningWorkoutPhase.RECOVERY]: [require('./cs/cyborg_cs_recovery.mp3')],
  [RunningWorkoutPhase.COOLDOWN]: [require('./cs/cyborg_cs_cooldown.mp3')],
  [Countdown.Ten]: require('./cs/cyborg_cs_10.mp3'),
  [Countdown.Nine]: require('./cs/cyborg_cs_9.mp3'),
  [Countdown.Eight]: require('./cs/cyborg_cs_8.mp3'),
  [Countdown.Seven]: require('./cs/cyborg_cs_7.mp3'),
  [Countdown.Six]: require('./cs/cyborg_cs_6.mp3'),
  [Countdown.Five]: require('./cs/cyborg_cs_5.mp3'),
  [Countdown.Four]: require('./cs/cyborg_cs_4.mp3'),
  [Countdown.Three]: require('./cs/cyborg_cs_3.mp3'),
  [Countdown.Two]: require('./cs/cyborg_cs_2.mp3'),
  [Countdown.One]: require('./cs/cyborg_cs_1.mp3'),
  half: [require('./cs/cyborg_cs_half.mp3')],
  finish: [require('./cs/cyborg_cs_finish.mp3')],
};

export const cyborgSoundFileNamesByLanguage: WorkoutSoundPathsByLanguage = {
  [SupportedLanguageCode.cs]: cyborgCs,
  [SupportedLanguageCode.en]: cyborgCs,
  [SupportedLanguageCode.sk]: cyborgCs,
};
