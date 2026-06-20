import { SettingsItem, SettingsItemProps } from './SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppSelectionBottomSheetItemText } from '../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';
import { useAtomValue } from 'jotai';
import {
  useCommonSettingBottomSheet,
  UseSettingBottomSheetParams,
} from '../hooks/useCommonSettingBottomSheet.tsx';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';

type CommonSettingItemProps<TValue> = Pick<
  SettingsItemProps,
  'title' | 'description'
> &
  UseSettingBottomSheetParams<TValue>;

export const CommonSettingItem = <TValue,>({
  title,
  description,
  itemValues,
  atom,
  getProps,
}: CommonSettingItemProps<TValue>) => {
  const t = useAppTranslation();

  const { language } = useAppLanguage();

  const selectedValue = useAtomValue(atom);

  const { bottomSheet, openBottomSheet } = useCommonSettingBottomSheet({
    itemValues,
    atom,
    getProps,
  });

  const { labelTranslateKey, iconName, imageProps, iconColorStatus, labelColorStatus } =
    getProps(selectedValue, language);

  const accessoryRight = (
    <AppSelectionBottomSheetItemText
      label={t(labelTranslateKey)}
      iconName={iconName}
      iconColorStatus={iconColorStatus}
      textColorStatus={labelColorStatus}
      imageProps={imageProps}
    />
  );

  return (
    <>
      <SettingsItem
        title={title}
        description={description}
        onPress={openBottomSheet}
        accessoryRight={accessoryRight}
      />
      {bottomSheet}
    </>
  );
};
