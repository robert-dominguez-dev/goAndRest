import { Countdown, WorkoutSoundFilePaths } from '../../../types.ts';
import { RunningWorkoutPhase } from '../../../../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';

export const beepSoundPaths: WorkoutSoundFilePaths = {
  [RunningWorkoutPhase.WARMUP]: {
    standard: [require('../../../audio/workout/sounds/beep/beep_phase.m4a')],
  },
  [RunningWorkoutPhase.WORK]: {
    standard: [require('../../../audio/workout/sounds/beep/beep_phase.m4a')],
  },
  [RunningWorkoutPhase.REST]: {
    standard: [require('../../../audio/workout/sounds/beep/beep_phase.m4a')],
  },
  [RunningWorkoutPhase.RECOVERY]: {
    standard: [require('../../../audio/workout/sounds/beep/beep_phase.m4a')],
  },
  [RunningWorkoutPhase.COOLDOWN]: {
    standard: [require('../../../audio/workout/sounds/beep/beep_phase.m4a')],
  },
  [Countdown.Ten]: require('../../../audio/workout/sounds/beep/beep_countdown.m4a'),
  [Countdown.Nine]: require('../../../audio/workout/sounds/beep/beep_countdown.m4a'),
  [Countdown.Eight]: require('../../../audio/workout/sounds/beep/beep_countdown.m4a'),
  [Countdown.Seven]: require('../../../audio/workout/sounds/beep/beep_countdown.m4a'),
  [Countdown.Six]: require('../../../audio/workout/sounds/beep/beep_countdown.m4a'),
  [Countdown.Five]: require('../../../audio/workout/sounds/beep/beep_countdown.m4a'),
  [Countdown.Four]: require('../../../audio/workout/sounds/beep/beep_countdown.m4a'),
  [Countdown.Three]: require('../../../audio/workout/sounds/beep/beep_countdown.m4a'),
  [Countdown.Two]: require('../../../audio/workout/sounds/beep/beep_countdown.m4a'),
  [Countdown.One]: require('../../../audio/workout/sounds/beep/beep_countdown.m4a'),
  half: {
    standard: [require('../../../audio/workout/sounds/beep/beep_half.m4a')],
  },
  finish: {
    standard: [require('../../../audio/workout/sounds/beep/beep_finish.m4a')],
  },
};

export const beepPreviewPath: string = require('../../../audio/workout/sounds/beep/beep_half.m4a');
