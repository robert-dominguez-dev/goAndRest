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
import { AppViewProps } from '../AppView/AppView.tsx';

export type AppHeaderProps = {
  title?: string | JSX.Element;
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

  const hasAnyAccessory: boolean =
    !!AccessoryLeftIconComponent || !!AccessoryRightIconComponent;

  const justifyContent: AppViewProps['justifyContent'] = hasAnyAccessory
    ? 'space-between'
    : 'center';

  return (
    <AppRow
      justifyContent={justifyContent}
      alignItems={'center'}>
      {hasAnyAccessory && (
        <AppHeaderAccessoryContainer
          alignItems={'flex-start'}
          onPress={onAccessoryLeftPress}>
          {AccessoryLeftIconComponent && (
            <AccessoryLeftIconComponent color={text} />
          )}
        </AppHeaderAccessoryContainer>
      )}
      {titleElement}
      {hasAnyAccessory && (
        <AppHeaderAccessoryContainer
          alignItems={'flex-end'}
          onPress={onAccessoryRightPress}>
          {AccessoryRightIconComponent && (
            <AccessoryRightIconComponent color={text} />
          )}
        </AppHeaderAccessoryContainer>
      )}
    </AppRow>
  );
};
