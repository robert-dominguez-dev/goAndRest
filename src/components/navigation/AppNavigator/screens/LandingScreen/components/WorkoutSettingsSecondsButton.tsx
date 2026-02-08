import {
  AppButton,
  AppButtonProps,
} from '../../../../../controls/AppButton/AppButton.tsx';
import { formatTime } from 'jest-util';

type WorkoutSettingsSecondsButtonProps = Omit<AppButtonProps, 'value'> & {
  seconds: number;
};

export const WorkoutSettingsSecondsButton = ({
  seconds,
  ...rest
}: WorkoutSettingsSecondsButtonProps) => {
  const timeFormatted = formatTime(seconds);
  return (
    <AppButton
      {...rest}
      value={timeFormatted}
    />
  );
};
