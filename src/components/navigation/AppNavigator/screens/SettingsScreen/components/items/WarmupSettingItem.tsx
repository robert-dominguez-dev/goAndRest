import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { AppSelectionBottomSheetItemText } from '../../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';
import { formatTimerTime } from '../../../../../../../helpers/formatTimerTime.tsx';
import { useWorkoutSettingBottomSheet } from '../../hooks/useWorkoutSettingBottomSheet.tsx';
import { warmupSettingAtom } from '../../../../../../../contexts/atoms.ts';
import { AppColorUnion } from '../../../../../../../types/ui.ts';
import { workoutPhaseToIconName } from '../../../RunningWorkoutScreen/constants.tsx';

const iconName = workoutPhaseToIconName.WARMUP;
const backgroundColorStatus: AppColorUnion = 'warmup';

const WarmupSettingItemComponent = () => {
  const t = useAppTranslation();

  const title = t('screens.settingsScreen.workoutSection.items.warmup.label');

  const description = t(
    'screens.settingsScreen.workoutSection.items.warmup.description',
  );

  const { bottomSheet, openWorkoutSettingsBottomSheet, duration } =
    useWorkoutSettingBottomSheet({
      title,
      description,
      iconName,
      backgroundColorStatus,
      durationAtom: warmupSettingAtom,
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

export const WarmupSettingItem = memo(WarmupSettingItemComponent);
