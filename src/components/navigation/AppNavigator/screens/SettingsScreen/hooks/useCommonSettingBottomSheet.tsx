import { useAppSelectionBottomSheet } from '../../../../../common/AppSelectionBottomSheet/hooks/useAppSelectionBottomSheet.tsx';
import { AppSelectionBottomSheetItemData } from '../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItem.tsx';
import { useAtom } from 'jotai';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppAtom } from '../../../../../../contexts/hooks/useDebouncedAtom.ts';
import { SettingValueProps } from '../types.ts';

export type UseSettingBottomSheetParams<TValue> = {
  atom: AppAtom<TValue>;
  itemValues: TValue[];
  getProps: (value: TValue) => SettingValueProps;
};

export const useCommonSettingBottomSheet = <TValue,>({
  atom,
  itemValues,
  getProps,
}: UseSettingBottomSheetParams<TValue>) => {
  const t = useAppTranslation();

  const [selectedValue, setSelectedValue] = useAtom(atom);

  const { bottomSheet, handleOpen } = useAppSelectionBottomSheet();

  const items = itemValues.map<AppSelectionBottomSheetItemData<TValue>>(
    value => {
      const { labelTranslateKey, IconComponent, iconColorStatus, imageProps } =
        getProps(value);

      return {
        value,
        label: t(labelTranslateKey),
        selected: value === selectedValue,
        AccessoryLeftIconComponent: IconComponent,
        accessoryLeftIconStatus: iconColorStatus,
        accessoryLeftImageProps: imageProps,
      };
    },
  );

  const openBottomSheet = () =>
    handleOpen({
      items,
      onSelect: setSelectedValue,
    });

  return { bottomSheet, openBottomSheet };
};
