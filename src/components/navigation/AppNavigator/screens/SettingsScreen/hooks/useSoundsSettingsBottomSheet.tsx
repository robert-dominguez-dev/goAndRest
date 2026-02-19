import { useAppSelectionBottomSheet } from '../../../../../common/AppSelectionBottomSheet/hooks/useAppSelectionBottomSheet.tsx';
import { AppSelectionBottomSheetItemData } from '../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItem.tsx';
import { BellRing, Bug, Music4, Speech, VolumeX } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { categoryToIconSize } from '../../../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { useAtom } from 'jotai';
import { soundsSettingsAtom } from '../../../../../../contexts/atoms.ts';

export const useSoundsSettingsBottomSheet = () => {
  const { text } = useAppThemedColors();

  const [selectedValue, setSelectedValue] = useAtom(soundsSettingsAtom);

  const { bottomSheet, handleOpen } = useAppSelectionBottomSheet();

  const items: AppSelectionBottomSheetItemData<string>[] = [
    {
      value: 'Karel',
      selected: selectedValue === 'Karel',
      accessoryLeft: (
        <Speech
          color={text}
          size={categoryToIconSize.subHeader}
        />
      ),
      label: 'Hlas: Karel',
    },
    {
      value: 'Mája',
      selected: selectedValue === 'Mája',
      accessoryLeft: (
        <Bug
          color={text}
          size={categoryToIconSize.subHeader}
        />
      ),
      label: 'Hlas: Mája',
    },
    {
      value: 'Beep',
      selected: selectedValue === 'Beep',
      accessoryLeft: (
        <BellRing
          color={text}
          size={categoryToIconSize.subHeader}
        />
      ),
      label: 'Beep',
    },
    {
      value: 'Music',
      selected: selectedValue === 'Music',
      accessoryLeft: (
        <Music4
          color={text}
          size={categoryToIconSize.subHeader}
        />
      ),
      label: 'Music',
    },
    {
      value: 'No sounds',
      selected: selectedValue === 'No sounds',
      accessoryLeft: (
        <VolumeX
          color={text}
          size={categoryToIconSize.subHeader}
        />
      ),
      label: 'No sounds',
    },
  ];

  const openLanguageSettingsBottomSheet = () =>
    handleOpen({
      items,
      onSelect: setSelectedValue,
    });

  return { bottomSheet, openLanguageSettingsBottomSheet };
};
