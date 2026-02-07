import { JSX, memo } from 'react';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';

export type SettingsItemProps = {
  title: string;
  accessoryRight: JSX.Element;
};

const _SettingsItem = ({ title, accessoryRight }: SettingsItemProps) => (
  <AppRow
    alignItems={'center'}
    justifyContent={'space-between'}>
    <AppText category={'subHeader'}>{title}</AppText>
    {accessoryRight}
  </AppRow>
);

export const SettingsItem = memo(_SettingsItem);
