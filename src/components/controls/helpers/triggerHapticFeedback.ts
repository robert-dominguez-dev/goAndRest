import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
  HapticOptions,
} from 'react-native-haptic-feedback';
import { IS_ANDROID } from '../../../constants/common.ts';

const options: HapticOptions = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: true,
};

export const triggerHapticFeedback = (
  feedbackType: HapticFeedbackTypes = IS_ANDROID
    ? HapticFeedbackTypes.impactLight
    : HapticFeedbackTypes.selection,
) => ReactNativeHapticFeedback.trigger(feedbackType, options);
