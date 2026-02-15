import { z } from 'zod';
import type { AppStoredWorkout } from '../types.ts';

const AppWorkoutSchema: z.ZodType<AppStoredWorkout> = z.object({
  id: z.string(),
  meta: z.object({
    name: z.string(),
    description: z.string().optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
  config: z.object({
    work: z.int(),
    rest: z.int(),
    series: z.int(),
    rounds: z.int(),
    brake: z.int(),
  }),
});

export const safeParseAppWorkouts = (
  storedWorkoutsUnsafe: string | null,
): AppStoredWorkout[] => {
  if (!storedWorkoutsUnsafe) {
    return [];
  }

  try {
    const parsedWorkouts = JSON.parse(storedWorkoutsUnsafe);

    if (!Array.isArray(parsedWorkouts)) {
      return [];
    }

    return parsedWorkouts.reduce<AppStoredWorkout[]>((acc, workout) => {
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
