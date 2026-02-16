import { FieldValues } from 'react-hook-form';
import { TextInput } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { getAppInputTextColorStatus } from '../helpers/getAppInputTextColorStatus.ts';
import { AppRow } from '../../../common/AppRow.tsx';
import { AppColorUnion, AppSize } from '../../../../types/ui.ts';

import { useAppTextStyle } from '../../../common/AppText/hooks/useAppTextStyle.ts';
import { AppInputSpecificProps } from '../types.ts';
import { AppFormRenderProps } from '../../types.ts';
import { getAppInputStringValue } from '../helpers/getAppInputStringValue.ts';
import { getAppInputKeyboardType } from '../helpers/getAppInputKeyboardType.ts';
import { getAppInputMultilineDependentProps } from '../helpers/getAppInputMultilineDependentProps.ts';
import { normalizeNumberInputText } from '../../../../helpers/normalizeNumberInputText.ts';
import { CircleX } from 'lucide-react-native';
import { JSX } from 'react';
import { sizes } from '../../../../constants/ui.ts';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';

export const AppInputRender = <TFieldValues extends FieldValues>({
  placeholder,
  secureTextEntry,
  multiline,
  numeric,
  value,
  onChange,
  isInvalid,
  disabled,
  autoFocus,
}: AppFormRenderProps<TFieldValues, AppInputSpecificProps>) => {
  const { inputText } = useAppThemedColors();

  const commonTextStyle = useAppTextStyle({
    category: 'content',
    colorStatus: getAppInputTextColorStatus({
      isInvalid,
      disabled,
    }),
  });

  const inputTextStyle: TextStyle = {
    ...commonTextStyle,
    /**
     * Making touchable area bigger.
     */
    paddingVertical: AppSize.s,
  };

  const handleReset = () => onChange('');

  const maybeResetIcon: JSX.Element | undefined =
    value && !disabled ? (
      <CircleX
        color={inputText}
        onPress={handleReset}
      />
    ) : undefined;

  const keyboardType = getAppInputKeyboardType(numeric);

  const handleChangeNumeric = (text: string) => {
    const textNumber = normalizeNumberInputText(text);
    onChange(textNumber);
  };

  const handleChange = numeric ? handleChangeNumeric : onChange;

  const stringValue = getAppInputStringValue(value);

  const { height, minHeight, numberOfLines } =
    getAppInputMultilineDependentProps(multiline);

  const borderColorStatus: AppColorUnion = isInvalid ? 'negative' : 'border';

  return (
    <AppRow
      minHeight={minHeight}
      height={height}
      borderRadius={sizes.formFieldBorderRadius}
      borderWidthOverride={1}
      borderColorStatus={borderColorStatus}
      backgroundColorStatus={'inputBackground'}
      gap={'s'}
      paddingHorizontal={'s'}
      alignItems={'center'}>
      <TextInput
        autoFocus={autoFocus}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={!disabled}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange}
        value={stringValue}
        style={inputTextStyle}
        keyboardType={keyboardType}
        autoCorrect={false}
        autoCapitalize={'none'}
        autoComplete={'off'}
        cursorColor={inputText}
        selectionColor={inputText}
      />
      {maybeResetIcon}
    </AppRow>
  );
};
