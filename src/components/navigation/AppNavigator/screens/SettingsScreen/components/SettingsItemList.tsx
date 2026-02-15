import { memo } from 'react';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { SettingsItem } from './SettingsItem.tsx';
import { settingsItems } from '../constants.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';

const SettingsItemListComponent = () => {
  const t = useAppTranslation();

  const settingsItemElements = settingsItems.map(
    ({ titleKey, accessoryRight }) => (
      <SettingsItem
        key={titleKey}
        title={t(titleKey)}
        accessoryRight={accessoryRight}
      />
    ),
  );

  return <AppView gap={'s'}>{settingsItemElements}</AppView>;
};

export const SettingsItemList = memo(SettingsItemListComponent);
