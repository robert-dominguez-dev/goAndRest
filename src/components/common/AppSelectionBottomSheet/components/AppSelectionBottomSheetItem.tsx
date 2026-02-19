import { JSX } from 'react';
import { AppRow } from '../../AppRow.tsx';
import { AppText } from '../../AppText/AppText.tsx';
import { Pressable } from 'react-native';
import { getPressableOpacity } from '../../../controls/helpers/getPressableOpacity.ts';

export type AppSelectionBottomSheetItemData<TValue> = {
  label: string;
  value: TValue;
  accessoryLeft?: JSX.Element;
  disabled?: boolean;
};

export type AppSelectionBottomSheetItemProps<TValue> =
  AppSelectionBottomSheetItemData<TValue> & {
    onSelect: (value: TValue) => void;
  };

export const AppSelectionBottomSheetItem = <TValue,>({
  label,
  value,
  onSelect,
  accessoryLeft,
  disabled,
}: AppSelectionBottomSheetItemProps<TValue>) => {
  const handlePress = () => onSelect(value);

  return (
    <Pressable
      onPress={handlePress}
      disabled>
      {({ pressed }) => {
        const opacity = getPressableOpacity({
          pressed,
          disabled,
        });

        return (
          <AppRow
            opacity={opacity}
            gap={'s'}
            alignItems={'center'}>
            {accessoryLeft}
            <AppText grow={false}>{label}</AppText>
          </AppRow>
        );
      }}
    </Pressable>
  );
};
