import {
  Countdown,
  SoundPathByLanguage,
  WorkoutSoundFilePaths,
  WorkoutSoundPathsByLanguage,
} from '../../../types.ts';
import { SupportedLanguageCode } from '../../../../contexts/AppLanguageProvider/constants.ts';
import { RunningWorkoutPhase } from '../../../../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';

const warriorCs: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    short: require('../../../audio/workout/characters/warrior/cs/warrior_cs_warmup_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_warmup_v1.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_warmup_v2.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_warmup_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.WORK]: {
    short: require('../../../audio/workout/characters/warrior/cs/warrior_cs_work_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_work_v1.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_work_v2.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_work_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.REST]: {
    short: require('../../../audio/workout/characters/warrior/cs/warrior_cs_rest_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_rest_v1.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_rest_v2.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_rest_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    short: require('../../../audio/workout/characters/warrior/cs/warrior_cs_recovery_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_recovery_v1.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_recovery_v2.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_recovery_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    short: require('../../../audio/workout/characters/warrior/cs/warrior_cs_cooldown_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_cooldown_v1.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_cooldown_v2.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_cooldown_v3.m4a'),
    ],
  },
  [Countdown.Ten]: require('../../../audio/workout/characters/warrior/cs/warrior_cs_10.m4a'),
  [Countdown.Nine]: require('../../../audio/workout/characters/warrior/cs/warrior_cs_9.m4a'),
  [Countdown.Eight]: require('../../../audio/workout/characters/warrior/cs/warrior_cs_8.m4a'),
  [Countdown.Seven]: require('../../../audio/workout/characters/warrior/cs/warrior_cs_7.m4a'),
  [Countdown.Six]: require('../../../audio/workout/characters/warrior/cs/warrior_cs_6.m4a'),
  [Countdown.Five]: require('../../../audio/workout/characters/warrior/cs/warrior_cs_5.m4a'),
  [Countdown.Four]: require('../../../audio/workout/characters/warrior/cs/warrior_cs_4.m4a'),
  [Countdown.Three]: require('../../../audio/workout/characters/warrior/cs/warrior_cs_3.m4a'),
  [Countdown.Two]: require('../../../audio/workout/characters/warrior/cs/warrior_cs_2.m4a'),
  [Countdown.One]: require('../../../audio/workout/characters/warrior/cs/warrior_cs_1.m4a'),
  half: {
    standard: [
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_half_v1.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_half_v2.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_half_v3.m4a'),
    ],
  },
  finish: {
    standard: [
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_finish_v1.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_finish_v2.m4a'),
      require('../../../audio/workout/characters/warrior/cs/warrior_cs_finish_v3.m4a'),
    ],
  },
};

const warriorEn: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    short: require('../../../audio/workout/characters/warrior/en/warrior_en_warmup_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/en/warrior_en_warmup_v1.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_warmup_v2.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_warmup_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.WORK]: {
    short: require('../../../audio/workout/characters/warrior/en/warrior_en_work_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/en/warrior_en_work_v1.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_work_v2.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_work_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.REST]: {
    short: require('../../../audio/workout/characters/warrior/en/warrior_en_rest_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/en/warrior_en_rest_v1.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_rest_v2.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_rest_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    short: require('../../../audio/workout/characters/warrior/en/warrior_en_recovery_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/en/warrior_en_recovery_v1.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_recovery_v2.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_recovery_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    short: require('../../../audio/workout/characters/warrior/en/warrior_en_cooldown_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/en/warrior_en_cooldown_v1.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_cooldown_v2.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_cooldown_v3.m4a'),
    ],
  },
  [Countdown.Ten]: require('../../../audio/workout/characters/warrior/en/warrior_en_10.m4a'),
  [Countdown.Nine]: require('../../../audio/workout/characters/warrior/en/warrior_en_9.m4a'),
  [Countdown.Eight]: require('../../../audio/workout/characters/warrior/en/warrior_en_8.m4a'),
  [Countdown.Seven]: require('../../../audio/workout/characters/warrior/en/warrior_en_7.m4a'),
  [Countdown.Six]: require('../../../audio/workout/characters/warrior/en/warrior_en_6.m4a'),
  [Countdown.Five]: require('../../../audio/workout/characters/warrior/en/warrior_en_5.m4a'),
  [Countdown.Four]: require('../../../audio/workout/characters/warrior/en/warrior_en_4.m4a'),
  [Countdown.Three]: require('../../../audio/workout/characters/warrior/en/warrior_en_3.m4a'),
  [Countdown.Two]: require('../../../audio/workout/characters/warrior/en/warrior_en_2.m4a'),
  [Countdown.One]: require('../../../audio/workout/characters/warrior/en/warrior_en_1.m4a'),
  half: {
    standard: [
      require('../../../audio/workout/characters/warrior/en/warrior_en_half_v1.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_half_v2.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_half_v3.m4a'),
    ],
  },
  finish: {
    standard: [
      require('../../../audio/workout/characters/warrior/en/warrior_en_finish_v1.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_finish_v2.m4a'),
      require('../../../audio/workout/characters/warrior/en/warrior_en_finish_v3.m4a'),
    ],
  },
};

