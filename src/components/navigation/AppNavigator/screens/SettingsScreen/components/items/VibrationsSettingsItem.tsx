import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { AppToggleBase } from '../../../../../../common/AppToggle/component/AppToggleBase.tsx';
import { useAtom } from 'jotai';
import { vibrationsSettingAtom } from '../../../../../../../contexts/atoms.ts';

const VibrationsSettingsItemComponent = () => {
  const t = useAppTranslation();

  const [vibrationsEnabled, setVibrationsEnabled] = useAtom(
    vibrationsSettingAtom,
  );

  const toggleVibrations = () => setVibrationsEnabled(prev => !prev);

  const accessoryRight = <AppToggleBase value={vibrationsEnabled} />;

  return (
    <SettingsItem
      title={t('screens.settingsScreen.feedbackSection.items.vibrations.label')}
      description={t(
        'screens.settingsScreen.feedbackSection.items.vibrations.description',
      )}
      onPress={toggleVibrations}
      accessoryRight={accessoryRight}
    />
  );
};

export const VibrationsSettingsItem = memo(VibrationsSettingsItemComponent);
