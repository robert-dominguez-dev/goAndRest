import { AppWorkoutConfig } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { getNumber } from '../../../../../../helpers/getNumber.ts';

export const countTotalWorkoutTime = ({
  prep,
  work,
  rest,
  rounds,
  cooldown,
}: Partial<AppWorkoutConfig>) => {
  const roundsSafe = getNumber(rounds);

  const totalWorkTime = getNumber(work) * roundsSafe;
  const totalRestTime = getNumber(rest) * (roundsSafe - 1);

  return getNumber(prep) + totalWorkTime + totalRestTime + getNumber(cooldown);
};
