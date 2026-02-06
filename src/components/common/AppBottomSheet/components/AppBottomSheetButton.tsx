import { AppView } from '../../AppView.tsx';
import {
  AppButton,
  AppButtonProps,
} from '../../../controls/AppButton/AppButton.tsx';
import { AppInputErrorMessage } from '../../../controls/AppInputErrorMessage.tsx';

export type AppBottomSheetButtonProps = AppButtonProps & {
  errorMessage?: string;
};

export const AppBottomSheetButton = ({
  errorMessage,
  ...props
}: AppBottomSheetButtonProps) => {
  const maybeErrorMessage = errorMessage ? (
    <AppInputErrorMessage errorMessage={errorMessage} />
  ) : undefined;

  return (
    <AppView gap={'xs'}>
      {maybeErrorMessage}
      <AppButton {...props} />
    </AppView>
  );
};
