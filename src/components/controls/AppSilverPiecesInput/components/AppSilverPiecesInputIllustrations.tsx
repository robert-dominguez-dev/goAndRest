import { AppSilverPiecesInputSpecificProps } from '../types.ts';
import {
  ACTIVE_OPACITY,
  INACTIVE_OPACITY,
  sizes,
} from '../../../../constants/ui.ts';
import { AppImage } from '../../../common/AppImage.tsx';
import { AppIllustration } from '../../../../assets/constants.ts';
import { AppView } from '../../../common/AppView.tsx';

import { memo } from 'react';
import { checkIsLast } from '../../../../helpers/checkIsLast.ts';

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
      const shrink = !checkIsLast(array, index);

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
