import { AppColorName } from './colors.ts';
import { TranslateKey } from '../locales/types.ts';

type RpeLevel = {
  face: string;
  labelKey: TranslateKey;
  colorStatus: AppColorName;
};

export const RPE_LEVELS = [
  { face: '😌', labelKey: 'common.rpe.easy', colorStatus: 'restStrong' },
  { face: '🫠', labelKey: 'common.rpe.moderate', colorStatus: 'primary' },
  { face: '😮‍💨', labelKey: 'common.rpe.solid', colorStatus: 'recoveryStrong' },
  { face: '🥵', labelKey: 'common.rpe.hard', colorStatus: 'warmup' },
  { face: '🤯', labelKey: 'common.rpe.max', colorStatus: 'work' },
] as const satisfies RpeLevel[];
