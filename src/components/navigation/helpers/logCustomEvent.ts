import { logEvent } from '@react-native-firebase/analytics';
import { logEventWrapper } from './logEventWrapper.ts';

type CustomEventName = 'select_sound_feedback';

type CustomEventParams = {
  soundFeedbackType: string;
  soundFeedbackName: string;
};

export type CustomAnalyticsParams = {
  eventName: CustomEventName;
  eventParams: CustomEventParams;
};

export const logCustomEvent = async (
  eventName: CustomEventName,
  params: CustomEventParams,
) =>
  logEventWrapper(
    analytics => logEvent(analytics, eventName, params),
    eventName,
    params,
  );
