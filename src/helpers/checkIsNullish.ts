export const checkIsNullish = (value: unknown): value is null | undefined =>
  value === null || value === undefined;
