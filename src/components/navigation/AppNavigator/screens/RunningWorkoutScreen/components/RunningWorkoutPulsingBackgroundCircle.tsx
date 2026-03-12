import { UseWorkoutPhasePulsingValueParams } from '../hooks/useWorkoutPhasePulsingValue.ts';
import { RunningWorkoutPhase } from '../types.ts';
import {
  workoutPhaseToPulsingAnimationConfig,
  workoutPhaseToTimerColorStatus,
} from '../constants.tsx';
import { RunningWorkoutPulsingBackground } from './RunningWorkoutPulsingBackground.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';

type RunningWorkoutPulsingBackgroundProps = Pick<
  UseWorkoutPhasePulsingValueParams,
  'enabled'
> & {
  workoutPhase: RunningWorkoutPhase;
  size: number;
};

export const RunningWorkoutPulsingBackgroundCircle = ({
  workoutPhase,
  size,
  enabled,
}: RunningWorkoutPulsingBackgroundProps) => (
  <AppView
    position={'absolute'}
    overflow={'hidden'}
    width={size}
    height={size}
    borderRadius={size / 2}>
    <RunningWorkoutPulsingBackground
      enabled={enabled}
      timingConfig={workoutPhaseToPulsingAnimationConfig[workoutPhase]}
      backgroundColorStatus={workoutPhaseToTimerColorStatus[workoutPhase]}
    />
  </AppView>
);
