import { logEvent } from '@react-native-firebase/analytics';
import { logEventWrapper } from './logEventWrapper.ts';

type CustomEventName =
  | 'select_sound_feedback'
  | 'request_store_review_attempt'
  | 'request_store_review_success'
  | 'request_store_review_failure'
  | 'finish_workout';

type CustomEventParams = {
  soundFeedbackType?: string;
  soundFeedbackName?: string;
  isInAppReviewAvailable?: boolean;
  reviewType?: 'in_app_review' | 'store_redirect' | 'web_url_redirect';
  errorMessage?: string;
  finishedWorkoutsCount?: number;
};

export type CustomAnalyticsParams = {
  eventName: CustomEventName;
  eventParams: CustomEventParams;
};

export const logCustomEvent = async (
  eventName: CustomEventName,
  params?: CustomEventParams,
) =>
  logEventWrapper(
    analytics => logEvent(analytics, eventName, params),
    eventName,
    params,
  );
