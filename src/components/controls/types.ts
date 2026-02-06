import { AppFormFieldRendererCommonProps } from './AppFormFieldRenderer/AppFormFieldRenderer.tsx';
import { ControllerProps, FieldValues } from 'react-hook-form';
import { AppRenderHandlerParams } from './AppFormFieldRenderer/types.ts';
import { PrimitiveValue } from '../../types/common.ts';

type FormControlSpecificPropsBase = Record<string, unknown>;

export type AppFormControlWrapperProps<
  TFieldValues extends FieldValues,
  TSpecificProps extends FormControlSpecificPropsBase,
> = AppFormFieldRendererCommonProps<TFieldValues> & TSpecificProps;

export type AppFormRenderProps<
  TFieldValues extends FieldValues,
  TSpecificProps extends FormControlSpecificPropsBase,
> = AppRenderHandlerParams<TFieldValues> & TSpecificProps;

export type Option<TOptionValue extends PrimitiveValue> = {
  title: string;
  value: TOptionValue;
};

export type Rules<TFieldValues extends FieldValues = FieldValues> =
  ControllerProps<TFieldValues>['rules'];
