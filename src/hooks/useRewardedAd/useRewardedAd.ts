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
 * `setHidden` controls the caller's bottom sheet Modal. It's only ever
 * hidden right before showing this hook's own "ad not available"
 * popup - two RN Modals becoming visible at almost the same time is
 * unreliable on Android. The popup's own button restores it.
 *
 * The bottom sheet is deliberately left visible (untouched) while the
 * actual rewarded ad is loading/showing: toggling the Modal's
 * `visible` prop right as the native ad activity is being presented
 * made the ad close itself immediately (a window-focus change is
 * apparently read as the user backing out), so the ad is simply shown
 * on top of the still-visible sheet instead.
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

    const isReady = await ensureAdsInitialized();

    if (!isReady) {
      isShowingRef.current = false;
      setHidden(true);
      showAdNotAvailablePopUp();
      return false;
    }

    return new Promise(resolve => {
      const rewarded = RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID);

      let earnedReward = false;
      let resolved = false;

      const unsubscribers: (() => void)[] = [];

      const cleanup = () => {
        unsubscribers.forEach(unsubscribe => unsubscribe());
      };

      const resolveOnce = (result: boolean) => {
        if (resolved) {
          return;
        }
        resolved = true;
        cleanup();
        isShowingRef.current = false;
        resolve(result);
      };

      unsubscribers.push(
        rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          void rewarded.show();
        }),
      );

      unsubscribers.push(
        rewarded.addAdEventListener(AdEventType.ERROR, () => {
          setHidden(true);
          showAdNotAvailablePopUp();
          resolveOnce(false);
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
