import { logEvent } from '@react-native-firebase/analytics';
import { logEventWrapper } from './logEventWrapper.ts';

type CustomEventName =
  | 'select_sound_feedback'
  | 'request_store_review_attempt'
  | 'request_store_review_success'
  | 'request_store_review_failure'
  | 'finish_workout'
  | 'ads_consent_failure'
  | 'rewarded_ad_attempt'
  | 'rewarded_ad_not_available'
  | 'rewarded_ad_earned_reward'
  | 'premium_character_activated'
  | 'premium_character_extended';

type CustomEventParams = {
  soundFeedbackType?: string;
  soundFeedbackName?: string;
  isInAppReviewAvailable?: boolean;
  reviewType?: 'in_app_review' | 'store_redirect' | 'web_url_redirect';
  errorMessage?: string;
  message?: string;
  finishedWorkoutsCount?: number;
  reason?: 'consent_or_init' | 'load_error';
  characterVariant?: string;
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
