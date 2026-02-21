import { AppRow } from './AppRow.tsx';
import { formatTimerTime } from './AppCountdownText/helpers/formatTimerTime.tsx';
import { AppText, AppTextProps } from './AppText/AppText.tsx';

type AppTimeViewProps = Pick<AppTextProps, 'fontSizeOverride'> & {
  seconds: number;
};

export const AppTimeView = ({
  seconds,
  fontSizeOverride = 100,
}: AppTimeViewProps) => {
  const timeFormatted = formatTimerTime(seconds);

  return (
    <AppRow justifyContent={'center'}>
      <AppText
        textAlign={'center'}
        category={'header'}
        fontSizeOverride={fontSizeOverride}>
        {timeFormatted}
      </AppText>
    </AppRow>
  );
};
