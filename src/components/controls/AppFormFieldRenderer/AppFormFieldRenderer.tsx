import { AppView } from '../../common/AppView/AppView.tsx';
import { AppText } from '../../common/AppText/AppText.tsx';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { useCallback } from 'react';
import { AppRenderHandler } from './types.ts';

export type AppFormFieldRendererCommonProps<TFieldValues extends FieldValues> =
  Pick<
    ControllerProps<TFieldValues>,
    'control' | 'name' | 'rules' | 'disabled'
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
}: AppFormFieldRendererProps<TFieldValues>) => {
  const maybeLabelElement = label ? (
    <AppText category={'title'}>{label}</AppText>
  ) : undefined;

  const renderField: ControllerProps<TFieldValues>['render'] = useCallback(
    ({ field: { value, onChange, disabled: fieldDisabled }, formState }) =>
      render({
        value,
        onChange,
        disabled: fieldDisabled || formState.disabled,
      }),
    [render],
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
    </AppView>
  );
};
