import { Pressable } from 'react-native';
import { Star } from 'lucide-react-native';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { FILL_CONTAINER_DIMENSION } from '../../../../../../constants/common.ts';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { requestStoreReview } from '../helpers/requestStoreReview.ts';
import { useAtom } from 'jotai';
import { starsRatedAtom } from '../../../../../../contexts/atoms.ts';
import { getNumber } from '../../../../../../helpers/getNumber.ts';
import { checkIsRatingPositive } from '../helpers/checkIsRatingPositive.ts';

const STAR_COUNT = 5;
const STAR_SIZE = 40;

export const StarRating = () => {
  const { recoveryStrong } = useAppThemedColors();

  const [starsRated, setStarsRated] = useAtom(starsRatedAtom);

  const handleRate = async (stars: number) => {
    await setStarsRated(stars);

    if (checkIsRatingPositive(stars)) {
      await requestStoreReview();
    }
  };

  return (
    <AppRow
      maxWidth={FILL_CONTAINER_DIMENSION}
      justifyContent={'space-between'}>
      {Array.from({ length: STAR_COUNT }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= getNumber(starsRated);

        return (
          <Pressable
            key={starValue}
            onPress={() => handleRate(starValue)}>
            <Star
              size={STAR_SIZE}
              color={recoveryStrong}
              fill={isFilled ? recoveryStrong : 'transparent'}
            />
          </Pressable>
        );
      })}
    </AppRow>
  );
};
