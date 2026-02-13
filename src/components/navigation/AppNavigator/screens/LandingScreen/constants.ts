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

type WorkoutSettingsButtonConfig = Pick<
  AppButtonProps,
  'backgroundColorStatus' | 'IconComponent'
> & {
  min: number;
  max: number;
  labelKey: TranslateKey;
  descriptionKey: TranslateKey;
  valueFormatter: (value: number) => string;
};

const FIVE_MINUTES_SECONDS = 300;
const TEN_MINUTES_SECONDS = 600;

export const workoutSettingsButtonConfigMap: Record<
  AppWorkoutConfigKey,
  WorkoutSettingsButtonConfig
> = {
  prep: {
    labelKey: 'common.workoutConfig.prep.label',
    descriptionKey: 'common.workoutConfig.prep.description',
    backgroundColorStatus: 'yellow',
    IconComponent: Zap,
    min: 0,
    max: FIVE_MINUTES_SECONDS,
    valueFormatter: formatTimerTime,
  },
  work: {
    labelKey: 'common.workoutConfig.work.label',
    descriptionKey: 'common.workoutConfig.work.description',
    backgroundColorStatus: 'negative',
    IconComponent: Dumbbell,
    min: 1,
    max: TEN_MINUTES_SECONDS,
    valueFormatter: formatTimerTime,
  },
  rest: {
    labelKey: 'common.workoutConfig.rest.label',
    descriptionKey: 'common.workoutConfig.rest.description',
    backgroundColorStatus: 'primary',
    IconComponent: Coffee,
    min: 0,
    max: FIVE_MINUTES_SECONDS,
    valueFormatter: formatTimerTime,
  },
  rounds: {
    labelKey: 'common.workoutConfig.rounds.label',
    descriptionKey: 'common.workoutConfig.rounds.description',
    backgroundColorStatus: 'backgroundAlt',
    IconComponent: Repeat,
    min: 1,
    max: 99,
    valueFormatter: rounds => `${rounds}x`,
  },
  cooldown: {
    labelKey: 'common.workoutConfig.cooldown.label',
    descriptionKey: 'common.workoutConfig.cooldown.description',
    backgroundColorStatus: 'orange',
    IconComponent: Wind,
    min: 0,
    max: TEN_MINUTES_SECONDS,
    valueFormatter: formatTimerTime,
  },
};

export const EXISTING_WORKOUT_BUTTON_SIZE: AppRoundedButtonSizeUnion = 's';

export const EXISTING_WORKOUT_BUTTON_ICON_SIZE =
  roundedButtonToIconSize[EXISTING_WORKOUT_BUTTON_SIZE];
