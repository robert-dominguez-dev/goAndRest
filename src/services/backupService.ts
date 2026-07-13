import RNBlobUtil from 'react-native-blob-util';
import { errorCodes, isErrorWithCode, keepLocalCopy, pick, types, } from '@react-native-documents/picker';
import { readUtf8File, writeUtf8File } from './fileService.ts';
import { shareFile } from './shareService.ts';
import { parseBackup, ParsedBackup } from './helpers/parseBackup.ts';
import { AppStoredWorkout } from '../contexts/AppWorkoutsProvider/types.ts';
import { WorkoutHistoryEntry } from '../contexts/workoutHistory/types.ts';
import { logCustomEvent } from '../components/navigation/helpers/logCustomEvent.ts';
import { getErrorMessage } from '../helpers/getErrorMessage.ts';

export const BACKUP_VERSION = 1;
const BACKUP_FILE_NAME = 'goandrest-backup.json';

export type BackupPayload = {
  date: number;
  version: number;
  workouts: AppStoredWorkout[];
  log: WorkoutHistoryEntry[];
};

export const exportBackup = async (
  workouts: AppStoredWorkout[],
  log: WorkoutHistoryEntry[],
): Promise<boolean> => {
  try {
    const payload: BackupPayload = {
      date: Date.now(),
      version: BACKUP_VERSION,
      workouts,
      log,
    };
    const path = `${RNBlobUtil.fs.dirs.CacheDir}/${BACKUP_FILE_NAME}`;

    await writeUtf8File(path, JSON.stringify(payload));

    return await shareFile(path, BACKUP_FILE_NAME);
  } catch (error) {
    void logCustomEvent('backup_export_failure', {
      errorMessage: getErrorMessage(error),
    });
    return false;
  }
};

export const pickAndParseBackup = async (): Promise<
  { payload: ParsedBackup } | 'cancelled' | 'invalid'
> => {
  try {
    const [file] = await pick({ type: [types.json, types.allFiles] });

    const [copy] = await keepLocalCopy({
      files: [{ uri: file.uri, fileName: file.name ?? BACKUP_FILE_NAME }],
      destination: 'cachesDirectory',
    });
    const localUri = copy.status === 'success' ? copy.localUri : file.uri;
    const path = localUri.startsWith('file://')
      ? localUri.slice('file://'.length)
      : localUri;

    const content = await readUtf8File(path);
    const payload = parseBackup(JSON.parse(content) as unknown);

    return payload ? { payload } : 'invalid';
  } catch (error) {
    if (
      isErrorWithCode(error) &&
      error.code === errorCodes.OPERATION_CANCELED
    ) {
      return 'cancelled';
    }
    void logCustomEvent('backup_import_failure', {
      errorMessage: getErrorMessage(error),
    });
    return 'invalid';
  }
};
