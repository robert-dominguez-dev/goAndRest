import { useCallback, useRef } from 'react';
import { useNavigationContainerRef } from '@react-navigation/native';
import { getAnalytics } from '@react-native-firebase/analytics';
import { logScreenViewEvent } from '../helpers/logScreenViewEvent.ts';
import { AppNavigatorScreenParams } from '../AppNavigator/types.ts';

export const useNavigationAnalytics = () => {
  const navigationRef = useNavigationContainerRef<AppNavigatorScreenParams>();
  const routeNameRef = useRef<string | undefined>(undefined);

  const analytics = getAnalytics();

  const onReady = useCallback(() => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name;
  }, [navigationRef]);

  const onStateChange = useCallback(async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName && currentRouteName) {
      await logScreenViewEvent({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }

    routeNameRef.current = currentRouteName;
  }, [navigationRef, analytics]);

  return {
    navigationRef,
    onReady,
    onStateChange,
  };
};
