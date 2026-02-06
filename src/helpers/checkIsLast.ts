export const checkIsLast = (
  array: readonly unknown[],
  currentIndex: number,
) => {
  const lastItemIndex = array.length - 1;
  return lastItemIndex === currentIndex;
};
