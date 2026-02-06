import { AppRow } from '../AppRow.tsx';
import { AppText, AppTextProps } from '../AppText/AppText.tsx';
import { AppImage } from '../AppImage.tsx';
import { AppIllustration } from '../../../assets/constants.ts';
import { AppAccessorySizeUnion } from './types.ts';
import {
  accessorySizeUnionToDimensions,
  accessorySizeUnionToTextCategory,
} from './constants.ts';
import { SPACE_ON_ANDROID_TO_PREVENT_TEXT_CUT } from '../../../constants/ui.ts';
import { AppViewProps } from '../AppView.tsx';

type AppNumberOfSilverPiecesAccessoryProps = Pick<
  AppTextProps,
  'textShadowColorStatus'
> &
  Pick<AppViewProps, 'alignSelf'> & {
    size?: AppAccessorySizeUnion;
    numberOfSilverPieces: number | string;
  };

export const AppNumberOfSilverPiecesAccessory = ({
  numberOfSilverPieces,
  textShadowColorStatus,
  size = 'medium',
  alignSelf = 'flex-start',
}: AppNumberOfSilverPiecesAccessoryProps) => (
  <AppRow
    alignSelf={alignSelf}
    gap={'xxs'}
    alignItems={'center'}>
    <AppText
      grow={false}
      textShadowColorStatus={textShadowColorStatus}
      category={accessorySizeUnionToTextCategory[size]}>
      {numberOfSilverPieces}
      {SPACE_ON_ANDROID_TO_PREVENT_TEXT_CUT}
    </AppText>
    <AppImage
      illustrationName={AppIllustration.pieceOfSilver}
      {...accessorySizeUnionToDimensions[size]}
    />
  </AppRow>
);
