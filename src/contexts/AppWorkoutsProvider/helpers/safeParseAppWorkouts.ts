import { z } from 'zod';
import type { AppWorkout } from '../types.ts';
import { AppWorkoutBlockType } from '../types.ts';

const AppWorkoutSchema: z.ZodType<AppWorkout> = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  blocks: z
    .array(
      z.object({
        type: z.enum(AppWorkoutBlockType),
        name: z.string(),
        rounds: z.int().positive(),
      }),
    )
    .min(1),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
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
