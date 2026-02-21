import { AppRow } from './AppRow.tsx';
import { formatTimerTime } from '../../helpers/formatTimerTime.tsx';
import { AppText, AppTextProps } from './AppText/AppText.tsx';

type AppTimeViewProps = Pick<AppTextProps, 'fontSizeOverride'> & {
  msLeft: number;
};

export const AppTimeView = ({
  msLeft,
  fontSizeOverride = 100,
}: AppTimeViewProps) => {
  const timeFormatted = formatTimerTime(msLeft);

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
