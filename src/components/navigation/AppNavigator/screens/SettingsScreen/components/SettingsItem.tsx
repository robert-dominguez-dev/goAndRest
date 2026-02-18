import { JSX, memo } from 'react';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';

const SETTINGS_ITEM_HEIGHT = 40;

export type SettingsItemProps = {
  title: string;
  accessoryRight: JSX.Element;
};

const SettingsItemComponent = ({
  title,
  accessoryRight,
}: SettingsItemProps) => (
  <AppRow
    minHeight={SETTINGS_ITEM_HEIGHT}
    alignItems={'center'}
    justifyContent={'space-between'}>
    <AppText category={'subHeader'}>{title}</AppText>
    {accessoryRight}
  </AppRow>
);

export const SettingsItem = memo(SettingsItemComponent);
