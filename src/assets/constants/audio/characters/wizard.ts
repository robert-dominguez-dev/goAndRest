import {
  Countdown,
  SoundPathByLanguage,
  WorkoutSoundFilePaths,
  WorkoutSoundPathsByLanguage,
} from '../../../types.ts';
import { SupportedLanguageCode } from '../../../../contexts/AppLanguageProvider/constants.ts';
import { RunningWorkoutPhase } from '../../../../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';

const wizardCs: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    short: require('../../../audio/workout/characters/wizard/cs/wizard_cs_warmup_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_warmup_v1.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_warmup_v2.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_warmup_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.WORK]: {
    short: require('../../../audio/workout/characters/wizard/cs/wizard_cs_work_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_work_v1.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_work_v2.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_work_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.REST]: {
    short: require('../../../audio/workout/characters/wizard/cs/wizard_cs_rest_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_rest_v1.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_rest_v2.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_rest_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    short: require('../../../audio/workout/characters/wizard/cs/wizard_cs_recovery_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_recovery_v1.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_recovery_v2.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_recovery_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    short: require('../../../audio/workout/characters/wizard/cs/wizard_cs_cooldown_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_cooldown_v1.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_cooldown_v2.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_cooldown_v3.m4a'),
    ],
  },
  [Countdown.Ten]: require('../../../audio/workout/characters/wizard/cs/wizard_cs_10.m4a'),
  [Countdown.Nine]: require('../../../audio/workout/characters/wizard/cs/wizard_cs_9.m4a'),
  [Countdown.Eight]: require('../../../audio/workout/characters/wizard/cs/wizard_cs_8.m4a'),
  [Countdown.Seven]: require('../../../audio/workout/characters/wizard/cs/wizard_cs_7.m4a'),
  [Countdown.Six]: require('../../../audio/workout/characters/wizard/cs/wizard_cs_6.m4a'),
  [Countdown.Five]: require('../../../audio/workout/characters/wizard/cs/wizard_cs_5.m4a'),
  [Countdown.Four]: require('../../../audio/workout/characters/wizard/cs/wizard_cs_4.m4a'),
  [Countdown.Three]: require('../../../audio/workout/characters/wizard/cs/wizard_cs_3.m4a'),
  [Countdown.Two]: require('../../../audio/workout/characters/wizard/cs/wizard_cs_2.m4a'),
  [Countdown.One]: require('../../../audio/workout/characters/wizard/cs/wizard_cs_1.m4a'),
  half: {
    standard: [
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_half_v1.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_half_v2.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_half_v3.m4a'),
    ],
  },
  finish: {
    standard: [
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_finish_v1.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_finish_v2.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_finish_v3.m4a'),
    ],
  },
};

const wizardEn: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    short: require('../../../audio/workout/characters/wizard/en/wizard_en_warmup_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/en/wizard_en_warmup_v1.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_warmup_v2.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_warmup_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.WORK]: {
    short: require('../../../audio/workout/characters/wizard/en/wizard_en_work_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/en/wizard_en_work_v1.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_work_v2.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_work_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.REST]: {
    short: require('../../../audio/workout/characters/wizard/en/wizard_en_rest_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/en/wizard_en_rest_v1.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_rest_v2.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_rest_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    short: require('../../../audio/workout/characters/wizard/en/wizard_en_recovery_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/en/wizard_en_recovery_v1.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_recovery_v2.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_recovery_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    short: require('../../../audio/workout/characters/wizard/en/wizard_en_cooldown_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/en/wizard_en_cooldown_v1.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_cooldown_v2.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_cooldown_v3.m4a'),
    ],
  },
  [Countdown.Ten]: require('../../../audio/workout/characters/wizard/en/wizard_en_10.m4a'),
  [Countdown.Nine]: require('../../../audio/workout/characters/wizard/en/wizard_en_9.m4a'),
  [Countdown.Eight]: require('../../../audio/workout/characters/wizard/en/wizard_en_8.m4a'),
  [Countdown.Seven]: require('../../../audio/workout/characters/wizard/en/wizard_en_7.m4a'),
  [Countdown.Six]: require('../../../audio/workout/characters/wizard/en/wizard_en_6.m4a'),
  [Countdown.Five]: require('../../../audio/workout/characters/wizard/en/wizard_en_5.m4a'),
  [Countdown.Four]: require('../../../audio/workout/characters/wizard/en/wizard_en_4.m4a'),
  [Countdown.Three]: require('../../../audio/workout/characters/wizard/en/wizard_en_3.m4a'),
  [Countdown.Two]: require('../../../audio/workout/characters/wizard/en/wizard_en_2.m4a'),
  [Countdown.One]: require('../../../audio/workout/characters/wizard/en/wizard_en_1.m4a'),
  half: {
    standard: [
      require('../../../audio/workout/characters/wizard/en/wizard_en_half_v1.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_half_v2.m4a'),
      require('../../../audio/workout/characters/wizard/en/wizard_en_half_v3.m4a'),
    ],
  },
  finish: {
    standard: [
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_finish_v1.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_finish_v2.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_finish_v3.m4a'),
    ],
  },
};