const warriorSk: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    short: require('../../../audio/workout/characters/warrior/sk/warrior_sk_warmup_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_warmup_v1.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_warmup_v2.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_warmup_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.WORK]: {
    short: require('../../../audio/workout/characters/warrior/sk/warrior_sk_work_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_work_v1.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_work_v2.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_work_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.REST]: {
    short: require('../../../audio/workout/characters/warrior/sk/warrior_sk_rest_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_rest_v1.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_rest_v2.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_rest_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    short: require('../../../audio/workout/characters/warrior/sk/warrior_sk_recovery_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_recovery_v1.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_recovery_v2.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_recovery_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    short: require('../../../audio/workout/characters/warrior/sk/warrior_sk_cooldown_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_cooldown_v1.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_cooldown_v2.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_cooldown_v3.m4a'),
    ],
  },
  [Countdown.Ten]: require('../../../audio/workout/characters/warrior/sk/warrior_sk_10.m4a'),
  [Countdown.Nine]: require('../../../audio/workout/characters/warrior/sk/warrior_sk_9.m4a'),
  [Countdown.Eight]: require('../../../audio/workout/characters/warrior/sk/warrior_sk_8.m4a'),
  [Countdown.Seven]: require('../../../audio/workout/characters/warrior/sk/warrior_sk_7.m4a'),
  [Countdown.Six]: require('../../../audio/workout/characters/warrior/sk/warrior_sk_6.m4a'),
  [Countdown.Five]: require('../../../audio/workout/characters/warrior/sk/warrior_sk_5.m4a'),
  [Countdown.Four]: require('../../../audio/workout/characters/warrior/sk/warrior_sk_4.m4a'),
  [Countdown.Three]: require('../../../audio/workout/characters/warrior/sk/warrior_sk_3.m4a'),
  [Countdown.Two]: require('../../../audio/workout/characters/warrior/sk/warrior_sk_2.m4a'),
  [Countdown.One]: require('../../../audio/workout/characters/warrior/sk/warrior_sk_1.m4a'),
  half: {
    standard: [
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_half_v1.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_half_v2.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_half_v3.m4a'),
    ],
  },
  finish: {
    standard: [
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_finish_v1.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_finish_v2.m4a'),
      require('../../../audio/workout/characters/warrior/sk/warrior_sk_finish_v3.m4a'),
    ],
  },
};

export const warriorSoundPathsByLanguage: WorkoutSoundPathsByLanguage = {
  [SupportedLanguageCode.cs]: warriorCs,
  [SupportedLanguageCode.en]: warriorEn,
  [SupportedLanguageCode.sk]: warriorSk,
};

export const warriorPreviewPathByLanguage: SoundPathByLanguage = {
  [SupportedLanguageCode.cs]: require('../../../audio/preview/characters/warrior/warrior_cs_preview.m4a'),
  [SupportedLanguageCode.en]: require('../../../audio/preview/characters/warrior/warrior_en_preview.m4a'),
  [SupportedLanguageCode.sk]: require('../../../audio/preview/characters/warrior/warrior_sk_preview.m4a'),
};
