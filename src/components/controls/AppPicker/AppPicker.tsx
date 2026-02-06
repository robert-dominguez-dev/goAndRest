import { FieldValues } from 'react-hook-form';
import { useCallback } from 'react';

import { AppRenderHandler } from '../AppFormFieldRenderer/types.ts';
import { AppFormControlWrapperProps } from '../types.ts';
import { AppPickerSpecificProps } from './types.ts';
import { PrimitiveValue } from '../../../types/common.ts';
import { AppPickerRender } from './components/AppPickerRender.tsx';
import { AppFormFieldRenderer } from '../AppFormFieldRenderer/AppFormFieldRenderer.tsx';

export const AppPicker = <
  TFieldValues extends FieldValues,
  TOptionValue extends PrimitiveValue,
>({
  options,
  itemDimensions,
  ...formFieldRendererProps
}: AppFormControlWrapperProps<
  TFieldValues,
  AppPickerSpecificProps<TOptionValue>
>) => {
  const render: AppRenderHandler<TFieldValues> = useCallback(
    renderProps => (
      <AppPickerRender
        {...renderProps}
        options={options}
        itemDimensions={itemDimensions}
      />
    ),
    [options, itemDimensions],
  );

  return <AppFormFieldRenderer {...formFieldRendererProps} render={render} />;
};
