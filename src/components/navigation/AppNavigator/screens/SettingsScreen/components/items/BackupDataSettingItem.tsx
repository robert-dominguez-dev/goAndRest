import { memo } from 'react';
import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { AppRow } from '../../../../../../common/AppRow.tsx';
import { AppIcon } from '../../../../../../common/AppIcon.tsx';
import { AppIconAndLabel } from '../../../../../../controls/AppButton/components/AppIconAndLabel.tsx';

type BackupDataSettingItemProps = {
  isPremium: boolean;
  onPress: () => void;
};

const BackupDataSettingItemComponent = ({
  isPremium,
  onPress,
}: BackupDataSettingItemProps) => {
  const t = useAppTranslation();

  const accessoryRight = (
    <AppRow
      gap={'s'}
      alignItems={'center'}>
      {!isPremium && (
        <AppIcon
          name={'Gem'}
          colorStatus={'premium'}
        />
      )}
      <AppIconAndLabel
        grow={false}
        label={t(
          'screens.settingsScreen.backupSection.items.backupData.exportValue',
        )}
        iconName={'Download'}
        textColorStatus={'textMuted'}
        category={'subHeader'}
      />
    </AppRow>
  );

  return (
    <SettingsItem
      title={t('screens.settingsScreen.backupSection.items.backupData.label')}
      description={t(
        'screens.settingsScreen.backupSection.items.backupData.description',
      )}
      onPress={onPress}
      accessoryRight={accessoryRight}
    />
  );
};

export const BackupDataSettingItem = memo(BackupDataSettingItemComponent);
