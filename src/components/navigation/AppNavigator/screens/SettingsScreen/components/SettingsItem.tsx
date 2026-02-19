import { JSX, memo } from 'react';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../constants/common.ts';

const SETTINGS_ITEM_HEIGHT = 40;

export type SettingsItemProps = {
  title: string;
  description: string;
  accessoryRight: JSX.Element;
};

const SettingsItemComponent = ({
  title,
  description,
  accessoryRight,
}: SettingsItemProps) => (
  <AppView gap={'s'}>
    <AppRow
      minHeight={SETTINGS_ITEM_HEIGHT}
      gap={'m'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <AppText category={'subHeader'}>{title}</AppText>
      {accessoryRight}
    </AppRow>
    <AppText
      category={'content'}
      colorStatus={'textMuted'}
      numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
      {description}
    </AppText>
  </AppView>
);

export const SettingsItem = memo(SettingsItemComponent);
