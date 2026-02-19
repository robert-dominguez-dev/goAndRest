import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { SettingsItemValueText } from '../SettingsItemValueText.tsx';
import { formatTimerTime } from '../../../../../../common/AppCountdownText/helpers/formatTimerTime.tsx';
import { useWorkoutSettingsBottomSheet } from '../../hooks/useWorkoutSettingsBottomSheet.tsx';
import { Flame } from 'lucide-react-native';
import { warmupSettingsAtom } from '../../../../../../../contexts/atoms.ts';

const WarmupSettingsItemComponent = () => {
  const t = useAppTranslation();

  const title = t('screens.settingsScreen.workoutSection.items.warmup.label');

  const description = t(
    'screens.settingsScreen.workoutSection.items.warmup.description',
  );

  const { bottomSheet, openWorkoutSettingsBottomSheet, duration } =
    useWorkoutSettingsBottomSheet({
      title,
      description,
      backgroundColorStatus: 'warmup',
      IconComponent: Flame,
      durationAtom: warmupSettingsAtom,
    });

  const accessoryRight = (
    <SettingsItemValueText>{formatTimerTime(duration)}</SettingsItemValueText>
  );

  return (
    <>
      <SettingsItem
        title={title}
        description={description}
        onPress={openWorkoutSettingsBottomSheet}
        accessoryRight={accessoryRight}
      />
      {bottomSheet}
    </>
  );
};

export const WarmupSettingsItem = memo(WarmupSettingsItemComponent);
