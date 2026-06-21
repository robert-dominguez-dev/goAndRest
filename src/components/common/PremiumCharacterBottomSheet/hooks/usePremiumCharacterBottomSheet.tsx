import { Fragment, useState } from 'react';
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
  checkIsCharacterActive,
  EXTEND_POPUP_MAX_DAYS_REMAINING,
  getCharacterActivationDaysRemaining,
} from '../../../../contexts/premiumCharacters/helpers/checkIsCharacterActive.ts';

export const usePremiumCharacterBottomSheet = () => {
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
    if (!checkIsCharacterActive(activations, value)) {
      void watchAdAndActivate(value);
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
          'screens.settingsScreen.feedbackSection.items.characterVariant.premiumBottomSheet.title',
        )}
        category={'header'}
      />
    </AppRow>
  );

  const renderContent: AppBottomSheetProps['renderContent'] = () => (
    <PremiumCharacterBottomSheetContent
      loadingValue={loadingValue}
      onRowPress={handleRowPress}
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
      {loadingOverlay}
      {selectOrExtendPopUp}
    </Fragment>
  );

  return { bottomSheet: bottomSheetWithPopUp, openBottomSheet, isOpen };
};
