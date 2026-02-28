import {
  Countdown,
  WorkoutSoundFilePaths,
  WorkoutSoundPathsByLanguage,
} from '../../../types.ts';
import { RunningWorkoutPhase } from '../../../../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { SupportedLanguageCode } from '../../../../contexts/AppLanguageProvider/constants.ts';

const cyborgCs: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    standard: [
      require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_warmup.mp3'),
    ],
  },
  [RunningWorkoutPhase.WORK]: {
    standard: [
      require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_work.mp3'),
    ],
  },
  [RunningWorkoutPhase.REST]: {
    standard: [
      require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_rest.mp3'),
    ],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    standard: [
      require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_recovery.mp3'),
    ],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    standard: [
      require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_cooldown.mp3'),
    ],
  },
  [Countdown.Ten]: require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_10.mp3'),
  [Countdown.Nine]: require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_9.mp3'),
  [Countdown.Eight]: require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_8.mp3'),
  [Countdown.Seven]: require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_7.mp3'),
  [Countdown.Six]: require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_6.mp3'),
  [Countdown.Five]: require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_5.mp3'),
  [Countdown.Four]: require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_4.mp3'),
  [Countdown.Three]: require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_3.mp3'),
  [Countdown.Two]: require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_2.mp3'),
  [Countdown.One]: require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_1.mp3'),
  half: {
    standard: [
      require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_half.mp3'),
    ],
  },
  finish: {
    standard: [
      require('../../../audio/workout/characters/cyborg/cs/cyborg_cs_finish.mp3'),
    ],
  },
};

export const cyborgSoundFileNamesByLanguage: WorkoutSoundPathsByLanguage = {
  [SupportedLanguageCode.cs]: cyborgCs,
  [SupportedLanguageCode.en]: cyborgCs,
  [SupportedLanguageCode.sk]: cyborgCs,
};

export const cyborgPreviewFileNameByLanguage: WorkoutSoundPathsByLanguage = {
  [SupportedLanguageCode.cs]: require('../../../audio/preview/characters/cyborg/cyborg_cs_preview.m4a'),
  [SupportedLanguageCode.en]: require('../../../audio/preview/characters/cyborg/cyborg_cs_preview.m4a'),
  [SupportedLanguageCode.sk]: require('../../../audio/preview/characters/cyborg/cyborg_cs_preview.m4a'),
};
