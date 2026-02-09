import { z } from 'zod';
import type { AppWorkout } from '../types.ts';

const AppWorkoutSchema: z.ZodType<AppWorkout> = z.object({
  id: z.string(),
  meta: z.object({
    name: z.string(),
    description: z.string().optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
  config: z.object({
    prep: z.int(),
    work: z.int(),
    rest: z.int(),
    rounds: z.int(),
    cooldown: z.int(),
  }),
});

export const safeParseAppWorkouts = (
  storedWorkoutsUnsafe: string | null,
): AppWorkout[] => {
  if (!storedWorkoutsUnsafe) {
    return [];
  }

  try {
    const parsedWorkouts = JSON.parse(storedWorkoutsUnsafe);

    if (!Array.isArray(parsedWorkouts)) {
      return [];
    }

    return parsedWorkouts.reduce<AppWorkout[]>((acc, workout) => {
      const result = AppWorkoutSchema.safeParse(workout);

      if (result.success) {
        acc.push(result.data);
      }

      return acc;
    }, []);
  } catch (error) {
    console.error(error);
    return [];
  }
};
