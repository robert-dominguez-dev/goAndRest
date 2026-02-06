const EXPIRED_FORMATTED_TIME = '0:00';

export const formatTimerTime = (secondsLeft: number): string => {
  if (secondsLeft <= 0) {
    return EXPIRED_FORMATTED_TIME;
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formattedMinutes = minutes ?? '0';
  const formattedSeconds = seconds?.toString().padStart(2, '0') ?? '00';

  return `${formattedMinutes}:${formattedSeconds}`;
};
