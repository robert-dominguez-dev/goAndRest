import sample from 'lodash/sample';
import { ExtendedWorkoutSoundFilePath } from '../../../assets/types.ts';

export const getSoundTrackUrl = (
  oneOrStructuredFilePaths: string | ExtendedWorkoutSoundFilePath,
  isPreferredShort?: boolean,
): string | undefined => {
  if (typeof oneOrStructuredFilePaths === 'string') {
    return oneOrStructuredFilePaths;
  }

  const { short, standard } = oneOrStructuredFilePaths;

  return isPreferredShort ? short : sample(standard);
};
