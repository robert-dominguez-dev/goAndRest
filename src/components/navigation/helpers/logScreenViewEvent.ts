import {
  logEvent,
  ScreenViewParameters,
} from '@react-native-firebase/analytics';
import { EventNameString } from '@firebase/analytics';
import { logEventWrapper } from './logEventWrapper.ts';

const EVENT_NAME: EventNameString = 'screen_view';

export const logScreenViewEvent = async (params: ScreenViewParameters) =>
  logEventWrapper(
    analytics => logEvent(analytics, EVENT_NAME, params),
    EVENT_NAME,
    params,
  );
