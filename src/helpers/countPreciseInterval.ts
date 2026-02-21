import { ONE_SECOND_MS } from '../constants/common.ts';

export const countPreciseInterval = () => {
  const elapsedMsInCurrentSecond = new Date().getMilliseconds();
  const msToNextSecond = ONE_SECOND_MS - elapsedMsInCurrentSecond;

  if (msToNextSecond < 500) {
    return 500;
  }

  if (msToNextSecond > 1500) {
    return 1500;
  }

  return msToNextSecond;
};
