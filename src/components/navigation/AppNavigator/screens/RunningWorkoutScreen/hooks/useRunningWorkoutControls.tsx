import { useWorkoutTimer } from '../../../../../../hooks/useWorkoutTimer.ts';
import { ONE_SECOND_MS } from '../../../../../../constants/common.ts';
import { clearWorkoutSoundsQueue } from '../../../../../../hooks/useInitiateWorkoutSounds/helpers/clearWorkoutSoundsQueue.ts';
import { useHandleAppInBackgroundDuringWorkout } from '../../../../../../hooks/useHandleAppInBackgroundDuringWorkout.ts';

export const SKIP_SECONDS = 15;
const SKIP_MS = SKIP_SECONDS * ONE_SECOND_MS;

export const useRunningWorkoutControls = () => {
  const { resume, pause, skip, isRunning } = useWorkoutTimer();

  useHandleAppInBackgroundDuringWorkout(pause);

  const handlePause = async () => {
    await clearWorkoutSoundsQueue();
    pause();
  };

  const skipBackward = async () => {
    await clearWorkoutSoundsQueue();
    skip(-SKIP_MS);
  };

  const skipForward = async () => {
    await clearWorkoutSoundsQueue();
    skip(SKIP_MS);
  };

  return { pause: handlePause, resume, skipForward, skipBackward, isRunning };
};
