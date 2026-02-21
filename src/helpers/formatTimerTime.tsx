import { ONE_SECOND_MS } from '../constants/common.ts';

const EXPIRED_FORMATTED_TIME = '0:00';

export const formatTimerTime = (msLeft: number): string => {
  const totalSeconds = Math.ceil(msLeft / ONE_SECOND_MS);

  if (totalSeconds <= 0) {
    return EXPIRED_FORMATTED_TIME;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = minutes.toString();
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};
