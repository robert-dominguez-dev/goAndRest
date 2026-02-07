import { AppRow } from '../AppRow.tsx';
import {
  AppHeaderAccessoryContainer,
  AppHeaderAccessoryContainerProps,
} from './components/AppHeaderAccessoryContainer.tsx';

import { JSX } from 'react';
import isString from 'lodash/isString';
import { LucideIcon } from 'lucide-react-native';
import { AppText } from '../AppText/AppText.tsx';
import { useAppThemedColors } from '../../../hooks/useAppThemedColors.ts';

export type AppHeaderProps = {
  title: string | JSX.Element;
  AccessoryLeftIconComponent?: LucideIcon;
  onAccessoryLeftPress?: AppHeaderAccessoryContainerProps['onPress'];
  AccessoryRightIconComponent?: LucideIcon;
  onAccessoryRightPress?: AppHeaderAccessoryContainerProps['onPress'];
};

export const AppHeader = ({
  title,
  AccessoryLeftIconComponent,
  onAccessoryLeftPress,
  AccessoryRightIconComponent,
  onAccessoryRightPress,
}: AppHeaderProps) => {
  const { text } = useAppThemedColors();

  const titleElement = isString(title) ? (
    <AppText
      textAlign={'center'}
      category={'header'}>
      {title}
    </AppText>
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
        {AccessoryLeftIconComponent && (
          <AccessoryLeftIconComponent color={text} />
        )}
      </AppHeaderAccessoryContainer>
      {titleElement}
      <AppHeaderAccessoryContainer
        alignItems={'flex-end'}
        onPress={onAccessoryRightPress}>
        {AccessoryRightIconComponent && (
          <AccessoryRightIconComponent color={text} />
        )}
      </AppHeaderAccessoryContainer>
    </AppRow>
  );
};
