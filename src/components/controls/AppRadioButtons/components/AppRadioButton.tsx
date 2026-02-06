import { AppRadioButtonCircle } from './AppRadioButtonCircle.tsx';
import { AppRow } from '../../../common/AppRow.tsx';
import { AppText } from '../../../common/AppText/AppText.tsx';
import { Pressable, PressableProps } from 'react-native';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../constants/common.ts';

export type AppRadioButtonProps<TValue extends string> = {
  label: string;
  value: TValue;
};

export type AppRadioButtonComponentProps<TValue extends string> =
  AppRadioButtonProps<TValue> &
    Pick<PressableProps, 'disabled'> & {
      selectedValue: TValue | undefined;
      onSelect: (value: TValue) => void;
    };

export const AppRadioButton = <TValue extends string>({
  label,
  value,
  selectedValue,
  onSelect,
  disabled,
}: AppRadioButtonComponentProps<TValue>) => {
  const handlePress = () => onSelect(value);

  const isSelected = value === selectedValue;
  const disabledEvaluated = disabled || isSelected;

  return (
    <Pressable onPress={handlePress} disabled={disabledEvaluated}>
      <AppRow gap={'xs'} alignItems={'center'}>
        <AppRadioButtonCircle isSelected={isSelected} />
        <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>{label}</AppText>
      </AppRow>
    </Pressable>
  );
};
