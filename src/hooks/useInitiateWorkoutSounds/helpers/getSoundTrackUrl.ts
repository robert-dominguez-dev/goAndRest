import sample from 'lodash/sample';
import { ExtendedWorkoutSoundFilePath } from '../../../assets/types.ts';

const checkIsExtended = (
  paths: string | ExtendedWorkoutSoundFilePath,
): paths is ExtendedWorkoutSoundFilePath =>
  typeof paths === 'object' && !!paths.standard;

export const getSoundTrackUrl = (
  oneOrStructuredFilePaths: string | ExtendedWorkoutSoundFilePath,
  isPreferredShort?: boolean,
): string | undefined => {
  if (checkIsExtended(oneOrStructuredFilePaths)) {
    const { short, standard } = oneOrStructuredFilePaths;
    return isPreferredShort && short ? short : sample(standard);
  }

  return oneOrStructuredFilePaths;
};
