import {
  getOnPressWithHapticFeedback,
  OnPressHandler,
} from './getOnPressWithHapticFeedback.ts';

export const getOnPressWithHapticFeedbackConditionally = <TParams>(
  onPress: OnPressHandler<TParams> | null | undefined,
) => (onPress ? getOnPressWithHapticFeedback(onPress) : undefined);
