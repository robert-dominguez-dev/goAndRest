export const safeAt = <TItem extends unknown>(
  array: TItem[],
  index: number,
): TItem | undefined => array[index];
