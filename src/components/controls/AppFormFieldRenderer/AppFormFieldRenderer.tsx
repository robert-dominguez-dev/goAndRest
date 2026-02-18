import { AppText } from '../../common/AppText/AppText.tsx';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { getFormFieldErrorMessage } from '../helpers/getFormFieldErrorMessage.ts';
import { useCallback } from 'react';
import { AppRenderHandler } from './types.ts';
import { AppInputErrorMessage } from '../AppInputErrorMessage.tsx';
import { AppView } from '../../common/AppView/AppView.tsx';

export type AppFormFieldRendererCommonProps<TFieldValues extends FieldValues> =
  Pick<
    ControllerProps<TFieldValues>,
    'control' | 'name' | 'rules' | 'disabled' | 'shouldUnregister'
  > & {
    label?: string;
  };

export type AppFormFieldRendererProps<TFieldValues extends FieldValues> =
  AppFormFieldRendererCommonProps<TFieldValues> & {
    render: AppRenderHandler<TFieldValues>;
  };

export const AppFormFieldRenderer = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  disabled,
  render,
  label,
  shouldUnregister,
}: AppFormFieldRendererProps<TFieldValues>) => {
  const renderField: ControllerProps<TFieldValues>['render'] = useCallback(
    ({ field: { value, onChange, disabled: fieldDisabled }, formState }) => {
      const maybeLabelElement = label ? (
        <AppText category={'title'}>{label}</AppText>
      ) : undefined;

      const errorMessage = getFormFieldErrorMessage(formState.errors, name);

      const inputElement = render({
        value,
        onChange,
        isInvalid: !!errorMessage,
        disabled: fieldDisabled || formState.disabled,
      });

      const maybeErrorMessageElement = errorMessage ? (
        <AppInputErrorMessage errorMessage={errorMessage} />
      ) : undefined;

      return (
        <AppView gap={'xs'}>
          {maybeLabelElement}
          {inputElement}
          {maybeErrorMessageElement}
        </AppView>
      );
    },
    [render],
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      disabled={disabled}
      render={renderField}
      shouldUnregister={shouldUnregister}
    />
  );
};
