import { FieldValues } from 'react-hook-form';
import { AppRow } from '../../../common/AppRow.tsx';
import { AppSwitcherSpecificProps } from '../types.ts';
import { AppFormRenderProps } from '../../types.ts';
import { PrimitiveValue } from '../../../../types/common.ts';
import { AppSwitcherItem } from './AppSwitcherItem.tsx';

export const AppSwitcherRender = <
  TFieldValues extends FieldValues,
  TOptionValue extends PrimitiveValue,
>({
  onChange,
  disabled,
  value: selectedValue,
  options,
}: AppFormRenderProps<
  TFieldValues,
  AppSwitcherSpecificProps<TOptionValue>
>) => (
  <AppRow gap={'xs'} alignItems={'center'}>
    {options.map(({ title, value }) => (
      <AppSwitcherItem
        key={title}
        label={title}
        value={value}
        selectedValue={selectedValue}
        onChange={onChange}
        disabled={disabled}
      />
    ))}
  </AppRow>
);
