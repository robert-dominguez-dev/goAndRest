import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import { BottomSheetSubmitButtonProps } from '../../common/AppBottomSheet/components/AppBottomSheetContent.tsx';

type UseBottomSheetFormParams<TFieldValues extends FieldValues> = {
  defaultValues?: UseFormProps<TFieldValues>['defaultValues'];
  onSubmit: SubmitHandler<TFieldValues>;
  dismissOnSubmit?: boolean;
};

export const useBottomSheetForm = <TFieldValues extends FieldValues>({
  defaultValues,
  onSubmit,
  dismissOnSubmit = true,
}: UseBottomSheetFormParams<TFieldValues>) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<TFieldValues>({
    mode: 'onBlur',
    defaultValues,
  });

  const submitBottomSheetForm: BottomSheetSubmitButtonProps['onPress'] =
    closeBottomSheet =>
      handleSubmit(data => {
        onSubmit(data);
        if (dismissOnSubmit) {
          closeBottomSheet();
        }
      })();

  return {
    submitBottomSheetForm,
    control,
    watch,
    setValue,
    reset,
    trigger,
    clearErrors,
    errors,
  };
};
