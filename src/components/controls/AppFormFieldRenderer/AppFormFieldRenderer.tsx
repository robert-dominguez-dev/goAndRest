import { AppView } from '../../common/AppView.tsx';
import { AppText } from '../../common/AppText/AppText.tsx';
import {
  Controller,
  ControllerProps,
  FieldErrors,
  FieldValues,
} from 'react-hook-form';
import { getFormFieldErrorMessage } from '../helpers/getFormFieldErrorMessage.ts';
import { useCallback } from 'react';
import { AppRenderHandler } from './types.ts';
import { AppInputErrorMessage } from '../AppInputErrorMessage.tsx';

export type AppFormFieldRendererCommonProps<TFieldValues extends FieldValues> =
  Pick<
    ControllerProps<TFieldValues>,
    'control' | 'name' | 'rules' | 'disabled'
  > & {
    label?: string;
    errors: FieldErrors<TFieldValues>;
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
  errors,
}: AppFormFieldRendererProps<TFieldValues>) => {
  const errorMessage = getFormFieldErrorMessage(errors, name);

  const maybeErrorMessageElement = errorMessage ? (
    <AppInputErrorMessage errorMessage={errorMessage} />
  ) : undefined;

  const maybeLabelElement = label ? (
    <AppText category={'title'}>{label}</AppText>
  ) : undefined;

  const renderField: ControllerProps<TFieldValues>['render'] = useCallback(
    ({ field: { value, onChange, disabled: fieldDisabled }, formState }) =>
      render({
        value,
        onChange,
        isInvalid: !!errorMessage,
        disabled: fieldDisabled || formState.disabled,
      }),
    [errorMessage, render],
  );

  return (
    <AppView gap={'xs'}>
      {maybeLabelElement}
      <Controller
        control={control}
        name={name}
        rules={rules}
        disabled={disabled}
        render={renderField}
      />
      {maybeErrorMessageElement}
    </AppView>
  );
};
