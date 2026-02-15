import { AppWorkoutConfig } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { formatTimerTime } from '../../../../common/AppCountdownText/helpers/formatTimerTime.tsx';
import { AppButtonProps } from '../../../../controls/AppButton/AppButton.tsx';
import { Coffee, Dumbbell, Repeat, Wind, Zap } from 'lucide-react-native';
import { TranslateKey } from '../../../../../locales/types.ts';
import {
  AppRoundedButtonSizeUnion,
  roundedButtonToIconSize,
} from '../../../../controls/AppRoundedButton/constants.ts';

export type AppWorkoutConfigKey = keyof AppWorkoutConfig;

export const appWorkoutConfigKeys: AppWorkoutConfigKey[] = [
  'prep',
  'work',
  'rest',
  'rounds',
  'cooldown',
];

export type WorkoutSettingsButtonConfig = Required<Pick<
  AppButtonProps,
  'backgroundColorStatus' | 'IconComponent'
>> & {
  min: number;
  max: number;
  step: number;
  labelEveryNSteps: number;
  labelKey: TranslateKey;
  descriptionKey: TranslateKey;
  valueFormatter: (value: number) => string;
};

const FIVE_MINUTES_SECONDS = 300;
const TIME_STEP = 5;
const TIME_STEP_LABEL_MULTIPLIER = 6;

export const workoutSettingsButtonConfigMap: Record<
  AppWorkoutConfigKey,
  WorkoutSettingsButtonConfig
> = {
  prep: {
    labelKey: 'common.workoutConfig.prep.label',
    descriptionKey: 'common.workoutConfig.prep.description',
    backgroundColorStatus: 'prep',
    IconComponent: Zap,
    min: 0,
    max: FIVE_MINUTES_SECONDS,
    step: TIME_STEP,
    labelEveryNSteps: TIME_STEP_LABEL_MULTIPLIER,
    valueFormatter: formatTimerTime,
  },
  work: {
    labelKey: 'common.workoutConfig.work.label',
    descriptionKey: 'common.workoutConfig.work.description',
    backgroundColorStatus: 'work',
    IconComponent: Dumbbell,
    min: 5,
    max: FIVE_MINUTES_SECONDS,
    step: TIME_STEP,
    labelEveryNSteps: TIME_STEP_LABEL_MULTIPLIER,
    valueFormatter: formatTimerTime,
  },
  rest: {
    labelKey: 'common.workoutConfig.rest.label',
    descriptionKey: 'common.workoutConfig.rest.description',
    backgroundColorStatus: 'rest',
    IconComponent: Coffee,
    min: 0,
    max: FIVE_MINUTES_SECONDS,
    step: TIME_STEP,
    labelEveryNSteps: TIME_STEP_LABEL_MULTIPLIER,
    valueFormatter: formatTimerTime,
  },
  rounds: {
    labelKey: 'common.workoutConfig.rounds.label',
    descriptionKey: 'common.workoutConfig.rounds.description',
    backgroundColorStatus: 'rounds',
    IconComponent: Repeat,
    min: 1,
    max: 30,
    step: 1,
    labelEveryNSteps: 2,
    valueFormatter: rounds => `${rounds}x`,
  },
  cooldown: {
    labelKey: 'common.workoutConfig.cooldown.label',
    descriptionKey: 'common.workoutConfig.cooldown.description',
    backgroundColorStatus: 'cooldown',
    IconComponent: Wind,
    min: 0,
    max: FIVE_MINUTES_SECONDS,
    step: TIME_STEP,
    labelEveryNSteps: TIME_STEP_LABEL_MULTIPLIER,
    valueFormatter: formatTimerTime,
  },
};

export const EXISTING_WORKOUT_BUTTON_SIZE: AppRoundedButtonSizeUnion = 's';

export const EXISTING_WORKOUT_BUTTON_ICON_SIZE =
  roundedButtonToIconSize[EXISTING_WORKOUT_BUTTON_SIZE];
