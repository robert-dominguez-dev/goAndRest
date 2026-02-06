import {
  AppMultiColorText,
  AppMultiColorTextProps,
} from './AppMultiColorText.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../constants/common.ts';

type AppMultiColorScreenDescriptionProps = Pick<
  AppMultiColorTextProps,
  'textParts'
>;

export const AppMultiColorScreenDescription = ({
  textParts,
}: AppMultiColorScreenDescriptionProps) => (
  <AppMultiColorText
    category={'header'}
    textShadowColorStatus={'background'}
    textAlign={'center'}
    numberOfLines={UNLIMITED_NUMBER_OF_LINES}
    textParts={textParts}
  />
);
