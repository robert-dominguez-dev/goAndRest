import {
  Countdown,
  SoundPathByLanguage,
  WorkoutSoundFilePaths,
  WorkoutSoundPathsByLanguage,
} from '../../../types.ts';
import { SupportedLanguageCode } from '../../../../contexts/AppLanguageProvider/constants.ts';
import { RunningWorkoutPhase } from '../../../../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';

const briefFemaleCs: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_warmup_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_warmup_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_warmup_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.WORK]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_work_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_work_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_work_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.REST]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_rest_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_rest_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_rest_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_recovery_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_recovery_v2.m4a'),
    ],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_cooldown_v1.m4a'),
    ],
  },
  [Countdown.Ten]: require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_10.m4a'),
  [Countdown.Nine]: require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_9.m4a'),
  [Countdown.Eight]: require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_8.m4a'),
  [Countdown.Seven]: require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_7.m4a'),
  [Countdown.Six]: require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_6.m4a'),
  [Countdown.Five]: require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_5.m4a'),
  [Countdown.Four]: require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_4.m4a'),
  [Countdown.Three]: require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_3.m4a'),
  [Countdown.Two]: require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_2.m4a'),
  [Countdown.One]: require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_1.m4a'),
  half: {
    standard: [
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_half_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_half_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_half_v3.m4a'),
    ],
  },
  finish: {
    standard: [
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_finish_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_finish_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/cs/brief_female_cs_finish_v3.m4a'),
    ],
  },
};

const briefFemaleEn: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_warmup_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_warmup_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_warmup_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.WORK]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_work_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_work_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_work_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.REST]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_rest_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_rest_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_rest_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_recovery_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_recovery_v2.m4a'),
    ],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_cooldown_v1.m4a'),
    ],
  },
  [Countdown.Ten]: require('../../../audio/workout/voices/brief/female/en/brief_female_en_10.m4a'),
  [Countdown.Nine]: require('../../../audio/workout/voices/brief/female/en/brief_female_en_9.m4a'),
  [Countdown.Eight]: require('../../../audio/workout/voices/brief/female/en/brief_female_en_8.m4a'),
  [Countdown.Seven]: require('../../../audio/workout/voices/brief/female/en/brief_female_en_7.m4a'),
  [Countdown.Six]: require('../../../audio/workout/voices/brief/female/en/brief_female_en_6.m4a'),
  [Countdown.Five]: require('../../../audio/workout/voices/brief/female/en/brief_female_en_5.m4a'),
  [Countdown.Four]: require('../../../audio/workout/voices/brief/female/en/brief_female_en_4.m4a'),
  [Countdown.Three]: require('../../../audio/workout/voices/brief/female/en/brief_female_en_3.m4a'),
  [Countdown.Two]: require('../../../audio/workout/voices/brief/female/en/brief_female_en_2.m4a'),
  [Countdown.One]: require('../../../audio/workout/voices/brief/female/en/brief_female_en_1.m4a'),
  half: {
    standard: [
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_half_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_half_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_half_v3.m4a'),
    ],
  },
  finish: {
    standard: [
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_finish_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_finish_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/en/brief_female_en_finish_v3.m4a'),
    ],
  },
};

const briefFemaleSk: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_warmup_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_warmup_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_warmup_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.WORK]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_work_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_work_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_work_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.REST]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_rest_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_rest_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_rest_v3.m4a'),
    ],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_recovery_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_recovery_v2.m4a'),
    ],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    standard: [
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_cooldown_v1.m4a'),
    ],
  },
  [Countdown.Ten]: require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_10.m4a'),
  [Countdown.Nine]: require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_9.m4a'),
  [Countdown.Eight]: require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_8.m4a'),
  [Countdown.Seven]: require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_7.m4a'),
  [Countdown.Six]: require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_6.m4a'),
  [Countdown.Five]: require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_5.m4a'),
  [Countdown.Four]: require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_4.m4a'),
  [Countdown.Three]: require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_3.m4a'),
  [Countdown.Two]: require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_2.m4a'),
  [Countdown.One]: require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_1.m4a'),
  half: {
    standard: [
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_half_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_half_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_half_v3.m4a'),
    ],
  },
  finish: {
    standard: [
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_finish_v1.m4a'),
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_finish_v2.m4a'),
      require('../../../audio/workout/voices/brief/female/sk/brief_female_sk_finish_v3.m4a'),
    ],
  },
};

export const briefFemaleSoundPathsByLanguage: WorkoutSoundPathsByLanguage = {
  [SupportedLanguageCode.cs]: briefFemaleCs,
  [SupportedLanguageCode.en]: briefFemaleEn,
  [SupportedLanguageCode.sk]: briefFemaleSk,
};

export const briefFemalePreviewPathByLanguage: SoundPathByLanguage = {
  [SupportedLanguageCode.cs]: require('../../../audio/preview/voices/brief/female/brief_female_cs_preview.m4a'),
  [SupportedLanguageCode.en]: require('../../../audio/preview/voices/brief/female/brief_female_en_preview.m4a'),
  [SupportedLanguageCode.sk]: require('../../../audio/preview/voices/brief/female/brief_female_sk_preview.m4a'),
};
