import { FieldValues } from 'react-hook-form';
import { TextInput } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { getAppInputTextColorStatus } from '../helpers/getAppInputTextColorStatus.ts';
import { AppRow } from '../../../common/AppRow.tsx';
import { AppSize } from '../../../../types/ui.ts';

import { useAppTextStyle } from '../../../common/AppText/hooks/useAppTextStyle.ts';
import { AppViewWithGradientBorderForInput } from '../../AppViewWithGradientBorderForInput.tsx';
import { AppInputSpecificProps } from '../types.ts';
import { AppFormRenderProps } from '../../types.ts';
import { getAppInputStringValue } from '../helpers/getAppInputStringValue.ts';
import { getAppInputKeyboardType } from '../helpers/getAppInputKeyboardType.ts';
import { getAppInputMultilineDependentProps } from '../helpers/getAppInputMultilineDependentProps.ts';
import { normalizeNumberInputText } from '../../../../helpers/normalizeNumberInputText.ts';
import { CircleX } from 'lucide-react-native';

export const AppInputRender = <TFieldValues extends FieldValues>({
  placeholder,
  secureTextEntry,
  multiline,
  numeric,
  value,
  onChange,
  isInvalid,
  disabled,
}: AppFormRenderProps<TFieldValues, AppInputSpecificProps>) => {
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

  const maybeResetIcon =
    value && !disabled ? <CircleX onPress={handleReset} /> : undefined;

  const keyboardType = getAppInputKeyboardType(numeric);

  const handleChangeNumeric = (text: string) => {
    const textNumber = normalizeNumberInputText(text);
    onChange(textNumber);
  };

  const handleChange = numeric ? handleChangeNumeric : onChange;

  const stringValue = getAppInputStringValue(value);

  const { height, minHeight, numberOfLines } =
    getAppInputMultilineDependentProps(multiline);

  return (
    <AppViewWithGradientBorderForInput
      isInvalid={isInvalid}
      backgroundColorStatus={'text'}
      minHeight={minHeight}
      height={height}>
      <AppRow
        gap={'s'}
        alignItems={'center'}>
        <TextInput
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
        />
        {maybeResetIcon}
      </AppRow>
    </AppViewWithGradientBorderForInput>
  );
};
