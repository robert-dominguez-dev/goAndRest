import { Analytics, getAnalytics } from '@react-native-firebase/analytics';
import { logDevAnalyticsError } from './logDevAnalyticsError.ts';
import { IS_DEV_MODE } from '../../../constants/common.ts';
import {
  EventParams,
  logDevAnalyticsSuccess,
} from './logDevAnalyticsSuccess.ts';

export const logEventWrapper = async (
  callback: (analytics: Analytics) => Promise<void>,
  eventType: string,
  params?: EventParams,
) => {
  try {
    if (IS_DEV_MODE) {
      logDevAnalyticsSuccess(eventType, params);
    } else {
      const analytics = getAnalytics();
      await callback(analytics);
    }
  } catch (error) {
    if (IS_DEV_MODE) {
      logDevAnalyticsError(eventType, error);
    }
  }
};
