import { FieldValues } from 'react-hook-form';

import { useCallback } from 'react';

import { AppFormFieldRenderer } from '../AppFormFieldRenderer/AppFormFieldRenderer.tsx';
import { AppFormControlWrapperProps } from '../types.ts';
import { AppRenderHandler } from '../AppFormFieldRenderer/types.ts';
import { AppSilverPiecesInputSpecificProps } from './types.ts';
import { AppSilverPiecesInputRender } from './components/AppSilverPiecesInputRender.tsx';

export const AppSilverPiecesInput = <TFieldValues extends FieldValues>({
  minValue,
  maxValue,
  ...inputRendererProps
}: AppFormControlWrapperProps<
  TFieldValues,
  AppSilverPiecesInputSpecificProps
>) => {
  const render: AppRenderHandler<TFieldValues> = useCallback(
    renderProps => (
      <AppSilverPiecesInputRender
        {...renderProps}
        minValue={minValue}
        maxValue={maxValue}
      />
    ),
    [maxValue, minValue],
  );

  return <AppFormFieldRenderer {...inputRendererProps} render={render} />;
};
