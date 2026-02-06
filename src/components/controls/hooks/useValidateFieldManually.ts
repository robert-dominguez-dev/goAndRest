import {
  FieldErrors,
  FieldPath,
  FieldValues,
  UseFormClearErrors,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { useEffect, useMemo } from 'react';

type UseValidateFieldManuallyParams<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  watch: UseFormWatch<TFieldValues>;
  clearErrors: UseFormClearErrors<TFieldValues>;
  trigger: UseFormTrigger<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
};

export const useValidateFieldManually = <TFieldValues extends FieldValues>({
  name,
  watch,
  clearErrors,
  trigger,
  errors,
}: UseValidateFieldManuallyParams<TFieldValues>) => {
  const value = watch(name);

  useEffect(() => {
    if (errors[name]) {
      clearErrors(name);
    }
  }, [errors, name, value]);

  return useMemo(
    () => ({
      validate: () => trigger(name),
      value,
    }),
    [name, value],
  );
};
