import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutCountdownVariant } from '../constants.tsx';
import { SettingValueProps } from '../types.ts';
import {
  CircleX,
  Clock10,
  Clock11,
  Clock9,
  LucideIcon,
} from 'lucide-react-native';

const countdownVariantToEmoji: Record<WorkoutCountdownVariant, LucideIcon> = {
  [WorkoutCountdownVariant.ten]: Clock9,
  [WorkoutCountdownVariant.five]: Clock10,
  [WorkoutCountdownVariant.three]: Clock11,
  [WorkoutCountdownVariant.none]: CircleX,
};

export const getCountdownSettingValueProps = (
  countdownVariant: WorkoutCountdownVariant,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.countdown.items',
    countdownVariant,
  );

  const IconComponent = countdownVariantToEmoji[countdownVariant];

  return {
    labelTranslateKey,
    IconComponent,
  };
};