const wizardSk: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    short: require('../../../audio/workout/characters/wizard/sk/wizard_sk_warmup_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_warmup_v1.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_warmup_v2.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_warmup_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.WORK]: {
    short: require('../../../audio/workout/characters/wizard/sk/wizard_sk_work_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_work_v1.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_work_v2.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_work_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.REST]: {
    short: require('../../../audio/workout/characters/wizard/sk/wizard_sk_rest_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_rest_v1.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_rest_v2.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_rest_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    short: require('../../../audio/workout/characters/wizard/sk/wizard_sk_recovery_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_recovery_v1.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_recovery_v2.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_recovery_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    short: require('../../../audio/workout/characters/wizard/sk/wizard_sk_cooldown_short.m4a'),
    standard: [
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_cooldown_v1.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_cooldown_v2.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_cooldown_v3.m4a'),
    ],
  },
  [Countdown.Ten]: require('../../../audio/workout/characters/wizard/sk/wizard_sk_10.m4a'),
  [Countdown.Nine]: require('../../../audio/workout/characters/wizard/sk/wizard_sk_9.m4a'),
  [Countdown.Eight]: require('../../../audio/workout/characters/wizard/sk/wizard_sk_8.m4a'),
  [Countdown.Seven]: require('../../../audio/workout/characters/wizard/sk/wizard_sk_7.m4a'),
  [Countdown.Six]: require('../../../audio/workout/characters/wizard/sk/wizard_sk_6.m4a'),
  [Countdown.Five]: require('../../../audio/workout/characters/wizard/sk/wizard_sk_5.m4a'),
  [Countdown.Four]: require('../../../audio/workout/characters/wizard/sk/wizard_sk_4.m4a'),
  [Countdown.Three]: require('../../../audio/workout/characters/wizard/sk/wizard_sk_3.m4a'),
  [Countdown.Two]: require('../../../audio/workout/characters/wizard/sk/wizard_sk_2.m4a'),
  [Countdown.One]: require('../../../audio/workout/characters/wizard/sk/wizard_sk_1.m4a'),
  half: {
    standard: [
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_half_v1.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_half_v2.m4a'),
      require('../../../audio/workout/characters/wizard/sk/wizard_sk_half_v3.m4a'),
    ],
  },
  finish: {
    standard: [
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_finish_v1.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_finish_v2.m4a'),
      require('../../../audio/workout/characters/wizard/cs/wizard_cs_finish_v3.m4a'),
    ],
  },
};

export const wizardSoundPathsByLanguage: WorkoutSoundPathsByLanguage = {
  [SupportedLanguageCode.cs]: wizardCs,
  [SupportedLanguageCode.en]: wizardEn,
  [SupportedLanguageCode.sk]: wizardSk,
};

export const wizardPreviewPathByLanguage: SoundPathByLanguage = {
  [SupportedLanguageCode.cs]: require('../../../audio/preview/characters/wizard/wizard_cs_preview.m4a'),
  [SupportedLanguageCode.en]: require('../../../audio/preview/characters/wizard/wizard_en_preview.m4a'),
  [SupportedLanguageCode.sk]: require('../../../audio/preview/characters/wizard/wizard_sk_preview.m4a'),
};
