import { JSX } from 'react';
import { AppRow } from '../../AppRow.tsx';
import { Pressable } from 'react-native';
import { getPressableOpacity } from '../../../controls/helpers/getPressableOpacity.ts';
import { getOnPressWithHapticFeedback } from '../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';
import { AppSelectionBottomSheetItemText } from './AppSelectionBottomSheetItemTextProps.tsx';
import { Check } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';
import { categoryToIconSize } from '../../../controls/AppButton/components/AppIconAndLabel.tsx';

export type AppSelectionBottomSheetItemData<TValue> = {
  label: string;
  value: TValue;
  accessoryLeft?: JSX.Element;
  selected?: boolean;
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
  selected,
  disabled,
}: AppSelectionBottomSheetItemProps<TValue>) => {
  const { text } = useAppThemedColors();

  const handlePress = () => onSelect(value);

  const isPressDisabled: boolean = !!disabled || !!selected;

  return (
    <Pressable
      onPress={getOnPressWithHapticFeedback(
        handlePress,
        HapticFeedbackTypes.selection,
      )}
      disabled={isPressDisabled}>
      {({ pressed }) => {
        const opacity = getPressableOpacity({
          pressed,
          disabled,
        });

        return (
          <AppRow
            opacity={opacity}
            paddingVertical={'m'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <AppRow
              gap={'sm'}
              alignItems={'center'}>
              {accessoryLeft}
              <AppSelectionBottomSheetItemText>
                {label}
              </AppSelectionBottomSheetItemText>
            </AppRow>
            {!!selected && (
              <Check
                color={text}
                size={categoryToIconSize.subHeader}
              />
            )}
          </AppRow>
        );
      }}
    </Pressable>
  );
};
