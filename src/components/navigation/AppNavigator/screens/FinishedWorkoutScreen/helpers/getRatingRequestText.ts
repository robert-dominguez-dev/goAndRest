import { TranslateKey } from '../../../../../../locales/types.ts';
import { checkIsRatingPositive } from './checkIsRatingPositive.ts';

export const getRatingRequestTranslateKey = (
  stars: number | null,
): TranslateKey => {
  if (!stars) {
    return 'screens.finishedWorkoutScreen.ratingRequest';
  }

  const isPositiveRating = checkIsRatingPositive(stars);

  return isPositiveRating
    ? 'screens.finishedWorkoutScreen.ratingRequestThankYou'
    : 'screens.finishedWorkoutScreen.ratingRequestSorry';
};
