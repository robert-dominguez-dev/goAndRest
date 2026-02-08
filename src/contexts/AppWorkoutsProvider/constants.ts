import { AppWorkout } from './types.ts';

export const defaultWorkoutConfig: AppWorkout = {
  id: 'DEFAULT_WORKOUT',
  meta: {
    name: '',
    description: '',
    createdAt: new Date('2026-02-08T14:23:05.123Z'),
    updatedAt: new Date('2026-02-08T14:23:05.123Z'),
  },
  config: {
    prep: 10,
    work: 90,
    rest: 30,
    rounds: 5,
    cooldown: 30,
  },
};
