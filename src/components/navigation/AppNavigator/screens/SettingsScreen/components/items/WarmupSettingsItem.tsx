import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { AppSelectionBottomSheetItemText } from '../../../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';
import { formatTimerTime } from '../../../../../../common/AppCountdownText/helpers/formatTimerTime.tsx';
import { useWorkoutSettingsBottomSheet } from '../../hooks/useWorkoutSettingsBottomSheet.tsx';
import { Flame } from 'lucide-react-native';
import { warmupSettingAtom } from '../../../../../../../contexts/atoms.ts';
import { AppColorUnion } from '../../../../../../../types/ui.ts';

const IconComponent = Flame;
const backgroundColorStatus: AppColorUnion = 'warmup';

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
      IconComponent,
      backgroundColorStatus,
      durationAtom: warmupSettingAtom,
    });

  const accessoryRight = (
    <AppSelectionBottomSheetItemText
      IconComponent={IconComponent}
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

export const WarmupSettingsItem = memo(WarmupSettingsItemComponent);
