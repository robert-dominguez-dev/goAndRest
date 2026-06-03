export const MIN_STARS_FOR_POSITIVE_REVIEW = 4;

export const checkIsRatingPositive = (stars: number) =>
  stars >= MIN_STARS_FOR_POSITIVE_REVIEW;
