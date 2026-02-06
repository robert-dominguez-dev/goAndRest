import { Pressable, PressableProps } from 'react-native';
import {
  appButtonStatusToDisabledProps,
  appButtonStatusToEnabledBackgroundColorStatus,
} from './constants.ts';
import { AppButtonDisabledDependentProps } from './types.ts';
import { AppButtonUI, AppButtonUIProps } from './components/AppButtonUI.tsx';
import { getOnPressWithHapticFeedback } from '../helpers/getOnPressWithHapticFeedback.ts';

export type AppButtonProps = Pick<PressableProps, 'onPress' | 'disabled'> &
  Partial<Pick<AppButtonUIProps, 'status' | 'isPending'>> & {
    enabledLabel: string;
    disabledLabel?: string;
  };

export const AppButton = ({
  enabledLabel,
  disabledLabel,
  onPress,
  disabled,
  isPending,
  status = 'primary',
}: AppButtonProps) => {
  const {
    label,
    textColorStatus,
    backgroundColorStatus,
  }: AppButtonDisabledDependentProps = disabled
    ? {
        label: disabledLabel ?? enabledLabel,
        ...appButtonStatusToDisabledProps[status],
      }
    : {
        label: enabledLabel,
        backgroundColorStatus:
          appButtonStatusToEnabledBackgroundColorStatus[status],
        textColorStatus: 'text',
      };

  return (
    <Pressable
      onPress={getOnPressWithHapticFeedback(onPress)}
      disabled={disabled}>
      <AppButtonUI
        label={label}
        isPending={isPending}
        status={status}
        textColorStatus={textColorStatus}
        backgroundColorStatus={backgroundColorStatus}
      />
    </Pressable>
  );
};
