import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
  HapticOptions,
} from 'react-native-haptic-feedback';

const options: HapticOptions = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: true,
};

export const triggerHapticFeedback = (
  feedbackType: HapticFeedbackTypes = HapticFeedbackTypes.clockTick,
) => ReactNativeHapticFeedback.trigger(feedbackType, options);
