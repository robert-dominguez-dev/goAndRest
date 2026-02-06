import { FieldValues } from 'react-hook-form';
import {
  AppButtonUI,
  AppButtonUIProps,
} from '../../AppButton/components/AppButtonUI.tsx';
import { Pressable, ViewStyle } from 'react-native';
import { AppButtonDisabledDependentProps } from '../../AppButton/types.ts';
import { AppRenderHandlerParams } from '../../AppFormFieldRenderer/types.ts';
import { PrimitiveValue } from '../../../../types/common.ts';
import { getOnPressWithHapticFeedback } from '../../helpers/getOnPressWithHapticFeedback.ts';
import { FILL_CONTAINER_DIMENSION } from '../../../../constants/common.ts';

const pressableStyle: ViewStyle = {
  width: FILL_CONTAINER_DIMENSION,
  flexShrink: 1,
};

type AppSwitcherItemProps<
  TFieldValues extends FieldValues,
  TOptionValue extends PrimitiveValue,
> = AppRenderHandlerParams<TFieldValues> &
  Pick<AppButtonUIProps, 'label'> & {
    selectedValue: TOptionValue;
  };

export const AppSwitcherItem = <
  TFieldValues extends FieldValues,
  TOptionValue extends PrimitiveValue,
>({
  label,
  onChange,
  disabled,
  value,
  selectedValue,
}: AppSwitcherItemProps<TFieldValues, TOptionValue>) => {
  const isSelected = selectedValue === value;

  const colorProps: Omit<AppButtonDisabledDependentProps, 'label'> = isSelected
    ? { textColorStatus: 'white', backgroundColorStatus: 'primary' }
    : {
        textColorStatus: 'primary',
        backgroundColorStatus: 'primaryLight',
      };

  const handleSelect = () => onChange(value);

  const onPressWithHapticFeedback = isSelected
    ? undefined
    : getOnPressWithHapticFeedback(handleSelect);

  return (
    <Pressable
      onPress={onPressWithHapticFeedback}
      disabled={disabled}
      style={pressableStyle}>
      <AppButtonUI
        label={label}
        status={'primary'}
        {...colorProps}
      />
    </Pressable>
  );
};
