import {
  Countdown,
  WorkoutSoundFilePaths,
  WorkoutSoundPathsByLanguage,
} from '../../../../types.ts';
import { RunningWorkoutPhase } from '../../../../../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { SupportedLanguageCode } from '../../../../../contexts/AppLanguageProvider/constants.ts';

const coachFemaleCs: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    short: require('./cs/coach_female_cs_warmup_short.m4a'),
    standard: [
      require('./cs/coach_female_cs_warmup_v1.m4a'),
      require('./cs/coach_female_cs_warmup_v2.m4a'),
      require('./cs/coach_female_cs_warmup_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.WORK]: {
    short: require('./cs/coach_female_cs_work_short.m4a'),
    standard: [
      require('./cs/coach_female_cs_work_v1.m4a'),
      require('./cs/coach_female_cs_work_v2.m4a'),
      require('./cs/coach_female_cs_work_v3.m4a'),
      require('./cs/coach_female_cs_work_v4.m4a'),
    ],
  },
  [RunningWorkoutPhase.REST]: {
    short: require('./cs/coach_female_cs_rest_short.m4a'),
    standard: [
      require('./cs/coach_female_cs_rest_v1.m4a'),
      require('./cs/coach_female_cs_rest_v2.m4a'),
      require('./cs/coach_female_cs_rest_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    short: require('./cs/coach_female_cs_recovery_short.m4a'),
    standard: [
      require('./cs/coach_female_cs_recovery_v1.m4a'),
      require('./cs/coach_female_cs_recovery_v2.m4a'),
      require('./cs/coach_female_cs_recovery_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    short: require('./cs/coach_female_cs_cooldown_short.m4a'),
    standard: [
      require('./cs/coach_female_cs_cooldown_v1.m4a'),
      require('./cs/coach_female_cs_cooldown_v2.m4a'),
      require('./cs/coach_female_cs_cooldown_v3.m4a'),
    ],
  },
  [Countdown.Ten]: require('./cs/coach_female_cs_10.m4a'),
  [Countdown.Nine]: require('./cs/coach_female_cs_9.m4a'),
  [Countdown.Eight]: require('./cs/coach_female_cs_8.m4a'),
  [Countdown.Seven]: require('./cs/coach_female_cs_7.m4a'),
  [Countdown.Six]: require('./cs/coach_female_cs_6.m4a'),
  [Countdown.Five]: require('./cs/coach_female_cs_5.m4a'),
  [Countdown.Four]: require('./cs/coach_female_cs_4.m4a'),
  [Countdown.Three]: require('./cs/coach_female_cs_3.m4a'),
  [Countdown.Two]: require('./cs/coach_female_cs_2.m4a'),
  [Countdown.One]: require('./cs/coach_female_cs_1.m4a'),
  half: {
    standard: [
      require('./cs/coach_female_cs_half_v1.m4a'),
      require('./cs/coach_female_cs_half_v2.m4a'),
      require('./cs/coach_female_cs_half_v3.m4a'),
    ],
  },
  finish: {
    standard: [
      require('./cs/coach_female_cs_finish_v1.m4a'),
      require('./cs/coach_female_cs_finish_v2.m4a'),
      require('./cs/coach_female_cs_finish_v3.m4a'),
    ],
  },
};

export const coachFemaleSoundFileNamesByLanguage: WorkoutSoundPathsByLanguage =
  {
    [SupportedLanguageCode.cs]: coachFemaleCs,
    [SupportedLanguageCode.en]: coachFemaleCs,
    [SupportedLanguageCode.sk]: coachFemaleCs,
  };
