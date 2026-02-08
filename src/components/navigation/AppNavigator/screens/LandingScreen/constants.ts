import { AppWorkoutConfig } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { formatTimerTime } from '../../../../common/AppCountdownText/helpers/formatTimerTime.tsx';
import { AppButtonProps } from '../../../../controls/AppButton/AppButton.tsx';
import { Coffee, Dumbbell, Repeat, Wind, Zap } from 'lucide-react-native';
import { TranslateKey } from '../../../../../locales/types.ts';

type AppWorkoutConfigKey = keyof AppWorkoutConfig;

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
  labelKey: TranslateKey;
  valueFormatter: (value: number) => string;
};

export const workoutSettingsButtonConfigMap: Record<
  AppWorkoutConfigKey,
  WorkoutSettingsButtonConfig
> = {
  prep: {
    labelKey: 'common.workoutConfig.prep',
    backgroundColorStatus: 'yellow',
    IconComponent: Zap,
    valueFormatter: formatTimerTime,
  },
  work: {
    labelKey: 'common.workoutConfig.work',
    backgroundColorStatus: 'negative',
    IconComponent: Dumbbell,
    valueFormatter: formatTimerTime,
  },
  rest: {
    labelKey: 'common.workoutConfig.rest',
    backgroundColorStatus: 'primary',
    IconComponent: Coffee,
    valueFormatter: formatTimerTime,
  },
  rounds: {
    labelKey: 'common.workoutConfig.rounds',
    backgroundColorStatus: 'backgroundAlt',
    IconComponent: Repeat,
    valueFormatter: rounds => `${rounds}x`,
  },
  cooldown: {
    labelKey: 'common.workoutConfig.cooldown',
    backgroundColorStatus: 'orange',
    IconComponent: Wind,
    valueFormatter: formatTimerTime,
  },
};
