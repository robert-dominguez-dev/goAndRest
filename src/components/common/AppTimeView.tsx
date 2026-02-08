import { AppRow } from './AppRow.tsx';
import { useAppTextStyle } from './AppText/hooks/useAppTextStyle.ts';
import { Text } from 'react-native';
import { formatTimerTime } from './AppCountdownText/helpers/formatTimerTime.tsx';
import { AppSize } from '../../types/ui.ts';

type AppTimeViewProps = {
  seconds: number;
  fontSize?: number;
};

export const AppTimeView = ({
  seconds,
  fontSize = AppSize['3xl'],
}: AppTimeViewProps) => {
  const style = useAppTextStyle({
    category: 'header',
  });

  const lineHeight = fontSize * 1.5;

  const timeFormatted = formatTimerTime(seconds);

  return (
    <AppRow justifyContent={'center'}>
      <Text
        style={{
          ...style,
          fontSize,
          lineHeight,
          textAlign: 'center',
        }}>
        {timeFormatted}
      </Text>
    </AppRow>
  );
};
