import {
  AppButton,
  AppButtonProps,
} from '../../../../../controls/AppButton/AppButton.tsx';
import { formatTimerTime } from '../../../../../common/AppCountdownText/helpers/formatTimerTime.tsx';

type WorkoutSettingsSecondsButtonProps = Omit<AppButtonProps, 'value'> & {
  seconds: number;
};

export const WorkoutSettingsSecondsButton = ({
  seconds,
  ...rest
}: WorkoutSettingsSecondsButtonProps) => {
  const timeFormatted = formatTimerTime(seconds);
  return (
    <AppButton
      {...rest}
      value={timeFormatted}
    />
  );
};
