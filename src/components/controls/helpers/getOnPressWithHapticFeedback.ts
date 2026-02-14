import { triggerHapticFeedback } from './triggerHapticFeedback.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

export type OnPressHandler<TParams> = (params: TParams) => void;

export const getOnPressWithHapticFeedback =
  <TParams>(
    onPress: OnPressHandler<TParams>,
    feedbackType?: HapticFeedbackTypes,
  ) =>
  (params: TParams) => {
    triggerHapticFeedback(feedbackType);
    onPress(params);
  };
