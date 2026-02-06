import { TextInputProps } from 'react-native';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../constants/common.ts';
import { sizes } from '../../../../constants/ui.ts';
import { AppViewProps } from '../../../common/AppView.tsx';

type MultilineDependentProps = Pick<TextInputProps, 'numberOfLines'> &
  Pick<AppViewProps, 'height' | 'minHeight'>;

export const getAppInputMultilineDependentProps = (
  multiline: boolean | undefined,
): MultilineDependentProps =>
  multiline
    ? {
        numberOfLines: UNLIMITED_NUMBER_OF_LINES,
        minHeight: sizes.inputHeight,
      }
    : { height: sizes.inputHeight };
