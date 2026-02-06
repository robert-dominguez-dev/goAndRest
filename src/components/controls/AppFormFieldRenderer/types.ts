import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export type AppRenderHandlerParams<TFieldValues extends FieldValues> = Pick<
  ControllerRenderProps<TFieldValues>,
  'value' | 'onChange'
> & {
  disabled: boolean;
  isInvalid?: boolean;
};

export type AppRenderHandler<TFieldValues extends FieldValues> = (
  props: AppRenderHandlerParams<TFieldValues>,
) => JSX.Element;
