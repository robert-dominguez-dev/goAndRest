import { AppText } from '../AppText/AppText.tsx';

import { memo, useRef, useState } from 'react';
import { SPACE_ON_ANDROID_TO_PREVENT_TEXT_CUT } from '../../../constants/ui.ts';
import { usePreciseTimeout } from '../../../hooks/usePreciseTimeout.ts';
import { ONE_MINUTE_SECONDS } from '../../../constants/common.ts';
import { formatTimerTime } from './helpers/formatTimerTime.tsx';

export type AppCountdownTextProps = {
  minutes: number;
  seconds: number;
  onTimeout: () => void;
};

const _AppCountdownText = ({
  minutes,
  seconds,
  onTimeout,
}: AppCountdownTextProps) => {
  const [secondsLeft, setSecondsLeft] = useState(
    minutes * ONE_MINUTE_SECONDS + seconds,
  );

  const isTimeoutCallbackAlreadyCalledRef = useRef(false);

  const handleTick = () =>
    setSecondsLeft(prev => {
      const isExpired = prev <= 0;

      if (isExpired) {
        if (!isTimeoutCallbackAlreadyCalledRef.current) {
          onTimeout();
          isTimeoutCallbackAlreadyCalledRef.current = true;
        }
        return 0;
      }

      return prev - 1;
    });

  const timerEnabled = secondsLeft > 0;

  usePreciseTimeout(handleTick, timerEnabled, []);

  const timeFormatted = formatTimerTime(secondsLeft);

  return (
    <AppText
      grow={false}
      shrink={false}
      category={'header'}>
      {timeFormatted}
      {SPACE_ON_ANDROID_TO_PREVENT_TEXT_CUT}
    </AppText>
  );
};

export const AppCountdownText = memo(_AppCountdownText);
