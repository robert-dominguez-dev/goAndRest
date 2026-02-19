import { memo } from 'react';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { SettingsItem } from './SettingsItem.tsx';
import { SettingsItemConfig } from '../constants.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';

export type SettingsItemListProps = {
  items: SettingsItemConfig[];
};

const SettingsItemListComponent = ({ items }: SettingsItemListProps) => {
  const t = useAppTranslation();

  const settingsItemElements = items.map(
    ({ titleKey, descriptionKey, accessoryRight }) => (
      <SettingsItem
        key={titleKey}
        title={t(titleKey)}
        description={t(descriptionKey)}
        accessoryRight={accessoryRight}
      />
    ),
  );

  return <AppView gap={'m'}>{settingsItemElements}</AppView>;
};

export const SettingsItemList = memo(SettingsItemListComponent);
