import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { AppSelectionBottomSheetItemText } from '../../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';
import { formatTimerTime } from '../../../../../../../helpers/formatTimerTime.tsx';
import { useWorkoutSettingBottomSheet } from '../../hooks/useWorkoutSettingBottomSheet.tsx';
import { cooldownSettingAtom } from '../../../../../../../contexts/atoms.ts';
import { workoutPhaseToIconName } from '../../../RunningWorkoutScreen/constants.tsx';
import { AppColorUnion } from '../../../../../../../types/ui.ts';

const iconName = workoutPhaseToIconName.COOLDOWN;
const backgroundColorStatus: AppColorUnion = 'cooldown';

const CooldownSettingItemComponent = () => {
  const t = useAppTranslation();

  const title = t('screens.settingsScreen.workoutSection.items.cooldown.label');

  const description = t(
    'screens.settingsScreen.workoutSection.items.cooldown.description',
  );

  const { bottomSheet, openWorkoutSettingsBottomSheet, duration } =
    useWorkoutSettingBottomSheet({
      title,
      description,
      iconName,
      backgroundColorStatus,
      durationAtom: cooldownSettingAtom,
    });

  const accessoryRight = (
    <AppSelectionBottomSheetItemText
      iconName={iconName}
      iconColorStatus={backgroundColorStatus}
      label={formatTimerTime(duration)}
    />
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

export const CooldownSettingItem = memo(CooldownSettingItemComponent);
