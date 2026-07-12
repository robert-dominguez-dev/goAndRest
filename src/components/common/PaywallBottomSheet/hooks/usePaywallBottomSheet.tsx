import { Fragment, useState } from 'react';
import { useAppTranslation } from '../../../../locales/hooks/useAppTranslation.ts';
import { useAppBottomSheet } from '../../AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { AppBottomSheetProps } from '../../AppBottomSheet/AppBottomSheet.tsx';
import { useAppPopUp } from '../../AppPopUp/hooks/useAppPopUp.tsx';
import { PaywallBottomSheetContent } from '../PaywallBottomSheetContent.tsx';
import { usePremiumActions } from '../../../../contexts/premium/hooks/usePremiumActions.ts';

export const usePaywallBottomSheet = () => {
  const t = useAppTranslation();

  const { bottomSheet, handleOpen, handleClose, setHidden } =
    useAppBottomSheet();

  const { purchasePremium, restorePremium } = usePremiumActions();

  const [isPurchasing, setIsPurchasing] = useState(false);

  const { popUp: errorPopUp, onOpen: openErrorPopUp } = useAppPopUp({
    title: t('common.paywall.errorPopUp.title'),
    description: t('common.paywall.errorPopUp.description'),
    primaryButtonProps: {
      label: t('common.ok'),
      onPress: () => setHidden(false),
    },
  });

  const { popUp: restoreNotFoundPopUp, onOpen: openRestoreNotFoundPopUp } =
    useAppPopUp({
      title: t('common.paywall.restoreNotFoundPopUp.title'),
      description: t('common.paywall.restoreNotFoundPopUp.description'),
      primaryButtonProps: {
        label: t('common.ok'),
        onPress: () => setHidden(false),
      },
    });

  const handleBuyPress = async () => {
    setIsPurchasing(true);
    const outcome = await purchasePremium();
    setIsPurchasing(false);

    if (outcome.status === 'error') {
      setHidden(true);
      openErrorPopUp();
      return;
    }

    if (outcome.status === 'success') {
      handleClose();
    }
  };

  const handleRestorePress = async () => {
    const result = await restorePremium();

    if (result === 'notFound') {
      setHidden(true);
      openRestoreNotFoundPopUp();
      return undefined;
    }

    if (result === 'error') {
      setHidden(true);
      openErrorPopUp();
    }
  };

  const renderContent: AppBottomSheetProps['renderContent'] = () => (
    <PaywallBottomSheetContent
      isPurchasing={isPurchasing}
      onBuyPress={() => void handleBuyPress()}
      onRestorePress={() => void handleRestorePress()}
    />
  );

  const openPaywall = () =>
    handleOpen({
      renderContent,
      backgroundColorStatus: 'backgroundAlt',
      onOverlayPress: handleClose,
    });

  const paywallBottomSheet = (
    <Fragment>
      {bottomSheet}
      {errorPopUp}
      {restoreNotFoundPopUp}
    </Fragment>
  );

  return { paywallBottomSheet, openPaywall };
};
