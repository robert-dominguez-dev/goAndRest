import { ControllerProps, FieldErrors, FieldValues } from 'react-hook-form';
import isString from 'lodash/isString';

export const getFormFieldErrorMessage = <TFieldValues extends FieldValues>(
  errors: FieldErrors<TFieldValues>,
  name: ControllerProps<TFieldValues>['name'],
): string | undefined => {
  const errorMessageRaw = errors[name]?.message;
  return isString(errorMessageRaw) ? errorMessageRaw : undefined;
};
