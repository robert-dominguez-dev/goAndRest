import { AppNavigatorScreen } from '../AppNavigator/types.ts';
import { useRef } from 'react';
import { useRootStackNavigation } from './useRootStackNavigation.ts';
import { IS_DEV_MODE } from '../../../constants/common.ts';

const MAX_PRESSES_TIME_GAP_TO_INCREASE_COUNT_IN_MS = 500;
const NAVIGATE_TO_DEV_SCREEN_PRESSES_THRESHOLD = 4;

export const useDevScreenEasterEggHandler = () => {
  const pressCountRef = useRef(0);
  const lastPressTimestampRef = useRef<number | undefined>(undefined);

  const navigation = useRootStackNavigation();

  const handleDevScreenEasterEggPress = () => {
    const currentTimestamp = Date.now();
    const lastPressTimestamp =
      lastPressTimestampRef.current ?? currentTimestamp;

    const timeDifferenceInMs = currentTimestamp - lastPressTimestamp;

    const shouldResetCounter =
      timeDifferenceInMs > MAX_PRESSES_TIME_GAP_TO_INCREASE_COUNT_IN_MS;

    if (shouldResetCounter) {
      pressCountRef.current = 0;
    }

    pressCountRef.current += 1;
    lastPressTimestampRef.current = currentTimestamp;

    const shouldNavigateToDevScreen =
      pressCountRef.current >= NAVIGATE_TO_DEV_SCREEN_PRESSES_THRESHOLD;

    if (!shouldNavigateToDevScreen) {
      return undefined;
    }

    navigation?.navigate(AppNavigatorScreen.DevScreen);
  };

  return IS_DEV_MODE ? handleDevScreenEasterEggPress : undefined;
};
