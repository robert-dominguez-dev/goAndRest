import { Fragment, useCallback, useState } from 'react';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppPopUp } from '../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';
import {
  useAppFullScreenLoader
} from '../../../../../../contexts/AppFullScreenLoaderProvider/AppFullScreenLoaderProvider.tsx';
import { usePremiumActions } from '../../../../../../contexts/premium/hooks/usePremiumActions.ts';

/**
 * Owns the purchase / restore flow for the paywall screen: a non-Modal
 * full-screen loader while the request is in flight (so the native store
 * sheet can present over it), and an outcome popup for every case
 * (success, payment succeeded but entitlement not yet active, error,
 * nothing to restore). `onEntitled` runs once the user is premium.
 */
export const usePaywallPurchase = (onEntitled: () => void) => {
  const t = useAppTranslation();

  const { showFullScreenLoader, hideFullScreenLoader } =
    useAppFullScreenLoader();

  const { purchasePremium, restorePremium } = usePremiumActions();

  const [isPurchasing, setIsPurchasing] = useState(false);

  const { popUp: successPopUp, onOpen: openSuccessPopUp } = useAppPopUp({
    title: t('common.paywall.successPopUp.title'),
    iconName: 'CircleCheckBig',
    description: t('common.paywall.successPopUp.description'),
    primaryButtonProps: { label: t('common.ok'), onPress: onEntitled },
  });

  const { popUp: pendingPopUp, onOpen: openPendingPopUp } = useAppPopUp({
    title: t('common.paywall.pendingPopUp.title'),
    iconName: 'Clock',
    description: t('common.paywall.pendingPopUp.description'),
    primaryButtonProps: { label: t('common.ok') },
  });

  const { popUp: errorPopUp, onOpen: openErrorPopUp } = useAppPopUp({
    title: t('common.paywall.errorPopUp.title'),
    iconName: 'CircleX',
    description: t('common.paywall.errorPopUp.description'),
    primaryButtonProps: { label: t('common.ok') },
  });

  const { popUp: restoreNotFoundPopUp, onOpen: openRestoreNotFoundPopUp } =
    useAppPopUp({
      title: t('common.paywall.restoreNotFoundPopUp.title'),
      iconName: 'CircleX',
      description: t('common.paywall.restoreNotFoundPopUp.description'),
      primaryButtonProps: { label: t('common.ok') },
    });

  const handleBuyPress = useCallback(async () => {
    setIsPurchasing(true);
    showFullScreenLoader(t('common.paywall.processing'));
    try {
      const outcome = await purchasePremium();

      if (outcome.status === 'cancelled') {
        return;
      }

      if (outcome.status === 'error') {
        openErrorPopUp();
        return;
      }

      if (outcome.isPremium) {
        openSuccessPopUp();
      } else {
        openPendingPopUp();
      }
    } finally {
      hideFullScreenLoader();
      setIsPurchasing(false);
    }
  }, [
    purchasePremium,
    openErrorPopUp,
    openSuccessPopUp,
    openPendingPopUp,
    showFullScreenLoader,
    hideFullScreenLoader,
    t,
  ]);

  const handleRestorePress = useCallback(async () => {
    setIsPurchasing(true);
    showFullScreenLoader(t('common.paywall.processing'));
    try {
      const result = await restorePremium();

      if (result === 'restored') {
        openSuccessPopUp();
        return;
      }

      if (result === 'notFound') {
        openRestoreNotFoundPopUp();
        return;
      }

      openErrorPopUp();
    } finally {
      hideFullScreenLoader();
      setIsPurchasing(false);
    }
  }, [
    restorePremium,
    openSuccessPopUp,
    openRestoreNotFoundPopUp,
    openErrorPopUp,
    showFullScreenLoader,
    hideFullScreenLoader,
    t,
  ]);

  const popUps = (
    <Fragment>
      {successPopUp}
      {pendingPopUp}
      {errorPopUp}
      {restoreNotFoundPopUp}
    </Fragment>
  );

  return {
    isPurchasing,
    handleBuyPress,
    handleRestorePress,
    popUps,
  };
};
