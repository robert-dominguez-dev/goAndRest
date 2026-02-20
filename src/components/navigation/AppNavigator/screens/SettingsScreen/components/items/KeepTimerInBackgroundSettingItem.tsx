import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { AppToggleBase } from '../../../../../../common/AppToggle/component/AppToggleBase.tsx';
import { useAtom } from 'jotai';
import { keepTimerInBackgroundSettingAtom } from '../../../../../../../contexts/atoms.ts';

const KeepTimerInBackgroundSettingItemComponent = () => {
  const t = useAppTranslation();

  const [shouldKeepInBackground, setShouldKeepInBackground] = useAtom(
    keepTimerInBackgroundSettingAtom,
  );

  const toggleShouldKeepInBackground = () =>
    setShouldKeepInBackground(prev => !prev);

  const accessoryRight = <AppToggleBase value={shouldKeepInBackground} />;

  return (
    <SettingsItem
      title={t(
        'screens.settingsScreen.workoutSection.items.keepTimerInBackground.label',
      )}
      description={t(
        'screens.settingsScreen.workoutSection.items.keepTimerInBackground.description',
      )}
      onPress={toggleShouldKeepInBackground}
      accessoryRight={accessoryRight}
    />
  );
};

export const KeepTimerInBackgroundSettingItem = memo(
  KeepTimerInBackgroundSettingItemComponent,
);
