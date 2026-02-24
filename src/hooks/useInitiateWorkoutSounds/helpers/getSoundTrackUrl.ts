import { sample } from 'lodash';

export const getSoundTrackUrl = (
  oneOrMoreFilePaths: string | string[],
): string | undefined =>
  Array.isArray(oneOrMoreFilePaths)
    ? sample(oneOrMoreFilePaths)
    : oneOrMoreFilePaths;
