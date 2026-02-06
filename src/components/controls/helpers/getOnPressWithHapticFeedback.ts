import { triggerHapticFeedback } from './triggerHapticFeedback.ts';

type OnPressHandler<TParams> = ((params: TParams) => void) | undefined | null;

export const getOnPressWithHapticFeedback = <TParams>(
  onPress: OnPressHandler<TParams>,
) =>
  onPress
    ? (params: TParams) => {
        triggerHapticFeedback();
        onPress(params);
      }
    : undefined;
