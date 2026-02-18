import { AppRow } from './AppRow.tsx';
import { formatTimerTime } from './AppCountdownText/helpers/formatTimerTime.tsx';
import { AppText } from './AppText/AppText.tsx';

type AppTimeViewProps = {
  seconds: number;
};

export const AppTimeView = ({ seconds }: AppTimeViewProps) => {
  const timeFormatted = formatTimerTime(seconds);

  return (
    <AppRow justifyContent={'center'}>
      <AppText
        category={'header'}
        textAlign={'center'}
        fontSizeOverride={100}>
        {timeFormatted}
      </AppText>
    </AppRow>
  );
};
