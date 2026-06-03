import { AppRow } from '../../../../../common/AppRow.tsx';
import {
  FILL_CONTAINER_DIMENSION,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../../../../../constants/common.ts';
import { useAvatarImageProps } from '../helpers/useAvatarImageProps.ts';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppImage } from '../../../../../common/AppImage.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { StarRating } from './StarRating.tsx';
import { useAtomValue } from 'jotai';
import { starsRatedAtom } from '../../../../../../contexts/atoms.ts';
import { getRatingRequestTranslateKey } from '../helpers/getRatingRequestText.ts';

export const RatingRequestHint = () => {
  const t = useAppTranslation();

  const starsRated = useAtomValue(starsRatedAtom);

  const hasAlreadyRated = !!starsRated;

  const ratingRequestTranslateKey = getRatingRequestTranslateKey(starsRated);

  const maybeAvatarImageProps = useAvatarImageProps(100);

  return (
    <AppRow
      gap={'m'}
      alignItems={'flex-end'}
      maxWidth={FILL_CONTAINER_DIMENSION}>
      {maybeAvatarImageProps && (
        <AppView>
          <AppImage {...maybeAvatarImageProps} />
        </AppView>
      )}
      <AppView
        shrink
        gap={'m'}
        paddingVertical={'s'}
        paddingHorizontal={'sm'}
        borderRadius={'s'}
        borderColorStatus={'border'}
        backgroundColorStatus={'backgroundAlt'}>
        <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {t(ratingRequestTranslateKey)}
        </AppText>
        {!hasAlreadyRated && <StarRating />}
      </AppView>
    </AppRow>
  );
};
