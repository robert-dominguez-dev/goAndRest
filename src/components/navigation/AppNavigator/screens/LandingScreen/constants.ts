import { AppWorkoutConfig } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { formatTimerTime } from '../../../../../helpers/formatTimerTime.tsx';
import { AppButtonProps } from '../../../../controls/AppButton/AppButton.tsx';
import { AppIconName } from '../../../../common/AppIcon.tsx';
import { TranslateKey } from '../../../../../locales/types.ts';
import { formatRounds } from '../../../../../helpers/formatRounds.ts';
import { ONE_SECOND_MS } from '../../../../../constants/common.ts';

export type AppWorkoutConfigKey = keyof AppWorkoutConfig;

export type WorkoutSettingsButtonConfig = Required<
  Pick<AppButtonProps, 'backgroundColorStatus' | 'iconName'>
> & {
  min: number;
  max: number;
  step: number;
  labelEveryNSteps: number;
  labelKey: TranslateKey;
  descriptionKey: TranslateKey;
  valueFormatter: (value: number) => string;
};

const FIVE_MINUTES_MS = 300 * ONE_SECOND_MS;
const FIVE_SECONDS_MS = 5 * ONE_SECOND_MS;
const TIME_STEP = 5 * ONE_SECOND_MS;
const TIME_STEP_LABEL_MULTIPLIER = 6;

export const workoutSettingsButtonConfigMap: Record<
  AppWorkoutConfigKey,
  WorkoutSettingsButtonConfig
> = {
  work: {
    labelKey: 'common.workoutConfig.work.label',
    descriptionKey: 'common.workoutConfig.work.description',
    backgroundColorStatus: 'work',
    iconName: 'Dumbbell',
    min: FIVE_SECONDS_MS,
    max: FIVE_MINUTES_MS,
    step: TIME_STEP,
    labelEveryNSteps: TIME_STEP_LABEL_MULTIPLIER,
    valueFormatter: formatTimerTime,
  },
  rest: {
    labelKey: 'common.workoutConfig.rest.label',
    descriptionKey: 'common.workoutConfig.rest.description',
    backgroundColorStatus: 'rest',
    iconName: 'BatteryCharging',
    min: 0,
    max: FIVE_MINUTES_MS,
    step: TIME_STEP,
    labelEveryNSteps: TIME_STEP_LABEL_MULTIPLIER,
    valueFormatter: formatTimerTime,
  },
  series: {
    labelKey: 'common.workoutConfig.series.label',
    descriptionKey: 'common.workoutConfig.series.description',
    backgroundColorStatus: 'series',
    iconName: 'Repeat',
    min: 1,
    max: 30,
    step: 1,
    labelEveryNSteps: 2,
    valueFormatter: formatRounds,
  },
  rounds: {
    labelKey: 'common.workoutConfig.rounds.label',
    descriptionKey: 'common.workoutConfig.rounds.description',
    backgroundColorStatus: 'rounds',
    iconName: 'Repeat',
    min: 1,
    max: 30,
    step: 1,
    labelEveryNSteps: 2,
    valueFormatter: formatRounds,
  },
  recovery: {
    labelKey: 'common.workoutConfig.recovery.label',
    descriptionKey: 'common.workoutConfig.recovery.description',
    backgroundColorStatus: 'recovery',
    iconName: 'Coffee',
    min: 0,
    max: FIVE_MINUTES_MS,
    step: TIME_STEP,
    labelEveryNSteps: TIME_STEP_LABEL_MULTIPLIER,
    valueFormatter: formatTimerTime,
  },
};
