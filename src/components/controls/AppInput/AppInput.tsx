import { FieldValues } from 'react-hook-form';
import { AppInputRender } from './components/AppInputRender.tsx';
import { useCallback } from 'react';

import { AppInputSpecificProps } from './types.ts';
import { AppFormFieldRenderer } from '../AppFormFieldRenderer/AppFormFieldRenderer.tsx';
import { AppFormControlWrapperProps } from '../types.ts';
import { AppRenderHandler } from '../AppFormFieldRenderer/types.ts';

export const AppInput = <TFieldValues extends FieldValues>({
  placeholder,
  secureTextEntry,
  multiline,
  numeric,
  /**
   * Editable false only disables input,
   * but keeps value in the form for submitting in contrast to disabled prop,
   * which also removes input value from submit data.
   */
  editable = true,
  ...inputRendererProps
}: AppFormControlWrapperProps<TFieldValues, AppInputSpecificProps>) => {
  const render: AppRenderHandler<TFieldValues> = useCallback(
    ({ disabled, ...renderProps }) => {
      const disabledEvaluated = !editable || disabled;

      return (
        <AppInputRender
          {...renderProps}
          disabled={disabledEvaluated}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numeric={numeric}
        />
      );
    },
    [editable, multiline, numeric, placeholder, secureTextEntry],
  );

  return (
    <AppFormFieldRenderer
      {...inputRendererProps}
      render={render}
    />
  );
};
