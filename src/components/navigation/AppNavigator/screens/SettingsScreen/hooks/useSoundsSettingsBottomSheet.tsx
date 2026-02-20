import { useAppSelectionBottomSheet } from '../../../../../common/AppSelectionBottomSheet/hooks/useAppSelectionBottomSheet.tsx';
import { AppSelectionBottomSheetItemData } from '../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItem.tsx';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { categoryToIconSize } from '../../../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { useAtom } from 'jotai';
import { soundFeedbackSettingAtom } from '../../../../../../contexts/atoms.ts';
import { WorkoutSoundFeedback, workoutSoundFeedbacks } from '../constants.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { getSoundFeedbackSettingValueProps } from '../helpers/getSoundFeedbackSettingValueProps.ts';

export const useSoundsSettingsBottomSheet = () => {
  const t = useAppTranslation();

  const { text } = useAppThemedColors();

  const [selectedValue, setSelectedValue] = useAtom(soundFeedbackSettingAtom);

  const { bottomSheet, handleOpen } = useAppSelectionBottomSheet();

  const items = workoutSoundFeedbacks.map<
    AppSelectionBottomSheetItemData<WorkoutSoundFeedback>
  >(soundFeedback => {
    const { labelTranslateKey, IconComponent } =
      getSoundFeedbackSettingValueProps(soundFeedback);

    return {
      label: t(labelTranslateKey),
      value: soundFeedback,
      selected: soundFeedback === selectedValue,
      accessoryLeft: (
        <IconComponent
          color={text}
          size={categoryToIconSize.subHeader}
        />
      ),
    };
  });

  const openLanguageSettingsBottomSheet = () =>
    handleOpen({
      items,
      onSelect: setSelectedValue,
    });

  return { bottomSheet, openLanguageSettingsBottomSheet };
};
