import { Fragment, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { useAtom, useSetAtom } from 'jotai';
import { useAppTranslation } from '../../../../locales/hooks/useAppTranslation.ts';
import { useAppBottomSheet } from '../../AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { AppBottomSheetProps } from '../../AppBottomSheet/AppBottomSheet.tsx';
import { AppRow } from '../../AppRow.tsx';
import { AppIconAndLabel } from '../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { PremiumCharacterBottomSheetContent } from '../PremiumCharacterBottomSheetContent.tsx';
import { useRewardedAd } from '../../../../hooks/useRewardedAd/useRewardedAd.tsx';
import { useSelectOrExtendPopUp } from './useSelectOrExtendPopUp.tsx';
import { logCustomEvent } from '../../../navigation/helpers/logCustomEvent.ts';
import {
  characterVariantSettingAtom,
  premiumCharacterActivationsAtom,
  soundFeedbackSettingAtom,
} from '../../../../contexts/atoms.ts';
import {
  WorkoutCharacterVariant,
  WorkoutSoundFeedback,
} from '../../../navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import {
  EXTEND_POPUP_MAX_DAYS_REMAINING,
  getCharacterActivationDaysRemaining,
} from '../../../../contexts/premiumCharacters/helpers/checkIsCharacterActive.ts';
import { useIsPremiumCharacterUnlocked } from '../../../../contexts/premiumCharacters/hooks/useIsPremiumCharacterUnlocked.ts';
import { useIsPremium } from '../../../../contexts/premium/hooks/useIsPremium.ts';

export const usePremiumCharacterBottomSheet = (
  onUnlockAllPress?: () => void,
) => {
  const t = useAppTranslation();

  const { bottomSheet, handleOpen, handleClose, setHidden, isOpen } =
    useAppBottomSheet();

  // Rendered outside the bottom sheet content (as siblings below) -
  // both can pop up a native dialog (consent form, the ad itself)
  // that iOS can't present on top of an already-presented Modal.
  const {
    showRewardedAd,
    popUp: adNotAvailablePopUp,
    loadingOverlay,
  } = useRewardedAd(setHidden);

  const setSoundFeedback = useSetAtom(soundFeedbackSettingAtom);
  const setCharacterVariant = useSetAtom(characterVariantSettingAtom);
  const [activations, setActivations] = useAtom(
    premiumCharacterActivationsAtom,
  );

  const isPremium = useIsPremium();
  const isPremiumCharacterUnlocked = useIsPremiumCharacterUnlocked();

  const [loadingValue, setLoadingValue] =
    useState<WorkoutCharacterVariant | null>(null);

  const selectCharacter = (value: WorkoutCharacterVariant) => {
    void setSoundFeedback(WorkoutSoundFeedback.character);
    void setCharacterVariant(value);
    handleClose();
  };

  const watchAdAndActivate = async (
    value: WorkoutCharacterVariant,
    isExtend = false,
  ) => {
    setLoadingValue(value);
    const earnedReward = await showRewardedAd();
    setLoadingValue(null);

    if (!earnedReward) {
      return undefined;
    }

    void setActivations({ ...activations, [value]: Date.now() });
    void logCustomEvent(
      isExtend ? 'premium_character_extended' : 'premium_character_activated',
      { characterVariant: value },
    );
    selectCharacter(value);
  };

  const { popUp: selectOrExtendPopUp, open: openSelectOrExtendPopUp } =
    useSelectOrExtendPopUp({
      onSelectOnly: selectCharacter,
      onExtend: value => void watchAdAndActivate(value, true),
    });

  const handleRowPress = (value: WorkoutCharacterVariant) => {
    if (!isPremiumCharacterUnlocked(value)) {
      void watchAdAndActivate(value);
      return undefined;
    }

    if (isPremium) {
      selectCharacter(value);
      return undefined;
    }

    const daysRemaining = getCharacterActivationDaysRemaining(
      activations,
      value,
    );

    if (
      daysRemaining !== null &&
      daysRemaining <= EXTEND_POPUP_MAX_DAYS_REMAINING
    ) {
      setHidden(true);
      openSelectOrExtendPopUp(value);
      return undefined;
    }

    selectCharacter(value);
  };

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
          isPremium
            ? 'screens.settingsScreen.feedbackSection.items.characterVariant.premiumBottomSheet.titlePremium'
            : 'screens.settingsScreen.feedbackSection.items.characterVariant.premiumBottomSheet.title',
        )}
        category={'header'}
      />
    </AppRow>
  );

  // Two native Modals can't be presented on top of each other on iOS, so
  // the paywall is only opened once this sheet's Modal has actually
  // finished dismissing - signalled by `onDismiss`, which iOS fires after
  // the close animation completes (Android has no such restriction and
  // has no `onDismiss`, so it closes and opens the paywall right away).
  const pendingUnlockAllPressRef = useRef(false);

  const handleModalDismiss = () => {
    if (!pendingUnlockAllPressRef.current) {
      return;
    }
    pendingUnlockAllPressRef.current = false;
    handleClose();
    onUnlockAllPress?.();
  };

  const handleUnlockAllPress = () => {
    if (Platform.OS === 'ios') {
      pendingUnlockAllPressRef.current = true;
      setHidden(true);
      return undefined;
    }

    handleClose();
    onUnlockAllPress?.();
  };

  const renderContent: AppBottomSheetProps['renderContent'] = () => (
    <PremiumCharacterBottomSheetContent
      loadingValue={loadingValue}
      onRowPress={handleRowPress}
      onUnlockAllPress={onUnlockAllPress ? handleUnlockAllPress : undefined}
    />
  );

  const openBottomSheet = () =>
    handleOpen({
      renderContent,
      title: titleElement,
      backgroundColorStatus: 'backgroundAlt',
      onAccessoryRightPress: handleClose,
      onOverlayPress: handleClose,
      onDismiss: handleModalDismiss,
    });

  const bottomSheetWithPopUp = (
    <Fragment>
      {bottomSheet}
      {adNotAvailablePopUp}
      {loadingOverlay}
      {selectOrExtendPopUp}
    </Fragment>
  );

  return { bottomSheet: bottomSheetWithPopUp, openBottomSheet, isOpen };
};
