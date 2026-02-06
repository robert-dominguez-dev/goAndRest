import { AppText } from '../common/AppText/AppText.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../constants/common.ts';

type AppInputErrorMessageProps = { errorMessage: string };

export const AppInputErrorMessage = ({
  errorMessage,
}: AppInputErrorMessageProps) => (
  <AppText
    category={'title'}
    colorStatus={'negative'}
    numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
    {errorMessage}
  </AppText>
);
