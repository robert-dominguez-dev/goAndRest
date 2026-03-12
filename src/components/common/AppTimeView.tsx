import { AppRow } from './AppRow.tsx';
import { formatTimerTime } from '../../helpers/formatTimerTime.tsx';
import { AppText, AppTextProps } from './AppText/AppText.tsx';
import { getAppSize } from '../../helpers/getAppSize.ts';
import { getNumber } from '../../helpers/getNumber.ts';

type AppTimeViewProps = Pick<
  AppTextProps,
  'fontSizeOverride' | 'colorStatus'
> & {
  msLeft: number;
  prefix?: string;
};

export const AppTimeView = ({
  msLeft,
  colorStatus,
  prefix,
  fontSizeOverride = 100,
}: AppTimeViewProps) => {
  const timeFormatted = formatTimerTime(msLeft);
  const marginCorrection = getNumber(getAppSize(fontSizeOverride)) / 20;

  return (
    <AppRow justifyContent={'center'}>
      <AppText
        grow={false}
        textAlign={'center'}
        category={'header'}
        marginCorrection={marginCorrection}
        colorStatus={colorStatus}
        fontSizeOverride={fontSizeOverride}>
        {prefix}
        {timeFormatted}
      </AppText>
    </AppRow>
  );
};
