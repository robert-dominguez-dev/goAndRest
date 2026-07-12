export type CountPluralForm = 'one' | 'few' | 'many';

export const getCountPluralForm = (count: number): CountPluralForm => {
  if (count === 1) {
    return 'one';
  }

  if (count >= 2 && count <= 4) {
    return 'few';
  }

  return 'many';
};
