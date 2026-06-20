import { Fragment } from 'react';
import { useAppTranslation } from '../../../../locales/hooks/useAppTranslation.ts';
import { useAppBottomSheet } from '../../AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { AppBottomSheetProps } from '../../AppBottomSheet/AppBottomSheet.tsx';
import { AppRow } from '../../AppRow.tsx';
import { AppIconAndLabel } from '../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { PremiumCharacterBottomSheetContent } from '../PremiumCharacterBottomSheetContent.tsx';
import { useRewardedAd } from '../../../../hooks/useRewardedAd/useRewardedAd.ts';

export const usePremiumCharacterBottomSheet = () => {
  const t = useAppTranslation();

  const { bottomSheet, handleOpen, handleClose, setHidden, isOpen } =
    useAppBottomSheet();

  /**
   * Called here, not inside the content component - the content lives
   * inside a Modal that gets hidden while the ad plays, so the "ad not
   * available" popup needs to render outside of it to stay visible.
   * `setHidden` is also owned by useRewardedAd itself now, so the
   * bottom sheet and the popup are never made visible at the same time.
   */
  const { showRewardedAd, popUp: adNotAvailablePopUp } =
    useRewardedAd(setHidden);

  const titleElement = (
    <AppRow
      grow
      justifyContent={'center'}
      alignItems={'center'}
      gap={'s'}>
      <AppIconAndLabel
        grow={false}
        iconName={'Gem'}
        iconColorStatus={'premium'}
        textColorStatus={'premium'}
        label={t(
          'screens.settingsScreen.feedbackSection.items.characterVariant.premiumBottomSheet.title',
        )}
        category={'header'}
      />
    </AppRow>
  );

  const renderContent: AppBottomSheetProps['renderContent'] = ({ onClose }) => (
    <PremiumCharacterBottomSheetContent
      onClose={onClose}
      showRewardedAd={showRewardedAd}
    />
  );

  const openBottomSheet = () =>
    handleOpen({
      renderContent,
      title: titleElement,
      backgroundColorStatus: 'backgroundAlt',
      onAccessoryRightPress: handleClose,
      onOverlayPress: handleClose,
    });

  const bottomSheetWithPopUp = (
    <Fragment>
      {bottomSheet}
      {adNotAvailablePopUp}
    </Fragment>
  );

  return { bottomSheet: bottomSheetWithPopUp, openBottomSheet, isOpen };
};
