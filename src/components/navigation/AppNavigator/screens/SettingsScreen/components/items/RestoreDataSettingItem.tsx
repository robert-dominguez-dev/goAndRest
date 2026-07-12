import { memo } from 'react';
import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { AppRow } from '../../../../../../common/AppRow.tsx';
import { AppIcon } from '../../../../../../common/AppIcon.tsx';
import { AppIconAndLabel } from '../../../../../../controls/AppButton/components/AppIconAndLabel.tsx';

type RestoreDataSettingItemProps = {
  isPremium: boolean;
  onPress: () => void;
};

const RestoreDataSettingItemComponent = ({
  isPremium,
  onPress,
}: RestoreDataSettingItemProps) => {
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
          'screens.settingsScreen.backupSection.items.restoreData.importValue',
        )}
        iconName={'Upload'}
        textColorStatus={'textMuted'}
        category={'subHeader'}
      />
    </AppRow>
  );

  return (
    <SettingsItem
      title={t('screens.settingsScreen.backupSection.items.restoreData.label')}
      description={t(
        'screens.settingsScreen.backupSection.items.restoreData.description',
      )}
      onPress={onPress}
      accessoryRight={accessoryRight}
    />
  );
};

export const RestoreDataSettingItem = memo(RestoreDataSettingItemComponent);
