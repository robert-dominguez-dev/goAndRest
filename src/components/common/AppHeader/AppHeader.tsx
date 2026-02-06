import { AppRow } from '../AppRow.tsx';
import {
  AppHeaderAccessoryContainer,
  AppHeaderAccessoryContainerProps,
} from './components/AppHeaderAccessoryContainer.tsx';

import { JSX } from 'react';
import isString from 'lodash/isString';
import { LucideIcon } from 'lucide-react-native';
import { AppText } from '../AppText/AppText.tsx';

export type AppHeaderProps = {
  title: string | JSX.Element;
  accessoryLeft?: JSX.Element;
  onAccessoryLeftPress?: AppHeaderAccessoryContainerProps['onPress'];
  AccessoryRightIconComponent?: LucideIcon;
  onAccessoryRightPress?: AppHeaderAccessoryContainerProps['onPress'];
};

export const AppHeader = ({
  title,
  accessoryLeft,
  onAccessoryLeftPress,
  AccessoryRightIconComponent,
  onAccessoryRightPress,
}: AppHeaderProps) => {
  const titleElement = isString(title) ? (
    <AppText category={'header'}>{title}</AppText>
  ) : (
    title
  );

  return (
    <AppRow
      justifyContent={'space-between'}
      alignItems={'center'}>
      <AppHeaderAccessoryContainer
        alignItems={'flex-start'}
        onPress={onAccessoryLeftPress}>
        {accessoryLeft}
      </AppHeaderAccessoryContainer>
      {titleElement}
      <AppHeaderAccessoryContainer
        alignItems={'flex-end'}
        onPress={onAccessoryRightPress}>
        {AccessoryRightIconComponent && <AccessoryRightIconComponent />}
      </AppHeaderAccessoryContainer>
    </AppRow>
  );
};
