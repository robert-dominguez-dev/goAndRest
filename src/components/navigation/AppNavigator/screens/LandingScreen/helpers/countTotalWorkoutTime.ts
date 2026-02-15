import { AppWorkoutConfig } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { getNumber } from '../../../../../../helpers/getNumber.ts';

export const countTotalWorkoutTime = ({
  work,
  rest,
  series,
  rounds,
  brake,
}: Partial<AppWorkoutConfig>): number => {
  const workSafe = getNumber(work);
  const seriesSafe = getNumber(series);
  const roundsSafe = getNumber(rounds);

  const isInvalidConfig: boolean =
    workSafe <= 0 || seriesSafe <= 0 || roundsSafe <= 0;

  if (isInvalidConfig) {
    return 0;
  }

  const totalWorkTime = workSafe * seriesSafe;
  const totalRestTime = getNumber(rest) * (seriesSafe - 1);

  const totalRoundTime = totalWorkTime + totalRestTime;

  const totalRoundsTime = totalRoundTime * roundsSafe;
  const totalBrakesTime = getNumber(brake) * (roundsSafe - 1);

  return totalRoundsTime + totalBrakesTime;
};
