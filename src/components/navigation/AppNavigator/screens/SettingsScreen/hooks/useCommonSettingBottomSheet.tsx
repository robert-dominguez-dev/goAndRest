import { useAppSelectionBottomSheet } from '../../../../../common/AppSelectionBottomSheet/hooks/useAppSelectionBottomSheet.tsx';
import { AppSelectionBottomSheetItemData } from '../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItem.tsx';
import { useAtom } from 'jotai';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppAtom } from '../../../../../../contexts/hooks/useDebouncedAtom.ts';
import { SettingValueProps } from '../types.ts';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';

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

  const { language } = useAppLanguage();

  const [selectedValue, setSelectedValue] = useAtom(atom);

  const { bottomSheet, handleOpen } = useAppSelectionBottomSheet();

  const items = itemValues.reduce<AppSelectionBottomSheetItemData<TValue>[]>(
    (acc, value) => {
      const {
        labelTranslateKey,
        IconComponent,
        iconColorStatus,
        imageProps,
        audioPathByLanguage,
      } = getProps(value);

      /**
       * Filtering items at which we don't even have preview sound yet...
       */
      if (audioPathByLanguage) {
        const itemData: AppSelectionBottomSheetItemData<TValue> = {
          value,
          label: t(labelTranslateKey),
          selected: value === selectedValue,
          AccessoryLeftIconComponent: IconComponent,
          accessoryLeftIconStatus: iconColorStatus,
          accessoryLeftImageProps: imageProps,
          audioParams: {
            soundKey: `${String(value)}_preview`,
            url: audioPathByLanguage[language],
          },
        };

        acc.push(itemData);
      }

      return acc;
    },
    [],
  );

  const openBottomSheet = () =>
    handleOpen({
      items,
      onSelect: setSelectedValue,
    });

  return { bottomSheet, openBottomSheet };
};
