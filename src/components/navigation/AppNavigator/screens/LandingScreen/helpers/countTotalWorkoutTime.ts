import { getNumber } from '../../../../../../helpers/getNumber.ts';
import { AppRunningWorkoutConfig } from '../../RunningWorkoutScreen/types.ts';

export const countTotalWorkoutTime = ({
  warmup,
  work,
  rest,
  series,
  rounds,
  recovery,
  cooldown,
}: Partial<AppRunningWorkoutConfig>): number => {
  const warmupSafe = getNumber(warmup);
  const workSafe = getNumber(work);
  const seriesSafe = getNumber(series);
  const roundsSafe = getNumber(rounds);
  const restSafe = getNumber(rest);
  const recoverySafe = getNumber(recovery);
  const cooldownSafe = getNumber(cooldown);

  const isInvalidConfig: boolean =
    workSafe <= 0 || seriesSafe <= 0 || roundsSafe <= 0;

  if (isInvalidConfig) {
    return 0;
  }

  const totalWorkTime = workSafe * seriesSafe;
  const totalRestTime = restSafe * (seriesSafe - 1);

  const totalRoundTime = totalWorkTime + totalRestTime;

  const totalRoundsTime = totalRoundTime * roundsSafe;
  const totalRecoveryTime = recoverySafe * (roundsSafe - 1);

  return warmupSafe + totalRoundsTime + totalRecoveryTime + cooldownSafe;
};
