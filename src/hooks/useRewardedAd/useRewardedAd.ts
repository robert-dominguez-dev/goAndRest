import { useCallback, useRef } from 'react';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { ensureAdsInitialized } from './helpers/initializeAds.ts';
import { useAppTranslation } from '../../locales/hooks/useAppTranslation.ts';
import { useAppPopUp } from '../../components/common/AppPopUp/hooks/useAppPopUp.tsx';

// TODO: nahradit produkčním AdMob ad unit ID před release
export const REWARDED_AD_UNIT_ID = TestIds.REWARDED;

/**
 * `setHidden` controls the caller's bottom sheet Modal. It's hidden for
 * the entire duration an ad-related UI is on screen (the ad itself, or
 * this hook's own "ad not available" popup) and only restored once
 * that UI is fully dismissed - never simultaneously with the popup,
 * since two RN Modals becoming visible at almost the same time is
 * unreliable on Android (the second one can fail to surface).
 */
export const useRewardedAd = (setHidden: (hidden: boolean) => void) => {
  const t = useAppTranslation();

  const isShowingRef = useRef(false);

  const { popUp, onOpen: showAdNotAvailablePopUp } = useAppPopUp({
    title: t('common.adNotAvailablePopUp.title'),
    description: t('common.adNotAvailablePopUp.description'),
    primaryButtonProps: {
      label: t('common.ok'),
      onPress: () => setHidden(false),
    },
  });

  const showRewardedAd = useCallback(async (): Promise<boolean> => {
    if (isShowingRef.current) {
      return false;
    }

    isShowingRef.current = true;
    setHidden(true);

    const isReady = await ensureAdsInitialized();

    if (!isReady) {
      isShowingRef.current = false;
      showAdNotAvailablePopUp();
      return false;
    }

    return new Promise(resolve => {
      /**
       * No requestNonPersonalizedAdsOnly override here - consent is
       * gathered via the UMP flow in helpers/initializeAds.ts, which
       * already informs the SDK whether personalized ads are allowed.
       */
      const rewarded = RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID);

      let earnedReward = false;
      let resolved = false;

      const unsubscribers: (() => void)[] = [];

      const cleanup = () => {
        unsubscribers.forEach(unsubscribe => unsubscribe());
      };

      const resolveOnce = (result: boolean, keepHidden = false) => {
        if (resolved) {
          return;
        }
        resolved = true;
        cleanup();
        isShowingRef.current = false;

        if (!keepHidden) {
          setHidden(false);
        }

        resolve(result);
      };

      unsubscribers.push(
        rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          void rewarded.show();
        }),
      );

      unsubscribers.push(
        rewarded.addAdEventListener(AdEventType.ERROR, () => {
          showAdNotAvailablePopUp();
          resolveOnce(false, true);
        }),
      );

      unsubscribers.push(
        rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
          earnedReward = true;
        }),
      );

      unsubscribers.push(
        rewarded.addAdEventListener(AdEventType.CLOSED, () => {
          resolveOnce(earnedReward);
        }),
      );

      rewarded.load();
    });
  }, [setHidden, showAdNotAvailablePopUp]);

  return { showRewardedAd, popUp };
};
