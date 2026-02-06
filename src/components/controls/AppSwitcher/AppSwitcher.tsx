import { FieldValues } from 'react-hook-form';
import { useCallback } from 'react';
import { AppSwitcherRender } from './components/AppSwitcherRender.tsx';
import { AppFormFieldRenderer } from '../AppFormFieldRenderer/AppFormFieldRenderer.tsx';
import { AppRenderHandler } from '../AppFormFieldRenderer/types.ts';
import { AppSwitcherSpecificProps } from './types.ts';
import { AppFormControlWrapperProps } from '../types.ts';
import { PrimitiveValue } from '../../../types/common.ts';

export const AppSwitcher = <
  TFieldValues extends FieldValues,
  TOptionValue extends PrimitiveValue,
>({
  options,
  ...formFieldRendererProps
}: AppFormControlWrapperProps<
  TFieldValues,
  AppSwitcherSpecificProps<TOptionValue>
>) => {
  const render: AppRenderHandler<TFieldValues> = useCallback(
    renderProps => <AppSwitcherRender {...renderProps} options={options} />,
    [options],
  );

  return <AppFormFieldRenderer {...formFieldRendererProps} render={render} />;
};
