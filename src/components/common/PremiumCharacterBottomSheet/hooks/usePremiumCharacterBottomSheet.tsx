import { Fragment, useState } from 'react';
import { useAtom } from 'jotai';
import { useAppTranslation } from '../../../../locales/hooks/useAppTranslation.ts';
import { useAppBottomSheet } from '../../AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { AppBottomSheetProps } from '../../AppBottomSheet/AppBottomSheet.tsx';
import { AppRow } from '../../AppRow.tsx';
import { AppIconAndLabel } from '../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { PremiumCharacterBottomSheetContent } from '../PremiumCharacterBottomSheetContent.tsx';
import { useRewardedAd } from '../../../../hooks/useRewardedAd/useRewardedAd.tsx';
import { useSelectOrExtendPopUp } from './useSelectOrExtendPopUp.tsx';
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

  const [soundFeedback, setSoundFeedback] = useAtom(soundFeedbackSettingAtom);
  const [, setCharacterVariant] = useAtom(characterVariantSettingAtom);
  const [activations, setActivations] = useAtom(
    premiumCharacterActivationsAtom,
  );

  const [loadingValue, setLoadingValue] =
    useState<WorkoutCharacterVariant | null>(null);

  const selectCharacter = (value: WorkoutCharacterVariant) => {
    void setCharacterVariant(value);
    handleClose();
  };

  const watchAdAndActivate = async (value: WorkoutCharacterVariant) => {
    setLoadingValue(value);
    const earnedReward = await showRewardedAd();
    setLoadingValue(null);

    if (!earnedReward) {
      return undefined;
    }

    if (soundFeedback !== WorkoutSoundFeedback.character) {
      void setSoundFeedback(WorkoutSoundFeedback.character);
    }

    void setActivations({ ...activations, [value]: Date.now() });
    selectCharacter(value);
  };

  const { popUp: selectOrExtendPopUp, open: openSelectOrExtendPopUp } =
    useSelectOrExtendPopUp({
      onSelectOnly: selectCharacter,
      onExtend: value => void watchAdAndActivate(value),
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
