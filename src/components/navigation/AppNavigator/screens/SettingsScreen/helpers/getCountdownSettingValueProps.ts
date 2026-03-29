import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutCountdownVariant } from '../constants.tsx';
import { SettingValueProps } from '../types.ts';
import { AppIconName } from '../../../../../common/AppIcon.tsx';

const countdownVariantToIconName: Record<WorkoutCountdownVariant, AppIconName> =
  {
    [WorkoutCountdownVariant.ten]: 'Clock9',
    [WorkoutCountdownVariant.five]: 'Clock10',
    [WorkoutCountdownVariant.three]: 'Clock11',
    [WorkoutCountdownVariant.none]: 'CircleX',
  };

export const getCountdownSettingValueProps = (
  countdownVariant: WorkoutCountdownVariant,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.countdown.items',
    countdownVariant,
  );

  const iconName = countdownVariantToIconName[countdownVariant];

  return {
    labelTranslateKey,
    iconName,
  };
};
