import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import {
  countdownSettingAtom,
  soundFeedbackSettingAtom,
  vibrationsSettingAtom,
} from '../../../../../../../contexts/atoms.ts';
import { CommonSettingItem } from '../CommonSettingItem.tsx';
import {
  workoutCountdownVariants,
  WorkoutSoundFeedback,
} from '../../constants.tsx';
import { getCountdownSettingValueProps } from '../../helpers/getCountdownSettingValueProps.ts';
import { useAtomValue } from 'jotai';

const CountdownSettingItemComponent = () => {
  const t = useAppTranslation();

  const soundFeedback = useAtomValue(soundFeedbackSettingAtom);
  const vibrationsEnabled = useAtomValue(vibrationsSettingAtom);

  const shouldHideCountdownItem: boolean =
    !vibrationsEnabled && soundFeedback === WorkoutSoundFeedback.none;

  if (shouldHideCountdownItem) {
    return null;
  }

  return (
    <CommonSettingItem
      title={t('screens.settingsScreen.feedbackSection.items.countdown.label')}
      description={t(
        'screens.settingsScreen.feedbackSection.items.countdown.description',
      )}
      itemValues={workoutCountdownVariants}
      atom={countdownSettingAtom}
      getProps={getCountdownSettingValueProps}
    />
  );
};

export const CountdownSettingItem = memo(CountdownSettingItemComponent);
