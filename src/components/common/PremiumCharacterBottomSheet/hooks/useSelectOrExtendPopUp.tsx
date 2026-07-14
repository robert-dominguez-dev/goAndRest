import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { useAppTranslation } from '../../../../locales/hooks/useAppTranslation.ts';
import { useAppPopUp } from '../../AppPopUp/hooks/useAppPopUp.tsx';
import { premiumCharacterActivationsAtom } from '../../../../contexts/atoms.ts';
import { WorkoutCharacterVariant } from '../../../navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { getCharacterActivationDaysRemaining } from '../../../../contexts/premiumCharacters/helpers/checkIsCharacterActive.ts';
import { getDaysRemainingLabel } from '../../../../contexts/premiumCharacters/helpers/getDaysRemainingLabel.ts';

const TRANSLATE_KEY_PREFIX =
  'screens.settingsScreen.feedbackSection.items.characterVariant.premiumBottomSheet.extendPopUp';

type UseSelectOrExtendPopUpParams = {
  onSelectOnly: (value: WorkoutCharacterVariant) => void;
  onExtend: (value: WorkoutCharacterVariant) => void;
};

export const useSelectOrExtendPopUp = ({
  onSelectOnly,
  onExtend,
}: UseSelectOrExtendPopUpParams) => {
  const t = useAppTranslation();

  const activations = useAtomValue(premiumCharacterActivationsAtom);

  const [pendingValue, setPendingValue] =
    useState<WorkoutCharacterVariant | null>(null);

  const { popUp, onOpen } = useAppPopUp({
    title: t(`${TRANSLATE_KEY_PREFIX}.title`),
    iconName: 'Clock',
    description: pendingValue
      ? t(`${TRANSLATE_KEY_PREFIX}.description`, {
          value:
            getDaysRemainingLabel(
              getCharacterActivationDaysRemaining(activations, pendingValue),
              t,
            ) ?? '',
        })
      : '',
    primaryButtonProps: {
      label: t(`${TRANSLATE_KEY_PREFIX}.extendButtonLabel`),
      onPress: () => {
        if (pendingValue) onExtend(pendingValue);
      },
    },
    secondaryButtonProps: {
      label: t(`${TRANSLATE_KEY_PREFIX}.selectOnlyButtonLabel`),
      backgroundColorStatus: 'backgroundAlt',
      onPress: () => {
        if (pendingValue) onSelectOnly(pendingValue);
      },
    },
  });

  const open = (value: WorkoutCharacterVariant) => {
    setPendingValue(value);
    onOpen();
  };

  return { popUp, open };
};
