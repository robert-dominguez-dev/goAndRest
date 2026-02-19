import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { SettingsItemValueText } from '../SettingsItemValueText.tsx';
import { formatTimerTime } from '../../../../../../common/AppCountdownText/helpers/formatTimerTime.tsx';
import { useWorkoutSettingsBottomSheet } from '../../hooks/useWorkoutSettingsBottomSheet.tsx';
import { Wind } from 'lucide-react-native';
import { cooldownSettingsAtom } from '../../../../../../../contexts/atoms.ts';

const CooldownSettingsItemComponent = () => {
  const t = useAppTranslation();

  const title = t('screens.settingsScreen.workoutSection.items.cooldown.label');

  const description = t(
    'screens.settingsScreen.workoutSection.items.cooldown.description',
  );

  const { bottomSheet, openWorkoutSettingsBottomSheet, duration } =
    useWorkoutSettingsBottomSheet({
      title,
      description,
      backgroundColorStatus: 'cooldown',
      IconComponent: Wind,
      durationAtom: cooldownSettingsAtom,
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

export const CooldownSettingsItem = memo(CooldownSettingsItemComponent);
