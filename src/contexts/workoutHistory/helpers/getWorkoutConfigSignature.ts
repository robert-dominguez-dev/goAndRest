import type { AppWorkoutConfig } from '../../AppWorkoutsProvider/types.ts';

export const getWorkoutConfigSignature = (config: AppWorkoutConfig): string =>
  `${config.work}-${config.rest}-${config.recovery}-${config.series}-${config.rounds}`;
