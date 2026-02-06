import { AppSilverPiecesInputSpecificProps } from '../types.ts';
import {
  ACTIVE_OPACITY,
  INACTIVE_OPACITY,
  sizes,
} from '../../../../constants/ui.ts';
import { AppImage } from '../../../common/AppImage.tsx';
import { AppIllustration } from '../../../../assets/constants.ts';
import { AppView } from '../../../common/AppView.tsx';
import { isLast } from '../../../../shared/utils/isLast.ts';
import { memo } from 'react';

const { silverPieceWidth, silverPieceHeight } = sizes;

type AppSilverPiecesInputIllustrationsProps = Pick<
  AppSilverPiecesInputSpecificProps,
  'maxValue'
> & {
  value: number;
};

const _AppSilverPiecesInputIllustrations = ({
  value,
  maxValue,
}: AppSilverPiecesInputIllustrationsProps) => (
  <>
    {new Array(maxValue).fill(undefined).map((_, index, array) => {
      const orderNumber = index + 1;
      const opacity = orderNumber > value ? INACTIVE_OPACITY : ACTIVE_OPACITY;
      const shrink = !isLast(index, array);

      return (
        <AppView
          key={index}
          shrink={shrink}>
          <AppImage
            illustrationName={AppIllustration.pieceOfSilver}
            width={silverPieceWidth}
            height={silverPieceHeight}
            opacity={opacity}
          />
        </AppView>
      );
    })}
  </>
);

export const AppSilverPiecesInputIllustrations = memo(
  _AppSilverPiecesInputIllustrations,
);
