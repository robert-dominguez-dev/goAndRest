import {
  getOnPressWithHapticFeedback,
  OnPressHandler,
} from './getOnPressWithHapticFeedback.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

export const getOnPressWithHapticFeedbackConditionally = <TParams>(
  onPress: OnPressHandler<TParams> | null | undefined,
  feedbackType?: HapticFeedbackTypes,
) =>
  onPress ? getOnPressWithHapticFeedback(onPress, feedbackType) : undefined;
