import { JSX, useCallback, useRef, useState } from 'react';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { ensureAdsInitialized } from './helpers/initializeAds.ts';
import { useAppTranslation } from '../../locales/hooks/useAppTranslation.ts';
import { useAppPopUp } from '../../components/common/AppPopUp/hooks/useAppPopUp.tsx';
import { AppFullScreenLoader } from '../../components/common/AppFullScreenLoader.tsx';
import { logCustomEvent } from '../../components/navigation/helpers/logCustomEvent.ts';
import { Platform } from 'react-native';

const AD_UNIT_ID: string = __DEV__
  ? TestIds.REWARDED
  : Platform.select({
      ios: 'ca-app-pub-1007840337928730/7044042183',
      android: 'ca-app-pub-1007840337928730/7004779665',
      default: TestIds.REWARDED,
    });

/**
 * The bottom sheet is hidden before ad init even starts - the consent
 * form can pop up then, and iOS can't present it over an
 * already-presented Modal. It's restored only once the whole flow
 * ends, not mid-show: toggling it while the ad is up closes the ad
 * (a focus change reads as the user backing out). `loadingOverlay` is
 * a plain, non-Modal overlay, so it doesn't hit the same conflict.
 */
export const useRewardedAd = (setHidden: (hidden: boolean) => void) => {
  const t = useAppTranslation();

  const isShowingRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const { popUp, onOpen: showAdNotAvailablePopUp } = useAppPopUp({
    title: t('common.adNotAvailablePopUp.title'),
    iconName: 'TriangleAlert',
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
    setIsLoading(true);
    void logCustomEvent('rewarded_ad_attempt');

    const isReady = await ensureAdsInitialized();

    if (!isReady) {
      isShowingRef.current = false;
      setIsLoading(false);
      void logCustomEvent('rewarded_ad_not_available', {
        reason: 'consent_or_init',
      });
      showAdNotAvailablePopUp();
      return false;
    }

    return new Promise(resolve => {
      const rewarded = RewardedAd.createForAdRequest(AD_UNIT_ID);

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
          setIsLoading(false);
          void rewarded.show();
        }),
      );

      unsubscribers.push(
        rewarded.addAdEventListener(AdEventType.ERROR, () => {
          setIsLoading(false);
          void logCustomEvent('rewarded_ad_not_available', {
            reason: 'load_error',
          });
          showAdNotAvailablePopUp();
          resolveOnce(false);
        }),
      );

      unsubscribers.push(
        rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            void logCustomEvent('rewarded_ad_earned_reward', {
              message: `User got a reward: ${reward.amount} ${reward.type}`,
            });
            earnedReward = true;
          },
        ),
      );

      unsubscribers.push(
        rewarded.addAdEventListener(AdEventType.CLOSED, () => {
          setHidden(false);
          resolveOnce(earnedReward);
        }),
      );

      rewarded.load();
    });
  }, [setHidden, showAdNotAvailablePopUp]);

  const loadingOverlay: JSX.Element | null = isLoading ? (
    <AppFullScreenLoader label={t('common.adLoading')} />
  ) : null;

  return { showRewardedAd, popUp, loadingOverlay };
};
